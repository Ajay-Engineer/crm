import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  X,
  Sparkles,
  Bot,
  Send,
  Zap,
  CheckCircle,
  HelpCircle,
  Lightbulb
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
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-950/95 border-l border-brand-400/30 shadow-2xl backdrop-blur-md flex flex-col justify-between animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 p-[1px] shadow-glow">
            <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center text-brand-400">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <span>HIG AI Copilot</span>
              <span className="text-[9px] font-bold uppercase text-brand-400 bg-brand-500/20 px-1.5 py-0.2 rounded">
                Live
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">Autonomous CRM Assistant</p>
          </div>
        </div>

        <button
          onClick={() => setIsAiDrawerOpen(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-brand-500 text-slate-950 font-semibold rounded-tr-none'
                  : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none whitespace-pre-wrap'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex items-center gap-1.5 text-xs text-brand-400 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HIG AI is reasoning...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-900/90 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Copilot anything..."
          className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          className="p-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold shadow-glow disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
