import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import VideoBackground from '../components/VideoBackground';
import BackButton from '../components/BackButton';
import educationData from '../data/education.json';
import type { EducationItem } from '../types';

const EducationPage: React.FC = () => {
  const data = educationData as EducationItem[];

  return (
    <>
      <VideoBackground page="education" />
      <PageTransition className="pt-24 pb-12 px-4 max-w-4xl mx-auto flex flex-col items-center">
        <BackButton />
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 text-center w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Education Journey
        </motion.h1>
        <motion.p
          className="text-text-secondary text-center mb-12 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          My academic path and qualifications
        </motion.p>

        <div className="flex flex-col gap-8 w-full relative">
          {/* Vertical timeline line with glow */}
          <div className="absolute left-6 top-8 bottom-8 w-1 hidden md:block rounded-full overflow-hidden">
            <div className="w-full h-full bg-accent/30" />
            <motion.div 
              className="absolute top-0 left-0 w-full bg-accent"
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
              style={{ boxShadow: '0 0 10px var(--accent-glow)' }}
            />
          </div>
          
          {data.map((edu, index) => (
            <motion.div 
              key={edu.id}
              className="glass p-6 md:p-8 rounded-3xl relative z-10 md:ml-12 hover:border-accent/30 transition-colors"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Timeline dot with glow */}
              <motion.div 
                className="absolute -left-8 top-8 w-5 h-5 bg-accent rounded-full hidden md:flex items-center justify-center border-4 border-[var(--bg-primary)]"
                style={{ boxShadow: '0 0 15px var(--accent-glow)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2, type: 'spring' }}
              />

              <div className="flex flex-col md:flex-row gap-6 mb-4">
                {edu.institutePhoto && (
                  <div className="w-full md:w-48 h-32 md:h-full rounded-2xl overflow-hidden shrink-0 flex items-center justify-center bg-[var(--bg-primary)]">
                    <img src={edu.institutePhoto} alt={edu.instituteName} className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                    <h2 className="text-2xl font-bold">{edu.type}</h2>
                    <span className="bg-accent/15 text-accent font-mono text-sm px-3 py-1 rounded-full border border-accent/20">{edu.duration}</span>
                  </div>
                  
                  <p className="text-xl text-accent font-medium mb-1">{edu.instituteName}</p>
                  <p className="text-text-secondary mb-4">{edu.board} • {edu.instituteLocation}</p>
                  
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                      <span className="text-sm text-text-secondary">Grade:</span>
                      <span className="font-bold text-accent">{edu.grade}</span>
                    </div>

                    {edu.marksheetPhoto && (
                      <a 
                        href={edu.marksheetPhoto}
                        download
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/50 flex items-center gap-2 hover:-translate-y-0.5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Download Marksheet
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </PageTransition>
    </>
  );
};

export default EducationPage;
