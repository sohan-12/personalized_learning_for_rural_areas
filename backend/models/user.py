from database import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    preferred_language = db.Column(db.String(20), default='en')
    selected_skills = db.Column(db.JSON, default=[])
    skill_level = db.Column(db.String(20), default='beginner')
    assessment_completed = db.Column(db.Boolean, default=False)
    assessment_score = db.Column(db.Integer, default=0)
    career_interest = db.Column(db.String(100))
    learning_dna = db.Column(db.JSON, default={})  # Stores learning preferences
    micro_skills = db.Column(db.JSON, default=[])  # Granular skill tracking
    daily_streak = db.Column(db.Integer, default=0)
    stream = db.Column(db.String(50), default='general')  # User's academic stream (e.g., 'web-dev', 'data-science')
    last_active = db.Column(db.DateTime, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    progress = db.relationship('Progress', backref='user', lazy=True)
    assessments = db.relationship('Assessment', backref='user', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'preferred_language': self.preferred_language,
            'selected_skills': self.selected_skills,
            'skill_level': self.skill_level,
            'assessment_completed': self.assessment_completed,
            'assessment_score': self.assessment_score,
            'career_interest': self.career_interest,
            'learning_dna': self.learning_dna,
            'micro_skills': self.micro_skills,
            'daily_streak': self.daily_streak,
            'stream': self.stream,
            'last_active': self.last_active.isoformat() if self.last_active else None
        }
