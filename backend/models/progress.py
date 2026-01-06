from database import db
from datetime import datetime

class Progress(db.Model):
    __tablename__ = 'progress'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    completed_lessons = db.Column(db.JSON, default=[])
    current_lesson = db.Column(db.Integer, default=0)
    progress_percentage = db.Column(db.Float, default=0.0)
    time_spent_minutes = db.Column(db.Integer, default=0)
    skill_progress = db.Column(db.JSON, default={})
    last_accessed = db.Column(db.DateTime, default=datetime.utcnow)
    completed = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'course_id': self.course_id,
            'completed_lessons': self.completed_lessons,
            'current_lesson': self.current_lesson,
            'progress_percentage': self.progress_percentage,
            'time_spent_minutes': self.time_spent_minutes,
            'skill_progress': self.skill_progress,
            'last_accessed': self.last_accessed.isoformat() if self.last_accessed else None,
            'completed': self.completed
        }
