import { CraftType, Difficulty, ItemType, GeneratedPattern } from "../types";

export const generatePattern = async (
  item: ItemType,
  craft: CraftType,
  difficulty: Difficulty,
  yarn: string,
  additionalDetails: string
): Promise<GeneratedPattern> => {
  
  // Simulate network delay for a consistent user experience
  await new Promise(resolve => setTimeout(resolve, 800));

  const craftHebrew = craft === CraftType.KNITTING ? "בשתי מסרגות" : "במסרגה אחת (קרושה)";
  const difficultyHebrew = 
    difficulty === Difficulty.BEGINNER ? "מתחילים" : 
    difficulty === Difficulty.INTERMEDIATE ? "בינוני" : "מתקדם";

  const getSteps = () => {
    const baseSteps = [];
    
    baseSteps.push({
      phase: "התחלה והכנות",
      instructions: [
        craft === CraftType.KNITTING 
          ? `העלי ${difficulty === Difficulty.BEGINNER ? '25' : '40'} עיניים על מסרגות במידה המתאימה לחוט.` 
          : `צרי לולאה ראשונית ושרשרת בסיס של ${difficulty === Difficulty.BEGINNER ? '25' : '40'} עיניים.`,
        "סרגי את השורה הראשונה במתח רפוי כדי לשמור על גמישות השוליים."
      ]
    });

    let bodyInstructions = [];
    if (item === ItemType.SCARF) {
      bodyInstructions = [
        "המשיכי לסרוג ישר עד להגעה לאורך של 120-150 ס״מ.",
        difficulty === Difficulty.BEGINNER ? "סרגי כל שורה בימין (Garter Stitch) למראה קלאסי." : "שלבי עיני ימין ושמאל ליצירת דוגמת פטנט (Ribbing).",
        "הקפידי לשמור על מספר עיניים קבוע לאורך כל העבודה."
      ];
    } else if (item === ItemType.KIPPAH) {
      bodyInstructions = [
        "סרגי במעגלים תוך הוספת עיניים בכל שורה שנייה כדי לשמור על משטח שטוח.",
        "כאשר מגיעים לקוטר של 10 ס״מ, הפסיקי את ההרחבות והמשיכי לסרוג ישר למראה עמוק יותר.",
        "השתמשי בסימנייה כדי לדעת היכן מתחילה כל שורה."
      ];
    } else if (item === ItemType.BASKET) {
      bodyInstructions = [
        "סרגי עיגול בסיס קשיח (עדיף בחוט כפול).",
        "כאשר הבסיס בגודל הרצוי, המשיכי לסרוג ללא הרחבות כלל ליצירת הדפנות.",
        "בסיום הדפנות ניתן להוסיף שורת 'עין נסוגה' למראה דקורטיבי."
      ];
    } else {
      bodyInstructions = [
        "סרגי לפי המידות הרצויות תוך בדיקה מתמדת עם סרט מדידה.",
        additionalDetails ? `דגש לבקשתך: ${additionalDetails}` : "הקפידי על מתח סריגה אחיד."
      ];
    }
    
    baseSteps.push({
      phase: "גוף הפרויקט",
      instructions: bodyInstructions
    });

    baseSteps.push({
      phase: "סגירה וגימור",
      instructions: [
        "סגרי את העיניים בצורה אחידה.",
        "גזרי את החוט והשאירי זנב של 15 ס״מ.",
        "השתמשי במחט צמר כדי להחביא את קצוות החוט בתוך הסריגה למראה מקצועי."
      ]
    });

    return baseSteps;
  };

  return {
    title: `${item === ItemType.SCARF ? "צעיף" : item === ItemType.VEST ? "אפודה" : item === ItemType.KIPPAH ? "כיפה" : "פרויקט"} ${craftHebrew}`,
    description: `הוראות עבודה מפורטות ל${item} בדרגת קושי ${difficultyHebrew}.`,
    difficulty: difficultyHebrew,
    timeEstimate: item === ItemType.BLANKET ? "12-15 שעות" : "2-4 שעות",
    materials: [
      `חוט ${yarn || 'מתאים'} (כ-100 גרם)`,
      "מספריים",
      "מחט צמר"
    ],
    tools: [
      craft === CraftType.KNITTING ? "מסרגות 4.5 מ״מ" : "מסרגה אחת 4 מ״מ",
      "סרט מדידה"
    ],
    abbreviations: [
      { term: "ע'", explanation: "עין" },
      { term: "ש'", explanation: "שורה" }
    ],
    steps: getSteps(),
    tips: [
      "סריגת דוגמית היא שלב קריטי כדי לוודא שהגודל הסופי יהיה מדויק.",
      "אל תחששי לפרום אם טעית - זו הדרך הטובה ביותר ללמוד.",
      "שמרי על גב זקוף ותאורה טובה בזמן העבודה."
    ]
  };
};