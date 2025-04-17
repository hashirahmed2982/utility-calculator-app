"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

// Replace with your own API key from NewsAPI
const API_KEY = "2315f418ddcc4af1be5bcc8f0340d6ee";
const API_URL = `https://newsapi.org/v2/everything?q=interest+rate&apiKey=${API_KEY}`;

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [interest, setInterest] = useState(null);
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

  // Interest calculation logic
  const calculateInterest = () => {
    const principalAmount = parseFloat(principal);
    const rateOfInterest = parseFloat(rate) / 100;
    const timePeriod = parseFloat(time);

    const calculatedInterest = (principalAmount * rateOfInterest * timePeriod).toFixed(2);
    setInterest(calculatedInterest);
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Interest Calculator - Calculate Interest on Loan</title>
        <meta
          name="description"
          content="Use our interest calculator to calculate interest for your loan or investment. Find out the interest for your loan today."
        />
        <meta
          name="keywords"
          content="interest calculator, loan interest, calculate interest, financial calculator"
        />
        <meta property="og:title" content="Interest Calculator - Calculate Interest on Loan" />
        <meta
          property="og:description"
          content="Calculate the interest on your loan or investment with our simple interest calculator and access related financial articles."
        />
        <meta property="og:url" content="https://yourwebsite.com/interest-calculator" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Interest Calculator */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-center mb-6">Interest Calculator</h1>
          <p className="text-center mb-4">
            Enter the principal amount, rate of interest, and time period to calculate the interest for your loan or investment.
          </p>

          {/* Interest Form */}
          <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md mb-6">
            <input
              type="number"
              placeholder="Principal Amount"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="number"
              placeholder="Interest Rate (%)"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="number"
              placeholder="Time Period (Years)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={calculateInterest}
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate Interest
            </button>
          </div>

          {interest && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold">Calculated Interest: ${interest}</h2>
            </div>
          )}

          <div className="mt-8 text-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Detailed Interest Calculator</h2>
            <p className="mb-4">
              Our interest calculator helps you calculate simple interest for your loan or investment. Simply enter the principal amount, interest rate, and the time period (in years), and the calculator will compute the interest you will earn or owe over the specified period.
            </p>
            <p className="mb-4">
              Understanding the interest on a loan or investment is crucial for managing your finances. This tool allows you to make more informed financial decisions and helps you understand how interest rates affect the overall cost or returns on your investment.
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
