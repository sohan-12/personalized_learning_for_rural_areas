import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Star } from "lucide-react";
import axios from "axios";
import Chatbot from "../components/Chatbot";

function getCategoryEmoji(category) {
  const emojis = {
    "Web Development": "🌐",
    Programming: "💻",
    "Data Science": "📊",
    "Mobile Development": "📱",
    Marketing: "📈",
    Design: "🎨",
    "AI and Deep Learning": "🤖",
  };
  return emojis[category] || "📚";
}

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchTerm, selectedCategory, selectedLanguage, courses]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/courses/");
      setCourses(response.data);
      setFilteredCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    if (selectedLanguage !== "all") {
      if (selectedLanguage === "en") {
        // For English, show all courses
        // No filtering needed
      } else {
        // ULTRA-STRICT: Only show courses with language name in title
        const languageNames = {
          hi: ["hindi", "हिंदी"],
          te: ["telugu", "తెలుగు"],
          ta: ["tamil", "தமிழ்"],
          bn: ["bengali", "বাংলা"],
        };

        const names = languageNames[selectedLanguage] || [];
        filtered = filtered.filter((course) => {
          // Only show courses that have the language name in the title
          return names.some((name) =>
            course.title?.toLowerCase().includes(name.toLowerCase())
          );
        });
      }
    }

    setFilteredCourses(filtered);
  };

  const categories = ["all", ...new Set(courses.map((c) => c.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold mb-3">🎓 Explore All Courses</h1>
          <p className="text-indigo-100 text-xl">
            Discover {courses.length} amazing learning opportunities
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl mb-8 border border-white">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for courses, skills, or topics..."
                className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-xl text-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-4 border-2 border-gray-200 rounded-xl font-semibold focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-6 py-4 border-2 border-purple-200 rounded-xl font-semibold focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all bg-white"
              >
                <option value="all">🌐 All Languages</option>
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="bn">বাংলা (Bengali)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all transform hover:scale-105 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow"
              }`}
            >
              {category === "all"
                ? "🌟 All"
                : `${getCategoryEmoji(category)} ${category}`}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-3 gap-7">
          {filteredCourses.map((course) => {
            // Detect course platform
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
                      <span className="text-6xl">
                        {getCategoryEmoji(course.category)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    {platform && (
                      <span
                        className={`px-3 py-1 bg-gradient-to-r ${platform.color} rounded-full text-xs font-bold shadow-lg backdrop-blur`}
                      >
                        {platform.icon} {platform.name}
                      </span>
                    )}
                    <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full shadow-lg flex items-center gap-1 font-bold ml-auto">
                      <Star className="w-4 h-4 fill-current" />
                      {course.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-bold">
                      {course.difficulty}
                    </span>
                    <span className="text-sm text-gray-500 font-semibold">
                      👥 {course.enrolled_count?.toLocaleString()} enrolled
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  {course.instructor && (
                    <p className="text-sm text-indigo-600 mb-3 font-semibold">
                      👨‍🏫 {course.instructor}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                    {course.skills.length > 3 && (
                      <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                        +{course.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                    <span>🕐 {Math.round(course.duration_minutes / 60)}h</span>
                    <span>📚 {course.lessons.length} lessons</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-xl font-semibold">
              No courses found
            </p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* AI Chatbot Assistant */}
      <Chatbot />
    </div>
  );
}
