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

  const generateBlankIndexes = (word) => {
    const indexes = [];
    while (indexes.length < 2) {
      const rand = Math.floor(Math.random() * word.length);
      if (!indexes.includes(rand)) indexes.push(rand);
    }
    return indexes;
  };

  const [blankIndexes, setBlankIndexes] = useState(generateBlankIndexes(correctWord));
  const [inputLetters, setInputLetters] = useState(getMaskedWord(correctWord, blankIndexes));
  const [showHint, setShowHint] = useState(false);
  const [message, setMessage] = useState("");
  const [isTryAgain, setIsTryAgain] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleInputChange = (val, index) => {
    const updated = [...inputLetters];
    updated[index] = val.toUpperCase().slice(0, 1);
    setInputLetters(updated);
  };

  const handleSubmit = () => {
    if (isTryAgain) {
      const resetInputs = inputLetters.map((char, i) =>
        blankIndexes.includes(i) ? "" : correctWord[i]
      );
      setInputLetters(resetInputs);
      setMessage("");
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
    const nextBlanks = generateBlankIndexes(nextWord);
    setCurrentIndex(next);
    setBlankIndexes(nextBlanks);
    setInputLetters(getMaskedWord(nextWord, nextBlanks));
    setShowHint(false);
    setMessage("");
    setIsTryAgain(false);
    setIsCorrect(false);


    const currentWord = wordsData[currentIndex].word;
    try {
      const { data } = await axios.post(
        "http://localhost:8000/task/play",
        {
          activityName: "WordCompletion",
          taskKey: currentWord,
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

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-200 to-blue-100 p-8 flex flex-col items-center justify-center text-center font-sans">

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 text-white bg-blue-700 hover:bg-blue-500 p-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        <span className="text-2xl">←</span>
      </button>
      <h1 className="text-4xl font-extrabold text-blue-800 mb-16 drop-shadow-md">Spell the Word</h1>

      <div className="text-9xl mb-8 drop-shadow-lg">{wordsData[currentIndex].emoji}</div>

      <div className="flex justify-center gap-3 mb-6">
        {inputLetters.map((char, index) => (
          <input
            key={index}
            type="text"
            value={char}
            onChange={(e) => handleInputChange(e.target.value, index)}
            className={`w-24 h-24 text-4xl text-center border-4 rounded-xl shadow-md focus:outline-none ${
              blankIndexes.includes(index) ? "bg-white" : "bg-gray-300"
            }`}
            disabled={!blankIndexes.includes(index)}
          />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button
          onClick={handleSubmit}
          className={`${
            isTryAgain ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
          } text-white px-8 py-4 rounded-xl text-lg font-bold shadow-md transition`}
        >
          {isTryAgain ? "Try Again" : "Submit"}
        </button>

        {isCorrect && (
          <button
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-md transition"
          >
            NEXT
          </button>
        )}

        <button
          onClick={() => setShowHint(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-xl text-lg font-bold shadow-md transition"
        >
          Hint
        </button>
      </div>

      {message && <p className="mt-3 text-xl font-semibold text-purple-700">{message}</p>}
      {showHint && (
        <p className="mt-2 text-lg text-pink-600 font-semibold"> Hint: {correctWord}</p>
      )}
    </div>
  );
};

export default SpellTheWord;
