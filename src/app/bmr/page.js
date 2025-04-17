"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

// Replace with your own API key from NewsAPI
const API_KEY = "2315f418ddcc4af1be5bcc8f0340d6ee";
const API_URL = `https://newsapi.org/v2/everything?q=bmr&apiKey=${API_KEY}`;

export default function BmrCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmr, setBmr] = useState(null);
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

  // BMR Calculation Logic (Harris-Benedict Equation)
  const calculateBMR = () => {
    let bmrValue;

    if (gender === "male") {
      bmrValue = 88.362 + 13.397 * parseFloat(weight) + 4.799 * parseFloat(height) - 5.677 * parseFloat(age);
    } else {
      bmrValue = 447.593 + 9.247 * parseFloat(weight) + 3.098 * parseFloat(height) - 4.330 * parseFloat(age);
    }

    setBmr(bmrValue.toFixed(2)); // Show BMR value with two decimal points
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>BMR Calculator - Calculate Your Basal Metabolic Rate</title>
        <meta
          name="description"
          content="Use our BMR calculator to estimate your basal metabolic rate and understand how many calories your body needs at rest."
        />
        <meta
          name="keywords"
          content="BMR calculator, calculate BMR, basal metabolic rate, daily calorie needs, fitness, health"
        />
        <meta property="og:title" content="BMR Calculator - Calculate Your Basal Metabolic Rate" />
        <meta
          property="og:description"
          content="Use our BMR calculator to estimate your basal metabolic rate (BMR) and get insights on your daily calorie needs."
        />
        <meta property="og:url" content="https://yourwebsite.com/bmr-calculator" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: BMR Calculator */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-center mb-6">BMR Calculator</h1>
          <p className="text-center mb-4">
            Enter your age, gender, weight, and height to calculate your Basal Metabolic Rate (BMR).
          </p>

          {/* BMR Form */}
          <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md mb-6">
            <input
              type="number"
              placeholder="Age (years)"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
              <input
                type="number"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={calculateBMR}
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate BMR
            </button>
          </div>

          {bmr && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold">Your Basal Metabolic Rate: {bmr} Calories/Day</h2>
            </div>
          )}

          <div className="mt-8 text-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">What is Basal Metabolic Rate (BMR)?</h2>
            <p className="mb-4">
              Basal Metabolic Rate (BMR) is the number of calories your body needs to maintain basic physiological functions while at rest, such as breathing, digestion, and maintaining body temperature. It is an important measure to understand how many calories your body burns without any physical activity.
            </p>
            <p className="mb-4">
              Knowing your BMR helps you tailor your diet and fitness routine. If you want to lose weight, you need to consume fewer calories than your body needs (i.e., less than your BMR), while if you want to gain weight, you need to consume more calories than your body burns.
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
