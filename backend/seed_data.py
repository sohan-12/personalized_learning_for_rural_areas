from app import app
from database import db
from models.course import Course

def seed_courses():
    """Seed sample courses with rich content and real video URLs"""
    
    courses_data = [
        {
            'title': 'Complete Web Development Bootcamp',
            'description': 'Master HTML, CSS, JavaScript, React, Node.js and become a full-stack developer',
            'category': 'Web Development',
            'difficulty': 'beginner',
            'skills': ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
            'duration_minutes': 3600,
            'prerequisites': [],
            'learning_outcomes': [
                'Build complete web applications',
                'Master frontend and backend development',
                'Deploy projects to production',
                'Work with modern frameworks'
            ],
            'career_relevance': 'Essential for full-stack developer roles',
            'content_tags': ['web', 'fullstack', 'javascript', 'react', 'bootcamp'],
            'video_url': 'https://www.youtube.com/watch?v=nu_pCVPKzTk',
            'video_urls_multilang': {
                'en': 'https://www.youtube.com/watch?v=nu_pCVPKzTk',
                'hi': 'https://www.youtube.com/watch?v=6mbwJ2xhgzM',  # Hindi Web Dev Course
                'te': 'https://www.youtube.com/watch?v=FKLzg2xb6qs',  # Telugu Web Dev Course
                'ta': 'https://www.youtube.com/watch?v=qz0aGYrrlhU'   # Tamil Web Dev Course
            },
            'available_languages': ['en', 'hi', 'te', 'ta'],
            'thumbnail': 'https://img.youtube.com/vi/nu_pCVPKzTk/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.8,
            'enrolled_count': 15420,
            'lessons': [
                {'id': 1, 'title': 'HTML Fundamentals', 'type': 'video', 'duration': 45, 'video_url': 'https://www.youtube.com/watch?v=pQN-pnXPaVg'},
                {'id': 2, 'title': 'CSS Mastery', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=1Rs2ND1ryYc'},
                {'id': 3, 'title': 'JavaScript ES6+', 'type': 'video', 'duration': 90, 'video_url': 'https://www.youtube.com/watch?v=PkZNo7MFNFg'},
                {'id': 4, 'title': 'React Basics', 'type': 'video', 'duration': 75, 'video_url': 'https://www.youtube.com/watch?v=bMknfKXIFA8'}
            ]
        },
        {
            'title': 'Python Programming Masterclass',
            'description': 'From zero to hero: Learn Python programming with practical projects and exercises',
            'category': 'Programming',
            'difficulty': 'beginner',
            'skills': ['Python', 'OOP', 'Data Structures', 'Algorithms', 'Django'],
            'duration_minutes': 2400,
            'prerequisites': [],
            'learning_outcomes': [
                'Write clean Python code',
                'Build real-world applications',
                'Master object-oriented programming',
                'Work with databases and APIs'
            ],
            'career_relevance': 'Foundation for data science, AI, and backend development',
            'content_tags': ['python', 'programming', 'backend', 'django', 'automation'],
            'video_url': 'https://www.youtube.com/watch?v=rfscVS0vtbw',
            'video_urls_multilang': {
                'en': 'https://www.youtube.com/watch?v=rfscVS0vtbw',
                'hi': 'https://www.youtube.com/watch?v=gfDE2a7MKjA',  # Hindi Python Course
                'te': 'https://www.youtube.com/watch?v=DO_QVTAWA0g',  # Telugu Python Course
                'ta': 'https://www.youtube.com/watch?v=5W6GxPwSQvI',  # Tamil Python Course
                'bn': 'https://www.youtube.com/watch?v=bJzb-RuUcMU'   # Bengali Python Course
            },
            'available_languages': ['en', 'hi', 'te', 'ta', 'bn'],
            'thumbnail': 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
            'instructor': 'Programming with Mosh',
            'rating': 4.9,
            'enrolled_count': 23150,
            'lessons': [
                {'id': 1, 'title': 'Python Basics', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=kqtD5dpn9C8'},
                {'id': 2, 'title': 'Data Structures', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=8hly31xKli0'},
                {'id': 3, 'title': 'OOP in Python', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=Ej_02ICOIgs'},
                {'id': 4, 'title': 'Django Framework', 'type': 'video', 'duration': 80, 'video_url': 'https://www.youtube.com/watch?v=F5mRW0jo-U4'}
            ]
        },
        {
            'title': 'Data Science & Machine Learning',
            'description': 'Complete guide to data analysis, visualization, and machine learning with Python',
            'category': 'Data Science',
            'difficulty': 'intermediate',
            'skills': ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Deep Learning'],
            'duration_minutes': 3000,
            'prerequisites': ['Python'],
            'learning_outcomes': [
                'Analyze and visualize data',
                'Build ML models from scratch',
                'Master scikit-learn and TensorFlow',
                'Deploy ML applications'
            ],
            'career_relevance': 'Highest paid tech skill, massive industry demand',
            'content_tags': ['data-science', 'ml', 'ai', 'python', 'analytics'],
            'video_url': 'https://www.youtube.com/watch?v=ua-CiDNNj30',
            'video_urls_multilang': {
                'en': 'https://www.youtube.com/watch?v=ua-CiDNNj30',
                'hi': 'https://www.youtube.com/watch?v=JfAO72OmY-Q',  # Hindi Data Science Course
                'te': 'https://www.youtube.com/watch?v=2pWv7GOvuf0',  # Telugu Data Science Course
                'ta': 'https://www.youtube.com/watch?v=mkv5mxYu0Wk'   # Tamil Data Science Course
            },
            'available_languages': ['en', 'hi', 'te', 'ta'],
            'thumbnail': 'https://img.youtube.com/vi/ua-CiDNNj30/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.9,
            'enrolled_count': 18900,
            'lessons': [
                {'id': 1, 'title': 'Data Analysis with Pandas', 'type': 'video', 'duration': 90, 'video_url': 'https://www.youtube.com/watch?v=vmEHCJofslg'},
                {'id': 2, 'title': 'NumPy Tutorial', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=QUT1VHiLmmI'},
                {'id': 3, 'title': 'Machine Learning', 'type': 'video', 'duration': 120, 'video_url': 'https://www.youtube.com/watch?v=7eh4d6sabA0'},
                {'id': 4, 'title': 'Deep Learning', 'type': 'video', 'duration': 100, 'video_url': 'https://www.youtube.com/watch?v=aircAruvnKk'}
            ]
        },
        {
            'title': 'React JS Complete Course',
            'description': 'Modern React development with hooks, Redux, and Next.js',
            'category': 'Web Development',
            'difficulty': 'intermediate',
            'skills': ['React', 'Redux', 'Next.js', 'TypeScript', 'Hooks'],
            'duration_minutes': 1800,
            'prerequisites': ['HTML', 'CSS', 'JavaScript'],
            'learning_outcomes': [
                'Build production-ready React apps',
                'Master React hooks and patterns',
                'Implement state management with Redux',
                'Deploy with Next.js and Vercel'
            ],
            'career_relevance': '#1 frontend framework, used by Facebook, Netflix, Airbnb',
            'content_tags': ['react', 'frontend', 'spa', 'nextjs', 'modern'],
            'video_url': 'https://www.youtube.com/watch?v=bMknfKXIFA8',
            'video_urls_multilang': {
                'en': 'https://www.youtube.com/watch?v=bMknfKXIFA8',
                'hi': 'https://www.youtube.com/watch?v=RGKi6LSPDLU',  # Hindi React Course
                'te': 'https://www.youtube.com/watch?v=s2skans2dP4'   # Telugu React Course
            },
            'available_languages': ['en', 'hi', 'te'],
            'thumbnail': 'https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.8,
            'enrolled_count': 21300,
            'lessons': [
                {'id': 1, 'title': 'React Fundamentals', 'type': 'video', 'duration': 75, 'video_url': 'https://www.youtube.com/watch?v=bMknfKXIFA8'},
                {'id': 2, 'title': 'React Hooks', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=TNhaISOUy6Q'},
                {'id': 3, 'title': 'Redux Toolkit', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=9zySeP5vH9c'},
                {'id': 4, 'title': 'Next.js 14', 'type': 'video', 'duration': 90, 'video_url': 'https://www.youtube.com/watch?v=wm5gMKuwSYk'}
            ]
        },
        {
            'title': 'Flutter & Dart - Mobile Development',
            'description': 'Build beautiful native mobile apps for iOS and Android',
            'category': 'Mobile Development',
            'difficulty': 'intermediate',
            'skills': ['Flutter', 'Dart', 'Mobile UI', 'Firebase', 'State Management'],
            'duration_minutes': 2200,
            'prerequisites': ['Programming basics'],
            'learning_outcomes': [
                'Create stunning mobile UIs',
                'Build cross-platform apps',
                'Implement Firebase backend',
                'Publish to App Store and Play Store'
            ],
            'career_relevance': 'Used by Google, Alibaba, and BMW - fastest growing mobile framework',
            'content_tags': ['flutter', 'mobile', 'dart', 'cross-platform', 'firebase'],
            'video_url': 'https://www.youtube.com/watch?v=VPvVD8t02U8',
            'thumbnail': 'https://img.youtube.com/vi/VPvVD8t02U8/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.7,
            'enrolled_count': 12800,
            'lessons': [
                {'id': 1, 'title': 'Dart Basics', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=5xlVP04905w'},
                {'id': 2, 'title': 'Flutter Widgets', 'type': 'video', 'duration': 80, 'video_url': 'https://www.youtube.com/watch?v=1xipg02Wu8s'},
                {'id': 3, 'title': 'State Management', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=3tm-R7ymwhc'},
                {'id': 4, 'title': 'Firebase Integration', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=sfA3NWDBPZ4'}
            ]
        },
        {
            'title': 'Digital Marketing & SEO Masterclass',
            'description': 'Complete digital marketing course covering SEO, social media, and growth strategies',
            'category': 'Marketing',
            'difficulty': 'beginner',
            'skills': ['SEO', 'Social Media', 'Google Ads', 'Analytics', 'Content Marketing'],
            'duration_minutes': 1500,
            'prerequisites': [],
            'learning_outcomes': [
                'Master SEO techniques',
                'Run effective ad campaigns',
                'Grow social media presence',
                'Analyze marketing metrics'
            ],
            'career_relevance': 'Essential for business growth, freelancing, and entrepreneurship',
            'content_tags': ['marketing', 'seo', 'ads', 'growth', 'business'],
            'video_url': 'https://www.youtube.com/watch?v=bixR-KIJKYM',
            'video_urls_multilang': {
                'en': 'https://www.youtube.com/watch?v=bixR-KIJKYM',
                'hi': 'https://www.youtube.com/watch?v=h5qr7ISrNY8',  # Hindi Digital Marketing
                'ta': 'https://www.youtube.com/watch?v=n4R2E7O-Ngo'   # Tamil Digital Marketing
            },
            'available_languages': ['en', 'hi', 'ta'],
            'thumbnail': 'https://img.youtube.com/vi/bixR-KIJKYM/maxresdefault.jpg',
            'instructor': 'Simplilearn',
            'rating': 4.6,
            'enrolled_count': 9500,
            'lessons': [
                {'id': 1, 'title': 'SEO Fundamentals', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=SnxeXZpZkI0'},
                {'id': 2, 'title': 'Google Ads', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=lYE_6PkwAgM'},
                {'id': 3, 'title': 'Social Media Marketing', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=yQM3fP_JJ1g'},
                {'id': 4, 'title': 'Content Strategy', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=8yrqHKwfu04'}
            ]
        },
        # Additional Web Development Courses
        {
            'title': 'Advanced JavaScript & TypeScript',
            'description': 'Deep dive into JavaScript ES6+, TypeScript, async programming, and design patterns',
            'category': 'Web Development',
            'difficulty': 'advanced',
            'skills': ['JavaScript', 'TypeScript', 'Async/Await', 'Design Patterns', 'Testing'],
            'duration_minutes': 2100,
            'prerequisites': ['JavaScript'],
            'learning_outcomes': [
                'Master async programming',
                'Write type-safe code with TypeScript',
                'Implement design patterns',
                'Test JavaScript applications'
            ],
            'career_relevance': 'Critical for senior developer roles and scalable applications',
            'content_tags': ['javascript', 'typescript', 'advanced', 'patterns', 'testing'],
            'video_url': 'https://www.youtube.com/watch?v=30LWjhZzg50',
            'thumbnail': 'https://img.youtube.com/vi/30LWjhZzg50/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.9,
            'enrolled_count': 28500,
            'lessons': [
                {'id': 1, 'title': 'TypeScript Basics', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=30LWjhZzg50'},
                {'id': 2, 'title': 'Advanced Types', 'type': 'video', 'duration': 75, 'video_url': 'https://www.youtube.com/watch?v=zQnBQ4tB3ZA'},
                {'id': 3, 'title': 'Async Patterns', 'type': 'video', 'duration': 80, 'video_url': 'https://www.youtube.com/watch?v=V_Kr9OSfDeU'},
                {'id': 4, 'title': 'Testing with Jest', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=FgnxcUQ5vho'}
            ]
        },
        {
            'title': 'Full Stack MERN Development',
            'description': 'Build complete web apps with MongoDB, Express, React, and Node.js',
            'category': 'Web Development',
            'difficulty': 'intermediate',
            'skills': ['MongoDB', 'Express', 'React', 'Node.js', 'REST APIs'],
            'duration_minutes': 3200,
            'prerequisites': ['JavaScript', 'React'],
            'learning_outcomes': [
                'Build full-stack applications',
                'Create REST APIs',
                'Manage databases with MongoDB',
                'Deploy MERN apps'
            ],
            'career_relevance': 'Most in-demand stack for startups and enterprises',
            'content_tags': ['mern', 'fullstack', 'mongodb', 'nodejs', 'api'],
            'video_url': 'https://www.youtube.com/watch?v=7CqJlxBYj-M',
            'thumbnail': 'https://img.youtube.com/vi/7CqJlxBYj-M/maxresdefault.jpg',
            'instructor': 'Traversy Media',
            'rating': 4.8,
            'enrolled_count': 19200,
            'lessons': [
                {'id': 1, 'title': 'MongoDB Basics', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=fgTGADljAeg'},
                {'id': 2, 'title': 'Express REST APIs', 'type': 'video', 'duration': 85, 'video_url': 'https://www.youtube.com/watch?v=L72fhGm1tfE'},
                {'id': 3, 'title': 'React Frontend', 'type': 'video', 'duration': 90, 'video_url': 'https://www.youtube.com/watch?v=RDV3Z1KCBvo'},
                {'id': 4, 'title': 'MERN Integration', 'type': 'video', 'duration': 100, 'video_url': 'https://www.youtube.com/watch?v=98BzS5Oz5E4'}
            ]
        },
        {
            'title': 'Vue.js Complete Guide',
            'description': 'Master Vue.js 3 with Composition API, Vuex, and Vue Router',
            'category': 'Web Development',
            'difficulty': 'intermediate',
            'skills': ['Vue.js', 'Vuex', 'Vue Router', 'Composition API', 'Pinia'],
            'duration_minutes': 1900,
            'prerequisites': ['HTML', 'CSS', 'JavaScript'],
            'learning_outcomes': [
                'Build reactive Vue applications',
                'Manage state with Vuex/Pinia',
                'Implement routing',
                'Use Composition API'
            ],
            'career_relevance': 'Popular alternative to React, used by Alibaba and GitLab',
            'content_tags': ['vue', 'frontend', 'spa', 'vuex', 'composition'],
            'video_url': 'https://www.youtube.com/watch?v=FXpIoQ_rT_c',
            'thumbnail': 'https://img.youtube.com/vi/FXpIoQ_rT_c/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.8,
            'enrolled_count': 16800,
            'lessons': [
                {'id': 1, 'title': 'Vue Fundamentals', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=FXpIoQ_rT_c'},
                {'id': 2, 'title': 'Components & Props', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=VuN8qwZoego'},
                {'id': 3, 'title': 'Vuex State Management', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=BGAu__J4xoc'},
                {'id': 4, 'title': 'Vue Router', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=YnYLDR8p9FQ'}
            ]
        },
        # Additional Programming Courses
        {
            'title': 'Java Programming Complete Course',
            'description': 'Learn Java from basics to advanced with Spring Boot and microservices',
            'category': 'Programming',
            'difficulty': 'beginner',
            'skills': ['Java', 'OOP', 'Spring Boot', 'Microservices', 'JUnit'],
            'duration_minutes': 2800,
            'prerequisites': [],
            'learning_outcomes': [
                'Master Java fundamentals',
                'Build enterprise applications',
                'Create microservices with Spring Boot',
                'Write unit tests'
            ],
            'career_relevance': 'Most demanded enterprise programming language, high salaries',
            'content_tags': ['java', 'spring', 'backend', 'enterprise', 'microservices'],
            'video_url': 'https://www.youtube.com/watch?v=eIrMbAQSU34',
            'thumbnail': 'https://img.youtube.com/vi/eIrMbAQSU34/maxresdefault.jpg',
            'instructor': 'Programming with Mosh',
            'rating': 4.9,
            'enrolled_count': 31200,
            'lessons': [
                {'id': 1, 'title': 'Java Basics', 'type': 'video', 'duration': 80, 'video_url': 'https://www.youtube.com/watch?v=eIrMbAQSU34'},
                {'id': 2, 'title': 'OOP Concepts', 'type': 'video', 'duration': 90, 'video_url': 'https://www.youtube.com/watch?v=Qw2QoXHZvfQ'},
                {'id': 3, 'title': 'Spring Boot', 'type': 'video', 'duration': 100, 'video_url': 'https://www.youtube.com/watch?v=9SGDpanrc8U'},
                {'id': 4, 'title': 'Microservices', 'type': 'video', 'duration': 95, 'video_url': 'https://www.youtube.com/watch?v=y8IQb4ofjDo'}
            ]
        },
        {
            'title': 'C++ Programming Masterclass',
            'description': 'Complete C++ course from basics to advanced topics including STL and modern C++',
            'category': 'Programming',
            'difficulty': 'intermediate',
            'skills': ['C++', 'STL', 'Memory Management', 'Modern C++', 'OOP'],
            'duration_minutes': 3100,
            'prerequisites': ['Programming basics'],
            'learning_outcomes': [
                'Write efficient C++ code',
                'Master STL containers',
                'Understand memory management',
                'Use modern C++ features'
            ],
            'career_relevance': 'Essential for game development, systems programming, and high-performance computing',
            'content_tags': ['cpp', 'systems', 'performance', 'stl', 'modern'],
            'video_url': 'https://www.youtube.com/watch?v=vLnPwxZdW4Y',
            'thumbnail': 'https://img.youtube.com/vi/vLnPwxZdW4Y/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.7,
            'enrolled_count': 24300,
            'lessons': [
                {'id': 1, 'title': 'C++ Fundamentals', 'type': 'video', 'duration': 75, 'video_url': 'https://www.youtube.com/watch?v=vLnPwxZdW4Y'},
                {'id': 2, 'title': 'Pointers & Memory', 'type': 'video', 'duration': 85, 'video_url': 'https://www.youtube.com/watch?v=zuegQmMdy8M'},
                {'id': 3, 'title': 'STL Containers', 'type': 'video', 'duration': 80, 'video_url': 'https://www.youtube.com/watch?v=6OoSgY6NVVk'},
                {'id': 4, 'title': 'Modern C++ Features', 'type': 'video', 'duration': 90, 'video_url': 'https://www.youtube.com/watch?v=2olsGf6JIkU'}
            ]
        },
        {
            'title': 'Go (Golang) Complete Guide',
            'description': 'Learn Go programming for building scalable backend services and microservices',
            'category': 'Programming',
            'difficulty': 'intermediate',
            'skills': ['Go', 'Concurrency', 'REST APIs', 'Goroutines', 'Microservices'],
            'duration_minutes': 2200,
            'prerequisites': ['Programming basics'],
            'learning_outcomes': [
                'Write concurrent programs',
                'Build REST APIs in Go',
                'Master goroutines and channels',
                'Deploy Go applications'
            ],
            'career_relevance': 'Fastest growing language, used by Google, Uber, Docker',
            'content_tags': ['golang', 'concurrency', 'backend', 'microservices', 'api'],
            'video_url': 'https://www.youtube.com/watch?v=YS4e4q9oBaU',
            'thumbnail': 'https://img.youtube.com/vi/YS4e4q9oBaU/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.8,
            'enrolled_count': 14700,
            'lessons': [
                {'id': 1, 'title': 'Go Basics', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=YS4e4q9oBaU'},
                {'id': 2, 'title': 'Goroutines', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=LvgVSSpwND8'},
                {'id': 3, 'title': 'Building APIs', 'type': 'video', 'duration': 75, 'video_url': 'https://www.youtube.com/watch?v=d_L64KT3SFM'},
                {'id': 4, 'title': 'Go Microservices', 'type': 'video', 'duration': 85, 'video_url': 'https://www.youtube.com/watch?v=VzBGi_n65iU'}
            ]
        },
        # Additional Data Science Courses
        {
            'title': 'Data Analytics with SQL & Tableau',
            'description': 'Master data analysis using SQL queries and Tableau visualizations',
            'category': 'Data Science',
            'difficulty': 'beginner',
            'skills': ['SQL', 'Tableau', 'Data Analysis', 'Visualization', 'Business Intelligence'],
            'duration_minutes': 1800,
            'prerequisites': [],
            'learning_outcomes': [
                'Write complex SQL queries',
                'Create interactive dashboards',
                'Analyze business data',
                'Present insights effectively'
            ],
            'career_relevance': 'Essential for data analyst and business analyst roles',
            'content_tags': ['sql', 'tableau', 'analytics', 'visualization', 'bi'],
            'video_url': 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
            'thumbnail': 'https://img.youtube.com/vi/HXV3zeQKqGY/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.7,
            'enrolled_count': 22100,
            'lessons': [
                {'id': 1, 'title': 'SQL Fundamentals', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=HXV3zeQKqGY'},
                {'id': 2, 'title': 'Advanced Queries', 'type': 'video', 'duration': 80, 'video_url': 'https://www.youtube.com/watch?v=0z4c3SA0VvU'},
                {'id': 3, 'title': 'Tableau Basics', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=aHaOIvR00So'},
                {'id': 4, 'title': 'Dashboard Creation', 'type': 'video', 'duration': 75, 'video_url': 'https://www.youtube.com/watch?v=6xv1KvCMF1Q'}
            ]
        },
        {
            'title': 'Big Data with Apache Spark',
            'description': 'Learn big data processing with Apache Spark, PySpark, and Hadoop ecosystem',
            'category': 'Data Science',
            'difficulty': 'advanced',
            'skills': ['Apache Spark', 'PySpark', 'Hadoop', 'Big Data', 'Data Engineering'],
            'duration_minutes': 2700,
            'prerequisites': ['Python', 'SQL'],
            'learning_outcomes': [
                'Process large datasets',
                'Build data pipelines',
                'Optimize Spark jobs',
                'Work with distributed systems'
            ],
            'career_relevance': 'Critical for big data engineer and data architect roles',
            'content_tags': ['spark', 'bigdata', 'hadoop', 'pyspark', 'engineering'],
            'video_url': 'https://www.youtube.com/watch?v=_C8kWso4ne4',
            'thumbnail': 'https://img.youtube.com/vi/_C8kWso4ne4/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.8,
            'enrolled_count': 17400,
            'lessons': [
                {'id': 1, 'title': 'Spark Architecture', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=_C8kWso4ne4'},
                {'id': 2, 'title': 'PySpark Basics', 'type': 'video', 'duration': 80, 'video_url': 'https://www.youtube.com/watch?v=XrpSRCwISdk'},
                {'id': 3, 'title': 'Data Processing', 'type': 'video', 'duration': 90, 'video_url': 'https://www.youtube.com/watch?v=cZS5xYYIPzk'},
                {'id': 4, 'title': 'Spark ML', 'type': 'video', 'duration': 85, 'video_url': 'https://www.youtube.com/watch?v=NmM9HA2MQGI'}
            ]
        },
        {
            'title': 'R Programming for Data Science',
            'description': 'Complete R programming course for statistical analysis and data visualization',
            'category': 'Data Science',
            'difficulty': 'beginner',
            'skills': ['R Programming', 'ggplot2', 'dplyr', 'Statistics', 'Data Visualization'],
            'duration_minutes': 2000,
            'prerequisites': [],
            'learning_outcomes': [
                'Master R programming',
                'Perform statistical analysis',
                'Create visualizations with ggplot2',
                'Analyze datasets with dplyr'
            ],
            'career_relevance': 'Preferred language for statisticians and researchers',
            'content_tags': ['r', 'statistics', 'visualization', 'analysis', 'research'],
            'video_url': 'https://www.youtube.com/watch?v=_V8eKsto3Ug',
            'thumbnail': 'https://img.youtube.com/vi/_V8eKsto3Ug/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.6,
            'enrolled_count': 13200,
            'lessons': [
                {'id': 1, 'title': 'R Basics', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=_V8eKsto3Ug'},
                {'id': 2, 'title': 'Data Manipulation', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=1id1Wi1ymrc'},
                {'id': 3, 'title': 'ggplot2 Visualization', 'type': 'video', 'duration': 75, 'video_url': 'https://www.youtube.com/watch?v=zNzZ1PfUDNk'},
                {'id': 4, 'title': 'Statistical Analysis', 'type': 'video', 'duration': 80, 'video_url': 'https://www.youtube.com/watch?v=u1cc1r_Y7M0'}
            ]
        },
        # Additional Mobile Development Courses
        {
            'title': 'Android Development with Kotlin',
            'description': 'Build native Android apps using Kotlin, Jetpack Compose, and modern architecture',
            'category': 'Mobile Development',
            'difficulty': 'intermediate',
            'skills': ['Android', 'Kotlin', 'Jetpack Compose', 'MVVM', 'Material Design'],
            'duration_minutes': 2600,
            'prerequisites': ['Programming basics'],
            'learning_outcomes': [
                'Create Android applications',
                'Use Jetpack Compose for UI',
                'Implement MVVM architecture',
                'Publish apps to Play Store'
            ],
            'career_relevance': 'Android dominates global mobile market with 70%+ share',
            'content_tags': ['android', 'kotlin', 'mobile', 'jetpack', 'material'],
            'video_url': 'https://www.youtube.com/watch?v=F9UC9DY-vIU',
            'thumbnail': 'https://img.youtube.com/vi/F9UC9DY-vIU/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.8,
            'enrolled_count': 19800,
            'lessons': [
                {'id': 1, 'title': 'Kotlin Basics', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=F9UC9DY-vIU'},
                {'id': 2, 'title': 'Android Fundamentals', 'type': 'video', 'duration': 85, 'video_url': 'https://www.youtube.com/watch?v=fis26HvvDII'},
                {'id': 3, 'title': 'Jetpack Compose', 'type': 'video', 'duration': 90, 'video_url': 'https://www.youtube.com/watch?v=cDabx3SjuOY'},
                {'id': 4, 'title': 'MVVM Architecture', 'type': 'video', 'duration': 75, 'video_url': 'https://www.youtube.com/watch?v=rRHmRPh1HLs'}
            ]
        },
        {
            'title': 'iOS Development with Swift',
            'description': 'Learn iOS app development with Swift, SwiftUI, and Xcode',
            'category': 'Mobile Development',
            'difficulty': 'intermediate',
            'skills': ['Swift', 'SwiftUI', 'iOS', 'Xcode', 'UIKit'],
            'duration_minutes': 2800,
            'prerequisites': ['Programming basics'],
            'learning_outcomes': [
                'Build iOS applications',
                'Master SwiftUI framework',
                'Work with iOS SDK',
                'Deploy to App Store'
            ],
            'career_relevance': 'iOS developers command highest mobile development salaries',
            'content_tags': ['ios', 'swift', 'swiftui', 'mobile', 'apple'],
            'video_url': 'https://www.youtube.com/watch?v=8Xg7E9shq0U',
            'thumbnail': 'https://img.youtube.com/vi/8Xg7E9shq0U/maxresdefault.jpg',
            'instructor': 'CodeWithChris',
            'rating': 4.9,
            'enrolled_count': 16500,
            'lessons': [
                {'id': 1, 'title': 'Swift Fundamentals', 'type': 'video', 'duration': 75, 'video_url': 'https://www.youtube.com/watch?v=8Xg7E9shq0U'},
                {'id': 2, 'title': 'SwiftUI Basics', 'type': 'video', 'duration': 80, 'video_url': 'https://www.youtube.com/watch?v=F2ojC6TNwws'},
                {'id': 3, 'title': 'iOS Architecture', 'type': 'video', 'duration': 85, 'video_url': 'https://www.youtube.com/watch?v=CRZVrb_qvQY'},
                {'id': 4, 'title': 'App Store Publishing', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=p21xoL-g4Ac'}
            ]
        },
        {
            'title': 'React Native - Cross Platform Apps',
            'description': 'Build iOS and Android apps simultaneously with React Native',
            'category': 'Mobile Development',
            'difficulty': 'intermediate',
            'skills': ['React Native', 'React', 'JavaScript', 'Expo', 'Mobile UI'],
            'duration_minutes': 2400,
            'prerequisites': ['React', 'JavaScript'],
            'learning_outcomes': [
                'Build cross-platform mobile apps',
                'Use React Native components',
                'Integrate native modules',
                'Deploy to both app stores'
            ],
            'career_relevance': 'Write once, run on iOS and Android - highly efficient for businesses',
            'content_tags': ['reactnative', 'mobile', 'crossplatform', 'react', 'javascript'],
            'video_url': 'https://www.youtube.com/watch?v=0-S5a0eXPoc',
            'thumbnail': 'https://img.youtube.com/vi/0-S5a0eXPoc/maxresdefault.jpg',
            'instructor': 'Programming with Mosh',
            'rating': 4.8,
            'enrolled_count': 18200,
            'lessons': [
                {'id': 1, 'title': 'React Native Setup', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=0-S5a0eXPoc'},
                {'id': 2, 'title': 'Core Components', 'type': 'video', 'duration': 75, 'video_url': 'https://www.youtube.com/watch?v=ur6I5m2nTvk'},
                {'id': 3, 'title': 'Navigation', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=nQVCkqvU1uE'},
                {'id': 4, 'title': 'Native Features', 'type': 'video', 'duration': 80, 'video_url': 'https://www.youtube.com/watch?v=ANdSdIlgsEw'}
            ]
        },
        # Additional Marketing Courses
        {
            'title': 'Content Marketing & Copywriting',
            'description': 'Master content creation, copywriting, and content strategy for digital marketing',
            'category': 'Marketing',
            'difficulty': 'beginner',
            'skills': ['Content Writing', 'Copywriting', 'Content Strategy', 'Blogging', 'Email Marketing'],
            'duration_minutes': 1600,
            'prerequisites': [],
            'learning_outcomes': [
                'Write compelling copy',
                'Create content strategies',
                'Master email marketing',
                'Build brand voice'
            ],
            'career_relevance': 'Content is king - essential for all digital marketing roles',
            'content_tags': ['content', 'copywriting', 'writing', 'marketing', 'email'],
            'video_url': 'https://www.youtube.com/watch?v=hU_jtlZsSKM',
            'thumbnail': 'https://img.youtube.com/vi/hU_jtlZsSKM/maxresdefault.jpg',
            'instructor': 'HubSpot Academy',
            'rating': 4.7,
            'enrolled_count': 11400,
            'lessons': [
                {'id': 1, 'title': 'Copywriting Basics', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=hU_jtlZsSKM'},
                {'id': 2, 'title': 'Content Strategy', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=CnjIXVTeCIw'},
                {'id': 3, 'title': 'Email Campaigns', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=v4sBbjJ7vN0'},
                {'id': 4, 'title': 'Brand Voice', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=5-q21n_-x4Y'}
            ]
        },
        {
            'title': 'Social Media Marketing Mastery',
            'description': 'Complete guide to Instagram, Facebook, LinkedIn, and Twitter marketing',
            'category': 'Marketing',
            'difficulty': 'beginner',
            'skills': ['Social Media', 'Instagram Marketing', 'Facebook Ads', 'LinkedIn', 'Influencer Marketing'],
            'duration_minutes': 1700,
            'prerequisites': [],
            'learning_outcomes': [
                'Grow social media presence',
                'Run paid social campaigns',
                'Create viral content',
                'Measure social ROI'
            ],
            'career_relevance': '4.5 billion social media users - massive reach for businesses',
            'content_tags': ['socialmedia', 'instagram', 'facebook', 'linkedin', 'twitter'],
            'video_url': 'https://www.youtube.com/watch?v=cH9rAKT-CsA',
            'thumbnail': 'https://img.youtube.com/vi/cH9rAKT-CsA/maxresdefault.jpg',
            'instructor': 'Simplilearn',
            'rating': 4.6,
            'enrolled_count': 13700,
            'lessons': [
                {'id': 1, 'title': 'Instagram Strategy', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=cH9rAKT-CsA'},
                {'id': 2, 'title': 'Facebook Advertising', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=Bxn8dMJf8Pk'},
                {'id': 3, 'title': 'LinkedIn Marketing', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=4Y60Yh_LXOU'},
                {'id': 4, 'title': 'Analytics & ROI', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=N_eDmb6eDPo'}
            ]
        },
        {
            'title': 'Growth Hacking & Analytics',
            'description': 'Learn growth strategies, A/B testing, and data-driven marketing',
            'category': 'Marketing',
            'difficulty': 'intermediate',
            'skills': ['Growth Hacking', 'Google Analytics', 'A/B Testing', 'Conversion Optimization', 'Marketing Automation'],
            'duration_minutes': 1800,
            'prerequisites': ['Digital Marketing basics'],
            'learning_outcomes': [
                'Implement growth strategies',
                'Master Google Analytics',
                'Run A/B tests',
                'Optimize conversion funnels'
            ],
            'career_relevance': 'Critical for startups and scaling businesses',
            'content_tags': ['growth', 'analytics', 'testing', 'optimization', 'automation'],
            'video_url': 'https://www.youtube.com/watch?v=JFSqaLFygAw',
            'thumbnail': 'https://img.youtube.com/vi/JFSqaLFygAw/maxresdefault.jpg',
            'instructor': 'Neil Patel',
            'rating': 4.7,
            'enrolled_count': 9800,
            'lessons': [
                {'id': 1, 'title': 'Growth Fundamentals', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=JFSqaLFygAw'},
                {'id': 2, 'title': 'Analytics Setup', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=nUCpdTRaXQs'},
                {'id': 3, 'title': 'A/B Testing', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=VereIImOj0g'},
                {'id': 4, 'title': 'Marketing Automation', 'type': 'video', 'duration': 75, 'video_url': 'https://www.youtube.com/watch?v=hU6BVxtGd5g'}
            ]
        },
        # NEW: AI and Deep Learning Courses
        {
            'title': 'Artificial Intelligence A-Z Complete Course',
            'description': 'Master AI fundamentals including reinforcement learning, neural networks, and AI agents',
            'category': 'AI and Deep Learning',
            'difficulty': 'intermediate',
            'skills': ['AI', 'Neural Networks', 'Reinforcement Learning', 'AI Agents', 'Q-Learning'],
            'duration_minutes': 3400,
            'prerequisites': ['Python', 'Math basics'],
            'learning_outcomes': [
                'Build AI agents',
                'Implement reinforcement learning',
                'Understand neural network architectures',
                'Create intelligent systems'
            ],
            'career_relevance': 'AI is transforming every industry - highest paid tech skill in 2026',
            'content_tags': ['ai', 'neuralnetworks', 'reinforcement', 'agents', 'intelligence'],
            'video_url': 'https://www.youtube.com/watch?v=ad79nYk2keg',
            'thumbnail': 'https://img.youtube.com/vi/ad79nYk2keg/maxresdefault.jpg',
            'instructor': 'Stanford University',
            'rating': 4.9,
            'enrolled_count': 34200,
            'lessons': [
                {'id': 1, 'title': 'AI Fundamentals', 'type': 'video', 'duration': 90, 'video_url': 'https://www.youtube.com/watch?v=ad79nYk2keg'},
                {'id': 2, 'title': 'Q-Learning', 'type': 'video', 'duration': 100, 'video_url': 'https://www.youtube.com/watch?v=qhRNvCVVJaA'},
                {'id': 3, 'title': 'Deep Q-Learning', 'type': 'video', 'duration': 110, 'video_url': 'https://www.youtube.com/watch?v=wrBUkpiRvCA'},
                {'id': 4, 'title': 'AI Agents', 'type': 'video', 'duration': 95, 'video_url': 'https://www.youtube.com/watch?v=JgvyzIkgxF0'}
            ]
        },
        {
            'title': 'Deep Learning Specialization',
            'description': 'Complete deep learning course covering CNNs, RNNs, LSTMs, and Transformers',
            'category': 'AI and Deep Learning',
            'difficulty': 'advanced',
            'skills': ['Deep Learning', 'CNNs', 'RNNs', 'Transformers', 'TensorFlow', 'PyTorch'],
            'duration_minutes': 4200,
            'prerequisites': ['Python', 'Machine Learning', 'Linear Algebra'],
            'learning_outcomes': [
                'Build deep neural networks',
                'Master CNNs for computer vision',
                'Implement RNNs and LSTMs',
                'Use Transformer architecture'
            ],
            'career_relevance': 'Core technology behind ChatGPT, self-driving cars, and modern AI',
            'content_tags': ['deeplearning', 'cnn', 'rnn', 'transformers', 'tensorflow', 'pytorch'],
            'video_url': 'https://www.youtube.com/watch?v=CS4cs9xVecg',
            'thumbnail': 'https://img.youtube.com/vi/CS4cs9xVecg/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.9,
            'enrolled_count': 28900,
            'lessons': [
                {'id': 1, 'title': 'Neural Networks', 'type': 'video', 'duration': 120, 'video_url': 'https://www.youtube.com/watch?v=aircAruvnKk'},
                {'id': 2, 'title': 'Convolutional Networks', 'type': 'video', 'duration': 110, 'video_url': 'https://www.youtube.com/watch?v=FmpDIaiMIeA'},
                {'id': 3, 'title': 'Recurrent Networks', 'type': 'video', 'duration': 100, 'video_url': 'https://www.youtube.com/watch?v=LHXXI4-IEns'},
                {'id': 4, 'title': 'Transformers', 'type': 'video', 'duration': 130, 'video_url': 'https://www.youtube.com/watch?v=kCc8FmEb1nY'}
            ]
        },
        {
            'title': 'Natural Language Processing with Transformers',
            'description': 'Master NLP using BERT, GPT, and Transformer models with Hugging Face',
            'category': 'AI and Deep Learning',
            'difficulty': 'advanced',
            'skills': ['NLP', 'BERT', 'GPT', 'Transformers', 'Hugging Face', 'Text Analysis'],
            'duration_minutes': 3200,
            'prerequisites': ['Python', 'Deep Learning'],
            'learning_outcomes': [
                'Build chatbots and text classifiers',
                'Fine-tune transformer models',
                'Use Hugging Face library',
                'Implement sentiment analysis'
            ],
            'career_relevance': 'Powers ChatGPT, Google Search, and all modern language AI',
            'content_tags': ['nlp', 'transformers', 'bert', 'gpt', 'huggingface', 'text'],
            'video_url': 'https://www.youtube.com/watch?v=QEaBAZQCtwE',
            'thumbnail': 'https://img.youtube.com/vi/QEaBAZQCtwE/maxresdefault.jpg',
            'instructor': 'Stanford University',
            'rating': 4.9,
            'enrolled_count': 21300,
            'lessons': [
                {'id': 1, 'title': 'NLP Basics', 'type': 'video', 'duration': 85, 'video_url': 'https://www.youtube.com/watch?v=rmVRLeJRkl4'},
                {'id': 2, 'title': 'Transformer Architecture', 'type': 'video', 'duration': 100, 'video_url': 'https://www.youtube.com/watch?v=kCc8FmEb1nY'},
                {'id': 3, 'title': 'BERT & GPT', 'type': 'video', 'duration': 110, 'video_url': 'https://www.youtube.com/watch?v=-9vVhYEXeyQ'},
                {'id': 4, 'title': 'Fine-tuning Models', 'type': 'video', 'duration': 95, 'video_url': 'https://www.youtube.com/watch?v=8m0eSlB-XOQ'}
            ]
        },
        {
            'title': 'Computer Vision with OpenCV & Deep Learning',
            'description': 'Build image recognition, object detection, and facial recognition systems',
            'category': 'AI and Deep Learning',
            'difficulty': 'intermediate',
            'skills': ['Computer Vision', 'OpenCV', 'Object Detection', 'Face Recognition', 'Image Processing'],
            'duration_minutes': 2900,
            'prerequisites': ['Python', 'NumPy'],
            'learning_outcomes': [
                'Process images and videos',
                'Detect objects in real-time',
                'Build facial recognition systems',
                'Use YOLO and SSD models'
            ],
            'career_relevance': 'Powers self-driving cars, security systems, and medical imaging',
            'content_tags': ['computervision', 'opencv', 'detection', 'recognition', 'yolo'],
            'video_url': 'https://www.youtube.com/watch?v=oXlwWbU8l2o',
            'thumbnail': 'https://img.youtube.com/vi/oXlwWbU8l2o/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.8,
            'enrolled_count': 19600,
            'lessons': [
                {'id': 1, 'title': 'OpenCV Basics', 'type': 'video', 'duration': 80, 'video_url': 'https://www.youtube.com/watch?v=oXlwWbU8l2o'},
                {'id': 2, 'title': 'Image Processing', 'type': 'video', 'duration': 90, 'video_url': 'https://www.youtube.com/watch?v=WQeoO7MI0Bs'},
                {'id': 3, 'title': 'Object Detection', 'type': 'video', 'duration': 100, 'video_url': 'https://www.youtube.com/watch?v=HXDD7-EnGBY'},
                {'id': 4, 'title': 'Face Recognition', 'type': 'video', 'duration': 85, 'video_url': 'https://www.youtube.com/watch?v=535acCxjHCI'}
            ]
        },
        {
            'title': 'Generative AI & Large Language Models',
            'description': 'Build applications with GPT-4, Claude, and LangChain for AI agents',
            'category': 'AI and Deep Learning',
            'difficulty': 'advanced',
            'skills': ['Generative AI', 'GPT-4', 'LangChain', 'Prompt Engineering', 'AI Agents'],
            'duration_minutes': 2500,
            'prerequisites': ['Python', 'APIs'],
            'learning_outcomes': [
                'Build with ChatGPT API',
                'Create AI agents with LangChain',
                'Master prompt engineering',
                'Deploy Gen AI applications'
            ],
            'career_relevance': 'Hottest AI skill in 2026 - every company building AI products',
            'content_tags': ['generativeai', 'gpt4', 'langchain', 'llm', 'prompts'],
            'video_url': 'https://www.youtube.com/watch?v=zizonToFXDs',
            'thumbnail': 'https://img.youtube.com/vi/zizonToFXDs/maxresdefault.jpg',
            'instructor': 'freeCodeCamp',
            'rating': 4.9,
            'enrolled_count': 15800,
            'lessons': [
                {'id': 1, 'title': 'LLM Fundamentals', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=zizonToFXDs'},
                {'id': 2, 'title': 'Prompt Engineering', 'type': 'video', 'duration': 80, 'video_url': 'https://www.youtube.com/watch?v=_ZvnD73m40o'},
                {'id': 3, 'title': 'LangChain Framework', 'type': 'video', 'duration': 90, 'video_url': 'https://www.youtube.com/watch?v=LbT1yp6quS8'},
                {'id': 4, 'title': 'AI Agent Building', 'type': 'video', 'duration': 85, 'video_url': 'https://www.youtube.com/watch?v=DWUdGhRrv2c'}
            ]
        },
        {
            'title': 'Google Ads Mastery - PPC Advertising',
            'description': 'Complete Google Ads course covering search ads, display, remarketing, and conversion optimization',
            'category': 'Marketing',
            'difficulty': 'intermediate',
            'skills': ['Google Ads', 'PPC', 'Campaign Management', 'ROI Optimization', 'Analytics'],
            'duration_minutes': 1600,
            'prerequisites': [],
            'learning_outcomes': [
                'Create profitable ad campaigns',
                'Master keyword research',
                'Optimize conversion rates',
                'Track and analyze ROI'
            ],
            'career_relevance': 'Essential for digital marketing managers and growth marketers',
            'content_tags': ['googleads', 'ppc', 'advertising', 'sem', 'marketing'],
            'video_url': 'https://www.youtube.com/watch?v=jcKvgVHmFJI',
            'thumbnail': 'https://img.youtube.com/vi/jcKvgVHmFJI/maxresdefault.jpg',
            'instructor': 'Simplilearn',
            'rating': 4.7,
            'enrolled_count': 14200,
            'lessons': [
                {'id': 1, 'title': 'Google Ads Setup', 'type': 'video', 'duration': 45, 'video_url': 'https://www.youtube.com/watch?v=jcKvgVHmFJI'},
                {'id': 2, 'title': 'Search Campaigns', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=mMBO7jL37X8'},
                {'id': 3, 'title': 'Display Advertising', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=x5zRWs8n1mE'},
                {'id': 4, 'title': 'ROI Optimization', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=mMBO7jL37X8'}
            ]
        },
        {
            'title': 'Content Strategy & Marketing',
            'description': 'Learn to create compelling content strategies, storytelling, and content marketing campaigns',
            'category': 'Marketing',
            'difficulty': 'beginner',
            'skills': ['Content Strategy', 'Copywriting', 'Storytelling', 'Brand Voice', 'Editorial Planning'],
            'duration_minutes': 1400,
            'prerequisites': [],
            'learning_outcomes': [
                'Develop content strategies',
                'Write engaging copy',
                'Build editorial calendars',
                'Measure content performance'
            ],
            'career_relevance': 'Core skill for content marketers, brand managers, and copywriters',
            'content_tags': ['content', 'strategy', 'copywriting', 'branding', 'marketing'],
            'video_url': 'https://www.youtube.com/watch?v=gQJy_2xJGlM',
            'thumbnail': 'https://img.youtube.com/vi/gQJy_2xJGlM/maxresdefault.jpg',
            'instructor': 'HubSpot Academy',
            'rating': 4.6,
            'enrolled_count': 12800,
            'lessons': [
                {'id': 1, 'title': 'Content Strategy Basics', 'type': 'video', 'duration': 40, 'video_url': 'https://www.youtube.com/watch?v=gQJy_2xJGlM'},
                {'id': 2, 'title': 'Storytelling Framework', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=8nrLEH-zxJU'},
                {'id': 3, 'title': 'Copywriting Skills', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=YgcT8iRb_rQ'},
                {'id': 4, 'title': 'Editorial Calendar', 'type': 'video', 'duration': 45, 'video_url': 'https://www.youtube.com/watch?v=gQJy_2xJGlM'}
            ]
        },
        {
            'title': 'Email Marketing & Automation',
            'description': 'Master email marketing campaigns, automation workflows, and conversion optimization',
            'category': 'Marketing',
            'difficulty': 'beginner',
            'skills': ['Email Marketing', 'Marketing Automation', 'Conversion Rate', 'A/B Testing', 'Segmentation'],
            'duration_minutes': 1200,
            'prerequisites': [],
            'learning_outcomes': [
                'Build email campaigns',
                'Create automation workflows',
                'Improve open and click rates',
                'Segment audiences effectively'
            ],
            'career_relevance': 'Critical for e-commerce and SaaS marketing roles',
            'content_tags': ['email', 'automation', 'conversion', 'marketing', 'crm'],
            'video_url': 'https://www.youtube.com/watch?v=hU6BVxtGd5g',
            'thumbnail': 'https://img.youtube.com/vi/hU6BVxtGd5g/maxresdefault.jpg',
            'instructor': 'Neil Patel',
            'rating': 4.5,
            'enrolled_count': 11400,
            'lessons': [
                {'id': 1, 'title': 'Email Fundamentals', 'type': 'video', 'duration': 35, 'video_url': 'https://www.youtube.com/watch?v=hU6BVxtGd5g'},
                {'id': 2, 'title': 'Campaign Creation', 'type': 'video', 'duration': 45, 'video_url': 'https://www.youtube.com/watch?v=BKU0XzwT8-w'},
                {'id': 3, 'title': 'Automation Workflows', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=GQHhBCqDxRo'},
                {'id': 4, 'title': 'A/B Testing', 'type': 'video', 'duration': 40, 'video_url': 'https://www.youtube.com/watch?v=hU6BVxtGd5g'}
            ]
        },
        {
            'title': 'Social Media Marketing Strategy',
            'description': 'Complete guide to social media marketing across Facebook, Instagram, LinkedIn, and TikTok',
            'category': 'Marketing',
            'difficulty': 'beginner',
            'skills': ['Social Media', 'Community Management', 'Influencer Marketing', 'Facebook Ads', 'Instagram Marketing'],
            'duration_minutes': 1500,
            'prerequisites': [],
            'learning_outcomes': [
                'Create social media strategies',
                'Grow engaged communities',
                'Run effective ad campaigns',
                'Analyze social metrics'
            ],
            'career_relevance': 'Essential for social media managers and brand strategists',
            'content_tags': ['socialmedia', 'facebook', 'instagram', 'community', 'ads'],
            'video_url': 'https://www.youtube.com/watch?v=TJ_k4InzY3I',
            'thumbnail': 'https://img.youtube.com/vi/TJ_k4InzY3I/maxresdefault.jpg',
            'instructor': 'Hootsuite Academy',
            'rating': 4.6,
            'enrolled_count': 13900,
            'lessons': [
                {'id': 1, 'title': 'Social Strategy', 'type': 'video', 'duration': 45, 'video_url': 'https://www.youtube.com/watch?v=TJ_k4InzY3I'},
                {'id': 2, 'title': 'Content Planning', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=PDBr8Oid4wg'},
                {'id': 3, 'title': 'Paid Advertising', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=wkXnBROwPUw'},
                {'id': 4, 'title': 'Analytics & Insights', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=TJ_k4InzY3I'}
            ]
        },
        # Regional Language Courses
        {
            'title': 'Python Programming in Hindi - शुरुआत से एडवांस',
            'description': 'Complete Python programming course in Hindi from basics to advanced topics with projects',
            'category': 'Programming',
            'difficulty': 'beginner',
            'skills': ['Python', 'OOP', 'Data Structures', 'Programming Basics', 'Hindi Language'],
            'duration_minutes': 2000,
            'prerequisites': [],
            'learning_outcomes': [
                'Python programming in Hindi',
                'Build real projects',
                'Master coding fundamentals',
                'Career-ready skills'
            ],
            'career_relevance': 'Learn programming in your native language - Hindi',
            'content_tags': ['python', 'hindi', 'programming', 'beginner', 'हिंदी'],
            'video_url': 'https://www.youtube.com/watch?v=gfDE2a7MKjA',
            'video_urls_multilang': {
                'hi': 'https://www.youtube.com/watch?v=gfDE2a7MKjA',
                'en': 'https://www.youtube.com/watch?v=rfscVS0vtbw'
            },
            'available_languages': ['hi', 'en'],
            'thumbnail': 'https://img.youtube.com/vi/gfDE2a7MKjA/maxresdefault.jpg',
            'instructor': 'CodeWithHarry',
            'rating': 4.9,
            'enrolled_count': 45000,
            'lessons': [
                {'id': 1, 'title': 'Python Basics in Hindi', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=gfDE2a7MKjA'},
                {'id': 2, 'title': 'Variables और Data Types', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=gfDE2a7MKjA'},
                {'id': 3, 'title': 'Functions और Modules', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=gfDE2a7MKjA'},
                {'id': 4, 'title': 'OOP in Hindi', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=gfDE2a7MKjA'}
            ]
        },
        {
            'title': 'Web Development in Telugu - వెబ్ డెవలప్‌మెంట్',
            'description': 'Complete web development course in Telugu covering HTML, CSS, JavaScript and React',
            'category': 'Web Development',
            'difficulty': 'beginner',
            'skills': ['HTML', 'CSS', 'JavaScript', 'React', 'Telugu Language'],
            'duration_minutes': 1800,
            'prerequisites': [],
            'learning_outcomes': [
                'Build websites in Telugu',
                'Master HTML, CSS, JavaScript',
                'Learn React framework',
                'Create responsive designs'
            ],
            'career_relevance': 'Learn web development in Telugu language',
            'content_tags': ['web', 'telugu', 'html', 'css', 'javascript', 'తెలుగు'],
            'video_url': 'https://www.youtube.com/watch?v=TKIjRLRGq_A',
            'video_urls_multilang': {
                'te': 'https://www.youtube.com/watch?v=TKIjRLRGq_A',
                'en': 'https://www.youtube.com/watch?v=nu_pCVPKzTk'
            },
            'available_languages': ['te', 'en'],
            'thumbnail': 'https://img.youtube.com/vi/TKIjRLRGq_A/maxresdefault.jpg',
            'instructor': 'Telugu Web Guru',
            'rating': 4.7,
            'enrolled_count': 12500,
            'lessons': [
                {'id': 1, 'title': 'HTML Basics in Telugu', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=TKIjRLRGq_A'},
                {'id': 2, 'title': 'CSS Styling', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=TKIjRLRGq_A'},
                {'id': 3, 'title': 'JavaScript Fundamentals', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=TKIjRLRGq_A'},
                {'id': 4, 'title': 'React Introduction', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=TKIjRLRGq_A'}
            ]
        },
        {
            'title': 'Data Science in Tamil - தமிழில் டேட்டா சயின்ஸ்',
            'description': 'Complete data science course in Tamil covering Python, data analysis, and machine learning',
            'category': 'Data Science',
            'difficulty': 'intermediate',
            'skills': ['Python', 'Data Analysis', 'Machine Learning', 'Pandas', 'Tamil Language'],
            'duration_minutes': 2200,
            'prerequisites': ['Python basics'],
            'learning_outcomes': [
                'Data science in Tamil',
                'Machine learning models',
                'Data analysis with Pandas',
                'Career in data science'
            ],
            'career_relevance': 'Learn data science in Tamil language',
            'content_tags': ['data-science', 'tamil', 'python', 'ml', 'தமிழ்'],
            'video_url': 'https://www.youtube.com/watch?v=mkv5mxYu0Wk',
            'video_urls_multilang': {
                'ta': 'https://www.youtube.com/watch?v=mkv5mxYu0Wk',
                'en': 'https://www.youtube.com/watch?v=ua-CiDNNj30'
            },
            'available_languages': ['ta', 'en'],
            'thumbnail': 'https://img.youtube.com/vi/mkv5mxYu0Wk/maxresdefault.jpg',
            'instructor': 'Tamil Tech',
            'rating': 4.8,
            'enrolled_count': 8900,
            'lessons': [
                {'id': 1, 'title': 'Python for Data Science', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=mkv5mxYu0Wk'},
                {'id': 2, 'title': 'Pandas Library', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=mkv5mxYu0Wk'},
                {'id': 3, 'title': 'Machine Learning Basics', 'type': 'video', 'duration': 80, 'video_url': 'https://www.youtube.com/watch?v=mkv5mxYu0Wk'},
                {'id': 4, 'title': 'Real Projects', 'type': 'video', 'duration': 75, 'video_url': 'https://www.youtube.com/watch?v=mkv5mxYu0Wk'}
            ]
        },
        {
            'title': 'Java Programming in Bengali - বাংলায় জাভা',
            'description': 'Complete Java programming course in Bengali from basics to advanced OOP concepts',
            'category': 'Programming',
            'difficulty': 'beginner',
            'skills': ['Java', 'OOP', 'Data Structures', 'Programming', 'Bengali Language'],
            'duration_minutes': 1900,
            'prerequisites': [],
            'learning_outcomes': [
                'Java programming in Bengali',
                'Object-oriented programming',
                'Build Java applications',
                'Software development skills'
            ],
            'career_relevance': 'Learn Java in Bengali language',
            'content_tags': ['java', 'bengali', 'programming', 'oop', 'বাংলা'],
            'video_url': 'https://www.youtube.com/watch?v=yW6ndhXJmDA',
            'video_urls_multilang': {
                'bn': 'https://www.youtube.com/watch?v=yW6ndhXJmDA',
                'en': 'https://www.youtube.com/watch?v=eIrMbAQSU34'
            },
            'available_languages': ['bn', 'en'],
            'thumbnail': 'https://img.youtube.com/vi/yW6ndhXJmDA/maxresdefault.jpg',
            'instructor': 'Anisul Islam',
            'rating': 4.8,
            'enrolled_count': 15600,
            'lessons': [
                {'id': 1, 'title': 'Java Basics in Bengali', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=yW6ndhXJmDA'},
                {'id': 2, 'title': 'Variables এবং Data Types', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=yW6ndhXJmDA'},
                {'id': 3, 'title': 'OOP Concepts', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=yW6ndhXJmDA'},
                {'id': 4, 'title': 'Advanced Java', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=yW6ndhXJmDA'}
            ]
        },
        # Additional Hindi Courses
        {
            'title': 'JavaScript Complete Course in Hindi',
            'description': 'Learn JavaScript from basics to advanced in Hindi - हिंदी में JavaScript सीखें',
            'category': 'Programming',
            'difficulty': 'beginner',
            'skills': ['JavaScript', 'ES6', 'DOM', 'Async Programming', 'Hindi Language'],
            'duration_minutes': 1600,
            'prerequisites': [],
            'learning_outcomes': [
                'Master JavaScript in Hindi',
                'Build interactive web apps',
                'ES6+ features',
                'DOM manipulation'
            ],
            'career_relevance': 'Essential for web development in Hindi',
            'content_tags': ['javascript', 'hindi', 'programming', 'web', 'हिंदी'],
            'video_url': 'https://www.youtube.com/watch?v=ER9SspLe4Hg',
            'video_urls_multilang': {
                'hi': 'https://www.youtube.com/watch?v=ER9SspLe4Hg',
                'en': 'https://www.youtube.com/watch?v=PkZNo7MFNFg'
            },
            'available_languages': ['hi'],
            'thumbnail': 'https://img.youtube.com/vi/ER9SspLe4Hg/maxresdefault.jpg',
            'instructor': 'Thapa Technical',
            'rating': 4.8,
            'enrolled_count': 38000,
            'lessons': [
                {'id': 1, 'title': 'JavaScript Basics', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=ER9SspLe4Hg'},
                {'id': 2, 'title': 'Functions और Arrays', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=ER9SspLe4Hg'},
                {'id': 3, 'title': 'DOM Manipulation', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=ER9SspLe4Hg'},
                {'id': 4, 'title': 'ES6 Features', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=ER9SspLe4Hg'}
            ]
        },
        {
            'title': 'React JS in Hindi - रिएक्ट हिंदी में',
            'description': 'Complete React.js course in Hindi for building modern web applications',
            'category': 'Web Development',
            'difficulty': 'intermediate',
            'skills': ['React', 'JSX', 'Hooks', 'Components', 'Hindi Language'],
            'duration_minutes': 1400,
            'prerequisites': ['HTML', 'CSS', 'JavaScript'],
            'learning_outcomes': [
                'Build React apps in Hindi',
                'Master React Hooks',
                'Component lifecycle',
                'State management'
            ],
            'career_relevance': 'Most popular frontend framework in Hindi',
            'content_tags': ['react', 'hindi', 'frontend', 'web', 'हिंदी'],
            'video_url': 'https://www.youtube.com/watch?v=RGKi6LSPDLU',
            'video_urls_multilang': {
                'hi': 'https://www.youtube.com/watch?v=RGKi6LSPDLU',
                'en': 'https://www.youtube.com/watch?v=bMknfKXIFA8'
            },
            'available_languages': ['hi'],
            'thumbnail': 'https://img.youtube.com/vi/RGKi6LSPDLU/maxresdefault.jpg',
            'instructor': 'CodeWithHarry',
            'rating': 4.9,
            'enrolled_count': 42000,
            'lessons': [
                {'id': 1, 'title': 'React Introduction', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=RGKi6LSPDLU'},
                {'id': 2, 'title': 'Components और Props', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=RGKi6LSPDLU'},
                {'id': 3, 'title': 'State और Hooks', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=RGKi6LSPDLU'},
                {'id': 4, 'title': 'React Router', 'type': 'video', 'duration': 45, 'video_url': 'https://www.youtube.com/watch?v=RGKi6LSPDLU'}
            ]
        },
        {
            'title': 'MySQL Database in Hindi',
            'description': 'Complete MySQL database course in Hindi - डेटाबेस हिंदी में सीखें',
            'category': 'Data Science',
            'difficulty': 'beginner',
            'skills': ['MySQL', 'SQL', 'Database', 'Queries', 'Hindi Language'],
            'duration_minutes': 1200,
            'prerequisites': [],
            'learning_outcomes': [
                'Master SQL in Hindi',
                'Database design',
                'Complex queries',
                'Real-world projects'
            ],
            'career_relevance': 'Essential database skill in Hindi',
            'content_tags': ['mysql', 'sql', 'database', 'hindi', 'हिंदी'],
            'video_url': 'https://www.youtube.com/watch?v=hlGoQC332VM',
            'video_urls_multilang': {
                'hi': 'https://www.youtube.com/watch?v=hlGoQC332VM',
                'en': 'https://www.youtube.com/watch?v=HXV3zeQKqGY'
            },
            'available_languages': ['hi'],
            'thumbnail': 'https://img.youtube.com/vi/hlGoQC332VM/maxresdefault.jpg',
            'instructor': 'Geeky Shows',
            'rating': 4.7,
            'enrolled_count': 28000,
            'lessons': [
                {'id': 1, 'title': 'SQL Basics', 'type': 'video', 'duration': 45, 'video_url': 'https://www.youtube.com/watch?v=hlGoQC332VM'},
                {'id': 2, 'title': 'Database Design', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=hlGoQC332VM'},
                {'id': 3, 'title': 'Joins और Queries', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=hlGoQC332VM'},
                {'id': 4, 'title': 'Advanced SQL', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=hlGoQC332VM'}
            ]
        },
        {
            'title': 'Android Development in Hindi',
            'description': 'Complete Android app development course in Hindi - एंड्रॉयड डेवलपमेंट हिंदी में',
            'category': 'Mobile Development',
            'difficulty': 'intermediate',
            'skills': ['Android', 'Java', 'Kotlin', 'Mobile Apps', 'Hindi Language'],
            'duration_minutes': 2000,
            'prerequisites': ['Java'],
            'learning_outcomes': [
                'Build Android apps in Hindi',
                'Java और Kotlin',
                'UI/UX design',
                'Publish to Play Store'
            ],
            'career_relevance': 'High demand mobile development skill in Hindi',
            'content_tags': ['android', 'mobile', 'hindi', 'java', 'हिंदी'],
            'video_url': 'https://www.youtube.com/watch?v=mXjZQX3UzOs',
            'video_urls_multilang': {
                'hi': 'https://www.youtube.com/watch?v=mXjZQX3UzOs',
                'en': 'https://www.youtube.com/watch?v=fis26HvvDII'
            },
            'available_languages': ['hi'],
            'thumbnail': 'https://img.youtube.com/vi/mXjZQX3UzOs/maxresdefault.jpg',
            'instructor': 'WsCube Tech',
            'rating': 4.8,
            'enrolled_count': 35000,
            'lessons': [
                {'id': 1, 'title': 'Android Basics', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=mXjZQX3UzOs'},
                {'id': 2, 'title': 'Activities और Intents', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=mXjZQX3UzOs'},
                {'id': 3, 'title': 'UI Design', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=mXjZQX3UzOs'},
                {'id': 4, 'title': 'Database Integration', 'type': 'video', 'duration': 75, 'video_url': 'https://www.youtube.com/watch?v=mXjZQX3UzOs'}
            ]
        },
        # Additional Telugu Courses
        {
            'title': 'Python Programming in Telugu - పైథాన్ తెలుగులో',
            'description': 'Complete Python programming course in Telugu from basics to advanced',
            'category': 'Programming',
            'difficulty': 'beginner',
            'skills': ['Python', 'Programming', 'OOP', 'Projects', 'Telugu Language'],
            'duration_minutes': 1700,
            'prerequisites': [],
            'learning_outcomes': [
                'Python in Telugu',
                'Programming fundamentals',
                'Build real projects',
                'Career skills'
            ],
            'career_relevance': 'Learn Python in Telugu language',
            'content_tags': ['python', 'telugu', 'programming', 'తెలుగు'],
            'video_url': 'https://www.youtube.com/watch?v=M2NyXKxyUYU',
            'video_urls_multilang': {
                'te': 'https://www.youtube.com/watch?v=M2NyXKxyUYU',
                'en': 'https://www.youtube.com/watch?v=rfscVS0vtbw'
            },
            'available_languages': ['te'],
            'thumbnail': 'https://img.youtube.com/vi/M2NyXKxyUYU/maxresdefault.jpg',
            'instructor': 'Telugu CS Tutorials',
            'rating': 4.8,
            'enrolled_count': 22000,
            'lessons': [
                {'id': 1, 'title': 'Python Basics', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=M2NyXKxyUYU'},
                {'id': 2, 'title': 'Data Types', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=M2NyXKxyUYU'},
                {'id': 3, 'title': 'Functions', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=M2NyXKxyUYU'},
                {'id': 4, 'title': 'OOP Concepts', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=M2NyXKxyUYU'}
            ]
        },
        {
            'title': 'Java Programming in Telugu - జావా తెలుగులో',
            'description': 'Complete Java programming course in Telugu for beginners',
            'category': 'Programming',
            'difficulty': 'beginner',
            'skills': ['Java', 'OOP', 'Programming', 'Software Development', 'Telugu Language'],
            'duration_minutes': 1800,
            'prerequisites': [],
            'learning_outcomes': [
                'Java programming in Telugu',
                'Object-oriented concepts',
                'Build applications',
                'Interview preparation'
            ],
            'career_relevance': 'Master Java in Telugu language',
            'content_tags': ['java', 'telugu', 'programming', 'oop', 'తెలుగు'],
            'video_url': 'https://www.youtube.com/watch?v=ntLJmHOJ0ME',
            'video_urls_multilang': {
                'te': 'https://www.youtube.com/watch?v=ntLJmHOJ0ME',
                'en': 'https://www.youtube.com/watch?v=eIrMbAQSU34'
            },
            'available_languages': ['te'],
            'thumbnail': 'https://img.youtube.com/vi/ntLJmHOJ0ME/maxresdefault.jpg',
            'instructor': 'Naresh IT',
            'rating': 4.7,
            'enrolled_count': 25000,
            'lessons': [
                {'id': 1, 'title': 'Java Introduction', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=ntLJmHOJ0ME'},
                {'id': 2, 'title': 'Variables and Data Types', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=ntLJmHOJ0ME'},
                {'id': 3, 'title': 'OOP Concepts', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=ntLJmHOJ0ME'},
                {'id': 4, 'title': 'Exception Handling', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=ntLJmHOJ0ME'}
            ]
        },
        {
            'title': 'React JS in Telugu - రియాక్ట్ తెలుగులో',
            'description': 'Learn React.js in Telugu - Build modern web applications',
            'category': 'Web Development',
            'difficulty': 'intermediate',
            'skills': ['React', 'JavaScript', 'Frontend', 'Web Development', 'Telugu Language'],
            'duration_minutes': 1500,
            'prerequisites': ['HTML', 'CSS', 'JavaScript'],
            'learning_outcomes': [
                'React fundamentals in Telugu',
                'Component architecture',
                'State management',
                'Build real apps'
            ],
            'career_relevance': 'Modern frontend development in Telugu',
            'content_tags': ['react', 'telugu', 'frontend', 'web', 'తెలుగు'],
            'video_url': 'https://www.youtube.com/watch?v=QdFvkhd5a0s',
            'video_urls_multilang': {
                'te': 'https://www.youtube.com/watch?v=QdFvkhd5a0s',
                'en': 'https://www.youtube.com/watch?v=bMknfKXIFA8'
            },
            'available_languages': ['te'],
            'thumbnail': 'https://img.youtube.com/vi/QdFvkhd5a0s/maxresdefault.jpg',
            'instructor': 'Telugu Web Guru',
            'rating': 4.8,
            'enrolled_count': 18000,
            'lessons': [
                {'id': 1, 'title': 'React Introduction', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=QdFvkhd5a0s'},
                {'id': 2, 'title': 'Components', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=QdFvkhd5a0s'},
                {'id': 3, 'title': 'Hooks', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=QdFvkhd5a0s'},
                {'id': 4, 'title': 'Routing', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=QdFvkhd5a0s'}
            ]
        },
        {
            'title': 'SQL Database in Telugu - SQL తెలుగులో',
            'description': 'Complete SQL and database management course in Telugu',
            'category': 'Data Science',
            'difficulty': 'beginner',
            'skills': ['SQL', 'Database', 'MySQL', 'Queries', 'Telugu Language'],
            'duration_minutes': 1300,
            'prerequisites': [],
            'learning_outcomes': [
                'SQL basics in Telugu',
                'Database design',
                'Complex queries',
                'Data analysis'
            ],
            'career_relevance': 'Essential database skills in Telugu',
            'content_tags': ['sql', 'database', 'telugu', 'data', 'తెలుగు'],
            'video_url': 'https://www.youtube.com/watch?v=B7GpZ7sYGmA',
            'video_urls_multilang': {
                'te': 'https://www.youtube.com/watch?v=B7GpZ7sYGmA',
                'en': 'https://www.youtube.com/watch?v=HXV3zeQKqGY'
            },
            'available_languages': ['te'],
            'thumbnail': 'https://img.youtube.com/vi/B7GpZ7sYGmA/maxresdefault.jpg',
            'instructor': 'Durga Software Solutions',
            'rating': 4.7,
            'enrolled_count': 20000,
            'lessons': [
                {'id': 1, 'title': 'SQL Introduction', 'type': 'video', 'duration': 45, 'video_url': 'https://www.youtube.com/watch?v=B7GpZ7sYGmA'},
                {'id': 2, 'title': 'Database Creation', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=B7GpZ7sYGmA'},
                {'id': 3, 'title': 'Queries and Joins', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=B7GpZ7sYGmA'},
                {'id': 4, 'title': 'Advanced Concepts', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=B7GpZ7sYGmA'}
            ]
        },
        # Additional Tamil Courses
        {
            'title': 'Python Programming in Tamil - பைத்தான் தமிழில்',
            'description': 'Complete Python course in Tamil from beginner to advanced level',
            'category': 'Programming',
            'difficulty': 'beginner',
            'skills': ['Python', 'Programming', 'OOP', 'Data Structures', 'Tamil Language'],
            'duration_minutes': 1650,
            'prerequisites': [],
            'learning_outcomes': [
                'Python basics in Tamil',
                'Programming concepts',
                'Real-world projects',
                'Job-ready skills'
            ],
            'career_relevance': 'Learn Python in Tamil language',
            'content_tags': ['python', 'tamil', 'programming', 'தமிழ்'],
            'video_url': 'https://www.youtube.com/watch?v=5W6GxPwSQvI',
            'video_urls_multilang': {
                'ta': 'https://www.youtube.com/watch?v=5W6GxPwSQvI',
                'en': 'https://www.youtube.com/watch?v=rfscVS0vtbw'
            },
            'available_languages': ['ta'],
            'thumbnail': 'https://img.youtube.com/vi/5W6GxPwSQvI/maxresdefault.jpg',
            'instructor': 'Tamil Tech',
            'rating': 4.8,
            'enrolled_count': 19000,
            'lessons': [
                {'id': 1, 'title': 'Python Basics', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=5W6GxPwSQvI'},
                {'id': 2, 'title': 'Data Types', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=5W6GxPwSQvI'},
                {'id': 3, 'title': 'Functions', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=5W6GxPwSQvI'},
                {'id': 4, 'title': 'OOP', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=5W6GxPwSQvI'}
            ]
        },
        {
            'title': 'Web Development in Tamil - வலை மேம்பாடு',
            'description': 'Complete web development course in Tamil - HTML, CSS, JavaScript',
            'category': 'Web Development',
            'difficulty': 'beginner',
            'skills': ['HTML', 'CSS', 'JavaScript', 'Web Design', 'Tamil Language'],
            'duration_minutes': 1750,
            'prerequisites': [],
            'learning_outcomes': [
                'Build websites in Tamil',
                'Frontend development',
                'Responsive design',
                'Portfolio projects'
            ],
            'career_relevance': 'Web development skills in Tamil',
            'content_tags': ['web', 'tamil', 'html', 'css', 'javascript', 'தமிழ்'],
            'video_url': 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
            'video_urls_multilang': {
                'ta': 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
                'en': 'https://www.youtube.com/watch?v=nu_pCVPKzTk'
            },
            'available_languages': ['ta'],
            'thumbnail': 'https://img.youtube.com/vi/qz0aGYrrlhU/maxresdefault.jpg',
            'instructor': 'Tamil Programmer',
            'rating': 4.7,
            'enrolled_count': 17000,
            'lessons': [
                {'id': 1, 'title': 'HTML Basics', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=qz0aGYrrlhU'},
                {'id': 2, 'title': 'CSS Styling', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=qz0aGYrrlhU'},
                {'id': 3, 'title': 'JavaScript', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=qz0aGYrrlhU'},
                {'id': 4, 'title': 'Projects', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=qz0aGYrrlhU'}
            ]
        },
        {
            'title': 'Java Programming in Tamil - ஜாவா தமிழில்',
            'description': 'Complete Java programming course in Tamil for beginners to advanced',
            'category': 'Programming',
            'difficulty': 'beginner',
            'skills': ['Java', 'OOP', 'Programming', 'Software Development', 'Tamil Language'],
            'duration_minutes': 1900,
            'prerequisites': [],
            'learning_outcomes': [
                'Java programming in Tamil',
                'Object-oriented programming',
                'Build applications',
                'Career preparation'
            ],
            'career_relevance': 'Java development in Tamil language',
            'content_tags': ['java', 'tamil', 'programming', 'oop', 'தமிழ்'],
            'video_url': 'https://www.youtube.com/watch?v=r59xYe3Vyks',
            'video_urls_multilang': {
                'ta': 'https://www.youtube.com/watch?v=r59xYe3Vyks',
                'en': 'https://www.youtube.com/watch?v=eIrMbAQSU34'
            },
            'available_languages': ['ta'],
            'thumbnail': 'https://img.youtube.com/vi/r59xYe3Vyks/maxresdefault.jpg',
            'instructor': 'Tamil Programming',
            'rating': 4.8,
            'enrolled_count': 21000,
            'lessons': [
                {'id': 1, 'title': 'Java Basics', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=r59xYe3Vyks'},
                {'id': 2, 'title': 'Variables and Types', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=r59xYe3Vyks'},
                {'id': 3, 'title': 'OOP Concepts', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=r59xYe3Vyks'},
                {'id': 4, 'title': 'Advanced Java', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=r59xYe3Vyks'}
            ]
        },
        {
            'title': 'Machine Learning in Tamil - இயந்திர கற்றல்',
            'description': 'Introduction to machine learning and AI in Tamil language',
            'category': 'AI and Deep Learning',
            'difficulty': 'intermediate',
            'skills': ['Machine Learning', 'Python', 'AI', 'Data Science', 'Tamil Language'],
            'duration_minutes': 1600,
            'prerequisites': ['Python'],
            'learning_outcomes': [
                'ML basics in Tamil',
                'Python for ML',
                'Build ML models',
                'Real projects'
            ],
            'career_relevance': 'AI/ML skills in Tamil language',
            'content_tags': ['ml', 'ai', 'tamil', 'python', 'data-science', 'தமிழ்'],
            'video_url': 'https://www.youtube.com/watch?v=gmvvaobm7eQ',
            'video_urls_multilang': {
                'ta': 'https://www.youtube.com/watch?v=gmvvaobm7eQ',
                'en': 'https://www.youtube.com/watch?v=7eh4d6sabA0'
            },
            'available_languages': ['ta'],
            'thumbnail': 'https://img.youtube.com/vi/gmvvaobm7eQ/maxresdefault.jpg',
            'instructor': 'Tamil AI Tutorials',
            'rating': 4.8,
            'enrolled_count': 15000,
            'lessons': [
                {'id': 1, 'title': 'ML Introduction', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=gmvvaobm7eQ'},
                {'id': 2, 'title': 'Python for ML', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=gmvvaobm7eQ'},
                {'id': 3, 'title': 'Algorithms', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=gmvvaobm7eQ'},
                {'id': 4, 'title': 'Projects', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=gmvvaobm7eQ'}
            ]
        },
        # Additional Bengali Courses
        {
            'title': 'Python Programming in Bengali - বাংলায় পাইথন',
            'description': 'Complete Python programming course in Bengali from basics to advanced',
            'category': 'Programming',
            'difficulty': 'beginner',
            'skills': ['Python', 'Programming', 'OOP', 'Projects', 'Bengali Language'],
            'duration_minutes': 1700,
            'prerequisites': [],
            'learning_outcomes': [
                'Python in Bengali',
                'Programming fundamentals',
                'Build applications',
                'Career skills'
            ],
            'career_relevance': 'Learn Python in Bengali language',
            'content_tags': ['python', 'bengali', 'programming', 'বাংলা'],
            'video_url': 'https://www.youtube.com/watch?v=bJzb-RuUcMU',
            'video_urls_multilang': {
                'bn': 'https://www.youtube.com/watch?v=bJzb-RuUcMU',
                'en': 'https://www.youtube.com/watch?v=rfscVS0vtbw'
            },
            'available_languages': ['bn'],
            'thumbnail': 'https://img.youtube.com/vi/bJzb-RuUcMU/maxresdefault.jpg',
            'instructor': 'Bangla Coding',
            'rating': 4.8,
            'enrolled_count': 24000,
            'lessons': [
                {'id': 1, 'title': 'Python Basics', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=bJzb-RuUcMU'},
                {'id': 2, 'title': 'Data Types', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=bJzb-RuUcMU'},
                {'id': 3, 'title': 'Functions', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=bJzb-RuUcMU'},
                {'id': 4, 'title': 'OOP', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=bJzb-RuUcMU'}
            ]
        },
        {
            'title': 'Web Development in Bengali - ওয়েব ডেভেলপমেন্ট',
            'description': 'Complete web development course in Bengali - HTML, CSS, JavaScript',
            'category': 'Web Development',
            'difficulty': 'beginner',
            'skills': ['HTML', 'CSS', 'JavaScript', 'Web Development', 'Bengali Language'],
            'duration_minutes': 1800,
            'prerequisites': [],
            'learning_outcomes': [
                'Web development in Bengali',
                'Build websites',
                'Frontend skills',
                'Real projects'
            ],
            'career_relevance': 'Web development in Bengali language',
            'content_tags': ['web', 'bengali', 'html', 'css', 'javascript', 'বাংলা'],
            'video_url': 'https://www.youtube.com/watch?v=XMwplhzglK8',
            'video_urls_multilang': {
                'bn': 'https://www.youtube.com/watch?v=XMwplhzglK8',
                'en': 'https://www.youtube.com/watch?v=nu_pCVPKzTk'
            },
            'available_languages': ['bn'],
            'thumbnail': 'https://img.youtube.com/vi/XMwplhzglK8/maxresdefault.jpg',
            'instructor': 'Stack Learner',
            'rating': 4.9,
            'enrolled_count': 32000,
            'lessons': [
                {'id': 1, 'title': 'HTML Basics', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=XMwplhzglK8'},
                {'id': 2, 'title': 'CSS Styling', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=XMwplhzglK8'},
                {'id': 3, 'title': 'JavaScript', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=XMwplhzglK8'},
                {'id': 4, 'title': 'Projects', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=XMwplhzglK8'}
            ]
        },
        {
            'title': 'C Programming in Bengali - সি প্রোগ্রামিং',
            'description': 'Complete C programming course in Bengali for beginners',
            'category': 'Programming',
            'difficulty': 'beginner',
            'skills': ['C', 'Programming', 'Data Structures', 'Algorithms', 'Bengali Language'],
            'duration_minutes': 1500,
            'prerequisites': [],
            'learning_outcomes': [
                'C programming in Bengali',
                'Core programming concepts',
                'Memory management',
                'Problem solving'
            ],
            'career_relevance': 'Foundation programming in Bengali',
            'content_tags': ['c', 'bengali', 'programming', 'basics', 'বাংলা'],
            'video_url': 'https://www.youtube.com/watch?v=ZSPZob_1TOk',
            'video_urls_multilang': {
                'bn': 'https://www.youtube.com/watch?v=ZSPZob_1TOk',
                'en': 'https://www.youtube.com/watch?v=KJgsSFOSQv0'
            },
            'available_languages': ['bn'],
            'thumbnail': 'https://img.youtube.com/vi/ZSPZob_1TOk/maxresdefault.jpg',
            'instructor': 'Anisul Islam',
            'rating': 4.8,
            'enrolled_count': 28000,
            'lessons': [
                {'id': 1, 'title': 'C Basics', 'type': 'video', 'duration': 45, 'video_url': 'https://www.youtube.com/watch?v=ZSPZob_1TOk'},
                {'id': 2, 'title': 'Variables and Types', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=ZSPZob_1TOk'},
                {'id': 3, 'title': 'Control Flow', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=ZSPZob_1TOk'},
                {'id': 4, 'title': 'Functions', 'type': 'video', 'duration': 50, 'video_url': 'https://www.youtube.com/watch?v=ZSPZob_1TOk'}
            ]
        },
        {
            'title': 'Data Structures in Bengali - ডেটা স্ট্রাকচার',
            'description': 'Complete data structures and algorithms course in Bengali',
            'category': 'Programming',
            'difficulty': 'intermediate',
            'skills': ['Data Structures', 'Algorithms', 'Programming', 'Problem Solving', 'Bengali Language'],
            'duration_minutes': 1850,
            'prerequisites': ['Programming basics'],
            'learning_outcomes': [
                'DSA in Bengali',
                'Algorithm design',
                'Problem solving',
                'Interview preparation'
            ],
            'career_relevance': 'Essential for technical interviews in Bengali',
            'content_tags': ['dsa', 'algorithms', 'bengali', 'programming', 'বাংলা'],
            'video_url': 'https://www.youtube.com/watch?v=zg9ih6SVACc',
            'video_urls_multilang': {
                'bn': 'https://www.youtube.com/watch?v=zg9ih6SVACc',
                'en': 'https://www.youtube.com/watch?v=8hly31xKli0'
            },
            'available_languages': ['bn'],
            'thumbnail': 'https://img.youtube.com/vi/zg9ih6SVACc/maxresdefault.jpg',
            'instructor': 'Tamim Shahriar',
            'rating': 4.9,
            'enrolled_count': 26000,
            'lessons': [
                {'id': 1, 'title': 'Arrays and Lists', 'type': 'video', 'duration': 55, 'video_url': 'https://www.youtube.com/watch?v=zg9ih6SVACc'},
                {'id': 2, 'title': 'Stacks and Queues', 'type': 'video', 'duration': 60, 'video_url': 'https://www.youtube.com/watch?v=zg9ih6SVACc'},
                {'id': 3, 'title': 'Trees and Graphs', 'type': 'video', 'duration': 65, 'video_url': 'https://www.youtube.com/watch?v=zg9ih6SVACc'},
                {'id': 4, 'title': 'Sorting Algorithms', 'type': 'video', 'duration': 70, 'video_url': 'https://www.youtube.com/watch?v=zg9ih6SVACc'}
            ]
        }
    ]
    
    with app.app_context():
        # Create all tables first
        db.create_all()
        
        # Clear existing courses
        Course.query.delete()
        
        # Add new courses
        for course_data in courses_data:
            course = Course(**course_data)
            db.session.add(course)
        
        db.session.commit()
        print(f'✅ Seeded {len(courses_data)} courses successfully!')

if __name__ == '__main__':
    seed_courses()
