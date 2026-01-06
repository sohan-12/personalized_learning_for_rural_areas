from database import db
from datetime import datetime

class Assessment(db.Model):
    __tablename__ = 'assessments'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    assessment_type = db.Column(db.String(50))  # skill, career, learning_style
    questions = db.Column(db.JSON, default=[])
    answers = db.Column(db.JSON, default={})
    score = db.Column(db.Integer)
    recommended_level = db.Column(db.String(20))
    learning_dna_profile = db.Column(db.JSON, default={})  # Learning preferences
    completed_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'assessment_type': self.assessment_type,
            'questions': self.questions,
            'answers': self.answers,
            'score': self.score,
            'recommended_level': self.recommended_level,
            'learning_dna_profile': self.learning_dna_profile,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None
        }
