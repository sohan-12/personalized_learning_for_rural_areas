import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class RecommendationEngine:
    """
    Hybrid recommendation system combining:
    1. Rule-based filtering (skill level, prerequisites)
    2. Content-based filtering (course similarity)
    3. Learning DNA matching (learning style preferences)
    4. Micro-skills tracking (granular skill progression)
    """
    
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
    
    def rule_based_filter(self, courses, user):
        """Filter courses based on user's skill level, selected skills, prerequisites, and stream"""
        filtered = []
        priority_courses = []
        user_skills = set(user.get('selected_skills', []))
        user_level = user.get('skill_level', 'beginner')
        user_stream = user.get('stream', 'general')
        completed_courses = set(user.get('completed_courses', []))
        
        level_order = {'beginner': 0, 'intermediate': 1, 'advanced': 2}
        user_level_num = level_order.get(user_level, 0)
        
        for course in courses:
            # Skip already completed courses
            course_id = course.get('id') or course.get('title')
            if course_id in completed_courses:
                continue
            
            course_level_num = level_order.get(course.get('difficulty', 'beginner'), 0)
            
            # Check if course matches user's stream
            course_stream = course.get('stream', 'general')
            stream_match = course_stream == 'general' or course_stream == user_stream
            
            # If course stream doesn't match user's stream, skip it unless it's general
            if not stream_match and course_stream != 'general':
                continue
            
            # Check if course matches user's selected skills
            course_skills = set(course.get('skills', []))
            course_category = course.get('category', '').lower()
            
            # Check for direct skill match
            skill_match = bool(user_skills & course_skills)
            
            # Check for category match with selected skills
            category_match = False
            for skill in user_skills:
                if skill.lower() in course_category or course_category in skill.lower():
                    category_match = True
                    break
            
            # Check if course is appropriate level (be more lenient)
            level_appropriate = abs(course_level_num - user_level_num) <= 1
            
            # Check prerequisites
            prereqs = set(course.get('prerequisites', []))
            prereqs_met = not prereqs or prereqs.issubset(user_skills)
            
            # Prioritize courses that match user's stream, selected skills or category
            if (skill_match or category_match) and level_appropriate and prereqs_met:
                priority_courses.append(course)
            elif level_appropriate and prereqs_met:
                filtered.append(course)
            
            # Prioritize courses that match user's selected skills
            if skill_match and level_appropriate and prereqs_met:
                priority_courses.append(course)
            elif level_appropriate:
                filtered.append(course)
        
        # Return priority courses first, then others
        return priority_courses + filtered
    
    def content_based_similarity(self, courses, user):
        """Calculate course similarity based on content and user interests"""
        if not courses:
            return []
        
        # Create corpus from course descriptions and tags
        corpus = []
        for course in courses:
            text = f"{course.get('title', '')} {course.get('description', '')} "
            text += ' '.join(course.get('content_tags', []))
            text += ' '.join(course.get('skills', []))
            text += f" {course.get('category', '')}"
            corpus.append(text)
        
        # User profile text - emphasize selected skills
        user_text = ' '.join(user.get('selected_skills', [])) * 3  # Weight selected skills higher
        user_text += f" {user.get('career_interest', '')}"
        
        # Calculate TF-IDF and similarity
        try:
            all_texts = corpus + [user_text]
            tfidf_matrix = self.vectorizer.fit_transform(all_texts)
            
            # Calculate similarity between user and each course
            user_vector = tfidf_matrix[-1]
            course_vectors = tfidf_matrix[:-1]
            
            similarities = cosine_similarity(user_vector, course_vectors)[0]
            
            # Add similarity scores to courses
            for i, course in enumerate(courses):
                course['similarity_score'] = float(similarities[i])
                
                # Boost courses that match user's selected skills directly
                course_skills = set(course.get('skills', []))
                user_skills = set(user.get('selected_skills', []))
                if user_skills & course_skills:
                    course['similarity_score'] *= 1.5  # 50% boost for skill match
            
            return sorted(courses, key=lambda x: x.get('similarity_score', 0), reverse=True)
        
        except Exception as e:
            print(f"Content similarity error: {e}")
            return courses
    
    def learning_dna_match(self, courses, user):
        """Match courses to user's learning DNA profile"""
        learning_dna = user.get('learning_dna', {})
        
        if not learning_dna:
            return courses
        
        # Learning style preferences
        visual_pref = learning_dna.get('visual', 0.5)
        interactive_pref = learning_dna.get('interactive', 0.5)
        text_pref = learning_dna.get('text', 0.5)
        video_pref = learning_dna.get('video', 0.5)
        
        for course in courses:
            # Calculate match score based on course content types
            lessons = course.get('lessons', [])
            if lessons:
                video_count = sum(1 for l in lessons if l.get('type') == 'video')
                text_count = sum(1 for l in lessons if l.get('type') == 'reading')
                interactive_count = sum(1 for l in lessons if l.get('type') == 'interactive')
                
                total = len(lessons)
                dna_score = 0
                dna_score += (video_count / total) * video_pref if total > 0 else 0
                dna_score += (text_count / total) * text_pref if total > 0 else 0
                dna_score += (interactive_count / total) * interactive_pref if total > 0 else 0
                
                course['dna_match_score'] = dna_score
            else:
                course['dna_match_score'] = 0.5
        
        return courses
    
    def micro_skills_progression(self, courses, user):
        """Recommend courses that build upon user's micro-skills"""
        user_micro_skills = user.get('micro_skills', [])
        
        if not user_micro_skills:
            return courses
        
        for course in courses:
            course_skills = course.get('skills', [])
            
            # Calculate skill overlap
            overlap = len(set(course_skills) & set(user_micro_skills))
            new_skills = len(set(course_skills) - set(user_micro_skills))
            
            # Prefer courses with some overlap but also new skills
            if len(course_skills) > 0:
                progression_score = (overlap * 0.3 + new_skills * 0.7) / len(course_skills)
            else:
                progression_score = 0
            
            course['progression_score'] = progression_score
        
        return courses
    
    def get_recommendations(self, courses, user, limit=10):
        """
        Main recommendation function combining all strategies
        """
        if not courses:
            return []
        
        # Convert to dict if needed
        courses_dict = [c.to_dict() if hasattr(c, 'to_dict') else c for c in courses]
        user_dict = user.to_dict() if hasattr(user, 'to_dict') else user
        
        # Get completed courses to exclude them
        completed_courses = user_dict.get('completed_courses', [])
        if isinstance(completed_courses, str):
            try:
                import json
                completed_courses = json.loads(completed_courses)
            except:
                completed_courses = []
        user_dict['completed_courses'] = completed_courses
        
        # Get micro skills to identify skill gaps
        micro_skills = set(user_dict.get('micro_skills', []))
        user_skills = set(user_dict.get('selected_skills', []))
        
        # Filter out completed courses and add skill gap info
        for course in courses_dict:
            # Skip completed courses
            course_id = course.get('id') or course.get('title')
            if course_id in completed_courses:
                course['skip'] = True
            else:
                course_skills = set(course.get('skills', []))
                # Calculate skill gap (new skills needed)
                skill_gap = course_skills - micro_skills
                if skill_gap:
                    course['skill_gap'] = len(skill_gap)
                else:
                    course['skill_gap'] = 0
        
        # Remove completed courses
        courses_dict = [c for c in courses_dict if not c.get('skip', False)]
        
        # Prioritize courses in user's preferred language
        user_language = user_dict.get('preferred_language', 'en')
        language_names = {
            'hi': ['hindi', 'हिंदी'],
            'te': ['telugu', 'తెలుగు'],
            'ta': ['tamil', 'தமிழ்'],
            'bn': ['bengali', 'বাংলা']
        }
        
        # Add language match bonus
        for course in courses_dict:
            course['language_match'] = False
            if user_language != 'en':
                # Check if course has the language in available_languages
                if user_language in course.get('available_languages', []):
                    course['language_match'] = True
                # Check if course title includes language name
                names = language_names.get(user_language, [])
                if any(name.lower() in course.get('title', '').lower() for name in names):
                    course['language_match'] = True
        
        # Step 1: Rule-based filtering
        filtered_courses = self.rule_based_filter(courses_dict, user_dict)
        
        if not filtered_courses:
            filtered_courses = courses_dict
        
        # Step 2: Content-based similarity
        filtered_courses = self.content_based_similarity(filtered_courses, user_dict)
        
        # Step 3: Learning DNA matching
        filtered_courses = self.learning_dna_match(filtered_courses, user_dict)
        
        # Step 4: Micro-skills progression
        filtered_courses = self.micro_skills_progression(filtered_courses, user_dict)
        
        # Calculate final score with skill gap and language boost
        user_stream = user_dict.get('stream', 'general')
        for course in filtered_courses:
            final_score = (
                course.get('similarity_score', 0) * 0.35 +
                course.get('dna_match_score', 0) * 0.25 +
                course.get('progression_score', 0) * 0.25 +
                course.get('skill_gap', 0) * 0.1  # Boost for new skills
            )
            # Give significant boost to courses in user's language
            if course.get('language_match', False):
                final_score *= 1.8  # 80% boost for language match
            
            # Boost courses that match user's stream
            course_stream = course.get('stream', 'general')
            if course_stream == user_stream and user_stream != 'general':
                final_score *= 2.0  # 100% boost for stream match
            
            # Boost courses that match user's career interest
            career_interest = user_dict.get('career_interest', '')
            if career_interest and career_interest.lower() in course.get('title', '').lower():
                final_score *= 1.5
            
            course['recommendation_score'] = final_score
        
        # Sort by final score
        recommended = sorted(
            filtered_courses,
            key=lambda x: x.get('recommendation_score', 0),
            reverse=True
        )
        
        return recommended[:limit]
