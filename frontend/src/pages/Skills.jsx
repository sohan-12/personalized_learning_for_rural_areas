import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  CheckCircle,
  Sparkles,
  Brain,
} from "lucide-react";
import axios from "axios";

const SKILLS = [
  {
    id: "web-dev",
    name: "Web Development",
    icon: Globe,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "programming",
    name: "Programming",
    icon: Code,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "data-science",
    name: "Data Science",
    icon: Database,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "ai-deep-learning",
    name: "AI & Deep Learning",
    icon: Brain,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "mobile-dev",
    name: "Mobile Development",
    icon: Smartphone,
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "design",
    name: "UI/UX Design",
    icon: Palette,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    icon: TrendingUp,
    color: "bg-red-100 text-red-600",
  },
];

export default function Skills() {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleSkill = (skillId) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((s) => s !== skillId)
        : [...prev, skillId]
    );
  };

  const handleContinue = async () => {
    if (selectedSkills.length === 0) {
      alert("Please select at least one skill");
      return;
    }

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.put(`/api/auth/user/${user.id}`, {
        selected_skills: selectedSkills,
      });

      const updatedUser = { ...user, selected_skills: selectedSkills };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      navigate("/assessment");
    } catch (error) {
      console.error("Error saving skills:", error);
      alert("Failed to save skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold">Step 1 of 2</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            What would you like to learn?
          </h1>
          <p className="text-xl text-gray-600">
            Select your interests to get personalized recommendations 🎯
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {SKILLS.map((skill, index) => (
            <motion.button
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleSkill(skill.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 rounded-2xl border-2 transition-all shadow-lg ${
                selectedSkills.includes(skill.id)
                  ? "border-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 shadow-xl"
                  : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-xl"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-md ${skill.color}`}
                >
                  <skill.icon className="w-7 h-7" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  {skill.name}
                </span>
                {selectedSkills.includes(skill.id) && (
                  <div className="ml-auto">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100 mb-6">
            <p className="text-lg font-bold text-gray-700 mb-2">
              Selected: {selectedSkills.length} skill
              {selectedSkills.length !== 1 ? "s" : ""} 🎓
            </p>
            <p className="text-sm text-gray-500">
              Choose at least one skill to continue
            </p>
          </div>
          <button
            onClick={handleContinue}
            disabled={loading || selectedSkills.length === 0}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Continue to Assessment →"}
          </button>
        </div>
      </div>
    </div>
  );
}
