import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Briefcase, BrainCircuit, Users, Target, CheckCircle2, ChevronRight, Plus, Sparkles, Network } from 'lucide-react';
import { mockGigs, mockMentors } from '../../dummy/organization/talentMarketplaceData';

export const TalentMarketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gigs' | 'mentoring'>('gigs');

  return (
    <div className="flex flex-col gap-6 relative pb-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold mb-2 text-primary tracking-tight">AI Talent Marketplace</h1>
          <p className="text-secondary text-sm font-medium">Organization Digital Twin • Internal mobility, gig assignments, and mentoring matched by Hybrid AI.</p>
        </div>
        <Button variant="primary" className="shadow-md rounded-xl font-bold flex items-center gap-2">
          <Plus size={16}/> Post Opportunity
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Left Column: Recommendations */}
        <div className="col-span-2 flex flex-col gap-6">
          <Card className="glass flex flex-col gap-0 p-0 overflow-hidden border border-[var(--border-subtle)] shadow-sm">
            <div className="px-6 py-4 border-b border-[var(--border-subtle)] bg-white/50 flex items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-black/5 rounded-xl">
                <button 
                  onClick={() => setActiveTab('gigs')}
                  className={`text-sm font-bold transition-all px-4 py-2 flex items-center gap-2 rounded-lg ${activeTab === 'gigs' ? 'bg-white text-primary shadow-sm' : 'text-secondary hover:text-primary hover:bg-white/50'}`}
                >
                  <Briefcase size={16} /> Internal Gigs & Projects
                </button>
                <button 
                  onClick={() => setActiveTab('mentoring')}
                  className={`text-sm font-bold transition-all px-4 py-2 flex items-center gap-2 rounded-lg ${activeTab === 'mentoring' ? 'bg-white text-primary shadow-sm' : 'text-secondary hover:text-primary hover:bg-white/50'}`}
                >
                  <Users size={16} /> Mentoring Matches
                </button>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-4 bg-[var(--bg-main)]/30">
              {activeTab === 'gigs' && (
                <>
                  {mockGigs.map((gig) => (
                    <div key={gig.id} className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-[var(--border-subtle)] flex gap-5 hover:border-primary/30 transition-all shadow-sm group">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${gig.iconBg} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                        {gig.icon === 'Target' && <Target size={20} />}
                        {gig.icon === 'Briefcase' && <Briefcase size={20} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-extrabold text-primary text-base group-hover:text-primary-hover transition-colors">{gig.title}</h3>
                            <p className="text-xs font-semibold text-secondary">{gig.timeCommitment}</p>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-success-light/50 border border-success/20 text-success-dark text-[10px] font-black rounded-md shadow-sm">
                              <BrainCircuit size={12}/> {gig.aiMatch}% AI Match
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-tertiary mt-3 mb-3 leading-relaxed font-medium max-w-2xl">
                          {gig.description}
                        </p>
                        <div className="flex justify-between items-end">
                          <div className="flex flex-wrap gap-2">
                            {gig.tags.map((tag, idx) => (
                              <span key={idx} className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${tag.color}`}>{tag.text}</span>
                            ))}
                          </div>
                          <Button size="sm" variant="primary" className="shadow-md rounded-xl px-5 font-bold">
                            Review & Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {activeTab === 'mentoring' && (
                <>
                  {mockMentors.map((mentor) => (
                    <div key={mentor.id} className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-[var(--border-subtle)] flex gap-5 hover:border-primary/30 transition-all shadow-sm group">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${mentor.iconBg} flex items-center justify-center text-white shrink-0 shadow-sm font-black text-lg`}>
                        {mentor.initials}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-extrabold text-primary text-base group-hover:text-primary-hover transition-colors">{mentor.name}</h3>
                            <p className="text-xs font-semibold text-secondary">{mentor.role}</p>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-warning-light/50 border border-warning/30 text-warning-dark text-[10px] font-black rounded-md shadow-sm">
                              <Network size={12}/> {mentor.matchScore}% Complementary
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-tertiary mt-3 mb-3 leading-relaxed font-medium max-w-2xl">
                          {mentor.description}
                        </p>
                        <div className="flex justify-end">
                          <Button size="sm" variant="primary" className="shadow-sm rounded-lg px-4 font-bold">
                            Request Mentorship
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

            </div>
          </Card>
        </div>

        {/* Right Column: AI Explainer & Activity */}
        <div className="col-span-1 flex flex-col gap-6">
          <Card className="glass p-6 bg-gradient-to-br from-primary/5 to-info/5 border border-primary/20 flex flex-col gap-4 relative overflow-hidden shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                <Sparkles size={20} />
              </div>
              <h3 className="font-extrabold text-primary text-sm uppercase tracking-wider">How We Match You</h3>
            </div>
            
            <div className="flex flex-col gap-3 mt-2">
              <div className="bg-white p-4 rounded-xl border border-[var(--border-subtle)] shadow-sm">
                <h4 className="text-sm font-bold text-primary mb-1">Hybrid Recommender</h4>
                <p className="text-xs text-secondary font-medium leading-relaxed">
                  We look at your current skills (content-based) AND the historical success of employees who made similar moves (collaborative filtering).
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-[var(--border-subtle)] shadow-sm">
                <h4 className="text-sm font-bold text-primary mb-1">Vector Similarity</h4>
                <p className="text-xs text-secondary font-medium leading-relaxed">
                  For mentoring, our ML model maps you and prospective mentors into a vector space, searching for complementary skill profiles.
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-primary text-sm uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16}/> Your Applications
            </h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[var(--border-subtle)] shadow-sm">
                <div>
                  <h4 className="text-sm font-bold text-primary">Cloud Migration Tiger Team</h4>
                  <p className="text-xs text-secondary font-medium mt-0.5">Applied 2 days ago</p>
                </div>
                <span className="text-xs font-bold text-warning-dark bg-warning-light/50 px-3 py-1.5 rounded-lg border border-warning/20">Under Review</span>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};
