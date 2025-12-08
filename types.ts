export enum CraftType {
  KNITTING = 'knitting',
  CROCHET = 'crochet',
}

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum ItemType {
  SCARF = 'scarf',
  VEST = 'vest',
  KIPPAH = 'kippah',
  BASKET = 'basket',
  BEANIE = 'beanie',
  BLANKET = 'blanket',
}

export interface GeneratedPattern {
  title: string;
  description: string;
  difficulty: string;
  timeEstimate: string;
  materials: string[];
  tools: string[];
  abbreviations: { term: string; explanation: string }[];
  steps: {
    phase: string;
    instructions: string[];
  }[];
  tips: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface UserPreferences {
  craftType: CraftType;
  difficulty: Difficulty;
  yarnWeight: string; // e.g., 'Worsted', 'Chunky', 'DK'
}
