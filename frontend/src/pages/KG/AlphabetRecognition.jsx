import { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const alphabetData = {
  A: { word: "Apple", emoji: "🍎" },
  B: { word: "Bear", emoji: "🐻" },
  C: { word: "Cat", emoji: "🐱" },
  D: { word: "Dog", emoji: "🐶" },
  E: { word: "Elephant", emoji: "🐘" },
  F: { word: "Fish", emoji: "🐟" },
  G: { word: "Giraffe", emoji: "🦒" },
  H: { word: "Hat", emoji: "🎩" },
  I: { word: "Ice Cream", emoji: "🍦" },
  J: { word: "Juice", emoji: "🧃" },
  K: { word: "Kangaroo", emoji: "🦘" },
  L: { word: "Lion", emoji: "🦁" },
  M: { word: "Monkey", emoji: "🐵" },
  N: { word: "Nest", emoji: "🪺" },
  O: { word: "Owl", emoji: "🦉" },
  P: { word: "Penguin", emoji: "🐧" },
  Q: { word: "Queen", emoji: "👑" },
  R: { word: "Rabbit", emoji: "🐰" },
  S: { word: "Sun", emoji: "🌞" },
  T: { word: "Tiger", emoji: "🐯" },
  U: { word: "Umbrella", emoji: "☔" },
  V: { word: "Violin", emoji: "🎻" },
  W: { word: "Whale", emoji: "🐋" },
  X: { word: "Xylophone", emoji: "🎼" },
  Y: { word: "Yak", emoji: "🐂" },
  Z: { word: "Zebra", emoji: "🦓" },
};

export default function AlphabetObjectGame() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const speak = async (letter, word) => {
    const utterance = new SpeechSynthesisUtterance(`${letter}, ${word}`);
    utterance.pitch = 1.2;
    utterance.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/task/play",
        {
          activityName: "AlphabetRecognition",
          taskKey: letter,
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 p-4 sm:p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white bg-blue-700 hover:bg-blue-500 px-4 py-3 sm:px-8 sm:py-6 text-base sm:text-xl rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        ←
      </button>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-pink-600 mb-8 mt-20 sm:mt-10">
        Tap a Letter to Learn!
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {Object.entries(alphabetData).map(([letter, data]) => (
          <div
            key={letter}
            onClick={() => {
              setSelected({ letter, ...data });
              speak(letter, data.word);
            }}
            className="cursor-pointer bg-blue-500 text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl rounded-2xl shadow-md hover:scale-105 transition-transform py-10 sm:py-14 text-center hover:bg-blue-800 font-extrabold"
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-20 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white w-full max-w-sm p-6 sm:p-8 rounded-xl shadow-xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl sm:text-8xl mb-2">{selected.emoji}</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-pink-700 mt-2">
              {selected.letter}
            </h2>
            <p className="text-xl sm:text-2xl mt-2">{selected.word}</p>
            <button
              onClick={() => speak(selected.letter, selected.word)}
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow transition text-sm sm:text-base"
            >
              <FaVolumeUp className="inline mr-2" />
              Hear Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
