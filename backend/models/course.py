from database import db

class Course(db.Model):
    __tablename__ = 'courses'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50))
    stream = db.Column(db.String(50), default='general')  # Stream this course belongs to (e.g., 'web-dev', 'data-science')
    difficulty = db.Column(db.String(20))
    skills = db.Column(db.JSON, default=[])
    lessons = db.Column(db.JSON, default=[])
    duration_minutes = db.Column(db.Integer)
    prerequisites = db.Column(db.JSON, default=[])
    learning_outcomes = db.Column(db.JSON, default=[])
    career_relevance = db.Column(db.String(200))
    enrolled_count = db.Column(db.Integer, default=0)
    rating = db.Column(db.Float, default=0.0)
    content_tags = db.Column(db.JSON, default=[])  # For content-based filtering
    video_url = db.Column(db.String(500))  # YouTube/Udemy course URL (default English)
    video_urls_multilang = db.Column(db.JSON, default={})  # Multi-language video URLs {lang: url}
    thumbnail = db.Column(db.String(500))  # Course thumbnail image
    instructor = db.Column(db.String(200))  # Course instructor name
    available_languages = db.Column(db.JSON, default=['en'])  # List of available languages
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'stream': self.stream,
            'difficulty': self.difficulty,
            'skills': self.skills,
            'lessons': self.lessons,
            'duration_minutes': self.duration_minutes,
            'prerequisites': self.prerequisites,
            'learning_outcomes': self.learning_outcomes,
            'career_relevance': self.career_relevance,
            'enrolled_count': self.enrolled_count,
            'rating': self.rating,
            'content_tags': self.content_tags,
            'video_url': self.video_url,
            'video_urls_multilang': self.video_urls_multilang or {},
            'thumbnail': self.thumbnail,
            'instructor': self.instructor,
            'available_languages': self.available_languages or ['en']
        }
