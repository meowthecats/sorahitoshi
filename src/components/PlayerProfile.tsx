import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useGameState } from '../context/GameStateContext';
import { Shield, Zap, Terminal, Code, Cpu, Sword, Book, Award, Lock, Unlock, Github, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export const PlayerProfile = () => {
  const { xp, level, readQuests } = useGameState();

  const skills = [
    { name: 'JavaScript / TypeScript', level: 45, icon: <Code size={16} /> },
    { name: 'React UI Spells', level: 38, icon: <Terminal size={16} /> },
    { name: 'Writing & Storytelling', level: 25, icon: <Book size={16} /> },
    { name: 'Endurance (Coffee)', level: 80, icon: <Zap size={16} /> },
  ];

  const baseAchievements = [
    {
      id: 'first_blood',
      title: 'Novice Adventurer',
      description: 'Complete your very first quest.',
      lore: 'The first step out of the tutorial zone. You have proven you can click buttons and read text. The realm acknowledges your basic motor skills.',
      checkUnlock: (readQuests: string[], level: number) => readQuests.length >= 1,
      icon: <Sword size={20} />
    },
    {
      id: 'scholar',
      title: 'Dedicated Scholar',
      description: 'Read and complete 3 total quests.',
      lore: 'Knowledge is power, and you have consumed enough of it to fill a small pamphlet. The ancients would be moderately impressed.',
      checkUnlock: (readQuests: string[], level: number) => readQuests.length >= 3,
      icon: <Book size={20} />
    },
    {
      id: 'rising_star',
      title: 'Rising Star',
      description: 'Reach Level 2 in your journey.',
      lore: 'You have leveled up, shedding your newbie skin for slightly more resilient armor. Monsters now consider you a light snack instead of a free meal.',
      checkUnlock: (readQuests: string[], level: number) => level >= 2,
      icon: <Award size={20} />
    },
    {
      id: 'the_grind',
      title: 'The Grind',
      description: 'Reach Level 10 and become a master.',
      lore: 'Through sheer force of will and an unhealthy amount of caffeine, you reached Level 10. You are now officially too invested to log off.',
      checkUnlock: (readQuests: string[], level: number) => level >= 10,
      icon: <Zap size={20} />
    }
  ];

  const [achievements, setAchievements] = useState(() => 
    baseAchievements.map(ach => ({
      ...ach,
      isUnlocked: ach.checkUnlock(readQuests, level)
    }))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      // Re-evaluate on interval to catch any external updates
      setAchievements(prev => prev.map(ach => {
        const baseAch = baseAchievements.find(b => b.id === ach.id);
        if (!baseAch) return ach;
        const nowUnlocked = baseAch.checkUnlock(readQuests, level);
        return { ...ach, isUnlocked: nowUnlocked };
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [readQuests, level]);

  useEffect(() => {
    // Re-evaluate immediately on level or quest updates
    setAchievements(prev => prev.map(ach => {
      const baseAch = baseAchievements.find(b => b.id === ach.id);
      if (!baseAch) return ach;
      const nowUnlocked = baseAch.checkUnlock(readQuests, level);
      return { ...ach, isUnlocked: nowUnlocked };
    }));
  }, [readQuests, level]);

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
            <h3 className="text-2xl font-bold text-center text-zinc-100 mb-1 glitch-hover">sorahitoshi</h3>
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

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-6"
          >
            <h4 className="font-mono text-xs text-zinc-500 mb-4 flex items-center gap-2"><LinkIcon size={14} /> COMM LINKS</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center justify-between group text-sm text-zinc-400 hover:text-emerald-400 transition-all border border-zinc-800/50 hover:border-emerald-500/30 bg-zinc-900/50 p-3 rounded-lg overflow-hidden relative">
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-emerald-500/0 group-hover:bg-emerald-500/50 w-0 group-hover:w-full transition-all duration-500" />
                <span className="flex items-center gap-3 relative z-10"><Github size={16} /> GitHub Config</span>
                <span className="font-mono text-[10px] text-zinc-600 group-hover:text-emerald-500/50 transition-colors relative z-10 uppercase tracking-widest">Connect</span>
              </a>
              <a href="#" className="flex items-center justify-between group text-sm text-zinc-400 hover:text-blue-400 transition-all border border-zinc-800/50 hover:border-blue-500/30 bg-zinc-900/50 p-3 rounded-lg overflow-hidden relative">
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-blue-500/0 group-hover:bg-blue-500/50 w-0 group-hover:w-full transition-all duration-500" />
                <span className="flex items-center gap-3 relative z-10"><Twitter size={16} /> Global Feed</span>
                <span className="font-mono text-[10px] text-zinc-600 group-hover:text-blue-500/50 transition-colors relative z-10 uppercase tracking-widest">Connect</span>
              </a>
              <a href="#" className="flex items-center justify-between group text-sm text-zinc-400 hover:text-indigo-400 transition-all border border-zinc-800/50 hover:border-indigo-500/30 bg-zinc-900/50 p-3 rounded-lg overflow-hidden relative">
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-indigo-500/0 group-hover:bg-indigo-500/50 w-0 group-hover:w-full transition-all duration-500" />
                <span className="flex items-center gap-3 relative z-10"><Linkedin size={16} /> Prof. Network</span>
                <span className="font-mono text-[10px] text-zinc-600 group-hover:text-indigo-500/50 transition-colors relative z-10 uppercase tracking-widest">Connect</span>
              </a>
            </div>
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
            <h3 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2 border-b border-zinc-800/50 pb-4">
              <Shield className="text-emerald-500" size={20} /> The Archive Logs
            </h3>
            <div className="space-y-6">
              
              <div className="relative pl-6 border-l border-zinc-800">
                <div className="absolute w-3 h-3 bg-zinc-950 border-2 border-emerald-500 rounded-full -left-[6.5px] top-1 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <h4 className="text-emerald-400 font-mono text-xs uppercase mb-2 block tracking-wider">Prologue: The Awakening</h4>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  System logs indicate the subject first gained consciousness in the early days of the Web 2.0 expansion. What began as a simple "Hello World" terminal input slowly metastasized into an obsession with the arcane arts of markup and stylesheets. The early grinding was notoriously brutal—spending nights locked in combat with Internet Explorer rendering bugs and the dreaded DOM hierarchy. But every defeated float layout yielded precious XP.
                </p>
              </div>

              <div className="relative pl-6 border-l border-zinc-800">
                <div className="absolute w-3 h-3 bg-zinc-950 border-2 border-violet-500 rounded-full -left-[6.5px] top-1 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                <h4 className="text-violet-400 font-mono text-xs uppercase mb-2 block tracking-wider">Act I: The Trial of Frameworks</h4>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  After passing the threshold into the modern era, the subject adopted the Class of 'Front-End Sorcerer'. Armed with the Grimoire of React, they learned to cast dynamic components, managing state across sprawling application dungeons. The introduction of TypeScript brought strict typing to their incantations, significantly dropping the error rate of executed spells and making the codebase impervious to standard runtime attacks. 
                </p>
              </div>

              <div className="relative pl-6 border-l border-zinc-800">
                <div className="absolute w-3 h-3 bg-zinc-950 border-2 border-blue-500 rounded-full -left-[6.5px] top-1 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <h4 className="text-blue-400 font-mono text-xs uppercase mb-2 block tracking-wider">Act II: Project 'Life as an RPG'</h4>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  The subject realized that their primary motivation interface (the standard 'To-Do List') was causing severe debuffs to productivity and morale. Thus, the "Life as an RPG" initiative was born. By completely re-skinning reality with an epic Cyberpunk/Fantasy HUD, implementing a global game state manager to track experience points, and creating an achievement system mapping to real-world tasks, the subject successfully bypassed their own brain's executive dysfunction protocols. 
                </p>
              </div>

              <div className="relative pl-6 border-l border-emerald-500">
                <div className="absolute w-3 h-3 bg-emerald-500 border-2 border-emerald-200 rounded-full -left-[6.5px] top-1 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse" />
                <h4 className="text-emerald-400 font-mono text-xs uppercase mb-2 block tracking-wider">Current Objective: Gamify Reality</h4>
                <p className="text-zinc-300 leading-relaxed text-sm backdrop-blur-sm bg-zinc-900/30 p-4 rounded-lg my-2 border border-zinc-800/50">
                  <span className="text-zinc-500 font-mono block mb-1 uppercase text-[10px]">&gt;&gt; Personal Directive Override</span>
                  Having realized that treating "real life" as a series of mundane tasks was heavily nerfing their motivation, the subject installed a permanent augmented perspective. Life is no longer a to-do list; it is a Quest Board. Taxes are timed escort missions. Going to the gym is strength grinding. When not writing code or chronicling these adventures, they are currently farming materials in various RPG realms, calibrating mechanical keyboards for optimal APM, and exploring the vast overworld mapping of local hiking trails.
                </p>
              </div>

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

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-8"
          >
            <h3 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
              <Award className="text-emerald-500" size={20} /> Achievements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.id}
                  className={cn(
                    "flex flex-col gap-2 p-4 rounded-xl border transition-all relative overflow-hidden",
                    achievement.isUnlocked 
                      ? "border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                      : "border-zinc-800 bg-zinc-900/30 opacity-60 grayscale"
                  )}
                >
                  {/* Subtle sweep background for unlocked items */}
                  {achievement.isUnlocked && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent skew-x-[45deg] animate-[gradient_3s_linear_infinite] w-[200%] -left-[50%] pointer-events-none" />
                  )}
                  
                  <div className="flex items-center justify-between z-10 relative">
                    <div className={cn(
                      "p-2 rounded-lg pointer-events-none",
                      achievement.isUnlocked ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-zinc-800 text-zinc-500"
                    )}>
                      {achievement.icon}
                    </div>
                    {achievement.isUnlocked ? (
                      <span className="font-mono text-xs text-emerald-400 flex items-center gap-1"><Unlock size={12} /> UNLOCKED</span>
                    ) : (
                      <span className="font-mono text-xs text-zinc-500 flex items-center gap-1"><Lock size={12} /> LOCKED</span>
                    )}
                  </div>
                  <div className="z-10 relative">
                    <h4 className={cn("font-bold mt-1", achievement.isUnlocked ? "text-zinc-100" : "text-zinc-400")}>{achievement.title}</h4>
                    <p className="text-sm text-zinc-400 mb-1">{achievement.description}</p>
                    {achievement.isUnlocked && (
                      <p className="text-xs text-emerald-500/70 italic mt-2 border-t border-emerald-900/30 pt-2 leading-relaxed">"{achievement.lore}"</p>
                    )}
                    {!achievement.isUnlocked && (
                      <p className="text-xs text-zinc-600 mt-2 border-t border-zinc-800 pt-2 blur-sm select-none">"Hidden lore awaits those who prove themselves worthy in the trials ahead..."</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

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
