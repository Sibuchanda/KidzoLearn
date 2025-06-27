import { useState } from "react";
import { FaArrowLeft, FaVolumeUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const numbers = Array.from({ length: 10 }, (_, i) => i);

export default function NumberBounce() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentNumber = numbers[currentIndex];

  const speakNumber = async (number) => {
    const utterance = new SpeechSynthesisUtterance(number.toString());
    utterance.pitch = 1.2;
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);

     // ========== Point claim section ========-=====
    try {
      const { data } = await axios.post(
        "http://localhost:8000/task/play",
        {
          activityName: "NumberRecognition",
          taskKey: number.toString(),
        },
        { withCredentials: true }
      );
      if (data.message === "+1 point earned!") {
        toast.success(data.message);
      }
    } catch (err) {
      console.error("Error updating points:", err);
    }
  };

  
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < numbers.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 text-white bg-blue-700 hover:bg-blue-500 p-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        <span className="text-2xl">←</span>
      </button>

      <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-20 drop-shadow">
        Tap the Number to Hear It!
      </h1>

      {/* Number Navigation */}
      <div className="flex items-center gap-18 mb-8">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`bg-green-600 hover:bg-green-400 text-white text-4xl font-bold px-5 py-2 rounded-md shadow-lg transition cursor-pointer${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          ⬅ Back
        </button>

        <div
          onClick={() => speakNumber(currentNumber)}
          className="cursor-pointer text-[8rem] sm:text-[12rem] font-extrabold text-center text-white drop-shadow-lg hover:scale-105 transition-transform duration-300 rounded-xl px-40 bg-blue-500 shadow-xl"
        >
          {currentNumber}
          <span className="ml-4 text-2xl align-middle">
            <FaVolumeUp />
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === numbers.length - 1}
          className={`bg-green-600 hover:bg-green-400 text-white text-4xl font-bold px-6 py-2 rounded-md shadow-lg transition cursor-pointer ${
            currentIndex === numbers.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next ➡
        </button>
      </div>

      {/* Apple emojis */}
      <div className="text-6xl mt-4 text-red-600 flex flex-wrap justify-center gap-2 max-w-[80vw]">
        {Array.from({ length: currentNumber }, (_, i) => (
          <span key={i}>🍎</span>
        ))}
      </div>
    </div>
  );
}
