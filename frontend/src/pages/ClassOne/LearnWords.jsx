import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

// Color palette for the alphabet circles
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

  const handleCharClick = (char) => {
    setSelectedLetter(char);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedLetter(null);
  };

  const handleGoBack = () => {
    console.log("Go back clicked");
    alert("Back button clicked!");
  };

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 text-center">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white bg-blue-700 hover:bg-blue-500 p-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-2xl" />
      </button>

      <div className="pt-16 md:pt-8">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-8">
          Tap a Letter to Learn Words!
        </h1>
      </div>

      {/* Alphabet Circle Grid */}
      <div className="grid grid-cols-3 max-w-6xl mx-auto mt-16 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 md:gap-8">
        {letters.map((char, index) => (
          <div key={char} className="flex justify-center">
            <button
              onClick={() => handleCharClick(char)}
              className={`${colorPalette[index]} w-20 h-20 md:w-38 md:h-30 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 border-4 border-white`}
            >
              <span className="text-4xl md:text-5xl font-bold text-white">
                {char}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Letter Word Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center backdrop-blur-sm bg-black/30 justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md overflow-hidden relative">
            <div
              className={`${
                colorPalette[letters.indexOf(selectedLetter)]
              } py-4 px-6 text-center`}
            >
              <h2 className="text-3xl font-bold text-white mb-1">
                Letter "{selectedLetter}"
              </h2>
              <p className="text-white text-lg">
                Words that start with this letter
              </p>
            </div>

            <div className="max-h-64 overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-3">
                {(wordData[selectedLetter] || ["No words found."]).map(
                  (word, idx) => (
                    <div
                      key={idx}
                      className="py-3 px-6 text-xl text-center bg-blue-50 hover:bg-blue-100 transition rounded-xl shadow-sm"
                    >
                      {word}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 text-center">
              <button
                onClick={handleClosePopup}
                className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-500 transition-all duration-300 shadow-md hover:shadow-lg text-lg font-medium cursor-pointer"
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
