import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Bot,
  Sparkles,
  Send,
  Lightbulb
} from 'lucide-react';
import { api } from '../../services/api';

const SAMPLE_QUERIES = [
  'What is our total active pipeline value and top hot deals?',
  'Show high-intent leads and recommended follow-up timing.',
  'Analyze pipeline risk and identify stalled deals.',
  'What is the health status of open customer support tickets?',
];

export default function AiAnalystView() {
  const { showToast } = useCrm();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `👋 **Welcome to HIG AI Business Analyst**!\n\nI have continuous semantic access to your entire **AWS DynamoDB** CRM dataset.\n\nAsk me anything about pipeline velocity, revenue forecasts, lead intent scores, or customer risk!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (queryText) => {
    const query = queryText || inputQuery;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const res = await api.queryAi(query);
      const aiMsg = {
        sender: 'ai',
        text: res.answer,
        actionSuggestions: res.actionSuggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      showToast(`AI query error: ${err.message}`, 'error');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-5 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">HIG AI Business Analyst & Copilot</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
            DynamoDB RAG Engine
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">
          Ask natural language questions to analyze deals, lead scores, churn risk, and revenue metrics
        </p>
      </div>

      {/* Suggested Prompt Pills */}
      <div className="flex flex-wrap gap-2">
        {SAMPLE_QUERIES.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-xs px-3 py-1.5 rounded-xl bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 transition-all flex items-center gap-1.5 shadow-xs font-semibold"
          >
            <Lightbulb className="w-3.5 h-3.5 text-brand-500" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="glass-panel rounded-2xl border border-slate-200 h-[580px] flex flex-col justify-between overflow-hidden shadow-card">
        {/* Messages Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 sm:gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-tr from-brand-400 to-[#0284c7] p-[1px] shrink-0 shadow-sm">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-brand-600 font-bold">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              )}

              <div
                className={`max-w-xl p-3.5 sm:p-4 rounded-2xl text-xs space-y-2 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#38b6ff] text-white font-semibold rounded-tr-none shadow-sm'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>

                {m.actionSuggestions && (
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {m.actionSuggestions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(act)}
                        className="text-[10px] font-bold px-2 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200"
                      >
                        ⚡ {act}
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[10px] text-right ${
                    m.sender === 'user' ? 'text-white/80' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs font-black text-slate-700 shrink-0">
                  AJ
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-brand-600 font-bold animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>HIG AI analyzing DynamoDB tables...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center gap-2 sm:gap-3"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask a question (e.g. 'Which leads should I call first today?')..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-400 focus:bg-white transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow disabled:opacity-40 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask Analyst</span>
          </button>
        </form>
      </div>
    </div>
  );
}
