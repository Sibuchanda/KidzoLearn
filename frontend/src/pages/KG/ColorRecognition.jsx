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
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('');
  const navigate = useNavigate();

  const speakColor = (colorName, hex) => {
    setBackgroundColor(hex); 

    const utterance = new SpeechSynthesisUtterance(colorName);
    utterance.pitch = 1.3;
    utterance.rate = 0.9;

    utterance.onend = () => {
      setTimeout(() => {
        setCurrentColorIndex((prev) =>
          prev < colors.length - 1 ? prev + 1 : 0
        );
      }, 500);
    };

    speechSynthesis.speak(utterance);
  };

  const currentColor = colors[currentColorIndex];

  return (
    <div
      className="min-h-screen transition-colors duration-300 p-6 sm:p-10 flex flex-col items-center justify-center"
      style={{ backgroundColor: backgroundColor || '#FEFCE8' }}
    >
      {/* Back to KG Activities */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white bg-blue-700 hover:bg-blue-500 p-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-2xl" />
      </button>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-white drop-shadow-lg mb-10">
        Tap the Color to Hear It!
      </h1>

      {/* Center Color Button */}
      <div className="flex justify-center items-center h-[60vh]">
        <button
          onClick={() => speakColor(currentColor.name, currentColor.hex)}
          className="relative w-75 h-75 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl transition-transform duration-300 hover:scale-105 ring-8 ring-white/80 backdrop-blur-sm cursor-pointer"
          style={{ backgroundColor: currentColor.hex }}
          aria-label={`Hear color ${currentColor.name}`}
        >
          {currentColor.name}
          <span className="absolute bottom-2 right-2 text-white text-3xl bg-black/30 p-2 rounded-full">
            <FaVolumeUp />
          </span>
        </button>
      </div>
    </div>
  );
}
