import React, { useState } from 'react';
import { motion } from 'motion/react';
import { quests, Quest } from '../data/quests';
import { useGameState } from '../context/GameStateContext';
import { Clock, Star, Gift, CheckCircle, Crosshair, Search } from 'lucide-react';
import { cn } from '../lib/utils';

interface QuestBoardProps {
  onSelectQuest: (quest: Quest) => void;
}

export const QuestBoard = ({ onSelectQuest }: QuestBoardProps) => {
  const { readQuests } = useGameState();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuests = quests.filter(quest => {
    const query = searchQuery.toLowerCase();
    return (
      quest.title.toLowerCase().includes(query) ||
      quest.tags.some(tag => tag.toLowerCase().includes(query)) ||
      quest.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 relative">
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-emerald-500/10 blur-[80px] -z-10 rounded-full" />
        <h1 className="font-mono text-emerald-500 mb-2 flex items-center gap-2 glitch-hover text-sm">
          <Crosshair size={16} /> // ACTIVE MODULE: QUEST BOARD
        </h1>
        <h2 className="text-5xl font-bold tracking-tight text-zinc-100 uppercase mb-4" style={{ textShadow: '0 0 20px rgba(16,185,129,0.3)' }}>
          Available Quests
        </h2>
        <p className="text-zinc-400 text-lg border-l-2 border-emerald-500/50 pl-4 bg-emerald-500/5 py-2 pr-4 mb-8">
          Select a quest to read the log and earn XP. The more you read, the more you level up your real-life stats. 
        </p>

        <div className="relative z-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-emerald-500/50" />
          </div>
          <input
            type="text"
            className="w-full bg-zinc-900/80 border border-zinc-800 text-zinc-100 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono text-sm placeholder:text-zinc-600 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            placeholder="Search quests by title, tag, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredQuests.length > 0 ? (
          filteredQuests.map((quest, index) => {
            const isCompleted = readQuests.includes(quest.id);

            return (
              <motion.div 
                key={quest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectQuest(quest)}
                className={cn(
                  "group relative border border-zinc-800 bg-zinc-900/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-emerald-500/50 hover:bg-zinc-900",
                  isCompleted && "opacity-75 border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/30",
                  !isCompleted && "shadow-[0_10px_30px_-15px_rgba(16,185,129,0.2)] hover:shadow-[0_10px_40px_-12px_rgba(16,185,129,0.3)] hover:-translate-y-1"
                )}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <span className="font-mono text-8xl font-black italic text-emerald-500/50 -mr-4 -mt-8 block pointer-events-none select-none">
                    0{index + 1}
                  </span>
                </div>

                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 relative z-10">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={cn(
                        "text-xs font-mono px-2 py-1 rounded bg-zinc-950 border",
                        isCompleted ? "text-zinc-500 border-zinc-800" : "text-emerald-400 border-emerald-900/50 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                      )}>
                        {quest.category}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                        <Clock size={12} /> {quest.readTime}
                      </span>
                      {isCompleted && (
                        <span className="text-xs text-emerald-500 font-mono flex items-center gap-1 ml-auto border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 rounded">
                          <CheckCircle size={12} /> CLEARED
                        </span>
                      )}
                    </div>

                    <h3 className={cn(
                      "text-2xl font-bold mb-3 tracking-tight group-hover:text-emerald-400 transition-colors uppercase",
                      isCompleted && "text-zinc-300 group-hover:text-zinc-100"
                    )}>
                      {quest.title}
                    </h3>
                    
                    <p className="text-zinc-400 leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors">
                      {quest.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                      {quest.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800/50">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={cn(
                    "md:w-36 flex flex-col justify-center items-center p-4 bg-zinc-950/80 rounded-xl border transition-all shrink-0 relative overflow-hidden",
                    isCompleted ? "border-zinc-800/50" : "border-emerald-500/20 group-hover:bg-emerald-500/5 group-hover:border-emerald-500/50"
                    )}>
                    {!isCompleted && <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] group-hover:animate-[gradient_3s_linear_infinite]" />}
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 mb-2 z-10">REWARD</span>
                    <div className={cn(
                      "font-mono text-2xl font-bold flex flex-col items-center gap-1 z-10",
                      isCompleted ? "text-zinc-500" : "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    )}>
                      +{quest.xpReward} 
                      <span className="text-[10px] text-zinc-500 font-normal">XP</span>
                    </div>
                    {!isCompleted && <Gift className="mt-4 text-emerald-500/50 group-hover:text-emerald-400 transition-colors z-10 group-hover:scale-110 duration-300" size={24} />}
                    {isCompleted && <Star className="mt-4 text-zinc-600 z-10" size={24} />}
                  </div>

                </div>

                {/* Progress bar effect on bottom for incomplete quests on hover */}
                {!isCompleted && (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-500/0 group-hover:bg-emerald-500/100 w-0 group-hover:w-full transition-all duration-700 ease-out z-20" />
                )}
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-12 border border-zinc-800 rounded-xl bg-zinc-900/50">
            <Search className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
            <h3 className="text-xl font-bold text-zinc-300 mb-2 font-mono">NO QUESTS FOUND</h3>
            <p className="text-zinc-500">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
