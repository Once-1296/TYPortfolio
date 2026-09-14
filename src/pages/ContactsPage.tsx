import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import VideoBackground from '../components/VideoBackground';
import BackButton from '../components/BackButton';
import contactsData from '../data/contacts.json';
import type { ContactItem } from '../types';

const ContactsPage: React.FC = () => {
  const data = contactsData as ContactItem[];

  return (
    <>
      <VideoBackground page="contacts" />
      <PageTransition className="pt-24 pb-12 px-4 max-w-4xl mx-auto flex flex-col items-center">
        <BackButton />
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let's Connect
        </motion.h1>
        <motion.p 
          className="text-text-secondary text-lg mb-16 text-center max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Feel free to reach out through any of the platforms below for collaborations, questions, or just to say hi!
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          {data.map((contact, i) => (
            <motion.a
              key={i}
              href={contact.profileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-2xl hover:scale-105 hover:bg-accent/10 hover:border-accent/30 transition-all flex items-center gap-4 group shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: '0 10px 40px var(--accent-glow)' }}
            >
              <div className="w-12 h-12 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center shrink-0 group-hover:shadow-lg transition-shadow">
                {contact.logo ? (
                  <img src={contact.logo} alt={contact.platform} className="w-6 h-6 object-contain" />
                ) : (
                  <span className="font-bold text-xl">{contact.platform.charAt(0)}</span>
                )}
              </div>
              <div className="overflow-hidden">
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{contact.platform}</h3>
                {contact.name && (
                  <p className="text-sm text-text-secondary truncate mt-1">{contact.name}</p>
                )}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-accent shrink-0">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </motion.a>
          ))}
        </div>

      </PageTransition>
    </>
  );
};

export default ContactsPage;
