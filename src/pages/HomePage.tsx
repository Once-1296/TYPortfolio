import React from 'react';
import PageTransition from '../components/PageTransition';
import VideoBackground from '../components/VideoBackground';
import HexNav from '../components/HexNav';
import introData from '../data/intro.json';
import { motion } from 'framer-motion';
import type { IntroData } from '../types';

const HomePage: React.FC = () => {
  const data = introData as IntroData;

  // Split tagline into words for staggered animation
  const taglineWords = data.tagline.split(' ');

  return (
    <>
      <VideoBackground page="home" />
      <PageTransition isHome={true} className="overflow-x-hidden overflow-y-auto custom-scrollbar md:overflow-hidden pt-20 pb-10 md:pt-0 md:pb-0">
        
        {/* Floating accent orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, var(--accent), transparent)', top: '10%', left: '10%' }}
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #a855f7, transparent)', bottom: '15%', right: '15%' }}
            animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute w-32 h-32 rounded-full opacity-8"
            style={{ background: 'radial-gradient(circle, #ec4899, transparent)', top: '50%', right: '5%' }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        {/* Main Content */}
        <div className="z-10 flex flex-col items-center justify-center text-center max-w-4xl px-4 w-full relative shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="glass p-6 py-10 md:p-12 rounded-3xl shadow-2xl w-full border-glow"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {data.name}
            </motion.h1>
            <h2 className="text-xl md:text-3xl font-medium mb-6 flex flex-wrap justify-center gap-x-3">
              {taglineWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="text-accent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            <motion.p 
              className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {data.description}
            </motion.p>
            {data.resumeFile && (
              <motion.a 
                href={data.resumeFile} 
                download
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all inline-block shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Hexagonal Navigation */}
        <HexNav />

      </PageTransition>
    </>
  );
};

export default HomePage;
