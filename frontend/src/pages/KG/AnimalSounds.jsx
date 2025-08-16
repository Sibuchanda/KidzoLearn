import React, { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
const VITE_BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const animals = [
  { name: "Cat", image: "cat.png", sound: "cat.wav" },
  { name: "Dog", image: "dog.png", sound: "dog.wav" },
  { name: "Lion", image: "lion.png", sound: "lion.wav" },
  { name: "Elephant", image: "elephant.png", sound: "elephant.wav" },
  { name: "Cow", image: "cow.png", sound: "cow.wav" },
  { name: "Frog", image: "frog.png", sound: "frog.wav" },
  { name: "Duck", image: "duck.png", sound: "duck.wav" },
  { name: "Monkey", image: "monkey.png", sound: "monkey.wav" },
  { name: "Horse", image: "horse.png", sound: "horse.wav" },
  { name: "Sheep", image: "sheep.png", sound: "sheep.wav" },
];

const AnimalSoundFlashcards = () => {
  const [audio] = useState(new Audio());

  const playSound = async (soundFile, animalName) => {
    audio.src = `/animalSound/${soundFile}`;
    audio.play();

    try {
      const { data } = await axios.post(
        `${VITE_BACKEND_URI}/task/play`,
        {
          activityName: "AnimalRecognition",
          taskKey: animalName,
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
        className="absolute top-2 left-2 sm:top-6 sm:left-6 bg-blue-700 hover:bg-blue-500 text-white px-4 py-3 sm:px-6 sm:py-6 text-base sm:text-xl rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        ←
      </button>

      {/* Heading */}
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-pink-600 mt-16 sm:mt-0 mb-10 px-2 drop-shadow">
        Tap an Animal to Hear Its Sound!
      </h1>

      {/* Animal Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-2 sm:px-4">
        {animals.map((animal) => (
          <div
            key={animal.name}
            onClick={() => playSound(animal.sound, animal.name)}
            className="cursor-pointer text-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={`/animalImage/${animal.image}`}
              alt={animal.name}
              className="w-full h-32 sm:h-40 md:h-56 object-contain mb-3 drop-shadow-lg bg-white rounded-xl p-2"
            />
            <div className="text-base sm:text-lg font-semibold text-pink-600">
              {animal.name}
            </div>
            <FaVolumeUp className="text-pink-500 text-lg sm:text-xl mt-1 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalSoundFlashcards;
