"""
Serializers for core app
"""
from rest_framework import serializers
from .models import TeamMember, FAQ, CaseStudy, ContactSubmission, SupportTicket, WarrantyCheck


class TeamMemberSerializer(serializers.ModelSerializer):
    """Serializer for team members"""
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'department', 'bio', 'image', 'email', 'linkedin', 'order', 'created_at']
        read_only_fields = ['id', 'created_at']


class FAQSerializer(serializers.ModelSerializer):
    """Serializer for FAQs"""
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', 'category', 'order', 'created_at']
        read_only_fields = ['id', 'created_at']


class CaseStudySerializer(serializers.ModelSerializer):
    """Serializer for case studies"""
    class Meta:
        model = CaseStudy
        fields = [
            'id', 'title', 'description', 'image', 'location',
            'capacity', 'savings', 'project_date', 'is_featured', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ContactSubmissionSerializer(serializers.ModelSerializer):
    """Serializer for contact form submissions"""
    class Meta:
        model = ContactSubmission
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class SupportTicketSerializer(serializers.ModelSerializer):
    """Serializer for support tickets"""
    class Meta:
        model = SupportTicket
        fields = [
            'id', 'category', 'serial_number', 'description',
            'status', 'user_email', 'created_at'
        ]
        read_only_fields = ['id', 'status', 'created_at']


class WarrantyCheckSerializer(serializers.Serializer):
    """Serializer for warranty check requests"""
    serial = serializers.CharField(max_length=100)


class WarrantyCheckResponseSerializer(serializers.ModelSerializer):
    """Serializer for warranty check responses"""
    class Meta:
        model = WarrantyCheck
        fields = ['serial_number', 'is_valid', 'expiry_date', 'support_level', 'product_name']
        read_only_fields = ['serial_number', 'is_valid', 'expiry_date', 'support_level', 'product_name']
