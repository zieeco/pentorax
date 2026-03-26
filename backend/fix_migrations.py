#!/usr/bin/env python3
"""
Script to add DEFAULT value fixes to all migration files.
This fixes the issue where Django's default=uuid.uuid4 and auto_now_add=True
don't create SQL DEFAULT values, causing NOT NULL constraint violations.
"""

import os
import re

# Map of app -> tables in that app's 0001_initial.py migration
APP_TABLES = {
    "blog": ["blog_blogcategory", "blog_blogpost"],
    "cart": ["cart_cart", "cart_cartitem"],
    "contacts": ["contacts_contactsubmission"],
    "inventory": ["inventory_stock"],
    "orders": ["orders_order", "orders_orderitem"],
    "payments": ["payments_payment"],
    "products": ["products_category", "products_product", "products_productimage", "products_productspecification"],
    "quotes": ["quotes_quoterequest"],
    "reviews": ["reviews_review"],
    "support": ["support_supportticket"],
    "warranty": ["warranty_warrantycheck"],
}

def generate_sql_fix(tables):
    """Generate SQL to add DEFAULT values for given tables"""
    sql_lines = []
    reverse_lines = []
    
    for table in tables:
        sql_lines.append(f"            -- Fix {table} table")
        sql_lines.append(f"            ALTER TABLE {table} ALTER COLUMN id SET DEFAULT gen_random_uuid();")
        sql_lines.append(f"            ALTER TABLE {table} ALTER COLUMN created_at SET DEFAULT NOW();")
        sql_lines.append(f"            ALTER TABLE {table} ALTER COLUMN updated_at SET DEFAULT NOW();")
        sql_lines.append("")
        
        reverse_lines.append(f"            ALTER TABLE {table} ALTER COLUMN id DROP DEFAULT;")
        reverse_lines.append(f"            ALTER TABLE {table} ALTER COLUMN created_at DROP DEFAULT;")
        reverse_lines.append(f"            ALTER TABLE {table} ALTER COLUMN updated_at DROP DEFAULT;")
        reverse_lines.append("")
    
    sql = "\n".join(sql_lines).rstrip()
    reverse_sql = "\n".join(reverse_lines).rstrip()
    
    return f'''        # CRITICAL FIX: Add DEFAULT values at database level
        # Django's default=uuid.uuid4 and auto_now_add=True don't create SQL DEFAULT
        # This causes NOT NULL constraint violations when triggers insert data
        migrations.RunSQL(
            sql="""
{sql}
            """,
            reverse_sql="""
{reverse_sql}
            """,
        ),'''

def fix_migration_file(app_name, tables):
    """Add DEFAULT value fix to a migration file"""
    migration_file = f"apps/{app_name}/migrations/0001_initial.py"
    
    if not os.path.exists(migration_file):
        print(f"❌ {migration_file} not found")
        return False
    
    with open(migration_file, 'r') as f:
        content = f.read()
    
    # Check if already fixed
    if "CRITICAL FIX: Add DEFAULT values" in content:
        print(f"✅ {migration_file} already fixed")
        return True
    
    # Find the last closing bracket of operations list
    # Pattern: find "    ]\n" at the end of operations
    pattern = r'(\n    \])\n$'
    
    if not re.search(pattern, content):
        print(f"⚠️  {migration_file} - couldn't find operations closing bracket")
        return False
    
    # Generate the fix SQL
    fix_sql = generate_sql_fix(tables)
    
    # Insert the fix before the closing bracket
    new_content = re.sub(
        pattern,
        f',\n{fix_sql}\n    ]\n',
        content
    )
    
    # Write back
    with open(migration_file, 'w') as f:
        f.write(new_content)
    
    print(f"✅ Fixed {migration_file}")
    return True

def main():
    print("🔧 Fixing migration files to add DEFAULT values...\n")
    
    for app_name, tables in APP_TABLES.items():
        fix_migration_file(app_name, tables)
    
    print("\n✅ All migration files updated!")
    print("\nNext steps:")
    print("1. Review the changes in each migration file")
    print("2. Drop and recreate the database to test from scratch")
    print("3. Run: python manage.py migrate")

if __name__ == "__main__":
    main()
