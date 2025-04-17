"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FinanceCalculator() {
  // State variables for financial calculations
  const [futureValue, setFutureValue] = useState("");
  const [payment, setPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [numberOfPeriods, setNumberOfPeriods] = useState("");
  const [presentValue, setPresentValue] = useState("");

  const [result, setResult] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [totalInterest, setTotalInterest] = useState(0);

  // Function to calculate TVM values based on user input
  const calculateTVM = (type) => {
    const rate = interestRate / 100;
    const n = numberOfPeriods;
    let calculatedResult;

    let scheduleArr = [];
    let totalPMT = 0;
    let totalInterestAccrued = 0;

    switch (type) {
      case "FV":
        // FV = PV * (1 + r)^n + PMT * [(1 + r)^n - 1] / r
        calculatedResult = presentValue * Math.pow(1 + rate, n) + payment * ((Math.pow(1 + rate, n) - 1) / rate);
        for (let period = 1; period <= n; period++) {
          const interest = (presentValue * Math.pow(1 + rate, period) - presentValue) * rate;
          totalInterestAccrued += interest;
          totalPMT += payment;
          scheduleArr.push({
            period,
            PV: presentValue.toFixed(2),
            PMT: payment.toFixed(2),
            interest: interest.toFixed(2),
            FV: (presentValue + totalPMT + totalInterestAccrued).toFixed(2),
          });
        }
        setSchedule(scheduleArr);
        setResult(calculatedResult.toFixed(2));
        setTotalInterest(totalInterestAccrued.toFixed(2));
        break;

      case "PMT":
        // PMT = (FV - PV * (1 + r)^n) / [(1 + r)^n - 1]
        calculatedResult = (futureValue - presentValue * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
        setResult(calculatedResult.toFixed(2));
        break;

      case "I/Y":
        // I/Y = (FV / PV)^(1/n) - 1
        calculatedResult = Math.pow(futureValue / presentValue, 1 / n) - 1;
        setResult((calculatedResult * 100).toFixed(2));
        break;

      case "N":
        // N = log(FV / PV) / log(1 + r)
        calculatedResult = Math.log(futureValue / presentValue) / Math.log(1 + rate);
        setResult(Math.ceil(calculatedResult));
        break;

      case "PV":
        // PV = FV / (1 + r)^n
        calculatedResult = futureValue / Math.pow(1 + rate, n);
        setResult(calculatedResult.toFixed(2));
        break;

      default:
        setResult(null);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center text-blue-800 mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <span role="img" aria-label="money">💰</span> Finance Calculator
      </motion.h1>
      <p className="text-center text-lg text-gray-600 mb-8">
        This calculator allows you to calculate the Future Value (FV), Payment (PMT), Interest Rate (I/Y),
        Number of Periods (N), and Present Value (PV) for time value of money calculations.
      </p>

      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">Enter Financial Data</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <input
            type="number"
            placeholder="Future Value (FV)"
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={futureValue}
            onChange={(e) => setFutureValue(e.target.value)}
          />
          <input
            type="number"
            placeholder="Payment (PMT)"
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          />
          <input
            type="number"
            placeholder="Interest Rate (I/Y)"
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number of Periods (N)"
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={numberOfPeriods}
            onChange={(e) => setNumberOfPeriods(e.target.value)}
          />
          <input
            type="number"
            placeholder="Present Value (PV)"
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={presentValue}
            onChange={(e) => setPresentValue(e.target.value)}
          />
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          <button
            onClick={() => calculateTVM("FV")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Calculate FV (Future Value)
          </button>
          <button
            onClick={() => calculateTVM("PMT")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Calculate PMT (Payment)
          </button>
          <button
            onClick={() => calculateTVM("I/Y")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Calculate I/Y (Interest Rate)
          </button>
          <button
            onClick={() => calculateTVM("N")}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition duration-300"
          >
            Calculate N (Number of Periods)
          </button>
          <button
            onClick={() => calculateTVM("PV")}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Calculate PV (Present Value)
          </button>
        </div>

        {result !== null && (
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded-lg">
            <p className="text-xl font-semibold text-blue-800">Result:</p>
            <p className="text-2xl text-blue-800">${result}</p>
            {totalInterest > 0 && (
              <div className="mt-4">
                <p className="text-lg text-gray-700">Total Interest Accrued: ${totalInterest}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Amortization Schedule</h3>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-200">
                <tr>
                  <th className="py-2 px-4 text-sm font-semibold text-gray-700">Period</th>
                  <th className="py-2 px-4 text-sm font-semibold text-gray-700">PV</th>
                  <th className="py-2 px-4 text-sm font-semibold text-gray-700">PMT</th>
                  <th className="py-2 px-4 text-sm font-semibold text-gray-700">Interest</th>
                  <th className="py-2 px-4 text-sm font-semibold text-gray-700">FV</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.period} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm text-gray-700">{row.period}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">${row.PV}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">${row.PMT}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">${row.interest}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">${row.FV}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
