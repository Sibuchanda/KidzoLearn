import { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

const colors = [
  { name: 'Red', hex: '#EF4444' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Green', hex: '#10B981' },
  { name: 'Yellow', hex: '#FACC15' },
  { name: 'Purple', hex: '#A855F7' },
  { name: 'Orange', hex: '#FB923C' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Violet', hex: '#7F00FF' },
  { name: 'Black', hex: '#000000' },
];

export default function ColorRecognition() {
  const [backgroundColor, setBackgroundColor] = useState('#FEFCE8');

 const speakColor = async (colorName, hex) => {
  setBackgroundColor(hex);

  const utterance = new SpeechSynthesisUtterance(colorName);
  utterance.pitch = 1.3;
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);

  const email = localStorage.getItem("email");
  if (email) {
    try {
      const { data } = await axios.post("http://localhost:8000/task/play", {
        email,
        activityName: "ColorRecognition",
        taskKey: colorName,
      });
      if(data.message==="+1 point earned!"){
        toast.success(data.message || "+1 point earned!");
      }
    } catch (err) {
      console.error("Error updating points:", err);
    }
  }
};


  return (
    <div
      className="min-h-screen transition-colors duration-300 p-6 sm:p-10 flex flex-col items-center justify-center"
      style={{ backgroundColor: backgroundColor }}
    >
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 text-white bg-blue-700 hover:bg-blue-500 p-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        <span className="text-2xl">←</span>
      </button>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-white drop-shadow-lg mb-10">
        Tap the Colors to Hear Them!
      </h1>

      {/* Color Grid - Responsive Layout */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 place-items-center">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => speakColor(color.name, color.hex)}
              className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-full flex items-center justify-center text-white text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl ring-2 sm:ring-4 ring-white/80 backdrop-blur-sm cursor-pointer transform hover:-translate-y-1"
              style={{ backgroundColor: color.hex }}
              aria-label={`Hear color ${color.name}`}
            >
              <span className="text-center leading-tight">{color.name}</span>
              <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 text-white text-xs sm:text-sm md:text-base bg-black/40 p-1 sm:p-2 rounded-full backdrop-blur-sm">
                🔊
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}