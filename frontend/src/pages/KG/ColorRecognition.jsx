import { useState } from 'react';
import { FaVolumeUp, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const colors = [
  { name: 'Red', hex: '#EF4444' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Green', hex: '#10B981' },
  { name: 'Yellow', hex: '#FACC15' },
  { name: 'Purple', hex: '#A855F7' },
  { name: 'Orange', hex: '#FB923C' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Brown', hex: '#92400E' },
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#F3F4F6' },
];

export default function ColorRecognition() {
  const [speaking, setSpeaking] = useState(false);
  const navigate = useNavigate();

  const speakColor = (colorName) => {
    const utterance = new SpeechSynthesisUtterance(colorName);
    utterance.pitch = 1.3;
    utterance.rate = 0.9;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 p-6 sm:p-10">
      {/*----  Back Button -------*/}
           <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white bg-blue-700 hover:bg-blue-500 p-3 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-2xl"/>
      </button>

      <h1 className="text-4xl sm:text-5xl font-bold text-center text-pink-600 mb-10">Tap a Color to Hear It!</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {colors.map((color) => (
          <div key={color.name} className="flex flex-col items-center">
            <button
              onClick={() => speakColor(color.name)}
              className="relative w-40 h-40 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-xl transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
              style={{ backgroundColor: color.hex }}
              aria-label={`Hear color ${color.name}`}
            >
              {color.name}
              <span className="absolute bottom-2 right-2 text-white text-2xl bg-black/30 p-1 rounded-full">
                <FaVolumeUp />
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
