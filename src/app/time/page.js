"use client";

import { useState } from "react";
import { Helmet } from "react-helmet";

export default function TimeCalculator() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeDifference, setTimeDifference] = useState(null);

  const calculateTimeDifference = () => {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);

    const difference = Math.abs(end - start);
    
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    setTimeDifference({ hours, minutes, seconds });
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Time Difference Calculator</title>
        <meta
          name="description"
          content="Calculate the time difference between two given times in hours, minutes, and seconds."
        />
        <meta
          name="keywords"
          content="time calculator, calculate time difference, time calculation"
        />
      </Helmet>

      <h1 className="text-3xl font-bold text-center mb-6">Time Difference Calculator</h1>
      <p className="text-center mb-4">
        Calculate the difference between two times in hours, minutes, and seconds.
      </p>

      {/* Time Inputs */}
      <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md mb-6">
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={calculateTimeDifference}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Calculate Difference
        </button>
      </div>

      {/* Time Difference Display */}
      {timeDifference && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold">Time Difference:</h2>
          <p className="text-lg">
            {timeDifference.hours} hours, {timeDifference.minutes} minutes,{" "}
            {timeDifference.seconds} seconds
          </p>
        </div>
      )}

      {/* Explanation */}
      <div className="mt-8 text-lg text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">How Time Difference is Calculated</h2>
        <p className="mb-4">
          The time difference is calculated by subtracting one time from the other. The result is then broken down into hours, minutes, and seconds. This calculator helps you quickly understand how much time has passed between two given times of the day, whether it's for a project, event, or any other time-based task.
        </p>
      </div>
    </div>
  );
}
