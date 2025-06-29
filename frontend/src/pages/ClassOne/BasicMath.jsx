import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const questions = [
  { question: "2 + 3 =", answer: "5", hintExplanation: "2 + 3 = 5" },
  { question: "4 + ? = 9", answer: "5", hintExplanation: "9 - 4 = 5" },
  { question: "6 - 2 =", answer: "4", hintExplanation: "6 - 2 = 4" },
  { question: "? - 3 = 2", answer: "5", hintExplanation: "5 - 3 = 2" },
  { question: "3 x 2 =", answer: "6", hintExplanation: "3 × 2 = 6" },
  { question: "? x 2 = 8", answer: "4", hintExplanation: "4 × 2 = 8" },
  { question: "9 - ? = 4", answer: "5", hintExplanation: "9 - 5 = 4" },
  { question: "5 + 4 =", answer: "9", hintExplanation: "5 + 4 = 9" },
  { question: "6 ÷ 2 =", answer: "3", hintExplanation: "6 ÷ 2 = 3" },
  { question: "? ÷ 3 = 2", answer: "6", hintExplanation: "6 ÷ 3 = 2" },
];

export default function BasicMath() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [isTryAgain, setIsTryAgain] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const currentQ = questions[currentIndex];

  const extractNumbers = (question) => {
    const numbers = question.match(/\d+/g);
    return numbers ? numbers.map((num) => parseInt(num)) : [];
  };

  const renderApples = (count) => {
    if (count > 10) {
      const groups = Math.floor(count / 10);
      const remainder = count % 10;
      return (
        <div className="flex flex-wrap justify-center gap-2">
          {Array(groups)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="border-2 border-dashed border-green-300 rounded-lg p-2"
              >
                <div className="text-xs text-green-600 mb-1">Group of 10</div>
                <div className="text-2xl leading-none">{"🍎".repeat(10)}</div>
              </div>
            ))}
          {remainder > 0 && (
            <div className="border-2 border-dashed border-orange-300 rounded-lg p-2">
              <div className="text-xs text-orange-600 mb-1">Remainder</div>
              <div className="text-2xl leading-none">
                {"🍎".repeat(remainder)}
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="text-2xl md:text-3xl leading-relaxed text-center">
          {"🍎".repeat(count)}
        </div>
      );
    }
  };

  const handleSubmit = () => {
    if (isTryAgain) {
      setUserAnswer("");
      setMessage("");
      setIsTryAgain(false);
      setShowHint(false);
      return;
    }

    if (userAnswer.trim() === "") {
      setMessage("Enter your answer to Submit!");
      return;
    }

    if (userAnswer.trim() === currentQ.answer) {
      setMessage("Correct. Click the Next button to go next question");
      setShowNext(true);
    } else {
      setMessage("Try again! answer is");
      setIsTryAgain(true);
    }
  };

  const handleNext = async () => {
    const next = (currentIndex + 1) % questions.length;
    setCurrentIndex(next);
    setUserAnswer("");
    setMessage("");
    setIsTryAgain(false);
    setShowHint(false);
    setShowNext(false);

    const currentMath = questions[currentIndex].question;
    try {
      const { data } = await axios.post(
        "https://kidzoschool.onrender.com/task/play",
        {
          activityName: "MathPractice",
          taskKey: currentMath,
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

  const numbers = extractNumbers(currentQ.question);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-yellow-100 px-4 pt-24 pb-6 sm:px-6 sm:pt-20 sm:pb-10 flex flex-col items-center justify-center relative">

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 bg-blue-700 hover:bg-blue-500 text-white text-base sm:text-xl px-4 py-3 sm:px-8 sm:py-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        ←
      </button>

      <div className="w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-700 mb-8 text-center">
          Math Practice with Apples
        </h1>

        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10">
          {/* Question Section */}
          <div className="text-center mb-8">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 flex items-center justify-center gap-3 flex-wrap">
              <span>
                {currentQ.question.replace(/\d+/g, (match) => `${match}`)}
              </span>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-16 sm:w-20 h-12 sm:h-16 text-2xl sm:text-3xl text-center border-b-4 border-purple-500 focus:outline-none bg-purple-50 rounded-t-lg"
                disabled={showNext}
                placeholder="?"
              />
            </p>
          </div>

          {/* Apple Visuals */}
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {numbers.map((number, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-4 border-2 border-green-200"
                >
                  <div className="text-center mb-2">
                    <span className="text-xl font-bold text-green-700">
                      Number: {number}
                    </span>
                  </div>
                  <div className="flex justify-center">{renderApples(number)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={handleSubmit}
              className={`${
                isTryAgain
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg cursor-pointer`}
            >
              {isTryAgain ? "Try Again" : "Submit"}
            </button>

            {showNext && (
              <button
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg cursor-pointer"
              >
                Next
              </button>
            )}

            <button
              onClick={() => setShowHint(!showHint)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg cursor-pointer"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
          </div>

          {/* Feedback Message */}
          {message && (
            <div
              className={`text-center p-4 rounded-xl mb-4 ${
                message.includes("Correct")
                  ? "bg-green-100 text-green-800 border-2 border-green-300"
                  : message.includes("Try again")
                  ? "bg-red-100 text-red-800 border-2 border-red-300"
                  : "bg-blue-100 text-blue-800 border-2 border-blue-300"
              }`}
            >
              <p className="text-lg sm:text-xl font-semibold">{message}</p>
            </div>
          )}

          {/* Hint Box */}
          {showHint && (
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-xl border-2 border-pink-300">
              <div className="text-center text-base sm:text-lg md:text-xl text-pink-700 font-semibold">
                Hint: {currentQ.hintExplanation}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
