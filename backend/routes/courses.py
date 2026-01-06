from flask import Blueprint, request, jsonify
from models.course import Course
from models.user import User
from models.progress import Progress
from ai_recommendation.recommendation_engine import RecommendationEngine
from database import db

bp = Blueprint('courses', __name__, url_prefix='/api/courses')
recommender = RecommendationEngine()

@bp.route('/', methods=['GET'])
def get_courses():
    """Get all courses"""
    courses = Course.query.all()
    return jsonify([course.to_dict() for course in courses])

@bp.route('/<int:course_id>', methods=['GET'])
def get_course(course_id):
    """Get specific course"""
    course = Course.query.get_or_404(course_id)
    return jsonify(course.to_dict())

@bp.route('/<int:user_id>/complete/<int:course_id>', methods=['POST'])
def mark_course_complete(user_id, course_id):
    """Mark a course as completed by user"""
    user = User.query.get_or_404(user_id)
    course = Course.query.get_or_404(course_id)
    
    # Get time spent from request if provided
    data = request.get_json() or {}
    time_spent_minutes = data.get('time_spent_minutes', None)
    
    # Add course to completed courses
    completed = user.completed_courses if hasattr(user, 'completed_courses') else []
    if isinstance(completed, str):
        try:
            import json
            completed = json.loads(completed)
        except:
            completed = []
    
    course_id_str = str(course_id)
    if course_id_str not in completed:
        completed.append(course_id_str)
        user.completed_courses = completed
    
    # Add course skills to user's micro skills
    course_skills = course.skills if isinstance(course.skills, list) else []
    micro_skills = user.micro_skills if hasattr(user, 'micro_skills') else []
    if isinstance(micro_skills, str):
        try:
            import json
            micro_skills = json.loads(micro_skills)
        except:
            micro_skills = []
    
    for skill in course_skills:
        if skill not in micro_skills:
            micro_skills.append(skill)
    
    user.micro_skills = micro_skills
    
    # Update or create progress record
    progress = Progress.query.filter_by(user_id=user_id, course_id=course_id).first()
    if not progress:
        progress = Progress(user_id=user_id, course_id=course_id)
        db.session.add(progress)
    
    progress.completed = True
    progress.progress_percentage = 100.0
    
    # Set time_spent_minutes - use actual time if provided, otherwise use course duration
    if time_spent_minutes:
        progress.time_spent_minutes = int(time_spent_minutes)
    elif course.duration_minutes:
        progress.time_spent_minutes = course.duration_minutes
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': f'Course {course.title} marked as completed',
        'completed_courses': completed,
        'micro_skills': micro_skills
    })


@bp.route('/recommendations/<int:user_id>', methods=['GET'])
def get_recommendations(user_id):
    """Get personalized course recommendations using AI"""
    user = User.query.get_or_404(user_id)
    all_courses = Course.query.all()
    
    # Use AI recommendation engine
    recommended_courses = recommender.get_recommendations(all_courses, user, limit=10)
    
    return jsonify({
        'success': True,
        'recommendations': recommended_courses,
        'user_profile': {
            'skills': user.selected_skills,
            'level': user.skill_level,
            'career_interest': user.career_interest
        }
    })

@bp.route('/', methods=['POST'])
def create_course():
    """Create new course (admin)"""
    data = request.get_json()
    
    course = Course(
        title=data['title'],
        description=data.get('description'),
        category=data.get('category'),
        difficulty=data.get('difficulty', 'beginner'),
        skills=data.get('skills', []),
        lessons=data.get('lessons', []),
        duration_minutes=data.get('duration_minutes', 0),
        prerequisites=data.get('prerequisites', []),
        learning_outcomes=data.get('learning_outcomes', []),
        career_relevance=data.get('career_relevance'),
        content_tags=data.get('content_tags', [])
    )
    
    db.session.add(course)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'course': course.to_dict()
    }), 201
