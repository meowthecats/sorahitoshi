import React, { useState, useEffect, useRef } from 'react';
import { GameStateProvider, useGameState } from './context/GameStateContext';
import { HUD } from './components/HUD';
import { QuestBoard } from './components/QuestBoard';
import { QuestDetail } from './components/QuestDetail';
import { PlayerProfile } from './components/PlayerProfile';
import { AchievementToast } from './components/AchievementToast';
import { Quest } from './data/quests';
import { motion, AnimatePresence } from 'motion/react';

type ViewState = 
  | { type: 'board' }
  | { type: 'quest', quest: Quest }
  | { type: 'profile' };

function AppContent() {
  const [view, setView] = useState<ViewState>({ type: 'board' });
  const [toastConfig, setToastConfig] = useState<{ show: boolean, message: string, xp: number, isLevelUp: boolean }>({ show: false, message: '', xp: 0, isLevelUp: false });
  const { level, xp } = useGameState();
  
  const prevLevelRef = useRef(level);
  const prevXpRef = useRef(xp);

  useEffect(() => {
    if (level > prevLevelRef.current) {
      // Level Up!
      setToastConfig({
        show: true,
        message: `You've reached Level ${level}!`,
        xp: 0,
        isLevelUp: true
      });
    } else if (xp > prevXpRef.current) {
      // XP Gained
      const gained = xp - prevXpRef.current;
      setToastConfig({
        show: true,
        message: 'Knowledge Acquired',
        xp: gained,
        isLevelUp: false
      });
    }
    prevLevelRef.current = level;
    prevXpRef.current = xp;
  }, [xp, level]);

  const closeToast = () => setToastConfig(prev => ({ ...prev, show: false }));

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 overflow-x-hidden relative">
      {/* Dynamic Backgound Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />
      
      {/* Epic background elements */}
      <div className="fixed inset-0 pointer-events-none pb-10 z-0">
        <div className="bg-grid-moving opacity-40" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px]" />
        {/* Scan lines effect overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-30 mask-image:linear-gradient(to bottom, black, transparent)" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-7xl mx-auto">
        <HUD 
          currentView={view.type} 
          onNavigate={(v) => setView({ type: v })} 
        />
        
        <main className="flex-1 relative min-h-screen w-full">
          <AnimatePresence mode="wait">
            {view.type === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="w-full absolute inset-0"
              >
                <PlayerProfile />
              </motion.div>
            )}

            {view.type === 'quest' && (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full absolute inset-0"
              >
                <QuestDetail 
                  quest={view.quest} 
                  onBack={() => setView({ type: 'board' })} 
                  onComplete={() => {}} 
                />
              </motion.div>
            )}

            {view.type === 'board' && (
              <motion.div
                key="board"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full absolute inset-0"
              >
                <QuestBoard onSelectQuest={(q) => setView({ type: 'quest', quest: q })} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <AchievementToast 
        show={toastConfig.show}
        xpAmount={toastConfig.xp}
        message={toastConfig.message}
        isLevelUp={toastConfig.isLevelUp}
        onClose={closeToast}
      />
    </div>
  );
}

export default function App() {
  return (
    <GameStateProvider>
      <AppContent />
    </GameStateProvider>
  );
}
