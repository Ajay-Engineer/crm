import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  MessageSquare,
  Mail,
  Phone,
  Send,
  Sparkles,
  Search,
  CheckCheck,
  Zap,
  Bot,
  User,
  Paperclip
} from 'lucide-react';
import { api } from '../../services/api';

const SAMPLE_THREADS = [
  {
    id: 'thread_01',
    contactName: 'Marcus Vance',
    company: 'Horizon Real Estate Holdings',
    channel: 'whatsapp',
    lastMessage: 'The custom property fields and AI automation templates look fantastic. Sending agreement today.',
    time: '10:42 AM',
    unread: true,
    avatar: 'MV',
  },
  {
    id: 'thread_02',
    contactName: 'Elena Rostova',
    company: 'Apex AI Robotics Inc',
    channel: 'email',
    lastMessage: 'Can you provide the AWS S3 pre-signed upload URL documentation before our Friday meeting?',
    time: 'Yesterday',
    unread: false,
    avatar: 'ER',
  },
  {
    id: 'thread_03',
    contactName: 'Dr. Sarah Jenkins',
    company: 'NovaCare Health Systems',
    channel: 'call',
    lastMessage: 'Call completed: 24 mins. Discussed HIPAA compliance and custom patient SLA workflows.',
    time: 'Aug 29',
    unread: false,
    avatar: 'SJ',
  },
];

export default function CommunicationsView() {
  const { showToast } = useCrm();
  const [selectedThread, setSelectedThread] = useState(SAMPLE_THREADS[0]);
  const [replyText, setReplyText] = useState('');
  const [generatingAiReply, setGeneratingAiReply] = useState(false);

  const handleGenerateAiSmartReply = async () => {
    try {
      setGeneratingAiReply(true);
      const res = await api.generateSmartReply({
        recipientName: selectedThread.contactName,
        channel: selectedThread.channel,
        topic: 'Enterprise CRM setup and proposal follow-up',
      });
      setReplyText(res.draft);
      showToast('AI Smart Reply generated!', 'success');
    } catch (err) {
      showToast(`AI generation error: ${err.message}`, 'error');
    } finally {
      setGeneratingAiReply(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    showToast(`Message dispatched via ${selectedThread.channel.toUpperCase()}!`, 'success');
    setReplyText('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-white">Omnichannel Communication Hub</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
            Unified WhatsApp & Email
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Omnichannel shared inbox with AI Smart Reply generation and automatic Customer 360 sync
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[650px] glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        {/* Left Sidebar: Threads List (1 col) */}
        <div className="border-r border-slate-800 bg-slate-950/60 flex flex-col">
          <div className="p-3.5 border-b border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {SAMPLE_THREADS.map((thread) => {
              const isSelected = selectedThread.id === thread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`p-4 cursor-pointer transition-all space-y-1.5 ${
                    isSelected
                      ? 'bg-brand-500/10 border-l-4 border-brand-400'
                      : 'hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-brand-500/30 flex items-center justify-center text-xs font-bold text-brand-300">
                        {thread.avatar}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{thread.contactName}</h4>
                        <span className="text-[10px] text-slate-400">{thread.company}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{thread.time}</span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">{thread.lastMessage}</p>

                  <div className="flex items-center justify-between pt-1 text-[10px]">
                    <span
                      className={`font-semibold uppercase tracking-wider ${
                        thread.channel === 'whatsapp'
                          ? 'text-emerald-400'
                          : thread.channel === 'email'
                          ? 'text-brand-300'
                          : 'text-indigo-300'
                      }`}
                    >
                      {thread.channel}
                    </span>
                    {thread.unread && (
                      <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Conversation & AI Smart Composer (2 cols) */}
        <div className="lg:col-span-2 flex flex-col bg-slate-900/50 justify-between">
          {/* Conversation Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-brand-400 p-[1px]">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-xs font-bold text-white">
                  {selectedThread.avatar}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{selectedThread.contactName}</h3>
                <p className="text-xs text-slate-400">
                  {selectedThread.company} • Active via {selectedThread.channel.toUpperCase()}
                </p>
              </div>
            </div>

            <button
              onClick={handleGenerateAiSmartReply}
              disabled={generatingAiReply}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-slate-800 border border-brand-400/50 text-xs font-semibold text-brand-300 shadow-glow transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
              <span>{generatingAiReply ? 'Drafting...' : 'AI Smart Draft'}</span>
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                {selectedThread.avatar}
              </div>
              <div className="max-w-lg p-3.5 rounded-2xl rounded-tl-none bg-slate-800/90 border border-slate-700 text-xs text-slate-200 space-y-1">
                <p>{selectedThread.lastMessage}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>{selectedThread.time}</span>
                  <span className="uppercase text-brand-400">{selectedThread.channel}</span>
                </div>
              </div>
            </div>

            {replyText && (
              <div className="flex items-start justify-end gap-3">
                <div className="max-w-lg p-3.5 rounded-2xl rounded-tr-none bg-brand-500/15 border border-brand-400/40 text-xs text-slate-100 space-y-2">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-brand-300">
                    <Sparkles className="w-3 h-3 text-brand-400" />
                    <span>AI Generated Draft</span>
                  </div>
                  <p>{replyText}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-xs font-bold text-slate-950 shrink-0">
                  AJ
                </div>
              </div>
            )}
          </div>

          {/* Composer Form */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-2">
            <div className="relative">
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Draft a response for ${selectedThread.contactName} or click AI Smart Draft...`}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-400"
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGenerateAiSmartReply}
                  className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Auto-Compose with HIG AI</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={!replyText.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-xs font-bold text-slate-950 shadow-glow disabled:opacity-40 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send {selectedThread.channel.toUpperCase()}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
