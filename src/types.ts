export type DayOfWeekName =
  | "Domingo"
  | "Segunda-feira"
  | "Terça-feira"
  | "Quarta-feira"
  | "Quinta-feira"
  | "Sexta-feira"
  | "Sábado";

export type NatureCategory =
  | "montanhas"
  | "floresta"
  | "porsol"
  | "lago"
  | "cachoeira"
  | "flores"
  | "ceu"
  | "campo";

export type DevotionalCategory =
  | "Paz"
  | "Coragem"
  | "Gratidão"
  | "Recomeço"
  | "Esperança"
  | "Família"
  | "Para dormir";

export interface DailyReflection {
  id: string;
  dayOfWeekCode: number; // 0 = Domingo, 1 = Segunda, etc.
  dayOfWeekName: DayOfWeekName;
  title: string;
  theme: string;
  verseText: string;
  verseReference: string; // Ex: "Salmos 23:1 ARA"
  reflectionText: string;
  prayer: string;
  practicalAction: string;
  bgCategory: NatureCategory;
  bgImageUrl: string;
  bgLocation: string;
  photographerCredit?: string;
  tags: string[];
  dateKey?: string;
  category?: DevotionalCategory;
  dayOfYear?: number;
}

export interface NatureImageOption {
  id: string;
  title: string;
  category: NatureCategory;
  url: string;
  location: string;
}

export interface SavedFavorite {
  id: string;
  reflection: DailyReflection;
  savedAt: string;
  userNote?: string;
}

export interface SoundtrackOption {
  id: string;
  name: string;
  description: string;
  type: "rain" | "forest" | "ocean" | "river" | "wind" | "birds" | "piano";
}
