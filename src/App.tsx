import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';

import HomePage from './pages/HomePage';
import EducationPage from './pages/EducationPage';
import SkillsPage from './pages/SkillsPage';
import AchievementsPage from './pages/AchievementsPage';
import ExtracurricularsPage from './pages/ExtracurricularsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactsPage from './pages/ContactsPage';
import NotFoundPage from './pages/NotFoundPage';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/extracurriculars" element={<ExtracurricularsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden text-[var(--text-primary)] transition-colors duration-300">
        <ThemeToggle />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
