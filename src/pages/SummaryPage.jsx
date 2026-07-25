import { useState } from "react";
import { usePlanner } from "../context/PlannerContext";
import { motion } from "framer-motion";
import { FaGraduationCap, FaChartLine, FaTrophy, FaRedoAlt } from "react-icons/fa";

function SummaryPage() {
  const {
    plannedCourses,
    totalCredits,
    degreeProgress,
    isEligibleForGraduation,
    semesterCredits,
  } = usePlanner();

  const [showResetModal, setShowResetModal] = useState(false);

  const totalCourses = Object.values(plannedCourses).flat().length;
  const totalSemesters = Object.keys(plannedCourses).filter(
    (sem) => (plannedCourses[sem] || []).length > 0
  ).length;

  const allCourses = Object.values(plannedCourses).flat();

  const totalPoints = allCourses.reduce(
    (sum, c) => sum + (c.grade !== undefined ? c.grade : 4.0) * c.credits,
    0
  );

  const totalCred = allCourses.reduce((sum, c) => sum + c.credits, 0);

  const cgpa = totalCred ? (totalPoints / totalCred).toFixed(2) : "0.00";

  const handleReset = () => {
    localStorage.removeItem("plannedCourses");
    window.location.reload();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white p-10 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold mb-3 flex items-center gap-3">
            <FaGraduationCap /> Academic Analytics Dashboard
          </h1>
          <p className="opacity-90 text-lg">
            Real-time GPA forecasting, credit distribution, & degree progress analytics.
          </p>
        </div>

        {/* CGPA GAUGE */}
        <div className="relative w-36 h-36 bg-white/10 backdrop-blur-md rounded-full p-2 flex items-center justify-center border border-white/20">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg width="128" height="128" className="transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="transparent"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="52"
                stroke="white"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="326"
                initial={{ strokeDashoffset: 326 }}
                animate={{ strokeDashoffset: 326 - (Number(cgpa) / 4.0) * 326 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-2xl font-bold">{cgpa}</span>
              <span className="text-[10px] uppercase font-semibold opacity-80">CGPA</span>
            </div>
          </div>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Planned Credits", value: `${totalCredits} / 184` },
          { label: "Cumulative CGPA", value: `${cgpa} / 4.0` },
          { label: "Active Semesters", value: totalSemesters },
          { label: "Total Planned Courses", value: totalCourses },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition duration-300"
          >
            <h3 className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-2">
              {item.label}
            </h3>
            <p className="text-3xl font-extrabold text-indigo-600">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* DEGREE PROGRESS */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <FaChartLine className="text-indigo-600" />
          Degree Completion Progress
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${degreeProgress}%` }}
            transition={{ duration: 1.2 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-5 rounded-full"
          />
        </div>

        <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
          <span>{degreeProgress}% Completed</span>
          <span>Target: 184 Credits</span>
        </div>

        {isEligibleForGraduation && (
          <div className="mt-4 bg-green-100 border border-green-300 text-green-800 p-4 rounded-2xl font-semibold flex items-center gap-3">
            <FaTrophy className="text-green-600 text-xl" />
            <span>Congratulations! You have fulfilled all graduation credit requirements.</span>
          </div>
        )}
      </div>

      {/* SEMESTER BREAKDOWN */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Semester Credit Overview
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => {
            const semName = `Sem ${i + 1}`;
            const credits = semesterCredits[semName] || 0;

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-2xl text-center border transition ${
                  credits > 0
                    ? "bg-indigo-50/70 border-indigo-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <p className="font-bold text-gray-700">{semName}</p>
                <p className="text-indigo-600 font-extrabold text-lg mt-1">
                  {credits} <span className="text-xs font-medium text-gray-500">Credits</span>
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* RESET PLANNER ACTION */}
      <div className="text-center pt-4">
        <button
          onClick={() => setShowResetModal(true)}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-2xl shadow transition"
        >
          <FaRedoAlt /> Reset Planner
        </button>
      </div>

      {/* RESET CONFIRMATION MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">Reset All Academic Data?</h3>
            <p className="text-gray-600 text-sm">
              This will clear all planned courses and grades from your local storage. This action cannot be undone.
            </p>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
              >
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SummaryPage;
