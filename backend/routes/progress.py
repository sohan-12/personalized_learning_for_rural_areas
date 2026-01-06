from flask import Blueprint, request, jsonify
from models.progress import Progress
from models.user import User
from models.course import Course
from database import db
from datetime import datetime

bp = Blueprint('progress', __name__, url_prefix='/api/progress')

@bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_progress(user_id):
    """Get all progress for a user"""
    progress_records = Progress.query.filter_by(user_id=user_id).all()
    return jsonify([p.to_dict() for p in progress_records])

@bp.route('/user/<int:user_id>/course/<int:course_id>', methods=['GET'])
def get_course_progress(user_id, course_id):
    """Get progress for specific course"""
    progress = Progress.query.filter_by(
        user_id=user_id,
        course_id=course_id
    ).first()
    
    if not progress:
        return jsonify({'message': 'No progress found'}), 404
    
    return jsonify(progress.to_dict())

@bp.route('/update', methods=['POST'])
def update_progress():
    """Update or create progress"""
    data = request.get_json()
    
    user_id = data['user_id']
    course_id = data['course_id']
    
    progress = Progress.query.filter_by(
        user_id=user_id,
        course_id=course_id
    ).first()
    
    if not progress:
        progress = Progress(user_id=user_id, course_id=course_id)
        db.session.add(progress)
    
    # Update fields
    if 'completed_lessons' in data:
        progress.completed_lessons = data['completed_lessons']
    if 'current_lesson' in data:
        progress.current_lesson = data['current_lesson']
    if 'progress_percentage' in data:
        progress.progress_percentage = data['progress_percentage']
    if 'time_spent_minutes' in data:
        progress.time_spent_minutes = data['time_spent_minutes']
    if 'skill_progress' in data:
        progress.skill_progress = data['skill_progress']
    if 'completed' in data:
        progress.completed = data['completed']
        # If marking as completed, set time_spent_minutes to course duration if not already set
        if data['completed'] and (not progress.time_spent_minutes or progress.time_spent_minutes == 0):
            course = Course.query.get(course_id)
            if course and course.duration_minutes:
                progress.time_spent_minutes = course.duration_minutes
    # Update user's micro-skills based on progress
    if 'skill_progress' in data:
        user = User.query.get(user_id)
        if user:
            current_micro_skills = set(user.micro_skills or [])
            new_skills = set(data['skill_progress'].keys())
            user.micro_skills = list(current_micro_skills.union(new_skills))
            user.last_active = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'progress': progress.to_dict()
    })
