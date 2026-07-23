import React, { useState } from 'react';
import { Card } from '../../components/Card';

import { Modal } from '../../components/Modal';
import { Users, Target, TrendingUp, ChevronDown, Activity, ExternalLink, Filter, HeartPulse, BrainCircuit, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';
import { mockGrowthData, mockDeptPerformance, mockDrillDownEmployees } from '../../dummy/organization/dashboardData';

export const Dashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Departments');
  const [drillDownInfo, setDrillDownInfo] = useState<{ isOpen: boolean; title: string; type: string } | null>(null);



  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold mb-1 text-primary tracking-tight">Executive Dashboard</h1>
          <p className="text-secondary text-sm font-medium">Organization Digital Twin • High-level KPIs and intelligent insights.</p>
          <div className="flex items-center gap-2 mt-2.5">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-success-light border border-success/30 rounded-md text-xs font-bold text-success-dark shadow-sm">
              <Activity size={12} className="animate-pulse" /> Live Aggregation
            </span>
            <span className="text-[10px] font-extrabold text-tertiary uppercase tracking-wider">Last Sync: Today, 02:00 AM (Nightly Job)</span>
          </div>
        </div>
        
        {/* Global Filters */}
        <div className="flex gap-3 bg-white/50 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 px-3 border-r border-[var(--border-subtle)]">
            <Filter size={16} className="text-secondary" />
            <select className="text-sm font-bold text-primary bg-transparent outline-none cursor-pointer appearance-none pr-4">
              <option>Q2 2026</option>
              <option>Q1 2026</option>
              <option>FY 2025</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-3 border-r border-[var(--border-subtle)]">
            <select 
              className="text-sm font-bold text-primary bg-transparent outline-none cursor-pointer appearance-none pr-4"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option>Global Org</option>
              <option>North America</option>
              <option>EMEA</option>
              <option>APAC</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-3">
            <select className="text-sm font-bold text-primary bg-transparent outline-none cursor-pointer appearance-none pr-4">
              <option>All Divisions</option>
              <option>Product & Eng</option>
              <option>GTM</option>
            </select>
            <ChevronDown size={14} className="text-secondary ml-1" />
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="glass flex flex-col gap-5 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-success/10 rounded-full blur-xl group-hover:bg-success/20 transition-colors"></div>
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-1">Org Health Score</p>
              <h3 className="text-4xl font-black text-primary">92<span className="text-xl text-secondary">/100</span></h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-success-light flex items-center justify-center text-success shadow-sm border border-success/20">
              <HeartPulse size={24} />
            </div>
          </div>
          <div className="text-xs text-success flex items-center gap-1.5 font-bold bg-success-light/50 w-fit px-2.5 py-1 rounded-md z-10">
            <TrendingUp size={14} /> +4 pts this quarter
          </div>
        </Card>
        
        <Card className="glass flex flex-col gap-5 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors"></div>
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-1">Total Employees</p>
              <h3 className="text-4xl font-black text-primary">1,248</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center text-primary shadow-sm border border-primary/20">
              <Users size={24} />
            </div>
          </div>
          <div className="text-xs text-primary flex items-center gap-1.5 font-bold bg-primary-light/50 w-fit px-2.5 py-1 rounded-md z-10">
            <TrendingUp size={14} /> +2.4% vs last quarter
          </div>
        </Card>

        <Card className="glass flex flex-col gap-5 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-info/10 rounded-full blur-xl group-hover:bg-info/20 transition-colors"></div>
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-1">Productivity Score</p>
              <h3 className="text-4xl font-black text-primary">88<span className="text-xl text-secondary">%</span></h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-info/10 flex items-center justify-center text-info shadow-sm border border-info/20">
              <Target size={24} />
            </div>
          </div>
          <div className="text-xs text-info flex items-center gap-1.5 font-bold bg-info/10 w-fit px-2.5 py-1 rounded-md z-10">
            <Activity size={14} /> Stable this month
          </div>
        </Card>

        <Card className="glass flex flex-col gap-5 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden border border-danger/30 bg-danger/5">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-danger/10 rounded-full blur-xl group-hover:bg-danger/20 transition-colors"></div>
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-[10px] text-danger font-black uppercase tracking-widest mb-1 flex items-center gap-1"><Sparkles size={10} className="animate-pulse"/> Anomaly Flagged</p>
              <h3 className="text-4xl font-black text-danger">3.2<span className="text-xl text-danger/50">/5</span></h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-danger/10 flex items-center justify-center text-danger shadow-sm border border-danger/30">
              <Sparkles size={24} />
            </div>
          </div>
          <div className="text-xs text-danger-dark flex items-center gap-1.5 font-bold bg-danger/10 w-fit px-2.5 py-1 rounded-md z-10 shadow-sm">
            <TrendingUp size={14} className="rotate-180" /> Sudden Dip Detected
          </div>
        </Card>
      </div>

      {/* AI Insights & Charts Row */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* AI Insights Panel */}
        <Card className="col-span-1 glass flex flex-col h-[380px] p-0 overflow-hidden relative">
          <div className="p-6 border-b border-primary/10 bg-gradient-to-r from-primary-light to-white">
            <h3 className="text-base font-extrabold text-primary flex items-center gap-2">
              <BrainCircuit size={18} className="text-secondary"/> ML Anomaly Detection & Insights
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4" style={{ scrollbarWidth: 'thin' }}>
            
            <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl flex gap-3 items-start group hover:bg-danger/20 transition-colors shadow-sm">
              <div className="w-2 h-2 rounded-full bg-danger mt-1.5 shrink-0 animate-ping"></div>
              <div>
                <h4 className="text-sm font-bold text-danger">Satisfaction Anomaly Flagged</h4>
                <p className="text-xs text-secondary mt-1">Unsupervised anomaly model detected a statistically significant dip in employee satisfaction (z-score: -2.8).</p>
              </div>
            </div>

            <div className="p-4 bg-success-light/30 border border-success/20 rounded-xl flex gap-3 items-start group hover:bg-success-light/50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-success mt-1.5 shrink-0"></div>
              <div>
                <h4 className="text-sm font-bold text-success-dark">Engineering Velocity Peak</h4>
                <p className="text-xs text-secondary mt-1">Productivity score in Engineering is 92%, driven by recent Agile adoption and automation tools.</p>
              </div>
            </div>

            <div className="p-4 bg-primary-light/30 border border-primary/20 rounded-xl flex gap-3 items-start group hover:bg-primary-light/50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
              <div>
                <h4 className="text-sm font-bold text-primary">Retention Stabilized</h4>
                <p className="text-xs text-secondary mt-1">Attrition risk has decreased by 1.2% globally following the new wellness initiatives launched in Q1.</p>
              </div>
            </div>

          </div>
        </Card>

        {/* Charts Container */}
        <div className="col-span-2 grid grid-cols-2 gap-6">
          <Card className="glass flex flex-col h-[180px] p-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-extrabold text-primary">Department Performance</h3>
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockDeptPerformance} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} dy={5} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} />
                  <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                  <Bar dataKey="score" fill="var(--color-primary)" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="glass flex flex-col h-[180px] p-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-extrabold text-primary">Workforce Growth</h3>
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockGrowthData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} dy={5} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} domain={['dataMin - 20', 'dataMax + 20']}/>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                  <Area type="monotone" dataKey="headcount" stroke="var(--color-success)" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="glass col-span-2 flex flex-col h-[176px] p-5 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
            
            <div className="z-10 flex items-center justify-between h-full">
              <div className="max-w-md">
                <h3 className="text-xl font-black mb-2 text-white">Interactive Organization Modules</h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  Navigate through Workforce Intelligence, Team Builder, and Simulator modules to get deeper insights and manipulate organizational parameters.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link to="/workforce" className="px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-sm font-bold text-white transition-colors border border-white/30 text-center">
                  Workforce Analytics
                </Link>
                <Link to="/simulator" className="px-6 py-2 bg-white text-primary hover:bg-white/90 shadow-lg rounded-xl text-sm font-bold transition-colors border border-transparent text-center">
                  Run Simulations
                </Link>
              </div>
            </div>
          </Card>

        </div>
      </div>

      {/* Drill-down Modal */}
      <Modal 
        isOpen={!!drillDownInfo?.isOpen} 
        onClose={() => setDrillDownInfo(null)} 
        title={`Drill-down: ${drillDownInfo?.title}`}
      >
        <div className="flex flex-col gap-5">
          <p className="text-sm text-secondary bg-primary-light p-3 rounded-xl border border-primary/20">
            Viewing granular details for <span className="font-bold text-primary">{drillDownInfo?.title}</span>.
          </p>

          <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
            {mockDrillDownEmployees.map((emp) => (
              <div key={emp.id} className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-subtle)] hover:border-primary/50 hover:bg-primary/5 transition-colors group bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold shadow-sm">
                    {emp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-primary">{emp.name}</h4>
                    <p className="text-xs text-secondary">{emp.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Link to="/employee-twin" className="px-3 py-1.5 text-xs font-bold bg-[var(--bg-main)] rounded-lg text-secondary hover:text-primary hover:bg-primary-light transition-colors border border-[var(--border-subtle)] shadow-sm flex items-center gap-1.5">
                    View Twin <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};
