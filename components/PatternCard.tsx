import React, { useState } from 'react';
import { GeneratedPattern } from '../types';
import { Clock, BarChart, Scissors, PenTool, Save, Share2, Check } from 'lucide-react';

interface PatternCardProps {
  pattern: GeneratedPattern;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSave = () => {
    try {
      // Get existing patterns from local storage
      const existingPatterns = JSON.parse(localStorage.getItem('soreg_saved_patterns') || '[]');
      
      // Create a simple saved object
      const patternToSave = {
        ...pattern,
        savedAt: new Date().toISOString(),
        id: Date.now() // Simple unique ID
      };

      // Save back to local storage
      localStorage.setItem('soreg_saved_patterns', JSON.stringify([...existingPatterns, patternToSave]));
      
      // UI Feedback
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  };

  const handleShare = () => {
    // Create a mock shareable link
    const mockId = btoa(pattern.title).slice(0, 8);
    const shareUrl = `${window.location.origin}/pattern/${mockId}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-wool-200 animate-fade-in-up">
      <div className="bg-wool-600 p-6 text-white relative">
        {/* Header Content with Buttons */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">{pattern.title}</h2>
            <p className="text-wool-100 text-lg opacity-90">{pattern.description}</p>
          </div>
          
          <div className="flex gap-2 shrink-0 self-start">
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 active:bg-white/40 px-3 py-2 rounded-lg transition-colors backdrop-blur-sm text-sm font-medium"
              title="שתף דוגמה"
            >
              {isCopied ? <Check size={18} /> : <Share2 size={18} />}
              <span className="hidden md:inline">{isCopied ? 'הועתק' : 'שיתוף'}</span>
            </button>
            <button 
              onClick={handleSave}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium shadow-sm border border-transparent ${
                isSaved 
                  ? 'bg-green-500 hover:bg-green-600 text-white border-green-400' 
                  : 'bg-wool-800 hover:bg-wool-900 text-white border-wool-900'
              }`}
              title="שמור דוגמה"
            >
              {isSaved ? <Check size={18} /> : <Save size={18} />}
              <span className="hidden md:inline">{isSaved ? 'נשמר' : 'שמירה'}</span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-6 text-sm font-medium">
          <div className="flex items-center gap-2 bg-wool-700/50 px-3 py-1 rounded-full">
            <BarChart size={16} />
            <span>{pattern.difficulty}</span>
          </div>
          <div className="flex items-center gap-2 bg-wool-700/50 px-3 py-1 rounded-full">
            <Clock size={16} />
            <span>{pattern.timeEstimate}</span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Materials & Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-stone-50 p-5 rounded-xl border border-stone-100">
            <h3 className="flex items-center gap-2 text-xl font-bold text-wool-800 mb-4">
              <Scissors className="text-wool-600" size={20} />
              חומרים דרושים
            </h3>
            <ul className="space-y-2">
              {pattern.materials.map((mat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-stone-700">
                  <span className="w-1.5 h-1.5 bg-wool-400 rounded-full mt-2 shrink-0"></span>
                  {mat}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-stone-50 p-5 rounded-xl border border-stone-100">
            <h3 className="flex items-center gap-2 text-xl font-bold text-wool-800 mb-4">
              <PenTool className="text-wool-600" size={20} />
              כלים ומסרגות
            </h3>
            <ul className="space-y-2">
              {pattern.tools.map((tool, idx) => (
                <li key={idx} className="flex items-start gap-2 text-stone-700">
                  <span className="w-1.5 h-1.5 bg-sage-500 rounded-full mt-2 shrink-0"></span>
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Abbreviations */}
        {pattern.abbreviations && pattern.abbreviations.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-wool-800 mb-3">מקרא קיצורים</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {pattern.abbreviations.map((abbr, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white border border-stone-200 p-2 px-3 rounded-lg text-sm">
                  <span className="font-bold text-wool-700">{abbr.term}</span>
                  <span className="text-stone-600">{abbr.explanation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div>
          <h3 className="text-2xl font-bold text-wool-900 mb-6 border-b-2 border-wool-100 pb-2">הוראות ביצוע</h3>
          <div className="space-y-8">
            {pattern.steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-wool-500 text-white font-bold text-lg">
                    {idx + 1}
                  </span>
                  <h4 className="text-xl font-semibold text-wool-800">{step.phase}</h4>
                </div>
                <div className="mr-4 pr-6 border-r-2 border-stone-200 space-y-3">
                  {step.instructions.map((inst, i) => (
                    <p key={i} className="text-stone-700 leading-relaxed bg-stone-50/50 p-2 rounded hover:bg-stone-50 transition-colors">
                      {inst}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        {pattern.tips && pattern.tips.length > 0 && (
          <div className="bg-sage-50 border border-sage-200 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-sage-800 mb-3">💡 טיפים של מומחים</h3>
            <ul className="space-y-2">
              {pattern.tips.map((tip, idx) => (
                <li key={idx} className="text-sage-700 flex gap-2">
                   <span>•</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};