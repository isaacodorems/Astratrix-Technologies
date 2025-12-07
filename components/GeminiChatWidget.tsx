import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Mic } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';
import VoiceAgent from './VoiceAgent';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const GeminiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hello! I'm Astra. Ask me anything about our AI solutions for African businesses." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const aiText = await generateAIResponse(userMessage);

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
          className="bg-azure text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:scale-110 transition-transform duration-200"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-2xl w-[350px] sm:w-[400px] h-[500px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {mode === 'voice' ? (
             <VoiceAgent onClose={() => setMode('chat')} />
          ) : (
            <>
              {/* Header */}
              <div className="bg-slate-50 p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-azure" />
                  <span className="font-bold text-gray-900">Astra Assistant</span>
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
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
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
                  <div className="flex justify-start">
                    <div className="bg-slate-100 rounded-2xl px-4 py-3 rounded-tl-none border border-gray-100">
                      <Loader2 className="h-5 w-5 animate-spin text-azure" />
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
                    placeholder="Ask about our tools..."
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