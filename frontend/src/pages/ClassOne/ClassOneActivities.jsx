import {
  FaFont,
  FaKeyboard,
  FaCalculator,
  FaMapMarkedAlt,
  FaArrowLeft,
  FaArrowsAlt
} from "react-icons/fa";  // Only import icons that you are actually using

import { useNavigate } from "react-router-dom";

const activities = [
  {
    name: "Match the Word Game",
    icon: <FaKeyboard className="text-4xl text-white" />,
    bgColor: "bg-purple-400",
    route: "/SpellTheWord",
  },
  {
    name: "Basic Math Fun",
    icon: <FaCalculator className="text-4xl text-white" />,
    bgColor: "bg-green-400",
    route: "/BasicMath",
  },
      {
    name: "A–Z Words",
    icon: <FaFont className="text-4xl text-white" />,
    bgColor: "bg-blue-400",
    route: "/LearnWords",
  },
{
    name: "Play with Prepositions",
    icon: <FaArrowsAlt className="text-4xl text-white" />, // Changed icon to FaArrowsAlt
    bgColor: "bg-yellow-400",
    route: "/PrepositionPlay",
  },
{
  name: "States of India",
  icon: <FaMapMarkedAlt className="text-4xl text-white" />, // 📍 Better map-related icon
  bgColor: "bg-sky-400",
  route: "/StatesOfIndia",
}
];

export default function ClassOneActivities() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-yellow-100 p-6 sm:p-10 overflow-hidden">
      {/* Background animation (optional) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="animate-float-up text-2xl"
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

       {/* Back Button  */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white bg-blue-700 hover:bg-blue-500 p-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-2xl" />
      </button>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10 relative z-10">
        Class 1 Learning Zone
      </h1>

      {/* Activity Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {activities.map((activity) => (
          <div
            key={activity.name}
            onClick={() => navigate(activity.route)}
            className={`cursor-pointer ${activity.bgColor} p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-white transition-transform hover:scale-105`}
          >
            {activity.icon}
            <h2 className="mt-4 text-xl font-semibold text-center">
              {activity.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
