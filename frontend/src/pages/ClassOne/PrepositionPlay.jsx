// PrepositionPlay.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const prepositions = [
  { label: "In", imgSrc: "/catImages/in.png" },
  { label: "On", imgSrc: "/catImages/on.png" },
  { label: "Under", imgSrc: "/catImages/under.png" },
  { label: "Above", imgSrc: "/catImages/near.png" },
  { label: "Between", imgSrc: "/catImages/between.png" },
  { label: "Over", imgSrc: "/catImages/behind.png" },
];

const PrepositionPlay = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-yellow-100 px-4 pt-24 pb-6 sm:px-6 sm:pt-20 sm:pb-10 flex flex-col items-center justify-center relative">
      {/* -- Back button -- */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 bg-blue-700 hover:bg-blue-500 text-white text-base sm:text-xl px-4 py-3 sm:px-8 sm:py-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
        ←
      </button>
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-10">
        Learn Prepositions with Images
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {prepositions.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-xl p-4 sm:p-6">
            <div className="w-full h-40 sm:h-52 md:h-64">
              <img
                src={item.imgSrc}
                alt={item.label}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrepositionPlay;
