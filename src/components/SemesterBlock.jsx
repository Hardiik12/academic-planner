function SemesterBlock({ semester, courses, credits, maxCredits = 18, onRemove }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-indigo-600">
          {semester}
        </h3>
        <span className="text-sm font-medium text-gray-500">
          {credits} / {maxCredits} Credits
        </span>
      </div>

      {credits > maxCredits && (
        <p className="text-red-500 text-sm mb-3 font-semibold bg-red-50 p-2 rounded-md">
          ⚠️ Credit limit exceeded (Max {maxCredits})
        </p>
      )}

      {courses.length === 0 ? (
        <p className="text-gray-400 text-sm italic">No courses added yet.</p>
      ) : (
        <div className="space-y-2">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border border-gray-200 transition"
            >
              <div>
                <span className="font-medium text-gray-800">{course.name}</span>
                <span className="text-xs text-indigo-600 font-semibold ml-2">
                  ({course.code || "Course"})
                </span>
                <p className="text-xs text-gray-500">{course.credits} Credits</p>
              </div>

              <button
                onClick={() => onRemove(course.id)}
                className="text-sm text-red-600 hover:text-red-800 font-semibold px-2 py-1 hover:bg-red-50 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SemesterBlock;
