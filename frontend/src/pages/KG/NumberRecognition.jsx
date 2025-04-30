import { useState } from "react";
import { FaArrowLeft, FaVolumeUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./KgActivities.css";

const numbers = [0,1,2,3,4,5,6,7,8,9];

export default function NumberBounce() {
  const navigate = useNavigate();
  const [speaking, setSpeaking] = useState(false);

  const speakNumber = (number) => {
    const utterance = new SpeechSynthesisUtterance(number.toString());
    utterance.pitch = 1.2;
    utterance.rate = 0.9;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6 relative overflow-hidden">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full shadow-md transition"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-xl" />
      </button>

      <h1 className="text-4xl sm:text-5xl font-bold text-center text-blue-700 mb-10">
        🔢 Tap a Number to Hear It!
      </h1>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-6 gap-y-12 max-w-5xl mx-auto mt-20">
        {numbers.map((num, index) => (
          <div
            key={index}
            onClick={() => speakNumber(num)}
            className="cursor-pointer text-[7rem] sm:text-[8rem] font-extrabold text-center bounce-number transition-transform duration-300"
            style={{
              animationDelay: `${index * 0.1}s`,
              color: getRandomPastelColor(),
            }}
            aria-label={`Hear number ${num}`}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper to get a random pastel color
function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 70%)`;
}
