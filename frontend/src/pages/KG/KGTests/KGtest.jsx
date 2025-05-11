import React, { useState, useEffect } from "react";
import { FaVolumeUp } from "react-icons/fa";

const MixedTest1 = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [audio] = useState(new Audio());

  useEffect(() => {
    fetch("/Tests/KGTests/Kgtests.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Failed to load questions:", err));
  }, []);

  const playSound = (file) => {
    audio.src = `/sounds/${file}`;
    audio.play();
  };

  const handleOptionClick = (option) => {
    setSelected(option);
    if (option === questions[current].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) return <div className="p-6 text-2xl max-w-full flex justify-center items-center">Loading...</div>;

  const question = questions[current];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-100 p-6 flex flex-col items-center justify-center">
      {!showResult ? (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl text-center">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Q{current + 1}: {question.question}
          </h2>

          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full mb-6 flex items-center justify-center mx-auto"
            onClick={() => playSound(question.sound)}
          >
            <FaVolumeUp className="mr-2" /> Play Sound
          </button>

          <div className="grid grid-cols-2 gap-4">
            {question.options.map((opt) => (
              <button
                key={opt}
                className={`rounded-lg p-4 text-white font-bold text-lg shadow-md transition-transform duration-300 hover:scale-105
                  ${selected
                    ? opt === question.answer
                      ? "bg-green-500"
                      : opt === selected
                      ? "bg-red-500"
                      : "bg-gray-400"
                    : "bg-blue-500"}`}
                onClick={() => handleOptionClick(opt)}
                disabled={!!selected}
              >
                {opt}
              </button>
            ))}
          </div>

          {selected && (
            <div className="mt-6 text-lg font-semibold text-indigo-600">
              {selected === question.answer ? (
                "✅ Correct!"
              ) : (
                <span>
                  ❌ Oops! Wrong Answer<br />Correct Answer: <b>{question.answer}</b>
                </span>
              )}
            </div>
          )}

          {selected && (
            <button
              className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
              onClick={handleNext}
            >
              {current + 1 === questions.length ? "Finish" : "Next"}
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">🎉 Test Complete!</h2>
          <p className="text-xl font-semibold text-gray-700">
            You scored <span className="text-green-600">{score}</span> out of {questions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default MixedTest1;
