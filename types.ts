export enum ClassLevel {
  JSS1 = 'JSS1',
  JSS2 = 'JSS2',
  JSS3 = 'JSS3',
  SS1 = 'SS1',
  SS2 = 'SS2',
  SS3 = 'SS3'
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  category: 'Science' | 'Arts' | 'Commercial' | 'General';
}

export interface Topic {
  id: string;
  title: string;
  description: string;
}

export interface StudyNote {
  topic: string;
  subject: string;
  classLevel: ClassLevel;
  content: string; // Markdown content
  timestamp: number;
}

export type ViewState = 
  | { type: 'HOME' }
  | { type: 'SUBJECT_SELECT'; classLevel: ClassLevel }
  | { type: 'TOPIC_SELECT'; classLevel: ClassLevel; subject: Subject }
  | { type: 'NOTE_VIEW'; classLevel: ClassLevel; subject: Subject; topic: string; noteContent?: string };
