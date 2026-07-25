import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  FaGraduationCap,
  FaCheckCircle,
  FaChartLine,
  FaLayerGroup,
  FaLock,
  FaArrowRight,
  FaPrint,
  FaBookOpen,
  FaShieldAlt,
} from "react-icons/fa";

function LandingPage() {
  const { user } = useAuth();

  const features = [
    {
      icon: <FaCheckCircle className="text-3xl text-emerald-500" />,
      title: "Smart Prerequisite Validation",
      description:
        "Automated dependency checking ensures you fulfill prerequisite subjects in prior semesters before registering for advanced courses.",
    },
    {
      icon: <FaChartLine className="text-3xl text-indigo-500" />,
      title: "Real-Time GPA & CGPA Forecast",
      description:
        "Assign predicted letter grades (A, B, C, D, F) to planned subjects and calculate semester GPA and overall CGPA instantly.",
    },
    {
      icon: <FaLayerGroup className="text-3xl text-purple-500" />,
      title: "Dynamic Credit Load Management",
      description:
        "Enforce 18 credit-hour semester caps with visual color-coded progress bars to keep your academic workload balanced.",
    },
    {
      icon: <FaGraduationCap className="text-3xl text-blue-500" />,
      title: "184-Credit Degree Audit",
      description:
        "Track degree progress toward graduation requirements with visual completion progress bars and radial CGPA gauges.",
    },
    {
      icon: <FaLock className="text-3xl text-amber-500" />,
      title: "Sequential Semester Locking",
      description:
        "Enforce step-by-step academic advancement so semesters unlock sequentially as prior semesters are completed.",
    },
    {
      icon: <FaPrint className="text-3xl text-pink-500" />,
      title: "Print & Export Roadmaps",
      description:
        "Easily export or print your 4-year multi-semester academic schedule to present during advisor check-ins.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Explore Subject Catalog",
      description: "Filter courses by year, semester, or instant search across course codes and names.",
    },
    {
      number: "02",
      title: "Build Semester Schedule",
      description: "Add subjects to semesters with automatic prerequisite and credit load verification.",
    },
    {
      number: "03",
      title: "Simulate Grades & CGPA",
      description: "Assign letter grades to subjects to calculate real-time semester and cumulative GPA.",
    },
    {
      number: "04",
      title: "Graduate On Schedule",
      description: "Monitor degree completion progress toward the 184-credit graduation threshold.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 text-2xl font-extrabold text-white tracking-tight">
            <span className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30">
              <FaGraduationCap className="text-xl" />
            </span>
            Academic Planner
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-400 transition">How It Works</a>
            <a href="#analytics" className="hover:text-indigo-400 transition">Analytics</a>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <Link
                to="/courses"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition hover:scale-105"
              >
                Go to Dashboard <FaArrowRight />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition hover:scale-105"
                >
                  Get Started <FaArrowRight />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <FaShieldAlt /> Next-Gen Degree Roadmap Engine
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Master Your Degree Path with{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Intelligent Planning
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Construct 4-year degree roadmaps across 12 semesters, enforce prerequisite dependencies automatically, forecast your CGPA dynamically, and graduate on schedule.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {user ? (
                <Link
                  to="/courses"
                  className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/30 transition hover:scale-105"
                >
                  Open Academic Dashboard <FaArrowRight />
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/30 transition hover:scale-105"
                  >
                    Start Planning Free <FaArrowRight />
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-base px-7 py-4 rounded-2xl transition"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            <div className="pt-6 flex flex-wrap gap-8 justify-center lg:justify-start text-slate-400 text-sm font-semibold">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-400" /> 100% Free & Open Source
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-400" /> No Backend Setup Required
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-400" /> Local & Cloud State Persistence
              </span>
            </div>
          </div>

          {/* HERO PREVIEW CARD */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-800/80 backdrop-blur-2xl p-6 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-700/60">
                <div>
                  <h3 className="text-sm font-bold text-slate-300">Degree Progress Dashboard</h3>
                  <p className="text-xs text-slate-400">B.Tech Computer Science & Engineering</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                  Sem 2 Active
                </span>
              </div>

              {/* STAT CARDS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60 text-center">
                  <p className="text-xs text-slate-400 font-semibold uppercase">Cumulative CGPA</p>
                  <p className="text-3xl font-black text-indigo-400 mt-1">3.88 <span className="text-xs text-slate-500 font-normal">/ 4.0</span></p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60 text-center">
                  <p className="text-xs text-slate-400 font-semibold uppercase">Total Credits</p>
                  <p className="text-3xl font-black text-purple-400 mt-1">152 <span className="text-xs text-slate-500 font-normal">/ 184</span></p>
                </div>
              </div>

              {/* COURSE ROADMAP PREVIEW ITEM */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                  <span>Semester 3 Schedule</span>
                  <span className="text-indigo-400">16 / 18 Credits</span>
                </div>

                {[
                  { name: "Data Structures & Algorithms", code: "DSA", grade: "A (4.0)", credits: 4 },
                  { name: "Object Oriented Programming", code: "OOPS", grade: "A (4.0)", credits: 4 },
                  { name: "Database Systems", code: "DBMS", grade: "B (3.0)", credits: 4 },
                ].map((c, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-700/40"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{c.name}</p>
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded">
                        {c.code} • {c.credits} Credits
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      {c.grade}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full w-[82%]" />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-2">
                  <span>82% Degree Completed</span>
                  <span className="text-emerald-400">On Track for Graduation 🎓</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Engineered for Academic Success
            </h2>
            <p className="text-slate-400 text-lg">
              Everything you need to plan your coursework, manage workloads, and monitor degree requirements in one seamless platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-slate-800/60 p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/40 transition duration-300 space-y-4"
              >
                <div className="p-4 bg-slate-900 rounded-2xl w-fit border border-slate-700/60">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              How Academic Planner Works
            </h2>
            <p className="text-slate-400 text-lg">
              Four straightforward steps to take full command of your college trajectory.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 relative space-y-4">
                <span className="text-4xl font-black text-indigo-500/30 font-mono">{s.number}</span>
                <h3 className="text-xl font-bold text-white">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="analytics" className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Take Control of Your Academic Plan?
          </h2>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
            Join students using Academic Planner to simplify course registration, fulfill prerequisites, and track CGPA.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            {user ? (
              <Link
                to="/courses"
                className="flex items-center gap-3 bg-white text-indigo-950 font-black text-lg px-8 py-4 rounded-2xl shadow-xl hover:bg-slate-100 transition hover:scale-105"
              >
                Go to Dashboard <FaArrowRight />
              </Link>
            ) : (
              <Link
                to="/signup"
                className="flex items-center gap-3 bg-white text-indigo-950 font-black text-lg px-8 py-4 rounded-2xl shadow-xl hover:bg-slate-100 transition hover:scale-105"
              >
                Get Started Now <FaArrowRight />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 font-bold text-white text-lg">
            <FaBookOpen className="text-indigo-500" /> Academic Planner
          </div>

          <p className="text-slate-500 text-center">
            © {new Date().getFullYear()} Hardik Gupta. Built with React 19, Vite & Tailwind CSS.
          </p>

          <div className="flex items-center gap-6 font-medium">
            <a href="https://github.com/Hardiik12/academic-planner" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
