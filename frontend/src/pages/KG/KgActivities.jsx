import { FaPalette, FaSortNumericUpAlt, FaFont, FaDog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./KgActivities.css";

const activities = [
  {
    name: "Color Identification",
    icon: <FaPalette className="text-3xl xs:text-4xl text-white" />,
    bgColor: "bg-red-400",
    route: "/ColorRecognition",
  },
  {
    name: "Number Identification",
    icon: <FaSortNumericUpAlt className="text-3xl xs:text-4xl text-white" />,
    bgColor: "bg-green-400",
    route: "/NumberRecognition",
  },
  {
    name: "Alphabet Identification",
    icon: <FaFont className="text-3xl xs:text-4xl text-white" />,
    bgColor: "bg-blue-400",
    route: "/AlphabetRecognition",
  },
  {
    name: "Animal Sound Game",
    icon: <FaDog className="text-3xl xs:text-4xl text-white" />,
    bgColor: "bg-yellow-400",
    route: "/AnimalSounds",
  },
];

export default function KGActivities() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 p-3 sm:p-6 overflow-hidden">
      {/* Bubble Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="rose-sticker animate-float-up text-lg sm:text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 5}s`,
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
        className="absolute top-3 left-3 px-4 py-3 text-base
             sm:top-6 sm:left-8 sm:px-8 sm:py-6 sm:text-xl
             bg-blue-700 hover:bg-blue-500 text-white rounded-lg shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        ←
      </button>

      {/* Page Title */}
      <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center text-pink-600 mb-6 mt-16 sm:mt-20 z-10 relative">
        KG Activities
      </h1>

      {/* Activity Cards */}
      <div className="relative z-10 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto px-2">
        {activities.map((activity) => (
          <div
            key={activity.name}
            onClick={() => navigate(activity.route)}
            className={`cursor-pointer ${activity.bgColor} p-5 sm:p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-white transition-transform hover:scale-105`}
          >
            {activity.icon}
            <h2 className="mt-3 text-sm xs:text-base sm:text-xl font-semibold text-center">
              {activity.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
