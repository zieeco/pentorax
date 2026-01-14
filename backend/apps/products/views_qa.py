"""
Product Q&A ViewSets
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone


class ProductQAViewSet(viewsets.ViewSet):
    """
    ViewSet for product questions and answers
    
    Endpoints:
    - GET /api/products/<product_id>/questions/ - List approved questions
    - POST /api/products/<product_id>/questions/ask/ - Ask a question
    - POST /api/products/questions/<question_id>/answer/ - Answer a question
    - POST /api/products/answers/<answer_id>/vote/ - Vote on answer
    """
    
    permission_classes = [AllowAny]
    
    def list(self, request, product_pk=None):
        """List all approved questions for a product"""
        questions = ProductQuestion.objects.filter(
            product_id=product_pk,
            is_approved=True
        ).prefetch_related('answers')
        
        serializer = ProductQuestionSerializer(
            questions, 
            many=True,
            context={'request': request}
        )
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def ask(self, request, product_pk=None):
        """Submit a new question"""
        data = request.data.copy()
        data['product_id'] = product_pk
        
        # Get user info
        if request.user and isinstance(request.user, dict):
            data.setdefault('user_id', request.user.get('sub'))
            data.setdefault('user_email', request.user.get('email'))
        
        serializer = ProductQuestionSerializer(data=data)
        if serializer.is_valid():
            question = ProductQuestion.objects.create(
                product_id=serializer.validated_data['product_id'],
                user_id=data.get('user_id', ''),
                user_name=serializer.validated_data['user_name'],
                user_email=data.get('user_email', ''),
                question=serializer.validated_data['question'],
            )
            return Response(
                ProductQuestionSerializer(question).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'], url_path='answer')
    def answer_question(self, request, pk=None):
        """Submit an answer to a question"""
        try:
            question = ProductQuestion.objects.get(pk=pk, is_approved=True)
        except ProductQuestion.DoesNotExist:
            return Response(
                {'error': 'Question not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        data = request.data.copy()
        data['question_id'] = pk
        
        if request.user and isinstance(request.user, dict):
            data.setdefault('user_id', request.user.get('sub'))
            data.setdefault('user_email', request.user.get('email'))
        
        serializer = ProductAnswerSerializer(data=data)
        if serializer.is_valid():
            answer = ProductAnswer.objects.create(
                question=question,
                user_id=data.get('user_id', ''),
                user_name=serializer.validated_data['user_name'],
                user_email=data.get('user_email', ''),
                answer=serializer.validated_data['answer'],
            )
            return Response(
                ProductAnswerSerializer(answer, context={'request': request}).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnswerVoteViewSet(viewsets.ViewSet):
    """ViewSet for voting on answers"""
    
    permission_classes = [AllowAny]
    
    @action(detail=True, methods=['post'])
    def vote(self, request, pk=None):
        """Vote on an answer (upvote)"""
        try:
            answer = ProductAnswer.objects.get(pk=pk, is_approved=True)
        except ProductAnswer.DoesNotExist:
            return Response(
                {'error': 'Answer not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        user_email = request.data.get('email', '')
        if not user_email:
            return Response(
                {'error': 'Email is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user_id = ''
        if request.user and isinstance(request.user, dict):
            user_id = request.user.get('sub', '')
        
        # Check if already voted
        if AnswerVote.objects.filter(answer=answer, user_email=user_email).exists():
            return Response(
                {'error': 'Already voted on this answer'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create vote
        AnswerVote.objects.create(
            answer=answer,
            user_id=user_id,
            user_email=user_email
        )
        
        # Update count
        answer.helpful_count = answer.votes.count()
        answer.save()
        
        return Response(
            {'message': 'Vote recorded', 'helpful_count': answer.helpful_count},
            status=status.HTTP_200_OK
        )
