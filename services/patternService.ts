import { GoogleGenAI, Type } from "@google/genai";
import { CraftType, Difficulty, ItemType, GeneratedPattern } from "../types";

// Replaced mock service with real Gemini API integration for generating professional patterns
export const generatePattern = async (
  item: ItemType,
  craft: CraftType,
  difficulty: Difficulty,
  yarn: string,
  additionalDetails: string
): Promise<GeneratedPattern> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `את/ה מומחה/ית לסריגה. צור/י הוראות סריגה מפורטות ומקצועיות עבור:
    - פריט: ${item}
    - טכניקה: ${craft === CraftType.KNITTING ? 'בשתי מסרגות' : 'במסרגה אחת (קרושה)'}
    - רמת קושי: ${difficulty}
    - סוג צמר: ${yarn || 'צמר סטנדרטי'}
    - בקשות מיוחדות: ${additionalDetails || 'אין'}
    
    התשובה חייבת להיות בעברית ובפורמט JSON בלבד.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are a world-class knitting and crochet instructor. Provide highly detailed, accurate, and creative patterns in Hebrew. Use professional terminology and return the output in a structured JSON format.",
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

  const jsonStr = response.text.trim();
  try {
    return JSON.parse(jsonStr) as GeneratedPattern;
  } catch (error) {
    console.error("Failed to parse pattern JSON:", jsonStr);
    throw new Error("חלה שגיאה ביצירת הדוגמה. אנא נסי שוב.");
  }
};