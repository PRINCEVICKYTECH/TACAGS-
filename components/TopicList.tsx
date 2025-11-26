import React, { useEffect, useState } from 'react';
import { ClassLevel, Subject } from '../types';
import { generateSyllabusTopics } from '../services/gemini';
import { ArrowLeft, BookText, Loader2, Sparkles, Search, X } from 'lucide-react';

interface TopicListProps {
  classLevel: ClassLevel;
  subject: Subject;
  onSelectTopic: (topic: string) => void;
  onBack: () => void;
}

export const TopicList: React.FC<TopicListProps> = ({ classLevel, subject, onSelectTopic, onBack }) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    
    const fetchTopics = async () => {
      setLoading(true);
      setError(false);
      try {
        const fetchedTopics = await generateSyllabusTopics(subject, classLevel);
        if (mounted) {
          setTopics(fetchedTopics);
        }
      } catch (e) {
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTopics();

    return () => {
      mounted = false;
    };
  }, [classLevel, subject]);

  const filteredTopics = topics.filter(topic => 
    topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-3 mb-8">
         <button 
          onClick={onBack}
          className="p-2 -ml-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{subject.name} Syllabus</h2>
          <p className="text-slate-500">Suggested topics for {classLevel} Curriculum</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
          <p className="text-sm font-medium animate-pulse">Consulting the curriculum...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">Could not load topics.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-emerald-600 underline"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid gap-3">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectTopic(topic)}
                  className="flex items-center p-4 bg-white border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left group"
                >
                  <div className="flex-shrink-0 h-8 w-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mr-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors text-sm font-bold">
                    {idx + 1}
                  </div>
                  <span className="font-medium text-slate-700 group-hover:text-slate-900 flex-grow">
                    {topic}
                  </span>
                  <BookText className="h-4 w-4 text-slate-300 group-hover:text-emerald-500" />
                </button>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                <Search className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No topics found matching "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-emerald-600 text-sm mt-2 hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </>
      )}
      
      {!loading && !searchQuery && (
        <div className="mt-8 bg-indigo-50 p-4 rounded-lg flex items-start gap-3 text-sm text-indigo-800">
          <Sparkles className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <p>
            Can't find a topic? These are AI-suggested based on the standard syllabus. 
            You can select a broader topic above to get started.
          </p>
        </div>
      )}
    </div>
  );
};