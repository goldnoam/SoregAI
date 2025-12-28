import { CraftType, Difficulty, ItemType, GeneratedPattern } from "../types";

/**
 * Local pattern generation engine.
 * Generates professional knitting and crochet patterns without any API calls.
 */
export const generatePattern = async (
  item: ItemType,
  craft: CraftType,
  difficulty: Difficulty,
  yarn: string,
  additionalDetails: string
): Promise<GeneratedPattern> => {
  // Artificial delay for UX feel
  await new Promise(resolve => setTimeout(resolve, 800));

  const isKnitting = craft === CraftType.KNITTING;
  const craftName = isKnitting ? "בשתי מסרגות" : "במסרגה אחת (קרושה)";
  
  const itemNames: Record<ItemType, string> = {
    [ItemType.SCARF]: 'צעיף',
    [ItemType.VEST]: 'אפודה',
    [ItemType.KIPPAH]: 'כיפה',
    [ItemType.BASKET]: 'סלסלת אחסון',
    [ItemType.BEANIE]: 'כובע',
    [ItemType.BLANKET]: 'שמיכה'
  };

  const difficultyNames: Record<Difficulty, string> = {
    [Difficulty.BEGINNER]: 'מתחילים',
    [Difficulty.INTERMEDIATE]: 'בינוני',
    [Difficulty.ADVANCED]: 'מתקדם'
  };

  const title = `${itemNames[item]} מעוצב ${craftName}`;
  const diffLabel = difficultyNames[difficulty];
  
  // Logic to build dynamic content based on item and craft
  const getMaterials = () => {
    const base = [
      `חוט ${yarn || 'צמר איכותי'} (כ-${item === ItemType.BLANKET ? '800' : '200'} גרם)`,
      "מספריים",
      "מחט צמר לגימור"
    ];
    if (item === ItemType.BASKET) base.push("חבל כותנה או חוט טריקו ליציבות");
    return base;
  };

  const getSteps = () => {
    const steps = [];
    
    // Step 1: Foundation
    steps.push({
      phase: "בסיס והתחלה",
      instructions: [
        isKnitting 
          ? `העלי ${difficulty === Difficulty.BEGINNER ? '30' : '55'} עיניים על המסרגות.` 
          : `צרי טבעת קסם או שרשרת בסיס של ${difficulty === Difficulty.BEGINNER ? '20' : '40'} עיניים.`,
        "וודאי שמתח הסריגה אחיד ולא צמוד מדי בשורה הראשונה."
      ]
    });

    // Step 2: Main Body logic
    let bodyInstructions: string[] = [];
    switch(item) {
      case ItemType.SCARF:
        bodyInstructions = [
          isKnitting ? "סרגי דוגמת פטנט (עין ימין, עין שמאל) לאורך 10 ס״מ." : "סרגי חצאי עמודים לאורך כל השורה.",
          "המשיכי לסרוג ישר עד להגעה לאורך של 150 ס״מ.",
          difficulty === Difficulty.ADVANCED ? "שלבי דוגמת צמות (Cables) כל 10 שורות." : "שמרי על שוליים ישרים על ידי העברת העין הראשונה ללא סריגה."
        ];
        break;
      case ItemType.KIPPAH:
        bodyInstructions = [
          "סרגי במעגלים והוסיפי 6-8 עיניים בכל סיבוב שני כדי לשמור על צורה שטוחה.",
          "כאשר הקוטר מגיע ל-12 ס״מ, הפסיקו את ההרחבות.",
          "סרגי 3 סיבובים נוספים ללא הוספות ליצירת מראה 'קעור' עדין."
        ];
        break;
      case ItemType.VEST:
        bodyInstructions = [
          "סרגי את חלק הגב כמלבן ישר עד לגובה המותן.",
          "בגובה בית השחי, הפחיתי 3 עיניים בכל צד.",
          "סרגי את חלק החזית בנפרד תוך יצירת מפתח V בצוואר."
        ];
        break;
      case ItemType.BASKET:
        bodyInstructions = [
          "סרגי עיגול שטוח וקשיח עבור הבסיס.",
          "עברי לסריגה ב'לולאה האחורית בלבד' (BLO) בסיבוב הראשון של הדופן כדי ליצור זווית ישרה.",
          "המשיכי לסרוג לגובה ללא הוספות עיניים."
        ];
        break;
      default:
        bodyInstructions = ["המשיכי לסרוג בדוגמה שבחרת עד לגודל הרצוי.", "הקפידי לספור עיניים בכל סוף שורה."];
    }

    steps.push({
      phase: "גוף הפרויקט",
      instructions: bodyInstructions
    });

    // Step 3: Finish
    steps.push({
      phase: "סיום ועיצוב",
      instructions: [
        "סגרי את העיניים בצורה רפויה.",
        "החביאי את קצוות החוט בתוך הסריגה בעזרת מחט צמר.",
        "מומלץ לבצע חסימה (Blocking) לפריט לקבלת מראה מקצועי."
      ]
    });

    return steps;
  };

  return {
    title,
    description: `הוראות עבודה מקצועיות ל${itemNames[item]} ברמת ${diffLabel}. ${additionalDetails ? `דגש מיוחד: ${additionalDetails}` : ''}`,
    difficulty: diffLabel,
    timeEstimate: item === ItemType.BLANKET ? "15-20 שעות" : "3-6 שעות",
    materials: getMaterials(),
    tools: [
      isKnitting ? "מסרגות 4.5 מ״מ" : "מסרגה אחת 4 מ״מ",
      "סמן עיניים (Markers)",
      "סרט מדידה"
    ],
    abbreviations: [
      { term: "ע'", explanation: "עין" },
      { term: "ש'", explanation: "שורה" },
      { term: isKnitting ? "י'" : "ח.ע", explanation: isKnitting ? "עין ימין" : "חצי עמוד" }
    ],
    steps: getSteps(),
    tips: [
      "אם הסריגה יוצאת קשה מדי, עברי למסרגה גדולה יותר.",
      "סריגת דוגמית היא לא בזבוז זמן - היא חוסכת פרימה בעתיד!",
      "בסריגת צעיף, הקפידי על מתח אחיד כדי שהקצוות לא יתגלגלו."
    ]
  };
};
