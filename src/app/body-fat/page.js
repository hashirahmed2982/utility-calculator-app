"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

// Replace with your own API key from NewsAPI
const API_KEY = "2315f418ddcc4af1be5bcc8f0340d6ee";
const API_URL = `https://newsapi.org/v2/everything?q=body+fat&apiKey=${API_KEY}`;

export default function BodyFatCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState(""); // ✅ Added missing state
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState("");
  const [bodyFat, setBodyFat] = useState(null);
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
  }, []);

  // Body Fat Calculation Logic (US Navy Method)
  const calculateBodyFat = () => {
    let bodyFatPercentage;

    if (
      !waist ||
      !neck ||
      !height ||
      (gender === "female" && !hip)
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (gender === "male") {
      bodyFatPercentage =
        86.010 * Math.log10(parseFloat(waist) - parseFloat(neck)) -
        70.041 * Math.log10(parseFloat(height)) +
        36.76;
    } else {
      bodyFatPercentage =
        163.205 *
          Math.log10(
            parseFloat(waist) +
              parseFloat(hip) -
              parseFloat(neck)
          ) -
        97.684 * Math.log10(parseFloat(height)) -
        78.387;
    }

    setBodyFat(bodyFatPercentage.toFixed(2));
  };

  return (
    <div className="container mx-auto p-6">
      <Head>
        <title>Body Fat Calculator - Calculate Your Body Fat Percentage</title>
        <meta
          name="description"
          content="Use our body fat calculator to calculate your body fat percentage based on the US Navy method. Get accurate and reliable results."
        />
        <meta
          name="keywords"
          content="body fat calculator, body fat percentage, calculate body fat, US Navy method, fitness"
        />
        <meta
          property="og:title"
          content="Body Fat Calculator - Calculate Your Body Fat Percentage"
        />
        <meta
          property="og:description"
          content="Use our body fat calculator to calculate your body fat percentage based on waist, neck, and hip measurements using the US Navy method."
        />
        <meta
          property="og:url"
          content="https://yourwebsite.com/body-fat-calculator"
        />
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Calculator */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-center mb-6">
            Body Fat Calculator
          </h1>
          <p className="text-center mb-4">
            Enter your waist, neck, and hip measurements, along with your age
            and gender, to calculate your body fat percentage.
          </p>

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
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <input
              type="number"
              placeholder="Waist Circumference (cm)"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="number"
              placeholder="Neck Circumference (cm)"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            {gender === "female" && (
              <input
                type="number"
                placeholder="Hip Circumference (cm)"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
              />
            )}
            <button
              onClick={calculateBodyFat}
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate Body Fat Percentage
            </button>
          </div>

          {bodyFat && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold">
                Your Body Fat Percentage: {bodyFat}%
              </h2>
            </div>
          )}

          <div className="mt-8 text-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">
              What is Body Fat Percentage?
            </h2>
            <p className="mb-4">
              Body fat percentage is a measure of the amount of fat in your
              body compared to the total body weight. It is an important
              indicator of overall health and fitness, as a higher body fat
              percentage can be associated with a higher risk of diseases like
              heart disease, diabetes, and more.
            </p>
            <p className="mb-4">
              The US Navy method is a popular technique for estimating body fat
              percentage. By measuring the circumference of your waist, neck,
              and, for females, hips, you can calculate your body fat percentage
              with reasonable accuracy.
            </p>
          </div>
        </div>

        {/* Right Side: Articles */}
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
          {loading ? (
            <p>Loading articles...</p>
          ) : (
            <div className="space-y-4">
              {articles.slice(0, 5).map((article, index) => (
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
