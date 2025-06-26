import React, { useState } from "react";
import { FaVolumeUp, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

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
  const navigate = useNavigate();

  const playSound = async (soundFile, animaleName) => {
    audio.src = `/animalSound/${soundFile}`;
    audio.play();

    // ========== Point claim section ========-=====
    try {
      const { data } = await axios.post(
        "http://localhost:8000/task/play",
        {
          activityName: "AnimalRecognition",
          taskKey: animaleName,
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 p-6">
      {/* Back to KG Activities */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white bg-blue-700 hover:bg-blue-500 p-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-2xl" />
      </button>

      <h1 className="text-4xl text-center font-bold text-pink-600 mb-10">
        Tap an Animal to Hear Its Sound!
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {animals.map((animal) => (
          <div
            key={animal.name}
            onClick={() => playSound(animal.sound, animal.name)}
            className="cursor-pointer text-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={`/animalImage/${animal.image}`}
              alt={animal.name}
              className="w-full h-70 object-contain mb-3 drop-shadow-lg bg-white rounded-xl p-2"
            />
            <div className="text-lg font-semibold text-pink-600">
              {animal.name}
            </div>
            <FaVolumeUp className="text-pink-500 text-xl mt-1 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalSoundFlashcards;
