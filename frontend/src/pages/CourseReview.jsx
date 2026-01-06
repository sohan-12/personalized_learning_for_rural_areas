import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Award,
  BookOpen,
  Trophy,
  Star,
} from "lucide-react";
import axios from "axios";
import Chatbot from "../components/Chatbot";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  // Check if it's a YouTube URL
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
  }

  return null;
}

export default function CourseReview() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLanguage, setUserLanguage] = useState("en");

  useEffect(() => {
    // Get user's preferred language
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.preferred_language) {
      setUserLanguage(userData.preferred_language);
    }
  }, []);

  // Get video URL in user's preferred language
  const getVideoUrl = (courseOrLesson) => {
    if (!courseOrLesson) return null;

    // Check if multilang videos exist
    if (
      courseOrLesson.video_urls_multilang &&
      Object.keys(courseOrLesson.video_urls_multilang).length > 0
    ) {
      // Try to get video in user's language
      if (courseOrLesson.video_urls_multilang[userLanguage]) {
        return courseOrLesson.video_urls_multilang[userLanguage];
      }
      // Fallback to English
      if (courseOrLesson.video_urls_multilang["en"]) {
        return courseOrLesson.video_urls_multilang["en"];
      }
    }

    // Fallback to default video_url
    return courseOrLesson.video_url;
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      console.log("Fetching course review for ID:", courseId);
      console.log("Token:", token ? "exists" : "missing");
      console.log(
        "Request URL:",
        `http://localhost:5000/api/courses/${courseId}`
      );

      // Fetch course details
      const courseResponse = await axios.get(
        `http://localhost:5000/api/courses/${courseId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      console.log("Course data received:", courseResponse.data);

      // Fetch progress
      const progressResponse = await axios.get(
        `http://localhost:5000/api/progress/${courseId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      console.log("Progress data received:", progressResponse.data);

      if (courseResponse.data) {
        setCourse(courseResponse.data);
        setProgress(progressResponse.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course data:", error);
      console.error("Error details:", error.response?.data);
      console.error("Error message:", error.message);
      console.error("Request failed:", error.config?.url);
      alert(`Error loading course: ${error.message}`);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading course review...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white max-w-lg px-6">
          <div className="text-xl mb-4">Course not found</div>
          <div className="text-sm text-gray-400 mb-4">
            Course ID: {courseId}
          </div>
          <div className="text-sm text-gray-400 mb-6">
            Please check the browser console (F12) for error details.
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!course.lessons || course.lessons.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-xl mb-4">No lessons found for this course</div>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentLessonData = course.lessons[currentLesson];
  const videoUrl = getVideoUrl(currentLessonData);
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-2xl">
        <div className="max-w-full px-6 py-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 bg-white/10 px-4 py-2 rounded-lg backdrop-blur transition-all hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-8 h-8 text-yellow-300" />
                <h1 className="text-3xl font-bold">{course.title}</h1>
              </div>
              {course.instructor && (
                <p className="text-green-100 text-sm mb-2">
                  👨‍🏫 {course.instructor}
                </p>
              )}
              <div className="flex items-center gap-2 bg-green-500/30 px-4 py-2 rounded-lg backdrop-blur inline-flex">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-green-100 font-semibold">
                  Course Completed - Review Mode
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80 mb-1">
                Lesson {currentLesson + 1} / {course.lessons.length}
              </p>
              <p className="text-2xl font-bold text-green-300">100% Complete</p>
            </div>
          </div>

          {/* Skills Acquired Section */}
          {course.skills && course.skills.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-6 h-6 text-yellow-300" />
                <h3 className="text-white font-semibold text-lg">
                  Skills Acquired from this Course:
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-2 border-green-400/50 text-green-50 rounded-full text-sm font-semibold backdrop-blur shadow-lg flex items-center gap-2"
                  >
                    <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-350px)]">
        {/* Left Sidebar - Lesson List */}
        <div className="w-80 bg-gray-800/50 backdrop-blur border-r-2 border-green-500/30 overflow-y-auto">
          <div className="p-4 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-b border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-green-300" />
              <h3 className="text-white font-semibold">All Lessons</h3>
            </div>
            <p className="text-green-200 text-sm">
              All {course.lessons.length} lessons completed ✓
            </p>
          </div>

          <div className="p-3 space-y-2">
            {course.lessons.map((lesson, index) => {
              const isCompleted = progress?.completed_lessons?.includes(index);
              const isCurrent = currentLesson === index;

              return (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLesson(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    isCurrent
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105"
                      : "bg-gray-900/50 text-gray-300 hover:bg-gray-900 border border-green-500/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isCurrent
                          ? "bg-white/20 text-white"
                          : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-semibold mb-1 ${
                          isCurrent ? "text-white" : "text-gray-200"
                        }`}
                      >
                        {lesson.title}
                      </h4>
                      {isCompleted && (
                        <div className="flex items-center gap-1 text-green-400 text-xs">
                          <CheckCircle className="w-3 h-3" />
                          <span>Completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side - Video Player */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Current Lesson Info */}
            <div className="mb-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur p-4 rounded-xl border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-white">
                  {currentLessonData.title}
                </h2>
                <span className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 text-sm font-semibold">
                    Completed
                  </span>
                </span>
              </div>
              {currentLessonData.description && (
                <p className="text-gray-300 text-sm">
                  {currentLessonData.description}
                </p>
              )}
            </div>

            {/* Video Player */}
            {embedUrl ? (
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-2 border-green-500/30">
                <iframe
                  src={embedUrl}
                  title={currentLessonData.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex flex-col items-center justify-center border-2 border-green-500/30">
                <Award className="w-16 h-16 text-green-400 mb-4" />
                <p className="text-white text-lg font-semibold mb-2">
                  Video Review
                </p>
                <p className="text-gray-400">This lesson has been completed</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 flex gap-4 justify-between">
              <button
                onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                disabled={currentLesson === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentLesson === 0
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg"
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Previous Lesson
              </button>
              <button
                onClick={() =>
                  setCurrentLesson(
                    Math.min(course.lessons.length - 1, currentLesson + 1)
                  )
                }
                disabled={currentLesson === course.lessons.length - 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentLesson === course.lessons.length - 1
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg"
                }`}
              >
                Next Lesson
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chatbot Assistant */}
      <Chatbot />
    </div>
  );
}
