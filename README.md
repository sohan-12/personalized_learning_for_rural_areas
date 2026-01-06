# LearnHub - AI-Powered Learning Platform

## Tech Stack (As Per Requirements)

### Frontend

- **React + JavaScript** - Component-based UI
- **PWA** - Progressive Web App with offline support
- **TailwindCSS** - Styling
- **Vite** - Build tool

### Backend

- **Python + Flask** - RESTful API server
- **SQLAlchemy** - ORM

### Database

- **SQLite** - Hackathon-friendly, no setup required

### AI Recommendation

- **Python** - Core AI logic
- **Rule-based filtering** - Skill level, prerequisites matching
- **Content-based filtering** - TF-IDF similarity
- **Learning DNA** - Personalized learning style matching
- **Micro-skills tracking** - Granular skill progression

## Project Structure

```
ANITS/
├── backend/
│   ├── app.py                  # Flask app entry point
│   ├── requirements.txt        # Python dependencies
│   ├── seed_data.py           # Database seeder
│   ├── models/
│   │   ├── user.py            # User model
│   │   ├── course.py          # Course model
│   │   ├── progress.py        # Progress tracking
│   │   └── assessment.py      # Assessment model
│   ├── routes/
│   │   ├── auth.py            # Authentication routes
│   │   ├── courses.py         # Course routes
│   │   ├── progress.py        # Progress routes
│   │   └── assessment.py      # Assessment routes
│   └── ai_recommendation/
│       └── recommendation_engine.py  # AI recommendation system
└── frontend/
    ├── package.json
    ├── vite.config.js         # PWA configuration
    ├── src/
    │   ├── main.jsx           # Entry point with SW registration
    │   ├── App.jsx            # Router setup
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Skills.jsx
    │   │   ├── Assessment.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Courses.jsx
    │   │   └── Learn.jsx
    │   └── index.css
    └── public/
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Create virtual environment (optional but recommended):

```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Initialize database and seed data:

```bash
python seed_data.py
```

5. Run Flask server:

```bash
python app.py
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Features

### AI Recommendation System

- **Rule-based filtering**: Matches courses based on user skill level and prerequisites
- **Content-based filtering**: Uses TF-IDF to find similar courses based on content
- **Learning DNA matching**: Adapts to user's preferred learning style (video/text/interactive)
- **Micro-skills progression**: Tracks granular skills and recommends next steps

### User Flow

1. **Login** - Demo login (no authentication required)
2. **Skill Selection** - Choose interests
3. **Assessment** - Answer questions to build learning DNA profile
4. **Dashboard** - View personalized recommendations and progress
5. **Courses** - Browse all available courses
6. **Learning** - Interactive lesson interface with progress tracking

### PWA Features

- Offline support
- Install as app
- Fast loading
- Cache API responses

## API Endpoints

### Authentication

- `POST /api/auth/demo` - Demo login
- `GET /api/auth/user/<id>` - Get user
- `PUT /api/auth/user/<id>` - Update user

### Courses

- `GET /api/courses/` - List all courses
- `GET /api/courses/<id>` - Get course details
- `GET /api/courses/recommendations/<user_id>` - AI recommendations
- `POST /api/courses/` - Create course (admin)

### Progress

- `GET /api/progress/user/<user_id>` - Get user progress
- `GET /api/progress/user/<user_id>/course/<course_id>` - Get course progress
- `POST /api/progress/update` - Update progress

### Assessment

- `GET /api/assessment/questions` - Get questions
- `POST /api/assessment/submit` - Submit assessment
- `GET /api/assessment/user/<user_id>` - Get user assessments

## Development

### Add New Courses

Edit `backend/seed_data.py` and run:

```bash
python seed_data.py
```

### Customize AI Recommendations

Edit `backend/ai_recommendation/recommendation_engine.py` to adjust:

- Filtering rules
- Similarity weights
- Learning DNA factors
- Scoring algorithms

## Production Build

### Frontend

```bash
cd frontend
npm run build
```

### Backend

Deploy Flask app with gunicorn:

```bash
pip install gunicorn
gunicorn app:app
```
