import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GameState {
  xp: number;
  level: number;
  readQuests: string[];
  gainXP: (amount: number, questId: string) => void;
  resetProgress: () => void;
}

const GameStateContext = createContext<GameState | undefined>(undefined);

const XP_PER_LEVEL = 1000;

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [xp, setXp] = useState(0);
  const [readQuests, setReadQuests] = useState<string[]>([]);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    // Load from local storage on mount
    const savedXp = localStorage.getItem('blog-xp');
    const savedQuests = localStorage.getItem('blog-quests');
    if (savedXp) setXp(parseInt(savedXp, 10));
    if (savedQuests) setReadQuests(JSON.parse(savedQuests));
  }, []);

  useEffect(() => {
    // Calculate level based on XP
    const newLevel = Math.floor(xp / XP_PER_LEVEL) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
    }
    
    // Save to local storage
    localStorage.setItem('blog-xp', xp.toString());
    localStorage.setItem('blog-quests', JSON.stringify(readQuests));
  }, [xp, readQuests, level]);

  const gainXP = (amount: number, questId: string) => {
    if (!readQuests.includes(questId)) {
      setXp((prev) => prev + amount);
      setReadQuests((prev) => [...prev, questId]);
    }
  };

  const resetProgress = () => {
    setXp(0);
    setReadQuests([]);
    setLevel(1);
    localStorage.removeItem('blog-xp');
    localStorage.removeItem('blog-quests');
  };

  return (
    <GameStateContext.Provider value={{ xp, level, readQuests, gainXP, resetProgress }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};
