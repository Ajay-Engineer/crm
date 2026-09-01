import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  X,
  Sparkles,
  Bot,
  Send
} from 'lucide-react';
import { api } from '../../services/api';

export default function AiCopilotDrawer() {
  const { isAiDrawerOpen, setIsAiDrawerOpen, showToast } = useCrm();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '🤖 Hello! I am your HIG AI Copilot. Ask me to draft an email, analyze hot deals, or summarize any customer interaction.',
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  if (!isAiDrawerOpen) return null;

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setTyping(true);

    try {
      const res = await api.queryAi(userText);
      setMessages((prev) => [...prev, { sender: 'ai', text: res.answer }]);
    } catch (err) {
      showToast(`AI error: ${err.message}`, 'error');
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-brand-200 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-brand-50/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-brand-400 to-[#0284c7] p-[1px] shadow-sm">
            <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-brand-600">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <span>HIG AI Copilot</span>
              <span className="text-[9px] font-bold uppercase text-brand-700 bg-brand-100 px-1.5 py-0.2 rounded">
                Live
              </span>
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">Autonomous CRM Assistant</p>
          </div>
        </div>

        <button
          onClick={() => setIsAiDrawerOpen(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#38b6ff] text-white font-semibold rounded-tr-none shadow-sm'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none whitespace-pre-wrap shadow-xs'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex items-center gap-1.5 text-xs text-brand-600 font-bold animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HIG AI is reasoning...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Copilot anything..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-400 focus:bg-white transition-all shadow-inner"
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          className="p-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-white font-bold shadow-glow disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
