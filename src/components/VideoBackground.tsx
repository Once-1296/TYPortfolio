import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import settingsData from '../data/settings.json';

interface VideoBackgroundProps {
  page: 'home' | 'education' | 'skills' | 'achievements' | 'extracurriculars' | 'projects' | 'contacts' | '404';
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ page }) => {
  const { theme } = useTheme();
  const [imgError, setImgError] = useState(false);

  const imageSrc = (settingsData.backgroundImages as Record<string, string>)[page];

  if (!imageSrc || imgError) {
    // Fallback animated gradient
    return (
      <div 
        className="fixed inset-0 -z-50 opacity-20 pointer-events-none"
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(45deg, #0f172a, #1e293b, #0f172a)'
            : 'linear-gradient(45deg, #f8fafc, #e2e8f0, #f8fafc)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite'
        }}
      >
        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
      <img
        src={imageSrc}
        alt=""
        onError={() => setImgError(true)}
        className="w-full h-full object-cover transition-all duration-1000"
        style={{
          opacity: theme === 'dark' ? 0.35 : 0.45,
          filter: theme === 'dark' ? 'brightness(0.6) saturate(1.2)' : 'brightness(1.0)',
        }}
      />
      {/* Gradient overlay for better text readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to bottom, rgba(10,14,26,0.3) 0%, rgba(10,14,26,0.8) 100%)'
            : 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.7) 100%)',
        }}
      />
    </div>
  );
};

export default VideoBackground;
