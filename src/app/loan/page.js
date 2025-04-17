"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

// Replace with your own API key from NewsAPI
const API_KEY = "2315f418ddcc4af1be5bcc8f0340d6ee";
const API_URL = `https://newsapi.org/v2/everything?q=loan&apiKey=${API_KEY}`;

export default function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [years, setYears] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
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

  // Loan calculation logic
  const calculateLoan = () => {
    const principal = parseFloat(amount);
    const calculateInterest = parseFloat(interest) / 100 / 12;
    const calculatePayments = parseFloat(years) * 12;
    
    const x = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly = (principal * x * calculateInterest) / (x - 1);
    setMonthlyPayment(monthly.toFixed(2));
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Loan Calculator - Calculate Your Loan Payments</title>
        <meta
          name="description"
          content="Use our loan calculator to calculate monthly payments for your loan. Get the best loan calculation and tips here."
        />
        <meta
          name="keywords"
          content="loan calculator, calculate loan, loan payment, monthly loan payment, calculate payments"
        />
        <meta property="og:title" content="Loan Calculator - Calculate Your Loan Payments" />
        <meta
          property="og:description"
          content="Use our loan calculator to calculate monthly payments for your loan and access related loan articles."
        />
        <meta property="og:url" content="https://yourwebsite.com/loan-calculator" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Loan Calculator */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-center mb-6">Loan Calculator</h1>
          <p className="text-center mb-4">
            Enter the loan amount, interest rate, and loan term to calculate your monthly payment.
          </p>

          {/* Loan Form */}
          <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md mb-6">
            <input
              type="number"
              placeholder="Loan Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="number"
              placeholder="Interest Rate (%)"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="number"
              placeholder="Loan Term (Years)"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={calculateLoan}
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate Loan
            </button>
          </div>

          {monthlyPayment && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold">Your Monthly Payment: ${monthlyPayment}</h2>
            </div>
          )}

          <div className="mt-8 text-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Detailed Loan Calculator</h2>
            <p className="mb-4">
              Our loan calculator helps you determine your monthly payment for any type of loan. Simply enter your loan amount, interest rate, and loan term, and the calculator will automatically compute the monthly payment you need to make. Whether you're looking to purchase a new car, refinance your home, or secure a personal loan, this calculator is a great tool to estimate your future payments.
            </p>
            <p className="mb-4">
              It is important to understand your monthly payments before taking out any loan. Using this tool, you can make informed decisions about your financial situation and avoid overcommitting to a loan. Adjust the variables to see how changes in interest rates or loan terms affect your monthly payments.
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
