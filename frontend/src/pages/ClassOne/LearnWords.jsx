import React, { useState } from 'react';

const wordData = {
  A: ["Apple", "Ant", "Axe", "Airplane", "Arrow", "Alligator", "Alarm", "Artist", "Apron", "Avocado"],
  B: ["Ball", "Bat", "Balloon", "Bee", "Book", "Box", "Bread", "Bottle", "Bus", "Bag"],
  C: ["Cat", "Car", "Cup", "Candle", "Camera", "Candy", "Cake", "Clock", "Chair", "Cow"],
  D: ["Dog", "Duck", "Drum", "Doll", "Desk", "Donut", "Door", "Dice", "Dress", "Deer"],
  E: ["Elephant", "Egg", "Eagle", "Ear", "Engine", "Envelope", "Earth", "Eye", "Elbow", "Eraser"],
  F: ["Fish", "Fan", "Frog", "Fork", "Flag", "Feather", "Fire", "Fruit", "Foot", "Fox"],
  G: ["Goat", "Giraffe", "Guitar", "Glove", "Glass", "Gate", "Gift", "Grass", "Grapes", "Glue"],
  H: ["Hat", "Horse", "Hammer", "House", "Hand", "Heart", "Helicopter", "Honey", "Hill", "Hut"],
  I: ["Ice", "Igloo", "Insect", "Iron", "Ink", "Island", "Icecream", "Idea", "Instrument", "Invitation"],
  J: ["Jam", "Jug", "Jar", "Jet", "Jacket", "Jewel", "Juice", "Jeep", "Jungle", "Jelly"],
  K: ["Kite", "Kangaroo", "Key", "Kiwi", "Kitchen", "King", "Kid", "Knee", "Kettle", "Keyboard"],
  L: ["Lion", "Lamp", "Leaf", "Lemon", "Ladder", "Lock", "Lake", "Lollipop", "Log", "Lunchbox"],
  M: ["Monkey", "Moon", "Milk", "Mouse", "Mango", "Mirror", "Mat", "Magnet", "Map", "Motor"],
  N: ["Nose", "Nest", "Needle", "Nail", "Net", "Notebook", "Napkin", "Necklace", "Nut", "Number"],
  O: ["Owl", "Orange", "Onion", "Oven", "Octopus", "Oil", "Ostrich", "Oar", "Ox", "Ornament"],
  P: ["Pen", "Pencil", "Pan", "Pig", "Peacock", "Pumpkin", "Parrot", "Plane", "Pineapple", "Pillow"],
  Q: ["Queen", "Quilt", "Quill", "Quail", "Quartz", "Queue", "Question", "Quick", "Quiet", "Quarter"],
  R: ["Rat", "Rabbit", "Ring", "Rose", "Robot", "Rope", "Rocket", "Road", "Radio", "Rain"],
  S: ["Sun", "Star", "Snake", "Ship", "Spoon", "Shirt", "Scissors", "School", "Sock", "Seal"],
  T: ["Tiger", "Tree", "Train", "Tap", "Table", "Tomato", "Torch", "Truck", "Tooth", "Tent"],
  U: ["Umbrella", "Unicorn", "Urn", "Uniform", "Umpire", "Utensils", "UFO", "Underwear", "Upside", "Utensil"],
  V: ["Van", "Vase", "Violin", "Vegetable", "Vest", "Volcano", "Vulture", "Voice", "Vaccine", "Vehicle"],
  W: ["Watch", "Whistle", "Water", "Wheel", "Window", "Whale", "Wood", "Wolf", "Worm", "Wagon"],
  X: ["Xylophone", "X-ray", "Xerox", "Xenops", "Xmas tree", "Xenon", "X-axis", "Xylem", "Xeranthemum", "Xylitol"],
  Y: ["Yak", "Yam", "Yarn", "Yogurt", "Yard", "Yolk", "Yacht", "Yo-yo", "Year", "Yellow"],
  Z: ["Zebra", "Zip", "Zoo", "Zero", "Zipper", "Zigzag", "Zone", "Zucchini", "Zombie", "Zeal"]
};

const LearnWords = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedLetter(null);
  };

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-yellow-100 to-pink-100 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">🔤 Tap a Letter to Learn Words!</h1>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-4 max-w-5xl mx-auto">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className="bg-blue-500 text-white text-2xl font-bold w-14 h-14 rounded-full shadow hover:bg-blue-600 transition"
          >
            {letter}
          </button>
        ))}
      </div>

{showPopup && (
  <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30">
<div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md max-h-[70vh] overflow-y-auto p-6">
  <h2 className="text-2xl font-bold text-green-700 mb-4">
    Words that start with "{selectedLetter}"
  </h2>
  <div className="flex flex-col divide-y divide-gray-200">
    {(wordData[selectedLetter] || ["No words found."]).map((word, idx) => (
      <div
        key={idx}
        className="py-3 px-4 text-lg text-center bg-white hover:bg-yellow-100 transition rounded-md cursor-pointer"
      >
        {word}
      </div>
    ))}
  </div>
  <button
    onClick={handleClosePopup}
    className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
  >
    Close
  </button>
</div>
  </div>
)}
    </div>
  );
};

export default LearnWords;
