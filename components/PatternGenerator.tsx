import React, { useState } from 'react';
import { CraftType, Difficulty, ItemType, GeneratedPattern } from '../types';
import { generatePattern } from '../services/geminiService';
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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPattern(null);

    try {
      const result = await generatePattern(item, craft, difficulty, yarn || 'סטנדרטי', details);
      setPattern(result);
    } catch (err) {
      setError("אופס! משהו השתבש ביצירת הדוגמה. אנא נסו שנית.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      
      {/* Intro Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-wool-900">
          מה נסרוג היום?
        </h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          בחרו את הפרויקט, רמת הקושי והחומרים שיש לכם, והבינה המלאכותית שלנו תייצר עבורכם הוראות מדויקות ומותאמות אישית.
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-stone-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Craft Type */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-wool-800">טכניקה</label>
              <div className="relative">
                <select 
                  value={craft}
                  onChange={(e) => setCraft(e.target.value as CraftType)}
                  className="w-full appearance-none bg-stone-50 border border-stone-200 text-stone-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-wool-400 focus:border-transparent transition-all"
                >
                  <option value={CraftType.KNITTING}>שתי מסרגות (Knitting)</option>
                  <option value={CraftType.CROCHET}>מסרגה אחת (Crochet)</option>
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Item Type */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-wool-800">פריט</label>
              <div className="relative">
                <select 
                  value={item}
                  onChange={(e) => setItem(e.target.value as ItemType)}
                  className="w-full appearance-none bg-stone-50 border border-stone-200 text-stone-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-wool-400 focus:border-transparent transition-all"
                >
                  <option value={ItemType.SCARF}>צעיף</option>
                  <option value={ItemType.VEST}>אפודה</option>
                  <option value={ItemType.KIPPAH}>כיפה</option>
                  <option value={ItemType.BASKET}>סלסלת אחסון</option>
                  <option value={ItemType.BEANIE}>כובע גרב</option>
                  <option value={ItemType.BLANKET}>שמיכה</option>
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-wool-800">רמת קושי</label>
              <div className="grid grid-cols-3 gap-2">
                {[Difficulty.BEGINNER, Difficulty.INTERMEDIATE, Difficulty.ADVANCED].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`py-2 px-1 rounded-lg text-sm font-medium transition-colors border ${
                      difficulty === d 
                        ? 'bg-wool-100 border-wool-500 text-wool-800' 
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {d === Difficulty.BEGINNER ? 'מתחיל' : d === Difficulty.INTERMEDIATE ? 'בינוני' : 'מתקדם'}
                  </button>
                ))}
              </div>
            </div>

            {/* Yarn */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-wool-800">סוג צמר (אופציונלי)</label>
              <input 
                type="text"
                value={yarn}
                onChange={(e) => setYarn(e.target.value)}
                placeholder="למשל: מרינו עבה, כותנה דקה..."
                className="w-full bg-stone-50 border border-stone-200 text-stone-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-wool-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-wool-800">הערות מיוחדות (אופציונלי)</label>
            <textarea 
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="רוצה דוגמה עם צמות? מידה לתינוק? צבעים מסוימים?"
              rows={3}
              className="w-full bg-stone-50 border border-stone-200 text-stone-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-wool-400 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
              loading ? 'bg-stone-400 cursor-not-allowed' : 'bg-wool-600 hover:bg-wool-700 hover:shadow-xl'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                <span>מייצר דוגמה... (זה לוקח כמה שניות)</span>
              </>
            ) : (
              <>
                <Wand2 />
                <span>צור לי דוגמה אישית</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results Section */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-center">
          {error}
        </div>
      )}

      {pattern && (
        <div id="pattern-result" className="scroll-mt-8">
           <PatternCard pattern={pattern} />
        </div>
      )}
    </div>
  );
};
