import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate('/')}
      className="fixed top-6 left-6 z-50 p-3 glass rounded-full hover:scale-110 active:scale-95 transition-transform shadow-lg group flex items-center justify-center"
      aria-label="Back to home"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-primary group-hover:-translate-x-1 transition-transform"
      >
        <path d="m15 18-6-6 6-6"/>
      </svg>
    </motion.button>
  );
};

export default BackButton;
