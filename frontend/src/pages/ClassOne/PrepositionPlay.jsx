import React from "react";

const prepositions = [
  { label: "In", position: "in", imgSrc: "/catImages/in.png" },
  { label: "On", position: "on", imgSrc: "/catImages/on.png" },
  { label: "Under", position: "under", imgSrc: "/catImages/under.png" },
  { label: "Above", position: "above", imgSrc: "/catImages/near.png" },
  { label: "Between", position: "between", imgSrc: "/catImages/between.png" },
  { label: "Over", position: "over", imgSrc: "/catImages/behind.png" },
];

const PrepositionPlay = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-10 px-4 text-center">
      <h1 className="text-4xl font-bold text-purple-800 mb-10">
        📦🎈 Learn Prepositions with Images
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {prepositions.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-2xl p-6">
            {/* Image container */}
            <div className="relative w-full h-56 mb-4">
              <img
                src={item.imgSrc} // Insert the path to your image here
                alt={item.label}
                className="object-contain w-full h-full rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrepositionPlay;
