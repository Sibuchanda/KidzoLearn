import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaMagic, FaSmile, FaBookOpen } from "react-icons/fa";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-pink-600 mb-4">
          Welcome to <span className="text-blue-500">KiddoLearn!</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          A fun-filled learning playground for KG to Class 4 kids! Learn through
          colorful animations, interactive games, and joyful quizzes.
        </p>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <FeatureCard
            icon={<FaMagic className="text-yellow-500" />}
            text="Learn through animation"
          />
          <FeatureCard
            icon={<FaSmile className="text-pink-500" />}
            text="Fun games for each topic"
          />
          <FeatureCard
            icon={<FaBookOpen className="text-blue-500" />}
            text="Track your progress"
          />
        </div>

        <Link to="/dashboard">
          <button className="text-lg px-6 py-3 rounded-2xl bg-pink-500 hover:bg-pink-600 transition-all shadow-xl">
            Get Started
          </button>
        </Link>
      </motion.div>
    </main>
  );
}

// ----- Features card --------
function FeatureCard({ icon, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-md w-64"
    >
      <div className="text-3xl">{icon}</div>
      <p className="text-md font-medium text-gray-800">{text}</p>
    </motion.div>
  );
}
