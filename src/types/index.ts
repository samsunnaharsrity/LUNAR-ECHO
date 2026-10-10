export type PageId =
  | 'home'
  | 'mission'
  | 'reflector'
  | 'laser-lab'
  | 'data-explorer'
  | 'science'
  | 'learn'
  | 'quiz'
  | 'about'
  | 'sources'
  | 'glossary';

export type DataSourceType = 'REAL_SOURCE_DATA' | 'EDUCATIONAL_SIMULATION' | 'DEMO_DATA';

export interface LLRObservationRecord {
  id: string;
  timestamp: string; // ISO format or UTC date string
  year: number;
  stationName: string;
  stationId: string;
  target: 'Apollo 11' | 'Apollo 14' | 'Apollo 15' | 'Lunokhod 1' | 'Lunokhod 2';
  roundTripSeconds: number; // two-way transit time in seconds (e.g. ~2.564)
  rangeMeters: number; // calculated one-way distance in meters
  rangeKm: number;
  residualPicoseconds: number; // precision / residual in picoseconds
  photonsDetected: number; // single photon returns per normal point
  laserWavelengthNm: number; // 532 nm typical Nd:YAG
  sourceType: DataSourceType;
  datasetCitation: string;
}

export interface ExperimentTrial {
  trialNumber: number;
  timestamp: string;
  distanceKm: number;
  studentPredictionSeconds: number;
  calculatedTimeSeconds: number;
  deltaMilliseconds: number;
  status: 'SIMULATED';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  objectives: string[];
  contentSections: {
    heading: string;
    body: string[];
    keyTakeaway?: string;
  }[];
  activity: {
    type: 'calculation' | 'matching' | 'investigation';
    title: string;
    instructions: string;
    initialData: Record<string, any>;
  };
  reviewQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    feedback: string;
  }[];
}

export interface GlossaryTerm {
  term: string;
  category: 'Optics' | 'Astronomy' | 'Instruments' | 'Data Science' | 'Relativity';
  definition: string;
  relevanceToLLR: string;
  sourceCitation: string;
}
