import { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const numbers = Array.from({ length: 10 }, (_, i) => i);

export default function NumberBounce() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentNumber = numbers[currentIndex];

  const speakNumber = async (number) => {
    const utterance = new SpeechSynthesisUtterance(number.toString());
    utterance.pitch = 1.2;
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);

    try {
      const { data } = await axios.post(
        "https://kidzoschool.onrender.com/task/play",
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-2 left-2 sm:top-6 sm:left-6 bg-blue-700 hover:bg-blue-500 text-white px-4 py-3 sm:px-7 sm:py-6 text-base sm:text-xl rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        ←
      </button>

      {/* Heading */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-700 mt-14 sm:mt-0 mb-10 text-center px-2 drop-shadow">
        Tap the Number to Hear It!
      </h1>

      {/* Number Navigation */}
      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 mb-10 w-full justify-center px-4">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`bg-green-600 hover:bg-green-400 text-white text-xl sm:text-3xl font-bold px-6 py-2 rounded-md shadow-lg transition cursor-pointer ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          ⬅ Back
        </button>

        {/* Number Display */}
        <div
          onClick={() => speakNumber(currentNumber)}
          className="cursor-pointer text-[6rem] sm:text-[8rem] md:text-[10rem] font-extrabold text-center text-white drop-shadow-lg hover:scale-105 transition-transform duration-300 rounded-xl px-10 sm:px-20 bg-blue-500 shadow-xl flex items-center justify-center"
        >
          {currentNumber}
          <span className="ml-3 text-2xl sm:text-3xl align-middle">
            <FaVolumeUp />
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex === numbers.length - 1}
          className={`bg-green-600 hover:bg-green-400 text-white text-xl sm:text-3xl font-bold px-6 py-2 rounded-md shadow-lg transition cursor-pointer${
            currentIndex === numbers.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next ➡
        </button>
      </div>

      {/* Apple Emojis */}
      <div className="text-4xl sm:text-6xl text-red-600 flex flex-wrap justify-center gap-2 max-w-[90vw] px-2">
        {Array.from({ length: currentNumber }, (_, i) => (
          <span key={i}>🍎</span>
        ))}
      </div>
    </div>
  );
}
