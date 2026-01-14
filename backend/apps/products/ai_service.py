"""
AI-powered service for generating product specifications
Uses Google Gemini Vision API to analyze product images
"""
import os
import json
import re
import requests
from PIL import Image
from io import BytesIO
import base64
from google import genai

# Configure Gemini
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
client = None

if GEMINI_API_KEY:
    client = genai.Client(api_key=GEMINI_API_KEY)


def generate_specifications_from_image(image_url: str, product_name: str = '', product_description: str = ''):
    """
    Analyze product image using Gemini Vision and extract specifications
    
    Args:
        image_url: URL of the product image
        product_name: Optional product name for context
        product_description: Optional product description for context
        
    Returns:
        list: Array of specification dictionaries with keys 'key', 'value', 'position'
    """
    if not client:
        raise ValueError("Gemini API key not configured")
    
    try:
        # Prepare prompt
        prompt = f"""You are a product specification expert. Analyze this product image and extract technical specifications.

{f'Product Name: {product_name}' if product_name else ''}
{f'Description: {product_description}' if product_description else ''}

Please provide a JSON array of specifications in this exact format:
[
  {{"key": "Specification Name", "value": "Value", "position": 0}},
  {{"key": "Another Spec", "value": "Value", "position": 1}}
]

Focus on:
- Technical specifications (dimensions, weight, materials, capacity, power, voltage, etc.)
- Performance metrics (efficiency, output, ratings, wattage, etc.)
- Features and characteristics visible in the image
- Industry-standard specifications for this type of product

Be specific and use proper units (W, kW, V, A, mm, cm, kg, %, °C, etc.).
Return ONLY the JSON array, no additional text or explanation."""

        # Download image
        response = requests.get(image_url, timeout=10)
        response.raise_for_status()
        image_bytes = response.content
        
        # Determine MIME type from response or URL
        content_type = response.headers.get('content-type', 'image/jpeg')
        
        # Generate specifications using types.Part.from_bytes
        from google.genai import types
        
        result = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type=content_type
                ),
                prompt
            ]
        )
        
        response_text = result.text
        
        # Extract JSON from response
        json_match = re.search(r'\[[\s\S]*\]', response_text)
        if not json_match:
            return []
        
        specs = json.loads(json_match.group(0))
        
        # Ensure proper format
        formatted_specs = []
        for i, spec in enumerate(specs):
            formatted_specs.append({
                'key': spec.get('key', ''),
                'value': spec.get('value', ''),
                'position': i
            })
        
        return formatted_specs
        
    except Exception as e:
        print(f"Error generating specifications: {str(e)}")
        import traceback
        traceback.print_exc()
        raise


def is_ai_available():
    """Check if Gemini AI is configured and available"""
    return bool(client)


def refine_product_description(description: str, product_name: str = "") -> str:
    """
    Refine and enhance a product description using Gemini AI.
    
    Args:
        description: Original product description
        product_name: Optional product name for context
        
    Returns:
        Refined description text
    """
    if not client:
        raise ValueError("Gemini API key not configured")
    
    try:
        # Create prompt for description refinement
        prompt = f"""You are a professional product copywriter. Refine and enhance the following product description to make it more compelling, professional, and SEO-friendly.

Product Name: {product_name}

Original Description:
{description}

Requirements:
- Keep the core information and technical details
- Make it more engaging and persuasive
- Use professional, clear language
- Optimize for readability
- Keep it concise but comprehensive
- Maintain factual accuracy
- Return ONLY the refined description text, no explanations

Refined Description:"""

        # Generate refined description
        result = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        
        if not result or not result.text:
            raise ValueError("Empty response from Gemini")
        
        refined_text = result.text.strip()
        
        return refined_text
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise Exception(f"Failed to refine description: {str(e)}")
        