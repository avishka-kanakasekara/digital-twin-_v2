import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Search, BrainCircuit, Activity, MessageSquare, Calendar, Compass, UserCheck, CheckCircle2, X } from 'lucide-react';
import { TwinChatModal } from '../components/TwinChatModal';

interface EmployeeRisk {
  name: string;
  role: string;
  dept: string;
  urgency: 'Critical (Key Project)' | 'Critical (Architecture)' | 'High' | 'Moderate';
  urgencyColor: string;
  burnoutScore: number;
  attritionRisk: number;
  perfCurrent: number;
  perfPrior: number;
}

const mockRiskyEmployees: EmployeeRisk[] = [
  {
    name: 'Sarah Jenkins',
    role: 'UX Designer',
    dept: 'Design',
    urgency: 'Critical (Key Project)',
    urgencyColor: 'text-danger bg-danger-light border-danger/20',
    burnoutScore: 85,
    attritionRisk: 78,
    perfCurrent: 3.1,
    perfPrior: 4.2
  },
  {
    name: 'David Chen',
    role: 'Backend Engineer',
    dept: 'Engineering',
    urgency: 'Critical (Architecture)',
    urgencyColor: 'text-danger bg-danger-light border-danger/20',
    burnoutScore: 78,
    attritionRisk: 65,
    perfCurrent: 2.9,
    perfPrior: 3.8
  },
  {
    name: 'Michael Chang',
    role: 'Product Manager',
    dept: 'Product',
    urgency: 'High',
    urgencyColor: 'text-warning-dark bg-warning-light/50 border-warning/20',
    burnoutScore: 55,
    attritionRisk: 30,
    perfCurrent: 3.6,
    perfPrior: 3.5
  },
  {
    name: 'Elena Rodriguez',
    role: 'Sales Lead',
    dept: 'Sales',
    urgency: 'Moderate',
    urgencyColor: 'text-info bg-info/10 border-info/20',
    burnoutScore: 62,
    attritionRisk: 45,
    perfCurrent: 4.0,
    perfPrior: 4.5
  }
];

export const AtRiskRadar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chattingEmployee, setChattingEmployee] = useState<{ name: string; role: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const filteredEmployees = mockRiskyEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 pb-8 relative">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[110] animate-slide-in">
          <div className="glass bg-success/10 border-2 border-success/30 px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-xl">
            <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white shrink-0 shadow-md">
              <CheckCircle2 size={16}/>
            </div>
            <div>
              <p className="text-sm font-black text-primary">Intervention Logged</p>
              <p className="text-xs text-secondary font-medium mt-0.5">{toastMessage}</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-secondary hover:text-primary transition-colors ml-3 p-1 rounded-lg">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Top Search bar & headers */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold mb-2 text-primary tracking-tight">At-Risk Radar & Interventions</h1>
          <p className="text-secondary text-sm font-medium">Prioritized burnout and attrition risks powered by Uplift Modeling.</p>
        </div>
        
        {/* Search Employees Input */}
        <div className="relative w-80">
          <input 
            type="text" 
            placeholder="Search employees, skills..." 
            className="w-full h-10 pl-10 pr-16 bg-white border border-[var(--border-subtle)] rounded-xl text-xs font-semibold text-primary focus:outline-none focus:border-primary shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={14} className="absolute left-3.5 top-3.5 text-tertiary" />
          <div className="absolute right-2 top-2">
            <kbd className="hidden sm:inline-flex items-center justify-center h-6 px-1.5 text-[9px] font-black bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded shadow-sm text-secondary uppercase tracking-wider">Ctrl K</kbd>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Left Column: Uplift Insights & System Learning */}
        <div className="col-span-1 flex flex-col gap-6">
          
          {/* Intervention Effectiveness (Uplift ML Insights) */}
          <Card className="glass p-6 flex flex-col gap-5">
            <div>
              <h3 className="text-sm font-extrabold text-primary flex items-center gap-2 uppercase tracking-wider">
                <BrainCircuit size={16} className="text-primary"/> Intervention Effectiveness
              </h3>
              <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider mt-0.5">Uplift ML Insights</p>
            </div>

            <div className="flex flex-col gap-4">
              
              {/* Engineering Roles */}
              <div className="p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-[var(--border-subtle)]">
                <span className="text-[10px] font-black text-secondary uppercase tracking-wider">Engineering Roles</span>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-bold text-primary">1:1 Check-ins</span>
                  <span className="text-xs font-black text-success bg-success-light/50 border border-success/20 px-2 py-0.5 rounded-md">-18% Risk</span>
                </div>
                <p className="text-[10px] text-tertiary font-semibold mt-1">Highest historical ROI</p>
              </div>

              {/* Sales Roles */}
              <div className="p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-[var(--border-subtle)]">
                <span className="text-[10px] font-black text-secondary uppercase tracking-wider">Sales Roles</span>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-bold text-primary">Quota Adjustment</span>
                  <span className="text-xs font-black text-success bg-success-light/50 border border-success/20 px-2 py-0.5 rounded-md">-22% Risk</span>
                </div>
                <p className="text-[10px] text-tertiary font-semibold mt-1">Effective if done early</p>
              </div>

              {/* Design Roles */}
              <div className="p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-[var(--border-subtle)]">
                <span className="text-[10px] font-black text-secondary uppercase tracking-wider">Design Roles</span>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-bold text-primary">Role/Project Shift</span>
                  <span className="text-xs font-black text-success bg-success-light/50 border border-success/20 px-2 py-0.5 rounded-md">-15% Risk</span>
                </div>
                <p className="text-[10px] text-tertiary font-semibold mt-1">Counteracts burnout</p>
              </div>

            </div>
          </Card>

          {/* System Learning */}
          <Card className="glass p-6 bg-gradient-to-br from-primary/10 to-info/10 border-primary/20 flex flex-col gap-3 shadow-inner">
            <h3 className="text-xs font-extrabold text-primary flex items-center gap-2 uppercase tracking-wide">
              <Compass size={16} /> System Learning
            </h3>
            <p className="text-xs text-secondary leading-relaxed font-semibold">
              Every action you log on this page feeds back into the causal ML model, making future recommendations more accurate.
            </p>
          </Card>
        </div>

        {/* Right Column: Urgent Interventions Queue */}
        <div className="col-span-2 flex flex-col gap-6">
          <Card className="glass p-6 flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-extrabold text-primary flex items-center gap-2 uppercase tracking-wide">
                <Activity size={18}/> Urgent Interventions Queue
              </h3>
              <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider mt-0.5">Sorted by Urgency (Risk × Impact)</p>
            </div>

            <div className="flex flex-col gap-4">
              {filteredEmployees.map((emp) => (
                <div key={emp.name} className="p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-[var(--border-subtle)] hover:border-primary/30 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md">
                  
                  {/* Row 1: Name and Urgency */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-info flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-primary text-base">{emp.name}</h4>
                        <span className="text-[10px] font-semibold text-secondary">{emp.role} • {emp.dept}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-md border ${emp.urgencyColor}`}>
                      {emp.urgency}
                    </span>
                  </div>

                  {/* Row 2: Burnout Score, 90-Day Attrition, Performance */}
                  <div className="grid grid-cols-3 gap-4 bg-[var(--bg-main)]/50 p-3 rounded-xl border border-[var(--border-subtle)]">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-secondary uppercase tracking-wider">Burnout Score</span>
                      <span className="text-base font-black text-primary">{emp.burnoutScore}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-secondary uppercase tracking-wider">90-Day Attrition</span>
                      <span className="text-base font-black text-danger">{emp.attritionRisk}%</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-secondary uppercase tracking-wider">Performance</span>
                      <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                        <span className="text-sm font-black">{emp.perfCurrent}</span>
                        <span className="text-tertiary line-through">{emp.perfPrior}</span>
                      </span>
                    </div>
                  </div>

                  {/* Row 3: Action Buttons */}
                  <div className="flex justify-between items-center gap-3 mt-1">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={() => triggerToast(`Scheduled 1:1 check-in with ${emp.name}. Calendar invite sent and uplift telemetry updated.`)}
                        className="flex items-center gap-1 bg-white border border-[var(--border-subtle)] text-primary font-bold rounded-lg shadow-sm hover:border-primary transition-all"
                      >
                        <Calendar size={12}/> Schedule 1:1
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => triggerToast(`Logged direct reach out to ${emp.name}. Causal model is monitoring response.`)}
                        className="flex items-center gap-1 bg-white border border-[var(--border-subtle)] text-secondary font-bold rounded-lg shadow-sm hover:border-primary transition-all"
                      >
                        <UserCheck size={12}/> Reach Out
                      </Button>
                    </div>

                    <button 
                      onClick={() => setChattingEmployee({ name: emp.name, role: emp.role })}
                      className="text-xs font-black text-primary hover:text-primary-hover flex items-center gap-1 bg-primary/10 hover:bg-primary/25 border border-primary/20 px-3 py-1.5 rounded-xl transition-all"
                    >
                      <MessageSquare size={12} className="mr-0.5" /> View AI Analysis
                    </button>
                  </div>

                </div>
              ))}
              
              {filteredEmployees.length === 0 && (
                <div className="text-center py-8 text-secondary font-semibold text-xs border border-dashed rounded-xl">
                  No employee matches your search criteria.
                </div>
              )}
            </div>
          </Card>
        </div>

      </div>

      {chattingEmployee && (
        <TwinChatModal 
          isOpen={true} 
          onClose={() => setChattingEmployee(null)} 
          employeeName={chattingEmployee.name} 
          employeeRole={chattingEmployee.role} 
        />
      )}

    </div>
  );
};
