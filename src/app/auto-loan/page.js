"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

// Replace with your own API key from NewsAPI
const API_KEY = "2315f418ddcc4af1be5bcc8f0340d6ee";
const API_URL = `https://newsapi.org/v2/everything?q=auto+loan&apiKey=${API_KEY}`;

export default function AutoLoanCalculator() {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [years, setYears] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching articles from NewsAPI on page load
  useEffect(() => {
    fetch("/api/news?q=auto+loan")
      .then((res) => res.json())
      .then((data) => {
        console.log("News articles:", data.articles);
         setArticles(data.articles); // if you're using state
         setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch news", err);
      });
  }, []);
  // Auto loan calculation logic
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
        <title>Auto Loan Calculator - Calculate Your Auto Loan Payments</title>
        <meta
          name="description"
          content="Use our auto loan calculator to estimate monthly payments for your car loan. Calculate your car loan payments with ease."
        />
        <meta
          name="keywords"
          content="auto loan calculator, car loan payment, calculate auto loan, monthly car loan payment"
        />
        <meta property="og:title" content="Auto Loan Calculator - Calculate Your Auto Loan Payments" />
        <meta
          property="og:description"
          content="Use our auto loan calculator to estimate your monthly payments and access related articles on car loans."
        />
        <meta property="og:url" content="https://yourwebsite.com/auto-loan-calculator" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Auto Loan Calculator */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-center mb-6">Auto Loan Calculator</h1>
          <p className="text-center mb-4">
            Enter the auto loan amount, interest rate, and loan term to calculate your monthly payment.
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
              Calculate Auto Loan
            </button>
          </div>

          {monthlyPayment && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold">Your Monthly Payment: ${monthlyPayment}</h2>
            </div>
          )}

          <div className="mt-8 text-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Detailed Auto Loan Calculator</h2>
            <p className="mb-4">
              Our auto loan calculator helps you estimate your monthly car loan payments. Simply enter the loan amount, interest rate, and loan term, and the calculator will compute the monthly payment you need to make.
            </p>
            <p className="mb-4">
              It's essential to understand your monthly payments before purchasing a vehicle. This tool enables you to evaluate how different factors like loan amount, interest rate, and loan term affect your monthly payment. Use it to make well-informed decisions about your car purchase.
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
