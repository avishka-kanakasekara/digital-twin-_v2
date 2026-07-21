import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Send, Bot, Sparkles } from 'lucide-react';

interface TwinChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeName: string;
  employeeRole: string;
}

export const TwinChatModal: React.FC<TwinChatModalProps> = ({ isOpen, onClose, employeeName, employeeRole }) => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        { 
          role: 'ai', 
          text: `Hello! I am the AI Twin representation of ${employeeName} (${employeeRole}). I am synchronized with their project logs, skills inventory, and public CV. How can I help you today?` 
        }
      ]);
    }
  }, [isOpen, employeeName, employeeRole]);

  const triggerReply = (queryText: string) => {
    setIsTyping(true);

    setTimeout(() => {
      let reply = `As the AI replica of ${employeeName}, I am currently working on cloud infrastructure and core systems. Let me know if you need specific details about my availability or past deliverables.`;
      
      const q = queryText.toLowerCase();
      if (employeeName.includes('Sarah')) {
        if (q.includes('project') || q.includes('work') || q.includes('doing')) {
          reply = "I'm currently leading the UX redesign for the Internal Dashboard, refining user journeys and prototyping in Figma.";
        } else if (q.includes('burnout') || q.includes('stress') || q.includes('risk') || q.includes('bottleneck')) {
          reply = "My current workload is quite high due to conflicting project deadlines on Q3 deliverables. I've logged high overtime recently, but I am working with management on a 1:1 check-in to balance it.";
        } else if (q.includes('skill') || q.includes('expert') || q.includes('technical')) {
          reply = "My primary skills are Figma, User Research, Prototyping, and Wireframing. I have about 6 years of experience in product design.";
        }
      } else if (employeeName.includes('David')) {
        if (q.includes('project') || q.includes('work') || q.includes('doing')) {
          reply = "I am focusing on the Node.js backend API and database performance optimizations for our primary systems.";
        } else if (q.includes('burnout') || q.includes('stress') || q.includes('risk') || q.includes('bottleneck')) {
          reply = "I have been managing critical architecture migrations which required weekend deployments. I'm feeling a bit overloaded, and we are scheduling interventions to help delegate backend tasks.";
        } else if (q.includes('skill') || q.includes('expert') || q.includes('technical')) {
          reply = "I specialize in backend engineering, specifically Node.js, PostgreSQL database architecture, Redis caching, and GraphQL endpoints.";
        }
      } else if (employeeName.includes('Michael')) {
        if (q.includes('project') || q.includes('work') || q.includes('doing')) {
          reply = "I am mapping out the product roadmap for our upcoming releases and aligning the cloud migration targets with engineering leads.";
        } else if (q.includes('skill') || q.includes('expert') || q.includes('technical')) {
          reply = "I specialize in Agile product management, roadmapping, Jira backlog grooming, and data analytics.";
        }
      } else if (employeeName.includes('Elena')) {
        if (q.includes('project') || q.includes('work') || q.includes('doing')) {
          reply = "I am managing the enterprise client pipeline and sales targets for our Q3 launch.";
        } else if (q.includes('skill') || q.includes('expert') || q.includes('technical')) {
          reply = "My expertise lies in B2B enterprise sales, customer relationship management (CRM), contract negotiations, and strategic account management.";
        }
      }

      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    triggerReply(userMsg);
  };

  const handleSuggestion = (text: string) => {
    setMessages(prev => [...prev, { role: 'user', text }]);
    triggerReply(text);
  };

  const suggestions = [
    "What projects are you on?",
    "What are your core technical skills?",
    "Identify current bottlenecks.",
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Chat with ${employeeName}'s AI Twin`}>
      <div className="flex flex-col h-[600px] w-full bg-[var(--bg-main)]" style={{ minWidth: '520px' }}>
        
        {/* Header - Solid and Clean */}
        <div className="flex items-center gap-4 p-5 bg-white border-b border-[var(--border-subtle)] -mx-6 -mt-6 rounded-t-lg z-10 relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-info flex items-center justify-center text-white text-lg font-black shrink-0 shadow-sm border border-white">
            {employeeName.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex flex-col">
            <h4 className="font-extrabold text-base text-primary leading-tight">{employeeName}</h4>
            <p className="text-[10px] font-black text-secondary uppercase tracking-widest mt-1">{employeeRole}</p>
          </div>
          <div className="ml-auto flex items-center gap-2 bg-success-light border border-success/20 text-success-dark text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
            <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
            Twin Calibrated
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5 -mx-6 bg-[var(--bg-main)] relative" style={{ scrollbarWidth: 'none' }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-3 animate-slide-up`} style={{ animationDelay: `${Math.min(idx * 50, 200)}ms` }}>
              
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-sm border border-[var(--border-subtle)] mb-1">
                  <Bot size={14}/>
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm font-semibold border ${
                msg.role === 'user' 
                  ? 'bg-primary text-white border-primary rounded-br-sm' 
                  : 'bg-white text-primary border-[var(--border-subtle)] rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start items-end gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-sm border border-[var(--border-subtle)] mb-1">
                <Bot size={14}/>
              </div>
              <div className="bg-white text-tertiary border border-[var(--border-subtle)] rounded-2xl rounded-bl-sm p-4 text-xs flex items-center gap-1.5 shadow-sm h-12">
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions & Input Area - Solid and Clean */}
        <div className="flex flex-col gap-3 pt-4 border-t border-[var(--border-subtle)] -mx-6 px-6 bg-white z-10 relative">
          
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {suggestions.map(s => (
              <button 
                key={s} 
                onClick={() => handleSuggestion(s)}
                className="text-[11px] font-bold text-primary bg-[var(--bg-main)] border border-[var(--border-subtle)] hover:bg-primary hover:text-white px-4 py-2 rounded-full shrink-0 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles size={12}/> {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 relative pb-4 pt-1">
            <input 
              type="text" 
              placeholder={`Ask ${employeeName}'s AI Twin...`} 
              className="w-full h-12 rounded-xl border border-[var(--border-subtle)] pl-4 pr-12 text-[13px] font-bold text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-[var(--bg-main)] placeholder-tertiary shadow-sm transition-all"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={!chatInput.trim()}
              className={`absolute right-3 top-2.5 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                chatInput.trim()
                  ? 'bg-primary text-white shadow-md hover:bg-primary-hover active:scale-95'
                  : 'bg-white border border-[var(--border-subtle)] text-tertiary cursor-not-allowed'
              }`}
            >
              <Send size={14} className={chatInput.trim() ? '-ml-0.5' : ''} />
            </button>
          </div>
          
        </div>
      </div>
    </Modal>
  );
};
