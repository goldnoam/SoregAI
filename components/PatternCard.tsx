import React, { useState } from 'react';
import { GeneratedPattern } from '../types';
import { Clock, BarChart, Scissors, PenTool, Save, Share2, Check, Trash2 } from 'lucide-react';

interface PatternCardProps {
  pattern: GeneratedPattern & { id?: number };
  onDelete?: (id: number) => void;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern, onDelete }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSave = () => {
    try {
      const existingPatterns = JSON.parse(localStorage.getItem('soreg_saved_patterns') || '[]');
      const patternToSave = {
        ...pattern,
        savedAt: new Date().toISOString(),
        id: pattern.id || Date.now()
      };

      if (!existingPatterns.find((p: any) => p.title === pattern.title)) {
        localStorage.setItem('soreg_saved_patterns', JSON.stringify([...existingPatterns, patternToSave]));
      }
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error("Failed to save", error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: pattern.title,
      text: `הכנתי דוגמת סריגה חדשה ב-Soreg.ai: ${pattern.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-wool-100 transition-all duration-300 hover:shadow-xl animate-fade-in-up">
      {/* Header */}
      <div className="bg-gradient-to-br from-wool-600 to-wool-700 p-6 md:p-10 text-white relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-display font-bold">{pattern.title}</h2>
            <p className="text-wool-100 opacity-90 text-lg leading-relaxed max-w-xl">{pattern.description}</p>
          </div>
          
          <div className="flex gap-2 shrink-0 items-start">
            <button 
              onClick={handleShare}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors border border-white/20"
              title="שתף"
            >
              {isCopied ? <Check size={20} className="text-green-300" /> : <Share2 size={20} />}
            </button>
            
            {!onDelete ? (
              <button 
                onClick={handleSave}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all font-bold shadow-md ${
                  isSaved ? 'bg-green-500' : 'bg-white text-wool-800 hover:bg-wool-50'
                }`}
              >
                {isSaved ? <Check size={20} /> : <Save size={20} />}
                <span>{isSaved ? 'נשמר' : 'שמירה'}</span>
              </button>
            ) : (
              <button 
                onClick={() => pattern.id && onDelete(pattern.id)}
                className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors shadow-md"
                title="מחק"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        </div>
        
        <div className="relative z-10 flex gap-4 mt-8">
          <div className="flex items-center gap-2 bg-black/20 px-4 py-1.5 rounded-full text-sm font-medium border border-white/10">
            <BarChart size={14} />
            <span>{pattern.difficulty}</span>
          </div>
          <div className="flex items-center gap-2 bg-black/20 px-4 py-1.5 rounded-full text-sm font-medium border border-white/10">
            <Clock size={14} />
            <span>{pattern.timeEstimate}</span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-wool-50/50 p-6 rounded-2xl border border-wool-100">
            <h3 className="flex items-center gap-2 text-xl font-bold text-wool-800 mb-4">
              <Scissors size={18} className="text-wool-600" /> חומרים
            </h3>
            <ul className="space-y-2 text-stone-700">
              {pattern.materials.map((m, i) => (
                <li key={i} className="flex gap-2"><span className="text-wool-400">•</span>{m}</li>
              ))}
            </ul>
          </div>
          <div className="bg-sage-50/50 p-6 rounded-2xl border border-sage-100">
            <h3 className="flex items-center gap-2 text-xl font-bold text-sage-800 mb-4">
              <PenTool size={18} className="text-sage-600" /> כלים
            </h3>
            <ul className="space-y-2 text-stone-700">
              {pattern.tools.map((t, i) => (
                <li key={i} className="flex gap-2"><span className="text-sage-400">•</span>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-stone-800 mb-8 border-b-2 border-wool-50 pb-4">שלבי ביצוע</h3>
          <div className="space-y-10">
            {pattern.steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-wool-100 text-wool-700 flex items-center justify-center font-bold text-lg group-hover:bg-wool-600 group-hover:text-white transition-colors">
                    {idx + 1}
                  </div>
                  {idx !== pattern.steps.length - 1 && <div className="w-0.5 flex-1 bg-wool-50 mt-2"></div>}
                </div>
                <div className="pb-4">
                  <h4 className="text-xl font-bold text-wool-800 mb-3">{step.phase}</h4>
                  <div className="space-y-3">
                    {step.instructions.map((inst, i) => (
                      <p key={i} className="text-stone-600 leading-relaxed bg-white border border-stone-100 p-3 rounded-xl hover:border-wool-200 transition-colors shadow-sm">{inst}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {pattern.tips.length > 0 && (
          <div className="bg-sage-600 text-white p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">💡 טיפים לתוצאה מושלמת</h3>
            <ul className="space-y-2 opacity-90">
              {pattern.tips.map((tip, i) => <li key={i}>• {tip}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};