import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaMagic,
  FaSmile,
  FaBookOpen,
  FaVolumeUp,
  FaChalkboardTeacher,
  FaCubes,
} from "react-icons/fa";

const features = [
  {
    icon: <FaCubes className="text-5xl text-pink-500 mb-4" />,
    title: "Diverse Learning Activities",
    description:
      "From alphabet and color recognition to simple math and science, kids enjoy interactive content for every subject.",
  },
  {
    icon: <FaVolumeUp className="text-5xl text-yellow-500 mb-4" />,
    title: "Audio Support for Non-Readers",
    description:
      "Every learning activity and test question has an audio option, so even early learners can follow along easily.",
  },
  {
    icon: <FaChalkboardTeacher className="text-5xl text-green-500 mb-4" />,
    title: "Interactive Visual Cards",
    description:
      "Beautiful illustrations and tappable elements make learning more engaging and help children retain better.",
  },
  {
    icon: <FaSmile className="text-5xl text-blue-500 mb-4" />,
    title: "Short Learning Tests",
    description:
      "After exploring each activity, children can take simple tests to check what they’ve learned and feel accomplished.",
  },
  {
    icon: <FaBookOpen className="text-5xl text-purple-500 mb-4" />,
    title: "Class-Based Learning Dashboard",
    description:
      "Parents or kids can select a class (KG to Class 4) to explore age-appropriate content with an intuitive interface.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-16 max-w-3xl"
      >
        <h1 className="text-5xl font-bold text-pink-600 mb-4">
          Welcome to <span className="text-blue-500">KiddoLearn!</span>
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          A joyful, interactive learning platform for KG to Class 4 students —
          filled with games, activities, sounds, and animations!
        </p>

        <Link to="/dashboard">
          <button className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600 transition">
            Get Started
          </button>
        </Link>
      </motion.div>

      {/* Features Section */}
      <section className="w-full max-w-5xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
          >
            {feature.icon}
            <h3 className="text-xl font-bold text-pink-600 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
