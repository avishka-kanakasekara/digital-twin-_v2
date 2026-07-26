import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Users, Wand2, ShieldCheck, CheckCircle2, Search, SlidersHorizontal, GitMerge, Star, Check, Target, Activity, HeartHandshake } from 'lucide-react';

import { mockOptionA, mockOptionB, predefinedSkills } from '../../dummy/organization/teamBuilderData';

export const TeamBuilder: React.FC = () => {
  const [headcount, setHeadcount] = useState(4);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['AWS', 'Node.js', 'Figma']);
  const [projectType, setProjectType] = useState('New Product Development');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [teamGenerated, setTeamGenerated] = useState(false);
  const [confirmedTeam, setConfirmedTeam] = useState<string | null>(null);
  
  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTeamGenerated(false);
    setConfirmedTeam(null);
    setTimeout(() => {
      setIsGenerating(false);
      setTeamGenerated(true);
    }, 2000);
  };

  const handleConfirm = (teamId: string) => {
    setConfirmedTeam(teamId);
  };

  return (
    <div className="flex flex-col gap-6 relative pb-8">
      <div>
        <h1 className="text-3xl font-bold mb-1 text-slate-900 tracking-tight">AI Team Builder</h1>
        <p className="text-base text-slate-500 font-medium">Organization Digital Twin • Assemble teams based on skill matching, compatibility, and predictive performance.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column: Requirements */}
        <div className="col-span-1 flex flex-col gap-6">
          <Card className="flex flex-col h-fit p-6 bg-white border border-slate-200 shadow-sm rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100/50 transition-colors opacity-50"></div>
            
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4 z-10">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 border border-slate-200">
                <SlidersHorizontal size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Define Requirements</h3>
                <p className="text-xs uppercase font-semibold text-slate-500 tracking-wide mt-0.5">Combinatorial Optimization</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-6 z-10 flex-1">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-2"><Target size={14}/> Project Type</label>
                <select 
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors cursor-pointer appearance-none shadow-sm"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  <option>New Product Development</option>
                  <option>System Migration</option>
                  <option>Maintenance & Support</option>
                  <option>Tiger Team / Crisis Resp</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-2"><Users size={14}/> Required Headcount</label>
                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200 shadow-sm">
                  <input 
                    type="range" 
                    min="2" max="10" 
                    value={headcount} 
                    onChange={(e) => setHeadcount(parseInt(e.target.value))}
                    className="flex-1 cursor-pointer accent-blue-600"
                  />
                  <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-slate-800 shadow-sm border border-slate-200">{headcount}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-2"><Star size={14}/> Required Skills & Tech</label>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl min-h-[100px] shadow-sm">
                  {predefinedSkills.map(skill => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button 
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`text-xs px-3 py-2 rounded-lg border font-semibold transition-all shadow-sm ${
                          isSelected 
                            ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:scale-105' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {skill}
                      </button>
                    )
                  })}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mb-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Additional Context (Optional)</label>
                <textarea 
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors resize-none h-20 shadow-sm"
                  placeholder="e.g. Needs high availability due to short timeline..."
                />
              </div>
            </div>
            
            <Button 
              className="w-full shadow-lg rounded-xl py-4 font-black text-sm hover:scale-[1.02] transition-transform mt-4 z-10 flex items-center justify-center gap-2 relative overflow-hidden group" 
              onClick={handleGenerate} 
              disabled={isGenerating}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generating Teams...
                </>
              ) : (
                <>
                  <Wand2 size={18} /> Generate Candidate Teams
                </>
              )}
            </Button>
          </Card>
        </div>

        {/* Right Column: AI Suggestions */}
        <div className="col-span-2 flex flex-col gap-6">
          
          {!teamGenerated && !isGenerating && (
            <div className="flex-1 flex flex-col items-center justify-center relative rounded-3xl border border-slate-200 bg-white/50 overflow-hidden shadow-sm">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center px-10">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6 relative border border-slate-100">
                  <div className="absolute inset-0 rounded-2xl border-2 border-blue-200 animate-ping opacity-75"></div>
                  <Users size={36} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">AI Team Assembler</h3>
                <p className="text-slate-500 max-w-lg mx-auto mb-8 font-medium leading-relaxed">
                  Define your headcount and required skills on the left. Our constraint-satisfaction AI will analyze the entire workforce's skills, availability, and collaboration graph to propose the most successful team compositions.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                    <Search size={14} className="text-sky-500"/> Skill Optimization
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                    <HeartHandshake size={14} className="text-blue-600"/> Compatibility Score
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                    <ShieldCheck size={14} className="text-emerald-500"/> Success Prediction
                  </div>
                </div>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-900 border border-slate-200 bg-white/50 rounded-3xl shadow-sm relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6 shadow-sm"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Running Combinatorial Optimization</h3>
                <p className="animate-pulse font-medium text-slate-500">Evaluating collaboration graphs and scoring success probabilities...</p>
              </div>
            </div>
          )}

          {teamGenerated && (
            <div className="flex flex-col gap-6 pb-8">
              <div className="flex items-center justify-between border border-blue-200 p-4 rounded-2xl bg-blue-50/50 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md"><Wand2 size={20}/></div>
                  <div>
                    <h3 className="font-bold text-slate-900">Candidate Teams Generated</h3>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">Found 2 highly viable options based on your requirements.</p>
                  </div>
                </div>
              </div>

              {[mockOptionA, mockOptionB].map((option) => {
                const isConfirmed = confirmedTeam === option.id;
                const isAnotherConfirmed = confirmedTeam !== null && confirmedTeam !== option.id;
                
                if (isAnotherConfirmed) return null;

                return (
                  <Card key={option.id} className={`flex flex-col shadow-sm bg-white border ${isConfirmed ? 'border-emerald-500 ring-4 ring-emerald-500/20 bg-emerald-50/10' : 'border-slate-200'} rounded-2xl overflow-hidden relative transition-all duration-500`}>
                    {isConfirmed && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl"></div>
                    )}
                    
                    {/* Header */}
                    <div className="flex justify-between items-start p-6 border-b border-slate-100 bg-slate-50/50">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-slate-900">{option.name}</h3>
                          {isConfirmed && <span className="bg-emerald-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm"><Check size={14}/> Confirmed</span>}
                        </div>
                        <p className="text-sm text-slate-600 font-medium flex items-center gap-2 mt-1.5">
                          <GitMerge size={16} className="text-slate-400"/> {option.rationale}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-xs uppercase font-semibold text-slate-500 tracking-wide mb-1">Predicted Success</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-3xl font-bold ${option.successRate > 90 ? 'text-emerald-600' : 'text-slate-900'}`}>{option.successRate}%</span>
                          <ShieldCheck size={28} className={option.successRate > 90 ? 'text-emerald-500' : 'text-slate-400'} />
                        </div>
                      </div>
                    </div>

                    {/* New Metric Row */}
                    <div className="grid grid-cols-3 gap-4 p-5 bg-white border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 border border-sky-100">
                          <Target size={20} />
                        </div>
                        <div>
                          <p className="text-xs uppercase font-semibold text-slate-500 tracking-wide mb-0.5">Skill Balance</p>
                          <p className="text-sm font-bold text-slate-900">{option.skillBalance}% Coverage</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                          <HeartHandshake size={20} />
                        </div>
                        <div>
                          <p className="text-xs uppercase font-semibold text-slate-500 tracking-wide mb-0.5">Compatibility</p>
                          <p className="text-sm font-bold text-slate-900">{option.compatibilityScore}/100 Index</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                          <Activity size={20} />
                        </div>
                        <div>
                          <p className="text-xs uppercase font-semibold text-slate-500 tracking-wide mb-0.5">Est. Performance</p>
                          <p className="text-sm font-bold text-slate-900">{option.performancePrediction} Velocity</p>
                        </div>
                      </div>
                    </div>

                    {/* Members */}
                    <div className="p-6 bg-slate-50/30">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Proposed Members</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {option.members.map(member => (
                          <div key={member.id} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all group shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold border border-slate-200 shrink-0">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <h5 className="font-semibold text-sm text-slate-900 truncate group-hover:text-blue-600 transition-colors">{member.name}</h5>
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full shrink-0 border border-emerald-200 shadow-sm">
                                  {member.match}% Match
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mb-3 truncate">{member.role}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {member.skills.map(skill => (
                                  <span key={skill} className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${selectedSkills.includes(skill) ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    {!isConfirmed && (
                      <div className="p-5 bg-white border-t border-slate-100 flex justify-end">
                        <Button variant="primary" onClick={() => handleConfirm(option.id)} className="shadow-sm hover:shadow-md rounded-xl font-semibold flex items-center gap-2 px-6">
                          <CheckCircle2 size={18}/> Confirm & Assemble Team
                        </Button>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
