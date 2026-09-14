import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import VideoBackground from '../components/VideoBackground';
import BackButton from '../components/BackButton';
import Modal from '../components/Modal';
import achievementsData from '../data/achievements.json';
import type { AchievementItem } from '../types';

const AchievementsPage: React.FC = () => {
  const data = achievementsData as AchievementItem[];
  const [selectedAch, setSelectedAch] = useState<AchievementItem | null>(null);

  return (
    <>
      <VideoBackground page="achievements" />
      <PageTransition className="pt-24 pb-12 px-4 max-w-6xl mx-auto">
        <BackButton />
        
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="mr-3">🏆</span>Achievements
          </h1>
          <p className="text-text-secondary text-lg">Recognition and competitive accomplishments</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {data.map((ach, index) => (
            <motion.div 
              key={ach.id}
              className="glass p-6 rounded-2xl cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:border-accent/30 transition-all border-l-4 border-l-accent group relative"
              onClick={() => setSelectedAch(ach)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
              </div>
              <div className="flex justify-between items-start mb-2">
                <span className="bg-accent/15 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-accent/20">
                  {ach.domain}
                </span>
                <span className="text-sm font-semibold text-text-secondary">{ach.dateTime}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{ach.eventName}</h3>
              <p className="text-text-secondary">{ach.organisedBy} • {ach.eventLocation}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-accent text-xl">🏅</span>
                <span className="text-lg font-bold text-accent">{ach.rank}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <Modal isOpen={!!selectedAch} onClose={() => setSelectedAch(null)}>
          {selectedAch && (
            <div>
              {selectedAch.photo && (
                <div className="w-full max-h-[60vh] rounded-xl overflow-hidden mb-6 flex items-center justify-center bg-secondary/20">
                  <img src={selectedAch.photo} alt={selectedAch.eventName} className="max-w-full max-h-[60vh] object-contain rounded" />
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-accent text-white px-3 py-1 rounded-md text-sm font-bold uppercase">
                  {selectedAch.domain}
                </span>
                <span className="text-text-secondary font-medium">{selectedAch.dateTime} {selectedAch.durationEnd && `- ${selectedAch.durationEnd}`}</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-2">{selectedAch.eventName}</h2>
              <div className="text-lg text-text-secondary mb-6">
                Organized by <span className="font-semibold text-text-primary">{selectedAch.organisedBy}</span> in {selectedAch.eventLocation}
              </div>
              
              <div className="glass p-6 rounded-xl border border-accent/30 bg-accent/5">
                <div className="text-sm text-text-secondary uppercase tracking-wider font-bold mb-1">Achievement / Rank</div>
                <div className="text-2xl font-bold text-accent flex items-center gap-2">
                  <span>🏆</span> {selectedAch.rank}
                </div>
              </div>
            </div>
          )}
        </Modal>

      </PageTransition>
    </>
  );
};

export default AchievementsPage;
