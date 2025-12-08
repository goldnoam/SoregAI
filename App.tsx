import React, { useState } from 'react';
import { PatternGenerator } from './components/PatternGenerator';
import { ChatGuru } from './components/ChatGuru';
import { BookOpen, MessageCircle, Menu, X, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'chat'>('generator');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-800 font-sans flex flex-col">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-wool-600 rounded-lg flex items-center justify-center text-white">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M12 2v20"/><path d="m4.93 4.93 14.14 14.14"/><path d="m19.07 4.93-14.14 14.14"/></svg>
               </div>
               <div>
                 <h1 className="text-2xl font-display font-bold text-wool-900 tracking-tight">Soreg.ai</h1>
                 <p className="text-xs text-stone-500 hidden sm:block">הסטודיו לסריגה עם בינה מלאכותית</p>
               </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setActiveTab('generator')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeTab === 'generator' 
                    ? 'bg-wool-100 text-wool-800 font-bold' 
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <BookOpen size={20} />
                יצירת דוגמה
              </button>
              
              <button 
                onClick={() => setShowChatModal(!showChatModal)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-stone-600 hover:bg-stone-50 transition-all border border-transparent hover:border-stone-200"
              >
                <MessageCircle size={20} />
                שאל את המומחה
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-stone-600">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 p-4 space-y-2 shadow-lg absolute w-full z-50">
            <button 
              onClick={() => { setActiveTab('generator'); setMobileMenuOpen(false); }}
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === 'generator' ? 'bg-wool-50 text-wool-900 font-bold' : 'text-stone-600'
              }`}
            >
              <BookOpen size={20} />
              יצירת דוגמה
            </button>
            <button 
              onClick={() => { setShowChatModal(true); setMobileMenuOpen(false); }}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-stone-600 hover:bg-stone-50"
            >
              <MessageCircle size={20} />
              שאל את המומחה
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Center / Left Panel: Generator (Takes full width usually, or reduced if chat is embedded) */}
          <div className="lg:col-span-12">
            <PatternGenerator />
          </div>

        </div>
      </main>

      {/* Floating Chat Guru Modal / Widget */}
      {showChatModal && (
        <div className="fixed bottom-0 left-0 md:left-8 md:bottom-8 z-50 w-full md:w-[400px] md:h-[600px] h-[80vh] shadow-2xl animate-fade-in-up">
           <ChatGuru onClose={() => setShowChatModal(false)} isMobile={false} />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between text-stone-500 text-sm">
          <p>© 2024 Soreg.ai - כל הזכויות שמורות</p>
          <div className="flex items-center gap-1 mt-2 md:mt-0">
            נבנה באהבה <Heart size={14} className="text-red-400 fill-current" /> עבור סורגים בישראל
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
