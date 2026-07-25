import { Routes, Route, NavLink, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaClipboardList, FaChartLine, FaSignOutAlt, FaHome } from "react-icons/fa";

import LandingPage from "./pages/LandingPage";
import CoursesPage from "./pages/CoursesPage";
import PlannerPage from "./pages/PlannerPage";
import SummaryPage from "./pages/SummaryPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

function Layout() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isPublicPage =
    location.pathname === "/" ||
    location.pathname === "/landing" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <div
      className={`min-h-screen flex ${
        isPublicPage
          ? "bg-slate-900"
          : "bg-gradient-to-br from-indigo-100 via-white to-purple-100"
      }`}
    >
      {/* ================= SIDEBAR ================= */}
      {!isPublicPage && (
        <aside className="w-64 bg-white/80 backdrop-blur-xl shadow-xl p-6 flex flex-col border-r border-indigo-100/50">
          <Link to="/" className="text-2xl font-black text-indigo-700 mb-10 flex items-center gap-2">
            🎓 Academic Planner
          </Link>

          <nav className="flex flex-col space-y-4 text-gray-700 font-semibold text-sm">
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition duration-300 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "hover:bg-indigo-50 text-gray-700"
                }`
              }
            >
              <FaBook />
              Course Catalog
            </NavLink>

            <NavLink
              to="/planner"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition duration-300 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "hover:bg-indigo-50 text-gray-700"
                }`
              }
            >
              <FaClipboardList />
              Academic Planner
            </NavLink>

            <NavLink
              to="/summary"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition duration-300 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "hover:bg-indigo-50 text-gray-700"
                }`
              }
            >
              <FaChartLine />
              Degree Summary
            </NavLink>

            <NavLink
              to="/landing"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition duration-300 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "hover:bg-indigo-50 text-gray-700"
                }`
              }
            >
              <FaHome />
              Landing Page
            </NavLink>
          </nav>

          {user && (
            <button
              onClick={logout}
              className="mt-auto flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-bold transition shadow-sm"
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}

          <div className="mt-4 text-xs text-gray-400 text-center font-medium">
            © {new Date().getFullYear()} Hardik Gupta
          </div>
        </aside>
      )}

      <main className={`flex-1 overflow-y-auto ${isPublicPage ? "" : "p-8"}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              {/* PUBLIC / LANDING */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* PROTECTED WORKSPACE */}
              <Route
                path="/courses"
                element={
                  <PrivateRoute>
                    <CoursesPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/planner"
                element={
                  <PrivateRoute>
                    <PlannerPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/summary"
                element={
                  <PrivateRoute>
                    <SummaryPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export default App;