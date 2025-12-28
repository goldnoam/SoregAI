import React, { useState } from 'react';
import { CraftType, Difficulty, ItemType, GeneratedPattern } from '../types';
import { generatePattern } from '../services/patternService';
import { PatternCard } from './PatternCard';
import { Wand2, Loader2, ChevronDown, Info } from 'lucide-react';

const Tooltip: React.FC<{ text: string; children: React.ReactNode; className?: string }> = ({ text, children, className = "" }) => (
  <div className={`relative group ${className}`}>
    {children}
    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 hidden group-hover:block z-30 w-48 bg-stone-800 text-white text-[11px] leading-tight py-2 px-3 rounded-xl shadow-2xl pointer-events-none animate-fade-in text-center">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-stone-800"></div>
    </div>
  </div>
);

export const PatternGenerator: React.FC = () => {
  const [craft, setCraft] = useState<CraftType>(CraftType.KNITTING);
  const [item, setItem] = useState<ItemType>(ItemType.SCARF);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.BEGINNER);
  const [yarn, setYarn] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  
  const [loading, setLoading] = useState(false);
  const [pattern, setPattern] = useState<GeneratedPattern | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPattern(null);

    try {
      const result = await generatePattern(item, craft, difficulty, yarn, details);
      setPattern(result);
      // Wait for render then scroll
      setTimeout(() => {
        document.getElementById('pattern-view')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyTooltip = (d: Difficulty) => {
    switch(d) {
      case Difficulty.BEGINNER: return "הוראות פשוטות וברורות למתחילות";
      case Difficulty.INTERMEDIATE: return "שילוב של דוגמאות בסיסיות ושינויי כיוון";
      case Difficulty.ADVANCED: return "פרויקט מאתגר עם טכניקות מורכבות";
      default: return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-wool-900">יצירת דוגמת סריגה</h1>
        <p className="text-lg text-stone-600 max-w-xl mx-auto">בחרי את הפרמטרים וקבלי הוראות מדויקות לסריגה בשתי מסרגות או במסרגה אחת.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-lg border border-wool-50">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
                טכניקה
                <Info size={14} className="text-wool-300" />
              </label>
              <Tooltip text="בחרי את שיטת הסריגה המועדפת עלייך">
                <div className="relative">
                  <select 
                    value={craft} 
                    onChange={(e) => setCraft(e.target.value as CraftType)} 
                    className="w-full appearance-none bg-wool-50/50 border border-wool-100 py-3 px-4 rounded-xl focus:ring-2 focus:ring-wool-400 outline-none transition-all hover:border-wool-200"
                  >
                    <option value={CraftType.KNITTING}>שתי מסרגות</option>
                    <option value={CraftType.CROCHET}>מסרגה אחת (קרושה)</option>
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-wool-400 pointer-events-none" size={18} />
                </div>
              </Tooltip>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
                פריט
                <Info size={14} className="text-wool-300" />
              </label>
              <Tooltip text="בחרי מה את רוצה ליצור היום">
                <div className="relative">
                  <select 
                    value={item} 
                    onChange={(e) => setItem(e.target.value as ItemType)} 
                    className="w-full appearance-none bg-wool-50/50 border border-wool-100 py-3 px-4 rounded-xl focus:ring-2 focus:ring-wool-400 outline-none transition-all hover:border-wool-200"
                  >
                    <option value={ItemType.SCARF}>צעיף</option>
                    <option value={ItemType.KIPPAH}>כיפה</option>
                    <option value={ItemType.BASKET}>סלסלת אחסון</option>
                    <option value={ItemType.BEANIE}>כובע</option>
                    <option value={ItemType.BLANKET}>שמיכה</option>
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-wool-400 pointer-events-none" size={18} />
                </div>
              </Tooltip>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
                רמה
                <Info size={14} className="text-wool-300" />
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[Difficulty.BEGINNER, Difficulty.INTERMEDIATE, Difficulty.ADVANCED].map((d) => (
                  <Tooltip key={d} text={getDifficultyTooltip(d)} className="flex-1">
                    <button 
                      type="button" 
                      onClick={() => setDifficulty(d)} 
                      className={`w-full py-2.5 text-sm font-bold rounded-xl border-2 transition-all duration-200 active:scale-95 ${
                        difficulty === d 
                          ? 'bg-wool-600 border-wool-600 text-white shadow-md' 
                          : 'bg-wool-50/50 border-wool-100 text-wool-700 hover:border-wool-300 hover:bg-wool-100'
                      }`}
                    >
                      {d === Difficulty.BEGINNER ? 'מתחיל' : d === Difficulty.INTERMEDIATE ? 'בינוני' : 'מתקדם'}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
                סוג צמר
                <Info size={14} className="text-wool-300" />
              </label>
              <Tooltip text="צייני את סוג החוט כדי להתאים את ההוראות">
                <input 
                  type="text" 
                  value={yarn} 
                  onChange={(e) => setYarn(e.target.value)} 
                  placeholder="למשל: צמר עבה, כותנה..." 
                  className="w-full bg-wool-50/50 border border-wool-100 py-3 px-4 rounded-xl focus:ring-2 focus:ring-wool-400 outline-none transition-all hover:border-wool-200" 
                />
              </Tooltip>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
              פרטים נוספים
              <Info size={14} className="text-wool-300" />
            </label>
            <Tooltip text="מידות, צבעים או כל דגש אחר שחשוב לך">
              <textarea 
                value={details} 
                onChange={(e) => setDetails(e.target.value)} 
                placeholder="הערות או בקשות מיוחדות..." 
                rows={3} 
                className="w-full bg-wool-50/50 border border-wool-100 py-3 px-4 rounded-xl focus:ring-2 focus:ring-wool-400 outline-none resize-none transition-all hover:border-wool-200" 
              />
            </Tooltip>
          </div>

          <Tooltip text="הבינה המלאכותית תכין לך דף הוראות מלא תוך שניות" className="w-full">
            <button type="submit" disabled={loading} className="w-full btn-primary h-14 group">
              {loading ? <Loader2 className="animate-spin" /> : <Wand2 className="transition-transform group-hover:rotate-12" />}
              <span>{loading ? 'מכין את ההוראות...' : 'צור דוגמה'}</span>
            </button>
          </Tooltip>
        </form>
      </div>

      <div id="pattern-view">
        {pattern && <PatternCard pattern={pattern} />}
      </div>
    </div>
  );
};