"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

// Replace with your own API key from NewsAPI
const API_KEY = "2315f418ddcc4af1be5bcc8f0340d6ee";
const API_URL = `https://newsapi.org/v2/everything?q=calories&apiKey=${API_KEY}`;

export default function CalorieCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("1.2"); // Sedentary by default
  const [calories, setCalories] = useState(null);
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

  // Calorie calculation logic (Mifflin-St Jeor Equation)
  const calculateCalories = () => {
    let bmr;

    if (gender === "male") {
      bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) + 5;
    } else {
      bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) - 161;
    }

    // TDEE (Total Daily Energy Expenditure) based on activity level
    const tdee = bmr * parseFloat(activityLevel);
    setCalories(tdee.toFixed(2)); // Show calories with two decimal points
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Calorie Calculator - Calculate Your Daily Caloric Needs</title>
        <meta
          name="description"
          content="Use our calorie calculator to determine how many calories you need each day to maintain, lose, or gain weight based on your activity level and metabolism."
        />
        <meta
          name="keywords"
          content="calorie calculator, calculate calories, daily calorie intake, weight loss, weight gain, calorie needs"
        />
        <meta property="og:title" content="Calorie Calculator - Calculate Your Daily Caloric Needs" />
        <meta
          property="og:description"
          content="Use our calorie calculator to determine how many calories you need each day based on your weight, height, age, gender, and activity level."
        />
        <meta property="og:url" content="https://yourwebsite.com/calorie-calculator" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Calorie Calculator */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-center mb-6">Calorie Calculator</h1>
          <p className="text-center mb-4">
            Enter your weight, height, age, gender, and activity level to calculate your daily caloric needs.
          </p>

          {/* Calorie Form */}
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
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="p-2 border rounded w-1/2"
              >
                <option value="1.2">Sedentary (little to no exercise)</option>
                <option value="1.375">Lightly active (light exercise/sports 1-3 days/week)</option>
                <option value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</option>
                <option value="1.725">Very active (hard exercise/sports 6-7 days a week)</option>
                <option value="1.9">Super active (very hard exercise or physical job)</option>
              </select>
            </div>
            <button
              onClick={calculateCalories}
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate Calories
            </button>
          </div>

          {calories && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold">Your Daily Caloric Needs: {calories} kcal</h2>
            </div>
          )}

          <div className="mt-8 text-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">What is Your Daily Caloric Need?</h2>
            <p className="mb-4">
              Your daily caloric needs depend on several factors including your weight, height, age, gender, and activity level. This calculator uses the Mifflin-St Jeor equation to calculate your Basal Metabolic Rate (BMR), which is then adjusted based on your activity level to determine your Total Daily Energy Expenditure (TDEE).
            </p>
            <p className="mb-4">
              To maintain your weight, you need to consume the same amount of calories as your TDEE. If you want to lose weight, you should create a caloric deficit, and if you want to gain weight, you should create a caloric surplus.
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
