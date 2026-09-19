import React from 'react';
import PageTransition from '../components/PageTransition';
import VideoBackground from '../components/VideoBackground';
import BackButton from '../components/BackButton';
import SkillGraph from '../components/SkillGraph';
import skillsData from '../data/skills.json';
import type { SkillItem } from '../types';

const SkillsPage: React.FC = () => {
  const data = skillsData as SkillItem[];

  return (
    <div className="h-screen w-screen overflow-hidden">
      <VideoBackground page="skills" />
      <BackButton />
      
      <PageTransition className="w-full h-full p-0 flex flex-col pt-20">
        <div className="absolute top-24 md:top-8 w-full text-center pointer-events-none z-10 px-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Skills Network</h1>
          <p className="text-sm md:text-base text-text-secondary mt-1 md:mt-2">Pan, zoom, or click a node to explore</p>
        </div>
        
        <div className="w-full h-full flex-grow">
          <SkillGraph skills={data} />
        </div>
      </PageTransition>
    </div>
  );
};

export default SkillsPage;
