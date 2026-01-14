"""
Review voting model
"""

import uuid
from django.db import models


class ReviewVote(models.Model):
    """Track user votes on reviews"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    review = models.ForeignKey(
        'reviews.Review',
        on_delete=models.CASCADE,
        related_name='votes',
        db_column='review_id'
    )
    user_id = models.CharField(max_length=255, db_index=True)
    user_email = models.EmailField(max_length=255)
    is_helpful = models.BooleanField()  # True = helpful, False = not helpful
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'review_votes'
        verbose_name = 'Review Vote'
        verbose_name_plural = 'Review Votes'
        constraints = [
            models.UniqueConstraint(
                fields=['review', 'user_email'],
                name='unique_review_vote_per_user'
            )
        ]
        
    def __str__(self):
        return f"Vote by {self.user_email} on review {self.review_id}"
