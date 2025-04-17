"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

// Replace with your own API key from NewsAPI
const API_KEY = "2315f418ddcc4af1be5bcc8f0340d6ee";
const API_URL = `https://newsapi.org/v2/everything?q=bmi&apiKey=${API_KEY}`;

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
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

  // BMI calculation logic
  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100; // Convert height from cm to meters
    const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>BMI Calculator - Calculate Your Body Mass Index</title>
        <meta
          name="description"
          content="Use our BMI calculator to determine your body mass index based on your weight and height. Get your BMI results and health articles."
        />
        <meta
          name="keywords"
          content="bmi calculator, calculate bmi, body mass index, weight, height, health"
        />
        <meta property="og:title" content="BMI Calculator - Calculate Your Body Mass Index" />
        <meta
          property="og:description"
          content="Use our BMI calculator to determine your BMI based on weight and height, and access helpful health-related articles."
        />
        <meta property="og:url" content="https://yourwebsite.com/bmi-calculator" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: BMI Calculator */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-center mb-6">BMI Calculator</h1>
          <p className="text-center mb-4">
            Enter your weight (kg) and height (cm) to calculate your Body Mass Index (BMI).
          </p>

          {/* BMI Form */}
          <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md mb-6">
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={calculateBMI}
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate BMI
            </button>
          </div>

          {bmi && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold">Your BMI: {bmi}</h2>
            </div>
          )}

          <div className="mt-8 text-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">What is BMI?</h2>
            <p className="mb-4">
              Body Mass Index (BMI) is a measure of body fat based on your weight in relation to your height. It is used to assess whether you are underweight, normal weight, overweight, or obese. This simple calculation can provide useful insights into your overall health and fitness level.
            </p>
            <p className="mb-4">
              A BMI value between 18.5 and 24.9 is considered healthy. A BMI below 18.5 indicates underweight, while a BMI between 25 and 29.9 is classified as overweight. A BMI of 30 or above indicates obesity.
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
