// LearnWords.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const wordData = {
  A: [
    "Apple",
    "Ant",
    "Axe",
    "Airplane",
    "Arrow",
    "Alligator",
    "Alarm",
    "Artist",
    "Apron",
    "Avocado",
  ],
  B: [
    "Ball",
    "Bat",
    "Balloon",
    "Bee",
    "Book",
    "Box",
    "Bread",
    "Bottle",
    "Bus",
    "Bag",
  ],
  C: [
    "Cat",
    "Car",
    "Cup",
    "Candle",
    "Camera",
    "Candy",
    "Cake",
    "Clock",
    "Chair",
    "Cow",
  ],
  D: [
    "Dog",
    "Duck",
    "Drum",
    "Doll",
    "Desk",
    "Donut",
    "Door",
    "Dice",
    "Dress",
    "Deer",
  ],
  E: [
    "Elephant",
    "Egg",
    "Eagle",
    "Ear",
    "Engine",
    "Envelope",
    "Earth",
    "Eye",
    "Elbow",
    "Eraser",
  ],
  F: [
    "Fish",
    "Fan",
    "Frog",
    "Fork",
    "Flag",
    "Feather",
    "Fire",
    "Fruit",
    "Foot",
    "Fox",
  ],
  G: [
    "Goat",
    "Giraffe",
    "Guitar",
    "Glove",
    "Glass",
    "Gate",
    "Gift",
    "Grass",
    "Grapes",
    "Glue",
  ],
  H: [
    "Hat",
    "Horse",
    "Hammer",
    "House",
    "Hand",
    "Heart",
    "Helicopter",
    "Honey",
    "Hill",
    "Hut",
  ],
  I: [
    "Ice",
    "Igloo",
    "Insect",
    "Iron",
    "Ink",
    "Island",
    "Icecream",
    "Idea",
    "Instrument",
    "Invitation",
  ],
  J: [
    "Jam",
    "Jug",
    "Jar",
    "Jet",
    "Jacket",
    "Jewel",
    "Juice",
    "Jeep",
    "Jungle",
    "Jelly",
  ],
  K: [
    "Kite",
    "Kangaroo",
    "Key",
    "Kiwi",
    "Kitchen",
    "King",
    "Kid",
    "Knee",
    "Kettle",
    "Keyboard",
  ],
  L: [
    "Lion",
    "Lamp",
    "Leaf",
    "Lemon",
    "Ladder",
    "Lock",
    "Lake",
    "Lollipop",
    "Log",
    "Lunchbox",
  ],
  M: [
    "Monkey",
    "Moon",
    "Milk",
    "Mouse",
    "Mango",
    "Mirror",
    "Mat",
    "Magnet",
    "Map",
    "Motor",
  ],
  N: [
    "Nose",
    "Nest",
    "Needle",
    "Nail",
    "Net",
    "Notebook",
    "Napkin",
    "Necklace",
    "Nut",
    "Number",
  ],
  O: [
    "Owl",
    "Orange",
    "Onion",
    "Oven",
    "Octopus",
    "Oil",
    "Ostrich",
    "Oar",
    "Ox",
    "Ornament",
  ],
  P: [
    "Pen",
    "Pencil",
    "Pan",
    "Pig",
    "Peacock",
    "Pumpkin",
    "Parrot",
    "Plane",
    "Pineapple",
    "Pillow",
  ],
  Q: [
    "Queen",
    "Quilt",
    "Quill",
    "Quail",
    "Quartz",
    "Queue",
    "Question",
    "Quick",
    "Quiet",
    "Quarter",
  ],
  R: [
    "Rat",
    "Rabbit",
    "Ring",
    "Rose",
    "Robot",
    "Rope",
    "Rocket",
    "Road",
    "Radio",
    "Rain",
  ],
  S: [
    "Sun",
    "Star",
    "Snake",
    "Ship",
    "Spoon",
    "Shirt",
    "Scissors",
    "School",
    "Sock",
    "Seal",
  ],
  T: [
    "Tiger",
    "Tree",
    "Train",
    "Tap",
    "Table",
    "Tomato",
    "Torch",
    "Truck",
    "Tooth",
    "Tent",
  ],
  U: [
    "Umbrella",
    "Unicorn",
    "Urn",
    "Uniform",
    "Umpire",
    "Utensils",
    "UFO",
    "Underwear",
    "Upside",
    "Utensil",
  ],
  V: [
    "Van",
    "Vase",
    "Violin",
    "Vegetable",
    "Vest",
    "Volcano",
    "Vulture",
    "Voice",
    "Vaccine",
    "Vehicle",
  ],
  W: [
    "Watch",
    "Whistle",
    "Water",
    "Wheel",
    "Window",
    "Whale",
    "Wood",
    "Wolf",
    "Worm",
    "Wagon",
  ],
  X: [
    "Xylophone",
    "X-ray",
    "Xerox",
    "Xenops",
    "Xmas tree",
    "Xenon",
    "X-axis",
    "Xylem",
    "Xeranthemum",
    "Xylitol",
  ],
  Y: [
    "Yak",
    "Yam",
    "Yarn",
    "Yogurt",
    "Yard",
    "Yolk",
    "Yacht",
    "Yo-yo",
    "Year",
    "Yellow",
  ],
  Z: [
    "Zebra",
    "Zip",
    "Zoo",
    "Zero",
    "Zipper",
    "Zigzag",
    "Zone",
    "Zucchini",
    "Zombie",
    "Zeal",
  ],
};

const colorPalette = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-indigo-400",
  "bg-orange-400",
  "bg-teal-400",
  "bg-cyan-400",
  "bg-lime-400",
  "bg-emerald-400",
  "bg-violet-400",
  "bg-fuchsia-400",
  "bg-rose-400",
  "bg-amber-400",
  "bg-sky-400",
  "bg-indigo-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-red-400",
  "bg-blue-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-orange-400",
  "bg-teal-400",
];

const LearnWords = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleCharClick = async (char) => {
    setSelectedLetter(char);
    setShowPopup(true);
    try {
      const { data } = await axios.post(
        "https://kidzoschool.onrender.com/task/play",
        {
          activityName: "WordsRecognition",
          taskKey: char,
        },
        { withCredentials: true }
      );
      if (data.message === "+1 point earned!") toast.success(data.message);
    } catch (err) {
      console.error("Error updating points:", err);
    }
  };

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-yellow-100 px-4 pt-24 pb-6 sm:px-6 sm:pt-20 sm:pb-10 flex flex-col items-center justify-center relative">
      {/* --Back button -- */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 bg-blue-700 hover:bg-blue-500 text-white text-base sm:text-xl px-4 py-3 sm:px-8 sm:py-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        ←
      </button>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-8 mt-6">
        Tap a Letter to Learn Words!
      </h1>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 md:gap-6 max-w-6xl mx-auto">
        {letters.map((char, index) => (
          <div key={char} className="flex justify-center">
            <button
              onClick={() => handleCharClick(char)}
              className={`${colorPalette[index]} w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white text-3xl sm:text-4xl md:text-5xl font-bold transition-transform duration-300 hover:scale-110 cursor-pointer`}
            >
              {char}
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md">
            <div
              className={`${
                colorPalette[letters.indexOf(selectedLetter)]
              } py-4 px-6 text-center`}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Letter "{selectedLetter}"
              </h2>
              <p className="text-white text-sm sm:text-base">
                Words that start with this letter
              </p>
            </div>
            <div className="max-h-64 overflow-y-auto p-4 sm:p-6">
              <div className="grid gap-2">
                {(wordData[selectedLetter] || ["No words found."]).map(
                  (word, idx) => (
                    <div
                      key={idx}
                      className="py-2 px-4 text-lg bg-blue-50 hover:bg-blue-100 rounded-xl shadow-sm"
                    >
                      {word}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="bg-gray-50 p-3 text-center">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-md shadow-md text-sm sm:text-lg font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnWords;
