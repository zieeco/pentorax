"""
Serializers for core app
"""

from rest_framework import serializers

from .models import FAQ, CaseStudy, TeamMember, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            "id",
            "supabase_id",
            "email",
            "name",
            "phone",
            "role",
            "avatar_url",
            "bio",
            "is_active",
            "email_verified",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "supabase_id", "created_at", "updated_at"]


class CaseStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseStudy
        fields = [
            "id",
            "title",
            "description",
            "image",
            "location",
            "capacity",
            "savings",
            "project_date",
            "is_featured",
            "is_active",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = [
            "id",
            "question",
            "answer",
            "category",
            "order",
            "is_active",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = [
            "id",
            "name",
            "role",
            "department",
            "bio",
            "image",
            "email",
            "linkedin",
            "order",
            "is_active",
        ]
        read_only_fields = ["id", "created_at"]
