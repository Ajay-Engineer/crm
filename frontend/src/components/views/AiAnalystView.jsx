import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Bot,
  Sparkles,
  Send,
  ArrowRight,
  TrendingUp,
  Flame,
  AlertTriangle,
  Database,
  CheckCircle,
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
      text: `👋 **Welcome to HIG AI Business Analyst**!\n\nI have continuous semantic access to your entire **AWS DynamoDB** single-table CRM dataset.\n\nAsk me anything about pipeline velocity, revenue forecasts, lead intent scores, or customer risk!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (queryText) => {
    const query = queryText || inputQuery;
    if (!query.trim()) return;

    // Append user message
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
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-white">HIG AI Business Analyst & Copilot</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
            DynamoDB RAG Engine
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Ask conversational natural language questions to analyze deals, lead scores, churn risk, and revenue metrics
        </p>
      </div>

      {/* Suggested Prompt Pills */}
      <div className="flex flex-wrap gap-2">
        {SAMPLE_QUERIES.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-brand-500/30 hover:border-brand-400 text-slate-300 hover:text-brand-300 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Lightbulb className="w-3.5 h-3.5 text-brand-400" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="glass-panel rounded-2xl border border-slate-800 h-[600px] flex flex-col justify-between overflow-hidden">
        {/* Messages Feed */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 p-[1px] shrink-0 shadow-glow">
                  <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center text-brand-400 font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs space-y-2 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-brand-500 text-slate-950 font-semibold rounded-tr-none'
                    : 'glass-panel-glow text-slate-200 rounded-tl-none border-brand-500/30'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>

                {m.actionSuggestions && (
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1.5">
                    {m.actionSuggestions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(act)}
                        className="text-[10px] font-bold px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-brand-300 border border-brand-500/30"
                      >
                        ⚡ {act}
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[10px] text-right ${
                    m.sender === 'user' ? 'text-slate-800 font-medium' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                  AJ
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-brand-400 animate-pulse">
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
          className="p-4 border-t border-slate-800 bg-slate-950/90 flex items-center gap-3"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask a question (e.g. 'Which leads should I call first today?')..."
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-400"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-xs font-bold text-slate-950 shadow-glow disabled:opacity-40 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask Analyst</span>
          </button>
        </form>
      </div>
    </div>
  );
}
