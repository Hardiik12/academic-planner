# 🎓 Academic Planner

An intelligent, full-featured web application designed to help university students plan their multi-year academic journey, track degree progress, validate prerequisites, and dynamically calculate GPA and cumulative CGPA.

---

## 🌟 Key Features

- **📚 Interactive Course Catalog**: Browse, search, and filter subjects across 4 academic years (12 semesters). Instant search works on course codes (e.g., `DSA`, `ML`, `PROG-1`) and course names.
- **⚡ Smart Prerequisite Validation**: Automated dependency checking ensures students complete prerequisite courses in prior semesters before enrolling in advanced subjects. Human-readable course code badges make prerequisites crystal clear.
- **📊 Credit Limit Enforcement**: Dynamic progress bars track semester credit loads against an 18 credit-hour limit.
- **🎯 Dynamic GPA & CGPA Calculation**: Assign letter grades (`A (4.0)`, `B (3.0)`, `C (2.0)`, `D (1.0)`, `F (0.0)`) to planned courses to automatically compute semester GPA and cumulative CGPA in real time.
- **📈 Degree Progress & Graduation Audit**: Visual completion percentage bar and radial CGPA gauge tracking degree requirement completion toward 184 total credit hours.
- **🔒 Semester Locking Protocol**: Enforces sequential academic progression. Semesters unlock sequentially as prior semesters are completed.
- **🖨️ Export & Print Roadmap**: Easily print or export your academic plan for academic advisor check-ins.
- **💾 LocalStorage Persistence**: All planned courses and grades automatically persist across browser sessions.
- **🔐 User Authentication**: Simulated client-side authentication supporting multi-user registration, login, and secure route protection.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool & Dev Server**: [Vite](https://vitejs.dev/) with SWC React Plugin
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Linting & Code Quality**: ESLint 9

---

## 📁 Project Structure

```text
academic-planner/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Brand images and SVGs
│   ├── components/         # Reusable UI components
│   │   ├── CourseCard.jsx      # Subject card with prereq badges & add trigger
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── PrivateRoute.jsx    # Protected route wrapper
│   │   └── SemesterBlock.jsx   # Semester schedule container with credit cap
│   ├── context/            # React Context API State Management
│   │   ├── AuthContext.jsx     # User authentication state & localStorage sync
│   │   └── PlannerContext.jsx  # Catalog, plan state, grade updates & CGPA logic
│   ├── pages/              # Primary application views
│   │   ├── CoursesPage.jsx     # Smart course catalog & prerequisite checker
│   │   ├── LoginPage.jsx       # User login view
│   │   ├── PlannerPage.jsx     # Timeline overview, grade assignment & print view
│   │   ├── SignupPage.jsx      # User registration view
│   │   └── SummaryPage.jsx     # Analytics dashboard, degree audit & reset data
│   ├── App.jsx             # Main router layout & animated page transitions
│   ├── index.css           # Tailwind CSS directives & global styling
│   └── main.jsx            # Application entry point & provider tree
├── eslint.config.js        # ESLint flat configuration
├── package.json            # Dependencies and npm scripts
├── postcss.config.js       # PostCSS setup for Tailwind
├── tailwind.config.js      # Custom theme configurations
└── vite.config.js          # Vite build settings
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18.0 or higher recommended) and `npm` installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Hardiik12/academic-planner.git
   cd academic-planner
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches Vite local development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and optimizes assets into `dist/` for production deployment. |
| `npm run lint` | Executes ESLint to check for syntax, unused variables, or React hook rule violations. |
| `npm run preview` | Serves the production build locally to test dist output. |
| `npm run deploy` | Deploys the build output directly to GitHub Pages. |

---

## 💡 How It Works

1. **Account Registration**: Sign up with an email and password or log in to access the protected planner workspace.
2. **Browsing Courses**: Navigate to the **Courses** catalog. Select your Year and Semester, or search for subjects by code (e.g. `DSA`, `ML`) or name.
3. **Prerequisite Check**: The system automatically verifies if required prerequisites are fulfilled in earlier semesters. If eligible, click **Add to Planner**.
4. **Managing Grades & GPA**: Switch to the **Planner** tab to inspect your semester schedule. Use the grade drop-down menus (`A (4.0)`, `B (3.0)`, etc.) to record your grades. Watch your semester GPA and cumulative CGPA calculate instantly.
5. **Degree Summary**: Check the **Summary** dashboard to review your total completed credits, progress toward 184 credits, and graduation eligibility.
6. **Reset / Print**: Print your full multi-year schedule using the **Print Plan** button or reset your data safely via the modal prompt on the summary page.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
