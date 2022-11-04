export type GameSettings = {
  gridLength: number;
  exactlyWords: number;
  maxWordLength: number;
  hint: HintType;
  difficult: Difficult;
};

export enum Difficult {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
  EXPERT = "Expert",
}

export type HintType = 'full' | 'half' | 'hidden';

export const GameSettings: { [difficult in Difficult]: GameSettings } = {
  [Difficult.EASY]: {
    exactlyWords: 7,
    gridLength: 7,
    maxWordLength: 7,
    hint: "full",
    difficult: Difficult.EASY,
  },
  [Difficult.MEDIUM]: {
    exactlyWords: 11,
    gridLength: 11,
    maxWordLength: 10,
    hint: "full",
    difficult: Difficult.MEDIUM,
  },
  [Difficult.HARD]: {
    exactlyWords: 11,
    gridLength: 11,
    maxWordLength: 10,
    hint: "half",
    difficult: Difficult.HARD,
  },
  [Difficult.EXPERT]: {
    exactlyWords: 11,
    gridLength: 11,
    maxWordLength: 10,
    hint: "hidden",
    difficult: Difficult.EXPERT
  },
};
