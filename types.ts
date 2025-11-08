export interface CoreReadings {
  soulUrge: number;
  personality: number;
  birthday: number;
  maturity: number;
  hiddenPassion: number[];
  challengeNumbers: {
    first: number;
    second: number;
    main: number;
    fourth: number;
  };
  karmicDebt: number[];
  personalYear: number;
  personalMonth: number;
  personalDay: number;
}

export interface AdvancedReadings {
  ascendantBasedNumber: number;
  planetaryRuling: {
    planet: string;
    number: number;
  };
  rulingNumber: number;
}

export interface Contact {
  id: number;
  fullName: string;
  birthdate: string; // YYYY-MM-DD
  birthTime?: string; // HH:MM
  email: string;
  lifePath: number;
  expression: number;
  score: number;
  readings: CoreReadings;
  advancedReadings?: AdvancedReadings;
  aiSummary?: string;
  aiBios?: string;
}

export enum View {
  Home = 'home',
  List = 'list',
  Add = 'add',
  Detail = 'detail',
  Readings = 'readings',
  Report = 'report',
  Edit = 'edit',
}