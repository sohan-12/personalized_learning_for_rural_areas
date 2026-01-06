import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "👋 Hello! I'm your AI learning mentor. I can help you with:\n\n✨ Course recommendations\n📊 Career guidance\n🎯 Learning path suggestions\n💡 Study tips\n\nHow can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // AI Response Logic
    setTimeout(() => {
      const botResponse = generateResponse(input.toLowerCase());
      setMessages((prev) => [...prev, { type: "bot", text: botResponse }]);
    }, 1000);

    setInput("");
  };

  const generateResponse = (query) => {
    if (query.includes("course") || query.includes("learn")) {
      return "📚 Based on your learning DNA, I recommend:\n\n1. Start with foundational concepts\n2. Practice hands-on coding\n3. Build real projects\n\nWould you like personalized course recommendations based on your skills?";
    } else if (query.includes("career") || query.includes("job")) {
      return "💼 Great question! Based on your current skills:\n\n✅ You're 35% ready for Software Developer roles\n✅ Focus on: Problem-solving, Algorithms\n✅ Next milestone: Complete 5 more projects\n\nWant specific career path guidance?";
    } else if (query.includes("motivation") || query.includes("stuck")) {
      return "🌟 I understand! Here's my advice:\n\n1. Take small steps daily\n2. Celebrate small wins\n3. Join study groups\n4. Remember your goals\n\nYou're making progress - keep going! 💪";
    } else if (query.includes("next") || query.includes("what")) {
      return "🎯 Your personalized next steps:\n\n1. Complete current lesson\n2. Practice with coding challenges\n3. Review previous concepts\n4. Take the next assessment\n\nFocus on consistency, not speed!";
    } else if (query.includes("help") || query.includes("how")) {
      return '🤝 I\'m here to help! You can ask me:\n\n• "What should I learn next?"\n• "How do I improve my skills?"\n• "Career advice for [field]"\n• "I\'m stuck on [topic]"\n\nWhat would you like to know?';
    } else {
      return (
        "🤔 I understand you're asking about: \"" +
        query +
        '"\n\nI recommend:\n• Break it into smaller steps\n• Check the learning resources\n• Practice regularly\n• Ask specific questions\n\nHow else can I help you today?'
      );
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white"
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border-2 border-purple-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold">AI Learning Mentor</h3>
                <p className="text-purple-100 text-xs">
                  Always here to help 24×7
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-purple-50 to-pink-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.type === "bot" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-white text-gray-800 shadow-md border border-purple-100"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">
                      {message.text}
                    </p>
                  </div>
                  {message.type === "user" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t-2 border-purple-100 bg-white rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                💡 Ask about courses, careers, or learning tips
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
