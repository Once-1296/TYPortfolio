import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface PageTransitionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  isHome?: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '', isHome = false, ...props }) => {
  // We can vary animations if it's the home page vs other pages
  return (
    <motion.div
      initial={{ opacity: 0, scale: isHome ? 0.95 : 1, y: isHome ? 0 : 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: isHome ? 0 : -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`min-h-screen w-full flex flex-col items-center justify-center relative ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
