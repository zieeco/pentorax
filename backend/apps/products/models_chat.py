"""
Live Chat models
"""

import uuid
from django.db import models


from django.contrib.auth.models import User

class ChatMessage(models.Model):
    """Live chat messages"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session_id = models.CharField(max_length=255, db_index=True)  # Browser session ID
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_messages', null=True, blank=True)

    user_name = models.CharField(max_length=255)
    user_email = models.EmailField(max_length=255, blank=True)
    message = models.TextField()
    is_staff_reply = models.BooleanField(default=False)
    staff_name = models.CharField(max_length=255, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'chat_messages'
        verbose_name = 'Chat Message'
        verbose_name_plural = 'Chat Messages'
        ordering = ['created_at']
        indexes = [
            models.Index(fields=['session_id', 'created_at']),
        ]
        
    def __str__(self):
        return f"Message from {self.user_name} - {self.created_at}"


class ChatSession(models.Model):
    """Chat session tracking"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session_id = models.CharField(max_length=255, unique=True, db_index=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_sessions', null=True, blank=True)

    user_name = models.CharField(max_length=255)
    user_email = models.EmailField(max_length=255, blank=True)
    product_id = models.UUIDField(blank=True, null=True)  # If chat started from product page
    is_active = models.BooleanField(default=True)
    last_message_at = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'chat_sessions'
        verbose_name = 'Chat Session'
        verbose_name_plural = 'Chat Sessions'
        ordering = ['-last_message_at']
        
    def __str__(self):
        return f"Chat session {self.session_id} - {self.user_name}"
