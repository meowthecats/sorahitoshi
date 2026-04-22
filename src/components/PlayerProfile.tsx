import React from 'react';
import { motion } from 'motion/react';
import { useGameState } from '../context/GameStateContext';
import { Shield, Zap, Terminal, Code, Cpu, Sword, Book } from 'lucide-react';
import { cn } from '../lib/utils';

export const PlayerProfile = () => {
  const { xp, level, readQuests } = useGameState();

  const skills = [
    { name: 'JavaScript / TypeScript', level: 45, icon: <Code size={16} /> },
    { name: 'React UI Spells', level: 38, icon: <Terminal size={16} /> },
    { name: 'Writing & Storytelling', level: 25, icon: <Book size={16} /> },
    { name: 'Endurance (Coffee)', level: 80, icon: <Zap size={16} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-12 border-b border-emerald-900/50 pb-6">
        <h1 className="font-mono text-emerald-500 mb-2 glitch-hover">// SYSTEM QUERY: PLAYER_ARCHIVE</h1>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 uppercase">Player Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Vitals */}
        <div className="md:col-span-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-2 text-xs font-mono text-emerald-500/30 group-hover:text-emerald-500/80 transition-colors">LVL.{level}</div>
            <div className="w-32 h-32 mx-auto rounded-xl border border-emerald-500/50 bg-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-6 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay" />
              <img 
                src="https://picsum.photos/seed/cyberpunk_avatar/200/200" 
                alt="Avatar" 
                className="w-full h-full object-cover filter contrast-125"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-2xl font-bold text-center text-zinc-100 mb-1 glitch-hover">sorahitoshi89</h3>
            <p className="text-center font-mono text-emerald-400 text-sm mb-6">Class: Front-End Sorcerer</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>HP (Health)</span>
                  <span className="text-emerald-400">100/100</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>MP (Mana/Focus)</span>
                  <span className="text-violet-400">45/100</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded overflow-hidden">
                  <div className="h-full bg-violet-500 w-[45%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>XP (Experience)</span>
                  <span className="text-yellow-400">{xp}</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded overflow-hidden">
                  <div className="h-full bg-yellow-400" style={{ width: `${(xp % 1000)/10}%` }} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-6"
          >
            <h4 className="font-mono text-xs text-zinc-500 mb-4 flex items-center gap-2"><TrophyIcon /> CURRENT BUFFS</h4>
            <ul className="space-y-3 font-mono text-sm">
              <li className="flex items-start gap-2 text-zinc-300">
                <span className="text-emerald-400 mt-0.5">↑</span>
                <span><span className="text-emerald-400">Caffeine Surge:</span> +20% coding speed for 2 hours.</span>
              </li>
              <li className="flex items-start gap-2 text-zinc-300">
                <span className="text-violet-400 mt-0.5">★</span>
                <span><span className="text-violet-400">Night Owl:</span> +15% creativity after 10PM.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Right Column: Lore & Skills */}
        <div className="md:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-8"
          >
            <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Shield className="text-emerald-500" size={20} /> Origin Story
            </h3>
            <div className="prose prose-invert prose-emerald text-zinc-400 space-y-4">
              <p>
                Greetings, traveler. I am a front-end developer and writer who decided that viewing life as a series of random events was too boring. Instead, I treat my daily hurdles as boss fights and my routines as daily quests.
              </p>
              <p>
                I forged my early skills in the fires of nested div tags and callback hell. Since then, I've journeyed through the realms of React and TypeScript, slaying bugs and optimizing rendering cycles.
              </p>
              <p>
                When I'm not writing code or blog posts, you'll find me farming materials in various RPGs, exploring nature trails, or trying to find the ultimate setup for my mechanical keyboard.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-8"
          >
            <h3 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
              <Cpu className="text-emerald-500" size={20} /> Equipped Skills
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between font-mono text-sm mb-2">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <span className="text-emerald-500/70">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-emerald-400">Lv.{skill.level}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-950 rounded overflow-hidden border border-zinc-800">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(skill.level * 2, 100)}%` }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      className="h-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-6 font-mono">
              <div className="text-zinc-500 text-xs mb-2">QUESTS COMPLETED</div>
              <div className="text-3xl text-emerald-400 glitch-hover">{readQuests.length}</div>
            </div>
            <div className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-6 font-mono">
              <div className="text-zinc-500 text-xs mb-2">MOBS DEFEATED</div>
              <div className="text-3xl text-violet-400 glitch-hover">1,042</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const TrophyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);
