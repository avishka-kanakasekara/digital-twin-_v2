import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Users, Wand2, ShieldCheck, CheckCircle2, Search, SlidersHorizontal, GitMerge, Star, Check, Target, Activity, HeartHandshake } from 'lucide-react';

const mockOptionA = {
  id: 'alpha',
  name: 'Option A: High Collaboration',
  successRate: 94,
  compatibilityScore: 96,
  skillBalance: 88,
  performancePrediction: 92,
  rationale: 'Excellent past collaboration history on 3 similar projects.',
  members: [
    { id: 1, name: 'Alex Carter', role: 'Cloud Architect', match: 98, skills: ['AWS', 'Terraform', 'Kubernetes'] },
    { id: 2, name: 'Sarah Jenkins', role: 'UX Lead', match: 92, skills: ['Figma', 'User Research', 'Prototyping'] },
    { id: 3, name: 'David Chen', role: 'Backend Engineer', match: 88, skills: ['Node.js', 'PostgreSQL', 'Redis'] },
    { id: 4, name: 'Elena Rodriguez', role: 'Product Manager', match: 95, skills: ['Agile', 'Roadmapping', 'Jira'] },
  ]
};

const mockOptionB = {
  id: 'beta',
  name: 'Option B: Highest Skill Match',
  successRate: 88,
  compatibilityScore: 75,
  skillBalance: 99,
  performancePrediction: 85,
  rationale: 'Maximum technical skill coverage, though team has not worked together before.',
  members: [
    { id: 5, name: 'Michael Chang', role: 'Sr. Cloud Architect', match: 100, skills: ['AWS', 'Terraform', 'Kubernetes', 'Go'] },
    { id: 6, name: 'Anita Patel', role: 'UX Designer', match: 95, skills: ['Figma', 'UI/UX'] },
    { id: 7, name: 'James Wilson', role: 'Backend Lead', match: 96, skills: ['Node.js', 'PostgreSQL', 'GraphQL'] },
    { id: 4, name: 'Elena Rodriguez', role: 'Product Manager', match: 95, skills: ['Agile', 'Roadmapping', 'Jira'] },
  ]
};

const predefinedSkills = ['AWS', 'Node.js', 'React', 'Figma', 'PostgreSQL', 'Agile', 'Terraform'];

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
        <h1 className="text-3xl font-extrabold mb-2 text-primary tracking-tight">AI Team Builder</h1>
        <p className="text-secondary text-sm font-medium">Organization Digital Twin • Assemble teams based on skill matching, compatibility, and predictive performance.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column: Requirements */}
        <div className="col-span-1 flex flex-col gap-6">
          <Card className="glass flex flex-col h-fit shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
            
            <div className="flex items-center gap-3 mb-6 border-b border-[var(--border-subtle)] pb-4 z-10">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shadow-inner">
                <SlidersHorizontal size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-primary">Define Requirements</h3>
                <p className="text-[10px] uppercase font-bold text-secondary tracking-wider">Combinatorial Optimization</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-5 z-10 flex-1">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-2"><Target size={14}/> Project Type</label>
                <select 
                  className="w-full p-3 rounded-xl border border-[var(--border-subtle)] text-sm font-semibold text-primary outline-none focus:border-primary bg-white/50 focus:bg-white transition-colors cursor-pointer appearance-none shadow-sm backdrop-blur-sm"
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
                <label className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-2"><Users size={14}/> Required Headcount</label>
                <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-2 rounded-xl border border-[var(--border-subtle)] shadow-sm">
                  <input 
                    type="range" 
                    min="2" max="10" 
                    value={headcount} 
                    onChange={(e) => setHeadcount(parseInt(e.target.value))}
                    className="flex-1 cursor-pointer accent-primary"
                  />
                  <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-black text-primary shadow-sm border border-[var(--border-subtle)]">{headcount}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-2"><Star size={14}/> Required Skills & Tech</label>
                <div className="flex flex-wrap gap-2 p-3 bg-white/50 backdrop-blur-sm border border-[var(--border-subtle)] rounded-xl min-h-[100px] shadow-sm">
                  {predefinedSkills.map(skill => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button 
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`text-xs px-3 py-2 rounded-lg border font-bold transition-all shadow-sm ${
                          isSelected 
                            ? 'bg-primary text-white border-primary hover:bg-primary-hover hover:scale-105' 
                            : 'bg-white text-secondary border-[var(--border-subtle)] hover:border-primary/50 hover:text-primary hover:bg-primary-light'
                        }`}
                      >
                        {skill}
                      </button>
                    )
                  })}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mb-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider">Additional Context (Optional)</label>
                <textarea 
                  className="w-full p-3 rounded-xl border border-[var(--border-subtle)] text-sm outline-none focus:border-primary bg-white/50 focus:bg-white transition-colors resize-none h-20 shadow-sm backdrop-blur-sm"
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
            <div className="glass flex-1 flex flex-col items-center justify-center relative rounded-3xl border border-[var(--border-subtle)] overflow-hidden shadow-sm">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-60"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center px-10">
                <div className="w-24 h-24 bg-white/80 rounded-2xl flex items-center justify-center shadow-xl mb-6 relative border border-primary/10 backdrop-blur-md">
                  <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 animate-ping opacity-75"></div>
                  <Users size={40} className="text-primary" />
                </div>
                <h3 className="text-3xl font-black text-primary mb-3">AI Team Assembler</h3>
                <p className="text-secondary max-w-lg mx-auto mb-8 font-medium leading-relaxed">
                  Define your headcount and required skills on the left. Our constraint-satisfaction AI will analyze the entire workforce's skills, availability, and collaboration graph to propose the most successful team compositions.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-tertiary bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-[var(--border-subtle)]">
                    <Search size={14} className="text-info"/> Skill Optimization
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-tertiary bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-[var(--border-subtle)]">
                    <HeartHandshake size={14} className="text-primary"/> Compatibility Score
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-tertiary bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-[var(--border-subtle)]">
                    <ShieldCheck size={14} className="text-success"/> Success Prediction
                  </div>
                </div>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="glass flex-1 flex flex-col items-center justify-center text-primary border border-[var(--border-subtle)] rounded-3xl shadow-sm relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6 shadow-sm"></div>
                <h3 className="text-xl font-bold text-primary mb-2">Running Combinatorial Optimization</h3>
                <p className="animate-pulse font-medium text-secondary">Evaluating collaboration graphs and scoring success probabilities...</p>
              </div>
            </div>
          )}

          {teamGenerated && (
            <div className="flex flex-col gap-6 pb-8">
              <div className="glass flex items-center justify-between border border-primary/20 p-4 rounded-2xl bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-md"><Wand2 size={20}/></div>
                  <div>
                    <h3 className="font-bold text-primary">Candidate Teams Generated</h3>
                    <p className="text-xs text-secondary font-medium">Found 2 highly viable options based on your requirements.</p>
                  </div>
                </div>
              </div>

              {[mockOptionA, mockOptionB].map((option) => {
                const isConfirmed = confirmedTeam === option.id;
                const isAnotherConfirmed = confirmedTeam !== null && confirmedTeam !== option.id;
                
                if (isAnotherConfirmed) return null;

                return (
                  <Card key={option.id} className={`glass flex flex-col shadow-md border ${isConfirmed ? 'border-success ring-4 ring-success/20 bg-success/5' : 'border-[var(--border-subtle)]'} overflow-hidden relative transition-all duration-500`}>
                    {isConfirmed && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 rounded-full blur-2xl"></div>
                    )}
                    
                    {/* Header */}
                    <div className="flex justify-between items-start p-6 border-b border-[var(--border-subtle)] bg-white/30">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-black text-primary">{option.name}</h3>
                          {isConfirmed && <span className="bg-success text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1"><Check size={12}/> Confirmed</span>}
                        </div>
                        <p className="text-sm text-secondary font-medium flex items-center gap-2">
                          <GitMerge size={16} className="text-tertiary"/> {option.rationale}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase font-bold text-secondary tracking-wider mb-1">Predicted Success</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-3xl font-black ${option.successRate > 90 ? 'text-success' : 'text-primary'}`}>{option.successRate}%</span>
                          <ShieldCheck size={28} className={option.successRate > 90 ? 'text-success' : 'text-primary'} />
                        </div>
                      </div>
                    </div>

                    {/* New Metric Row */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-white/40 border-b border-[var(--border-subtle)]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center text-info">
                          <Target size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-tertiary tracking-wider mb-0.5">Skill Balance</p>
                          <p className="text-sm font-black text-primary">{option.skillBalance}% Coverage</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 border-l border-[var(--border-subtle)] pl-4">
                        <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center text-warning-dark">
                          <HeartHandshake size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-tertiary tracking-wider mb-0.5">Compatibility</p>
                          <p className="text-sm font-black text-primary">{option.compatibilityScore}/100 Index</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 border-l border-[var(--border-subtle)] pl-4">
                        <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                          <Activity size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-tertiary tracking-wider mb-0.5">Est. Performance</p>
                          <p className="text-sm font-black text-primary">{option.performancePrediction} Velocity</p>
                        </div>
                      </div>
                    </div>

                    {/* Members */}
                    <div className="p-6">
                      <h4 className="text-xs font-bold text-tertiary uppercase tracking-wider mb-4">Proposed Members</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {option.members.map(member => (
                          <div key={member.id} className="flex items-start gap-3 p-3 rounded-xl border border-[var(--border-subtle)] bg-white/60 backdrop-blur-sm hover:border-primary/30 transition-colors group shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold shadow-sm shrink-0">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <h5 className="font-bold text-sm text-primary truncate">{member.name}</h5>
                                <span className="text-[10px] font-bold text-success bg-success-light/50 px-2 py-1 rounded-md shrink-0 border border-success/20">
                                  {member.match}% Match
                                </span>
                              </div>
                              <p className="text-xs text-secondary mb-2 truncate">{member.role}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {member.skills.map(skill => (
                                  <span key={skill} className={`text-[10px] font-bold px-2 py-1 rounded-md border ${selectedSkills.includes(skill) ? 'bg-primary-light text-primary border-primary/30' : 'bg-white/50 text-tertiary border-[var(--border-subtle)]'}`}>
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
                      <div className="p-4 bg-white/30 border-t border-[var(--border-subtle)] flex justify-end">
                        <Button variant="primary" onClick={() => handleConfirm(option.id)} className="shadow-md rounded-xl font-bold flex items-center gap-2 px-6">
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
