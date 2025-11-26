import React from 'react';
import { ClassLevel } from '../types';
import { CLASSES } from '../constants';
import { ChevronRight, School } from 'lucide-react';

interface ClassSelectorProps {
  onSelectClass: (c: ClassLevel) => void;
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({ onSelectClass }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-slate-800">Select Your Class</h2>
        <p className="text-slate-600 max-w-xl mx-auto">
          Choose your current level to access tailored study notes and curriculum-based content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CLASSES.map((cls) => (
          <button
            key={cls.id}
            onClick={() => onSelectClass(cls.id)}
            className="group relative flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-500 transition-all text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 bg-emerald-50 rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <School className="h-5 w-5 text-emerald-600" />
              </div>
              <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">{cls.label}</h3>
            <p className="text-sm text-slate-500">{cls.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
