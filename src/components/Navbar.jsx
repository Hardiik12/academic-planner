import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">
        Academic Planner
      </h1>

      <div className="space-x-6">
        <Link to="/" className="hover:text-indigo-600">
          Courses
        </Link>
        <Link to="/planner" className="hover:text-indigo-600">
          Planner
        </Link>
        <Link to="/summary" className="hover:text-indigo-600">
          Summary
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
