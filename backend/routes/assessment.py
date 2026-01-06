from flask import Blueprint, request, jsonify
from models.assessment import Assessment
from models.user import User
from database import db

bp = Blueprint('assessment', __name__, url_prefix='/api/assessment')

import random

# Stream-specific question banks
QUESTION_BANKS = {
    'web-dev': [
        {
            'question': 'What does HTML stand for?',
            'type': 'multiple_choice',
            'options': ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
            'skill': 'html_css',
            'correct_answer': 0
        },
        {
            'question': 'Which CSS property is used to change the text color?',
            'type': 'multiple_choice',
            'options': ['text-color', 'color', 'font-color', 'text-style'],
            'skill': 'html_css',
            'correct_answer': 1
        },
        {
            'question': 'What is the correct JavaScript syntax to change the content of an HTML element?',
            'type': 'multiple_choice',
            'options': ['document.getElement("id").innerHTML = "New"', 'document.getElementById("id").innerHTML = "New"', '#id.innerHTML = "New"', 'document.getElementByName("id") = "New"'],
            'skill': 'javascript',
            'correct_answer': 1
        },
        {
            'question': 'Which of the following is used to create a component in React?',
            'type': 'multiple_choice',
            'options': ['function', 'class', 'Both function and class', 'component keyword'],
            'skill': 'frameworks',
            'correct_answer': 2
        },
        {
            'question': 'What does API stand for?',
            'type': 'multiple_choice',
            'options': ['Application Programming Interface', 'Advanced Programming Interface', 'Application Process Integration', 'Advanced Process Interface'],
            'skill': 'api_interest',
            'correct_answer': 0
        },
        {
            'question': 'Which HTTP method is used to retrieve data from a server?',
            'type': 'multiple_choice',
            'options': ['POST', 'PUT', 'GET', 'DELETE'],
            'skill': 'api_interest',
            'correct_answer': 2
        },
        {
            'question': 'What is Node.js?',
            'type': 'multiple_choice',
            'options': ['A JavaScript framework', 'A JavaScript runtime environment', 'A database', 'A CSS preprocessor'],
            'skill': 'backend_interest',
            'correct_answer': 1
        },
        {
            'question': 'Which command is used to initialize a Git repository?',
            'type': 'multiple_choice',
            'options': ['git start', 'git init', 'git create', 'git new'],
            'skill': 'git',
            'correct_answer': 1
        },
    ],
    'programming': [
        {
            'question': 'What is the time complexity of binary search?',
            'type': 'multiple_choice',
            'options': ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
            'skill': 'dsa',
            'correct_answer': 1
        },
        {
            'question': 'Which data structure uses LIFO (Last In First Out) principle?',
            'type': 'multiple_choice',
            'options': ['Queue', 'Stack', 'Array', 'Tree'],
            'skill': 'dsa',
            'correct_answer': 1
        },
        {
            'question': 'What is encapsulation in OOP?',
            'type': 'multiple_choice',
            'options': ['Hiding implementation details', 'Creating objects', 'Inheriting properties', 'Polymorphism'],
            'skill': 'oop',
            'correct_answer': 0
        },
        {
            'question': 'Which of these is NOT a pillar of Object-Oriented Programming?',
            'type': 'multiple_choice',
            'options': ['Inheritance', 'Polymorphism', 'Compilation', 'Encapsulation'],
            'skill': 'oop',
            'correct_answer': 2
        },
        {
            'question': 'What does IDE stand for?',
            'type': 'multiple_choice',
            'options': ['Integrated Development Environment', 'Internal Development Engine', 'Interactive Design Environment', 'Integrated Design Engine'],
            'skill': 'programming_level',
            'correct_answer': 0
        },
        {
            'question': 'Which sorting algorithm has the best average-case time complexity?',
            'type': 'multiple_choice',
            'options': ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Selection Sort'],
            'skill': 'dsa',
            'correct_answer': 2
        },
        {
            'question': 'What is recursion in programming?',
            'type': 'multiple_choice',
            'options': ['A loop that never ends', 'A function calling itself', 'A data structure', 'A sorting technique'],
            'skill': 'programming_level',
            'correct_answer': 1
        },
    ],
    'data-science': [
        {
            'question': 'What is your experience with data analysis?',
            'type': 'multiple_choice',
            'options': ['No experience', 'Basic Excel/spreadsheets', 'Python/R for analysis', 'Advanced ML models'],
            'skill': 'data_analysis'
        },
        {
            'question': 'How comfortable are you with statistics and mathematics?',
            'type': 'multiple_choice',
            'options': ['Not comfortable', 'Basic concepts', 'College level', 'Advanced statistics'],
            'skill': 'statistics'
        },
        {
            'question': 'Rate your interest in: Machine learning and AI',
            'type': 'rating',
            'skill': 'ml_interest'
        },
        {
            'question': 'Have you worked with data visualization tools?',
            'type': 'multiple_choice',
            'options': ['No', 'Excel charts', 'Tableau/PowerBI', 'Python libraries (matplotlib/seaborn)'],
            'skill': 'visualization'
        },
        {
            'question': 'Rate your interest in: Big data technologies (Spark, Hadoop)',
            'type': 'rating',
            'skill': 'bigdata_interest'
        },
        {
            'question': 'What aspect of data science interests you most?',
            'type': 'multiple_choice',
            'options': ['Data cleaning & preparation', 'Statistical analysis', 'Machine learning', 'Data visualization'],
            'skill': 'ds_focus'
        },
        {
            'question': 'Rate your interest in: Deep learning and neural networks',
            'type': 'rating',
            'skill': 'deep_learning'
        },
    ],
    'ai-deep-learning': [
        {
            'question': 'What is your experience with artificial intelligence?',
            'type': 'multiple_choice',
            'options': ['Complete beginner', 'Understand concepts', 'Built ML models', 'Deep learning expert'],
            'skill': 'ai_level'
        },
        {
            'question': 'Have you worked with machine learning frameworks?',
            'type': 'multiple_choice',
            'options': ['Never', 'Tried tutorials', 'Built models with TensorFlow/PyTorch', 'Production ML systems'],
            'skill': 'ml_frameworks'
        },
        {
            'question': 'Rate your interest in: Neural networks and deep learning',
            'type': 'rating',
            'skill': 'neural_networks'
        },
        {
            'question': 'How comfortable are you with Python for AI/ML?',
            'type': 'multiple_choice',
            'options': ['Not comfortable', 'Basic Python', 'NumPy/Pandas user', 'Advanced ML libraries'],
            'skill': 'python_ml'
        },
        {
            'question': 'Rate your interest in: Natural Language Processing (NLP)',
            'type': 'rating',
            'skill': 'nlp_interest'
        },
        {
            'question': 'Rate your interest in: Computer Vision',
            'type': 'rating',
            'skill': 'cv_interest'
        },
        {
            'question': 'What AI application interests you most?',
            'type': 'multiple_choice',
            'options': ['Chatbots & NLP', 'Image recognition', 'Recommendation systems', 'Generative AI'],
            'skill': 'ai_application'
        },
        {
            'question': 'Rate your interest in: Building AI-powered applications',
            'type': 'rating',
            'skill': 'ai_apps'
        },
    ],
    'mobile-dev': [
        {
            'question': 'What is your mobile development experience?',
            'type': 'multiple_choice',
            'options': ['No experience', 'Tried tutorials', 'Built simple apps', 'Published apps'],
            'skill': 'mobile_level'
        },
        {
            'question': 'Which mobile platform interests you most?',
            'type': 'multiple_choice',
            'options': ['Android', 'iOS', 'Cross-platform (React Native/Flutter)', 'Both native'],
            'skill': 'platform_preference'
        },
        {
            'question': 'Rate your interest in: Android development with Kotlin',
            'type': 'rating',
            'skill': 'android_interest'
        },
        {
            'question': 'Rate your interest in: iOS development with Swift',
            'type': 'rating',
            'skill': 'ios_interest'
        },
        {
            'question': 'Have you worked with mobile UI frameworks?',
            'type': 'multiple_choice',
            'options': ['No', 'Basic layouts', 'Complex UI', 'Custom animations'],
            'skill': 'mobile_ui'
        },
        {
            'question': 'Rate your interest in: Building cross-platform apps',
            'type': 'rating',
            'skill': 'crossplatform'
        },
        {
            'question': 'What type of mobile apps interest you?',
            'type': 'multiple_choice',
            'options': ['Social media apps', 'E-commerce apps', 'Games', 'Productivity tools'],
            'skill': 'app_type'
        },
    ],
    'design': [
        {
            'question': 'What is your design experience level?',
            'type': 'multiple_choice',
            'options': ['No experience', 'Basic concepts', 'Some projects', 'Professional designer'],
            'skill': 'design_level'
        },
        {
            'question': 'Have you used design tools like Figma or Adobe XD?',
            'type': 'multiple_choice',
            'options': ['Never', 'Tried once', 'Regular user', 'Expert'],
            'skill': 'design_tools'
        },
        {
            'question': 'Rate your interest in: UI design and visual aesthetics',
            'type': 'rating',
            'skill': 'ui_interest'
        },
        {
            'question': 'Rate your interest in: UX research and user testing',
            'type': 'rating',
            'skill': 'ux_interest'
        },
        {
            'question': 'What aspect of design interests you most?',
            'type': 'multiple_choice',
            'options': ['Visual design', 'User research', 'Prototyping', 'Design systems'],
            'skill': 'design_focus'
        },
        {
            'question': 'Rate your interest in: Creating design systems',
            'type': 'rating',
            'skill': 'design_systems'
        },
    ],
    'marketing': [
        {
            'question': 'What is your digital marketing experience?',
            'type': 'multiple_choice',
            'options': ['No experience', 'Social media user', 'Managed campaigns', 'Marketing professional'],
            'skill': 'marketing_level'
        },
        {
            'question': 'Which marketing area interests you most?',
            'type': 'multiple_choice',
            'options': ['Social media marketing', 'SEO & content', 'Email marketing', 'Paid advertising'],
            'skill': 'marketing_focus'
        },
        {
            'question': 'Rate your interest in: SEO and content strategy',
            'type': 'rating',
            'skill': 'seo_interest'
        },
        {
            'question': 'Have you worked with analytics tools (Google Analytics)?',
            'type': 'multiple_choice',
            'options': ['Never', 'Basic viewing', 'Can create reports', 'Advanced analysis'],
            'skill': 'analytics'
        },
        {
            'question': 'Rate your interest in: Social media advertising',
            'type': 'rating',
            'skill': 'social_ads'
        },
        {
            'question': 'Rate your interest in: Email marketing and automation',
            'type': 'rating',
            'skill': 'email_marketing'
        },
        {
            'question': 'What is your goal with digital marketing?',
            'type': 'multiple_choice',
            'options': ['Promote personal brand', 'Business growth', 'Career change', 'Freelancing'],
            'skill': 'marketing_goal'
        },
    ],
}

# General questions for all users
GENERAL_QUESTIONS = [
    {
        'question': 'How would you rate your current technical knowledge?',
        'type': 'multiple_choice',
        'options': ['Complete beginner', 'Some basics', 'Intermediate', 'Advanced'],
        'skill': 'technical_level'
    },
    {
        'question': 'What is your preferred way of learning?',
        'type': 'multiple_choice',
        'options': ['Watching videos', 'Reading articles', 'Interactive coding', 'Project-based'],
        'skill': 'learning_style'
    },
    {
        'question': 'How much time can you dedicate to learning per day?',
        'type': 'multiple_choice',
        'options': ['Less than 30 min', '30-60 min', '1-2 hours', 'More than 2 hours'],
        'skill': 'time_commitment'
    },
    {
        'question': 'Which best describes your learning goal?',
        'type': 'multiple_choice',
        'options': ['Career change', 'Skill upgrade', 'Hobby/Personal interest', 'Academic requirement'],
        'skill': 'goal'
    },
]

@bp.route('/questions', methods=['GET'])
def get_questions():
    """Get randomized assessment questions based on selected skills"""
    # Get user's selected skills from query parameter
    selected_skills_param = request.args.get('skills', '')
    selected_skills = selected_skills_param.split(',') if selected_skills_param else []
    
    question_pool = []
    question_pool = []
    
    # Add general questions (always included)
    question_pool.extend(GENERAL_QUESTIONS)
    
    # Add stream-specific questions based on selected skills
    for skill in selected_skills:
        if skill in QUESTION_BANKS:
            # Randomly select 4-5 questions from each selected stream
            stream_questions = random.sample(
                QUESTION_BANKS[skill], 
                min(5, len(QUESTION_BANKS[skill]))
            )
            question_pool.extend(stream_questions)
    
    # If no skills selected, add a mix from all streams
    if not selected_skills:
        for stream, questions in QUESTION_BANKS.items():
            question_pool.extend(random.sample(questions, min(2, len(questions))))
    
    # Shuffle all questions and select 10-12 for the assessment
    random.shuffle(question_pool)
    selected_questions = question_pool[:min(12, len(question_pool))]
    
    # Re-index questions
    for idx, q in enumerate(selected_questions, 1):
        q['id'] = idx
    
    return jsonify(selected_questions)

@bp.route('/submit', methods=['POST'])
def submit_assessment():
    """Submit assessment and generate learning DNA"""
    data = request.get_json()
    user_id = data['user_id']
    answers = data['answers']
    
    # Calculate score and learning DNA
    score = 0
    learning_dna = {
        'visual': 0.5,
        'interactive': 0.5,
        'text': 0.5,
        'video': 0.5,
        'practical': 0.5,
        'theoretical': 0.5
    }
    
    # Analyze answers to build learning DNA profile
    for question_id, answer in answers.items():
        if 'video' in str(answer).lower():
            learning_dna['video'] = 0.8
            learning_dna['visual'] = 0.7
        if 'interactive' in str(answer).lower() or 'coding' in str(answer).lower():
            learning_dna['interactive'] = 0.8
            learning_dna['practical'] = 0.8
        if 'reading' in str(answer).lower() or 'article' in str(answer).lower():
            learning_dna['text'] = 0.8
            learning_dna['theoretical'] = 0.6
        if 'hands-on' in str(answer).lower():
            learning_dna['practical'] = 0.9
        if 'theory' in str(answer).lower():
            learning_dna['theoretical'] = 0.8
    
    # Determine skill level
    level_map = {
        'No experience': 'beginner',
        'Beginner': 'beginner',
        'Intermediate': 'intermediate',
        'Advanced': 'advanced'
    }
    
    recommended_level = 'beginner'
    if '1' in answers:
        recommended_level = level_map.get(answers['1'], 'beginner')
    
    # Save assessment
    assessment = Assessment(
        user_id=user_id,
        assessment_type='initial',
        questions=[],
        answers=answers,
        score=score,
        recommended_level=recommended_level,
        learning_dna_profile=learning_dna
    )
    db.session.add(assessment)
    
    # Update user - PRESERVE existing micro_skills
    user = User.query.get(user_id)
    if user:
        # Store existing skills data before update
        existing_micro_skills = user.micro_skills if hasattr(user, 'micro_skills') else None
        existing_selected_skills = user.selected_skills if hasattr(user, 'selected_skills') else []
        
        user.assessment_completed = True
        user.assessment_score = score
        user.skill_level = recommended_level
        user.learning_dna = learning_dna
        
        # Set career_interest from the first selected skill (primary focus)
        if existing_selected_skills and isinstance(existing_selected_skills, list):
            user.career_interest = existing_selected_skills[0]
        elif '4' in answers:
            user.career_interest = answers['4']
        
        # Restore micro_skills if they existed (from completed courses)
        if existing_micro_skills:
            user.micro_skills = existing_micro_skills
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'assessment': assessment.to_dict(),
        'learning_dna': learning_dna,
        'recommended_level': recommended_level
    })

@bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_assessments(user_id):
    """Get all assessments for a user"""
    assessments = Assessment.query.filter_by(user_id=user_id).all()
    return jsonify([a.to_dict() for a in assessments])
