import { GoogleGenAI, Type } from "@google/genai";
import { CraftType, Difficulty, ItemType, GeneratedPattern } from "../types";

export const generatePattern = async (
  item: ItemType,
  craft: CraftType,
  difficulty: Difficulty,
  yarn: string,
  additionalDetails: string
): Promise<GeneratedPattern> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const itemHebrew = {
    [ItemType.SCARF]: 'צעיף',
    [ItemType.VEST]: 'אפודה',
    [ItemType.KIPPAH]: 'כיפה',
    [ItemType.BASKET]: 'סלסלת אחסון',
    [ItemType.BEANIE]: 'כובע',
    [ItemType.BLANKET]: 'שמיכה'
  }[item];

  const craftHebrew = craft === CraftType.KNITTING ? 'שתי מסרגות' : 'מסרגה אחת (קרושה)';

  const prompt = `את/ה מדריך/ה לסריגה ברמה עולמית. צור/י הוראות סריגה מפורטות בעברית עבור:
    פריט: ${itemHebrew}
    טכניקה: ${craftHebrew}
    רמת קושי: ${difficulty}
    סוג צמר: ${yarn || 'סטנדרטי'}
    דגשים נוספים: ${additionalDetails || 'אין'}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a professional knitting and crochet instructor. Provide detailed, step-by-step patterns in Hebrew using technical terms. Output MUST be in structured JSON format according to the provided schema.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            timeEstimate: { type: Type.STRING },
            materials: { type: Type.ARRAY, items: { type: Type.STRING } },
            tools: { type: Type.ARRAY, items: { type: Type.STRING } },
            abbreviations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ["term", "explanation"]
              }
            },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  instructions: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["phase", "instructions"]
              }
            },
            tips: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["title", "description", "difficulty", "timeEstimate", "materials", "tools", "abbreviations", "steps", "tips"]
        }
      }
    });

    return JSON.parse(response.text) as GeneratedPattern;
  } catch (error) {
    console.error("Pattern generation failed", error);
    throw new Error("משהו השתבש ביצירת הדוגמה. ודאי שיש חיבור לאינטרנט וסיסמת ה-API תקינה.");
  }
};