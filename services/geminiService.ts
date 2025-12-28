import { CraftType, Difficulty, ItemType, GeneratedPattern } from "../types";
import { generatePattern as localGeneratePattern } from "./patternService";

/**
 * Offline Pattern Generation redirect
 */
export const generatePattern = localGeneratePattern;

/**
 * Local Guru Chat Assistant.
 * Provides helpful responses based on common knitting questions without API calls.
 */
export const chatWithGuru = async (
  history: { role: 'user' | 'model', parts: { text: string }[] }[], 
  newMessage: string
): Promise<string> => {
  // Artificial delay to feel natural
  await new Promise(resolve => setTimeout(resolve, 600));

  const msg = newMessage.toLowerCase();

  // Simple rule-based response system
  if (msg.includes('שלום') || msg.includes('היי')) {
    return "שלום! אני גורו הסריגה שלך. איך אוכל לעזור לך היום? את תקועה בשלב מסוים או מחפשת השראה?";
  }

  if (msg.includes('עיניים') || msg.includes('להעלות')) {
    return "העלאת עיניים היא הבסיס! בשתי מסרגות, השיטה הכי נפוצה היא ה-Long Tail Cast On. במסרגה אחת, פשוט יוצרים לולאה ומושכים דרכה את החוט.";
  }

  if (msg.includes('צמר') || msg.includes('חוט')) {
    return "בחירת הצמר תלויה בפרויקט. לצעיפים כדאי להשתמש באקריליק רך או צמר מרינו. לסלסלות, חוט טריקו או כותנה עבה ייתנו את היציבות שאת מחפשת.";
  }

  if (msg.includes('טעיתי') || msg.includes('טעות') || msg.includes('לפרום')) {
    return "אל תילחצי! טעויות הן חלק מהלמידה. לפעמים אפשר 'לתקן בדרך' מבלי לפרום הכל. אם זה משהו בולט, עדיף לפרום בזהירות ולסרוג מחדש - התוצאה הסופית תהיה שווה את זה.";
  }

  if (msg.includes('כמה זמן')) {
    return "סריגה היא תהליך מרגיע, לא מרוץ! צעיף פשוט לוקח בערך 4-6 שעות, אבל שמיכה יכולה לקחת שבועות. תהני מהדרך.";
  }

  if (msg.includes('תודה')) {
    return "בשמחה רבה! תמיד כאן לכל שאלה. סריגה מהנה!";
  }

  // Default fallback response
  return "זו שאלה מצוינת! כגורו סריגה, אני ממליץ תמיד לבדוק את מתח הסריגה ולספור עיניים בסוף כל שורה. האם תרצי שאפרט על טכניקה ספציפית?";
};
