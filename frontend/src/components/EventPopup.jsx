import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function EventPopup({ birthdays, anniversaries, onClose }) {
  const [showConfetti, setShowConfetti] = useState(true);

  // Stop crackers after 5 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // If no events → don't show popup
  if (birthdays.length === 0 && anniversaries.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      {/* 🎉 Confetti Effect */}
      {showConfetti && <Confetti numberOfPieces={300} />}

      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl animate-bounce">
        
        <h2 className="text-xl font-bold text-center mb-4 text-purple-700">
          🎉 Today's Celebration
        </h2>

        {/* 🎂 Birthdays */}
        {birthdays.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-pink-600">🎂 Birthdays</h3>
            {birthdays.map(emp => (
              <p key={emp._id} className="text-gray-700">
                {emp.name}
              </p>
            ))}
          </div>
        )}

        {/* 💼 Anniversaries */}
        {anniversaries.length > 0 && (
          <div>
            <h3 className="font-semibold text-blue-600">💼 Work Anniversary</h3>
            {anniversaries.map(emp => (
              <p key={emp._id} className="text-gray-700">
                {emp.name}
              </p>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}