"use client";

import { useState } from "react";
import { Helmet } from "react-helmet";

export default function AgeCalculator() {
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState(null);

  // Age calculation logic
  const calculateAge = () => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
      days += lastMonth.getDate();
    }

    setAge({ years, months, days });
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Age Calculator - Calculate Your Exact Age</title>
        <meta
          name="description"
          content="Use our Age Calculator to calculate your exact age in years, months, and days based on your birthdate."
        />
        <meta
          name="keywords"
          content="age calculator, calculate age, exact age, birthdate, age in years and months"
        />
        <meta property="og:title" content="Age Calculator - Calculate Your Exact Age" />
        <meta
          property="og:description"
          content="Use our Age Calculator to calculate your exact age in years, months, and days based on your birthdate."
        />
        <meta property="og:url" content="https://utilitycalculator.vercel.app/age-calculator" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Age Calculator */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-center mb-6">Age Calculator</h1>
          <p className="text-center mb-4">
            Enter your birthdate to calculate your exact age in years, months, and days.
          </p>

          {/* Age Calculator Form */}
          <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md mb-6">
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={calculateAge}
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate Age
            </button>
          </div>

          {age && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold">
                Your Age: {age.years} years, {age.months} months, {age.days} days
              </h2>
            </div>
          )}

          <div className="mt-8 text-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">What is Age Calculation?</h2>
            <p className="mb-4">
              Age calculation is a simple process where the time difference between the current date and your birthdate is computed. The result gives your exact age in terms of years, months, and days.
            </p>
            <p className="mb-4">
              This age calculator tool is helpful in various situations like calculating eligibility for age-related benefits, legal documents, or simply knowing how long you've been around!
            </p>
          </div>
        </div>

        {/* Right Side: Articles Section */}
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
          {/* Example static content for the articles section */}
          <div className="space-y-4">
            <div className="bg-white p-4 shadow rounded">
              <h3 className="font-bold text-lg">How to Calculate Your Age for Retirement</h3>
              <p className="text-gray-700">Learn how to calculate the ideal age for retirement based on your career and financial goals.</p>
              <a href="/articles/retirement" className="text-blue-600 hover:underline">
                Read More
              </a>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h3 className="font-bold text-lg">The Science of Aging: What Happens as You Age?</h3>
              <p className="text-gray-700">Explore the biological processes behind aging and how you can age healthily.</p>
              <a href="/articles/aging-science" className="text-blue-600 hover:underline">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
