import React, { useState } from 'react';
import { GeneratedPattern } from '../types';
import { Clock, BarChart, Scissors, PenTool, Save, Share2, Check, Trash2 } from 'lucide-react';

interface PatternCardProps {
  pattern: GeneratedPattern & { id?: number };
  onDelete?: (id: number) => void;
  isGridMode?: boolean;
}

// Fixed: Added style prop to StitchIcon component to resolve TypeScript error when passing style (animationDelay)
const StitchIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <path d="M7 8l5 5 5-5" />
  </svg>
);

const StitchRow = ({ isAnimating }: { isAnimating: boolean }) => (
  <div className="absolute top-2 left-0 right-0 flex justify-center gap-1 overflow-hidden px-4 pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <StitchIcon 
        key={i} 
        className={`w-3 h-3 text-white transition-all duration-500 ${
          isAnimating 
            ? 'animate-stitch-dance text-yellow-200' 
            : 'opacity-20 animate-stitch-pulse'
        }`}
        style={{ animationDelay: `${i * 0.1}s` }}
      />
    ))}
  </div>
);

export const PatternCard: React.FC<PatternCardProps> = ({ pattern, onDelete, isGridMode }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [triggerStitchAnim, setTriggerStitchAnim] = useState(false);

  const triggerAnimation = () => {
    setTriggerStitchAnim(true);
    setTimeout(() => setTriggerStitchAnim(false), 1000);
  };

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
      triggerAnimation();
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error("Failed to save", error);
    }
  };

  const handleShare = async () => {
    const shareId = Math.random().toString(36).substring(2, 11);
    const shareUrl = `${window.location.origin}${window.location.pathname}?share=${shareId}`;

    try {
      const existingShares = JSON.parse(localStorage.getItem('soreg_shared_links') || '{}');
      existingShares[shareId] = {
        ...pattern,
        sharedAt: new Date().toISOString()
      };
      localStorage.setItem('soreg_shared_links', JSON.stringify(existingShares));

      if (navigator.share) {
        await navigator.share({
          title: `Soreg.ai: ${pattern.title}`,
          text: `תראו את דוגמת הסריגה הזו שיצרתי!`,
          url: shareUrl,
        });
        triggerAnimation();
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setIsCopied(true);
        triggerAnimation();
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      triggerAnimation();
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className={`bg-white rounded-3xl shadow-lg overflow-hidden border border-wool-100 transition-all duration-300 hover:shadow-xl animate-fade-in-up flex flex-col h-full`}>
      {/* Header */}
      <div className={`bg-gradient-to-br from-wool-600 to-wool-700 ${isGridMode ? 'p-5 md:p-6' : 'p-6 md:p-10'} text-white relative shrink-0`}>
        <StitchRow isAnimating={triggerStitchAnim} />
        
        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col justify-between gap-4">
          <div className="flex justify-between items-start gap-2">
            <h2 className={`${isGridMode ? 'text-xl md:text-2xl' : 'text-3xl md:text-4xl'} font-display font-bold leading-tight`}>{pattern.title}</h2>
            
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={handleShare}
                className={`p-2 rounded-lg transition-all border border-white/20 flex items-center gap-1 ${isCopied ? 'bg-green-500 border-green-400' : 'bg-white/10 hover:bg-white/20'}`}
                title="שתף קישור"
              >
                {isCopied ? <Check size={16} /> : <Share2 size={16} />}
                {isCopied && !isGridMode && <span className="text-xs font-bold">הועתק!</span>}
              </button>
              
              {!onDelete ? (
                <button 
                  onClick={handleSave}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all font-bold shadow-sm text-sm ${
                    isSaved ? 'bg-green-500' : 'bg-white text-wool-800 hover:bg-wool-50'
                  }`}
                >
                  {isSaved ? <Check size={16} /> : <Save size={16} />}
                  <span>{isSaved ? 'נשמר' : 'שמור'}</span>
                </button>
              ) : (
                <button 
                  onClick={() => pattern.id && onDelete(pattern.id)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-md"
                  title="מחק"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
          {!isGridMode && <p className="text-wool-100 opacity-90 text-lg leading-relaxed max-w-xl">{pattern.description}</p>}
        </div>
        
        <div className={`relative z-10 flex gap-3 ${isGridMode ? 'mt-4' : 'mt-8'}`}>
          <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full text-xs font-medium border border-white/10">
            <BarChart size={12} />
            <span>{pattern.difficulty}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full text-xs font-medium border border-white/10">
            <Clock size={12} />
            <span>{pattern.timeEstimate}</span>
          </div>
        </div>
      </div>

      <div className={`${isGridMode ? 'p-5' : 'p-6 md:p-10'} space-y-6 flex-1 flex flex-col`}>
        <div className={`grid grid-cols-1 ${isGridMode ? 'gap-4' : 'md:grid-cols-2 gap-8'}`}>
          <div className="bg-wool-50/50 p-4 rounded-2xl border border-wool-100">
            <h3 className="flex items-center gap-2 text-md font-bold text-wool-800 mb-2">
              <Scissors size={14} className="text-wool-600" /> חומרים
            </h3>
            <ul className="space-y-1 text-sm text-stone-700">
              {pattern.materials.slice(0, isGridMode ? 3 : undefined).map((m, i) => (
                <li key={i} className="flex gap-2 truncate"><span className="text-wool-400">•</span>{m}</li>
              ))}
              {isGridMode && pattern.materials.length > 3 && <li className="text-xs text-stone-400">ועוד...</li>}
            </ul>
          </div>
          {!isGridMode && (
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
          )}
        </div>

        <div className="flex-1">
          <h3 className={`${isGridMode ? 'text-lg' : 'text-2xl'} font-bold text-stone-800 mb-4 border-b-2 border-wool-50 pb-2`}>שלבי ביצוע</h3>
          <div className={`${isGridMode ? 'space-y-4' : 'space-y-10'}`}>
            {pattern.steps.slice(0, isGridMode ? 2 : undefined).map((step, idx) => (
              <div key={idx} className="flex gap-3 md:gap-4 group">
                <div className="shrink-0 flex flex-col items-center">
                  <div className={`${isGridMode ? 'w-6 h-6 text-sm' : 'w-10 h-10 text-lg'} rounded-full bg-wool-100 text-wool-700 flex items-center justify-center font-bold group-hover:bg-wool-600 group-hover:text-white transition-colors`}>
                    {idx + 1}
                  </div>
                  {!isGridMode && idx !== pattern.steps.length - 1 && <div className="w-0.5 flex-1 bg-wool-50 mt-2"></div>}
                </div>
                <div className="pb-1">
                  <h4 className={`${isGridMode ? 'text-md' : 'text-xl'} font-bold text-wool-800 mb-1`}>{step.phase}</h4>
                  <div className="space-y-2">
                    {step.instructions.slice(0, isGridMode ? 1 : undefined).map((inst, i) => (
                      <p key={i} className={`text-stone-600 leading-relaxed bg-white border border-stone-100 rounded-xl hover:border-wool-200 transition-colors shadow-sm ${isGridMode ? 'text-xs p-2' : 'p-3 text-sm'}`}>{inst}</p>
                    ))}
                    {isGridMode && step.instructions.length > 1 && <p className="text-[10px] text-stone-400 pr-2 italic">המשך בהוראות המלאות...</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!isGridMode && pattern.tips.length > 0 && (
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