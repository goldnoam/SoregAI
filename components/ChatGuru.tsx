import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, X } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatWithGuru } from '../services/geminiService';

interface ChatGuruProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export const ChatGuru: React.FC<ChatGuruProps> = ({ onClose, isMobile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: 'שלום! אני גורו הסריגה. נתקעתם בשלב מסוים? לא בטוחים איך מעלים עיניים? אני כאן לעזור!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert internal chat format to Gemini API format
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await chatWithGuru(history, userMsg.text);

      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'מצטער, הייתה בעיה בתקשורת. נסה שוב מאוחר יותר.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white ${isMobile ? 'fixed inset-0 z-50' : 'rounded-2xl shadow-xl border border-stone-200 h-[600px]'}`}>
      
      {/* Header */}
      <div className="bg-sage-600 text-white p-4 flex justify-between items-center rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-2 rounded-full">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold">גורו הסריגה</h3>
            <p className="text-xs text-sage-100">עוזר אישי חכם</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 max-w-[85%] ${
              msg.role === 'user' ? 'mr-auto flex-row-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-wool-500' : 'bg-sage-600'
            }`}>
              {msg.role === 'user' ? <User size={16} className="text-white" /> : <Sparkles size={16} className="text-white" />}
            </div>
            <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-wool-600 text-white rounded-tl-none' 
                : 'bg-white text-stone-800 border border-stone-200 rounded-tr-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sage-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tr-none border border-stone-200">
               <div className="flex gap-1">
                 <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-75"></span>
                 <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-150"></span>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-stone-200 rounded-b-2xl">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="שאל אותי כל דבר על סריגה..."
            className="w-full bg-stone-100 text-stone-800 pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-sage-400 transition-all"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute left-2 p-2 bg-sage-600 text-white rounded-full hover:bg-sage-700 disabled:opacity-50 disabled:hover:bg-sage-600 transition-colors"
          >
            <Send size={18} className={isLoading ? "opacity-0" : ""} />
          </button>
        </div>
      </form>
    </div>
  );
};
