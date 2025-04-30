import { FaPalette, FaSortNumericUpAlt, FaFont, FaDog, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './KgActivities.css'; // Ensure this is correctly imported

const activities = [
  {
    name: "Color Identification",
    icon: <FaPalette className="text-4xl text-white" />,
    bgColor: "bg-red-400",
    route: "/ColorRecognition",
  },
  {
    name: "Number Identification",
    icon: <FaSortNumericUpAlt className="text-4xl text-white" />,
    bgColor: "bg-green-400",
    route: "/NumberRecognition",
  },
  {
    name: "Alphabet Identification",
    icon: <FaFont className="text-4xl text-white" />,
    bgColor: "bg-blue-400",
    route: "/AlphabetRecognition",
  },
  {
    name: "Animal Sound Game",
    icon: <FaDog className="text-4xl text-white" />,
    bgColor: "bg-yellow-400",
    route: "/AnimalSounds",
  },
];

// Generate a random candy color
function getRandomCandyColor() {
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FFB5E8', '#FCA652', '#A07AFB'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function KGActivities() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 p-6 sm:p-10 overflow-hidden">
      
      {/* Candy stick animation background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
  {[...Array(30)].map((_, i) => (
    <div
      key={i}
      className="rose-sticker animate-float-up text-xl sm:text-2xl md:text-2xl lg:text-3xl"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${8 + Math.random() * 5}s`,
        top: '100%', // start from bottom
        position: 'absolute',
      }}
    >
      🍭
    </div>
  ))}
</div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white bg-pink-500 hover:bg-pink-600 p-2 rounded-full shadow-md z-10"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-2xl" />
      </button>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-10 relative z-10">
        🧸 KG Activities
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
