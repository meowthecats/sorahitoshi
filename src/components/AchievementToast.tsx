import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Trophy } from 'lucide-react';

interface AchievementToastProps {
  show: boolean;
  xpAmount: number;
  message: string;
  isLevelUp?: boolean;
  onClose: () => void;
}

export const AchievementToast = ({ show, xpAmount, message, isLevelUp = false, onClose }: AchievementToastProps) => {
  
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, isLevelUp ? 5000 : 3500); // Level ups stay longer
      return () => clearTimeout(timer);
    }
  }, [show, isLevelUp, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="bg-zinc-900 border border-emerald-500/50 shadow-[0_10px_40px_rgba(16,185,129,0.3)] rounded-2xl p-4 pr-12 flex items-center gap-4 overflow-hidden relative min-w-[300px]">
            {/* Dynamic sweep effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shrink-0 relative z-10">
              {isLevelUp ? (
                <Trophy className="text-emerald-400" size={24} />
              ) : (
                <Zap className="text-emerald-400" size={24} />
              )}
            </div>
            
            <div className="relative z-10">
              <h4 className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">
                {isLevelUp ? "Level Up!" : "Quest Complete"}
              </h4>
              <p className="font-bold text-zinc-100 text-sm">{message}</p>
              {!isLevelUp && (
                <p className="text-xs text-zinc-400 mt-1">+{xpAmount} XP gained</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
