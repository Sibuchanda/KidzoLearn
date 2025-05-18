import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [isTryAgain, setIsTryAgain] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSubmit = () => {
    if (isTryAgain) {
      setUserAnswer("");
      setMessage("");
      setIsTryAgain(false);
      setShowHint(false);
      return;
    }

    if (userAnswer.trim() === "") {
      toast.warn("Please enter your answer!");
      return;
    }

    if (userAnswer.trim() === currentQ.answer) {
      toast.success("Correct answer. Click Next button to move next")
      setShowNext(true);
    } else {
      toast.error("Wrong answer.Try again!");
      setIsTryAgain(true);
    }
  };

  const handleNext = () => {
    const next = (currentIndex + 1) % questions.length;
    setCurrentIndex(next);
    setUserAnswer("");
    setMessage("");
    setIsTryAgain(false);
    setShowHint(false);
    setShowNext(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-yellow-100 p-6 flex flex-col items-center justify-center overflow-y-hidden text-center">

       {/* Back Button  */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-6 left-6 text-white bg-blue-700 hover:bg-blue-500 p-3 rounded-md shadow-md z-10 cursor-pointer"
              aria-label="Go back"
            >
              <FaArrowLeft className="text-2xl" />
            </button>

      <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-6">
        🔢 Basic Math Practice
      </h1>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-md w-full">
        <p className="text-3xl md:text-4xl font-bold mb-6 flex items-center justify-center gap-2">
          {currentQ.question}{" "}
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-20 h-16 text-3xl text-center border-b-4 border-purple-500 focus:outline-none"
            disabled={showNext}
          />
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className={`${
              isTryAgain
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white px-6 py-3 rounded-xl text-lg font-semibold transition`}
          >
            {isTryAgain ? "Try Again" : "Submit"}
          </button>

           {showNext && (
            <button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
            >
              Next
            </button>
          )}

          <button
            onClick={() => setShowHint(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
          >
            Hint
          </button>
        </div>

        {message && <p className="mt-5 text-xl font-semibold">{message}</p>}

        {showHint && (
          <div className="mt-3 text-lg md:text-xl text-pink-600 font-semibold">
            💡 {currentQ.hintExplanation}
          </div>
        )}
      </div>
    </div>
  );
}
