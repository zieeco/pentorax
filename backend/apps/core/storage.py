"""
Cloudflare R2 Storage Utility

Uses boto3 (S3-compatible) to interact with Cloudflare R2 storage.
Handles image uploads with validation, unique naming, and public URLs.
"""
import os
import uuid
import mimetypes
from io import BytesIO
from PIL import Image
import boto3
from botocore.config import Config
from django.conf import settings


# Allowed image types and max size
ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5MB
MAX_IMAGE_DIMENSIONS = (4096, 4096)


class R2StorageError(Exception):
    """Custom exception for R2 storage operations"""
    pass


def get_r2_client():
    """
    Create and return a boto3 S3 client configured for Cloudflare R2.
    """
    endpoint_url = os.getenv('R2_ENDPOINT_URL')
    access_key = os.getenv('R2_ACCESS_KEY_ID')
    secret_key = os.getenv('R2_SECRET_ACCESS_KEY')
    
    if not all([endpoint_url, access_key, secret_key]):
        raise R2StorageError("R2 credentials not configured in environment variables")
    
    return boto3.client(
        's3',
        endpoint_url=endpoint_url,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        region_name=os.getenv('R2_REGION', 'auto'),
        config=Config(signature_version='s3v4')
    )


def validate_image(file):
    """
    Validate uploaded image file.
    
    Args:
        file: Django UploadedFile or file-like object
        
    Returns:
        tuple: (is_valid, error_message or None)
    """
    # Check content type
    content_type = getattr(file, 'content_type', None)
    if content_type and content_type not in ALLOWED_IMAGE_TYPES:
        return False, f"Invalid image type. Allowed: {', '.join(ALLOWED_IMAGE_TYPES)}"
    
    # Check file size
    if hasattr(file, 'size') and file.size > MAX_IMAGE_SIZE:
        return False, f"Image too large. Maximum size: {MAX_IMAGE_SIZE // (1024*1024)}MB"
    
    # Validate it's actually an image
    try:
        file.seek(0)
        img = Image.open(file)
        img.verify()
        file.seek(0)
        
        # Check dimensions
        img = Image.open(file)
        if img.width > MAX_IMAGE_DIMENSIONS[0] or img.height > MAX_IMAGE_DIMENSIONS[1]:
            return False, f"Image dimensions too large. Maximum: {MAX_IMAGE_DIMENSIONS[0]}x{MAX_IMAGE_DIMENSIONS[1]}"
        
        file.seek(0)
    except Exception as e:
        return False, f"Invalid image file: {str(e)}"
    
    return True, None


def generate_unique_filename(original_filename: str, prefix: str = 'products') -> str:
    """
    Generate a unique filename for storage.
    
    Args:
        original_filename: Original file name
        prefix: Folder prefix in bucket
        
    Returns:
        str: Unique filename with path
    """
    ext = os.path.splitext(original_filename)[1].lower()
    if not ext:
        ext = '.jpg'
    
    unique_id = uuid.uuid4().hex[:12]
    return f"{prefix}/{unique_id}{ext}"


def upload_image(file, prefix: str = 'products') -> dict:
    """
    Upload an image to Cloudflare R2.
    
    Args:
        file: Django UploadedFile or file-like object
        prefix: Folder prefix in bucket
        
    Returns:
        dict: {
            'key': 'storage key',
            'url': 'public URL',
            'size': file_size,
            'content_type': 'image/jpeg'
        }
        
    Raises:
        R2StorageError: If upload fails
    """
    # Validate image
    is_valid, error = validate_image(file)
    if not is_valid:
        raise R2StorageError(error)
    
    # Get storage settings
    bucket_name = os.getenv('R2_BUCKET_NAME')
    public_url = os.getenv('R2_PUBLIC_URL', '').rstrip('/')
    
    if not bucket_name:
        raise R2StorageError("R2_BUCKET_NAME not configured")
    
    # Generate unique filename
    original_name = getattr(file, 'name', 'image.jpg')
    key = generate_unique_filename(original_name, prefix)
    
    # Determine content type
    content_type = getattr(file, 'content_type', None)
    if not content_type:
        content_type, _ = mimetypes.guess_type(original_name)
        if not content_type:
            content_type = 'image/jpeg'
    
    # Get file data
    file.seek(0)
    file_data = file.read()
    file_size = len(file_data)
    
    try:
        client = get_r2_client()
        
        # Upload to R2
        client.put_object(
            Bucket=bucket_name,
            Key=key,
            Body=file_data,
            ContentType=content_type,
            # Make publicly readable
            ACL='public-read'
        )
        
        # Build public URL
        url = f"{public_url}/{key}"
        
        return {
            'key': key,
            'url': url,
            'size': file_size,
            'content_type': content_type
        }
        
    except Exception as e:
        raise R2StorageError(f"Failed to upload image: {str(e)}")


def delete_image(key: str) -> bool:
    """
    Delete an image from Cloudflare R2.
    
    Args:
        key: Storage key of the image
        
    Returns:
        bool: True if deleted successfully
    """
    bucket_name = os.getenv('R2_BUCKET_NAME')
    
    if not bucket_name or not key:
        return False
    
    try:
        client = get_r2_client()
        client.delete_object(Bucket=bucket_name, Key=key)
        return True
    except Exception:
        return False


def get_public_url(key: str) -> str:
    """
    Get the public URL for a stored image.
    
    Args:
        key: Storage key
        
    Returns:
        str: Public URL
    """
    public_url = os.getenv('R2_PUBLIC_URL', '').rstrip('/')
    return f"{public_url}/{key}"
