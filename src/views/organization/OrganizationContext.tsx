import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { 
  Building, Globe, Briefcase, TrendingUp, 
  Target, BrainCircuit, Leaf, CheckCircle, 
  ChevronRight, MapPin, Network, Sparkles,
  BarChart, Flag, Bot, Cpu, Layers, Workflow, Rocket, AlertTriangle, Activity
} from 'lucide-react';

import { mockLocations, mockBusinessUnits, mockOKRs, mockAIReadiness, mockCapabilities, mockTransformations } from '../../dummy/organization/contextData';

export const OrganizationContext: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'strategy' | 'ai' | 'capability' | 'transformation'>('profile');

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold mb-2 text-primary tracking-tight">Organization Context & Strategy</h1>
          <p className="text-secondary text-sm font-medium">Layer 1 • Slow-changing reference context and declared strategy.</p>
        </div>
        
        <div className="flex gap-2 bg-white/50 backdrop-blur-md p-1.5 rounded-xl shadow-sm border border-[var(--border-subtle)] overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'profile' 
                ? 'bg-white shadow-sm text-primary border border-[var(--border-subtle)]' 
                : 'text-secondary hover:text-primary'
            }`}
          >
            Organization Profile
          </button>
          <button 
            onClick={() => setActiveTab('strategy')}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'strategy' 
                ? 'bg-white shadow-sm text-primary border border-[var(--border-subtle)]' 
                : 'text-secondary hover:text-primary'
            }`}
          >
            Strategic Objectives
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'ai' 
                ? 'bg-white shadow-sm text-primary border border-[var(--border-subtle)]' 
                : 'text-secondary hover:text-primary'
            }`}
          >
            AI Readiness
          </button>
          <button 
            onClick={() => setActiveTab('capability')}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'capability' 
                ? 'bg-white shadow-sm text-primary border border-[var(--border-subtle)]' 
                : 'text-secondary hover:text-primary'
            }`}
          >
            Capability Map
          </button>
          <button 
            onClick={() => setActiveTab('transformation')}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'transformation' 
                ? 'bg-white shadow-sm text-primary border border-[var(--border-subtle)]' 
                : 'text-secondary hover:text-primary'
            }`}
          >
            Transformation Roadmap
          </button>
        </div>
      </div>

      {activeTab === 'profile' && (
        <div className="grid grid-cols-3 gap-6 animate-fade-in">
          <div className="col-span-2 flex flex-col gap-6">
            <Card className="glass flex flex-col p-6 gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              
              <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4 z-10">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                  <Building size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-primary">Core Identity</h3>
                  <p className="text-xs text-secondary font-medium">Industry and operational classification</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 z-10">
                <div>
                  <p className="text-xs text-secondary font-bold uppercase tracking-wider mb-1">Industry Sector</p>
                  <p className="text-sm font-semibold text-primary bg-[var(--bg-main)] px-3 py-2 rounded-lg border border-[var(--border-subtle)]">Enterprise Software / B2B SaaS</p>
                </div>
                <div>
                  <p className="text-xs text-secondary font-bold uppercase tracking-wider mb-1">Operating Model</p>
                  <p className="text-sm font-semibold text-primary bg-[var(--bg-main)] px-3 py-2 rounded-lg border border-[var(--border-subtle)]">Hybrid Matrix / Product-Led</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-secondary font-bold uppercase tracking-wider mb-1">Strategy Statement</p>
                  <p className="text-sm text-primary leading-relaxed bg-[var(--bg-main)] px-4 py-3 rounded-lg border border-[var(--border-subtle)]">
                    "To empower global enterprises with predictive intelligence, bridging the gap between raw data and actionable operational foresights."
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass flex flex-col p-6 gap-6">
              <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
                <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center text-info">
                  <Network size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-primary">Business Units</h3>
                  <p className="text-xs text-secondary font-medium">Internal organizational structure</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {mockBusinessUnits.map((bu, i) => (
                  <div key={i} className="flex flex-col gap-2 p-4 rounded-xl border border-[var(--border-subtle)] bg-white/50 hover:bg-white transition-colors group">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-primary">{bu.name}</h4>
                      <span className="text-[10px] font-bold text-secondary bg-[var(--bg-main)] px-2 py-1 rounded-md">{bu.headcount} EMP</span>
                    </div>
                    <p className="text-xs text-tertiary flex items-center gap-1.5"><Briefcase size={12} /> {bu.head}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="col-span-1 flex flex-col gap-6">
            <Card className="glass flex flex-col p-6 gap-4 bg-gradient-to-br from-primary-light/30 to-transparent border-primary/20 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
              <div className="flex items-center gap-3 z-10">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-primary">Digital Maturity</h3>
                  <p className="text-xs text-secondary font-medium">Transformation Level</p>
                </div>
              </div>
              
              <div className="mt-4 z-10">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-black text-primary">Level 4</span>
                  <span className="text-xs font-bold text-success uppercase tracking-widest">Optimized</span>
                </div>
                <div className="w-full h-2 bg-[var(--border-subtle)] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary w-4/5 rounded-full"></div>
                </div>
                <p className="text-xs text-secondary mt-4 leading-relaxed font-medium">
                  The organization utilizes AI-driven workflows and continuous delivery. Ready for full digital twin simulation capabilities.
                </p>
              </div>
            </Card>

            <Card className="glass flex flex-col p-6 gap-4">
              <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
                <div className="w-10 h-10 rounded-xl bg-warning-light/50 flex items-center justify-center text-warning-dark">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-primary">Global Presence</h3>
                  <p className="text-xs text-secondary font-medium">Active operational regions</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                {mockLocations.map((loc, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--bg-main)] transition-colors border border-transparent hover:border-[var(--border-subtle)]">
                    <Globe size={16} className="text-tertiary" />
                    <span className="text-sm font-semibold text-primary">{loc}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'strategy' && (
        <div className="grid grid-cols-1 gap-6 animate-fade-in">
          <div className="grid grid-cols-3 gap-6">
            <Card className="glass p-6 border-l-4 border-l-primary flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <h3 className="font-extrabold text-primary flex items-center gap-2"><Target size={18} /> Vision & KPIs</h3>
              </div>
              <p className="text-sm text-secondary font-medium leading-relaxed mb-1">
                Become the default predictive management platform for Fortune 500 companies by 2027.
              </p>
              <div className="mt-auto pt-2 border-t border-[var(--border-subtle)]">
                <p className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2">Top-Level KPIs</p>
                <ul className="text-sm text-primary font-semibold space-y-1 list-disc list-inside">
                  <li>$100M ARR by Q4 2026</li>
                  <li>120% Net Revenue Retention</li>
                </ul>
              </div>
            </Card>

            <Card className="glass p-6 border-l-4 border-l-info flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <h3 className="font-extrabold text-primary flex items-center gap-2"><BrainCircuit size={18} /> AI & Transformation</h3>
              </div>
              <div>
                <p className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2">AI Pillars</p>
                <ul className="text-sm text-secondary font-medium space-y-1 list-disc list-inside">
                  <li>Automated Insight Generation</li>
                  <li>Ethical AI Governance</li>
                </ul>
              </div>
              <div className="mt-auto pt-2 border-t border-[var(--border-subtle)]">
                <p className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2">Transformation Goals</p>
                <ul className="text-sm text-secondary font-medium space-y-1 list-disc list-inside">
                  <li>100% Cloud-Native Operations</li>
                  <li>Agile across all business units</li>
                </ul>
              </div>
            </Card>
            <Card className="glass p-6 border-l-4 border-l-success flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <h3 className="font-extrabold text-primary flex items-center gap-2"><Leaf size={18} /> ESG Goals</h3>
              </div>
              <ul className="text-sm text-secondary font-medium space-y-1.5 list-disc list-inside">
                <li>Net-Zero Operations by 2030</li>
                <li>50% Leadership Diversity</li>
                <li>100% Ethical Supply Chain</li>
              </ul>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mt-4">
              <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
                <Flag size={20} className="text-secondary" /> Quarterly OKRs Tracking
              </h2>
              <div className="text-sm font-bold text-secondary bg-white/60 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] shadow-sm">
                Q2 2026
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {mockOKRs.map((okr) => (
                <Card key={okr.id} className="glass p-5 flex flex-col gap-4 hover:border-primary/30 transition-colors group">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-base font-bold text-primary">{okr.title}</h3>
                        {okr.status === 'at-risk' ? (
                          <span className="text-[10px] font-black uppercase tracking-wider bg-warning-light text-warning-dark px-2 py-0.5 rounded-full border border-warning/20">At Risk</span>
                        ) : (
                          <span className="text-[10px] font-black uppercase tracking-wider bg-success-light text-success px-2 py-0.5 rounded-full border border-success/20">On Track</span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-tertiary">Owned by: <span className="text-secondary">{okr.owner}</span></p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-primary">{okr.progress}%</span>
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Completion</p>
                    </div>
                  </div>
                  
                  <div className="w-full h-2 bg-[var(--bg-main)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                    <div 
                      className={`h-full rounded-full ${okr.status === 'at-risk' ? 'bg-warning' : 'bg-primary'}`} 
                      style={{ width: `${okr.progress}%` }}
                    ></div>
                  </div>

                  <div className="bg-[var(--bg-main)] rounded-xl p-3 border border-[var(--border-subtle)]">
                    <p className="text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Linked Initiatives</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {okr.initiatives.map((init, idx) => (
                        <li key={idx} className="text-sm text-primary flex items-center gap-2">
                          <CheckCircle size={14} className={okr.progress > 50 ? "text-success" : "text-tertiary"} />
                          {init}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="grid grid-cols-3 gap-6 animate-fade-in">
          <Card className="glass col-span-3 p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6 border border-primary/10 bg-primary/5">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shrink-0 shadow-sm">
                <Bot size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-extrabold text-primary">AI Readiness Index</h2>
                <p className="text-sm font-medium text-secondary mt-1 max-w-md">Aggregate score of adoption signals, literacy, and automation potential.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 bg-white/60 px-6 py-4 rounded-xl border border-[var(--border-subtle)] shadow-sm shrink-0">
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-3xl font-black text-primary">{mockAIReadiness.overallScore}</span>
                  <span className="text-sm font-bold text-tertiary">/100</span>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Overall</span>
              </div>
              <div className="text-center border-l border-[var(--border-subtle)] pl-6">
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-xl font-black text-info">{mockAIReadiness.literacyScore}</span>
                  <span className="text-xs font-bold text-tertiary">/100</span>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Literacy</span>
              </div>
              <div className="text-center border-l border-[var(--border-subtle)] pl-6">
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-xl font-black text-success">{mockAIReadiness.adoptionScore}</span>
                  <span className="text-xs font-bold text-tertiary">/100</span>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Adoption</span>
              </div>
            </div>
          </Card>
          
          <Card className="glass col-span-2 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <h3 className="text-base font-extrabold text-primary flex items-center gap-2">
                <Cpu size={18} /> Automation Opportunities
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {mockAIReadiness.automationOpportunities.map((opp, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-[var(--border-subtle)] shadow-sm">
                  <div className="flex flex-col">
                    <h4 className="font-bold text-sm text-primary">{opp.role}</h4>
                    <span className="text-xs text-secondary font-medium mt-0.5">{opp.department}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
                    <span className="text-[10px] font-bold text-warning-dark uppercase tracking-wider">High Susceptibility</span>
                    <div className="w-24 h-2 bg-warning-light/30 rounded-full overflow-hidden border border-warning/10">
                      <div className="h-full bg-warning rounded-full" style={{ width: `${opp.potential}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="glass col-span-1 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <h3 className="text-base font-extrabold text-primary flex items-center gap-2">
                <BrainCircuit size={18} /> AI Projects by Dept
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {mockAIReadiness.deptProjects.map((dp, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-[var(--border-subtle)]">
                  <span className="text-sm font-semibold text-primary">{dp.dept}</span>
                  <span className="text-xs font-bold bg-primary-light text-primary px-2.5 py-1 rounded-md">{dp.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'capability' && (
        <div className="grid grid-cols-1 gap-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-primary">Business Capability Map</h2>
              <p className="text-xs text-secondary font-medium mt-0.5">Tracking maturity and identifying critical skill gaps linked to business goals.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {mockCapabilities.map((cap, idx) => (
              <Card key={idx} className="glass p-5 flex flex-col gap-4 hover:-translate-y-0.5 transition-transform">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-primary">{cap.name}</h3>
                    <span className="text-xs font-semibold text-secondary">{cap.type} Capability</span>
                  </div>
                  {cap.gap > 0 ? (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-warning-light text-warning-dark px-2 py-0.5 rounded-full border border-warning/20 flex items-center gap-1">
                      <AlertTriangle size={10} /> Gap Identified
                    </span>
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-success-light text-success px-2 py-0.5 rounded-full border border-success/20">
                      Optimized
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 bg-[var(--bg-main)] p-3 rounded-lg border border-[var(--border-subtle)]">
                  <div>
                    <p className="text-[10px] font-bold text-tertiary uppercase tracking-wider mb-1">Maturity Level</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(lvl => (
                        <div key={lvl} className={`h-1.5 w-full rounded-full ${lvl <= cap.maturity ? 'bg-primary' : 'bg-[var(--border-color)]'}`}></div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-tertiary uppercase tracking-wider mb-1">Skill Gap Impact</p>
                    <span className={`text-sm font-black ${cap.gap > 1 ? 'text-danger' : cap.gap === 1 ? 'text-warning' : 'text-success'}`}>
                      {cap.gap > 1 ? 'High' : cap.gap === 1 ? 'Medium' : 'None'}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'transformation' && (
        <div className="grid grid-cols-1 gap-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
              <Rocket size={20} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-primary">Transformation Roadmap</h2>
              <p className="text-xs text-secondary font-medium mt-0.5">Tracking active organizational transformation initiatives and scorecards.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {mockTransformations.map((trans) => (
              <Card key={trans.id} className="glass p-5 flex flex-col gap-4 border-l-4 border-l-primary group">
                <div className="flex justify-between items-start border-b border-[var(--border-subtle)] pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-primary">{trans.name}</h3>
                      {trans.status === 'at-risk' ? (
                         <span className="text-[10px] font-black uppercase tracking-wider bg-danger-light text-danger px-2 py-0.5 rounded-full border border-danger/20">At Risk</span>
                      ) : (
                         <span className="text-[10px] font-black uppercase tracking-wider bg-success-light text-success px-2 py-0.5 rounded-full border border-success/20">On Track</span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-secondary flex items-center gap-1.5">
                      <Briefcase size={12} /> Owner: {trans.owner}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-primary">{trans.progress}%</span>
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Overall Progress</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-bold text-tertiary uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Activity size={14} /> Milestone Status
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {trans.milestones.map((ms, idx) => (
                      <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg border ${ms.completed ? 'bg-success-light/30 border-success/20' : 'bg-white border-[var(--border-subtle)]'}`}>
                        {ms.completed ? (
                          <CheckCircle size={16} className="text-success shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-[var(--border-subtle)] shrink-0"></div>
                        )}
                        <span className={`text-sm font-semibold ${ms.completed ? 'text-success-dark' : 'text-primary'}`}>{ms.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
