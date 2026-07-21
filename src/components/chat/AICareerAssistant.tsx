import React, { useState } from 'react';
import { MessageSquare, Search, Plus, X, Send, Bot, Copy, ThumbsUp, ThumbsDown, RefreshCw, Paperclip, Sparkles, Sidebar, ChevronRight, CheckCircle2, UploadCloud, FileText, Link as LinkIcon, Database } from 'lucide-react';

interface AICareerAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  messages: { role: string; text: string }[];
  chatInput: string;
  setChatInput: (val: string) => void;
  onSend: () => void;
  suggestedPrompts: string[];
  onSuggestionClick: (prompt: string) => void;
}

export const AICareerAssistant: React.FC<AICareerAssistantProps> = ({
  isOpen, onClose, messages, chatInput, setChatInput, onSend, suggestedPrompts, onSuggestionClick
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCopied, setIsCopied] = useState<number | null>(null);
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const mockHistory = [
    { id: 1, title: 'Q3 Self Evaluation Draft', date: 'Today' },
    { id: 2, title: 'Cloud Skills Gap Analysis', date: 'Yesterday' },
    { id: 3, title: 'AWS Solutions Architect Path', date: 'Previous 7 Days' },
    { id: 4, title: 'Burnout Risk Mitigation', date: 'Previous 7 Days' },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setIsCopied(index);
    setTimeout(() => setIsCopied(null), 2000);
  };

  const handleUpload = (type: string) => {
    setUploadStatus(`Uploading ${type}...`);
    setTimeout(() => {
      setUploadStatus(`${type} synchronized successfully!`);
      setTimeout(() => setUploadStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex p-8 bg-[var(--bg-main)]/90 animate-fade-in">
      
      {/* Solid Chat Interface */}
      <div className="flex w-full h-full bg-white rounded-3xl overflow-hidden shadow-2xl relative border border-[var(--border-color)]">
        
        {/* LEFT SIDEBAR */}
        <div className={`transition-all duration-300 ease-in-out border-r border-[var(--border-subtle)] flex flex-col bg-[var(--bg-main)] ${isSidebarOpen ? 'w-[320px]' : 'w-0 overflow-hidden opacity-0'}`}>
          
          <div className="p-6">
            <button className="w-full h-12 flex items-center justify-center gap-2 bg-primary text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
              <Plus size={16} /> New Conversation
            </button>
          </div>

          <div className="px-6 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-secondary" size={16} />
              <input type="text" placeholder="Search history..." className="w-full h-10 pl-10 pr-4 bg-white border border-[var(--border-subtle)] rounded-xl text-sm font-bold text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm placeholder-tertiary" />
            </div>
          </div>

          <div className="px-4 pb-4 border-b border-[var(--border-subtle)]">
            <button 
              onClick={() => setIsKnowledgeModalOpen(true)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-info-light border border-info/20 hover:bg-info/20 transition-colors group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-info flex items-center justify-center text-white">
                  <Database size={16} />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-extrabold text-info">Knowledge Base</h4>
                  <p className="text-[10px] font-black text-info/70 uppercase tracking-widest mt-0.5">Sync Telemetry</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-info/70 group-hover:text-info transition-colors" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6" style={{ scrollbarWidth: 'thin' }}>
            <div className="text-[10px] font-black text-tertiary uppercase tracking-widest px-2 mb-3">Today</div>
            {mockHistory.filter(h => h.date === 'Today').map(chat => (
              <button key={chat.id} className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white shadow-sm border border-[var(--border-subtle)] text-primary text-sm font-bold hover:border-primary/30 transition-colors mb-2">
                <div className="flex items-center gap-3 truncate">
                  <MessageSquare size={16} className="text-primary/70 shrink-0" />
                  <span className="truncate">{chat.title}</span>
                </div>
              </button>
            ))}

            <div className="text-[10px] font-black text-tertiary uppercase tracking-widest px-2 mt-6 mb-3">Yesterday</div>
            {mockHistory.filter(h => h.date === 'Yesterday').map(chat => (
              <button key={chat.id} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-transparent border border-transparent hover:bg-white hover:shadow-sm hover:border-[var(--border-subtle)] text-secondary text-sm font-bold truncate transition-all mb-1 group">
                <MessageSquare size={16} className="text-tertiary group-hover:text-secondary shrink-0 transition-colors" />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}

            <div className="text-[10px] font-black text-tertiary uppercase tracking-widest px-2 mt-6 mb-3">Previous 7 Days</div>
            {mockHistory.filter(h => h.date === 'Previous 7 Days').map(chat => (
              <button key={chat.id} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-transparent border border-transparent hover:bg-white hover:shadow-sm hover:border-[var(--border-subtle)] text-secondary text-sm font-bold truncate transition-all mb-1 group">
                <MessageSquare size={16} className="text-tertiary group-hover:text-secondary shrink-0 transition-colors" />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>
          
          <div className="p-4 border-t border-[var(--border-subtle)] bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-info flex items-center justify-center text-white text-sm font-black shadow-md border-2 border-white">
                AC
              </div>
              <div className="flex-1 truncate">
                <p className="text-sm font-extrabold text-primary truncate">Alex Carter</p>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-wider truncate">Active Twin</p>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CHAT AREA */}
        <div className="flex-1 flex flex-col h-full relative bg-white">
          
          {/* Header */}
          <div className="h-20 border-b border-[var(--border-subtle)] bg-white flex items-center justify-between px-8 shrink-0 relative z-20">
            <div className="flex items-center gap-4">
              {!isSidebarOpen && (
                <button onClick={() => setIsSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-xl text-secondary hover:text-primary hover:bg-[var(--bg-main)] transition-colors shadow-sm border border-[var(--border-subtle)] bg-white">
                  <Sidebar size={18} />
                </button>
              )}
              <div className="flex items-center gap-2 group cursor-pointer">
                <h3 className="text-xl font-extrabold text-primary tracking-tight">Twin GPT-4o</h3>
                <ChevronRight size={18} className="text-tertiary group-hover:text-primary transition-colors" />
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-success uppercase tracking-widest bg-success-light px-3 py-1.5 rounded-md border border-success/20">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                Telemetry Synced
              </div>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-secondary hover:text-danger hover:bg-danger-light rounded-xl transition-colors shadow-sm border border-[var(--border-subtle)] bg-white">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8 relative z-10 bg-white" style={{ scrollbarWidth: 'none' }}>
            <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-10">
              
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-center animate-fade-in">
                  <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-primary to-info flex items-center justify-center text-white shadow-xl border-4 border-white relative z-10">
                      <Sparkles size={36} />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-extrabold text-primary mb-3 tracking-tight">How can I help you today?</h2>
                  <p className="text-secondary text-sm max-w-md mx-auto mb-12 font-medium">I am your AI twin assistant. Ask me anything about your career roadmap, performance, or skills gap.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {suggestedPrompts.map((prompt, idx) => (
                      <button 
                        key={idx}
                        onClick={() => onSuggestionClick(prompt)}
                        className="text-left p-5 rounded-2xl bg-[var(--bg-main)] hover:bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group flex flex-col gap-2 border border-[var(--border-subtle)]"
                      >
                        <span className="text-sm font-bold text-primary group-hover:text-primary-hover">{prompt}</span>
                        <span className="text-[10px] text-tertiary font-black uppercase tracking-widest">Ask instantly</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up group/message`} style={{ animationDelay: `${Math.min(idx * 50, 300)}ms` }}>
                    
                    {msg.role === 'ai' && (
                      <div className="w-10 h-10 rounded-2xl bg-primary-light flex items-center justify-center text-primary shrink-0 shadow-sm border border-primary/20 mt-1">
                        <Bot size={20} />
                      </div>
                    )}
                    
                    <div className={`max-w-[85%] flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-6 py-4 text-[15px] leading-relaxed font-semibold shadow-sm border ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white rounded-3xl rounded-tr-sm border-primary shadow-primary/20' 
                          : 'bg-[var(--bg-main)] text-primary rounded-3xl rounded-tl-sm border-[var(--border-subtle)]'
                      }`}>
                        {msg.text}
                      </div>
                      
                      {msg.role === 'ai' && (
                        <div className="flex items-center gap-1 mt-1 ml-2 opacity-0 group-hover/message:opacity-100 transition-opacity">
                          <button onClick={() => handleCopy(msg.text, idx)} className="w-8 h-8 flex items-center justify-center text-tertiary hover:text-primary hover:bg-[var(--bg-main)] rounded-lg transition-colors shadow-sm border border-transparent hover:border-[var(--border-subtle)]" title="Copy">
                            {isCopied === idx ? <CheckCircle2 size={14} className="text-success" /> : <Copy size={14} />}
                          </button>
                          <button className="w-8 h-8 flex items-center justify-center text-tertiary hover:text-success hover:bg-success-light rounded-lg transition-colors shadow-sm border border-transparent hover:border-success/20">
                            <ThumbsUp size={14} />
                          </button>
                          <button className="w-8 h-8 flex items-center justify-center text-tertiary hover:text-danger hover:bg-danger-light rounded-lg transition-colors shadow-sm border border-transparent hover:border-danger/20">
                            <ThumbsDown size={14} />
                          </button>
                          <button className="w-8 h-8 flex items-center justify-center text-tertiary hover:text-primary hover:bg-[var(--bg-main)] rounded-lg transition-colors shadow-sm border border-transparent hover:border-[var(--border-subtle)] ml-1">
                            <RefreshCw size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 shrink-0 relative z-20 border-t border-[var(--border-subtle)] bg-white">
            <div className="max-w-4xl mx-auto relative flex items-center gap-3">
              <button className="w-12 h-12 flex items-center justify-center text-secondary hover:text-primary hover:bg-white rounded-2xl transition-colors shadow-sm border border-[var(--border-subtle)] bg-[var(--bg-main)] shrink-0">
                <Paperclip size={20} />
              </button>
              
              <div className="flex-1 relative">
                <textarea 
                  placeholder="Message your AI Twin..." 
                  className="w-full min-h-[48px] max-h-[200px] bg-[var(--bg-main)] rounded-2xl pl-4 pr-16 py-3 text-[15px] font-bold text-primary focus:outline-none focus:border-primary/50 transition-all resize-none shadow-sm placeholder-tertiary border border-[var(--border-subtle)] block"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      onSend();
                    }
                  }}
                  rows={1}
                  style={{ paddingTop: '12px' }}
                />
                <button 
                  onClick={onSend}
                  disabled={!chatInput.trim()}
                  className={`absolute right-2 top-2 w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 ${
                    chatInput.trim() 
                      ? 'bg-primary text-white shadow-md hover:bg-primary-hover hover:scale-105 active:scale-95' 
                      : 'bg-white text-tertiary cursor-not-allowed border border-[var(--border-subtle)]'
                  }`}
                >
                  <Send size={16} className={chatInput.trim() ? 'translate-x-0.5' : ''} />
                </button>
              </div>
            </div>
            <p className="text-center text-[10px] font-black text-tertiary uppercase tracking-widest mt-4">
              Twin AI can make mistakes. Verify important information.
            </p>
          </div>

        </div>

        {/* KNOWLEDGE BASE MODAL OVERLAY */}
        {isKnowledgeModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--bg-main)]/90 p-4">
            <div className="bg-white w-full max-w-[500px] rounded-[2rem] shadow-2xl p-8 relative animate-slide-up border border-[var(--border-subtle)]">
              
              <button onClick={() => setIsKnowledgeModalOpen(false)} className="absolute top-6 right-6 text-secondary hover:text-danger hover:bg-danger-light w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm border border-[var(--border-subtle)] bg-[var(--bg-main)]">
                <X size={20} />
              </button>
              
              <h3 className="text-2xl font-extrabold text-primary mb-2 tracking-tight flex items-center gap-3">
                <Database className="text-info" /> Feed Knowledge
              </h3>
              <p className="text-sm font-semibold text-secondary mb-8 leading-relaxed">
                Upload your latest CV, performance reviews, or project documentation to synchronize your digital twin.
              </p>
              
              {uploadStatus && (
                <div className="mb-6 p-4 rounded-xl bg-success-light border border-success/30 flex items-center gap-3 animate-fade-in shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <p className="text-sm font-bold text-success-dark">{uploadStatus}</p>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => handleUpload('Resume / CV')}
                  className="w-full flex items-center gap-4 p-5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] hover:-translate-y-1 hover:shadow-md transition-all group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm border border-primary/20">
                    <FileText size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-[15px]">Upload Resume / CV</h4>
                    <p className="text-[10px] font-black text-tertiary uppercase tracking-wider mt-1">PDF, DOCX up to 5MB</p>
                  </div>
                  <UploadCloud size={20} className="ml-auto text-tertiary group-hover:text-primary transition-colors" />
                </button>

                <button 
                  onClick={() => handleUpload('LinkedIn Profile')}
                  className="w-full flex items-center gap-4 p-5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] hover:-translate-y-1 hover:shadow-md transition-all group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-info-light flex items-center justify-center text-info group-hover:scale-110 transition-transform shadow-sm border border-info/20">
                    <LinkIcon size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-[15px]">Sync LinkedIn Profile</h4>
                    <p className="text-[10px] font-black text-tertiary uppercase tracking-wider mt-1">Connect Account</p>
                  </div>
                  <ChevronRight size={20} className="ml-auto text-tertiary group-hover:text-info transition-colors" />
                </button>

                <button 
                  onClick={() => handleUpload('Project Documentation')}
                  className="w-full flex items-center gap-4 p-5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-subtle)] hover:-translate-y-1 hover:shadow-md transition-all group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-success-light flex items-center justify-center text-success group-hover:scale-110 transition-transform shadow-sm border border-success/20">
                    <UploadCloud size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-[15px]">Upload Project Docs</h4>
                    <p className="text-[10px] font-black text-tertiary uppercase tracking-wider mt-1">Markdown, PDF</p>
                  </div>
                  <UploadCloud size={20} className="ml-auto text-tertiary group-hover:text-success transition-colors" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
