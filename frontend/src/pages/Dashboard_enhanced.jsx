import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, TrendingUp, Award, Clock, Sparkles } from "lucide-react";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);

      // Fetch recommendations
      const recsResponse = await axios.get(
        `/api/courses/recommendations/${userData.id}`
      );
      setRecommendations(recsResponse.data.recommendations);

      // Fetch progress
      const progressResponse = await axios.get(
        `/api/progress/user/${userData.id}`
      );
      setProgress(progressResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-5xl font-bold mb-3 flex items-center gap-3">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-indigo-100 text-xl">
            Continue your amazing learning journey
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-7 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <p className="text-4xl font-bold">{progress.length}</p>
                <p className="text-blue-100">Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-7 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <p className="text-4xl font-bold">
                  {user?.daily_streak || 0} 🔥
                </p>
                <p className="text-green-100">Day Streak</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-7 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <p className="text-4xl font-bold">
                  {user?.micro_skills?.length || 0}
                </p>
                <p className="text-purple-100">Skills</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-7 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <p className="text-4xl font-bold">
                  {Math.round(
                    progress.reduce(
                      (sum, p) => sum + (p.time_spent_minutes || 0),
                      0
                    ) / 60
                  )}
                  h
                </p>
                <p className="text-orange-100">Learning Time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Sparkles className="text-yellow-500" />
                Recommended for You
              </h2>
              <p className="text-gray-600 mt-2 text-lg">
                AI-powered personalized learning paths
              </p>
            </div>
            <button
              onClick={() => navigate("/courses")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View All →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {recommendations.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden group transform hover:scale-105 duration-300"
                onClick={() => navigate(`/learn/${course.id}`)}
              >
                <div className="relative overflow-hidden h-52 bg-gradient-to-br from-indigo-500 to-purple-600">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-24 h-24 text-white/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                    <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {Math.round((course.recommendation_score || 0.85) * 100)}%
                      match
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-bold">
                      {course.difficulty}
                    </span>
                    <span className="text-yellow-500 font-bold text-lg">
                      ⭐ {course.rating?.toFixed(1)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  {course.instructor && (
                    <p className="text-sm text-indigo-600 mb-3 font-semibold flex items-center gap-2">
                      👨‍🏫 {course.instructor}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                    <span className="flex items-center gap-1">
                      🕐 {Math.round(course.duration_minutes / 60)}h
                    </span>
                    <span className="flex items-center gap-1">
                      📚 {course.lessons?.length || 0} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      👥 {course.enrolled_count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Learning */}
        {progress.length > 0 && (
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              📖 Continue Learning
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {progress.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-7 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-indigo-200"
                  onClick={() => navigate(`/learn/${p.course_id}`)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Course {p.course_id}
                    </h3>
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {Math.round(p.progress_percentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 relative overflow-hidden"
                      style={{ width: `${p.progress_percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-gray-600 flex items-center gap-2">
                    📍 Lesson {p.current_lesson + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
