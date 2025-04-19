"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Helmet } from "react-helmet";

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState([
    [{ course: "", grade: "", credit: 0 }],
  ]);
  const [cgpa, setCGPA] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
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
    fetch("/api/news?q=cgpa")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => console.error("News fetch failed:", err));
  }, []);

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach((semester) =>
      semester.forEach(({ grade, credit }) => {
        const key = grade
          .trim()
          .toUpperCase()
          .replace("+", "_plus")
          .replace("-", "_minus");
        const point = gradePoints[key] ?? gradePoints[grade];
        if (point !== undefined) {
          totalPoints += point * credit;
          totalCredits += Number(credit);
        }
      })
    );

    setCGPA((totalPoints / totalCredits).toFixed(2));
  };

  const updateCourse = (sIndex, cIndex, field, value) => {
    const updated = [...semesters];
    updated[sIndex][cIndex][field] =
      field === "credit" ? Number(value) : value;
    setSemesters(updated);
  };

  const addCourse = (sIndex) => {
    const updated = [...semesters];
    updated[sIndex].push({ course: "", grade: "", credit: 0 });
    setSemesters(updated);
  };

  const addSemester = () => {
    setSemesters([...semesters, [{ course: "", grade: "", credit: 0 }]]);
  };

  const downloadTranscriptPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("CGPA Transcript", 20, 20);

    const rows = semesters.flatMap((semester) =>
      semester.map((course) => [course.course, course.grade, course.credit])
    );

    doc.autoTable({
      startY: 30,
      head: [["Course Name", "Grade", "Credits"]],
      body: rows,
      theme: "grid",
    });

    if (cgpa) {
      doc.text(`Cumulative GPA: ${cgpa}`, 20, doc.lastAutoTable.finalY + 10);
    }

    doc.save("cgpa-transcript.pdf");
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CGPA Calculator",
    description:
      "Accurately calculate your GPA and CGPA using our online CGPA calculator. Get a downloadable transcript and GPA breakdown.",
    url: "https://utilitycalculators.online/cgpa-calculator",
    mainEntityOfPage: "https://utilitycalculators.online/cgpa-calculator",
    image: "/file.svg",
    potentialAction: {
      "@type": "Action",
      target: "https://utilitycalculators.online/cgpa-calculator",
      name: "Calculate CGPA",
    },
  };

  return (
    <>
      <Helmet>
        <title>
          CGPA Calculator - Accurate, Free & Fast | GPA & Transcript Generator for Students
        </title>


        <meta name="keywords" content="CGPA calculator,cgpa calculator, GPA calculator, transcript generator, grade calculator, GPA vs CGPA, cumulative GPA, grade point average calculator, free CGPA tool" />
        <meta property="og:title" content="Free CGPA Calculator - Calculate Your Academic Performance" />
        <meta
          name="description"
          content="Free and accurate CGPA calculator to compute your GPA and download a transcript PDF. Designed for college and university students."
        />
        <meta property="og:url" content="https://utilitycalculators.online/cgpa-calculator" />
        <meta property="og:type" content="website" />

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
          <div className="lg:col-span-2">
            <motion.h1
              className="text-3xl font-bold mb-6 text-blue-700 text-center"
              whileHover={{ scale: 1.05 }}
            >
              🎓 CGPA Calculator for Students
            </motion.h1>
            <p className="text-center text-gray-600 mb-10">
              Calculate your GPA & CGPA by entering course grades and credit
              hours. Generate your academic transcript in seconds.
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
                      placeholder="Credit Hours"
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

            <div className="flex justify-center gap-4 flex-wrap mb-6">
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

            {cgpa && (
              <motion.p
                className="text-center text-2xl font-semibold text-green-600"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                🎯 Your Cumulative GPA is: {cgpa}
              </motion.p>
            )}

            {/* Bottom Content: SEO Long Text */}
            {/* Bottom Content: SEO Long Text */}
            <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow text-gray-700 space-y-6">
              <h2 className="text-2xl font-bold text-blue-700">
                📘 What is CGPA?
              </h2>
              <p>
                CGPA (Cumulative Grade Point Average) is a vital academic metric that reflects a student's overall academic performance throughout their academic program. It aggregates your semester GPAs based on credit hours and provides a clear picture of your consistency and growth. Whether you're in college or university, CGPA is crucial for applying to scholarships, internships, postgraduate studies, or job opportunities.
              </p>

              <h2 className="text-2xl font-bold text-blue-700">
                📊 How is CGPA Calculated?
              </h2>
              <p>
                The formula to calculate CGPA is:
              </p>
              <div className="bg-white p-4 border border-gray-200 rounded-md text-sm">
                <strong>CGPA = (Σ GPA × Credit Hours) / Total Credit Hours</strong>
              </div>
              <p>
                Example:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Semester 1: GPA = 3.6, Credits = 15</li>
                <li>Semester 2: GPA = 3.8, Credits = 18</li>
                <li>Semester 3: GPA = 3.9, Credits = 12</li>
              </ul>
              <p>
                CGPA = (3.6×15 + 3.8×18 + 3.9×12) / (15 + 18 + 12) = <strong>3.76</strong>
              </p>

              <h2 className="text-2xl font-bold text-blue-700">
                🎓 GPA vs CGPA
              </h2>
              <p>
                GPA refers to the Grade Point Average for a single semester or term, while CGPA is the cumulative average over multiple terms. Both are important, but CGPA is especially used in transcripts and final evaluations.
              </p>

              <h2 className="text-2xl font-bold text-blue-700">
                🧮 Grade Point Conversion Table
              </h2>
              <div className="overflow-x-auto">
                <table className="table-auto border-collapse w-full text-sm text-left mt-2">
                  <thead>
                    <tr className="bg-blue-100 text-blue-800">
                      <th className="border px-4 py-2">Grade</th>
                      <th className="border px-4 py-2">Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border px-4 py-2">A+</td><td className="border px-4 py-2">4.0</td></tr>
                    <tr><td className="border px-4 py-2">A</td><td className="border px-4 py-2">4.0</td></tr>
                    <tr><td className="border px-4 py-2">A−</td><td className="border px-4 py-2">3.7</td></tr>
                    <tr><td className="border px-4 py-2">B+</td><td className="border px-4 py-2">3.3</td></tr>
                    <tr><td className="border px-4 py-2">B</td><td className="border px-4 py-2">3.0</td></tr>
                    <tr><td className="border px-4 py-2">B−</td><td className="border px-4 py-2">2.7</td></tr>
                    <tr><td className="border px-4 py-2">C+</td><td className="border px-4 py-2">2.3</td></tr>
                    <tr><td className="border px-4 py-2">C</td><td className="border px-4 py-2">2.0</td></tr>
                    <tr><td className="border px-4 py-2">D</td><td className="border px-4 py-2">1.0</td></tr>
                    <tr><td className="border px-4 py-2">F</td><td className="border px-4 py-2">0.0</td></tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-blue-700">
                📥 Download or Share Your Transcript
              </h2>
              <p>
                After calculating your CGPA using our tool, you can easily generate a clean, printable transcript. A downloadable PDF version is coming soon to help you save and share your academic record with universities or employers.
              </p>

              <h2 className="text-2xl font-bold text-blue-700">
                📚 Frequently Asked Questions
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Can I use this for any grading system?</strong><br />
                  Yes, this calculator works for most 4.0 and 5.0 grading systems. You can enter your GPA and credits manually to match your academic system.
                </li>
                <li>
                  <strong>Is the calculator mobile-friendly?</strong><br />
                  Absolutely! The tool is fully responsive and can be used on all devices including phones, tablets, and desktops.
                </li>
                <li>
                  <strong>Is it free to use?</strong><br />
                  Yes. It’s 100% free with no signup or ads. Bookmark it for quick access during the semester.
                </li>
                <li>
                  <strong>Can I calculate SGPA too?</strong><br />
                  Yes. Just input your semester GPA and credit hours — the tool will do the rest.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-blue-700">
                📈 Final Thoughts
              </h2>
              <p>
                CGPA is a key indicator of academic success, and it's often required for scholarships, job applications, and higher education opportunities. Keeping track of your CGPA helps you plan your future better and stay academically aware.
              </p>
              <p>
                Use our CGPA Calculator regularly to manage your academic progress. It’s fast, reliable, mobile-friendly, and completely free. Share it with classmates and stay on top of your goals!
              </p>
            </div>

          </div>

          {/* Related Articles */}
          <div className="bg-white p-6 shadow-md rounded-lg h-fit">
            {/* Right: Sidebar Content */}
            <div className="bg-white p-6 shadow-md rounded-lg h-fit  mb-4" >
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold mb-2 text-gray-800">Related Tools</h2>
                <ul className="list-disc list-inside text-blue-600 space-y-1">
                  <li><a href="/loan">Loan Calculator</a></li>
                  <li><a href="/percentage">Percentage Calculator</a></li>
                  <li><a href="/calorie">Calorie Calculator</a></li>
                  <li><a href="/bmi">BMI Calculator</a></li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800">Tips to Improve CGPA</h2>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Retake low grade courses</li>
                  <li>Focus on high-credit subjects</li>
                  <li>Calculate CGPA every semester</li>
                </ul>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
            {loading ? (
              <p>Loading articles...</p>
            ) : (
              <div className="space-y-4">
                {articles.slice(0, 5).map((article, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 shadow rounded space-y-2"
                  >
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
