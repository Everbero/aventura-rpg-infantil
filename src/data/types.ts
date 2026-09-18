export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export type DiceOutcome = {
  title: string;
  text: string;
  stars: number;
  mood: "twist" | "help" | "retry" | "success" | "treasure" | "magic";
};

export type Choice = {
  label: string;
  description: string;
  icon: string;
  next: string;
};

export type SceneArt = {
  emoji: string;
  secondaryEmoji?: string;
  sky: string;
  ground: string;
  accent: string;
};

export type Scene = {
  id: string;
  title: string;
  subtitle: string;
  narration: string;
  challenge: string;
  parentPrompt: string;
  art: SceneArt;
  image?: string;
  outcomes: Record<DiceValue, DiceOutcome>;
  choices: Choice[];
  final?: boolean;
};

export type Adventure = {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  recommendedAge: string;
  startScene: string;
  scenes: Record<string, Scene>;
};
