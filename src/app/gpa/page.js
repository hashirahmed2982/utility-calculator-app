"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Helmet } from "react-helmet";

const API_KEY = "2315f418ddcc4af1be5bcc8f0340d6ee";
const API_URL = `https://newsapi.org/v2/everything?q=cgpa&apiKey=${API_KEY}`;

export default function CGPACalculator() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [semesters, setSemesters] = useState([
    [{ course: "", grade: "", credit: 0 }],
  ]);
  const [cgpa, setCGPA] = useState(null);
  const ref = useRef(null);

  const gradePoints = {
    A: 4.0,
    A_minus: 3.7,
    B_plus: 3.3,
    B: 3.0,
    B_minus: 2.7,
    C_plus: 2.3,
    C: 2.0,
    C_minus: 1.7,
    D: 1.0,
    F: 0.0,
  };

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

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach((semester) => {
      semester.forEach(({ grade, credit }) => {
        const key = grade
          .trim()
          .toUpperCase()
          .replace("A-", "A_minus")
          .replace("B+", "B_plus")
          .replace("B-", "B_minus")
          .replace("C+", "C_plus")
          .replace("C-", "C_minus")
          .replace("D", "D")
          .replace("F", "F")
          .replace("A", "A")
          .replace("B", "B")
          .replace("C", "C");

        const point = gradePoints[key] ?? null;
        if (point !== null) {
          totalPoints += point * credit;
          totalCredits += Number(credit);
        }
      });
    });

    setCGPA((totalPoints / totalCredits).toFixed(2));
  };

  const updateCourse = (semesterIndex, courseIndex, field, value) => {
    const updated = [...semesters];
    updated[semesterIndex][courseIndex][field] =
      field === "credit" ? Number(value) : value;
    setSemesters(updated);
  };

  const addCourse = (semesterIndex) => {
    const updated = [...semesters];
    updated[semesterIndex].push({ course: "", grade: "", credit: 0 });
    setSemesters(updated);
  };

  const addSemester = () => {
    setSemesters([...semesters, [{ course: "", grade: "", credit: 0 }]]);
  };

  const downloadTranscriptPDF = () => {
    const doc = new jsPDF();
    const columns = ["Course Name", "Grade", "Credits"];
    const rows = [];

    semesters.forEach((semester) => {
      semester.forEach((course) => {
        rows.push([course.course, course.grade, course.credit]);
      });
    });

    doc.setFontSize(16);
    doc.text("CGPA Transcript", 20, 20);

    doc.autoTable({
      startY: 30,
      head: [columns],
      body: rows,
      theme: "grid",
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      styles: {
        cellPadding: 5,
        fontSize: 10,
        halign: "center",
      },
      margin: { top: 10, left: 10, right: 10, bottom: 10 },
    });

    if (cgpa !== null) {
      doc.setFontSize(14);
      doc.text(`Your CGPA: ${cgpa}`, 20, doc.lastAutoTable.finalY + 10);
    }

    doc.save("cgpa-transcript.pdf");
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CGPA Calculator",
    description:
      "Use the ultimate CGPA calculator to calculate your GPA, CGPA, and download a transcript PDF.",
    url: "https://yourwebsite.com/cgpa-calculator",
    mainEntityOfPage: "https://yourwebsite.com/cgpa-calculator",
    image: "/file.svg",
    potentialAction: {
      "@type": "Action",
      target: "https://yourwebsite.com/cgpa-calculator",
      name: "Calculate CGPA",
    },
  };

  return (
    <>
      <Helmet>
        <title>Ultimate CGPA Calculator - Calculate Your GPA and CGPA Easily</title>
        <meta
          name="description"
          content="Use our ultimate CGPA calculator to calculate your GPA, CGPA, and generate a transcript PDF. Simple and accurate calculation for students."
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Calculator & Content */}
          <div className="lg:col-span-2">
            <motion.h1
              className="text-3xl font-bold mb-6 text-blue-700 text-center"
              whileHover={{ scale: 1.05 }}
            >
              🎓 Ultimate CGPA Calculator
            </motion.h1>
            <p className="text-center text-gray-600 mb-10">
              Enter your courses, grades, and credits to calculate your cumulative GPA.
            </p>

            {semesters.map((semester, sIndex) => (
              <motion.div
                key={sIndex}
                className="mb-10 p-4 bg-white shadow rounded-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: sIndex * 0.1 }}
              >
                <h2 className="text-xl font-semibold text-blue-600 mb-4">
                  Semester {sIndex + 1}
                </h2>

                {semester.map((course, cIndex) => (
                  <div
                    key={cIndex}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
                  >
                    <input
                      type="text"
                      placeholder="Course Name"
                      className="p-2 border rounded"
                      value={course.course}
                      onChange={(e) =>
                        updateCourse(sIndex, cIndex, "course", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Grade (A, B+, etc)"
                      className="p-2 border rounded"
                      value={course.grade}
                      onChange={(e) =>
                        updateCourse(sIndex, cIndex, "grade", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder="Credit"
                      className="p-2 border rounded"
                      value={course.credit}
                      onChange={(e) =>
                        updateCourse(sIndex, cIndex, "credit", e.target.value)
                      }
                    />
                    <button
                      onClick={() => addCourse(sIndex)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      + Add Course
                    </button>
                  </div>
                ))}
              </motion.div>
            ))}

            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              <button
                onClick={addSemester}
                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
              >
                + Add Semester
              </button>
              <button
                onClick={calculateCGPA}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Calculate CGPA
              </button>
              <button
                onClick={downloadTranscriptPDF}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                📄 Download PDF
              </button>
            </div>

            {cgpa !== null && (
              <motion.p
                className="text-center text-2xl font-semibold text-green-600"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                Your CGPA: {cgpa}
              </motion.p>
            )}

            {/* SEO Content */}
            <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                What is a CGPA Calculator?
              </h2>
              <p className="text-gray-700 mb-4">
                A CGPA Calculator (Cumulative Grade Point Average Calculator) helps students calculate academic performance across multiple semesters.
              </p>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Why Use Our CGPA Calculator?
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Easy to use with semester/course management.</li>
                <li>Accurate GPA/CGPA based on credits.</li>
                <li>PDF transcript generator included.</li>
                <li>Responsive, mobile-friendly design.</li>
              </ul>
              <h3 className="text-xl font-semibold text-blue-600 mt-6 mb-2">
                Helpful Articles
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li><a className="text-blue-600 hover:underline" href="/blog/how-to-calculate-cgpa">How to Calculate CGPA</a></li>
                <li><a className="text-blue-600 hover:underline" href="/blog/cgpa-vs-gpa">CGPA vs GPA</a></li>
                <li><a className="text-blue-600 hover:underline" href="/blog/importance-of-transcript">Why Transcripts Matter</a></li>
              </ul>
            </div>
          </div>

          {/* Right Side: Articles */}
          <div className="bg-white p-6 shadow-md rounded-lg h-fit">
            <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
            {loading ? (
              <p>Loading articles...</p>
            ) : (
              <div className="space-y-4">
                {articles.slice(0, 5).map((article, index) => (
                  <div key={index} className="bg-gray-50 p-4 shadow rounded">
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
      </motion.div>
    </>
  );
}
