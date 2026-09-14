import React from 'react';
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
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Container for desktop corner placing */}
      <div className="hidden md:block w-full h-full relative">
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
      
      {/* Mobile grid layout at bottom */}
      <div className="md:hidden absolute bottom-10 left-0 w-full flex flex-wrap justify-center gap-4 px-4 pointer-events-auto mt-20 pb-10">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              to={item.path}
              className="glass px-4 py-3 rounded-2xl shadow-lg flex flex-col items-center gap-1 hover:bg-accent/20 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-semibold">{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HexNav;
