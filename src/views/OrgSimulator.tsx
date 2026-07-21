import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Sliders, RefreshCw, Activity, Target, Zap, UserMinus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

export const OrgSimulator: React.FC = () => {
  const [headcountChange, setHeadcountChange] = useState(0);
  const [salaryChange, setSalaryChange] = useState(0);
  const [remoteDays, setRemoteDays] = useState(2);
  const [trainingBudget, setTrainingBudget] = useState(0);
  const [restructuringLevel, setRestructuringLevel] = useState(0);
  
  const [simulationData, setSimulationData] = useState<any[] | null>(null);
  
  const generateData = () => {
    const baseProductivity = 85;
    const baseHealth = 92;
    const baseCapacity = 100;
    const baseAttrition = 15; // 15% baseline attrition risk
    
    return Array.from({length: 6}, (_, i) => {
      const monthMultiplier = (i + 1) * 0.2;
      
      const prodEffect = headcountChange*0.5 + (remoteDays-2)*1.5 + trainingBudget*1.2 - restructuringLevel*2;
      const healthEffect = salaryChange*0.5 + (remoteDays-2)*2 + trainingBudget*0.5 - headcountChange*0.1 - restructuringLevel*3;
      const capEffect = headcountChange*2 - restructuringLevel*1.5 + trainingBudget*0.5;
      
      // Attrition goes UP if salary drops, remote days decrease, or restructuring is high
      const attritionEffect = -salaryChange*0.8 - (remoteDays-2)*2 - trainingBudget*0.4 + headcountChange*0.3 + restructuringLevel*4;

      return {
        month: `Month ${i+1}`,
        productivity: Math.max(0, Math.min(100, baseProductivity + prodEffect * monthMultiplier)),
        orgHealth: Math.max(0, Math.min(100, baseHealth + healthEffect * monthMultiplier)),
        capacity: Math.max(0, baseCapacity + capEffect * monthMultiplier),
        attrition: Math.max(0, Math.min(100, baseAttrition + attritionEffect * monthMultiplier))
      }
    });
  };

  const handleRunSimulation = () => {
    setSimulationData(generateData());
  };

  const handleReset = () => {
    setHeadcountChange(0);
    setSalaryChange(0);
    setRemoteDays(2);
    setTrainingBudget(0);
    setRestructuringLevel(0);
    setSimulationData(null);
  };

  return (
    <div className="flex flex-col gap-6 pb-8 h-full">
      <div>
        <h1 className="text-3xl font-extrabold mb-2 text-primary tracking-tight">Organizational Simulation</h1>
        <p className="text-secondary text-sm font-medium">Organization Digital Twin • Run predictive 'what-if' scenarios to forecast operational impacts.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Controls */}
        <Card className="glass col-span-1 flex flex-col gap-6 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-4 sticky top-0 bg-white/80 backdrop-blur-md z-10 -mx-6 px-6 -mt-6 pt-6">
            <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shadow-inner">
              <Sliders size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-primary">Scenario Parameters</h3>
              <p className="text-[10px] uppercase font-bold text-secondary tracking-wider">Adjust Variables</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider flex justify-between">
                <span>Hiring / Layoffs (%)</span>
                <span className={headcountChange > 0 ? "text-success" : headcountChange < 0 ? "text-danger" : "text-primary"}>
                  {headcountChange > 0 ? '+' : ''}{headcountChange}%
                </span>
              </label>
              <input 
                type="range" 
                min="-20" max="20" step="1"
                value={headcountChange}
                onChange={(e) => setHeadcountChange(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider flex justify-between">
                <span>Restructuring Intensity</span>
                <span className="text-warning-dark">{restructuringLevel}/10</span>
              </label>
              <input 
                type="range" 
                min="0" max="10" step="1"
                value={restructuringLevel}
                onChange={(e) => setRestructuringLevel(Number(e.target.value))}
                className="w-full accent-warning cursor-pointer"
              />
              <p className="text-[10px] text-tertiary font-semibold">Short-term disruption vs long-term efficiency.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider flex justify-between">
                <span>Salary Adjustments (%)</span>
                <span className="text-success">{salaryChange > 0 ? '+' : ''}{salaryChange}%</span>
              </label>
              <input 
                type="range" 
                min="-10" max="20" step="1"
                value={salaryChange}
                onChange={(e) => setSalaryChange(Number(e.target.value))}
                className="w-full accent-success cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider flex justify-between">
                <span>Remote Work Days/Week</span>
                <span className="text-info">{remoteDays}</span>
              </label>
              <input 
                type="range" 
                min="0" max="5" step="1"
                value={remoteDays}
                onChange={(e) => setRemoteDays(Number(e.target.value))}
                className="w-full accent-info cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider flex justify-between">
                <span>Training Budget Boost (%)</span>
                <span className="text-primary">{trainingBudget > 0 ? '+' : ''}{trainingBudget}%</span>
              </label>
              <input 
                type="range" 
                min="0" max="50" step="5"
                value={trainingBudget}
                onChange={(e) => setTrainingBudget(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-[var(--border-subtle)] flex gap-3 sticky bottom-0 bg-white/80 backdrop-blur-md z-10 -mx-6 px-6 -mb-6 pb-6">
            <Button className="flex-1 shadow-md font-bold rounded-xl" onClick={handleRunSimulation}>
              <Zap size={16} className="mr-2"/> Run Simulation
            </Button>
            <Button variant="ghost" onClick={handleReset} className="rounded-xl border border-[var(--border-subtle)] bg-white shadow-sm">
              <RefreshCw size={18}/>
            </Button>
          </div>
        </Card>

        {/* Results Charts */}
        <div className="col-span-2 flex flex-col gap-6 overflow-y-auto pb-4 pr-2" style={{ scrollbarWidth: 'thin' }}>
          {!simulationData ? (
            <Card className="glass flex flex-col items-center justify-center flex-1 text-center border-dashed border-2 min-h-[400px]">
              <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6 border border-primary/20">
                <Sliders size={40} className="text-primary/50" />
              </div>
              <h3 className="font-extrabold text-2xl text-primary mb-2">Ready for Simulation</h3>
              <p className="text-sm font-medium text-secondary max-w-sm">Configure your scenario parameters on the left and click "Run Simulation" to generate AI-driven future projections.</p>
            </Card>
          ) : (
            <>
              {/* Chart 1: Productivity & Org Health */}
              <Card className="glass shrink-0 flex flex-col h-[280px] p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transition-colors"></div>
                <h3 className="font-extrabold text-lg text-primary mb-1 flex items-center gap-2"><Target size={20}/> Projected Productivity & Org Health</h3>
                <p className="text-xs font-semibold text-secondary mb-4">6-month forecast based on selected parameters.</p>
                <div className="h-[180px] w-full relative">
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={simulationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)"/>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--text-secondary)' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--text-secondary)' }} dx={-10} domain={['dataMin - 10', 'dataMax + 10']}/>
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }}/>
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 700 }} />
                      <Line type="monotone" dataKey="productivity" name="Productivity Index" stroke="var(--color-primary)" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                      <Line type="monotone" dataKey="orgHealth" name="Org Health Score" stroke="var(--color-success)" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Chart 2: Attrition Risk */}
              <Card className="glass shrink-0 flex flex-col h-[280px] p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-danger/5 rounded-full blur-2xl transition-colors"></div>
                <h3 className="font-extrabold text-lg text-primary mb-1 flex items-center gap-2"><UserMinus size={20} className="text-danger"/> Projected Attrition Risk</h3>
                <p className="text-xs font-semibold text-secondary mb-4">Estimated risk of turnover due to organizational changes.</p>
                <div className="h-[180px] w-full relative">
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={simulationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAttrition" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)"/>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--text-secondary)' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--text-secondary)' }} dx={-10} domain={[0, 100]}/>
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }}/>
                      <Area type="monotone" dataKey="attrition" name="Attrition Risk (%)" stroke="var(--color-danger)" strokeWidth={3} fillOpacity={1} fill="url(#colorAttrition)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Chart 3: Delivery Capacity */}
              <Card className="glass shrink-0 flex flex-col h-[280px] p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-info/5 rounded-full blur-2xl transition-colors"></div>
                <h3 className="font-extrabold text-lg text-primary mb-1 flex items-center gap-2"><Activity size={20}/> Delivery Capacity Forecast</h3>
                <p className="text-xs font-semibold text-secondary mb-4">Baseline output capacity index (100 = Current).</p>
                <div className="h-[180px] w-full relative">
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={simulationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCap" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-info)" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="var(--color-info)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)"/>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--text-secondary)' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--text-secondary)' }} dx={-10} domain={['dataMin - 10', 'dataMax + 10']}/>
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }}/>
                      <Area type="monotone" dataKey="capacity" name="Capacity Index" stroke="var(--color-info)" strokeWidth={3} fillOpacity={1} fill="url(#colorCap)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
