import { useState } from "react";

const moods = [
  { name: "Happy", emoji: "😊", color: "bg-yellow-300" },
  { name: "Sad", emoji: "😢", color: "bg-blue-300" },
  { name: "Excited", emoji: "🤩", color: "bg-pink-300" },
  { name: "Tired", emoji: "😴", color: "bg-gray-300" },
  { name: "Angry", emoji: "😡", color: "bg-red-400" },
  { name: "Relaxed", emoji: "😌", color: "bg-green-300" },
  { name: "Confused", emoji: "🤔", color: "bg-purple-300" },
  { name: "Surprised", emoji: "😮", color: "bg-orange-300" },
  { name: "Love", emoji: "😍", color: "bg-pink-400" },
  { name: "Nervous", emoji: "😬", color: "bg-teal-300" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div className="bg-white p-5 shadow-lg rounded-lg flex flex-col items-center relative fixed top-0 right-0 left-0">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">How are you feeling?</h2>

      <div className="grid grid-cols-2 gap-3">
        {moods.map((mood, index) => (
          <button
            key={index}
            className={`w-20 h-20 rounded-xl flex items-center justify-center ${mood.color} transition transform hover:scale-110 ${selectedMood === mood.name ? "border-4 border-black" : ""
              }`}
            onClick={() => setSelectedMood(mood.name)}
          >
            <span className="text-4xl">{mood.emoji}</span>
          </button>
        ))}
      </div>

      {/* Selected Mood Message */}
      {selectedMood && (
        <p className="mt-4 w-40 text-lg font-medium text-gray-700">
          You are feeling <span className="font-bold">{selectedMood}</span> today!
        </p>
      )}
    </div>
  );
};

export default MoodTracker;
