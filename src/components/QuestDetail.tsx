import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Quest } from '../data/quests';
import { useGameState } from '../context/GameStateContext';
import Markdown from 'react-markdown';
import { ArrowLeft, Clock, Calendar, CheckCircle, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface QuestDetailProps {
  quest: Quest;
  onBack: () => void;
  onComplete: () => void;
}

export const QuestDetail = ({ quest, onBack, onComplete }: QuestDetailProps) => {
  const { readQuests, gainXP } = useGameState();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const isCompleted = readQuests.includes(quest.id);

  // Automatically scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClaimReward = () => {
    gainXP(quest.xpReward, quest.id);
    onComplete();
  };

  return (
    <div className="relative min-h-screen pb-24">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-50 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
        style={{ scaleX }}
      />

      <div className="max-w-3xl mx-auto py-12 px-6">
        
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-zinc-400 hover:text-emerald-400 font-mono text-sm mb-12 transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          RETURN TO QUEST BOARD
        </button>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-xs font-mono px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-emerald-500">
              {quest.category}
            </span>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1"><Calendar size={14} /> {quest.date}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {quest.readTime}</span>
            </div>
            {isCompleted && (
              <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1 ml-auto">
                <CheckCircle size={14} /> QUEST COMPLETED
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-6 leading-tight">
            {quest.title}
          </h1>

          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 mb-12">
            <img 
              src={`https://picsum.photos/seed/${quest.imageSeed}/1200/600`} 
              alt={quest.title}
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="markdown-body"
        >
          <Markdown>{quest.content}</Markdown>
        </motion.div>

        {/* Quest Completion Area */}
        <div className="mt-24 border-t border-zinc-800 pt-12">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center max-w-lg mx-auto">
            <h3 className="font-mono text-zinc-400 mb-2">// MISSION STATUS</h3>
            
            {isCompleted ? (
              <div>
                <h4 className="text-2xl font-bold text-zinc-100 mb-4">Quest Cleared</h4>
                <p className="text-zinc-500 mb-6">You've already claimed the reward for this terminal entry.</p>
                <div className="inline-flex items-center gap-2 text-emerald-500 font-mono">
                  <CheckCircle size={20} /> Reward Claimed (+{quest.xpReward} XP)
                </div>
              </div>
            ) : (
              <div>
                <h4 className="text-2xl font-bold text-zinc-100 mb-4">Objective Complete</h4>
                <p className="text-zinc-400 mb-8">You've reached the end of the log. Claim your XP to update your real-world stats.</p>
                <button
                  onClick={handleClaimReward}
                  className="group relative inline-flex items-center gap-2 bg-emerald-500 text-zinc-950 font-bold px-8 py-4 rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <Zap size={20} className="relative z-10" />
                  <span className="relative z-10 uppercase tracking-widest font-mono">Claim {quest.xpReward} XP</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
