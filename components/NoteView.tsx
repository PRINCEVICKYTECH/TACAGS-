import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ClassLevel, Subject } from '../types';
import { generateStudyNotes } from '../services/gemini';
import { ArrowLeft, Download, Loader2, Share2 } from 'lucide-react';

interface NoteViewProps {
  topic: string;
  subject: Subject;
  classLevel: ClassLevel;
  onBack: () => void;
}

export const NoteView: React.FC<NoteViewProps> = ({ topic, subject, classLevel, onBack }) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchNotes = async () => {
      setLoading(true);
      const notes = await generateStudyNotes(topic, subject, classLevel);
      if (mounted) {
        setContent(notes);
        setLoading(false);
      }
    };
    fetchNotes();
    return () => { mounted = false; };
  }, [topic, subject, classLevel]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
       <div className="flex items-center justify-between mb-6">
         <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 -ml-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors no-print"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold mb-1">
                <span>{classLevel}</span>
                <span>•</span>
                <span>{subject.name}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">{topic}</h1>
            </div>
         </div>
         
         {!loading && (
           <div className="flex gap-2 no-print">
             <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
             >
               <Download className="h-4 w-4" />
               <span className="hidden sm:inline">Save PDF</span>
             </button>
           </div>
         )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-6">
           <div className="relative">
             <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-75"></div>
             <div className="relative bg-white p-4 rounded-full border-2 border-emerald-100">
                <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
             </div>
           </div>
           <div className="space-y-2">
             <h3 className="text-lg font-semibold text-slate-800">Generating Study Notes...</h3>
             <p className="text-slate-500 max-w-md mx-auto">
               Our AI teacher is writing detailed notes for <strong>{topic}</strong> according to the Nigerian curriculum. This may take a few seconds.
             </p>
           </div>
        </div>
      ) : (
        <article className="prose prose-slate prose-lg md:prose-xl max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-emerald-800 mb-6 pb-2 border-b border-emerald-100" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-3" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 text-slate-700" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-2 text-slate-700" {...props} />,
              li: ({node, ...props}) => <li className="pl-1" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 italic bg-emerald-50 rounded-r text-slate-700 my-4" {...props} />,
              code: ({node, ...props}) => <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-slate-900" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      )}
    </div>
  );
};
