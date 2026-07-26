import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { 
  Building, Globe, Briefcase, 
  Target, BrainCircuit, Leaf, CheckCircle, 
  ChevronRight, MapPin, Network, Sparkles,
   Flag, Bot, Cpu, Layers, Rocket, AlertTriangle, Activity
} from 'lucide-react';

import { mockLocations, mockBusinessUnits, mockOKRs, mockAIReadiness, mockCapabilities, mockTransformations } from '../../dummy/organization/contextData';

export const OrganizationContext: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'strategy' | 'ai' | 'capability' | 'transformation'>('profile');

  const tabs = [
    { id: 'profile', label: 'Organization Profile' },
    { id: 'strategy', label: 'Strategic Objectives' },
    { id: 'ai', label: 'AI Readiness' },
    { id: 'capability', label: 'Capability Map' },
    { id: 'transformation', label: 'Transformation Roadmap' }
  ] as const;

  return (
    <div className="flex flex-col gap-6 relative w-full pb-4">
      <div className="flex justify-between items-end z-10">
        <div>
          <h1 className="text-3xl font-extrabold mb-2 text-primary tracking-tight">Organization Context & Strategy</h1>
          <p className="text-secondary text-sm font-medium">Layer 1 • Slow-changing reference context and declared strategy.</p>
        </div>
        
        <div className="flex gap-2 bg-white/50 backdrop-blur-xl p-2 rounded-xl shadow-sm border border-[var(--border-subtle)] overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id 
                  ? 'bg-white shadow-sm text-primary border border-[var(--border-subtle)]' 
                  : 'text-secondary hover:text-primary bg-white/30 hover:bg-white/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-3 gap-6 animate-fade-in">
            <div className="col-span-2 flex flex-col gap-6">
              
              <Card className="glass flex flex-col p-6 gap-6 relative overflow-hidden transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4 z-10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr flex items-center justify-center text-inverse shadow-sm">
                    <Building size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-primary">Core Identity</h3>
                    <p className="text-xs text-secondary font-medium">Industry and operational classification</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 z-10">
                  <div className="bg-[var(--bg-main)]/50 p-4 rounded-xl border border-[var(--border-subtle)] hover:border-primary transition-colors">
                    <p className="text-xs text-secondary font-bold uppercase tracking-wider mb-2">Industry Sector</p>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary" style={{ width: '8px', height: '8px' }}></div>
                      <p className="text-sm font-bold text-primary">Enterprise Software / B2B SaaS</p>
                    </div>
                  </div>
                  <div className="bg-[var(--bg-main)]/50 p-4 rounded-xl border border-[var(--border-subtle)] hover:border-primary transition-colors">
                    <p className="text-xs text-secondary font-bold uppercase tracking-wider mb-2">Operating Model</p>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-secondary" style={{ width: '8px', height: '8px' }}></div>
                      <p className="text-sm font-bold text-primary">Hybrid Matrix / Product-Led</p>
                    </div>
                  </div>
                  <div className="col-span-2 mt-2">
                    <p className="text-xs text-secondary font-bold uppercase tracking-wider mb-2">Strategy Statement</p>
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-br rounded-bl-sm rounded-br-sm" style={{ width: '4px' }}></div>
                      <p className="pl-6 pr-4 py-3 bg-[var(--bg-main)]/50 rounded-xl border border-[var(--border-subtle)] text-sm font-medium text-primary italic leading-relaxed">
                        "To empower global enterprises with predictive intelligence, bridging the gap between raw data and actionable operational foresights."
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="glass flex flex-col p-6 gap-6 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-3 z-10">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-main)] flex items-center justify-center text-secondary shadow-inner border border-[var(--border-subtle)]">
                    <Network size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-primary">Business Units</h3>
                    <p className="text-xs text-secondary font-medium">Internal organizational structure</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {mockBusinessUnits.map((bu, i) => (
                    <div key={i} className="flex flex-col gap-2 p-4 bg-white/80 rounded-xl border border-[var(--border-subtle)] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-primary text-sm group-hover:text-primary transition-colors">{bu.name}</span>
                        <span className="text-[10px] font-bold bg-primary-light text-primary px-2 py-1 rounded-md border border-[var(--border-subtle)]">{bu.headcount} EMP</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-secondary font-medium mt-1">
                        <Briefcase size={12} className="text-tertiary" /> {bu.head}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="col-span-1 flex flex-col gap-6">
              <Card className="glass flex flex-col p-6 gap-5 bg-gradient-to-br text-inverse relative overflow-hidden transition-all duration-300 hover:shadow-md border-white/30">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/30 rounded-full blur-md"></div>
                
                <div className="flex items-center gap-3 z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center text-inverse border border-white/40 shadow-sm">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-inverse">Digital Maturity</h3>
                    <p className="text-xs text-inverse font-medium opacity-60">Transformation Level</p>
                  </div>
                </div>
                
                <div className="mt-2 z-10">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-3xl font-extrabold tracking-tight text-inverse">Level 4</span>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider bg-white px-2 py-1 rounded-md shadow-sm">Optimized</span>
                  </div>
                  
                  <div className="w-full h-2 bg-slate-900/40 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-white rounded-full animate-pulse" style={{ width: '80%' }}></div>
                  </div>
                  
                  <p className="text-xs text-inverse mt-4 leading-relaxed font-medium bg-slate-900/40 p-3 rounded-lg border border-white/30 backdrop-blur-sm">
                    The organization utilizes AI-driven workflows and continuous delivery. Ready for full digital twin simulation capabilities.
                  </p>
                </div>
              </Card>

              <Card className="glass flex flex-col p-6 gap-4 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
                  <div className="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center text-success border border-[var(--border-subtle)]">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-primary">Global Presence</h3>
                    <p className="text-xs text-secondary font-medium">Active operational regions</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mockLocations.map((loc, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] shadow-sm hover:border-primary transition-colors cursor-pointer group">
                      <MapPin size={12} className="text-secondary group-hover:text-primary transition-colors" />
                      <span className="text-xs font-bold text-primary">{loc}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="grid grid-cols-3 gap-6">
              
              <Card className="glass-panel p-6 flex flex-col gap-4 border border-[var(--border-subtle)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ borderTopWidth: '4px', borderTopColor: 'var(--color-info)'}}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[var(--bg-main)] rounded-lg flex items-center justify-center text-info shadow-sm border border-[var(--border-subtle)]"><Target size={16}/></div>
                  <h3 className="text-base font-bold text-primary">Vision & KPIs</h3>
                </div>
                <p className="text-sm text-secondary font-medium leading-relaxed bg-[var(--bg-main)]/50 p-3 rounded-lg border border-[var(--border-subtle)]">
                  Become the default predictive management platform for Fortune 500 companies by 2027.
                </p>
                <div className="mt-auto pt-4 border-t border-[var(--border-subtle)]">
                  <p className="text-[10px] font-bold text-tertiary uppercase tracking-wider mb-2">Top-Level KPIs</p>
                  <ul className="text-xs text-primary font-bold space-y-2">
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-success"/> $100M ARR by Q4 2026</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-success"/> 120% Net Revenue Retention</li>
                  </ul>
                </div>
              </Card>

              <Card className="glass-panel p-6 flex flex-col gap-4 border border-[var(--border-subtle)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ borderTopWidth: '4px', borderTopColor: 'var(--color-secondary)'}}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[var(--bg-main)] rounded-lg flex items-center justify-center text-secondary shadow-sm border border-[var(--border-subtle)]"><BrainCircuit size={16}/></div>
                  <h3 className="text-base font-bold text-primary">AI & Transformation</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-tertiary uppercase tracking-wider mb-2">AI Pillars</p>
                    <ul className="text-xs text-primary font-semibold space-y-2">
                      <li className="flex items-center gap-2"><div className="rounded-full bg-secondary" style={{ width: '6px', height: '6px' }}></div> Automated Insight Generation</li>
                      <li className="flex items-center gap-2"><div className="rounded-full bg-secondary" style={{ width: '6px', height: '6px' }}></div> Ethical AI Governance</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-[var(--border-subtle)]">
                    <p className="text-[10px] font-bold text-tertiary uppercase tracking-wider mb-2">Transformation Goals</p>
                    <ul className="text-xs text-primary font-semibold space-y-2">
                      <li className="flex items-center gap-2"><div className="rounded-full bg-secondary" style={{ width: '6px', height: '6px' }}></div> 100% Cloud-Native Operations</li>
                      <li className="flex items-center gap-2"><div className="rounded-full bg-secondary" style={{ width: '6px', height: '6px' }}></div> Agile across all business units</li>
                    </ul>
                  </div>
                </div>
              </Card>
              
              <Card className="glass-panel p-6 flex flex-col gap-4 border border-[var(--border-subtle)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ borderTopWidth: '4px', borderTopColor: 'var(--color-success)'}}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[var(--bg-main)] rounded-lg flex items-center justify-center text-success shadow-sm border border-[var(--border-subtle)]"><Leaf size={16}/></div>
                  <h3 className="text-base font-bold text-primary">ESG Goals</h3>
                </div>
                <ul className="text-xs text-primary font-semibold space-y-2 mt-1">
                  <li className="flex items-start gap-2 bg-[var(--bg-main)]/50 p-2.5 rounded-lg border border-[var(--border-subtle)]">
                    <div className="mt-1 rounded-sm bg-success shrink-0" style={{ width: '6px', height: '6px' }}></div>
                    <span>Net-Zero Operations by 2030</span>
                  </li>
                  <li className="flex items-start gap-2 bg-[var(--bg-main)]/50 p-2.5 rounded-lg border border-[var(--border-subtle)]">
                    <div className="mt-1 rounded-sm bg-success shrink-0" style={{ width: '6px', height: '6px' }}></div>
                    <span>50% Leadership Diversity</span>
                  </li>
                  <li className="flex items-start gap-2 bg-[var(--bg-main)]/50 p-2.5 rounded-lg border border-[var(--border-subtle)]">
                    <div className="mt-1 rounded-sm bg-success shrink-0" style={{ width: '6px', height: '6px' }}></div>
                    <span>100% Ethical Supply Chain</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
                  <div className="p-1 bg-[var(--bg-main)] rounded-lg border border-[var(--border-subtle)] shadow-sm"><Flag size={18} className="text-info" /></div>
                  Quarterly OKRs Tracking
                </h2>
                <div className="text-xs font-bold text-primary bg-white px-3 py-1 rounded-lg border border-[var(--border-subtle)] shadow-sm flex items-center gap-1.5">
                  <Activity size={14} className="text-info"/> Q2 2026 Active
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {mockOKRs.map((okr) => (
                  <Card key={okr.id} className="p-5 flex flex-col gap-4 glass-panel transition-all duration-300 hover:shadow-md hover:border-primary group">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-primary leading-tight mb-1 group-hover:text-primary transition-colors">{okr.title}</h3>
                        <p className="text-[10px] font-semibold text-secondary flex items-center gap-1">
                          Owner: <span className="text-primary bg-[var(--bg-main)] px-1.5 py-0.5 rounded-md border border-[var(--border-subtle)]">{okr.owner}</span>
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end shrink-0 ml-2">
                        <span className="text-2xl font-extrabold text-primary tracking-tight">{okr.progress}<span className="text-xs text-tertiary">%</span></span>
                        {okr.status === 'at-risk' ? (
                          <span className="text-[10px] font-bold uppercase tracking-wide bg-danger-light text-danger px-1.5 py-0.5 rounded-md mt-0.5">At Risk</span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-wide bg-success-light text-success px-1.5 py-0.5 rounded-md mt-0.5">On Track</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="w-full h-2 bg-[var(--bg-main)] rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${okr.status === 'at-risk' ? 'bg-danger' : 'bg-gradient-to-r'}`} 
                        style={{ width: `${okr.progress}%` }}
                      ></div>
                    </div>

                    <div className="bg-[var(--bg-main)]/50 rounded-lg p-3 border border-[var(--border-subtle)] mt-auto">
                      <p className="text-[10px] font-bold text-tertiary mb-2 uppercase tracking-wider">Key Initiatives</p>
                      <ul className="flex flex-col gap-2">
                        {okr.initiatives.map((init, idx) => (
                          <li key={idx} className="text-[11px] font-medium text-secondary flex items-start gap-1.5 leading-relaxed">
                            <CheckCircle size={12} className={`mt-0.5 shrink-0 ${okr.progress > 50 ? "text-success" : "text-tertiary"}`} />
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
          <div className="flex flex-col gap-6 animate-fade-in">
            <Card className="p-6 flex items-center justify-between gap-6 bg-gradient-to-br border-white/30 rounded-2xl shadow-md relative overflow-hidden text-inverse">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-md"></div>
              
              <div className="flex items-center gap-4 flex-1 z-10">
                <div className="w-16 h-16 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center text-inverse border border-white/40 shadow-sm shrink-0">
                  <Bot size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight mb-1">AI Readiness Index</h2>
                  <p className="text-xs font-medium opacity-90 max-w-lg leading-relaxed">
                    A holistic evaluation of your organization's AI adoption signals, workforce literacy, and potential for automation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 bg-slate-900/40 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/30 z-10 shrink-0 shadow-inner text-inverse">
                <div className="text-center flex flex-col items-center">
                  <span className="text-4xl font-extrabold mb-1 text-white">{mockAIReadiness.overallScore}</span>
                  <span className="text-[10px] font-bold opacity-80 uppercase tracking-wider">Overall Score</span>
                </div>
                <div className="h-12 bg-white/30" style={{ width: '1px' }}></div>
                <div className="text-center flex flex-col items-center">
                  <span className="text-2xl font-bold text-white">{mockAIReadiness.literacyScore}</span>
                  <span className="text-[10px] font-bold opacity-80 uppercase tracking-wider">Literacy</span>
                </div>
                <div className="h-12 bg-white/30" style={{ width: '1px' }}></div>
                <div className="text-center flex flex-col items-center">
                  <span className="text-2xl font-bold text-white">{mockAIReadiness.adoptionScore}</span>
                  <span className="text-[10px] font-bold opacity-80 uppercase tracking-wider">Adoption</span>
                </div>
              </div>
            </Card>
            
            <div className="grid grid-cols-3 gap-6">
              <Card className="col-span-2 p-6 flex flex-col gap-4 glass-panel transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-3">
                  <div className="p-2 bg-warning-light rounded-lg text-warning border border-warning/20"><Cpu size={16}/></div>
                  <h3 className="text-base font-bold text-primary">High-Yield Automation Opportunities</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {mockAIReadiness.automationOpportunities.map((opp, idx) => (
                    <div key={idx} className="group flex items-center justify-between p-4 rounded-xl bg-white border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex flex-col">
                        <h4 className="font-bold text-sm text-primary">{opp.role}</h4>
                        <span className="text-[11px] font-medium text-secondary mt-1 flex items-center gap-1">
                          <Layers size={10} /> {opp.department}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0" style={{ width: '10rem' }}>
                        <div className="flex justify-between w-full items-end">
                          <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">Susceptibility</span>
                          <span className="text-xs font-extrabold text-warning">{opp.potential}%</span>
                        </div>
                        <div className="w-full h-2 bg-[var(--bg-main)] rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-warning rounded-full transition-all duration-300" style={{ width: `${opp.potential}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="col-span-1 p-6 flex flex-col gap-4 glass-panel transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-3">
                  <div className="p-2 bg-primary-light rounded-lg text-primary border border-[var(--border-subtle)]"><BrainCircuit size={16}/></div>
                  <h3 className="text-base font-bold text-primary">Active AI Projects</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {mockAIReadiness.deptProjects.map((dp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white border border-[var(--border-subtle)] shadow-sm hover:border-primary transition-colors cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary group-hover:scale-110 transition-transform" style={{ width: '6px', height: '6px' }}></div>
                        <span className="text-xs font-bold text-secondary group-hover:text-primary">{dp.dept}</span>
                      </div>
                      <span className="text-xs font-bold bg-primary-light text-primary px-2 py-0.5 rounded border border-[var(--border-subtle)]">{dp.count}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'capability' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr flex items-center justify-center text-inverse shadow-md">
                <Layers size={24} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-primary tracking-tight">Business Capability Map</h2>
                <p className="text-xs text-secondary font-medium mt-1">Identify critical skill gaps linked to business goals and maturity.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {mockCapabilities.map((cap, idx) => (
                <Card key={idx} className="p-6 flex flex-col gap-5 glass-panel hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">{cap.type} Capability</span>
                      <h3 className="text-lg font-bold text-primary mt-1 group-hover:text-primary transition-colors">{cap.name}</h3>
                    </div>
                    {cap.gap > 0 ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-danger-light text-danger px-2 py-1 rounded-md border hover:border-danger/30 flex items-center gap-1 shadow-sm transition-colors">
                        <AlertTriangle size={12} /> Gap Detected
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-success-light text-success px-2 py-1 rounded-md border border-[var(--border-subtle)] flex items-center gap-1 shadow-sm">
                        <CheckCircle size={12} /> Optimized
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="bg-[var(--bg-main)]/50 p-4 rounded-xl border border-[var(--border-subtle)]">
                      <p className="text-[10px] font-bold text-tertiary uppercase tracking-wider mb-2">Maturity Level</p>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map(lvl => (
                          <div 
                            key={lvl} 
                            className={`h-2 w-full rounded-full transition-colors duration-300 ${
                              lvl <= cap.maturity ? 'bg-primary' : 'bg-white border border-[var(--border-subtle)]'
                            }`}
                          ></div>
                        ))}
                      </div>
                      <div className="mt-2 text-right">
                        <span className="text-base font-extrabold text-primary">{cap.maturity}</span><span className="text-xs font-bold text-tertiary">/5</span>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--bg-main)]/50 p-4 rounded-xl border border-[var(--border-subtle)] flex flex-col justify-between">
                      <p className="text-[10px] font-bold text-tertiary uppercase tracking-wider mb-2">Skill Gap Impact</p>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full ${cap.gap > 1 ? 'bg-danger animate-pulse' : cap.gap === 1 ? 'bg-warning' : 'bg-success'}`} style={{ width: '10px', height: '10px'}}></div>
                        <span className={`text-sm font-extrabold ${cap.gap > 1 ? 'text-danger' : cap.gap === 1 ? 'text-warning' : 'text-success'}`}>
                          {cap.gap > 1 ? 'High Risk' : cap.gap === 1 ? 'Medium Risk' : 'None'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transformation' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-inverse shadow-md">
                <Rocket size={24} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-primary tracking-tight">Transformation Roadmap</h2>
                <p className="text-xs text-secondary font-medium mt-1">Active organizational transformation initiatives and scorecards.</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              {mockTransformations.map((trans) => (
                <Card key={trans.id} className="p-0 glass-panel hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group">
                  <div className="flex flex-col">
                    <div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] relative">
                      <div className={`absolute left-0 top-0 h-full ${trans.status === 'at-risk' ? 'bg-danger' : 'bg-primary'}`} style={{ width: '6px' }}></div>
                      
                      <div className="flex justify-between items-start pl-2">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {trans.status === 'at-risk' ? (
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-danger-light text-danger px-2 py-1 rounded-md">At Risk</span>
                            ) : (
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-success-light text-success px-2 py-1 rounded-md shadow-sm">On Track</span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-primary mb-1">{trans.name}</h3>
                          <p className="text-xs font-semibold text-secondary flex items-center gap-2">
                            <Briefcase size={14} className="text-tertiary" /> Lead: {trans.owner}
                          </p>
                        </div>
                        <div className="text-right" style={{ width: '10rem' }}>
                          <div className="flex justify-between items-end mb-1">
                            <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">Progress</span>
                            <span className="text-2xl font-extrabold text-primary">{trans.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-[var(--bg-main)] rounded-full overflow-hidden shadow-inner border border-[var(--border-subtle)]">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${trans.status === 'at-risk' ? 'bg-danger' : 'bg-gradient-to-r'}`}
                              style={{ width: `${trans.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-[var(--bg-main)]/50">
                      <p className="text-[10px] font-bold text-tertiary uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Activity size={14} className="text-info"/> Milestone Tracker
                      </p>
                      
                      <div className="relative">
                        <div className="absolute left-0 top-4 bottom-4 bg-[var(--border-subtle)] -z-10" style={{ width: '2px', marginLeft: '19px' }}></div>
                        
                        <div className="flex flex-col gap-4">
                          {trans.milestones.map((ms, idx) => (
                            <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                              ms.completed 
                                ? 'bg-success-light border border-white shadow-sm' 
                                : 'bg-white border border-[var(--border-subtle)] shadow-sm hover:border-primary'
                            }`}>
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                                ms.completed ? 'bg-success text-inverse' : 'bg-[var(--bg-main)] border border-[var(--border-subtle)] text-tertiary'
                              }`}>
                                {ms.completed ? <CheckCircle size={18} /> : <span className="text-xs font-bold">{idx + 1}</span>}
                              </div>
                              <span className={`text-sm font-bold ${ms.completed ? 'text-primary' : 'text-secondary'}`}>
                                {ms.name}
                              </span>
                              {!ms.completed && (
                                <button className="ml-auto opacity-0 group-hover:opacity-100 transition-all p-2 text-tertiary hover:text-primary hover:bg-primary-light rounded-lg cursor-pointer">
                                  <ChevronRight size={18} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
