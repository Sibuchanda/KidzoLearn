import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

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

const LearnWords = () => {

  const navigate = useNavigate();
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleCharClick = (char) => {
    setSelectedLetter(char);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedLetter(null);
  };

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-yellow-100 to-pink-100 text-center">
      {/* Back Button  */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white bg-blue-700 hover:bg-blue-500 p-3 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-2xl" />
      </button>

      <h1 className="text-4xl font-bold text-blue-700 mb-8">
       Tap a Letter to Learn Words of the specific Character
      </h1>

      {/* ==== All Characters section ======== */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10  mx-auto gap-4 max-w-5xl">
        {letters.map((char) => (
          <button
            key={char}
            onClick={() => handleCharClick(char)}
            className="bg-blue-500 text-white text-2xl font-bold w-14 h-14 rounded-full shadow hover:bg-blue-600 transition cursor-pointer"
          >
            {char}
          </button>
        ))}
      </div>

     {/* ==== PopUp Window while clciking a partiular character ==== */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center backdrop-blur-sm bg-white/30 justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md overflow-y-auto max-h-[50vh] relative">
            <h2 className="text-2xl bg-gradient-to-br from-yellow-100 to-pink-100 mb-4 font-bold text-blue-600 sticky top-0 z-10 w-full text-center p-1">
              Words that start with "{selectedLetter}"
            </h2>
            <div className="flex flex-col rounded-md m-10">
              {(wordData[selectedLetter] || ["No words found."]).map(
                (word, idx) => (
                  <div
                    key={idx}
                    className="py-3 px-4 text-lg text-center bg-white hover:bg-yellow-100 transition rounded-md cursor-pointer"
                  >
                    {word}
                  </div>
                )
              )}
            </div>
            <button
              onClick={handleClosePopup}
              className="bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600 transition cursor-pointer mb-4" 
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
