import React, { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

const colorQuestions = [
  {
    question: "What is color Red?",
    answer: "red",
    options: ["red", "blue", "green", "yellow"],
    sound: "red.mp3",
  },
  {
    question: "What is color Blue?",
    answer: "blue",
    options: ["orange", "purple", "blue", "brown"],
    sound: "blue.mp3",
  },
  {
    question: "What is color Green?",
    answer: "green",
    options: ["green", "pink", "black", "white"],
    sound: "green.mp3",
  },
  {
    question: "What is color Yellow?",
    answer: "yellow",
    options: ["red", "yellow", "blue", "grey"],
    sound: "yellow.mp3",
  },
  {
    question: "What is color Purple?",
    answer: "purple",
    options: ["purple", "green", "orange", "black"],
    sound: "purple.mp3",
  },
];

const ColorIdentificationTest = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [audio] = useState(new Audio());

  const playSound = (file) => {
    audio.src = `/color_sounds/${file}`;
    audio.play();
  };

  const handleOptionClick = (option) => {
    setSelected(option);
    if (option === colorQuestions[current].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < colorQuestions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 p-6 flex flex-col items-center justify-center">
      {!showResult ? (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl text-center">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">
            {colorQuestions[current].question}
          </h2>

          <button
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full mb-6 flex items-center justify-center mx-auto"
            onClick={() => playSound(colorQuestions[current].sound)}
          >
            <FaVolumeUp className="mr-2" /> Play Sound
          </button>

          <div className="grid grid-cols-2 gap-4">
            {colorQuestions[current].options.map((color) => (
              <button
                key={color}
                className={`rounded-lg p-6 text-white font-bold text-xl shadow-md transition-transform duration-300 hover:scale-105 ${
                  selected
                    ? color === colorQuestions[current].answer
                      ? "bg-green-500"
                      : color === selected
                      ? "bg-red-500"
                      : "bg-gray-400"
                    : "bg-gray-500"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleOptionClick(color)}
                disabled={!!selected}
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </button>
            ))}
          </div>

          {selected && (
            <div className="mt-6 text-lg font-semibold text-pink-600">
              {selected === colorQuestions[current].answer
                ? "✅ Correct!"
                : "❌ Oops! Wrong Answer"}
            </div>
          )}

          {selected && (
            <button
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-pink-600 mb-4">🎉 Test Complete!</h2>
          <p className="text-xl font-semibold text-gray-700">
            You scored <span className="text-green-600">{score}</span> out of {colorQuestions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default ColorIdentificationTest;
