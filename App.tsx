import React, { useState, useEffect } from 'react';
import { PatternGenerator } from './components/PatternGenerator';
import { PatternCard } from './components/PatternCard';
import { ChatGuru } from './components/ChatGuru';
import { BookOpen, Bookmark, Heart, PlusCircle, ArrowLeft, MessageCircle, Sparkles } from 'lucide-react';
import { GeneratedPattern } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'saved' | 'shared'>('create');
  const [savedPatterns, setSavedPatterns] = useState<(GeneratedPattern & { id: number })[]>([]);
  const [sharedPattern, setSharedPattern] = useState<GeneratedPattern | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shareId = params.get('share');
    if (shareId) {
      const shares = JSON.parse(localStorage.getItem('soreg_shared_links') || '{}');
      if (shares[shareId]) {
        setSharedPattern(shares[shareId]);
        setActiveTab('shared');
      }
    }

    const loaded = JSON.parse(localStorage.getItem('soreg_saved_patterns') || '[]');
    setSavedPatterns(loaded);
  }, [activeTab]);

  const handleDelete = (id: number) => {
    const updated = savedPatterns.filter(p => p.id !== id);
    localStorage.setItem('soreg_saved_patterns', JSON.stringify(updated));
    setSavedPatterns(updated);
  };

  const closeShared = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('share');
    window.history.replaceState({}, '', url.toString());
    setActiveTab('create');
    setSharedPattern(null);
  };

  return (
    <div className="min-h-screen bg-wool-50 text-stone-800 flex flex-col relative overflow-x-hidden">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-wool-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-wool-600 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3">
              <Sparkles size={20} />
            </div>
            <h1 className="text-2xl font-display font-bold text-wool-900 tracking-tight">Soreg.ai</h1>
          </div>

          <nav className="flex gap-1 bg-stone-100 p-1 rounded-2xl">
            <button 
              onClick={() => { setActiveTab('create'); setSharedPattern(null); }}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'create' ? 'bg-white shadow-md text-wool-700' : 'text-stone-500 hover:text-stone-700'}`}
            >
              <PlusCircle size={18} />
              <span className="hidden sm:inline">יצירה</span>
            </button>
            <button 
              onClick={() => { setActiveTab('saved'); setSharedPattern(null); }}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'saved' ? 'bg-white shadow-md text-wool-700' : 'text-stone-500 hover:text-stone-700'}`}
            >
              <Bookmark size={18} />
              <span className="hidden sm:inline">שמורים</span>
              {savedPatterns.length > 0 && (
                <span className="bg-wool-600 text-white px-2 py-0.5 rounded-full text-[10px]">{savedPatterns.length}</span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 w-full">
        {activeTab === 'shared' && sharedPattern ? (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <button 
              onClick={closeShared}
              className="flex items-center gap-2 text-wool-600 font-bold hover:text-wool-700 transition-colors mb-4"
            >
              <ArrowLeft size={18} />
              חזרה ליצירה
            </button>
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-wool-100 text-wool-700 rounded-full text-xs font-bold mb-2">דוגמה משותפת</span>
              <h2 className="text-3xl font-display font-bold text-wool-900">הוראות סריגה ששותפו איתך</h2>
            </div>
            <PatternCard pattern={sharedPattern} />
          </div>
        ) : activeTab === 'create' ? (
          <PatternGenerator />
        ) : (
          <div className="space-y-10 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold text-wool-900">הדוגמאות שלי</h2>
              <p className="text-stone-500">הספריה האישית שלך להוראות סריגה</p>
            </div>
            
            {savedPatterns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedPatterns.map((pattern) => (
                  <PatternCard key={pattern.id} pattern={pattern} onDelete={handleDelete} isGridMode />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[2rem] border-4 border-dashed border-wool-100">
                <div className="w-20 h-20 bg-wool-50 rounded-full flex items-center justify-center mx-auto mb-6 text-wool-300">
                  <BookOpen size={40} />
                </div>
                <h3 className="text-2xl font-bold text-stone-700">עדיין אין כאן דוגמאות</h3>
                <p className="text-stone-400 mb-8 max-w-sm mx-auto">כל דוגמה שתשמרי בזמן היצירה תופיע כאן לגישה מהירה בכל זמן.</p>
                <button onClick={() => setActiveTab('create')} className="btn-primary inline-flex">
                  צרי דוגמה עכשיו
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Chat Guru Button */}
      <div className="fixed bottom-6 left-6 z-50">
        {isChatOpen ? (
          <div className="w-80 md:w-96 h-[500px] mb-4 shadow-2xl animate-fade-in-up">
            <ChatGuru onClose={() => setIsChatOpen(false)} />
          </div>
        ) : (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 bg-sage-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-sage-700 transition-all hover:scale-110 group relative"
          >
            <MessageCircle size={28} />
            <span className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white animate-pulse"></span>
            <div className="absolute right-full mr-4 bg-stone-800 text-white text-xs py-2 px-3 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              שאלות? דברי עם גורו הסריגה
            </div>
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-wool-100 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-400 text-sm">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-wool-100 rounded-lg flex items-center justify-center text-wool-600">
               <Sparkles size={16} />
             </div>
             <p className="font-bold">Soreg.ai - הבית הדיגיטלי לסריגה</p>
          </div>
          <div className="flex items-center gap-1">
            נבנה באהבה <Heart size={14} className="text-red-400 fill-current mx-1" /> על ידי הקהילה
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;