from django.contrib import admin

from .models import FAQ, CaseStudy, TeamMember, UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "email",
        "role",
        "is_active",
        "email_verified",
        "created_at",
    ]
    list_filter = ["role", "is_active", "email_verified"]
    search_fields = ["name", "email", "supabase_id"]
    readonly_fields = ["id", "supabase_id", "created_at", "updated_at"]


@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "location",
        "capacity",
        "is_featured",
        "is_active",
        "project_date",
    ]
    list_filter = ["is_featured", "is_active", "project_date"]
    search_fields = ["title", "location", "description"]
    readonly_fields = ["id", "created_at", "updated_at"]


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ["question", "category", "order", "is_active"]
    list_filter = ["category", "is_active"]
    search_fields = ["question", "answer"]
    readonly_fields = ["id", "created_at", "updated_at"]
    ordering = ["order", "category"]


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ["name", "role", "department", "order", "is_active"]
    list_filter = ["department", "is_active"]
    search_fields = ["name", "role", "email"]
    readonly_fields = ["id", "created_at", "updated_at"]
    ordering = ["order"]
