import { ClassLevel, Subject } from './types';

export const CLASSES = [
  { id: ClassLevel.JSS1, label: 'JSS 1', description: 'Junior Secondary School 1' },
  { id: ClassLevel.JSS2, label: 'JSS 2', description: 'Junior Secondary School 2' },
  { id: ClassLevel.JSS3, label: 'JSS 3', description: 'Junior Secondary School 3' },
  { id: ClassLevel.SS1, label: 'SS 1', description: 'Senior Secondary School 1' },
  { id: ClassLevel.SS2, label: 'SS 2', description: 'Senior Secondary School 2' },
  { id: ClassLevel.SS3, label: 'SS 3', description: 'Senior Secondary School 3' },
];

export const SUBJECTS: Subject[] = [
  // General (JSS)
  { id: 'math', name: 'Mathematics', icon: 'Calculator', category: 'General' },
  { id: 'eng', name: 'English Language', icon: 'BookOpen', category: 'General' },
  { id: 'bsc', name: 'Basic Science', icon: 'FlaskConical', category: 'General' },
  { id: 'btech', name: 'Basic Technology', icon: 'Wrench', category: 'General' },
  { id: 'civic', name: 'Civic Education', icon: 'Users', category: 'General' },
  { id: 'soc', name: 'Social Studies', icon: 'Globe', category: 'General' },
  { id: 'agric', name: 'Agricultural Science', icon: 'Sprout', category: 'General' },
  { id: 'comp', name: 'Computer Studies', icon: 'Monitor', category: 'General' },
  
  // Senior (Science)
  { id: 'phy', name: 'Physics', icon: 'Atom', category: 'Science' },
  { id: 'chem', name: 'Chemistry', icon: 'FlaskRound', category: 'Science' },
  { id: 'bio', name: 'Biology', icon: 'Dna', category: 'Science' },
  
  // Senior (Arts/Commercial)
  { id: 'lit', name: 'Literature in English', icon: 'Feather', category: 'Arts' },
  { id: 'govt', name: 'Government', icon: 'Landmark', category: 'Arts' },
  { id: 'econ', name: 'Economics', icon: 'TrendingUp', category: 'Commercial' },
  { id: 'comm', name: 'Commerce', icon: 'Briefcase', category: 'Commercial' },
  { id: 'acc', name: 'Financial Accounting', icon: 'Calculator', category: 'Commercial' },
  { id: 'crs', name: 'C.R.S', icon: 'Book', category: 'Arts' },
];

export const APP_NAME = "TACAGS LEARN";