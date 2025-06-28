// SpellTheWord.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const wordsData = [
  { word: "APPLE", emoji: "🍎" },
  { word: "BALL", emoji: "🏀" },
  { word: "CAT", emoji: "🐱" },
  { word: "FISH", emoji: "🐟" },
  { word: "DUCK", emoji: "🦆" },
  { word: "CAKE", emoji: "🎂" },
  { word: "TREE", emoji: "🌳" },
];

const getMaskedWord = (word, blankIndexes) =>
  word.split("").map((ch, i) => (blankIndexes.includes(i) ? "" : ch));

const SpellTheWord = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const correctWord = wordsData[currentIndex].word;
  const [blankIndexes, setBlankIndexes] = useState(() => {
    const idx = [];
    while (idx.length < 2) {
      const r = Math.floor(Math.random() * correctWord.length);
      if (!idx.includes(r)) idx.push(r);
    }
    return idx;
  });

  const [inputLetters, setInputLetters] = useState(
    getMaskedWord(correctWord, blankIndexes)
  );
  const [showHint, setShowHint] = useState(false);
  const [isTryAgain, setIsTryAgain] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleInputChange = (val, index) => {
    const updated = [...inputLetters];
    updated[index] = val.toUpperCase().slice(0, 1);
    setInputLetters(updated);
  };

  const handleSubmit = () => {
    if (isTryAgain) {
      setInputLetters(getMaskedWord(correctWord, blankIndexes));
      setIsTryAgain(false);
      return;
    }
    if (inputLetters.includes("")) {
      toast.warn("Please fill all the characters.");
      return;
    }
    if (inputLetters.join("") === correctWord) {
      setIsCorrect(true);
    } else {
      toast.error("Wrong answer. Try again!");
      setIsTryAgain(true);
    }
  };

  const handleNext = async () => {
    const next = (currentIndex + 1) % wordsData.length;
    const nextWord = wordsData[next].word;
    const newBlanks = [];
    while (newBlanks.length < 2) {
      const r = Math.floor(Math.random() * nextWord.length);
      if (!newBlanks.includes(r)) newBlanks.push(r);
    }
    setCurrentIndex(next);
    setBlankIndexes(newBlanks);
    setInputLetters(getMaskedWord(nextWord, newBlanks));
    setShowHint(false);
    setIsTryAgain(false);
    setIsCorrect(false);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/task/play",
        {
          activityName: "WordCompletion",
          taskKey: correctWord,
        },
        { withCredentials: true }
      );
      if (data.message === "+1 point earned!") toast.success(data.message);
    } catch (err) {
      console.error("Error updating points:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-yellow-100 px-4 pt-24 pb-6 sm:px-6 sm:pt-20 sm:pb-10 flex flex-col items-center justify-center relative">
      {/* -- Back Button -- */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 bg-blue-700 hover:bg-blue-500 text-white text-base sm:text-xl px-4 py-3 sm:px-8 sm:py-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        ←
      </button>
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-10">
        Spell the Word
      </h1>

      <div className="text-6xl sm:text-8xl md:text-9xl mb-8">
        {wordsData[currentIndex].emoji}
      </div>

      <div className="flex justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
        {inputLetters.map((char, i) => (
          <input
            key={i}
            type="text"
            value={char}
            onChange={(e) => handleInputChange(e.target.value, i)}
            className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-2xl sm:text-3xl text-center border-4 rounded-xl shadow-md focus:outline-none ${
              blankIndexes.includes(i) ? "bg-white" : "bg-gray-300"
            }`}
            disabled={!blankIndexes.includes(i)}
          />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <button
          onClick={handleSubmit}
          className={`${
            isTryAgain
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-600 hover:bg-green-700"
          } text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold shadow-md cursor-pointer`}
        >
          {isTryAgain ? "Try Again" : "Submit"}
        </button>

        {isCorrect && (
          <button
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold shadow-md cursor-pointer"
          >
            NEXT
          </button>
        )}

        <button
          onClick={() => setShowHint(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-xl text-base sm:text-lg font-bold shadow-md cursor-pointer"
        >
          Hint
        </button>
      </div>

      {showHint && (
        <p className="mt-2 text-lg text-pink-600 font-semibold">
          Hint: {correctWord}
        </p>
      )}
    </div>
  );
};

export default SpellTheWord;
