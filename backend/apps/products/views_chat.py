"""
Live Chat ViewSet
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.utils import timezone
from .models_chat import ChatMessage, ChatSession
from rest_framework import serializers


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'user_name', 'message', 'is_staff_reply', 'staff_name', 'created_at']
        read_only_fields = ['id', 'created_at']


class ChatViewSet(viewsets.ViewSet):
    """
    Live chat endpoints
    
    - POST /api/products/chat/start/ - Start new chat session
    - GET /api/products/chat/<session_id>/messages/ - Get messages
    - POST /api/products/chat/<session_id>/send/ - Send message
    """
    
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['post'])
    def start(self, request):
        """Start new chat session or get existing one"""
        session_id = request.data.get('session_id')
        user_name = request.data.get('user_name', 'Guest')
        user_email = request.data.get('user_email', '')
        product_id = request.data.get('product_id')
        
        if not session_id:
            return Response(
                {'error': 'session_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user_id = ''
        if request.user and isinstance(request.user, dict):
            user_id = request.user.get('sub', '')
        
        session, created = ChatSession.objects.get_or_create(
            session_id=session_id,
            defaults={
                'user_id': user_id,
                'user_name': user_name,
                'user_email': user_email,
                'product_id': product_id,
            }
        )
        
        return Response({
            'session_id': session.session_id,
            'is_new': created
        }, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['get'], url_path='messages')
    def get_messages(self, request, pk=None):
        """Get all messages for a session"""
        messages = ChatMessage.objects.filter(session_id=pk)
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='send')
    def send_message(self, request, pk=None):
        """Send a message in the chat"""
        message_text = request.data.get('message', '').strip()
        user_name = request.data.get('user_name', 'Guest')
        
        if not message_text:
            return Response(
                {'error': 'Message cannot be empty'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get or create session
        try:
            session = ChatSession.objects.get(session_id=pk)
            session.last_message_at = timezone.now()
            session.save()
        except ChatSession.DoesNotExist:
            return Response(
                {'error': 'Session not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        user_id = ''
        user_email = ''
        if request.user and isinstance(request.user, dict):
            user_id = request.user.get('sub', '')
            user_email = request.user.get('email', '')
        
        # Create message
        message = ChatMessage.objects.create(
            session_id=pk,
            user_id=user_id,
            user_name=user_name,
            user_email=user_email,
            message=message_text,
            is_staff_reply=False
        )
        
        serializer = ChatMessageSerializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
