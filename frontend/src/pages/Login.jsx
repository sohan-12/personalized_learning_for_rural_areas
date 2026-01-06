import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post("/api/auth/google", {
        token: credentialResponse.credential,
      });

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/skills");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      setError("Login failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    console.log("Login failed");
    setError("Google login failed. Please try again.");
  };

  const handleGuestLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/guest", {});

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/skills");
      }
    } catch (error) {
      console.error("Guest login failed:", error);
      setError("Guest login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full border-2 border-purple-100"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              Welcome to LearnHub
            </h1>
            <p className="text-gray-600 text-lg">
              Your personalized learning journey starts here ✨
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signin_with"
                size="large"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-semibold">
                  OR
                </span>
              </div>
            </div>

            <button
              onClick={handleGuestLogin}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Continue as Guest"}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-purple-100">
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-2xl">✨</span>
                <p className="font-semibold">AI-powered recommendations</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-2xl">📱</span>
                <p className="font-semibold">Works offline (PWA)</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-2xl">🎯</span>
                <p className="font-semibold">Personalized learning paths</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
}
