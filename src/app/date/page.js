"use client";

import { useState } from "react";
import { Helmet } from "react-helmet";

export default function DateCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateDifference, setDateDifference] = useState(null);

  // Date difference calculation logic
  const calculateDateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Difference in milliseconds
    const diffTime = Math.abs(end - start);

    // Calculate days, months, and years
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;

    setDateDifference({ years, months, days });
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Date Calculator - Calculate the Duration Between Two Dates</title>
        <meta
          name="description"
          content="Use our Date Calculator to calculate the difference between two dates. Get the duration in years, months, and days."
        />
        <meta
          name="keywords"
          content="date calculator, date difference, calculate dates, time difference, duration calculator"
        />
        <meta property="og:title" content="Date Calculator - Calculate the Duration Between Two Dates" />
        <meta
          property="og:description"
          content="Use our Date Calculator to calculate the duration between two dates. Find out how many years, months, and days between the selected dates."
        />
        <meta property="og:url" content="https://yourwebsite.com/date-calculator" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Date Calculator */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-center mb-6">Date Calculator</h1>
          <p className="text-center mb-4">
            Enter two dates to calculate the difference between them in years, months, and days.
          </p>

          {/* Date Input Form */}
          <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md mb-6">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={calculateDateDifference}
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate Difference
            </button>
          </div>

          {dateDifference && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold">
                Difference: {dateDifference.years} years, {dateDifference.months} months, {dateDifference.days} days
              </h2>
            </div>
          )}

          <div className="mt-8 text-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">About Date Calculation</h2>
            <p className="mb-4">
              This tool calculates the time difference between two dates, providing the duration in terms of years, months, and days.
            </p>
            <p className="mb-4">
              You can use this tool for various purposes such as tracking milestones, calculating age differences, or managing project timelines.
            </p>
          </div>
        </div>

        {/* Right Side: Articles Section */}
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
          {/* Example static content for the articles section */}
          <div className="space-y-4">
            <div className="bg-white p-4 shadow rounded">
              <h3 className="font-bold text-lg">How to Use Date Calculators Effectively</h3>
              <p className="text-gray-700">Learn how date calculators can help you plan and track your goals more effectively.</p>
              <a href="/articles/date-calculator-tips" className="text-blue-600 hover:underline">
                Read More
              </a>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h3 className="font-bold text-lg">The Importance of Calculating Time for Project Management</h3>
              <p className="text-gray-700">Understanding time differences is essential for managing project deadlines and tasks.</p>
              <a href="/articles/project-time-management" className="text-blue-600 hover:underline">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
