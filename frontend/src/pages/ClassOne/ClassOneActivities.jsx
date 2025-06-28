import {
  FaFont,
  FaKeyboard,
  FaCalculator,
  FaMapMarkedAlt,
  FaArrowsAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const activities = [
  {
    name: "Match the Word Game",
    icon: <FaKeyboard className="text-3xl sm:text-4xl text-white" />,
    bgColor: "bg-purple-400",
    route: "/SpellTheWord",
  },
  {
    name: "Basic Math Fun",
    icon: <FaCalculator className="text-3xl sm:text-4xl text-white" />,
    bgColor: "bg-green-400",
    route: "/BasicMath",
  },
  {
    name: "A–Z Words",
    icon: <FaFont className="text-3xl sm:text-4xl text-white" />,
    bgColor: "bg-blue-400",
    route: "/LearnWords",
  },
  {
    name: "Play with Prepositions",
    icon: <FaArrowsAlt className="text-3xl sm:text-4xl text-white" />,
    bgColor: "bg-yellow-400",
    route: "/PrepositionPlay",
  },
  {
    name: "States of India",
    icon: <FaMapMarkedAlt className="text-3xl sm:text-4xl text-white" />,
    bgColor: "bg-sky-400",
    route: "/StatesOfIndia",
  },
];

export default function ClassOneActivities() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-yellow-100 p-4 sm:p-6 lg:p-10 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="animate-float-up text-lg sm:text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              top: "100%",
              position: "absolute",
            }}
          >
            🫧
          </div>
        ))}
      </div>

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 bg-blue-700 hover:bg-blue-500 text-white text-base sm:text-xl px-4 py-3 sm:px-8 sm:py-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        ←
      </button>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-700 mb-8 mt-20 sm:mt-14 relative z-10">
        Class 1 Learning Zone
      </h1>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {activities.map((activity) => (
          <div
            key={activity.name}
            onClick={() => navigate(activity.route)}
            className={`${activity.bgColor} cursor-pointer p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-white transition-transform hover:scale-105`}
          >
            {activity.icon}
            <h2 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-center">
              {activity.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
