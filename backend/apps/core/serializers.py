"""
Serializers for core app
"""

from rest_framework import serializers

from django.contrib.auth.models import User
from .models import FAQ, CaseStudy, TeamMember, UserProfile


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    name = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ["email", "password", "name", "first_name", "last_name"]

    def create(self, validated_data):
        name = validated_data.pop("name", "")
        email = validated_data["email"]
        password = validated_data.pop("password")
        
        # We'll use the first part of name as first_name if not provided
        if not validated_data.get("first_name") and name:
            parts = name.split(" ", 1)
            validated_data["first_name"] = parts[0]
            if len(parts) > 1:
                validated_data["last_name"] = parts[1]

        user = User.objects.create_user(
            username=email, # Use email as username
            password=password,
            **validated_data
        )

        return user


class UserProfileSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            "id",
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
        read_only_fields = ["id", "created_at", "updated_at"]



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
