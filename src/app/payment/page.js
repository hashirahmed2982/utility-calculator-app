"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

// Replace with your own API key from NewsAPI
const API_KEY = "2315f418ddcc4af1be5bcc8f0340d6ee";
const API_URL = `https://newsapi.org/v2/everything?q=loan+payment&apiKey=${API_KEY}`;

export default function PaymentCalculator() {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [years, setYears] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching articles from NewsAPI on page load
  useEffect(() => {
    fetch("/api/news?q=payment")
      .then((res) => res.json())
      .then((data) => {
        console.log("News articles:", data.articles);
         setArticles(data.articles); // if you're using state
         setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch news", err);
      });
  }, []); // Empty dependency array ensures this runs only once on page load

  // Payment calculation logic (using loan amortization formula)
  const calculatePayment = () => {
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
        <title>Payment Calculator - Calculate Your Loan Payment</title>
        <meta
          name="description"
          content="Use our payment calculator to calculate your monthly loan payment. Understand your loan terms and plan your finances better."
        />
        <meta
          name="keywords"
          content="payment calculator, loan payment, calculate payment, monthly payment, loan amortization"
        />
        <meta property="og:title" content="Payment Calculator - Calculate Your Loan Payment" />
        <meta
          property="og:description"
          content="Calculate your monthly loan payment with our payment calculator and access related financial articles."
        />
        <meta property="og:url" content="https://utilitycalculator.vercel.app/payment-calculator" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Payment Calculator */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-center mb-6">Payment Calculator</h1>
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
              onClick={calculatePayment}
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate Payment
            </button>
          </div>

          {monthlyPayment && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold">Your Monthly Payment: ${monthlyPayment}</h2>
            </div>
          )}

          <div className="mt-8 text-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Detailed Payment Calculator</h2>
            <p className="mb-4">
              Our payment calculator helps you determine your monthly payment for a loan based on your principal, interest rate, and loan term. It is crucial to understand your monthly payment before committing to a loan. This tool allows you to make informed financial decisions.
            </p>
            <p className="mb-4">
              By adjusting the loan amount, interest rate, and loan term, you can see how different factors affect your monthly payment. Whether you're looking for a mortgage, car loan, or personal loan, this calculator is designed to help you understand your payment structure.
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
