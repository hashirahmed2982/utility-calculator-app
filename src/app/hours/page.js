"use client";

import { useState } from "react";
import { Helmet } from "react-helmet";

export default function HoursCalculator() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [addedHours, setAddedHours] = useState("");
  const [calculatedHours, setCalculatedHours] = useState(null);

  // Function to calculate hours between two times
  const calculateTotalHours = () => {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);

    const difference = Math.abs(end - start);
    
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    setCalculatedHours({ hours, minutes });
  };

  // Function to add or subtract hours from a given time
  const modifyTimeByHours = () => {
    const time = new Date(`1970-01-01T${startTime}Z`);
    time.setHours(time.getHours() + parseInt(addedHours));

    const modifiedTime = time.toTimeString().split(" ")[0];
    setStartTime(modifiedTime);  // Update the start time with the modified time
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Hours Calculator</title>
        <meta
          name="description"
          content="Calculate the total number of hours between two times or add/subtract hours from a given time."
        />
        <meta
          name="keywords"
          content="hours calculator, calculate hours, add hours, subtract hours"
        />
      </Helmet>

      <h1 className="text-3xl font-bold text-center mb-6">Hours Calculator</h1>
      <p className="text-center mb-4">
        Calculate the total number of hours between two times or modify a time by adding/subtracting hours.
      </p>

      {/* Time Inputs */}
      <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Calculate Total Hours Between Two Times</h2>
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
          onClick={calculateTotalHours}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Calculate Time Difference
        </button>
      </div>

      {/* Display Time Difference */}
      {calculatedHours && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold">Total Time Difference:</h2>
          <p className="text-lg">
            {calculatedHours.hours} hours, {calculatedHours.minutes} minutes
          </p>
        </div>
      )}

      {/* Modify Time by Adding/Subtracting Hours */}
      <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Modify Time by Adding/Subtracting Hours</h2>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          value={addedHours}
          onChange={(e) => setAddedHours(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter Hours to Add/Subtract"
        />
        <button
          onClick={modifyTimeByHours}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Modify Time
        </button>
      </div>

      {/* Explanation */}
      <div className="mt-8 text-lg text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">How the Hours Calculator Works</h2>
        <p className="mb-4">
          The first feature of this calculator helps you calculate the total number of hours between two given times. By entering a start time and an end time, the calculator computes the time difference in hours and minutes.
        </p>
        <p className="mb-4">
          The second feature allows you to add or subtract a specific number of hours from a given time. Simply enter a time and the number of hours you wish to add or subtract, and the calculator will show the updated time.
        </p>
      </div>
    </div>
  );
}
