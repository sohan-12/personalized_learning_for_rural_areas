import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  Target,
  Lightbulb,
  Languages,
  Download,
  Trophy,
  Star,
  Zap,
  Shield,
  Crown,
  Flame,
} from "lucide-react";
import axios from "axios";
import Chatbot from "../components/Chatbot";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [simpleMode, setSimpleMode] = useState(false);
  const [allRecommendations, setAllRecommendations] = useState([]);
  const [careerReadiness, setCareerReadiness] = useState({
    score: 0,
    completedSkills: 0,
    totalSkills: 0,
    projectsDone: 0,
    targetProjects: 8,
    practiceHours: 0,
    targetHours: 100,
    avgSkillPercentage: 0,
    skillsWithPercentage: [],
    isReadinessUnlocked: false,
  });

  // Calculate Career Readiness Score
  const calculateCareerReadiness = (
    userData,
    progressData,
    coursesData = []
  ) => {
    // Use passed coursesData or fall back to recommendations
    const courses = coursesData.length > 0 ? coursesData : recommendations;

    const completedCourses = progressData.filter((p) => p.completed).length;
    const totalEnrolled = progressData.length;
    const totalTimeSpent = progressData.reduce(
      (sum, p) => sum + (p.time_spent_minutes || 0),
      0
    );

    // Calculate skills from selected_skills and micro_skills
    const selectedSkills = userData?.selected_skills || [];
    const microSkills = userData?.micro_skills || [];
    const allSkills = [...new Set([...selectedSkills, ...microSkills])];

    // Calculate skill percentages based on course completion
    const skillsWithPercentage = allSkills.map((skill) => {
      // Find courses that teach this skill
      const relevantProgress = progressData.filter((p) => {
        const course = courses.find((rec) => rec.id === p.course_id);
        return (
          course &&
          course.skills &&
          course.skills.some((s) => s.toLowerCase() === skill.toLowerCase())
        );
      });

      const completed = relevantProgress.filter((p) => p.completed).length;
      const total = relevantProgress.length || 1;
      const percentage = Math.round((completed / total) * 100);

      return {
        name: skill,
        percentage: percentage,
        completed: completed,
        total: total,
        isCompleted: completed > 0, // Mark as completed when at least one course is done
      };
    });

    // Calculate average skill percentage
    const avgSkillPercentage =
      skillsWithPercentage.length > 0
        ? skillsWithPercentage.reduce((sum, s) => sum + s.percentage, 0) /
          skillsWithPercentage.length
        : 0;

    // Calculate completed skills (at least one course completed)
    const completedSkillsCount = skillsWithPercentage.filter(
      (s) => s.completed > 0
    ).length;

    // Calculate projects done (completed courses)
    const projectsDone = completedCourses;
    const targetProjects = Math.max(totalEnrolled, 8);

    // Calculate practice hours - estimate based on course duration
    const practiceHours = Math.floor(totalTimeSpent / 60);
    const targetHours = 100;

    // Overall career readiness score (weighted average)
    const completionWeight = 0.4;
    const skillWeight = 0.3;
    const projectWeight = 0.2;
    const practiceWeight = 0.1;

    const completionScore =
      totalEnrolled > 0 ? (completedCourses / totalEnrolled) * 100 : 0;
    const projectScore = (projectsDone / targetProjects) * 100;
    const practiceScore = (practiceHours / targetHours) * 100;

    const overallScore = Math.round(
      completionScore * completionWeight +
        avgSkillPercentage * skillWeight +
        projectScore * projectWeight +
        Math.min(practiceScore, 100) * practiceWeight
    );

    // Readiness test is unlocked ONLY if average skill percentage is EXACTLY >= 50%
    const isReadinessUnlocked = Math.round(avgSkillPercentage) >= 50;

    return {
      score: overallScore,
      completedSkills: completedSkillsCount,
      totalSkills: allSkills.length,
      projectsDone: projectsDone,
      targetProjects: targetProjects,
      practiceHours: practiceHours,
      targetHours: targetHours,
      skillsWithPercentage: skillsWithPercentage,
      isReadinessUnlocked: isReadinessUnlocked,
      avgSkillPercentage: Math.round(avgSkillPercentage),
    };
  };

  useEffect(() => {
    fetchData();

    // Check if redirected from course completion
    if (location.state?.courseCompleted) {
      setShowCompletionModal(true);
      setTimeout(() => setShowCompletionModal(false), 5000);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]); // Re-fetch when location state changes

  const fetchData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
      const userLang = userData?.preferred_language || "en";
      setSelectedLanguage(userLang);

      // Fetch recommendations
      const recsResponse = await axios.get(
        `/api/courses/recommendations/${userData.id}`
      );
      const allRecs = recsResponse.data.recommendations;
      setAllRecommendations(allRecs);

      // Apply language filter on initial load
      filterCoursesByLanguage(allRecs, userLang);

      // Fetch progress
      const progressResponse = await axios.get(
        `/api/progress/user/${userData.id}`
      );
      const progressData = progressResponse.data;
      setProgress(progressData);

      console.log("Progress Data:", progressData);
      console.log(
        "Completed Courses:",
        progressData.filter((p) => p.completed)
      );

      // Calculate skills learned from completed courses
      const completedProgress = progressData.filter((p) => p.completed);
      const learnedSkills = new Set();

      completedProgress.forEach((p) => {
        const course = allRecs.find((c) => c.id === p.course_id);
        if (course && course.skills) {
          course.skills.forEach((skill) => learnedSkills.add(skill));
        }
      });

      // Update user with learned skills count
      const updatedUser = {
        ...userData,
        micro_skills: Array.from(learnedSkills),
        learned_skills_count: learnedSkills.size,
      };
      setUser(updatedUser);

      // Calculate career readiness with all data - pass allRecs explicitly
      const readiness = calculateCareerReadiness(
        updatedUser,
        progressData,
        allRecs
      );
      setCareerReadiness(readiness);

      console.log("Career Readiness:", readiness);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = async (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);

    try {
      const userData = JSON.parse(localStorage.getItem("user"));

      // Update language in backend
      await axios.put(`/api/auth/user/${userData.id}/language`, {
        language: newLanguage,
      });

      // Update local user data
      userData.preferred_language = newLanguage;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // Refresh recommendations to show language-specific courses
      await refreshRecommendations(userData);
      filterCoursesByLanguage(allRecommendations, newLanguage);
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };

  const refreshRecommendations = async (userData) => {
    try {
      const recsResponse = await axios.get(
        `/api/courses/recommendations/${userData.id}`
      );
      setAllRecommendations(recsResponse.data.recommendations);
      return recsResponse.data.recommendations;
    } catch (error) {
      console.error("Error refreshing recommendations:", error);
      return [];
    }
  };

  const filterCoursesByLanguage = (courses, language) => {
    if (language === "en" || !language) {
      // For English, show ONLY courses without regional language names in title
      const allLanguageNames = [
        "hindi",
        "हिंदी",
        "telugu",
        "తెలుగు",
        "tamil",
        "தமிழ்",
        "bengali",
        "বাংলা",
      ];

      const englishCourses = courses.filter((course) => {
        const title = course.title?.toLowerCase() || "";
        // Exclude courses that have any regional language name in title
        const hasRegionalLang = allLanguageNames.some((langName) => {
          return title.includes(langName.toLowerCase());
        });
        return !hasRegionalLang;
      });

      console.log("English filter applied:", englishCourses.length, "courses");
      setRecommendations(englishCourses);
      return;
    }

    // ULTRA-STRICT FILTER: Only show courses with language name in title (pure regional courses)
    const languageNames = {
      hi: ["hindi", "हिंदी"],
      te: ["telugu", "తెలుగు"],
      ta: ["tamil", "தமிழ்"],
      bn: ["bengali", "বাংলা"],
    };

    const names = languageNames[language] || [];

    const filtered = courses.filter((course) => {
      // Only show courses that have the language name in the title
      // This ensures we get pure regional language courses only
      return names.some((name) =>
        course.title?.toLowerCase().includes(name.toLowerCase())
      );
    });

    // STRICT: Only show filtered courses, do NOT fall back to all courses
    setRecommendations(filtered);
  };

  const handleSimpleExplanations = () => {
    const newMode = !simpleMode;
    setSimpleMode(newMode);

    if (newMode) {
      // When turning ON: Show only courses in user's selected language
      if (selectedLanguage && selectedLanguage !== "en") {
        filterCoursesByLanguage(allRecommendations, selectedLanguage);
      } else {
        // If English is selected, still show all
        setRecommendations(allRecommendations);
      }
    } else {
      // When turning OFF: Show all recommendations
      setRecommendations(allRecommendations);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-purple-100 text-lg">
            Continue your learning journey
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-blue-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {progress.length}
                </p>
                <p className="text-gray-600 text-sm font-semibold">
                  Courses Enrolled
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-green-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {user?.daily_streak || 0}
                </p>
                <p className="text-gray-600 text-sm font-semibold">
                  Day Streak 🔥
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-purple-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {user?.learned_skills_count ||
                    user?.micro_skills?.length ||
                    0}
                </p>
                <p className="text-gray-600 text-sm font-semibold">
                  Skills Learned
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-orange-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  {progress.reduce(
                    (sum, p) => sum + (p.time_spent_minutes || 0),
                    0
                  )}
                  m
                </p>
                <p className="text-gray-600 text-sm font-semibold">
                  Time Spent ⏱️
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Career Readiness Score */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl shadow-2xl p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-9 h-9 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Career Readiness Score</h3>
                  <p className="text-green-100">
                    Your progress toward career goals
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-1">
                  {careerReadiness.score}%
                </div>
                <p className="text-sm text-green-100">
                  {user?.career_interest || "Software Developer"}
                </p>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden backdrop-blur">
              <div
                className="bg-white h-4 rounded-full transition-all duration-1000"
                style={{ width: `${careerReadiness.score}%` }}
              ></div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <button
                onClick={() => setShowSkillsModal(true)}
                className="bg-white/10 backdrop-blur p-3 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105 cursor-pointer text-left"
              >
                <p className="text-green-100 text-sm">✅ Completed Skills</p>
                <p className="text-2xl font-bold">
                  {careerReadiness.completedSkills}/
                  {careerReadiness.totalSkills}
                </p>
                <p className="text-xs text-green-200 mt-1">Click to view</p>
              </button>
              <button
                onClick={() => setShowProjectsModal(true)}
                className="bg-white/10 backdrop-blur p-3 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105 cursor-pointer text-left"
              >
                <p className="text-green-100 text-sm">🎯 Projects Done</p>
                <p className="text-2xl font-bold">
                  {careerReadiness.projectsDone}/
                  {careerReadiness.targetProjects}
                </p>
                <p className="text-xs text-green-200 mt-1">Click to view</p>
              </button>
              <div className="bg-white/10 backdrop-blur p-3 rounded-xl">
                <p className="text-green-100 text-sm">⏱️ Practice Hours</p>
                <p className="text-2xl font-bold">
                  {careerReadiness.practiceHours}/{careerReadiness.targetHours}
                </p>
              </div>
            </div>
            <p className="mt-4 text-green-100 text-center font-semibold">
              💡 You are {Math.min(100 - careerReadiness.score, 100)}% closer to
              becoming a {user?.career_interest || "Software Developer"}
            </p>

            {/* Readiness Test Button */}
            <div className="mt-6 text-center">
              {careerReadiness.isReadinessUnlocked ? (
                <button
                  onClick={() => navigate("/assessment")}
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
                >
                  <Award className="w-6 h-6" />
                  Take Career Readiness Test 🚀
                </button>
              ) : (
                <div className="bg-white/10 backdrop-blur p-4 rounded-xl border-2 border-white/30">
                  <p className="text-white font-semibold mb-2">
                    🔒 Career Readiness Test Locked
                  </p>
                  <p className="text-green-100 text-sm">
                    Complete more courses to reach 50% skill match (Currently:{" "}
                    {careerReadiness.avgSkillPercentage}%)
                  </p>
                  <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          (careerReadiness.avgSkillPercentage / 50) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Achievements & Badges Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Your Achievements 🏆
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Badge 1: Course Completions */}
            <div
              className={`bg-gradient-to-br p-6 rounded-2xl shadow-lg border-2 transform hover:scale-105 transition-all ${
                progress.filter((p) => p.completed).length >= 1
                  ? "from-blue-500 to-cyan-500 border-blue-300"
                  : "from-gray-300 to-gray-400 border-gray-300 opacity-60"
              }`}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <BookOpen
                    className={`w-10 h-10 ${
                      progress.filter((p) => p.completed).length >= 1
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  First Course
                </h3>
                <p className="text-white text-sm opacity-90">
                  Complete 1 course
                </p>
                <div className="mt-2 text-2xl font-bold text-white">
                  {progress.filter((p) => p.completed).length >= 1
                    ? "✅"
                    : "🔒"}
                </div>
              </div>
            </div>

            {/* Badge 2: Skill Master */}
            <div
              className={`bg-gradient-to-br p-6 rounded-2xl shadow-lg border-2 transform hover:scale-105 transition-all ${
                careerReadiness.completedSkills >= 3
                  ? "from-purple-500 to-pink-500 border-purple-300"
                  : "from-gray-300 to-gray-400 border-gray-300 opacity-60"
              }`}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Star
                    className={`w-10 h-10 ${
                      careerReadiness.completedSkills >= 3
                        ? "text-purple-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Skill Master
                </h3>
                <p className="text-white text-sm opacity-90">Master 3 skills</p>
                <div className="mt-2 text-2xl font-bold text-white">
                  {careerReadiness.completedSkills >= 3 ? "✅" : "🔒"}
                </div>
              </div>
            </div>

            {/* Badge 3: Quick Learner */}
            <div
              className={`bg-gradient-to-br p-6 rounded-2xl shadow-lg border-2 transform hover:scale-105 transition-all ${
                progress.filter((p) => p.completed).length >= 5
                  ? "from-green-500 to-emerald-500 border-green-300"
                  : "from-gray-300 to-gray-400 border-gray-300 opacity-60"
              }`}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Zap
                    className={`w-10 h-10 ${
                      progress.filter((p) => p.completed).length >= 5
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Quick Learner
                </h3>
                <p className="text-white text-sm opacity-90">
                  Complete 5 courses
                </p>
                <div className="mt-2 text-2xl font-bold text-white">
                  {progress.filter((p) => p.completed).length >= 5
                    ? "✅"
                    : "🔒"}
                </div>
              </div>
            </div>

            {/* Badge 4: Career Ready */}
            <div
              className={`bg-gradient-to-br p-6 rounded-2xl shadow-lg border-2 transform hover:scale-105 transition-all ${
                careerReadiness.isReadinessUnlocked
                  ? "from-yellow-500 to-orange-500 border-yellow-300"
                  : "from-gray-300 to-gray-400 border-gray-300 opacity-60"
              }`}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Crown
                    className={`w-10 h-10 ${
                      careerReadiness.isReadinessUnlocked
                        ? "text-yellow-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Career Ready
                </h3>
                <p className="text-white text-sm opacity-90">50% skill match</p>
                <div className="mt-2 text-2xl font-bold text-white">
                  {careerReadiness.isReadinessUnlocked ? "✅" : "🔒"}
                </div>
              </div>
            </div>

            {/* Badge 5: Dedication */}
            <div
              className={`bg-gradient-to-br p-6 rounded-2xl shadow-lg border-2 transform hover:scale-105 transition-all ${
                user?.daily_streak >= 7
                  ? "from-orange-500 to-red-500 border-orange-300"
                  : "from-gray-300 to-gray-400 border-gray-300 opacity-60"
              }`}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Flame
                    className={`w-10 h-10 ${
                      user?.daily_streak >= 7
                        ? "text-orange-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  7 Day Streak
                </h3>
                <p className="text-white text-sm opacity-90">
                  Learn 7 days straight
                </p>
                <div className="mt-2 text-2xl font-bold text-white">
                  {user?.daily_streak >= 7 ? "✅" : "🔒"}
                </div>
              </div>
            </div>

            {/* Badge 6: Practice Master */}
            <div
              className={`bg-gradient-to-br p-6 rounded-2xl shadow-lg border-2 transform hover:scale-105 transition-all ${
                careerReadiness.practiceHours >= 50
                  ? "from-indigo-500 to-purple-500 border-indigo-300"
                  : "from-gray-300 to-gray-400 border-gray-300 opacity-60"
              }`}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Clock
                    className={`w-10 h-10 ${
                      careerReadiness.practiceHours >= 50
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Practice Master
                </h3>
                <p className="text-white text-sm opacity-90">
                  50 hours practice
                </p>
                <div className="mt-2 text-2xl font-bold text-white">
                  {careerReadiness.practiceHours >= 50 ? "✅" : "🔒"}
                </div>
              </div>
            </div>

            {/* Badge 7: Project Champion */}
            <div
              className={`bg-gradient-to-br p-6 rounded-2xl shadow-lg border-2 transform hover:scale-105 transition-all ${
                careerReadiness.projectsDone >= 3
                  ? "from-pink-500 to-rose-500 border-pink-300"
                  : "from-gray-300 to-gray-400 border-gray-300 opacity-60"
              }`}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Target
                    className={`w-10 h-10 ${
                      careerReadiness.projectsDone >= 3
                        ? "text-pink-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Project Champion
                </h3>
                <p className="text-white text-sm opacity-90">
                  Complete 3 projects
                </p>
                <div className="mt-2 text-2xl font-bold text-white">
                  {careerReadiness.projectsDone >= 3 ? "✅" : "🔒"}
                </div>
              </div>
            </div>

            {/* Badge 8: Elite Developer */}
            <div
              className={`bg-gradient-to-br p-6 rounded-2xl shadow-lg border-2 transform hover:scale-105 transition-all ${
                careerReadiness.score >= 80
                  ? "from-amber-500 to-yellow-500 border-amber-300"
                  : "from-gray-300 to-gray-400 border-gray-300 opacity-60"
              }`}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Shield
                    className={`w-10 h-10 ${
                      careerReadiness.score >= 80
                        ? "text-amber-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Elite Developer
                </h3>
                <p className="text-white text-sm opacity-90">
                  80% readiness score
                </p>
                <div className="mt-2 text-2xl font-bold text-white">
                  {careerReadiness.score >= 80 ? "✅" : "🔒"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Progress Section */}
        {careerReadiness.skillsWithPercentage.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Your Skills Progress 📊
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {careerReadiness.skillsWithPercentage.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100 hover:shadow-2xl transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{skill.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        skill.percentage >= 80
                          ? "bg-green-100 text-green-700"
                          : skill.percentage >= 50
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        skill.percentage >= 80
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : skill.percentage >= 50
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                          : "bg-gradient-to-r from-red-500 to-pink-500"
                      }`}
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {skill.completed} of {skill.total} courses completed
                  </p>
                  {skill.percentage < 80 && (
                    <button
                      onClick={() => navigate("/courses")}
                      className="mt-3 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                    >
                      Continue Learning →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Mentor Guidance */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              AI Mentor Says 🤖
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 shadow-lg">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                📚 What to Learn Next
              </h3>
              {recommendations.length > 0 ? (
                <>
                  <p className="text-gray-700 mb-2">
                    Based on your progress and{" "}
                    <strong>{user?.stream || "selected"}</strong> stream, I
                    recommend learning:
                  </p>
                  <p className="text-xl font-bold text-blue-700 mb-2">
                    {recommendations[0].title}
                  </p>
                  {recommendations[0].description && (
                    <p className="text-sm text-gray-600 mb-3">
                      {recommendations[0].description.substring(0, 100)}...
                    </p>
                  )}
                </>
              ) : (
                <p className="text-gray-700 mb-3">
                  Based on your progress, start learning new skills to get
                  personalized recommendations.
                </p>
              )}
              <button
                onClick={() => navigate("/courses")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all w-full"
              >
                Start Learning →
              </button>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 shadow-lg">
              <h3 className="text-lg font-bold text-purple-900 mb-2">
                💪 Today's Focus
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✅ Complete 1 lesson (30 min)</li>
                <li>✅ Practice coding (20 min)</li>
                <li>✅ Review previous concepts (10 min)</li>
              </ul>
              <p className="mt-3 text-sm text-purple-600 font-semibold">
                Consistency builds expertise! 🌟
              </p>
            </div>
          </div>
        </div>

        {/* Language & Accessibility Options */}
        <div className="mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Languages className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Learning Preferences
                  </h3>
                  <p className="text-sm text-gray-600">
                    Customize your experience
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  className="px-4 py-2 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none font-semibold"
                >
                  <option value="en">🌐 English</option>
                  <option value="hi">🇮🇳 हिंदी (Hindi)</option>
                  <option value="te">🇮🇳 తెలుగు (Telugu)</option>
                  <option value="ta">🇮🇳 தமிழ் (Tamil)</option>
                  <option value="bn">🇮🇳 বাংলা (Bengali)</option>
                </select>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-xl font-semibold border-2 border-blue-200 hover:shadow-md transition-all flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Low-Data Mode
                </button>
                <button
                  onClick={handleSimpleExplanations}
                  className={`px-4 py-2 bg-gradient-to-r rounded-xl font-semibold border-2 hover:shadow-md transition-all ${
                    simpleMode
                      ? "from-green-500 to-emerald-500 text-white border-green-600"
                      : "from-green-100 to-emerald-100 text-green-700 border-green-200"
                  }`}
                >
                  💡{" "}
                  {simpleMode
                    ? "Native Language Mode ON"
                    : "Simple Explanations"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Recommended for You ✨
              </h2>
              {simpleMode && selectedLanguage !== "en" && (
                <p className="text-sm text-green-600 font-semibold mt-2">
                  🎯 Showing {recommendations.length} courses in your language
                </p>
              )}
            </div>
            <button
              onClick={() => navigate("/courses")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              View All →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.slice(0, 3).map((course) => {
              // Detect course source
              const getCoursePlatform = (videoUrl) => {
                if (!videoUrl) return null;
                if (
                  videoUrl.includes("youtube.com") ||
                  videoUrl.includes("youtu.be")
                )
                  return {
                    name: "YouTube",
                    color: "from-red-100 to-red-200 text-red-700",
                    icon: "▶️",
                  };
                if (videoUrl.includes("udemy.com"))
                  return {
                    name: "Udemy",
                    color: "from-purple-100 to-purple-200 text-purple-700",
                    icon: "🎓",
                  };
                if (videoUrl.includes("scaler.com"))
                  return {
                    name: "Scaler",
                    color: "from-blue-100 to-blue-200 text-blue-700",
                    icon: "⚡",
                  };
                if (videoUrl.includes("ccbp.in"))
                  return {
                    name: "NxtWave",
                    color: "from-green-100 to-green-200 text-green-700",
                    icon: "🌊",
                  };
                return null;
              };

              const platform = getCoursePlatform(course.video_url);

              return (
                <div
                  key={course.id}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-purple-100 hover:scale-105 transform"
                  onClick={() => navigate(`/learn/${course.id}`)}
                >
                  {course.thumbnail && (
                    <div className="relative mb-4">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-40 object-cover rounded-xl shadow-md"
                      />
                      {platform && (
                        <span
                          className={`absolute top-2 right-2 px-3 py-1 bg-gradient-to-r ${platform.color} rounded-full text-xs font-bold shadow-lg backdrop-blur`}
                        >
                          {platform.icon} {platform.name}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold">
                      {course.difficulty}
                    </span>
                    {course.recommendation_score && (
                      <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-bold">
                        {Math.round(course.recommendation_score * 100)}% match
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  {course.instructor && (
                    <p className="text-sm text-purple-600 font-semibold mb-2">
                      👨‍🏫 {course.instructor}
                    </p>
                  )}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="font-semibold">
                        ⏱️ {course.duration_minutes}min
                      </span>
                      <span>•</span>
                      <span className="font-semibold">
                        📚 {course.lessons?.length || 0} lessons
                      </span>
                    </div>
                    {course.rating && (
                      <span className="text-yellow-600 font-bold">
                        ⭐ {course.rating}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continue Learning */}
        {progress.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Continue Learning 📖
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {progress.map((p) => {
                const course = allRecommendations.find(
                  (c) => c.id === p.course_id
                );
                return (
                  <div
                    key={p.id}
                    className="bg-white p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition-all border-2 border-indigo-100 hover:scale-105 transform"
                    onClick={() =>
                      p.completed
                        ? navigate(`/review/${p.course_id}`)
                        : navigate(`/learn/${p.course_id}`)
                    }
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {course?.title || `Course ${p.course_id}`}
                      </h3>
                      <span
                        className={`px-4 py-2 bg-gradient-to-r rounded-full text-sm font-bold ${
                          p.completed
                            ? "from-green-100 to-emerald-100 text-green-700"
                            : "from-purple-100 to-pink-100 text-purple-700"
                        }`}
                      >
                        {p.completed
                          ? "✅ Complete"
                          : `${Math.round(p.progress_percentage)}%`}
                      </span>
                    </div>
                    {course && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {course.description}
                      </p>
                    )}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          p.completed
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : "bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"
                        }`}
                        style={{ width: `${p.progress_percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 font-semibold">
                      {p.completed ? (
                        <span className="text-green-600">
                          🏆 Review completed course
                        </span>
                      ) : (
                        <span>📍 Lesson {p.current_lesson + 1}</span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* AI Chatbot Assistant */}
      <Chatbot />

      {/* Skills Modal */}
      {showSkillsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Skills Progress
              </h2>
              <button
                onClick={() => setShowSkillsModal(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {careerReadiness.skillsWithPercentage.length > 0 ? (
                careerReadiness.skillsWithPercentage.map((skill, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 ${
                      skill.percentage === 100
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300"
                        : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {skill.percentage === 100 && (
                          <span className="text-green-600 text-2xl">✓</span>
                        )}
                        <h3 className="font-bold text-gray-900 text-lg">
                          {skill.name}
                        </h3>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          skill.percentage === 100
                            ? "bg-green-500 text-white"
                            : skill.percentage >= 50
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {skill.percentage === 100 ? "✓ " : ""}
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          skill.percentage === 100
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : skill.percentage >= 50
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                            : "bg-gradient-to-r from-red-500 to-pink-500"
                        }`}
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        {skill.completed} of {skill.total} courses completed
                      </span>
                      {skill.percentage === 100 && (
                        <span className="text-green-600 font-bold">
                          ✅ Completed!
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No skills data available yet. Start learning courses to track
                  your progress!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Projects Modal */}
      {showProjectsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Your Completed Projects
              </h2>
              <button
                onClick={() => setShowProjectsModal(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {progress.filter((p) => p.completed).length > 0 ? (
                progress
                  .filter((p) => p.completed)
                  .map((proj, index) => {
                    const course = allRecommendations.find(
                      (c) => c.id === proj.course_id
                    );
                    return (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">✅</span>
                              <h3 className="font-bold text-gray-900 text-lg">
                                {course?.title || "Course"}
                              </h3>
                            </div>
                            {course && (
                              <>
                                <p className="text-gray-600 text-sm mb-2">
                                  {course.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span className="font-semibold">
                                    ⏱️ {proj.time_spent_minutes || 0} min
                                  </span>
                                  <span>•</span>
                                  <span className="font-semibold">
                                    📚 {proj.completed_lessons?.length || 0}{" "}
                                    lessons
                                  </span>
                                  {course.skills && (
                                    <>
                                      <span>•</span>
                                      <span className="font-semibold">
                                        🎯 {course.skills.join(", ")}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                          <button
                            onClick={() => navigate(`/learn/${proj.course_id}`)}
                            className="ml-4 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                          >
                            Review →
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            Progress: {proj.progress_percentage || 0}%
                          </div>
                          <div className="text-xs text-green-600 font-bold">
                            🏆 Completed!
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg mb-2">
                    No completed projects yet
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Start learning and complete courses to see them here!
                  </p>
                  <button
                    onClick={() => {
                      setShowProjectsModal(false);
                      document
                        .getElementById("recommended-courses")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Browse Courses
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Course Completion Modal */}
      {showCompletionModal && location.state?.courseCompleted && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-4 transform animate-bounce">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🎉 Congratulations! 🎉
              </h2>
              <p className="text-xl text-gray-700 mb-4">You completed</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                {location.state?.courseName}
              </p>
              <div className="flex justify-center gap-4 text-4xl mb-4">
                <span className="animate-bounce">🌟</span>
                <span className="animate-bounce delay-100">🏆</span>
                <span className="animate-bounce delay-200">🎯</span>
              </div>
              <p className="text-gray-600">Your progress has been updated!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
