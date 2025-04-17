"use client";
import { useState } from "react";
import { NextSeo } from 'next-seo';

export default function PercentageCalculator() {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const v = parseFloat(value);
    const p = parseFloat(percentage);
    if (!v || !p) return;
    setResult(((v * p) / 100).toFixed(2));
  };

  return (
    <>
      <NextSeo
        title="Percentage Calculator – Fast and Simple"
        description="Easily calculate any percentage of a number. Free and accurate online percentage calculator."
        canonical="https://yourdomain.com/percentage"
      />
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Percentage Calculator</h1>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Percentage %"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={calculate}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Calculate
          </button>
          {result && (
            <p className="mt-4 text-lg font-semibold">Result: {result}</p>
          )}
        </div>
      </div>
    </>
  );
}
