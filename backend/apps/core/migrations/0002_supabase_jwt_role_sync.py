# Generated migration for Supabase JWT and role sync
# Adapted from SkillForge pattern for Pentorax
# Includes first-user-as-admin logic
# Roles: admin, staff, customer

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RunSQL(
            sql="""
            -- ============================================
            -- PENTORAX: JWT CUSTOM CLAIMS WITH AUTO ROLE SYNC
            -- Adapted from SkillForge pattern
            -- Includes first-user-as-admin functionality
            -- Roles: admin, staff, customer
            -- ============================================

            -- PART 1: Helper function to fetch role from core_userprofile
            CREATE OR REPLACE FUNCTION public.fetch_user_role(target_user_id uuid)
            RETURNS text
            LANGUAGE sql
            STABLE
            SECURITY DEFINER
            SET search_path = public
            AS $$
                SELECT role
                FROM public.core_userprofile
                WHERE supabase_id = target_user_id;
            $$;

            COMMENT ON FUNCTION public.fetch_user_role(uuid) IS 'Fetches user role from core_userprofile for JWT hook. Roles: admin, staff, customer';

            -- PART 2: JWT Hook function (runs on every token generation/refresh)
            CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
            RETURNS jsonb
            LANGUAGE plpgsql
            SECURITY INVOKER
            SET search_path = public
            AS $$
            DECLARE
                v_user_id uuid;
                v_role text;
                v_claims jsonb;
            BEGIN
                -- Extract user ID from event
                v_user_id := (event->>'user_id')::uuid;
                IF v_user_id IS NULL THEN
                    v_user_id := (event->'claims'->>'sub')::uuid;
                END IF;

                -- Get existing claims
                v_claims := COALESCE(event->'claims', '{}'::jsonb);

                -- Fetch user role from database (always fresh!)
                SELECT fetch_user_role(v_user_id) INTO v_role;

                -- Default to 'customer' if no role found
                v_role := COALESCE(v_role, 'customer');

                -- Add role to app_metadata in JWT
                v_claims := jsonb_set(v_claims, '{app_metadata,role}', to_jsonb(v_role));

                -- Update event with new claims
                event := jsonb_set(event, '{claims}', v_claims);

                RETURN event;
            EXCEPTION
                WHEN OTHERS THEN
                    -- Log error but don't break auth
                    RAISE WARNING '[custom_access_token_hook] Error: %', SQLERRM;
                    -- Return original event with default role
                    v_claims := jsonb_set(
                        COALESCE(event->'claims', '{}'::jsonb),
                        '{app_metadata,role}',
                        '"customer"'::jsonb
                    );
                    RETURN jsonb_set(event, '{claims}', v_claims);
            END;
            $$;

            COMMENT ON FUNCTION public.custom_access_token_hook(jsonb) IS 'Supabase Auth JWT Hook: Adds user role from core_userprofile to JWT claims. Roles: admin, staff, customer';

            -- PART 3: Auto-create profile when user signs up (first user becomes admin)
            CREATE OR REPLACE FUNCTION public.handle_new_user()
            RETURNS trigger
            LANGUAGE plpgsql
            SECURITY DEFINER
            SET search_path = public
            AS $$
            DECLARE
                v_name text;
                v_role text;
                v_user_count integer;
            BEGIN
                -- Count existing users in core_userprofile table
                SELECT COUNT(*) INTO v_user_count FROM public.core_userprofile;
                
                -- Determine role: first user is admin, others are customer
                -- Roles can be: admin, staff, customer
                IF v_user_count = 0 THEN
                    v_role := 'admin';
                ELSE
                    v_role := 'customer';
                END IF;

                -- Extract name from metadata
                v_name := COALESCE(
                    NEW.raw_user_meta_data->>'name',
                    NEW.raw_user_meta_data->>'full_name',
                    NEW.email
                );

                -- Create user profile in core_userprofile
                INSERT INTO public.core_userprofile (
                    id,
                    supabase_id,
                    email,
                    name,
                    role,
                    email_verified,
                    is_active,
                    created_at,
                    updated_at
                ) VALUES (
                    gen_random_uuid(),
                    NEW.id,
                    NEW.email,
                    v_name,
                    v_role,
                    NEW.email_confirmed_at IS NOT NULL,
                    true,
                    NOW(),
                    NOW()
                )
                ON CONFLICT (supabase_id) DO NOTHING;

                -- Sync role to auth.users for JWT hook
                UPDATE auth.users
                SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) ||
                    jsonb_build_object('role', v_role)
                WHERE id = NEW.id;

                RETURN NEW;
            EXCEPTION
                WHEN OTHERS THEN
                    RAISE WARNING '[handle_new_user] Error for user %: %', NEW.id, SQLERRM;
                    RETURN NEW;  -- Don't fail user signup
            END;
            $$;

            COMMENT ON FUNCTION public.handle_new_user() IS 'Creates core_userprofile (first user as admin, others as customer) and syncs role to auth.users for JWT hook. Roles: admin, staff, customer';

            -- PART 4: Auto role sync (when role changes in core_userprofile)
            CREATE OR REPLACE FUNCTION public.sync_role_to_auth_users()
            RETURNS trigger
            LANGUAGE plpgsql
            SECURITY DEFINER
            SET search_path = public
            AS $$
            BEGIN
                -- Only run if role actually changed
                IF OLD.role IS DISTINCT FROM NEW.role THEN
                    -- Update auth.users.raw_app_meta_data with new role
                    UPDATE auth.users
                    SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) ||
                        jsonb_build_object('role', NEW.role)
                    WHERE id = NEW.supabase_id;

                    -- Log the role change
                    RAISE NOTICE 'Role synced for user %: % -> %', NEW.supabase_id, OLD.role, NEW.role;
                END IF;

                RETURN NEW;
            EXCEPTION
                WHEN OTHERS THEN
                    RAISE WARNING '[sync_role_to_auth_users] Error syncing role for user %: %', NEW.supabase_id, SQLERRM;
                    RETURN NEW;
            END;
            $$;

            COMMENT ON FUNCTION public.sync_role_to_auth_users() IS 'Auto-syncs role changes from core_userprofile to auth.users. Roles: admin, staff, customer';

            -- PART 5: Create triggers
            DROP TRIGGER IF EXISTS trigger_handle_new_user ON auth.users;
            CREATE TRIGGER trigger_handle_new_user
                AFTER INSERT ON auth.users
                FOR EACH ROW
                EXECUTE FUNCTION public.handle_new_user();

            DROP TRIGGER IF EXISTS trigger_sync_role_to_auth ON public.core_userprofile;
            CREATE TRIGGER trigger_sync_role_to_auth
                AFTER UPDATE OF role ON public.core_userprofile
                FOR EACH ROW
                EXECUTE FUNCTION public.sync_role_to_auth_users();

            -- PART 6: Grant permissions
            GRANT EXECUTE ON FUNCTION public.fetch_user_role(uuid) TO authenticated;
            GRANT EXECUTE ON FUNCTION public.custom_access_token_hook(jsonb) TO supabase_auth_admin;
            GRANT SELECT (supabase_id, role) ON public.core_userprofile TO supabase_auth_admin;
            GRANT EXECUTE ON FUNCTION public.sync_role_to_auth_users() TO authenticated;
            """,
            reverse_sql="""
            DROP TRIGGER IF EXISTS trigger_sync_role_to_auth ON public.core_userprofile;
            DROP TRIGGER IF EXISTS trigger_handle_new_user ON auth.users;
            DROP FUNCTION IF EXISTS public.sync_role_to_auth_users();
            DROP FUNCTION IF EXISTS public.handle_new_user();
            DROP FUNCTION IF EXISTS public.custom_access_token_hook(jsonb);
            DROP FUNCTION IF EXISTS public.fetch_user_role(uuid);
            """,
        ),
    ]
