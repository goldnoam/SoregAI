import React, { useState, useEffect } from 'react';
import { PatternGenerator } from './components/PatternGenerator';
import { PatternCard } from './components/PatternCard';
import { BookOpen, Bookmark, Heart, PlusCircle } from 'lucide-react';
import { GeneratedPattern } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'saved'>('create');
  const [savedPatterns, setSavedPatterns] = useState<(GeneratedPattern & { id: number })[]>([]);

  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem('soreg_saved_patterns') || '[]');
    setSavedPatterns(loaded);
  }, [activeTab]);

  const handleDelete = (id: number) => {
    const updated = savedPatterns.filter(p => p.id !== id);
    localStorage.setItem('soreg_saved_patterns', JSON.stringify(updated));
    setSavedPatterns(updated);
  };

  return (
    <div className="min-h-screen bg-wool-50 text-stone-800 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-wool-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-wool-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-inner">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M12 2v20"/><path d="m4.93 4.93 14.14 14.14"/><path d="m19.07 4.93-14.14 14.14"/></svg>
            </div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-wool-900 tracking-tight">Soreg.ai</h1>
          </div>

          <nav className="flex gap-1 bg-stone-100 p-1 rounded-2xl">
            <button 
              onClick={() => setActiveTab('create')}
              className={`flex items-center gap-2 px-4 md:px-6 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${activeTab === 'create' ? 'bg-white shadow-sm text-wool-700' : 'text-stone-500 hover:text-stone-700'}`}
            >
              <PlusCircle size={16} />
              <span>יצירה</span>
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 px-4 md:px-6 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${activeTab === 'saved' ? 'bg-white shadow-sm text-wool-700' : 'text-stone-500 hover:text-stone-700'}`}
            >
              <Bookmark size={16} />
              <span>שמורים</span>
              {savedPatterns.length > 0 && (
                <span className="bg-wool-100 text-wool-700 px-1.5 py-0.5 rounded-full text-[10px]">{savedPatterns.length}</span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12 w-full">
        {activeTab === 'create' ? (
          <PatternGenerator />
        ) : (
          <div className="space-y-6 md:space-y-10 animate-fade-in">
            <div className="text-center space-y-1">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-wool-900">הדוגמאות שלי</h2>
              <p className="text-sm md:text-base text-stone-500">הדוגמאות ששמרת לגישה מהירה</p>
            </div>
            
            {savedPatterns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPatterns.map((pattern) => (
                  <PatternCard key={pattern.id} pattern={pattern} onDelete={handleDelete} isGridMode />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-wool-200">
                <div className="w-16 h-16 bg-wool-50 rounded-full flex items-center justify-center mx-auto mb-4 text-wool-300">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-xl font-bold text-stone-700">אין עדיין דוגמאות שמורות</h3>
                <p className="text-stone-500 mb-8">התחילי ליצור דוגמאות חדשות ושמרי אותן כאן</p>
                <button onClick={() => setActiveTab('create')} className="btn-primary inline-flex">
                  צרי דוגמה עכשיו
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-wool-100 py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-400 text-xs md:text-sm">
          <p>© 2024 Soreg.ai - סטודיו לסריגה דיגיטלית</p>
          <div className="flex items-center gap-1">
            נבנה באהבה <Heart size={14} className="text-red-400 fill-current" /> עבור קהילת הסורגות
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;