import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Skills from "./pages/Skills";
import Assessment from "./pages/Assessment";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Learn from "./pages/Learn";
import CourseReview from "./pages/CourseReview";

// Configure axios
axios.defaults.baseURL = "http://localhost:5000";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <Assessment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/:courseId"
          element={
            <ProtectedRoute>
              <Learn />
            </ProtectedRoute>
          }
        />

        <Route
          path="/review/:courseId"
          element={
            <ProtectedRoute>
              <CourseReview />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
