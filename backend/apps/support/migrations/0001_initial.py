import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="SupportTicket",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("inverter", "Inverter Performance"),
                            ("battery", "Battery Discharge Level"),
                            ("connectivity", "App Connectivity"),
                            ("installation", "New Hardware Install"),
                            ("other", "Other"),
                        ],
                        max_length=50,
                    ),
                ),
                ("serial_number", models.CharField(max_length=100)),
                ("description", models.TextField()),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("open", "Open"),
                            ("in_progress", "In Progress"),
                            ("resolved", "Resolved"),
                            ("closed", "Closed"),
                        ],
                        default="open",
                        max_length=50,
                    ),
                ),
                (
                    "priority",
                    models.CharField(
                        max_length=50,
                        choices=[
                            ("low", "Low"),
                            ("medium", "Medium"),
                            ("high", "High"),
                            ("urgent", "Urgent"),
                        ],
                        default="medium",
                    ),
                ),
                (
                    "user_email",
                    models.EmailField(
                        max_length=255, blank=True, null=True, default=""
                    ),
                ),
                (
                    "user_name",
                    models.CharField(max_length=255, blank=True, null=True, default=""),
                ),
                (
                    "assigned_to",
                    models.CharField(max_length=255, blank=True, null=True),
                ),
                (
                    "resolution_notes",
                    models.TextField(blank=True, null=True, default=""),
                ),
            ],
            options={
                "db_table": "support_supportticket",
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(fields=["status"], name="idx_support_ticket_status"),
                    models.Index(
                        fields=["serial_number"], name="idx_support_ticket_serial"
                    ),
                    models.Index(
                        fields=["user_email"], name="idx_support_ticket_email"
                    ),
                ],
            },
        ),
    ]
