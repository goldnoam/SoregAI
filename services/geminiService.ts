import { CraftType, Difficulty, ItemType, GeneratedPattern } from "../types";

// NOTE: This service has been converted to a mock service to remove AI dependencies.
// It generates static templates based on input instead of calling an LLM.

export const generatePattern = async (
  item: ItemType,
  craft: CraftType,
  difficulty: Difficulty,
  yarn: string,
  additionalDetails: string
): Promise<GeneratedPattern> => {
  
  // Simulate network delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 1500));

  const craftHebrew = craft === CraftType.KNITTING ? "בשתי מסרגות" : "במסרגה אחת (קרושה)";
  const difficultyHebrew = 
    difficulty === Difficulty.BEGINNER ? "מתחילים" : 
    difficulty === Difficulty.INTERMEDIATE ? "בינוני" : "מתקדם";

  // Helper to generate instructions based on item type
  const getSteps = () => {
    const baseSteps = [];
    
    // Setup / Cast On
    baseSteps.push({
      phase: "התחלה",
      instructions: [
        craft === CraftType.KNITTING 
          ? `העלי ${difficulty === Difficulty.BEGINNER ? '30' : '45'} עיניים על המסרגה.` 
          : `צרי שרשרת בסיס של ${difficulty === Difficulty.BEGINNER ? '30' : '45'} עיניים.`,
        "סרגי את השורה הראשונה בצורה רפויה כדי להקל על ההמשך."
      ]
    });

    // Body
    let bodyInstructions = [];
    if (item === ItemType.SCARF) {
      bodyInstructions = [
        "המשיכי לסרוג ישר עד לאורך הרצוי (כ-150 ס״מ).",
        "הקפידי על סיומת אחידה בסוף כל שורה.",
        difficulty === Difficulty.BEGINNER ? "סרגי הכל ימין (garter stitch)." : "שלבי עיני ימין ושמאל ליצירת דוגמה."
      ];
    } else if (item === ItemType.KIPPAH) {
      bodyInstructions = [
        "הרחיבי את העיגול בהדרגה: בכל שורה שנייה הוסיפי עיניים.",
        "מדדי על ראש תבנית או כדור כדי לוודא את הגודל.",
        "המשיכי עד לקוטר של כ-15 ס״מ."
      ];
    } else {
      bodyInstructions = [
        "סרגי לפי הדוגמה עד לגובה הרצוי.",
        "בדקי את רוחב העבודה עם סרט מדידה.",
        additionalDetails ? `שימי לב לבקשה המיוחדת: ${additionalDetails}` : "המשיכי ברצף אחיד."
      ];
    }
    
    baseSteps.push({
      phase: "גוף העבודה",
      instructions: bodyInstructions
    });

    // Finish
    baseSteps.push({
      phase: "סיום",
      instructions: [
        "סגרי את העיניים בצורה שאינה מתוחה מדי.",
        "השאירי קצה חוט ארוך (כ-15 ס״מ) וגזרי.",
        "החביאי את קצוות החוטים בעזרת מחט צמר בתוך הסריגה."
      ]
    });

    return baseSteps;
  };

  return {
    title: `${item === ItemType.SCARF ? "צעיף" : item === ItemType.VEST ? "אפודה" : item === ItemType.KIPPAH ? "כיפה" : "פרויקט"} ${craftHebrew} - ${difficultyHebrew}`,
    description: `הוראות סריגה מותאמות אישית ל${item} בטכניקת ${craftHebrew}. הפרויקט מתאים לרמת ${difficultyHebrew} ועוצב במיוחד עבור חוט ${yarn || 'סטנדרטי'}.`,
    difficulty: difficultyHebrew,
    timeEstimate: item === ItemType.BLANKET ? "15-20 שעות" : "3-5 שעות",
    materials: [
      `חוט ${yarn || 'אקרילן/צמר'} (כמות משוערת: 2-3 כדורים)`,
      "מספריים חדים",
      "מחט צמר להחבאת חוטים",
      "סרט מדידה"
    ],
    tools: [
      craft === CraftType.KNITTING ? "זוג מסרגות 5 מ״מ (או לפי עובי החוט)" : "מסרגה אחת 4.5 מ״מ",
      "סימניות למיקום (Stitch Markers)"
    ],
    abbreviations: [
      { term: "ע'", explanation: "עין / עיניים" },
      { term: "ש'", explanation: "שורה" },
      { term: craft === CraftType.KNITTING ? "ימין" : "ח״ע", explanation: craft === CraftType.KNITTING ? "עין ימין" : "חצי עמוד" }
    ],
    steps: getSteps(),
    tips: [
      "מומלץ תמיד לסרוג דוגמית (10x10 ס״מ) לפני שמתחילים את הפרויקט עצמו.",
      "אם הסריגה יוצאת צפופה מדי, נסי להחליף למסרגה גדולה יותר בחצי מידה.",
      "תהני מהתהליך! סריגה היא קודם כל לנפש."
    ]
  };
};

// Mock chat assistant
export const chatWithGuru = async (history: { role: string, parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate thinking
  return "היי! אני גורו הסריגה בגרסת הדגמה. כרגע החיבור לבינה המלאכותית מנוטרל, אבל אני ממליץ להסתכל על הדוגמאות הנהדרות שיצרנו עבורך!";
};