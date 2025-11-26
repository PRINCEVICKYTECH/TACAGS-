import React from 'react';
import { ClassLevel, Subject } from '../types';
import { SUBJECTS } from '../constants';
import * as Icons from 'lucide-react';

interface SubjectSelectorProps {
  classLevel: ClassLevel;
  onSelectSubject: (s: Subject) => void;
  onBack: () => void;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({ classLevel, onSelectSubject, onBack }) => {
  
  // Filter subjects based on class level (simplified logic)
  // JSS only has General. SS has all categories.
  const isJSS = classLevel.startsWith('JSS');
  
  const filteredSubjects = SUBJECTS.filter(s => {
    if (isJSS) return s.category === 'General';
    // For SS, show all except maybe strict JSS subjects if we wanted to be very precise, 
    // but for this MVP, assume SS students might want to review basic sciences too, or strict separation.
    // Let's hide 'Basic Science' etc from SS for cleaner UX.
    if (!isJSS && (s.name.includes('Basic') || s.name === 'Social Studies')) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <Icons.ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{classLevel} Subjects</h2>
          <p className="text-sm text-slate-500">Select a subject to view topics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSubjects.map((subject) => {
          // Dynamic Icon Rendering
          const IconComponent = (Icons as any)[subject.icon] || Icons.Book;

          return (
            <button
              key={subject.id}
              onClick={() => onSelectSubject(subject)}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 hover:-translate-y-1 transition-all gap-3 text-center h-40"
            >
              <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                <IconComponent className="h-6 w-6" />
              </div>
              <span className="font-semibold text-slate-800 leading-tight">{subject.name}</span>
              <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-500 uppercase font-medium tracking-wider text-[10px]">
                {subject.category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
