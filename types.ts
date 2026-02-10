
export interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  color: 'emerald' | 'sky';
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
}

export interface AIScoreResult {
  score: number;
  feedback: string;
  recommendations: string[];
}
