import React, { useState } from 'react';
import { CraftType, Difficulty, ItemType, GeneratedPattern } from '../types';
import { generatePattern } from '../services/patternService';
import { PatternCard } from './PatternCard';
import { Wand2, Loader2, ChevronDown } from 'lucide-react';

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
              <label className="text-sm font-bold text-stone-700">טכניקה</label>
              <div className="relative">
                <select value={craft} onChange={(e) => setCraft(e.target.value as CraftType)} className="w-full appearance-none bg-stone-50 border border-stone-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-wool-400 outline-none">
                  <option value={CraftType.KNITTING}>שתי מסרגות</option>
                  <option value={CraftType.CROCHET}>מסרגה אחת (קרושה)</option>
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">פריט</label>
              <div className="relative">
                <select value={item} onChange={(e) => setItem(e.target.value as ItemType)} className="w-full appearance-none bg-stone-50 border border-stone-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-wool-400 outline-none">
                  <option value={ItemType.SCARF}>צעיף</option>
                  <option value={ItemType.KIPPAH}>כיפה</option>
                  <option value={ItemType.BASKET}>סלסלת אחסון</option>
                  <option value={ItemType.BEANIE}>כובע</option>
                  <option value={ItemType.BLANKET}>שמיכה</option>
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">רמה</label>
              <div className="grid grid-cols-3 gap-2">
                {[Difficulty.BEGINNER, Difficulty.INTERMEDIATE, Difficulty.ADVANCED].map((d) => (
                  <button key={d} type="button" onClick={() => setDifficulty(d)} className={`py-2 text-sm font-bold rounded-lg border transition-all ${difficulty === d ? 'bg-wool-600 border-wool-600 text-white' : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-wool-300'}`}>
                    {d === Difficulty.BEGINNER ? 'מתחיל' : d === Difficulty.INTERMEDIATE ? 'בינוני' : 'מתקדם'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">סוג צמר</label>
              <input type="text" value={yarn} onChange={(e) => setYarn(e.target.value)} placeholder="למשל: צמר עבה, כותנה..." className="w-full bg-stone-50 border border-stone-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-wool-400 outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700">פרטים נוספים</label>
            <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="הערות או בקשות מיוחדות..." rows={3} className="w-full bg-stone-50 border border-stone-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-wool-400 outline-none resize-none" />
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary h-14">
            {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
            <span>{loading ? 'מכין את ההוראות...' : 'צור דוגמה'}</span>
          </button>
        </form>
      </div>

      <div id="pattern-view">
        {pattern && <PatternCard pattern={pattern} />}
      </div>
    </div>
  );
};