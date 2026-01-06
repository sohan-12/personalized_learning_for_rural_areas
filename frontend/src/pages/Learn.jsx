import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Play,
  Code,
  RotateCcw,
  Copy,
  Check,
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

  // Return null for non-YouTube URLs (Udemy, Scaler, etc.)
  return null;
}

function isExternalCourse(url) {
  return (
    url &&
    (url.includes("udemy.com") ||
      url.includes("scaler.com") ||
      url.includes("ccbp.in"))
  );
}

export default function Learn() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("html");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [timeSpentMinutes, setTimeSpentMinutes] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
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

  const defaultCode = {
    javascript: `// JavaScript Playground
console.log("Hello, World!");

// Try writing your code here
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Learner"));`,
    python: `# Python Playground
print("Hello, World!")

# Try writing your code here
def greet(name):
    return f"Hello, {name}!"

print(greet("Learner"))`,
    django: `# Django Views Example
from django.http import HttpResponse
from django.shortcuts import render

def home_view(request):
    return HttpResponse("Hello, Django World!")

def profile_view(request, username):
    context = {'username': username}
    return render(request, 'profile.html', context)

# URL patterns would be in urls.py
# path('', home_view, name='home')
# path('profile/<str:username>/', profile_view)`,
    java: `// Java Programming
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Create object
        Greeter greeter = new Greeter();
        greeter.greet("Java Learner");
    }
}

class Greeter {
    public void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
}`,
    cpp: `// C++ Programming
#include <iostream>
#include <string>
using namespace std;

class Greeter {
public:
    void greet(string name) {
        cout << "Hello, " << name << "!" << endl;
    }
};

int main() {
    cout << "Hello, World!" << endl;
    
    Greeter greeter;
    greeter.greet("C++ Learner");
    
    return 0;
}`,
    csharp: `// C# Programming
using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
            
            Greeter greeter = new Greeter();
            greeter.Greet("C# Learner");
        }
    }
    
    class Greeter
    {
        public void Greet(string name)
        {
            Console.WriteLine($"Hello, {name}!");
        }
    }
}`,
    react: `// React Component
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('World');
  
  return (
    <div className="App">
      <h1>Hello, {name}!</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
    </div>
  );
}

export default App;`,
    nodejs: `// Node.js Server
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/greet/:name', (req, res) => {
  const { name } = req.params;
  res.json({ message: \`Hello, \${name}!\` });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    sql: `-- SQL Database Queries
-- Create a table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (name, email) 
VALUES ('John Doe', 'john@example.com');

-- Query data
SELECT * FROM users 
WHERE created_at > '2024-01-01'
ORDER BY name ASC;

-- Update data
UPDATE users 
SET name = 'Jane Doe' 
WHERE id = 1;`,
    html: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Start coding here!</p>
</body>
</html>`,
    css: `/* CSS Styles */
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

h1 {
  text-align: center;
  font-size: 2.5em;
}`,
    js: `// JavaScript Code
console.log("Hello, World!");

document.addEventListener('DOMContentLoaded', function() {
  console.log("Page loaded!");
});`,
  };

  // Determine if course needs code playground
  const needsCodePlayground = () => {
    if (!course) return false;

    const category = course.category?.toLowerCase() || "";
    const skills = course.skills?.map((s) => s.toLowerCase()) || [];
    const title = course.title?.toLowerCase() || "";

    // Non-coding categories
    const nonCodingCategories = [
      "marketing",
      "design",
      "business",
      "management",
    ];
    if (nonCodingCategories.some((cat) => category.includes(cat))) {
      return false;
    }

    // Coding-related keywords
    const codingKeywords = [
      "programming",
      "web",
      "development",
      "python",
      "javascript",
      "html",
      "css",
      "code",
      "software",
      "data science",
      "ai",
      "machine learning",
      "mobile",
    ];
    return codingKeywords.some(
      (keyword) =>
        category.includes(keyword) ||
        skills.some((skill) => skill.includes(keyword)) ||
        title.includes(keyword)
    );
  };

  // Determine editor type needed
  const getEditorType = () => {
    if (!course) return "none";

    const category = course.category?.toLowerCase() || "";
    const skills = course.skills?.map((s) => s.toLowerCase()) || [];
    const title = course.title?.toLowerCase() || "";

    // Web development - needs HTML/CSS/JS tabs
    if (
      category.includes("web") ||
      skills.some(
        (s) => s.includes("html") || s.includes("css") || s.includes("web")
      )
    ) {
      return "web";
    }

    // Django - Python web framework
    if (skills.some((s) => s.includes("django")) || title.includes("django")) {
      return "django";
    }

    // React
    if (skills.some((s) => s.includes("react")) || title.includes("react")) {
      return "react";
    }

    // Node.js
    if (skills.some((s) => s.includes("node")) || title.includes("node")) {
      return "nodejs";
    }

    // Java
    if (
      skills.some((s) => s.includes("java") && !s.includes("javascript")) ||
      title.includes("java ") ||
      title.startsWith("java")
    ) {
      return "java";
    }

    // C++
    if (skills.some((s) => s.includes("c++")) || title.includes("c++")) {
      return "cpp";
    }

    // C#
    if (
      skills.some((s) => s.includes("c#") || s.includes("csharp")) ||
      title.includes("c#")
    ) {
      return "csharp";
    }

    // SQL
    if (
      skills.some((s) => s.includes("sql")) ||
      title.includes("sql") ||
      category.includes("database")
    ) {
      return "sql";
    }

    // Python courses
    if (
      category.includes("python") ||
      skills.some((s) => s.includes("python")) ||
      category.includes("data science") ||
      category.includes("machine learning") ||
      category.includes("ai")
    ) {
      return "python";
    }

    // Mobile development
    if (
      category.includes("mobile") ||
      skills.some(
        (s) =>
          s.includes("android") ||
          s.includes("ios") ||
          s.includes("react native") ||
          s.includes("flutter")
      )
    ) {
      return "mobile";
    }

    // Default to JavaScript for other programming courses
    if (category.includes("programming")) {
      return "javascript";
    }

    return "javascript";
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    // Set default code based on course category
    if (course) {
      const editorType = getEditorType();

      if (editorType === "web") {
        setHtmlCode(defaultCode.html);
        setCssCode(defaultCode.css);
        setJsCode(defaultCode.js);
        setActiveTab("html");
      } else if (editorType === "python") {
        setCode(defaultCode.python);
      } else if (editorType === "django") {
        setCode(defaultCode.django);
      } else if (editorType === "java") {
        setCode(defaultCode.java);
      } else if (editorType === "cpp") {
        setCode(defaultCode.cpp);
      } else if (editorType === "csharp") {
        setCode(defaultCode.csharp);
      } else if (editorType === "react") {
        setCode(defaultCode.react);
      } else if (editorType === "nodejs") {
        setCode(defaultCode.nodejs);
      } else if (editorType === "sql") {
        setCode(defaultCode.sql);
      } else if (editorType === "javascript") {
        setCode(defaultCode.javascript);
      } else if (editorType === "mobile") {
        setCode(`// React Native / Mobile Development
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Hello, Mobile World!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;`);
      }
    }
  }, [course]);

  // Timer to track time spent on the course
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpentMinutes((prev) => prev + 0.016); // Add ~1 second per interval (1/60 minute)
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchCourseData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("Fetching course:", courseId);

      const courseResponse = await axios.get(`/api/courses/${courseId}`);
      console.log("Course data:", courseResponse.data);

      if (!courseResponse.data) {
        console.error("No course data received");
        setLoading(false);
        return;
      }

      setCourse(courseResponse.data);

      try {
        const progressResponse = await axios.get(
          `/api/progress/user/${user.id}/course/${courseId}`
        );
        setProgress(progressResponse.data);
        setCurrentLesson(progressResponse.data.current_lesson || 0);
      } catch (error) {
        console.log("No progress found, starting from lesson 0");
        setCurrentLesson(0);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      alert("Failed to load course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (lessonIndex, isCompleted) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const completedLessons = progress?.completed_lessons || [];

      if (isCompleted) {
        if (!completedLessons.includes(lessonIndex)) {
          completedLessons.push(lessonIndex);
        }
      } else {
        const index = completedLessons.indexOf(lessonIndex);
        if (index > -1) {
          completedLessons.splice(index, 1);
        }
      }

      const progressPercentage =
        (completedLessons.length / course.lessons.length) * 100;

      await axios.post("/api/progress/update", {
        user_id: user.id,
        course_id: parseInt(courseId),
        completed_lessons: completedLessons,
        current_lesson: lessonIndex + 1,
        progress_percentage: progressPercentage,
        time_spent_minutes: Math.round(timeSpentMinutes),
        completed: progressPercentage === 100,
      });

      fetchCourseData();
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const toggleComplete = async () => {
    const isCurrentlyCompleted =
      progress?.completed_lessons?.includes(currentLesson);
    await updateProgress(currentLesson, !isCurrentlyCompleted);

    if (!isCurrentlyCompleted) {
      // Check if this is the last lesson
      if (currentLesson === course.lessons.length - 1) {
        // All lessons completed - call backend to mark course as complete
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          await axios.post(`/api/courses/${user.id}/complete/${courseId}`, {
            time_spent_minutes: Math.round(timeSpentMinutes),
          });
        } catch (error) {
          console.error("Error marking course complete:", error);
        }

        // Redirect to dashboard
        setTimeout(() => {
          navigate("/dashboard", {
            state: {
              courseCompleted: true,
              courseName: course.title,
              courseId: parseInt(courseId),
            },
          });
        }, 1000);
      } else {
        // Move to next lesson
        setCurrentLesson(currentLesson + 1);
      }
    }
  };

  const runCode = () => {
    const editorType = getEditorType();

    if (editorType === "web") {
      setOutput(
        "✅ Web code updated! HTML, CSS, and JavaScript are combined.\n\nIn a production environment, this would render in a live preview iframe."
      );
    } else {
      try {
        if (code.includes("console.log")) {
          const logs = [];
          const originalLog = console.log;
          console.log = (...args) => {
            logs.push(args.join(" "));
          };

          eval(code);
          console.log = originalLog;
          setOutput(logs.join("\n") || "Code executed successfully!");
        } else if (code.includes("print")) {
          setOutput(
            "Python code detected! (Simulated output)\n> Hello, World!\n> Code executed!"
          );
        } else {
          setOutput("✅ Code executed successfully!");
        }
      } catch (error) {
        setOutput(`❌ Error: ${error.message}`);
      }
    }
  };

  const resetCode = () => {
    const editorType = getEditorType();

    if (editorType === "web") {
      setHtmlCode(defaultCode.html);
      setCssCode(defaultCode.css);
      setJsCode(defaultCode.js);
    } else if (editorType === "python") {
      setCode(defaultCode.python);
    } else if (editorType === "django") {
      setCode(defaultCode.django);
    } else if (editorType === "java") {
      setCode(defaultCode.java);
    } else if (editorType === "cpp") {
      setCode(defaultCode.cpp);
    } else if (editorType === "csharp") {
      setCode(defaultCode.csharp);
    } else if (editorType === "react") {
      setCode(defaultCode.react);
    } else if (editorType === "nodejs") {
      setCode(defaultCode.nodejs);
    } else if (editorType === "sql") {
      setCode(defaultCode.sql);
    } else if (editorType === "javascript") {
      setCode(defaultCode.javascript);
    }
    setOutput("");
  };

  const copyCode = () => {
    const editorType = getEditorType();
    const textToCopy =
      editorType === "web"
        ? activeTab === "html"
          ? htmlCode
          : activeTab === "css"
          ? cssCode
          : jsCode
        : code;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCurrentCode = () => {
    const editorType = getEditorType();
    if (editorType === "web") {
      return activeTab === "html"
        ? htmlCode
        : activeTab === "css"
        ? cssCode
        : jsCode;
    }
    return code;
  };

  const setCurrentCode = (value) => {
    const editorType = getEditorType();
    if (editorType === "web") {
      if (activeTab === "html") setHtmlCode(value);
      else if (activeTab === "css") setCssCode(value);
      else setJsCode(value);
    } else {
      setCode(value);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
        <div className="text-center text-white">
          <p className="text-2xl mb-4">❌ Course not found</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!course.lessons || course.lessons.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
        <div className="text-center text-white">
          <p className="text-2xl mb-4">
            ❌ No lessons available for this course
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const lesson = course.lessons[currentLesson];

  // Get video URL - prioritize lesson video, then course video
  let videoUrl = null;
  if (lesson.video_url) {
    videoUrl = lesson.video_url;
  } else {
    // Use course video URL with language preference
    videoUrl = getVideoUrl(course);
  }

  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  const isExternal = isExternalCourse(videoUrl);
  const externalUrl = videoUrl;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl">
        <div className="max-w-full px-6 py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-3 bg-white/10 px-4 py-2 rounded-lg backdrop-blur transition-all hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
              {course.instructor && (
                <p className="text-indigo-100 text-sm">
                  👨‍🏫 {course.instructor}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80">
                Lesson {currentLesson + 1} / {course.lessons.length}
              </p>
              <p className="text-lg font-bold">
                {Math.round(progress?.progress_percentage || 0)}% Complete
              </p>
              <p className="text-sm text-indigo-200 mt-2">
                ⏱️ Time Spent: {Math.floor(timeSpentMinutes)}m{" "}
                {Math.round((timeSpentMinutes % 1) * 60)}s
              </p>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-3 backdrop-blur">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                progress?.completed
                  ? "bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400"
                  : "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
              }`}
              style={{
                width: `${progress?.progress_percentage || 0}%`,
              }}
            ></div>
          </div>

          {/* Skills Acquired Section - Show when course is completed */}
          {progress?.completed && course.skills && course.skills.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-300 text-lg">🎓</span>
                <h3 className="text-white font-semibold">
                  Skills Acquired from this Course:
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-100 rounded-full text-sm font-medium backdrop-blur"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Split View */}
      <div
        className={`flex h-[calc(100vh-200px)] ${
          !needsCodePlayground() ? "justify-center" : ""
        }`}
      >
        {/* LEFT SIDE - Video Player */}
        <div
          className={`${
            needsCodePlayground() ? "w-1/2" : "w-3/4 max-w-5xl"
          } p-4 bg-black`}
        >
          <div className="h-full flex flex-col">
            <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden shadow-2xl border-2 border-indigo-500/30">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={lesson.title}
                ></iframe>
              ) : isExternal ? (
                <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
                  <div className="text-center text-white space-y-6">
                    <div className="text-7xl mb-4">🎓</div>
                    <h3 className="text-3xl font-bold mb-2">
                      Premium Course Content
                    </h3>
                    <p className="text-xl text-indigo-200 mb-6 max-w-md">
                      This course is hosted on an external platform. Click below
                      to access the full course content.
                    </p>
                    <div className="space-y-4">
                      <a
                        href={externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all transform hover:scale-105"
                      >
                        🚀 Open Course on Platform →
                      </a>
                      {course.thumbnail && (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="mx-auto rounded-xl shadow-2xl border-4 border-white/20 max-w-md"
                        />
                      )}
                      <p className="text-sm text-indigo-300 mt-4">
                        📚 Platform:{" "}
                        {externalUrl.includes("udemy")
                          ? "Udemy"
                          : externalUrl.includes("scaler")
                          ? "Scaler"
                          : "Nextwave"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-900 to-purple-900">
                  <div className="text-center text-white">
                    <Play className="w-24 h-24 mx-auto mb-4 opacity-50" />
                    <p className="text-xl">Video Coming Soon</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 bg-gray-800 p-4 rounded-xl border-2 border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-lg">
                    {lesson.title}
                  </h3>
                  {progress?.completed_lessons?.includes(currentLesson) && (
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <CheckCircle className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                </div>
                <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm font-semibold">
                  {lesson.duration} min
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                {lesson.type === "video" && "🎥 Video Lesson"}
                {lesson.type === "interactive" && "💻 Interactive Coding"}
                {lesson.type === "reading" && "📖 Reading Material"}
              </p>

              <button
                onClick={toggleComplete}
                className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                  progress?.completed_lessons?.includes(currentLesson)
                    ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                {progress?.completed_lessons?.includes(currentLesson)
                  ? "Mark as Incomplete"
                  : currentLesson < course.lessons.length - 1
                  ? "Complete & Next Lesson"
                  : "Complete Course 🎉"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Code Playground (Conditional) */}
        {needsCodePlayground() && (
          <div className="w-1/2 p-4">
            <div className="h-full flex flex-col bg-gray-900 rounded-xl shadow-2xl border-2 border-purple-500/30 overflow-hidden">
              {/* Code Editor Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-white" />
                  <span className="text-white font-bold">
                    Code Playground -{" "}
                    {getEditorType() === "web"
                      ? "Web Development"
                      : getEditorType() === "python"
                      ? "Python"
                      : getEditorType() === "django"
                      ? "Django"
                      : getEditorType() === "java"
                      ? "Java"
                      : getEditorType() === "cpp"
                      ? "C++"
                      : getEditorType() === "csharp"
                      ? "C#"
                      : getEditorType() === "react"
                      ? "React"
                      : getEditorType() === "nodejs"
                      ? "Node.js"
                      : getEditorType() === "sql"
                      ? "SQL"
                      : getEditorType() === "mobile"
                      ? "Mobile Dev"
                      : "JavaScript"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={copyCode}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all flex items-center gap-2"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={resetCode}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  <button
                    onClick={runCode}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-bold transition-all flex items-center gap-2 shadow-lg"
                  >
                    <Play className="w-4 h-4" />
                    Run Code
                  </button>
                </div>
              </div>

              {/* Tab Bar for Web Development */}
              {getEditorType() === "web" && (
                <div className="flex bg-gray-800 border-b border-gray-700">
                  <button
                    onClick={() => setActiveTab("html")}
                    className={`px-6 py-3 font-semibold transition-all ${
                      activeTab === "html"
                        ? "bg-gray-900 text-orange-400 border-b-2 border-orange-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-750"
                    }`}
                  >
                    HTML
                  </button>
                  <button
                    onClick={() => setActiveTab("css")}
                    className={`px-6 py-3 font-semibold transition-all ${
                      activeTab === "css"
                        ? "bg-gray-900 text-blue-400 border-b-2 border-blue-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-750"
                    }`}
                  >
                    CSS
                  </button>
                  <button
                    onClick={() => setActiveTab("js")}
                    className={`px-6 py-3 font-semibold transition-all ${
                      activeTab === "js"
                        ? "bg-gray-900 text-yellow-400 border-b-2 border-yellow-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-750"
                    }`}
                  >
                    JavaScript
                  </button>
                </div>
              )}

              {/* Code Editor */}
              <div className="flex-1 overflow-hidden">
                <textarea
                  value={getCurrentCode()}
                  onChange={(e) => setCurrentCode(e.target.value)}
                  className="w-full h-full p-4 bg-gray-800 text-green-400 font-mono text-sm focus:outline-none resize-none"
                  style={{
                    fontFamily: "Consolas, Monaco, 'Courier New', monospace",
                  }}
                  spellCheck="false"
                  placeholder={
                    getEditorType() === "web"
                      ? activeTab === "html"
                        ? "<!-- Write your HTML code here -->"
                        : activeTab === "css"
                        ? "/* Write your CSS styles here */"
                        : "// Write your JavaScript code here"
                      : getEditorType() === "python"
                      ? "# Write your Python code here"
                      : getEditorType() === "django"
                      ? "# Write your Django code here"
                      : getEditorType() === "java"
                      ? "// Write your Java code here"
                      : getEditorType() === "cpp"
                      ? "// Write your C++ code here"
                      : getEditorType() === "csharp"
                      ? "// Write your C# code here"
                      : getEditorType() === "react"
                      ? "// Write your React component here"
                      : getEditorType() === "nodejs"
                      ? "// Write your Node.js code here"
                      : getEditorType() === "sql"
                      ? "-- Write your SQL queries here"
                      : "// Write your code here"
                  }
                />
              </div>

              {/* Output Console */}
              <div className="bg-gray-950 p-4 border-t-2 border-purple-500/30 max-h-48 overflow-y-auto">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm font-semibold">
                    Output Console
                  </span>
                </div>
                <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                  {output || "// Run your code to see output here..."}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Lesson Sidebar */}
      <div className="px-6 py-4 bg-gray-900 border-t-2 border-indigo-500/30">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg">Course Lessons</h3>
          {progress?.completed && (
            <span className="text-green-400 text-sm flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              All lessons completed
            </span>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {course.lessons.map((l, index) => {
            const isCompleted = progress?.completed_lessons?.includes(index);
            const isCurrent = currentLesson === index;

            return (
              <button
                key={l.id}
                onClick={() => setCurrentLesson(index)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl transition-all ${
                  isCurrent
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                    : isCompleted
                    ? "bg-gradient-to-r from-green-800/40 to-emerald-800/40 border-2 border-green-500/50 text-green-100 hover:from-green-800/60 hover:to-emerald-800/60"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isCompleted && (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  )}
                  <span className="font-bold">{index + 1}</span>
                  <span className="text-sm whitespace-nowrap">{l.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Chatbot Assistant */}
      <Chatbot />
    </div>
  );
}
