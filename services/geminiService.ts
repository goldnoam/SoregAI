import { GoogleGenAI, Type } from "@google/genai";
import { CraftType, Difficulty, ItemType, GeneratedPattern } from "../types";

// Replaced mock service with real Gemini API integration for generating patterns
export const generatePattern = async (
  item: ItemType,
  craft: CraftType,
  difficulty: Difficulty,
  yarn: string,
  additionalDetails: string
): Promise<GeneratedPattern> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `צור הוראות סריגה בעברית עבור ${item} ב${craft}. רמה: ${difficulty}. צמר: ${yarn}. ${additionalDetails}`,
    config: {
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
              }
            }
          },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING },
                instructions: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          tips: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });

  return JSON.parse(response.text) as GeneratedPattern;
};

// Fixed: Implementing real Gemini chat assistant with conversation history
export const chatWithGuru = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: newMessage }] }],
    config: {
      systemInstruction: "את/ה גורו סריגה מומחה, חביב ומקצועי. ענה על שאלות בנושאי סריגה, עזור בפתרון בעיות ותן השראה. ענה תמיד בעברית.",
    }
  });

  return response.text || "מצטער, אני לא מצליח לענות כרגע.";
};