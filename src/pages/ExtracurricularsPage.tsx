import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import VideoBackground from '../components/VideoBackground';
import BackButton from '../components/BackButton';
import Modal from '../components/Modal';
import extraData from '../data/extracurriculars.json';
import type { ExtracurricularItem, ExtracurricularEvent, ExtracurricularPosition } from '../types';

const ExtracurricularsPage: React.FC = () => {
  const data = extraData as ExtracurricularItem[];
  const [selectedItem, setSelectedItem] = useState<ExtracurricularItem | null>(null);

  const events = data.filter(d => d.formType === 1) as ExtracurricularEvent[];
  const positions = data.filter(d => d.formType === 2) as ExtracurricularPosition[];

  return (
    <>
      <VideoBackground page="extracurriculars" />
      <PageTransition className="pt-24 pb-12 px-4 max-w-6xl mx-auto flex flex-col !justify-start">
        <BackButton />
        
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Extracurriculars</h1>
          <p className="text-text-secondary text-lg">Events attended and roles held beyond academics</p>
        </motion.div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Events Section */}
          <div>
            <motion.h2 
              className="text-2xl font-bold mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]" /> 
              Events
              <span className="text-sm text-text-secondary font-normal ml-auto">{events.length} events</span>
            </motion.h2>
            <div className="flex flex-col gap-4">
              {events.map((ev, i) => (
                <motion.div 
                  key={ev.id}
                  className="glass p-5 rounded-2xl cursor-pointer hover:scale-[1.02] hover:border-accent/30 transition-all group relative"
                  onClick={() => setSelectedItem(ev)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                  </div>
                  <p className="text-sm text-accent font-bold mb-1">{ev.dateTime}</p>
                  <h3 className="text-xl font-bold">{ev.eventName}</h3>
                  <p className="text-text-secondary mt-1">{ev.role}</p>
                </motion.div>
              ))}
              {events.length === 0 && <p className="text-text-secondary">No events yet.</p>}
            </div>
          </div>

          {/* Positions Section */}
          <div>
            <motion.h2 
              className="text-2xl font-bold mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="w-3 h-3 rounded-sm bg-accent shadow-[0_0_8px_var(--accent-glow)]" /> 
              Positions of Responsibility
              <span className="text-sm text-text-secondary font-normal ml-auto">{positions.length} roles</span>
            </motion.h2>
            <div className="flex flex-col gap-4">
              {positions.map((pos, i) => (
                <motion.div 
                  key={pos.id}
                  className="glass p-5 rounded-2xl cursor-pointer hover:scale-[1.02] hover:border-accent/30 transition-all flex items-center gap-4 group relative"
                  onClick={() => setSelectedItem(pos)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                  </div>
                  <div className="w-16 h-16 shrink-0 bg-secondary/50 rounded-lg flex items-center justify-center overflow-hidden border border-border">
                    {pos.logo ? (
                      <img src={pos.logo} alt="logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">🏛️</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{pos.positionTitle}</h3>
                    <p className="text-text-secondary text-sm mt-1">{pos.duration}</p>
                  </div>
                </motion.div>
              ))}
              {positions.length === 0 && <p className="text-text-secondary">No positions yet.</p>}
            </div>
          </div>

        </div>

        <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
          {selectedItem && (
            <div>
              {selectedItem.formType === 1 && (
                <>
                  {selectedItem.photo && (
                    <div className="w-full max-h-[60vh] rounded-xl flex items-center justify-center p-2 bg-secondary/20 mb-6 glass">
                      <img src={selectedItem.photo} alt={selectedItem.eventName} className="max-w-full max-h-[55vh] object-contain drop-shadow-md rounded" />
                    </div>
                  )}
                  <h2 className="text-3xl font-bold mb-2">{selectedItem.eventName}</h2>
                  <p className="text-accent font-semibold mb-4">{selectedItem.role}</p>
                  <p className="text-sm text-text-secondary mb-6">{selectedItem.dateTime}</p>
                  <p className="text-lg leading-relaxed">{selectedItem.description}</p>
                </>
              )}
              {selectedItem.formType === 2 && (
                <>
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
                    <div className="w-24 h-24 shrink-0 bg-secondary/50 rounded-xl flex items-center justify-center overflow-hidden border border-border">
                      {selectedItem.logo ? (
                        <img src={selectedItem.logo} alt="logo" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl">🏛️</span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedItem.positionTitle}</h2>
                      <p className="text-accent font-semibold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {selectedItem.duration}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed">{selectedItem.description}</p>
                </>
              )}
            </div>
          )}
        </Modal>

      </PageTransition>
    </>
  );
};

export default ExtracurricularsPage;
