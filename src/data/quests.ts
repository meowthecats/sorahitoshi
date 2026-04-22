export type QuestCategory = 'Main Story' | 'Side Quest' | 'Daily Check-in' | 'Boss Fight';

export interface Quest {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: QuestCategory;
  xpReward: number;
  readTime: string;
  imageSeed: string;
  tags: string[];
}

export const quests: Quest[] = [
  {
    id: "procrastination-boss",
    title: "The Final Boss of Procrastination",
    excerpt: "How I stopped running from the looming deadline and finally equipped the 'Focus' buff.",
    content: `
# Entering the Boss Arena

We've all been there. The music swells, the door locks behind you, and there it is: The Deadline. It has a massive health bar, and you're armed with nothing but a half-empty cup of coffee and three hours of sleep. 

For weeks, I had been completing "Side Quests" (laundry, reorganizing my bookshelf by color, watching lore videos for games I don't even play). Anything to avoid the main objective. 

## The Turning Point

I realized my strategy was flawed. I was trying to tank the boss head-on. But you don't beat a boss by mashing buttons; you learn its patterns.

1. **Equip the Right Gear:** Put away the phone. Close the 42 browser tabs. 
2. **Buff Yourself:** A glass of water. A comfortable chair. Lofi beats playing in the background (-10% Stress Damage).
3. **Attack in Phases:** The Pomodoro technique. 25 minutes of sustained DPS (Damage Per Second), followed by a 5-minute dodge roll (rest).

When I finally defeated the task, the loot drop wasn't physical. It was that sweet, sweet dopamine of a clear mental inventory.

Lesson learned: Sometimes the only way out is through. Equip your focus, watch your stamina, and start swinging.
    `,
    date: "2024-05-15",
    category: "Boss Fight",
    xpReward: 500,
    readTime: "4 min",
    imageSeed: "dungeon",
    tags: ["Productivity", "Mindset"]
  },
  {
    id: "leveling-morning-routine",
    title: "Leveling Up My Morning Routine",
    excerpt: "Optimizing the first hour of the day is like spending skill points in the right tree.",
    content: `
# Respawning Properly

For a long time, my morning routine felt like spawning into a hostile zone with zero health and no weapons. The alarm would blare, I'd scramble to hit snooze (the ultimate stun mechanic), and eventually roll out of bed feeling like I'd just lost a PvP match against my own sheets.

## Respeccing My Stats

I decided to respect my morning skill tree. I needed buffs that scaled into the late game (afternoon).

- **The Hydration Potion:** Drinking a full glass of water immediately upon waking. +20 to Vitality.
- **The Starlight Buff:** Getting 10 minutes of sunlight before looking at a screen. Removes the 'Grogginess' debuff.
- **The Grimoire of Intentions:** Journaling for 5 minutes. Grants 'Clarity of Mind', preventing random aggro from stray thoughts later in the day.

It wasn't easy at first. The initial grind was tough. But just like grinding low-level mobs, consistency yields levels. Now, my mornings feel like a well-oiled speedrun strategy.
    `,
    date: "2024-05-20",
    category: "Main Story",
    xpReward: 300,
    readTime: "3 min",
    imageSeed: "sunrise,fantasy",
    tags: ["Habits", "Health"]
  },
  {
    id: "social-anxiety-stealth",
    title: "Treating Social Events Like A Stealth Mission",
    excerpt: "Sometimes navigating a crowded party feels like sneaking past high-level guards. Here's my survival guide.",
    content: `
# Infiltration: The Networking Event

"Must have been the wind," you hope they say, as you accidentally bump into the appetizer table.

Going to social events when your Social Energy meter is depleted is essentially a stealth mission. Your objective? Make a few meaningful connections without triggering the 'Burnout' alarm.

## Tactical Espionage Socializing

1. **Scout the Perimeter:** Find the quiet zones. The balcony, the corner couch, the pet dog. These are your save points.
2. **Equip the 'Listener' Perk:** People love talking about themselves. Ask open-ended questions. It takes the pressure off you to perform and generates rapport points quickly.
3. **Know Your Exits:** It's okay to extract. Have a clear, polite exit strategy. "I need to grab some water," or "It was great meeting you, I'm going to say hi to a friend." 

You don't need to clear the whole map. Sometimes, finding one good piece of loot (a fun conversation) and leaving quietly is a successful run.
    `,
    date: "2024-05-28",
    category: "Side Quest",
    xpReward: 200,
    readTime: "5 min",
    imageSeed: "shadow,cyberpunk",
    tags: ["Introversion", "Social"]
  },
  {
    id: "daily-grind-appreciation",
    title: "Finding the Beauty in the Daily Grind",
    excerpt: "Why the repetitive 'fetch quests' of life are actually where the real character development happens.",
    content: `
# The Beauty of the Grind

In RPGs, grinding is often seen as a chore. But there's a zen state you reach when you're just harvesting resources or leveling up a crafting skill. 

Real life has fetch quests too: doing the dishes, commuting, folding laundry.

## Changing the HUD

Instead of viewing these as obstacles before the "real game" begins, I started treating them as the gameplay itself.

When I wash dishes, I listen to a podcast (Lore Expansion). When I commute, I practice mindfulness (Spirit Leveling). 

The trick is shifting your UI to show these small actions as accomplishments. They aren't preventing you from living; they are the fabric of living. Every clean plate is a +1 to your 'Environment' stat.
    `,
    date: "2024-06-02",
    category: "Daily Check-in",
    xpReward: 100,
    readTime: "2 min",
    imageSeed: "coffee,cozy",
    tags: ["Mindfulness", "Perspective"]
  }
];
