import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/education', label: 'Education', icon: '🎓' },
  { path: '/skills', label: 'Skills', icon: '⚡' },
  { path: '/projects', label: 'Projects', icon: '🚀' },
  { path: '/achievements', label: 'Trophies', icon: '🏆' },
  { path: '/extracurriculars', label: 'Extras', icon: '🌟' },
  { path: '/contacts', label: 'Contact', icon: '📞' }
];

const HexNav: React.FC = () => {
  const [isShort, setIsShort] = useState(() => typeof window !== 'undefined' ? window.innerHeight < 550 : false);

  useEffect(() => {
    const handleResize = () => setIsShort(window.innerHeight < 550);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Container for desktop corner placing */}
      <div className={`hidden md:block absolute inset-0 pointer-events-none w-full h-full z-0 ${isShort ? '!hidden' : ''}`}>
        {navItems.map((item, index) => {
          // Calculate positions roughly around the edges
          const angle = (index / navItems.length) * Math.PI * 2 - Math.PI / 2;
          const radiusX = 40; // vw
          const radiusY = 35; // vh
          
          return (
            <motion.div
              key={item.path}
              className="absolute left-1/2 top-1/2 pointer-events-auto"
              initial={{ x: '-50%', y: '-50%', opacity: 0, scale: 0 }}
              animate={{
                x: `calc(-50% + ${Math.cos(angle) * radiusX}vw)`,
                y: `calc(-50% + ${Math.sin(angle) * radiusY}vh)`,
                opacity: 1,
                scale: 1,
              }}
              transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
            >
              <Link 
                to={item.path}
                className="hex-btn glass shadow-xl hover:shadow-[0_0_20px_var(--accent)] text-primary hover:text-accent font-semibold flex flex-col gap-2 p-2 justify-center text-center items-center"
                style={{
                  background: 'var(--glass-bg)',
                }}
              >
                <span className="text-3xl mt-1">{item.icon}</span>
                <span className="text-xs tracking-wider break-words w-full px-2 leading-tight">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
      
      {/* Mobile/Short screen grid layout at bottom */}
      <div className={`w-full flex-wrap justify-center gap-3 px-2 mt-6 md:mt-2 pb-6 pointer-events-auto z-20 ${isShort ? 'flex' : 'md:hidden flex'}`}>
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-1/3 min-w-[100px] flex justify-center"
          >
            <Link 
              to={item.path}
              className="glass px-3 py-3 w-full rounded-2xl shadow-lg flex flex-col items-center gap-1.5 hover:bg-accent/20 transition-colors"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-[11px] font-semibold text-center">{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default HexNav;
