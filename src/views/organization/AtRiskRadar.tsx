import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Search, BrainCircuit, Activity, MessageSquare, Calendar, Compass, UserCheck, CheckCircle2, X } from 'lucide-react';
import { TwinChatModal } from '../../components/TwinChatModal';

import { mockRiskyEmployees, type EmployeeRisk } from '../../dummy/organization/radarData';

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
          <h1 className="text-3xl font-bold mb-1 text-slate-900 tracking-tight">At-Risk Radar & Interventions</h1>
          <p className="text-base text-slate-500 font-medium mt-0.5">Prioritized burnout and attrition risks powered by Uplift Modeling.</p>
        </div>
        
        {/* Search Employees Input */}
        <div className="relative w-80 mb-1">
          <input 
            type="text" 
            placeholder="Search employees, skills..." 
            className="w-full h-10 pl-10 pr-16 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 shadow-sm transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <div className="absolute right-2 top-2">
            <kbd className="hidden sm:inline-flex items-center justify-center h-6 px-2 text-[10px] font-bold bg-slate-50 border border-slate-200 rounded shadow-sm text-slate-500 uppercase tracking-wider">Ctrl K</kbd>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Left Column: Uplift Insights & System Learning */}
        <div className="col-span-1 flex flex-col gap-6">
          
          {/* Intervention Effectiveness (Uplift ML Insights) */}
          <Card className="p-6 flex flex-col gap-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                <BrainCircuit size={16} className="text-slate-500"/> Intervention Effectiveness
              </h3>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Uplift ML Insights</p>
            </div>

            <div className="flex flex-col gap-4">
              
              {/* Engineering Roles */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Engineering Roles</span>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-slate-800">1:1 Check-ins</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">-18% Risk</span>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold mt-1.5 uppercase tracking-wide">Highest historical ROI</p>
              </div>

              {/* Sales Roles */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Sales Roles</span>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-slate-800">Quota Adjustment</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">-22% Risk</span>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold mt-1.5 uppercase tracking-wide">Effective if done early</p>
              </div>

              {/* Design Roles */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Design Roles</span>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-slate-800">Role/Project Shift</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">-15% Risk</span>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold mt-1.5 uppercase tracking-wide">Counteracts burnout</p>
              </div>

            </div>
          </Card>

          {/* System Learning */}
          <Card className="p-6 bg-slate-900 border border-slate-800 text-white flex flex-col gap-3 shadow-md rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
            <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wide z-10 text-sky-400">
              <Compass size={16} /> System Learning
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-medium z-10">
              Every action you log on this page feeds back into the causal ML model, making future recommendations more accurate.
            </p>
          </Card>
        </div>

        {/* Right Column: Urgent Interventions Queue */}
        <div className="col-span-2 flex flex-col gap-6">
          <Card className="p-6 flex flex-col gap-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                <Activity size={16} className="text-blue-600"/> Urgent Interventions Queue
              </h3>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Sorted by Urgency (Risk × Impact)</p>
            </div>

            <div className="flex flex-col gap-4">
              {filteredEmployees.map((emp) => (
                <div key={emp.name} className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm flex flex-col gap-4 transition-all hover:shadow-md">
                  
                  {/* Row 1: Name and Urgency */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm shrink-0 border border-slate-200 shadow-sm">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base leading-tight">{emp.name}</h4>
                        <span className="text-xs font-semibold text-slate-500">{emp.role} • {emp.dept}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-sm ${emp.urgencyColor}`}>
                      {emp.urgency}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Burnout Score</span>
                      <span className="text-lg font-bold text-slate-900 leading-none">{emp.burnoutScore}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">90-Day Attrition</span>
                      <span className="text-lg font-bold text-rose-600 leading-none">{emp.attritionRisk}%</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Performance</span>
                      <div className="flex items-baseline gap-2 leading-none">
                        <span className="text-lg font-bold text-slate-900">{emp.perfCurrent}</span>
                        <span className="text-xs font-semibold text-slate-400 line-through">{emp.perfPrior}</span>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Action Buttons */}
                  <div className="flex justify-between items-center gap-3 mt-1">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={() => triggerToast(`Scheduled 1:1 check-in with ${emp.name}. Calendar invite sent and uplift telemetry updated.`)}
                        className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
                      >
                        <Calendar size={14}/> Schedule 1:1
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => triggerToast(`Logged direct reach out to ${emp.name}. Causal model is monitoring response.`)}
                        className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-500 font-semibold rounded-lg shadow-sm hover:border-slate-300 hover:text-slate-700 hover:bg-slate-50 transition-all"
                      >
                        <UserCheck size={14}/> Reach Out
                      </Button>
                    </div>

                    <button 
                      onClick={() => setChattingEmployee({ name: emp.name, role: emp.role })}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-all shadow-sm"
                    >
                      <MessageSquare size={14} className="mr-0.5" /> View AI Analysis
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
