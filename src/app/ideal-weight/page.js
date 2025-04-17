"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

// Replace with your own API key from NewsAPI
const API_KEY = "2315f418ddcc4af1be5bcc8f0340d6ee";
const API_URL = `https://newsapi.org/v2/everything?q=ideal+weight&apiKey=${API_KEY}`;

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [idealWeight, setIdealWeight] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching articles from NewsAPI on page load
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    }

    fetchArticles();
  }, []); // Empty dependency array ensures this runs only once on page load

  // Ideal Weight Calculation using the Devine Formula
  const calculateIdealWeight = () => {
    const heightInInches = parseFloat(height) * 0.393701; // Convert height in cm to inches

    let idealWeightValue;

    if (gender === "male") {
      idealWeightValue = 50 + 2.3 * (heightInInches - 60); // For men, height > 5 feet (60 inches)
    } else {
      idealWeightValue = 45.5 + 2.3 * (heightInInches - 60); // For women, height > 5 feet (60 inches)
    }

    setIdealWeight(idealWeightValue.toFixed(2)); // Round to 2 decimal places
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Ideal Weight Calculator - Calculate Your Ideal Body Weight</title>
        <meta
          name="description"
          content="Use our Ideal Weight calculator to estimate your ideal body weight based on height and gender."
        />
        <meta
          name="keywords"
          content="ideal weight calculator, calculate ideal weight, body weight, height and weight, fitness"
        />
        <meta property="og:title" content="Ideal Weight Calculator - Calculate Your Ideal Body Weight" />
        <meta
          property="og:description"
          content="Use our Ideal Weight calculator to estimate your ideal body weight based on height and gender."
        />
        <meta property="og:url" content="https://yourwebsite.com/ideal-weight-calculator" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Ideal Weight Calculator */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-center mb-6">Ideal Weight Calculator</h1>
          <p className="text-center mb-4">
            Enter your height and gender to calculate your ideal body weight.
          </p>

          {/* Ideal Weight Form */}
          <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md mb-6">
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-between mb-4">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="p-2 border rounded w-1/2 mr-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button
              onClick={calculateIdealWeight}
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate Ideal Weight
            </button>
          </div>

          {idealWeight && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold">Your Ideal Weight: {idealWeight} kg</h2>
            </div>
          )}

          <div className="mt-8 text-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">What is Ideal Weight?</h2>
            <p className="mb-4">
              Ideal weight refers to a weight range that is considered healthy for an individual based on their height and gender. The calculation of ideal weight helps determine if a person is underweight, at a healthy weight, overweight, or obese. It's important to note that this is just a guideline, and many factors, such as muscle mass, body composition, and health conditions, should also be considered.
            </p>
            <p className="mb-4">
              The **Devine formula** provides a simple and widely used method for calculating ideal body weight based on height and gender. While it doesn't account for variations like muscle mass or body fat percentage, it provides a general target weight range that is often used in health and fitness.
            </p>
          </div>
        </div>

        {/* Right Side: Articles Section */}
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
          {loading ? (
            <p>Loading articles...</p>
          ) : (
            <div className="space-y-4">
              {articles
                .slice(0, 5) // Limit to 5 articles for better UX
                .map((article, index) => (
                  <div key={index} className="bg-white p-4 shadow rounded">
                    <h3 className="font-bold text-lg">{article.title}</h3>
                    <p className="text-gray-700">{article.description}</p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Read More
                    </a>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
