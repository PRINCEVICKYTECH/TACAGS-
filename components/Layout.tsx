import React from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';
import { APP_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  onHomeClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onHomeClick }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-emerald-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={onHomeClick}
          >
            <div className="bg-white p-1.5 rounded-lg">
              <GraduationCap className="h-6 w-6 text-emerald-700" />
            </div>
            <span className="font-bold text-xl tracking-tight">{APP_NAME}</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium opacity-90">
            <button onClick={onHomeClick} className="hover:text-emerald-200 transition-colors">Classes</button>
            <button className="hover:text-emerald-200 transition-colors">Curriculum</button>
            <button className="hover:text-emerald-200 transition-colors">About</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">&copy; {new Date().getFullYear()} {APP_NAME}. Powered by Google Gemini.</p>
          <p className="text-xs text-slate-600">
            Content is generated based on the Nigerian Educational Curriculum. 
            Always cross-reference with your recommended textbooks (New General Mathematics, Modern Biology, etc.).
          </p>
        </div>
      </footer>
    </div>
  );
};