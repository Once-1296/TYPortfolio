import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoBackground from '../components/VideoBackground';
import BackButton from '../components/BackButton';
import projectsData from '../data/projects.json';
import type { ProjectItem } from '../types';

const AUTO_PLAY_INTERVAL = 6000; // ms between slides
const AUTO_PLAY_RESUME_DELAY = 12000; // ms after manual interaction to resume auto-play

const ProjectsPage: React.FC = () => {
  const data = projectsData as ProjectItem[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 left, 1 right
  const [autoPaused, setAutoPaused] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const proj = data[currentIndex];

  const getAvatarUrl = (profileLink: string) => `${profileLink}.png`;

  const goTo = useCallback((newIndex: number, dir: number) => {
    setDirection(dir);
    setCurrentIndex(newIndex);
  }, []);

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % data.length, 1);
  }, [currentIndex, data.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + data.length) % data.length, -1);
  }, [currentIndex, data.length, goTo]);

  // Manual navigation pauses auto-play, resumes after delay
  const handleManualNav = useCallback((navFn: () => void) => {
    navFn();
    setAutoPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setAutoPaused(false);
    }, AUTO_PLAY_RESUME_DELAY);
  }, []);

  // Auto-play
  useEffect(() => {
    if (autoPaused) {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      return;
    }
    autoTimerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % data.length);
    }, AUTO_PLAY_INTERVAL);
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [autoPaused, data.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleManualNav(goNext);
      else if (e.key === 'ArrowLeft') handleManualNav(goPrev);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, handleManualNav]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <>
      <VideoBackground page="projects" />
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
        <BackButton />

        {/* Left Arrow */}
        <button
          onClick={() => handleManualNav(goPrev)}
          className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-4 glass rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-[0_0_20px_var(--accent)] group"
          aria-label="Previous project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-accent transition-colors">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => handleManualNav(goNext)}
          className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-4 glass rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-[0_0_20px_var(--accent)] group"
          aria-label="Next project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-accent transition-colors">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>

        {/* Slide Content */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-16 md:px-24 py-20 sm:py-12"
          >
            <div className="glass rounded-3xl p-4 sm:p-8 md:p-10 max-w-5xl w-full mx-auto overflow-y-auto max-h-[85vh] custom-scrollbar shadow-2xl">
              {/* Hero Image */}
              {proj.photo && (
                <div className="w-full h-40 sm:h-56 md:h-72 rounded-2xl overflow-hidden mb-6 relative group">
                  <img 
                    src={proj.photo} 
                    alt={proj.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              {/* Title + Duration */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">{proj.name}</h1>
                <span className="text-accent font-mono text-sm bg-accent/10 px-3 py-1 rounded-full border border-accent/20 shrink-0 self-start sm:self-auto">
                  {proj.duration}
                </span>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6">{proj.description}</p>

              {/* Domains */}
              <div className="mb-6">
                <h4 className="text-xs text-text-secondary uppercase tracking-widest font-bold mb-3">Technologies / Domains</h4>
                <div className="flex flex-wrap gap-2">
                  {proj.domains.map(dom => (
                    <span key={dom} className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent font-medium text-sm">
                      {dom}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team */}
              <div className="mb-8">
                <h4 className="text-xs text-text-secondary uppercase tracking-widest font-bold mb-3">Team</h4>
                <div className="flex flex-wrap gap-3">
                  {proj.people.map(p => (
                    <a 
                      key={p} 
                      href={p} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 glass px-3 py-1.5 rounded-full hover:bg-accent/10 transition-colors"
                    >
                      <img 
                        src={getAvatarUrl(p)} 
                        alt="Contributor" 
                        className="w-6 h-6 rounded-full bg-secondary"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                      <span className="text-sm font-medium">{p.split('/').pop()}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {proj.githubLink && (
                  <a 
                    href={proj.githubLink}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex-1 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 font-bold py-3 px-6 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    Source Code
                  </a>
                )}
                {proj.docsLink && (
                  <a 
                    href={proj.docsLink}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex-1 border-2 border-accent text-accent hover:bg-accent hover:text-white font-bold py-3 px-6 rounded-xl flex justify-center items-center gap-2 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    Documentation
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => handleManualNav(() => goTo(i, i > currentIndex ? 1 : -1))}
              className={`transition-all duration-300 rounded-full ${
                i === currentIndex 
                  ? 'w-8 h-3 bg-accent shadow-[0_0_10px_var(--accent)]' 
                  : 'w-3 h-3 bg-[var(--text-secondary)] hover:bg-accent/50'
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
          {/* Auto-play indicator */}
          <div className={`ml-2 w-2 h-2 rounded-full transition-colors duration-300 ${autoPaused ? 'bg-red-400' : 'bg-green-400 animate-pulse'}`} title={autoPaused ? 'Auto-play paused' : 'Auto-playing'} />
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
