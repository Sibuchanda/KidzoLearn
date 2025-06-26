import { useState } from "react";
import { FaVolumeUp, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

    // ------ Point claim section -----
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 p-6 relative">
      {/* Back to KG Activities */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white bg-blue-700 hover:bg-blue-500 p-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-2xl" />
      </button>

      <h1 className="text-4xl text-center font-bold text-pink-600 mb-10">
        Tap a Letter to Learn!
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {Object.entries(alphabetData).map(([letter, data]) => (
          <div
            key={letter}
            onClick={() => {
              setSelected({ letter, ...data });
              speak(letter, data.word);
            }}
            className="cursor-pointer bg-blue-500 text-white font-extrabold text-8xl rounded-2xl shadow-lg hover:scale-105 transition transform py-20 text-center hover:bg-blue-800"
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-20"
          onClick={() => setSelected(null)}
        >
          <div className="bg-white p-25 rounded-xl shadow-xl text-center max-w-sm">
            <div className="text-9xl">{selected.emoji}</div>
            <h2 className="text-6xl font-bold mt-4 text-pink-700">
              {selected.letter}
            </h2>
            <p className="text-2xl mt-2">{selected.word}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                speak(selected.letter, selected.word);
              }}
              className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-full shadow hover:bg-pink-600 transition"
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
