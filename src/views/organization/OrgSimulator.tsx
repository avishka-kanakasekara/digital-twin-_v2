import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Sliders, RefreshCw, Activity, Target, Zap, UserMinus, Network, DollarSign, GitCompare, BrainCircuit, ChevronRight, Users, Building2, Briefcase } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

export const OrgSimulator: React.FC = () => {
  const [headcountChange, setHeadcountChange] = useState(0);
  const [salaryChange, setSalaryChange] = useState(0);
  const [remoteDays, setRemoteDays] = useState(2);
  const [trainingBudget, setTrainingBudget] = useState(0);
  const [restructuringLevel, setRestructuringLevel] = useState(0);
  
  const [simulationData, setSimulationData] = useState<any[] | null>(null);
  const [snapshotData, setSnapshotData] = useState<any[] | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  
  const generateData = (params: any, isSnapshot: boolean = false) => {
    const baseProductivity = 85;
    const baseHealth = 92;
    const baseCapacity = 100;
    const baseAttrition = 15; 
    const baseCsat = 88;
    const baseRevenue = 120; // 120M baseline
    
    return Array.from({length: 6}, (_, i) => {
      const monthMultiplier = (i + 1) * 0.2;
      
      const prodEffect = params.headcountChange*0.5 + (params.remoteDays-2)*1.5 + params.trainingBudget*1.2 - params.restructuringLevel*2;
      const healthEffect = params.salaryChange*0.5 + (params.remoteDays-2)*2 + params.trainingBudget*0.5 - params.headcountChange*0.1 - params.restructuringLevel*3;
      const capEffect = params.headcountChange*2 - params.restructuringLevel*1.5 + params.trainingBudget*0.5;
      const attritionEffect = -params.salaryChange*0.8 - (params.remoteDays-2)*2 - params.trainingBudget*0.4 + params.headcountChange*0.3 + params.restructuringLevel*4;
      
      const revEffect = (capEffect * 0.4) - (attritionEffect * 0.3) - (params.restructuringLevel * 2);
      const csatEffect = (healthEffect * 0.3) - (attritionEffect * 0.5) + (params.trainingBudget * 0.2);

      const prefix = isSnapshot ? 'A_' : '';

      return {
        month: `Month ${i+1}`,
        [`${prefix}productivity`]: Math.max(0, Math.min(100, baseProductivity + prodEffect * monthMultiplier)),
        [`${prefix}orgHealth`]: Math.max(0, Math.min(100, baseHealth + healthEffect * monthMultiplier)),
        [`${prefix}capacity`]: Math.max(0, baseCapacity + capEffect * monthMultiplier),
        [`${prefix}attrition`]: Math.max(0, Math.min(100, baseAttrition + attritionEffect * monthMultiplier)),
        [`${prefix}revenue`]: Math.max(0, baseRevenue + revEffect * monthMultiplier),
        [`${prefix}csat`]: Math.max(0, Math.min(100, baseCsat + csatEffect * monthMultiplier))
      }
    });
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const newData = generateData({ headcountChange, salaryChange, remoteDays, trainingBudget, restructuringLevel });
      setSimulationData(newData);
      setIsSimulating(false);
    }, 1200);
  };

  const handleSnapshot = () => {
    if (!simulationData) return;
    const snap = generateData({ headcountChange, salaryChange, remoteDays, trainingBudget, restructuringLevel }, true);
    setSnapshotData(snap);
  };

  const handleReset = () => {
    setHeadcountChange(0);
    setSalaryChange(0);
    setRemoteDays(2);
    setTrainingBudget(0);
    setRestructuringLevel(0);
    setSimulationData(null);
    setSnapshotData(null);
  };

  const mergedData = simulationData ? simulationData.map((d, i) => {
    return { ...d, ...(snapshotData ? snapshotData[i] : {}) };
  }) : null;

  return (
    <div className="flex flex-col gap-5 pb-8">
      <div>
        <h1 className="text-3xl font-extrabold mb-1 text-primary tracking-tight">Organizational Simulator</h1>
        <p className="text-secondary text-sm font-medium">Organization Digital Twin • Enterprise-grade causal what-if forecasting.</p>
      </div>

      <div className="flex gap-6 items-stretch">
        
        {/* Left Panel: Controls */}
        <div className="w-[340px] shrink-0 flex flex-col bg-white rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden sticky top-0 min-h-[600px]">
          
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-6 border-b border-[var(--border-subtle)] bg-gradient-to-b from-slate-50/80 to-white">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white shadow-md">
              <Sliders size={18} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-primary leading-tight">Scenario Parameters</h3>
              <p className="text-xs text-secondary font-semibold mt-0.5">Adjust model inputs</p>
            </div>
          </div>

          {/* Sliders */}
          <div className="flex flex-col divide-y divide-[var(--border-subtle)] overflow-y-auto flex-1" style={{ scrollbarWidth: 'none' }}>
            
            <div className="flex flex-col gap-4 px-6 py-6 hover:bg-slate-50/80 transition-all border-b border-[var(--border-subtle)] last:border-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                    <Users size={14} strokeWidth={2.5} />
                  </div>
                  <label className="text-sm font-bold text-primary">Hiring / Layoffs</label>
                </div>
                <span className={`text-xs font-extrabold tabular-nums px-2.5 py-1 rounded-md border ${
                  headcountChange > 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : headcountChange < 0 ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-slate-100 text-secondary border-slate-200'
                }`}>{headcountChange > 0 ? '+' : ''}{headcountChange}%</span>
              </div>
              <input type="range" min="-20" max="20" step="1" value={headcountChange} onChange={(e) => setHeadcountChange(Number(e.target.value))} className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none" />
            </div>

            <div className="flex flex-col gap-4 px-6 py-6 hover:bg-slate-50/80 transition-all border-b border-[var(--border-subtle)] last:border-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                    <Building2 size={14} strokeWidth={2.5} />
                  </div>
                  <label className="text-sm font-bold text-primary">Restructuring</label>
                </div>
                <span className="text-xs font-extrabold text-amber-700 tabular-nums px-2.5 py-1 rounded-md border border-amber-200 bg-amber-50">{restructuringLevel}/10</span>
              </div>
              <input type="range" min="0" max="10" step="1" value={restructuringLevel} onChange={(e) => setRestructuringLevel(Number(e.target.value))} className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none" />
              <p className="text-xs text-tertiary font-semibold mt-[-8px]">Short-term disruption vs long-term efficiency.</p>
            </div>

            <div className="flex flex-col gap-4 px-6 py-6 hover:bg-slate-50/80 transition-all border-b border-[var(--border-subtle)] last:border-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                    <DollarSign size={14} strokeWidth={2.5} />
                  </div>
                  <label className="text-sm font-bold text-primary">Salary Adjustment</label>
                </div>
                <span className={`text-xs font-extrabold tabular-nums px-2.5 py-1 rounded-md border ${
                  salaryChange > 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : salaryChange < 0 ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-slate-100 text-secondary border-slate-200'
                }`}>{salaryChange > 0 ? '+' : ''}{salaryChange}%</span>
              </div>
              <input type="range" min="-10" max="20" step="1" value={salaryChange} onChange={(e) => setSalaryChange(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none" />
            </div>

            <div className="flex flex-col gap-4 px-6 py-6 hover:bg-slate-50/80 transition-all border-b border-[var(--border-subtle)] last:border-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 border border-cyan-100">
                    <Briefcase size={14} strokeWidth={2.5} />
                  </div>
                  <label className="text-sm font-bold text-primary">Remote Work Days</label>
                </div>
                <span className="text-xs font-extrabold text-cyan-700 tabular-nums px-2.5 py-1 rounded-md border border-cyan-200 bg-cyan-50">{remoteDays} / 5</span>
              </div>
              <input type="range" min="0" max="5" step="1" value={remoteDays} onChange={(e) => setRemoteDays(Number(e.target.value))} className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none" />
            </div>

            <div className="flex flex-col gap-4 px-6 py-6 hover:bg-slate-50/80 transition-all border-b border-[var(--border-subtle)] last:border-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600 border border-violet-100">
                    <Target size={14} strokeWidth={2.5} />
                  </div>
                  <label className="text-sm font-bold text-primary">Training Budget</label>
                </div>
                <span className={`text-xs font-extrabold tabular-nums px-2.5 py-1 rounded-md border ${
                  trainingBudget > 0 ? 'bg-violet-50 text-violet-600 border-violet-200' : 'bg-slate-100 text-secondary border-slate-200'
                }`}>{trainingBudget > 0 ? '+' : ''}{trainingBudget}%</span>
              </div>
              <input type="range" min="0" max="50" step="5" value={trainingBudget} onChange={(e) => setTrainingBudget(Number(e.target.value))} className="w-full accent-violet-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none" />
            </div>

          </div>

          {/* Action Buttons */}
          <div className="px-4 py-4 border-t border-[var(--border-subtle)] flex flex-col gap-2">
            {simulationData && !snapshotData && (
              <Button variant="secondary" className="w-full text-sm font-bold rounded-xl flex justify-center items-center gap-2 border-primary/30 bg-primary/5 text-primary hover:bg-primary/10" onClick={handleSnapshot}>
                <GitCompare size={15} /> Save for Comparison
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="primary" className="flex-1 text-sm shadow-md font-bold rounded-xl flex justify-center items-center" onClick={handleRunSimulation} disabled={isSimulating}>
                {isSimulating ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2"></div> : <Zap size={15} className="mr-2"/>}
                {snapshotData ? 'Run Scenario B' : 'Run Simulation'}
              </Button>
              <Button variant="ghost" onClick={handleReset} className="rounded-xl border border-[var(--border-subtle)] bg-slate-50 hover:border-danger hover:text-danger hover:bg-danger/5 transition-colors px-3">
                <RefreshCw size={15}/>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel: Results & Charts */}
        <div className="flex-1 min-w-0 flex flex-col h-full gap-6">
          
          {!mergedData && !isSimulating && (
            <div className="flex flex-col items-center justify-center flex-1 text-center bg-white rounded-2xl border border-dashed border-[var(--border-subtle)] min-h-[550px] h-full shadow-sm">
              <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-[var(--border-subtle)] shadow-sm">
                <BrainCircuit size={40} className="text-primary/60" />
              </div>
              <h3 className="font-extrabold text-2xl text-primary mb-2">Causal System Dynamics</h3>
              <p className="text-sm font-medium text-secondary max-w-md leading-relaxed">
                Configure your strategic scenario on the left and hit run. The simulation uses a calibrated Bayesian Network to project cascading organizational outcomes.
              </p>
            </div>
          )}

          {isSimulating && (
            <div className="flex flex-col items-center justify-center flex-1 text-center bg-white rounded-2xl border border-[var(--border-subtle)] min-h-[550px] h-full shadow-[0_2px_15px_-3px_rgba(6,81,237,0.15)]">
               <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6 shadow-sm"></div>
               <h3 className="text-xl font-extrabold text-primary mb-2">Calculating Causal Probabilities...</h3>
               <p className="animate-pulse font-medium text-secondary text-sm">Propagating causal edges through workload, stress, and revenue nodes.</p>
            </div>
          )}

          {mergedData && !isSimulating && (
            <>
              {/* Sensitivity Explanation Pane */}
              <div className="grid grid-cols-12 gap-4 shrink-0">
                <div className={`p-5 rounded-2xl border bg-white shadow-sm flex items-start gap-5 ${snapshotData ? 'col-span-8 border-primary/20' : 'col-span-12 border-[var(--border-subtle)]'}`}>
                  <div className="w-12 h-12 rounded-xl bg-info/10 text-info flex items-center justify-center shrink-0 shadow-sm border border-info/20">
                    <Network size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-primary uppercase tracking-wider mb-2">Causal AI Sensitivity Analysis</h4>
                    <p className="text-[13px] text-secondary leading-relaxed font-medium">
                      The projected outcome is most sensitive to <strong className="text-primary font-extrabold bg-primary/5 px-1.5 py-0.5 rounded">Headcount</strong> changes. The causal network identified a strong cascading risk path:
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs font-bold text-tertiary bg-slate-50 p-3 rounded-xl border border-[var(--border-subtle)] w-fit">
                      <span className="text-danger">Headcount ↓</span> <ChevronRight size={14}/> 
                      <span className="text-warning-dark">Workload ↑</span> <ChevronRight size={14}/> 
                      <span className="text-danger">Burnout ↑</span> <ChevronRight size={14}/> 
                      <span className="text-danger">CSAT ↓</span>
                    </div>
                  </div>
                </div>

                {snapshotData && (
                  <div className="col-span-4 p-5 bg-gradient-to-br from-primary/5 to-info/5 rounded-2xl border border-primary/30 shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 shadow-sm border border-primary/20">
                      <GitCompare size={22} />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-primary uppercase tracking-wider mb-2">Compare Mode</h4>
                      <p className="text-[13px] text-secondary leading-relaxed font-medium">
                        Solid lines: <strong className="text-primary">Current</strong>.<br/>
                        Dashed lines: <strong className="text-primary">Scenario A</strong>.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Chart Grid */}
              <div className="grid grid-cols-2 gap-6 pb-2">
                
                {/* Chart 1: Productivity & Health */}
                <div className="flex flex-col h-[320px] p-6 bg-white rounded-2xl shadow-sm border border-[var(--border-subtle)] hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-extrabold text-sm text-primary uppercase tracking-wider flex items-center gap-2"><Target size={18}/> Productivity & Health</h3>
                  </div>
                  <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mergedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0"/>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} dx={-10} domain={['dataMin - 5', 'dataMax + 5']}/>
                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#E2E8F0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}/>
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingTop: '10px' }} />
                        
                        {snapshotData && <Line type="monotone" dataKey="A_productivity" name="Productivity (A)" stroke="var(--color-primary)" strokeWidth={2.5} strokeDasharray="6 6" dot={false} opacity={0.4} />}
                        <Line type="monotone" dataKey="productivity" name="Productivity" stroke="var(--color-primary)" strokeWidth={3.5} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                        
                        {snapshotData && <Line type="monotone" dataKey="A_orgHealth" name="Org Health (A)" stroke="var(--color-success)" strokeWidth={2.5} strokeDasharray="6 6" dot={false} opacity={0.4} />}
                        <Line type="monotone" dataKey="orgHealth" name="Org Health" stroke="var(--color-success)" strokeWidth={3.5} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Revenue & CSAT */}
                <div className="flex flex-col h-[320px] p-6 bg-white rounded-2xl shadow-sm border border-[var(--border-subtle)] hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-extrabold text-sm text-primary uppercase tracking-wider flex items-center gap-2"><DollarSign size={18}/> Revenue & Customer Sat</h3>
                  </div>
                  <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mergedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0"/>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} dx={-10} domain={['dataMin - 2', 'dataMax + 2']}/>
                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#E2E8F0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}/>
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingTop: '10px' }} />
                        
                        {snapshotData && <Line type="monotone" dataKey="A_revenue" name="Revenue $M (A)" stroke="#8B5CF6" strokeWidth={2.5} strokeDasharray="6 6" dot={false} opacity={0.4} />}
                        <Line type="monotone" dataKey="revenue" name="Revenue $M" stroke="#8B5CF6" strokeWidth={3.5} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                        
                        {snapshotData && <Line type="monotone" dataKey="A_csat" name="CSAT Score (A)" stroke="#F59E0B" strokeWidth={2.5} strokeDasharray="6 6" dot={false} opacity={0.4} />}
                        <Line type="monotone" dataKey="csat" name="CSAT Score" stroke="#F59E0B" strokeWidth={3.5} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 3: Attrition Risk */}
                <div className="flex flex-col h-[280px] p-6 bg-white rounded-2xl shadow-sm border border-[var(--border-subtle)] hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-extrabold text-sm text-primary uppercase tracking-wider flex items-center gap-2"><UserMinus size={18} className="text-danger"/> Attrition Risk</h3>
                  </div>
                  <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mergedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorAttrition" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0"/>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} dx={-10} domain={[0, 40]}/>
                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#E2E8F0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}/>
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingTop: '10px' }} />
                        
                        {snapshotData && <Area type="monotone" dataKey="A_attrition" name="Attrition % (A)" stroke="var(--color-danger)" strokeWidth={2.5} strokeDasharray="6 6" fill="transparent" opacity={0.4} />}
                        <Area type="monotone" dataKey="attrition" name="Attrition Risk %" stroke="var(--color-danger)" strokeWidth={3.5} fill="url(#colorAttrition)" activeDot={{ r: 6 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 4: Delivery Capacity */}
                <div className="flex flex-col h-[280px] p-6 bg-white rounded-2xl shadow-sm border border-[var(--border-subtle)] hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-extrabold text-sm text-primary uppercase tracking-wider flex items-center gap-2"><Activity size={18} className="text-info"/> Delivery Capacity</h3>
                  </div>
                  <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mergedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorCap" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-info)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--color-info)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0"/>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} dx={-10} domain={['dataMin - 10', 'dataMax + 10']}/>
                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#E2E8F0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}/>
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingTop: '10px' }} />
                        
                        {snapshotData && <Area type="monotone" dataKey="A_capacity" name="Capacity (A)" stroke="var(--color-info)" strokeWidth={2.5} strokeDasharray="6 6" fill="transparent" opacity={0.4} />}
                        <Area type="monotone" dataKey="capacity" name="Capacity Index" stroke="var(--color-info)" strokeWidth={3.5} fill="url(#colorCap)" activeDot={{ r: 6 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
