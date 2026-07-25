import { usePlanner } from "../context/PlannerContext";
import { FaPrint, FaGraduationCap } from "react-icons/fa";

function PlannerPage() {
  const {
    plannedCourses,
    semesterCredits,
    removeFromSemester,
    updateCourseGrade,
    isSemesterLocked,
    MAX_CREDITS_PER_SEM,
  } = usePlanner();

  const CURRENT_SEMESTER = 2;

  // 🔹 Grade mapping options
  const gradeOptions = [
    { label: "A (4.0)", value: 4.0 },
    { label: "B (3.0)", value: 3.0 },
    { label: "C (2.0)", value: 2.0 },
    { label: "D (1.0)", value: 1.0 },
    { label: "F (0.0)", value: 0.0 },
  ];

  // 🔹 Calculate CGPA across all semesters
  const allCourses = Object.values(plannedCourses).flat();
  const totalPoints = allCourses.reduce(
    (sum, c) => sum + (c.grade !== undefined ? c.grade : 4.0) * c.credits,
    0
  );
  const totalCredits = allCourses.reduce((sum, c) => sum + c.credits, 0);
  const cgpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-indigo-100">
        <div>
          <h2 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
            <FaGraduationCap /> Academic Planner Timeline
          </h2>
          <p className="text-gray-600 mt-1">
            Manage your semester schedule, assign grades, and monitor your cumulative CGPA.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right bg-indigo-50 px-5 py-3 rounded-2xl border border-indigo-200">
            <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">
              Cumulative CGPA
            </p>
            <p className="text-3xl font-extrabold text-indigo-700">{cgpa}</p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl shadow transition"
          >
            <FaPrint /> Print Plan
          </button>
        </div>
      </div>

      {/* ===== TIMELINE VIEW ===== */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          12-Semester Quick Credit Roadmap
        </h3>
        <div className="flex overflow-x-auto gap-4 pb-2">
          {[...Array(12)].map((_, i) => {
            const semName = `Sem ${i + 1}`;
            const credits = semesterCredits[semName] || 0;
            const isCurrent = i + 1 === CURRENT_SEMESTER;

            return (
              <div
                key={i}
                className={`min-w-[130px] p-4 rounded-2xl border text-center transition ${
                  isCurrent
                    ? "bg-indigo-600 text-white border-indigo-600 shadow"
                    : "bg-gray-50 text-gray-800 border-gray-200"
                }`}
              >
                <p className="font-bold text-sm">{semName}</p>
                <p className={`text-xs mt-1 font-semibold ${isCurrent ? "text-indigo-100" : "text-indigo-600"}`}>
                  {credits} Credits
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== SEMESTER CARDS ===== */}
      <div className="space-y-6">
        {Object.keys(plannedCourses).length === 0 && (
          <div className="bg-white p-12 rounded-3xl text-center border border-gray-200">
            <p className="text-gray-500 text-lg font-medium">No courses added to your planner yet.</p>
            <p className="text-sm text-gray-400 mt-1">Head over to the Courses tab to add subjects to your semesters.</p>
          </div>
        )}

        {Object.entries(plannedCourses).map(([semester, courses]) => {
          const semNumber = parseInt(semester.split(" ")[1]);
          const locked = isSemesterLocked(semNumber);
          const credits = semesterCredits[semester] || 0;

          // GPA per semester
          const semPoints = courses.reduce(
            (sum, c) => sum + (c.grade !== undefined ? c.grade : 4.0) * c.credits,
            0
          );
          const semCredits = courses.reduce((sum, c) => sum + c.credits, 0);
          const semGpa = semCredits ? (semPoints / semCredits).toFixed(2) : "0.00";

          return (
            <div
              key={semester}
              className={`p-6 rounded-3xl shadow-sm border transition ${
                semNumber === CURRENT_SEMESTER
                  ? "bg-indigo-50/50 border-2 border-indigo-500"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    {semester}
                    {semNumber === CURRENT_SEMESTER && (
                      <span className="text-xs bg-indigo-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                        Current
                      </span>
                    )}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">
                    {credits} / {MAX_CREDITS_PER_SEM} Credits
                  </p>
                  <p className="text-xs font-bold text-indigo-600">
                    Semester GPA: {semGpa}
                  </p>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    credits >= MAX_CREDITS_PER_SEM ? "bg-green-500" : "bg-indigo-600"
                  }`}
                  style={{
                    width: `${Math.min((credits / MAX_CREDITS_PER_SEM) * 100, 100)}%`,
                  }}
                />
              </div>

              {/* STATUS */}
              <div className="mb-4">
                {locked ? (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                    🔒 Locked
                  </span>
                ) : credits >= MAX_CREDITS_PER_SEM ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    ✅ Completed
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                    🟡 In Progress
                  </span>
                )}
              </div>

              {/* COURSE LIST */}
              <div className="space-y-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-wrap justify-between items-center bg-gray-50 hover:bg-gray-100/80 p-4 rounded-2xl border border-gray-200 transition"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {course.name}
                        <span className="ml-2 text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded">
                          {course.code || "Course"}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Credits: {course.credits}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-semibold text-gray-600">
                          Grade:
                        </label>
                        <select
                          value={course.grade !== undefined ? course.grade : 4.0}
                          onChange={(e) =>
                            updateCourseGrade(semester, course.id, e.target.value)
                          }
                          className="p-1.5 border border-gray-300 rounded-lg text-xs font-medium bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                          {gradeOptions.map((g) => (
                            <option key={g.value} value={g.value}>
                              {g.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        onClick={() => removeFromSemester(semester, course.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-bold px-3 py-1 bg-red-50 hover:bg-red-100 rounded-lg transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {courses.length === 0 && (
                <p className="text-gray-400 text-sm italic mt-2">
                  No courses added to this semester yet.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlannerPage;
