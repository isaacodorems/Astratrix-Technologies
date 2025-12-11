import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Mic } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';
import VoiceAgent from './VoiceAgent';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AVATAR_URL = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150";

const GeminiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hello! I'm Astra. What business challenge are you facing today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasOpenedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, mode]);

  // Proactive Engagement: Open chat automatically after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpenedRef.current) {
        setIsOpen(true);
        hasOpenedRef.current = true;
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Create optimistic update
    const newHistory: Message[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newHistory);
    setIsLoading(true);

    // Pass the FULL history to the AI service
    const aiText = await generateAIResponse(newHistory);

    setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    setIsLoading(false);
  };

  const toggleVoiceMode = () => {
    setMode(mode === 'chat' ? 'voice' : 'chat');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-0 rounded-full shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:scale-110 transition-transform duration-200 bg-white"
          aria-label="Open AI Assistant"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full z-10"></div>
          <img 
            src={AVATAR_URL} 
            alt="Astra AI" 
            className="w-16 h-16 rounded-full object-cover border-2 border-azure p-0.5"
          />
          {/* Tooltip bubble */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl rounded-tr-none shadow-lg border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
             <span className="text-sm font-medium text-slate-800">Hi! Need help?</span>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-2xl w-[350px] sm:w-[400px] h-[500px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {mode === 'voice' ? (
             <VoiceAgent onClose={() => setMode('chat')} avatarUrl={AVATAR_URL} />
          ) : (
            <>
              {/* Header */}
              <div className="bg-slate-50 p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                        src={AVATAR_URL} 
                        alt="Astra" 
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block leading-tight">Astra</span>
                    <span className="text-xs text-azure font-medium">AI Assistant</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleVoiceMode}
                    className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-azure transition-colors"
                    title="Switch to Voice Mode"
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start items-end gap-2'}`}
                  >
                    {msg.role === 'ai' && (
                        <img src={AVATAR_URL} alt="Astra" className="w-6 h-6 rounded-full object-cover mb-1 border border-gray-100" />
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-azure text-white rounded-tr-none'
                          : 'bg-slate-100 text-gray-800 rounded-tl-none border border-gray-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start items-end gap-2">
                    <img src={AVATAR_URL} alt="Astra" className="w-6 h-6 rounded-full object-cover mb-1" />
                    <div className="bg-slate-100 rounded-2xl px-4 py-3 rounded-tl-none border border-gray-100 flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 bg-slate-50 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-azure focus:ring-1 focus:ring-azure transition-all shadow-sm"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-azure text-white p-2 rounded-full hover:bg-ocean disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiChatWidget;