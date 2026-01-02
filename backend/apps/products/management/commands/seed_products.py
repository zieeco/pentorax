"""
Management command to seed the database with sample solar products
"""
from django.core.management.base import BaseCommand
from apps.products.models import Category, Product, ProductImage, ProductSpecification
import uuid


class Command(BaseCommand):
    help = 'Seed database with sample solar products'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database with sample products...')

        # Create categories
        categories = {
            'solar-panels': Category.objects.create(
                name='Solar Panels',
                slug='solar-panels',
                description='High-efficiency solar panels for residential and commercial use',
                image='https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
            ),
            'inverters': Category.objects.create(
                name='Inverters',
                slug='inverters',
                description='Power inverters to convert DC to AC electricity',
                image='https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
            ),
            'batteries': Category.objects.create(
                name='Batteries',
                slug='batteries',
                description='Energy storage solutions for solar systems',
                image='https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800',
            ),
            'accessories': Category.objects.create(
                name='Accessories',
                slug='accessories',
                description='Mounting systems, cables, and other solar accessories',
                image='https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
            ),
        }

        self.stdout.write(self.style.SUCCESS(f'Created {len(categories)} categories'))

        # Sample products
        products_data = [
            {
                'name': 'Monocrystalline Solar Panel 300W',
                'slug': 'mono-solar-panel-300w',
                'category': 'solar-panels',
                'description': 'High-efficiency monocrystalline solar panel with 21% efficiency rating. Perfect for residential installations with limited roof space. Features anti-reflective coating and robust aluminum frame for durability.',
                'short_description': 'Premium 300W monocrystalline panel with 21% efficiency',
                'price': '45000.00',
                'compare_at_price': '55000.00',
                'is_featured': True,
                'featured_image': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
                'specifications': [
                    {'key': 'Power Output', 'value': '300W', 'position': 1},
                    {'key': 'Efficiency', 'value': '21%', 'position': 2},
                    {'key': 'Voltage', 'value': '24V', 'position': 3},
                    {'key': 'Dimensions', 'value': '1650 x 992 x 40mm', 'position': 4},
                    {'key': 'Weight', 'value': '18.5kg', 'position': 5},
                    {'key': 'Warranty', 'value': '25 years', 'position': 6},
                ],
            },
            {
                'name': 'Polycrystalline Solar Panel 250W',
                'slug': 'poly-solar-panel-250w',
                'category': 'solar-panels',
                'description': 'Cost-effective polycrystalline solar panel ideal for large-scale installations. Delivers reliable performance with 17% efficiency. Built to withstand harsh weather conditions.',
                'short_description': 'Affordable 250W polycrystalline panel for large installations',
                'price': '35000.00',
                'compare_at_price': None,
                'is_featured': False,
                'featured_image': 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800',
                'specifications': [
                    {'key': 'Power Output', 'value': '250W', 'position': 1},
                    {'key': 'Efficiency', 'value': '17%', 'position': 2},
                    {'key': 'Voltage', 'value': '24V', 'position': 3},
                    {'key': 'Warranty', 'value': '20 years', 'position': 4},
                ],
            },
            {
                'name': '5KVA Hybrid Solar Inverter',
                'slug': '5kva-hybrid-inverter',
                'category': 'inverters',
                'description': 'Advanced hybrid inverter with MPPT charge controller. Supports both grid-tied and off-grid operation. Built-in WiFi monitoring and smart load management.',
                'short_description': '5KVA hybrid inverter with MPPT and WiFi monitoring',
                'price': '185000.00',
                'compare_at_price': '220000.00',
                'is_featured': True,
                'featured_image': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
                'specifications': [
                    {'key': 'Capacity', 'value': '5KVA / 4000W', 'position': 1},
                    {'key': 'Input Voltage', 'value': '48V DC', 'position': 2},
                    {'key': 'Output Voltage', 'value': '220V AC', 'position': 3},
                    {'key': 'MPPT Efficiency', 'value': '99.9%', 'position': 4},
                    {'key': 'Features', 'value': 'WiFi, LCD Display, Smart Charging', 'position': 5},
                    {'key': 'Warranty', 'value': '5 years', 'position': 6},
                ],
            },
            {
                'name': 'Lithium Battery 200Ah 48V',
                'slug': 'lithium-battery-200ah-48v',
                'category': 'batteries',
                'description': 'High-capacity lithium iron phosphate (LiFePO4) battery with BMS protection. Long cycle life of 6000+ cycles. Lightweight and maintenance-free.',
                'short_description': '200Ah LiFePO4 battery with 6000+ cycle life',
                'price': '320000.00',
                'compare_at_price': '380000.00',
                'is_featured': True,
                'featured_image': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800',
                'specifications': [
                    {'key': 'Capacity', 'value': '200Ah', 'position': 1},
                    {'key': 'Voltage', 'value': '48V', 'position': 2},
                    {'key': 'Energy', 'value': '9.6kWh', 'position': 3},
                    {'key': 'Cycle Life', 'value': '6000+ cycles', 'position': 4},
                    {'key': 'Weight', 'value': '45kg', 'position': 5},
                    {'key': 'Warranty', 'value': '10 years', 'position': 6},
                ],
            },
            {
                'name': 'Solar Panel Mounting Kit',
                'slug': 'solar-mounting-kit',
                'category': 'accessories',
                'description': 'Complete aluminum mounting system for rooftop solar installations. Includes rails, clamps, and all necessary hardware. Suitable for 10-panel installation.',
                'short_description': 'Aluminum mounting kit for 10 solar panels',
                'price': '28000.00',
                'compare_at_price': None,
                'is_featured': False,
                'featured_image': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
                'specifications': [
                    {'key': 'Material', 'value': 'Anodized Aluminum', 'position': 1},
                    {'key': 'Capacity', 'value': '10 panels', 'position': 2},
                    {'key': 'Tilt Angle', 'value': 'Adjustable 15-45°', 'position': 3},
                    {'key': 'Wind Load', 'value': 'Up to 150 km/h', 'position': 4},
                ],
            },
            {
                'name': 'Solar Cable 6mm² (Per Meter)',
                'slug': 'solar-cable-6mm',
                'category': 'accessories',
                'description': 'UV-resistant solar cable rated for outdoor use. Double insulation for safety. Suitable for DC connections up to 1000V.',
                'short_description': 'UV-resistant 6mm² solar cable',
                'price': '450.00',
                'compare_at_price': None,
                'is_featured': False,
                'featured_image': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
                'specifications': [
                    {'key': 'Size', 'value': '6mm²', 'position': 1},
                    {'key': 'Voltage Rating', 'value': '1000V DC', 'position': 2},
                    {'key': 'Temperature Range', 'value': '-40°C to +90°C', 'position': 3},
                    {'key': 'Insulation', 'value': 'Double layer, UV resistant', 'position': 4},
                ],
            },
        ]

        created_count = 0
        for product_data in products_data:
            category = categories[product_data['category']]
            specs = product_data.pop('specifications')
            
            product = Product.objects.create(
                name=product_data['name'],
                slug=product_data['slug'],
                category_id=category.id,
                description=product_data['description'],
                short_description=product_data['short_description'],
                price=product_data['price'],
                compare_at_price=product_data.get('compare_at_price'),
                is_featured=product_data['is_featured'],
                featured_image=product_data['featured_image'],
                is_active=True,
                meta_title=f"{product_data['name']} | Pentorax Solar",
                meta_description=product_data['short_description'],
            )

            # Add specifications
            for spec in specs:
                ProductSpecification.objects.create(
                    product_id=product.id,
                    **spec
                )

            # Add sample images
            ProductImage.objects.create(
                product_id=product.id,
                image_url=product_data['featured_image'],
                alt_text=f"{product_data['name']} - Main view",
                position=1,
            )

            created_count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully created {created_count} products'))
        self.stdout.write(self.style.SUCCESS('Database seeding complete!'))
