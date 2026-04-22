import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { Shield, Zap, BookOpen, User, Trophy, LayoutGrid } from 'lucide-react';
import { cn } from '../lib/utils';

const XP_PER_LEVEL = 1000;

interface HUDProps {
  currentView: 'board' | 'quest' | 'profile';
  onNavigate: (view: 'board' | 'profile') => void;
}

export const HUD = ({ currentView, onNavigate }: HUDProps) => {
  const { xp, level, readQuests } = useGameState();
  
  const xpCurrentLevel = xp % XP_PER_LEVEL;
  const progressPercentage = (xpCurrentLevel / XP_PER_LEVEL) * 100;

  return (
    <aside className="w-full md:w-64 md:h-screen md:sticky top-0 p-6 flex flex-col border-r border-zinc-800 bg-zinc-950/70 backdrop-blur z-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-zinc-900 shadow-[0_0_15px_rgba(16,185,129,0.3)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors" />
          <User className="text-emerald-500 relative z-10" size={32} />
        </div>
        <div>
          <h2 className="font-bold text-xl tracking-tight text-zinc-100 glitch-hover">Wanderer</h2>
          <div className="text-sm font-mono text-emerald-400 flex items-center gap-1">
            <Shield size={14} /> Lvl {level}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
          <span>XP</span>
          <span>{xpCurrentLevel} / {XP_PER_LEVEL}</span>
        </div>
        <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <nav className="space-y-4 mb-10">
        <h3 className="text-xs font-mono text-zinc-600 uppercase tracking-wider mb-4 border-b border-zinc-800/50 pb-2">Navigation</h3>
        <button
          onClick={() => onNavigate('board')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all duration-200",
            (currentView === 'board' || currentView === 'quest') 
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]" 
              : "text-zinc-400 hover:bg-zinc-900 border border-transparent hover:text-zinc-200"
          )}
        >
          <LayoutGrid size={16} />
          QUEST BOARD
        </button>
        <button
          onClick={() => onNavigate('profile')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all duration-200",
            currentView === 'profile'
              ? "bg-violet-500/10 text-violet-400 border border-violet-500/20 shadow-[inset_0_0_20px_rgba(139,92,246,0.05)]" 
              : "text-zinc-400 hover:bg-zinc-900 border border-transparent hover:text-zinc-200"
          )}
        >
          <User size={16} />
          PLAYER PROFILE
        </button>
      </nav>

      <div className="space-y-6 flex-1">
        <div>
          <h3 className="text-xs font-mono text-zinc-600 uppercase tracking-wider mb-4 border-b border-zinc-800/50 pb-2">Player Stats</h3>
          <ul className="space-y-4 px-2">
            <StatItem icon={<BookOpen size={16} />} label="Quests Read" value={readQuests.length} />
            <StatItem icon={<Zap size={16} />} label="Total XP" value={xp} />
            <StatItem icon={<Trophy size={16} />} label="Rank" value={getRankName(level)} />
          </ul>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-zinc-800">
        <div className="text-xs font-mono text-zinc-600 flex justify-between items-center px-2">
          <span>SYSTEM ONLINE</span>
          <span className="animate-pulse w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]"></span>
        </div>
      </div>
    </aside>
  );
};

const StatItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
  <li className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2 text-zinc-400">
      <span className="text-emerald-500/50">{icon}</span>
      <span>{label}</span>
    </div>
    <span className="font-mono text-zinc-200">{value}</span>
  </li>
);

function getRankName(level: number): string {
  if (level < 2) return 'Novice';
  if (level < 5) return 'Apprentice';
  if (level < 10) return 'Adept';
  return 'Master';
}
