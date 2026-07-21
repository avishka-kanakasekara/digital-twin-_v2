import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Download, Edit, Plus, Clock, Target, Trash2, ShieldAlert, Sparkles, TrendingUp, CheckCircle2, ListTodo, X, Bot, Activity, AlertCircle, Briefcase, MapPin } from 'lucide-react';
import { AICareerAssistant } from '../components/chat/AICareerAssistant';

interface Task {
  text: string;
  done: boolean;
}

interface ActiveProject {
  id: string;
  name: string;
  progress: number;
  hours: number;
  status: 'On Track' | 'At Risk' | 'Behind';
  tasks: Task[];
}

export const EmployeeTwin: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: 'ai', text: 'Hi Alex! I am your personal AI Twin representation. I assist you with self-reflections, project logs, and matching your skills with organization goals. Ask me anything about your career roadmap.' }
  ]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [activeProjects, setActiveProjects] = useState<ActiveProject[]>([
    { 
      id: '1', name: 'Cloud Migration Phase 2', progress: 75, hours: 25, status: 'On Track',
      tasks: [{ text: 'Configure Terraform IAM Roles', done: true }, { text: 'Migrate DB to RDS Cluster', done: false }] 
    },
    { 
      id: '2', name: 'Internal Dashboard', progress: 40, hours: 15, status: 'At Risk',
      tasks: [{ text: 'Design Glassmorphism Mockups', done: true }, { text: 'Implement Recharts Widgets', done: false }]
    }
  ]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newTaskTexts, setNewTaskTexts] = useState<Record<string, string>>({});

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      triggerToast('Digital twin data package exported successfully.');
    }, 1500);
  };

  const handleAddProject = () => {
    if (!newProjectName.trim()) return;
    setActiveProjects([...activeProjects, { 
      id: Date.now().toString(), name: newProjectName, progress: 0, hours: 0, status: 'On Track', tasks: [] 
    }]);
    triggerToast(`Added project "${newProjectName}".`);
    setNewProjectName('');
  };

  const updateProject = (id: string, field: keyof ActiveProject, value: any) => {
    setActiveProjects(activeProjects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removeProject = (id: string) => {
    const p = activeProjects.find(item => item.id === id);
    setActiveProjects(activeProjects.filter(p => p.id !== id));
    if (p) triggerToast(`Removed project "${p.name}".`);
  };

  const handleAddTask = (projectId: string) => {
    const text = newTaskTexts[projectId];
    if (!text || !text.trim()) return;
    setActiveProjects(activeProjects.map(p => {
      if (p.id === projectId) {
        return { ...p, tasks: [...p.tasks, { text, done: false }] };
      }
      return p;
    }));
    setNewTaskTexts({ ...newTaskTexts, [projectId]: '' });
  };

  const toggleTask = (projectId: string, taskIndex: number) => {
    setActiveProjects(activeProjects.map(p => {
      if (p.id === projectId) {
        const updatedTasks = p.tasks.map((t, idx) => idx === taskIndex ? { ...t, done: !t.done } : t);
        return { ...p, tasks: updatedTasks };
      }
      return p;
    }));
  };

  const triggerChatResponse = (text: string) => {
    setTimeout(() => {
      let reply = 'I have analyzed your workload logs. You have logged 40 hours across 2 active projects. To hit a 4.8 score, let\'s focus on wrapping up "Migrate DB to RDS Cluster".';
      
      const q = text.toLowerCase();
      if (q.includes('resume') || q.includes('cv') || q.includes('technical')) {
        reply = 'Your CV is synced. Major cloud stack highlighted: AWS IAM, GuardDuty, Terraform, Kubernetes, Go.';
      } else if (q.includes('burnout') || q.includes('hours') || q.includes('wellbeing')) {
        reply = 'Your weekly hours are normal, but your burnout risk is medium due to consecutive overtime. Consider taking off on Friday!';
      } else if (q.includes('roadmap') || q.includes('architect') || q.includes('target')) {
        reply = 'Target Role aligned: Cloud Architect. Timeline 12-18 months. Recommend completing the "Advanced EKS Architecture" course next.';
      } else if (q.includes('evaluation') || q.includes('review') || q.includes('self')) {
        reply = 'Sure! Here is a Q3 summary draft: "Successfully migrated cloud databases to AWS RDS with a 15% latency reduction, maintaining high architectural standards."';
      }
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    }, 1000);
  };

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const text = chatInput;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setChatInput('');
    triggerChatResponse(text);
  };

  const handleSuggestionClick = (text: string) => {
    setMessages(prev => [...prev, { role: 'user', text }]);
    triggerChatResponse(text);
  };

  const totalWeeklyHours = activeProjects.reduce((sum, p) => sum + (p.hours || 0), 0);
  const averageProgress = activeProjects.length > 0 
    ? activeProjects.reduce((sum, p) => sum + (p.progress || 0), 0) / activeProjects.length 
    : 0;

  const performanceScore = Math.min(5.0, Math.max(1.0, 
    2.5 + (averageProgress / 100) * 1.5 + (totalWeeklyHours >= 40 ? 1.0 : (totalWeeklyHours / 40))
  )).toFixed(1);

  const suggestedPrompts = [
    "Draft my self-evaluation",
    "List my cloud skills gap",
    "Analyze my wellbeing risk",
  ];

  return (
    <div className="flex flex-col gap-6 relative h-full">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[110] animate-slide-in">
          <div className="glass bg-success-light border border-success/30 px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-xl">
            <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white shrink-0 shadow-md">
              <CheckCircle2 size={16}/>
            </div>
            <div>
              <p className="text-sm font-black text-success-dark">Success</p>
              <p className="text-xs text-success-dark font-medium mt-0.5">{toastMessage}</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-success hover:text-success-dark transition-colors ml-3 p-1 rounded-lg">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Page Title */}
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold mb-2 text-primary tracking-tight">Personal Dashboard</h1>
          <p className="text-secondary text-sm font-medium">Manage your personal replica, track goals, and record project achievements.</p>
        </div>
        
        <div className="flex gap-3">
          <Button className="border border-[var(--border-subtle)] bg-white/50 shadow-sm font-bold text-secondary hover:text-primary" size="sm" onClick={() => setIsEditOpen(true)}>
            <Edit size={16} className="mr-2"/> Edit Profile
          </Button>
          <Button className="shadow-sm font-bold bg-primary text-white" size="sm" onClick={handleDownload} disabled={isDownloading}>
            <Download size={16} className="mr-2" /> {isDownloading ? 'Syncing...' : 'Export Twin Data'}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 pr-2 flex flex-col gap-6" style={{ scrollbarWidth: 'none' }}>
        
        {/* ROW 1: Profile Header & Wellbeing */}
        <div className="grid grid-cols-12 gap-6">
          {/* Profile Card */}
          <Card className="col-span-12 xl:col-span-8 glass relative overflow-hidden p-8 flex items-center gap-8 group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-info/10 rounded-full blur-2xl group-hover:bg-info/20 transition-colors"></div>
            
            <div className="relative w-28 h-28 shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-info animate-pulse blur-md opacity-60"></div>
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-white text-4xl font-black shadow-xl border-4 border-white/50 backdrop-blur-sm">
                AC
              </div>
            </div>
            
            <div className="flex-1 z-10">
              <span className="text-[10px] font-black uppercase text-tertiary tracking-widest bg-white/50 px-2.5 py-1 rounded-md border border-[var(--border-subtle)]">
                Active Digital Twin
              </span>
              <h2 className="text-4xl font-black text-primary tracking-tight mt-3">Alex Carter</h2>
              <div className="flex items-center gap-4 mt-3 text-sm font-bold text-secondary">
                <span className="flex items-center gap-1.5"><Briefcase size={16} className="text-primary"/> Senior Cloud Engineer</span>
                <span className="flex items-center gap-1.5"><Activity size={16} className="text-info"/> Product & Engineering</span>
                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-secondary"/> Colombo</span>
              </div>
            </div>
          </Card>

          {/* Wellbeing Risk Widget */}
          <Card className="col-span-12 xl:col-span-4 glass p-6 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-warning/10 rounded-full blur-xl group-hover:bg-warning/20 transition-colors"></div>
            
            <div className="z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-[10px] text-secondary font-black uppercase tracking-widest flex items-center gap-2">
                  <ShieldAlert size={14} className="text-warning"/> Wellbeing Prediction
                </h3>
                <div className="text-[10px] font-black bg-warning-light text-warning-dark px-2 py-0.5 rounded-full border border-warning/20">
                  Medium
                </div>
              </div>
              
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-black text-primary">45<span className="text-xl text-secondary">%</span></span>
                <span className="text-[10px] font-bold text-warning mb-1">Burnout Risk</span>
              </div>
              
              <div className="w-full bg-[var(--border-subtle)] rounded-full h-2 mb-4 overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-warning to-danger h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '45%' }}></div>
              </div>

              <div className="bg-warning-light/50 rounded-lg p-3 flex gap-2 border border-warning/20">
                <AlertCircle size={14} className="text-warning shrink-0 mt-0.5"/>
                <p className="text-[10px] text-warning-dark font-bold leading-relaxed">
                  Warning: High overtime hours logged during the last 3 weeks.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* ROW 2: Key Metrics */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="glass flex flex-col gap-5 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-success/10 rounded-full blur-xl group-hover:bg-success/20 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <div>
                <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-1">Performance Rating</p>
                <h3 className="text-4xl font-black text-primary">{performanceScore}<span className="text-xl text-secondary">/5</span></h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-success-light flex items-center justify-center text-success shadow-sm border border-success/20">
                <TrendingUp size={24} />
              </div>
            </div>
            <div className="text-xs text-success flex items-center gap-1.5 font-bold bg-success-light/50 w-fit px-2.5 py-1 rounded-md z-10">
              +0.3 vs Last Quarter
            </div>
          </Card>
          
          <Card className="glass flex flex-col gap-5 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <div>
                <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-1">Logged Hours</p>
                <h3 className="text-4xl font-black text-primary">{totalWeeklyHours}<span className="text-xl text-secondary">h</span></h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center text-primary shadow-sm border border-primary/20">
                <Clock size={24} />
              </div>
            </div>
            <div className="text-xs text-primary flex items-center gap-1.5 font-bold bg-primary-light/50 w-fit px-2.5 py-1 rounded-md z-10">
              this week (Target: 40h)
            </div>
          </Card>

          <Card className="glass flex flex-col gap-5 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-info/10 rounded-full blur-xl group-hover:bg-info/20 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <div>
                <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-1">Goal Alignment</p>
                <h3 className="text-4xl font-black text-primary">65<span className="text-xl text-secondary">%</span></h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-info/10 flex items-center justify-center text-info shadow-sm border border-info/20">
                <Target size={24} />
              </div>
            </div>
            <div className="text-xs text-info flex items-center gap-1.5 font-bold bg-info/10 w-fit px-2.5 py-1 rounded-md z-10">
              Target: Cloud Architect
            </div>
          </Card>
        </div>

        {/* ROW 3: Projects & AI Assistant */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Interactive Project & Task Management Center */}
          <Card className="col-span-12 xl:col-span-8 glass p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-primary flex items-center gap-2">
                  <ListTodo size={20} className="text-primary"/> Project Management & Tasks
                </h3>
                <p className="text-xs text-secondary mt-1 font-medium">Directly log project completion rates, weekly hours, and check off deliverables.</p>
              </div>

              {/* Add Project Input */}
              <div className="flex items-center gap-2 bg-white/50 p-1.5 rounded-xl border border-[var(--border-subtle)] shadow-sm">
                <input 
                  type="text" 
                  placeholder="New project name..." 
                  className="h-9 px-3 rounded-lg border-none text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 bg-transparent w-48 text-primary placeholder-tertiary"
                  value={newProjectName}
                  onChange={e => setNewProjectName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddProject()}
                />
                <Button size="sm" onClick={handleAddProject} className="h-9 shadow-sm font-bold bg-primary text-white rounded-lg"><Plus size={14} className="mr-1"/> Add</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeProjects.map(project => (
                <div key={project.id} className="p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-[var(--border-subtle)] hover:border-primary/30 hover:shadow-md transition-all flex flex-col gap-5 relative group">
                  
                  {/* Project Info Header */}
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-extrabold text-base text-primary leading-tight">{project.name}</span>
                    <div className="flex items-center gap-2">
                      <select 
                        className={`text-[10px] font-black px-2.5 py-1 rounded-md outline-none cursor-pointer appearance-none border-none shadow-sm ${
                          project.status === 'On Track' ? 'bg-success-light text-success-dark' : 'bg-warning-light text-warning-dark'
                        }`}
                        value={project.status}
                        onChange={(e) => updateProject(project.id, 'status', e.target.value)}
                      >
                        <option>On Track</option>
                        <option>At Risk</option>
                        <option>Behind</option>
                      </select>
                      <button onClick={() => removeProject(project.id)} className="text-tertiary hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-danger-light">
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </div>

                  {/* Progress & Time Logging */}
                  <div className="grid grid-cols-2 gap-4 bg-[var(--bg-main)] p-4 rounded-xl border border-[var(--border-subtle)] shadow-inner">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-secondary uppercase flex justify-between tracking-wide">
                        Progress <span className="text-primary">{project.progress}%</span>
                      </label>
                      <input 
                        type="range" min="0" max="100" step="5"
                        value={project.progress}
                        onChange={e => updateProject(project.id, 'progress', parseInt(e.target.value))}
                        className="w-full accent-primary cursor-pointer h-1.5 bg-white rounded-lg appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                      />
                    </div>
                    <div className="flex flex-col gap-2 border-l border-[var(--border-subtle)] pl-4">
                      <label className="text-[10px] font-black text-secondary uppercase tracking-wide">Weekly Time</label>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-tertiary shrink-0" />
                        <input 
                          type="number" min="0"
                          className="h-7 w-full px-2 rounded-md border border-[var(--border-subtle)] text-xs font-bold text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-center bg-white shadow-sm" 
                          value={project.hours}
                          onChange={e => updateProject(project.id, 'hours', parseInt(e.target.value) || 0)}
                        />
                        <span className="text-[10px] text-tertiary font-bold uppercase">hrs</span>
                      </div>
                    </div>
                  </div>

                  {/* Tasks List */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-black text-secondary uppercase tracking-wider">Milestones</span>
                    <div className="flex flex-col gap-2.5">
                      {project.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 group/task">
                          <input 
                            type="checkbox" 
                            checked={task.done} 
                            onChange={() => toggleTask(project.id, idx)}
                            className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer mt-0.5"
                          />
                          <span className={`text-xs leading-relaxed ${task.done ? 'line-through text-tertiary font-semibold' : 'text-primary font-bold'}`}>{task.text}</span>
                        </div>
                      ))}
                      
                      {/* Add Task Input */}
                      <div className="flex items-center gap-2 mt-1 pt-3 border-t border-[var(--border-subtle)]">
                        <Plus size={14} className="text-tertiary"/>
                        <input 
                          type="text" 
                          placeholder="Log new deliverable..." 
                          className="text-xs bg-transparent border-none outline-none text-primary placeholder-tertiary flex-1 font-bold"
                          value={newTaskTexts[project.id] || ''}
                          onChange={e => setNewTaskTexts({ ...newTaskTexts, [project.id]: e.target.value })}
                          onKeyDown={e => e.key === 'Enter' && handleAddTask(project.id)}
                        />
                        <button onClick={() => handleAddTask(project.id)} className="text-[10px] font-black text-primary hover:bg-primary/10 px-2.5 py-1 rounded-md transition-colors uppercase tracking-wider">Add</button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </Card>

          {/* AI Twin Assistant Launcher Card */}
          <Card className="col-span-12 xl:col-span-4 glass p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-info opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center h-full justify-center">
              <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6 shadow-xl border border-white/30 group-hover:scale-105 transition-transform duration-300">
                <Bot size={40} className="drop-shadow-md" />
              </div>
              
              <h3 className="font-black text-2xl text-white mb-2">Personal AI Twin</h3>
              <p className="text-xs font-bold text-white/80 mb-8 leading-relaxed max-w-[220px]">
                Synchronized with your telemetry. Chat with your AI replica for career insights.
              </p>
              
              <button 
                onClick={() => setIsChatOpen(true)}
                className="bg-white text-primary hover:bg-primary-light px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles size={16} /> Open AI Assistant
              </button>
            </div>
          </Card>

        </div>
      </div>

      <AICareerAssistant 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        messages={messages} 
        chatInput={chatInput} 
        setChatInput={setChatInput} 
        onSend={handleSend}
        suggestedPrompts={suggestedPrompts}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  );
};
