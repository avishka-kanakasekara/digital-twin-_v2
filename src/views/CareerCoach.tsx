import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Crosshair, BookOpen, ArrowRight, TrendingUp, Edit3, PlayCircle, ExternalLink, Activity, Milestone, Compass, CheckCircle2, ChevronRight } from 'lucide-react';
import { Modal } from '../components/Modal';

export const CareerCoach: React.FC = () => {
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div>
        <h1 className="text-3xl font-extrabold mb-2 text-primary tracking-tight">AI Career Coach</h1>
        <p className="text-secondary text-sm font-medium">Employee Digital Twin • Personalized learning paths and readiness tracking mapped to market trends.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <Card className="glass p-8 flex flex-col gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl transition-colors"></div>
            
            <div className="flex justify-between items-start border-b border-[var(--border-subtle)] pb-6 relative z-10">
              <div>
                <p className="text-[10px] uppercase font-bold text-secondary tracking-wider mb-2 flex items-center gap-1"><Compass size={12}/> Current Target Goal</p>
                <h3 className="font-extrabold text-3xl text-primary flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-primary to-info shadow-md">
                    <Crosshair size={24} />
                  </div>
                  Cloud Architect
                </h3>
                <p className="text-secondary font-medium mt-3 ml-[60px]">Target Timeline: <span className="font-bold text-primary">12-18 Months</span> <span className="mx-2 text-tertiary">|</span> Focus: <span className="font-bold text-primary">Tech / Cloud Infrastructure</span></p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <span className="text-xs font-bold px-4 py-2 text-success-dark bg-success-light/50 border border-success/20 rounded-xl flex items-center gap-2 shadow-sm">
                  <Activity size={16}/> 65% Readiness Score
                </span>
                <Button variant="ghost" size="sm" onClick={() => setIsGoalModalOpen(true)} className="bg-white/50 border border-[var(--border-subtle)] text-primary font-bold px-4 rounded-xl shadow-sm hover:border-primary/50">
                  <Edit3 size={14} className="mr-2"/> Edit Goal
                </Button>
              </div>
            </div>
            
            {/* Career Roadmap */}
            <div className="relative z-10">
              <h4 className="text-sm font-extrabold text-primary mb-5 flex items-center gap-2 uppercase tracking-wide"><Milestone size={18}/> Career Roadmap</h4>
              <div className="flex items-center justify-between relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:right-0 before:h-1 before:bg-[var(--border-subtle)] before:z-0">
                
                <div className="relative z-10 flex flex-col items-center gap-2 w-1/4">
                  <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white shadow-md border-2 border-white">
                    <CheckCircle2 size={16}/>
                  </div>
                  <span className="text-xs font-bold text-primary text-center">Senior Cloud Eng.</span>
                  <span className="text-[10px] font-semibold text-success bg-success-light/50 px-2 py-0.5 rounded-full">Achieved</span>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2 w-1/4">
                  <div className="w-8 h-8 rounded-full bg-warning flex items-center justify-center text-white shadow-md border-2 border-white">
                    <span className="font-bold text-xs">2</span>
                  </div>
                  <span className="text-xs font-bold text-primary text-center">Lead Projects</span>
                  <span className="text-[10px] font-semibold text-warning-dark bg-warning-light/50 px-2 py-0.5 rounded-full">In Progress</span>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2 w-1/4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-secondary shadow-md border-2 border-[var(--border-subtle)]">
                    <span className="font-bold text-xs">3</span>
                  </div>
                  <span className="text-xs font-bold text-secondary text-center">System Design Cert</span>
                  <span className="text-[10px] font-semibold text-tertiary">Upcoming</span>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2 w-1/4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-white shadow-lg border-2 border-white">
                    <Crosshair size={18}/>
                  </div>
                  <span className="text-xs font-extrabold text-primary text-center">Cloud Architect</span>
                  <span className="text-[10px] font-semibold text-primary">Goal</span>
                </div>

              </div>
            </div>

            {/* Skill Gap Analysis */}
            <div className="mt-4 relative z-10">
              <h4 className="text-sm font-extrabold text-primary mb-4 flex items-center gap-2 uppercase tracking-wide">Skill Readiness Analysis</h4>
              <div className="flex flex-col gap-4 w-full bg-white/40 p-5 rounded-2xl border border-[var(--border-subtle)] shadow-sm">
                <div className="w-full">
                  <div className="flex items-center w-full mb-2">
                    <span className="font-bold text-primary text-sm flex-1">AWS EKS Architecture</span>
                    <span className="text-warning-dark text-[10px] font-bold uppercase tracking-wider bg-warning-light/50 px-2 py-1 rounded-md border border-warning/20">Need Advanced</span>
                  </div>
                  <div className="w-full bg-[var(--border-subtle)] rounded-full h-2 shadow-inner overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: '40%', background: 'linear-gradient(to right, var(--color-warning), #f97316)' }}></div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center w-full mb-2">
                    <span className="font-bold text-primary text-sm flex-1">Enterprise System Design</span>
                    <span className="text-danger text-[10px] font-bold uppercase tracking-wider bg-danger-light/50 px-2 py-1 rounded-md border border-danger/20">Need Expert</span>
                  </div>
                  <div className="w-full bg-[var(--border-subtle)] rounded-full h-2 shadow-inner overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: '60%', background: 'linear-gradient(to right, var(--color-danger), #ef4444)' }}></div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center w-full mb-2">
                    <span className="font-bold text-primary text-sm flex-1">Infrastructure as Code (Terraform)</span>
                    <span className="text-success text-[10px] font-bold uppercase tracking-wider bg-success-light/50 px-2 py-1 rounded-md border border-success/20">Met (Advanced)</span>
                  </div>
                  <div className="w-full bg-[var(--border-subtle)] rounded-full h-2 shadow-inner overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: '100%', background: 'linear-gradient(to right, var(--color-success), #10b981)' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-sm font-extrabold text-primary flex items-center gap-2 uppercase tracking-wide mt-2 relative z-10">AI Recommended Learning Path</h4>
            <div className="grid grid-cols-2 gap-5 relative z-10">
              <div className="relative border border-[var(--border-subtle)] rounded-2xl p-6 flex flex-col gap-3 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm group overflow-hidden">
                <div className="absolute top-0 right-0 bg-warning text-white text-[10px] font-bold px-3 py-1 shadow-sm rounded-bl-xl">Top Match</div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-primary bg-primary/10 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                  <BookOpen size={20}/>
                </div>
                <div>
                  <h5 className="font-extrabold text-base text-primary mb-1">Advanced EKS Architecture</h5>
                  <p className="text-xs font-semibold text-secondary">Coursera • 12 hours</p>
                </div>
                <p className="text-xs text-secondary leading-relaxed mb-4 mt-1 font-medium">Directly closes your AWS EKS skill gap. 85% of Cloud Architects at the company have completed this.</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[10px] font-bold text-warning-dark bg-warning-light/50 px-2 py-1 rounded-md">+15% Readiness</span>
                  <div className="flex items-center text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                    <PlayCircle size={14} className="mr-1"/> Start Course
                  </div>
                </div>
              </div>

              <div className="border border-[var(--border-subtle)] rounded-2xl p-6 flex flex-col gap-3 hover:border-info/50 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm group overflow-hidden">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-info bg-info/10 group-hover:scale-110 group-hover:bg-info group-hover:text-white transition-all">
                  <BookOpen size={20}/>
                </div>
                <div>
                  <h5 className="font-extrabold text-base text-primary mb-1">Enterprise System Design</h5>
                  <p className="text-xs font-semibold text-secondary">Internal Academy • 8 hours</p>
                </div>
                <p className="text-xs text-secondary leading-relaxed mb-4 mt-1 font-medium">Required knowledge for Architect transitions internally. Covers high-availability microservices.</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[10px] font-bold text-info bg-info/10 px-2 py-1 rounded-md">+20% Readiness</span>
                  <div className="flex items-center text-xs font-bold text-info group-hover:translate-x-1 transition-transform">
                    View Details <ChevronRight size={14} className="ml-1"/>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="col-span-1 flex flex-col p-6 shadow-md overflow-hidden relative border border-success/20 bg-gradient-to-b from-success/5 to-white h-fit">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 rounded-full blur-2xl"></div>
          <h3 className="font-extrabold text-xl mb-1 text-primary flex items-center gap-2"><TrendingUp size={22} className="text-success"/> Market Demand Digest</h3>
          <p className="text-xs text-secondary mb-6 font-medium">Real-time skills demand trajectory in your industry (Tech).</p>
          
          <div className="space-y-4 flex-1 relative" style={{ zIndex: 10 }}>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[var(--border-subtle)] shadow-sm hover:border-success/30 transition-colors">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-primary">Kubernetes</span>
                <span className="text-[10px] font-semibold text-tertiary uppercase tracking-wider">Platform Eng.</span>
              </div>
              <span className="text-xs font-extrabold text-success bg-success-light/50 px-3 py-1.5 rounded-lg flex items-center border border-success/20"><TrendingUp size={12} className="mr-1"/> +14%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[var(--border-subtle)] shadow-sm hover:border-success/30 transition-colors">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-primary">GenAI Architecture</span>
                <span className="text-[10px] font-semibold text-tertiary uppercase tracking-wider">Data / Cloud Eng.</span>
              </div>
              <span className="text-xs font-extrabold text-success bg-success-light/50 px-3 py-1.5 rounded-lg flex items-center border border-success/20"><TrendingUp size={12} className="mr-1"/> +45%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[var(--border-subtle)] shadow-sm hover:border-secondary/30 transition-colors">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-primary">React & Next.js</span>
                <span className="text-[10px] font-semibold text-tertiary uppercase tracking-wider">Frontend</span>
              </div>
              <span className="text-xs font-extrabold text-secondary bg-[var(--bg-main)] px-3 py-1.5 rounded-lg flex items-center border border-[var(--border-subtle)]"><ArrowRight size={12} className="mr-1"/> Stable</span>
            </div>
          </div>
          
          <Button variant="primary" className="w-full mt-8 text-xs font-bold rounded-xl shadow-md py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-success-dark to-success border-none">
            View Full Market Report <ExternalLink size={14}/>
          </Button>
        </Card>
      </div>

      <Modal isOpen={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)} title="Set Career Goal">
        <div className="flex flex-col gap-5">
          <p className="text-sm text-secondary font-medium">Define your next career milestone so the AI can map your learning path and calculate your readiness score.</p>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider">Target Role</label>
            <select className="h-10 px-3 rounded-xl border border-[var(--border-subtle)] w-full text-sm font-semibold outline-none focus:border-primary bg-white shadow-sm appearance-none cursor-pointer">
              <option>Cloud Architect</option>
              <option>Engineering Manager</option>
              <option>Principal Engineer</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider">Timeline</label>
              <select className="h-10 px-3 rounded-xl border border-[var(--border-subtle)] w-full text-sm font-semibold outline-none focus:border-primary bg-white shadow-sm appearance-none cursor-pointer">
                <option>12-18 Months</option>
                <option>6-12 Months</option>
                <option>2+ Years</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider">Target Industry</label>
              <select className="h-10 px-3 rounded-xl border border-[var(--border-subtle)] w-full text-sm font-semibold outline-none focus:border-primary bg-white shadow-sm appearance-none cursor-pointer">
                <option>Tech / Cloud</option>
                <option>FinTech</option>
                <option>HealthTech</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider">Focus Areas (Optional)</label>
            <input type="text" className="h-10 px-3 rounded-xl border border-[var(--border-subtle)] w-full text-sm font-semibold outline-none focus:border-primary bg-white shadow-sm" placeholder="e.g. Serverless, Team Leadership" />
          </div>
          <div className="flex justify-end gap-3 mt-4 pt-5 border-t border-[var(--border-subtle)]">
            <Button variant="ghost" onClick={() => setIsGoalModalOpen(false)} className="rounded-xl font-bold bg-[var(--bg-main)]">Cancel</Button>
            <Button variant="primary" onClick={() => setIsGoalModalOpen(false)} className="rounded-xl shadow-md font-bold px-6">Update Goal</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
