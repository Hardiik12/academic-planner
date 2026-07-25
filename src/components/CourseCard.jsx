function CourseCard({ course, onAdd, isDisabled, prereqNames }) {
  const prereqDisplay =
    prereqNames && prereqNames.length > 0
      ? prereqNames.join(", ")
      : course.prereq.length === 0
      ? "None"
      : course.prereq.join(", ");

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {course.name}
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200">
            {course.code}
          </span>
        </div>

        <p className="text-sm text-gray-600">
          Credits: <span className="font-medium text-gray-900">{course.credits}</span>
        </p>

        <p className="text-sm text-gray-600 mt-1">
          Prerequisites: <span className="font-medium text-gray-800">{prereqDisplay}</span>
        </p>
      </div>

      <button
        disabled={isDisabled}
        onClick={onAdd}
        className={`mt-4 px-4 py-2 rounded-lg transition font-medium ${
          isDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow"
        }`}
      >
        Add to Planner
      </button>
    </div>
  );
}

export default CourseCard;
