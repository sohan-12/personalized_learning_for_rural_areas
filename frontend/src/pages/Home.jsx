import { motion } from "framer-motion";
import { BookOpen, Sparkles, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-8 shadow-2xl"
          >
            <BookOpen className="w-14 h-14 text-white" />
          </motion.div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Welcome to LearnHub
          </h1>
          <p className="text-2xl text-gray-700 mb-4 max-w-3xl mx-auto font-semibold">
            AI-Powered Personalized Learning Platform
          </p>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Empowering Rural Education with Smart Technology ✨
          </p>
          <motion.button
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all"
          >
            Get Started 🚀
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:shadow-2xl transition-all"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Sparkles className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AI Recommendations
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Smart course recommendations based on your learning DNA and
              micro-skills
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-100 hover:shadow-2xl transition-all"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <TrendingUp className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Track Progress
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Monitor your learning journey with detailed analytics and
              achievements
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white p-8 rounded-2xl shadow-lg border-2 border-pink-100 hover:shadow-2xl transition-all"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Users className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Learn Your Way
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Personalized content delivery matching your learning style
              preferences
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-600 mb-6 text-lg font-semibold">
            Built with Modern Technologies
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-6 py-3 rounded-full font-bold text-sm shadow-md border border-purple-200">
              React PWA
            </span>
            <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full font-bold text-sm shadow-md border border-blue-200">
              Python Flask
            </span>
            <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-6 py-3 rounded-full font-bold text-sm shadow-md border border-green-200">
              SQLite
            </span>
            <span className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-6 py-3 rounded-full font-bold text-sm shadow-md border border-pink-200">
              AI Recommendations
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
