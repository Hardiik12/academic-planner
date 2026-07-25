import { useState } from "react";
import { usePlanner } from "../context/PlannerContext";
import CourseCard from "../components/CourseCard";

function CoursesPage() {
  const {
    courses,
    addToSemester,
    semesterCredits,
    isSemesterLocked,
    MAX_CREDITS_PER_SEM,
    plannedCourses,
    getCourseById,
  } = usePlanner();

  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedSem, setSelectedSem] = useState(1);
  const [search, setSearch] = useState("");

  const semesterNumber = (selectedYear - 1) * 3 + selectedSem;
  const semesterLabel = `Sem ${semesterNumber}`;

  const currentCredits = semesterCredits[semesterLabel] || 0;
  const locked = isSemesterLocked(semesterNumber);

  // 🔹 Collect completed course IDs up to prior semester
  const completedIds = Object.entries(plannedCourses)
    .filter(([sem]) => parseInt(sem.split(" ")[1]) < semesterNumber)
    .flatMap(([, list]) => list)
    .map((c) => c.id);

  // 🔍 Search (matches course name or code) + Semester Filter
  const semesterCourses = courses.filter(
    (course) =>
      course.semester === semesterNumber &&
      (course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.code.toLowerCase().includes(search.toLowerCase()))
  );

  // 🧠 Recommended Courses (prereq completed)
  const recommendedCourses = semesterCourses.filter((course) =>
    course.prereq.every((id) => completedIds.includes(id))
  );

  // Helper to format prerequisite course names/codes
  const getPrereqNames = (prereqIds) => {
    return prereqIds.map((id) => {
      const match = getCourseById(id);
      return match ? match.code || match.name : `#${id}`;
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold text-indigo-700">
          Smart Academic Catalog
        </h2>
        <p className="text-gray-600 mt-1">
          Explore subjects, check prerequisite completion, and construct your semester roadmap.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-indigo-100 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-gray-700">Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white text-gray-800 font-medium outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {[1, 2, 3, 4].map((year) => (
              <option key={year} value={year}>
                Year {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-gray-700">Semester:</label>
          <select
            value={selectedSem}
            onChange={(e) => setSelectedSem(Number(e.target.value))}
            className="p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white text-gray-800 font-medium outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {[1, 2, 3].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem} (Sem {(selectedYear - 1) * 3 + sem})
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search by course code or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* SEMESTER STATUS & CREDIT PROGRESS */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="font-semibold text-gray-800 text-lg mr-3">
              {semesterLabel} Overview
            </span>
            {locked ? (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                🔒 Semester Locked (Complete Sem {semesterNumber - 1} first)
              </span>
            ) : (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                🟢 Semester Open
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-gray-600">
            Credits: <span className="font-bold text-indigo-600">{currentCredits}</span> / {MAX_CREDITS_PER_SEM}
          </p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3.5 overflow-hidden">
          <div
            className={`h-3.5 rounded-full transition-all duration-500 ${
              currentCredits >= MAX_CREDITS_PER_SEM ? "bg-amber-500" : "bg-indigo-600"
            }`}
            style={{
              width: `${Math.min((currentCredits / MAX_CREDITS_PER_SEM) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* RECOMMENDED COURSES SECTION */}
      {recommendedCourses.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
            🎯 Recommended Courses (Prerequisites Ready)
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => {
              const isAlreadyAdded = (plannedCourses[semesterLabel] || []).some(
                (c) => c.id === course.id
              );
              const creditFull = currentCredits + course.credits > MAX_CREDITS_PER_SEM;

              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  isDisabled={locked || creditFull || isAlreadyAdded}
                  onAdd={() => addToSemester(semesterLabel, course)}
                  prereqNames={getPrereqNames(course.prereq)}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ALL SEMESTER COURSES */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          All Courses for {semesterLabel}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {semesterCourses.map((course) => {
            const isAlreadyAdded = (plannedCourses[semesterLabel] || []).some(
              (c) => c.id === course.id
            );
            const creditFull = currentCredits + course.credits > MAX_CREDITS_PER_SEM;
            const prereqMet = course.prereq.every((id) => completedIds.includes(id));

            return (
              <CourseCard
                key={course.id}
                course={course}
                isDisabled={locked || creditFull || !prereqMet || isAlreadyAdded}
                onAdd={() => addToSemester(semesterLabel, course)}
                prereqNames={getPrereqNames(course.prereq)}
              />
            );
          })}

          {semesterCourses.length === 0 && (
            <div className="col-span-full bg-white p-8 rounded-2xl text-center text-gray-500 border">
              No subjects found matching your filter criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
