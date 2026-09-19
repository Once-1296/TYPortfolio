import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import VideoBackground from '../components/VideoBackground';
import settingsData from '../data/settings.json';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <VideoBackground page="404" />
      <PageTransition className="overflow-x-hidden overflow-y-auto custom-scrollbar md:overflow-hidden pt-20 pb-10 md:pt-0 md:pb-0">
        
        {/* Floating accent orbs (optional, adds some dynamism) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, var(--accent), transparent)', top: '20%', left: '15%' }}
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #ec4899, transparent)', bottom: '25%', right: '15%' }}
            animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        {/* Main Content */}
        <div className="z-10 flex flex-col items-center justify-center text-center max-w-4xl px-4 w-full relative shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="glass p-6 py-10 md:p-12 rounded-3xl shadow-2xl w-full border-glow flex flex-col items-center"
          >
            <motion.img 
              src={(settingsData as any).images?.['404Caption'] || '/assets/404error.png'} 
              alt="404 Error"
              className="w-full max-w-sm md:max-w-md object-contain mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            
            <motion.p 
              className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              The page you're looking for seems to have gone missing or doesn't exist. Let's get you back on track!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/"
                // Ensure text is white always to contrast well with blue-600 background, so it remains visible in light/dark mode.
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all inline-block shadow-lg hover:shadow-blue-500/50"
              >
                Go Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </PageTransition>
    </>
  );
};

export default NotFoundPage;
