from flask import Blueprint, request, jsonify, current_app
from models.user import User
from database import db
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
import os

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')

@bp.route('/google', methods=['POST'])
def google_login():
    """Handle Google OAuth login"""
    try:
        data = request.get_json()
        token = data.get('token')
        
        if not token:
            return jsonify({'success': False, 'error': 'Token is required'}), 400
        
        # Verify the token with Google
        try:
            client_id = current_app.config.get('GOOGLE_CLIENT_ID') or GOOGLE_CLIENT_ID
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), client_id)
            
            email = idinfo.get('email')
            name = idinfo.get('name')
            picture = idinfo.get('picture')
            
            # Find or create user
            user = User.query.filter_by(email=email).first()
            
            if not user:
                user = User(
                    name=name,
                    email=email,
                    preferred_language='en',
                    selected_skills=[],
                    skill_level='beginner'
                )
                db.session.add(user)
                db.session.commit()
            
            return jsonify({
                'success': True,
                'user': user.to_dict(),
                'message': 'Google login successful'
            })
            
        except ValueError as e:
            return jsonify({'success': False, 'error': 'Invalid token'}), 400
            
    except Exception as e:
        print(f"Google login error: {str(e)}")
        return jsonify({'success': False, 'error': 'Login failed'}), 500

@bp.route('/logout', methods=['POST'])
def logout():
    """Handle user logout"""
    try:
        return jsonify({
            'success': True,
            'message': 'Logout successful'
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/user/<int:user_id>/delete', methods=['DELETE'])
def delete_user(user_id):
    """Delete user account"""
    try:
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'User account deleted successfully'
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/demo', methods=['POST'])
def demo_login():
    """Create or get demo user"""
    demo_email = 'demo@learnhub.com'
    
    user = User.query.filter_by(email=demo_email).first()
    
    if not user:
        user = User(
            name='Demo User',
            email=demo_email,
            preferred_language='en',
            selected_skills=[],
            skill_level='beginner'
        )
        db.session.add(user)
        db.session.commit()
    
    return jsonify({
        'success': True,
        'user': user.to_dict(),
        'message': 'Demo login successful'
    })

@bp.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get user details"""
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@bp.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Update user details"""
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    # Update allowed fields
    allowed_fields = [
        'name', 'preferred_language', 'selected_skills', 'skill_level',
        'assessment_completed', 'assessment_score', 'career_interest',
        'learning_dna', 'micro_skills', 'daily_streak'
    ]
    
    for field in allowed_fields:
        if field in data:
            setattr(user, field, data[field])
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'user': user.to_dict()
    })

@bp.route('/user/<int:user_id>/language', methods=['PUT'])
def update_language(user_id):
    """Update user's preferred language"""
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    if 'language' not in data:
        return jsonify({'success': False, 'error': 'Language is required'}), 400
    
    # Validate language code
    valid_languages = ['en', 'hi', 'te', 'ta', 'bn']
    if data['language'] not in valid_languages:
        return jsonify({'success': False, 'error': 'Invalid language code'}), 400
    
    user.preferred_language = data['language']
    db.session.commit()
    
    return jsonify({
        'success': True,
        'user': user.to_dict(),
        'message': f'Language updated to {data["language"]}'
    })
@bp.route('/user/<int:user_id>/stream', methods=['PUT'])
def update_stream(user_id):
    """Update user's stream"""
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    if 'stream' not in data:
        return jsonify({'success': False, 'error': 'Stream is required'}), 400
    
    # Validate stream - allow any stream name
    user.stream = data['stream']
    db.session.commit()
    
    return jsonify({
        'success': True,
        'user': user.to_dict(),
        'message': f'Stream updated to {data["stream"]}'
    })