import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  MessageSquare,
  Mail,
  Phone,
  Send,
  Sparkles,
  Search,
  ArrowLeft
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
  const [showMobileChat, setShowMobileChat] = useState(false);

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

  const handleSelectThread = (thread) => {
    setSelectedThread(thread);
    setShowMobileChat(true);
  };

  return (
    <div className="space-y-5 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Omnichannel Communication Hub</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
            Unified WhatsApp & Email
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">
          Omnichannel shared inbox with AI Smart Reply generation and automatic Customer 360 sync
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px] glass-panel rounded-2xl border border-slate-200 overflow-hidden shadow-card">
        {/* Left Sidebar: Threads List */}
        <div
          className={`border-r border-slate-200 bg-white flex flex-col ${
            showMobileChat ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {SAMPLE_THREADS.map((thread) => {
              const isSelected = selectedThread.id === thread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => handleSelectThread(thread)}
                  className={`p-3.5 cursor-pointer transition-all space-y-1.5 ${
                    isSelected
                      ? 'bg-brand-50/80 border-l-4 border-[#38b6ff]'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-400 to-[#0284c7] p-[1px]">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-extrabold text-brand-700">
                          {thread.avatar}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{thread.contactName}</h4>
                        <span className="text-[10px] text-slate-500">{thread.company}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{thread.time}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">{thread.lastMessage}</p>

                  <div className="flex items-center justify-between pt-1 text-[10px]">
                    <span
                      className={`font-bold uppercase tracking-wider ${
                        thread.channel === 'whatsapp'
                          ? 'text-emerald-700'
                          : thread.channel === 'email'
                          ? 'text-brand-700'
                          : 'text-indigo-700'
                      }`}
                    >
                      {thread.channel}
                    </span>
                    {thread.unread && (
                      <span className="w-2 h-2 rounded-full bg-[#38b6ff] animate-pulse"></span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Conversation & AI Smart Composer */}
        <div
          className={`lg:col-span-2 flex flex-col bg-slate-50 justify-between ${
            !showMobileChat ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Conversation Header */}
          <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-white shadow-xs">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowMobileChat(false)}
                className="lg:hidden p-1 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-400 to-[#0284c7] p-[1px]">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-bold text-brand-700">
                  {selectedThread.avatar}
                </div>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">{selectedThread.contactName}</h3>
                <p className="text-[11px] text-slate-500 truncate max-w-[180px] sm:max-w-none">
                  {selectedThread.company} • Active via {selectedThread.channel.toUpperCase()}
                </p>
              </div>
            </div>

            <button
              onClick={handleGenerateAiSmartReply}
              disabled={generatingAiReply}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 border border-brand-300 text-xs font-bold text-brand-700 shadow-xs transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
              <span>{generatingAiReply ? 'Drafting...' : 'AI Smart Draft'}</span>
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
                {selectedThread.avatar}
              </div>
              <div className="max-w-lg p-3.5 rounded-2xl rounded-tl-none bg-white border border-slate-200 text-xs text-slate-800 space-y-1 shadow-xs">
                <p>{selectedThread.lastMessage}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-medium">
                  <span>{selectedThread.time}</span>
                  <span className="uppercase text-brand-600 font-bold">{selectedThread.channel}</span>
                </div>
              </div>
            </div>

            {replyText && (
              <div className="flex items-start justify-end gap-2.5">
                <div className="max-w-lg p-3.5 rounded-2xl rounded-tr-none bg-brand-50 border border-brand-300 text-xs text-slate-900 space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-brand-700">
                    <Sparkles className="w-3 h-3 text-brand-500" />
                    <span>AI Generated Draft</span>
                  </div>
                  <p className="whitespace-pre-wrap">{replyText}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#38b6ff] flex items-center justify-center text-xs font-extrabold text-white shrink-0">
                  AJ
                </div>
              </div>
            )}
          </div>

          {/* Composer Form */}
          <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-slate-200 bg-white space-y-2">
            <div className="relative">
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Draft a response for ${selectedThread.contactName} or click AI Smart Draft...`}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 sm:p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-400 focus:bg-white transition-all shadow-inner"
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleGenerateAiSmartReply}
                className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1 font-bold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Compose with HIG AI</span>
              </button>

              <button
                type="submit"
                disabled={!replyText.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow disabled:opacity-40 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
