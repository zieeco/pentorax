"""
Product Question & Answer models
"""

import uuid
from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base model with timestamps"""
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True


from django.contrib.auth.models import User

class ProductQuestion(TimeStampedModel):
    """Customer questions about products"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(
        'products.Product',
        on_delete=models.CASCADE,
        related_name='questions',
        db_column='product_id'
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='product_questions', null=True, blank=True)

    user_name = models.CharField(max_length=255)
    user_email = models.EmailField(max_length=255)
    question = models.TextField()
    is_approved = models.BooleanField(default=False)
    approved_by = models.CharField(max_length=255, blank=True, null=True)
    approved_at = models.DateTimeField(blank=True, null=True)
    
    class Meta(TimeStampedModel.Meta):
        db_table = 'product_questions'
        verbose_name = 'Product Question'
        verbose_name_plural = 'Product Questions'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['product', 'is_approved']),
        ]
        
    def __str__(self):
        return f"Question by {self.user_name} on {self.product_id}"
    
    @property
    def answers_count(self):
        return self.answers.filter(is_approved=True).count()


class ProductAnswer(TimeStampedModel):
    """Answers to product questions"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey(
        ProductQuestion,
        on_delete=models.CASCADE,
        related_name='answers',
        db_column='question_id'
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='product_answers', null=True, blank=True)

    user_name = models.CharField(max_length=255)
    user_email = models.EmailField(max_length=255)
    answer = models.TextField()
    is_official = models.BooleanField(default=False)  # Staff/admin answer
    is_approved = models.BooleanField(default=False)
    is_best_answer = models.BooleanField(default=False)
    approved_by = models.CharField(max_length=255, blank=True, null=True)
    approved_at = models.DateTimeField(blank=True, null=True)
    helpful_count = models.IntegerField(default=0)  # Upvote count
    
    class Meta(TimeStampedModel.Meta):
        db_table = 'product_answers'
        verbose_name = 'Product Answer'
        verbose_name_plural = 'Product Answers'
        ordering = ['-is_best_answer', '-helpful_count', '-created_at']
        indexes = [
            models.Index(fields=['question', 'is_approved']),
        ]
        
    def __str__(self):
        return f"Answer by {self.user_name} to question {self.question_id}"


class AnswerVote(TimeStampedModel):
    """Track user votes on answers to prevent duplicate voting"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    answer = models.ForeignKey(
        ProductAnswer,
        on_delete=models.CASCADE,
        related_name='votes',
        db_column='answer_id'
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='answer_votes', null=True, blank=True)


    user_email = models.EmailField(max_length=255)
    
    class Meta(TimeStampedModel.Meta):
        db_table = 'answer_votes'
        verbose_name = 'Answer Vote'
        verbose_name_plural = 'Answer Votes'
        constraints = [
            models.UniqueConstraint(
                fields=['answer', 'user'],
                name='unique_answer_vote_per_user'
            )
        ]

        
    def __str__(self):
        return f"Vote by {self.user_email} on answer {self.answer_id}"
