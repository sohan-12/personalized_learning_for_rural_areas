from flask import Flask, jsonify, request
from flask_cors import CORS
from database import db
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///learnhub.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-this')
app.config['GOOGLE_CLIENT_ID'] = os.getenv('GOOGLE_CLIENT_ID')
app.config['GOOGLE_CLIENT_SECRET'] = os.getenv('GOOGLE_CLIENT_SECRET')

db.init_app(app)

# Import routes (after db is initialized)
from routes import auth, courses, progress, assessment

# Register blueprints
app.register_blueprint(auth.bp)
app.register_blueprint(courses.bp)
app.register_blueprint(progress.bp)
app.register_blueprint(assessment.bp)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'database': 'SQLite',
        'backend': 'Flask + Python'
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    print('Database initialized')
    print('Flask server running on http://localhost:5000')
    app.run(debug=True, port=5000, host='0.0.0.0')

