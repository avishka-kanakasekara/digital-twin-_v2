import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Users, TrendingUp, Layers, Target, Activity, Minus, Plus, Equal, AlertCircle, ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { 
  mockHiringAttrition, mockDeptDistribution, DEPT_COLORS, 
  mockExperience, EXP_COLORS, mockSkills, mockSkillShortages 
} from '../../dummy/organization/workforcePlanningData';

export const WorkforcePlanning: React.FC = () => {
  const [scope, setScope] = useState('Engineering');
  const [horizon, setHorizon] = useState('Next 2 Quarters');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      triggerToast('Forecast updated successfully using ARIMA & historical models.');
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 relative pb-8">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[110] animate-slide-in">
          <div className="glass bg-primary/10 border-2 border-primary/30 px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-xl">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-md">
              <CheckCircle2 size={16}/>
            </div>
            <div>
              <p className="text-sm font-black text-primary">Requisition Initialized</p>
              <p className="text-xs text-secondary font-medium mt-0.5">{toastMessage}</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-secondary hover:text-primary transition-colors ml-3 p-1 rounded-lg">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold mb-2 text-primary tracking-tight">Workforce Planning & Skill Gaps</h1>
          <p className="text-secondary text-sm font-medium">Forecast headcount and skill shortages based on attrition, retirement, and growth targets.</p>
        </div>
        
        <div className="flex gap-4 bg-white/50 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-[var(--border-subtle)] items-center">
          <div className="flex items-center gap-2 px-3">
            <span className="text-xs font-semibold text-secondary">Scope:</span>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="text-sm font-bold text-primary bg-transparent outline-none cursor-pointer appearance-none pr-4"
            >
              <option>Engineering</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>All Departments</option>
            </select>
          </div>
          <div className="h-6 w-px bg-slate-200 self-center"></div>
          <div className="flex items-center gap-2 px-3">
            <span className="text-xs font-semibold text-secondary">Horizon:</span>
            <select
              value={horizon}
              onChange={(e) => setHorizon(e.target.value)}
              className="text-sm font-bold text-primary bg-transparent outline-none cursor-pointer appearance-none pr-4"
            >
              <option>Next 2 Quarters</option>
              <option>Next Year</option>
              <option>Next 3 Years</option>
            </select>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all ml-2"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Generating...</span>
            ) : (
              <span className="flex items-center gap-2"><Activity size={14} /> Run Forecast</span>
            )}
          </button>
        </div>
      </div>

      {/* Loading Overlay for ML Simulation */}
      <div className={`transition-opacity duration-300 ${isGenerating ? 'opacity-50 pointer-events-none filter blur-[2px]' : 'opacity-100'}`}>
      
      {/* Headcount Loss Projection */}
      <Card className="glass p-6">
        <h3 className="text-xs font-black uppercase text-tertiary tracking-widest mb-4">Headcount Loss Projection</h3>
        
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/40 p-4 rounded-2xl border border-[var(--border-subtle)]">
          {/* Current Headcount */}
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-[var(--border-subtle)] shadow-sm w-36">
            <Users className="text-primary mb-1" size={20} />
            <span className="text-3xl font-black text-primary">40</span>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-wider text-center mt-1">Current Headcount</span>
          </div>

          <Minus className="text-tertiary" size={20} />

          {/* Expected Attrition */}
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-[var(--border-subtle)] shadow-sm w-36">
            <div className="w-6 h-6 rounded-full bg-warning-light flex items-center justify-center text-warning-dark mb-1">
              <span className="text-xs font-bold">-</span>
            </div>
            <span className="text-3xl font-black text-warning-dark">5</span>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-wider text-center mt-1">Expected Attrition</span>
          </div>

          <Minus className="text-tertiary" size={20} />

          {/* Upcoming Retirements */}
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-[var(--border-subtle)] shadow-sm w-36">
            <div className="w-6 h-6 rounded-full bg-info/10 flex items-center justify-center text-info mb-1">
              <span className="text-xs font-bold">R</span>
            </div>
            <span className="text-3xl font-black text-primary">3</span>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-wider text-center mt-1">Upcoming Retirements</span>
          </div>

          <Plus className="text-tertiary" size={20} />

          {/* Planned Growth */}
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-[var(--border-subtle)] shadow-sm w-36">
            <div className="w-6 h-6 rounded-full bg-success-light flex items-center justify-center text-success mb-1">
              <span className="text-xs font-bold">+</span>
            </div>
            <span className="text-3xl font-black text-success">15</span>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-wider text-center mt-1">Planned Growth</span>
          </div>

          <Equal className="text-tertiary" size={20} />

          {/* Net Shortage */}
          <div className="flex flex-col items-center justify-center bg-danger/5 p-4 rounded-xl border border-danger/20 shadow-sm w-40 relative group">
            <div className="w-7 h-7 rounded-full bg-danger flex items-center justify-center text-white mb-1 shadow-md animate-pulse">
              <AlertCircle size={14} />
            </div>
            <span className="text-3xl font-black text-danger">-9</span>
            <span className="text-[10px] font-extrabold text-danger uppercase tracking-wider text-center mt-1">Net Shortage</span>
          </div>
        </div>
      </Card>

      {/* Main Grid: Skill Shortages & Analytics */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Left Column: Ranked Skill Shortages */}
        <div className="col-span-2 flex flex-col gap-6">
          <Card className="glass p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4">
              <h3 className="text-lg font-extrabold text-primary flex items-center gap-2">
                <Target size={20}/> Ranked Skill Shortages
              </h3>
              <button onClick={() => triggerToast("All active skill gap reports exported to PDF.")} className="text-xs font-bold text-primary hover:underline">Export Report</button>
            </div>
            
            <div className="flex flex-col gap-4">
              {mockSkillShortages.map((item) => (
                <div key={item.rank} className="p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-[var(--border-subtle)] hover:border-primary/30 shadow-sm flex items-center justify-between transition-all hover:-translate-y-0.5">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-black text-primary/40 w-8">{item.rank}</span>
                    <div>
                      <h4 className="font-extrabold text-primary text-base">{item.role}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-secondary bg-primary-light border border-primary/20 px-2 py-0.5 rounded-md">Skill: {item.skill}</span>
                        <span className="text-[10px] font-medium text-tertiary">Dept: {item.dept}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-bold text-tertiary uppercase tracking-wider mb-0.5">Urgency</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${item.urgency === 'HIGH' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning-dark'}`}>
                        {item.urgency}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-bold text-tertiary uppercase tracking-wider mb-0.5">Gap</span>
                      <span className="text-sm font-black text-danger">{item.gap}</span>
                    </div>

                    <button 
                      onClick={() => triggerToast(`Created recruitment requisition for ${item.role} (Dept: ${item.dept}). Post live in Workday.`)}
                      className="flex items-center gap-1 bg-danger hover:bg-danger-hover text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-colors"
                    >
                      Open Reqs <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Hiring vs Attrition Trends */}
          <Card className="glass flex flex-col h-[320px] p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-center mb-6 z-10">
              <div>
                <h3 className="text-lg font-extrabold text-primary flex items-center gap-2"><TrendingUp size={20}/> Hiring vs Attrition Trends</h3>
                <p className="text-xs text-secondary mt-1">Net headcount growth over time.</p>
              </div>
              <div className="flex gap-4 text-xs font-bold">
                <span className="flex items-center gap-1 text-success"><div className="w-2 h-2 rounded-full bg-success"></div> Hired</span>
                <span className="flex items-center gap-1 text-danger"><div className="w-2 h-2 rounded-full bg-danger"></div> Attrition</span>
              </div>
            </div>
            <div className="flex-1 w-full z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockHiringAttrition} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAttr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} dx={-10} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                  <Area type="monotone" dataKey="hired" stroke="var(--color-success)" strokeWidth={3} fillOpacity={1} fill="url(#colorHired)" />
                  <Area type="monotone" dataKey="attrition" stroke="var(--color-danger)" strokeWidth={3} fillOpacity={1} fill="url(#colorAttr)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right Column: Workforce Distributions */}
        <div className="col-span-1 flex flex-col gap-6">
          
          {/* Department Distribution (Fixed Height Bug Resolve) */}
          <Card className="glass flex flex-col h-[350px] p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
            <h3 className="text-lg font-extrabold text-primary flex items-center gap-2 mb-2"><Users size={20}/> Department Distribution</h3>
            <p className="text-xs text-secondary mb-4">Headcount spread across major divisions.</p>
            <div className="h-[180px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={mockDeptDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="employees" stroke="none">
                    {mockDeptDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={DEPT_COLORS[index % DEPT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 mt-4 overflow-y-auto max-h-[80px]" style={{ scrollbarWidth: 'none' }}>
              {mockDeptDistribution.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: DEPT_COLORS[i] }}></div>
                  <span className="text-[10px] font-bold text-secondary">{d.name} ({d.employees})</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Experience Levels (Fixed Height Bug Resolve) */}
          <Card className="glass flex flex-col h-[350px] p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
            <h3 className="text-lg font-extrabold text-primary flex items-center gap-2 mb-2"><Layers size={20}/> Experience Levels</h3>
            <p className="text-xs text-secondary mb-4">Tenure and seniority makeup.</p>
            <div className="h-[180px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={mockExperience} cx="50%" cy="50%" innerRadius={0} outerRadius={75} dataKey="value" stroke="var(--bg-main)" strokeWidth={2}>
                    {mockExperience.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={EXP_COLORS[index % EXP_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {mockExperience.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded shadow-sm" style={{ backgroundColor: EXP_COLORS[i] }}></div>
                    <span className="text-[10px] font-bold text-secondary">{d.name}</span>
                  </div>
                  <span className="text-[10px] font-black text-primary">{d.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Skill Distribution (Fixed Height Bug Resolve) */}
          <Card className="glass flex flex-col h-[350px] p-6 hover:shadow-lg transition-shadow relative overflow-hidden bg-gradient-to-br from-white to-primary-light/30">
            <h3 className="text-lg font-extrabold text-primary flex items-center gap-2 mb-2"><Activity size={20}/> Skill Distribution</h3>
            <p className="text-xs text-secondary mb-2">Organizational competency radar.</p>
            <div className="h-[200px] w-full relative mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="60%" data={mockSkills}>
                  <PolarGrid stroke="var(--border-subtle)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 9, fontWeight: 700 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Org Average" dataKey="A" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.4} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      
      </div> {/* End of ML Simulation Overlay */}
    </div>
  );
};
