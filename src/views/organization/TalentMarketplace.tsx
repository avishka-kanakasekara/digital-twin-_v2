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
          <h1 className="text-3xl font-bold mb-1 text-slate-900 tracking-tight">AI Talent Marketplace</h1>
          <p className="text-base text-slate-500 font-medium">Organization Digital Twin • Internal mobility, gig assignments, and mentoring matched by Hybrid AI.</p>
        </div>
        <Button variant="primary" className="shadow-sm hover:shadow-md rounded-xl font-semibold flex items-center gap-2">
          <Plus size={16}/> Post Opportunity
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Left Column: Recommendations */}
        <div className="col-span-2 flex flex-col gap-6">
          <Card className="flex flex-col gap-0 p-0 overflow-hidden bg-white border border-slate-200 shadow-sm rounded-2xl">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                <button 
                  onClick={() => setActiveTab('gigs')}
                  className={`text-sm font-semibold transition-all px-4 py-2 flex items-center gap-2 rounded-lg ${activeTab === 'gigs' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200/50' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}
                >
                  <Briefcase size={16} /> Internal Gigs & Projects
                </button>
                <button 
                  onClick={() => setActiveTab('mentoring')}
                  className={`text-sm font-semibold transition-all px-4 py-2 flex items-center gap-2 rounded-lg ${activeTab === 'mentoring' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200/50' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}
                >
                  <Users size={16} /> Mentoring Matches
                </button>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-4 bg-slate-50/30">
              {activeTab === 'gigs' && (
                <>
                  {mockGigs.map((gig) => (
                    <div key={gig.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex gap-5 hover:border-blue-300 hover:shadow-md transition-all shadow-sm group">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${gig.iconBg} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                        {gig.icon === 'Target' && <Target size={20} />}
                        {gig.icon === 'Briefcase' && <Briefcase size={20} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">{gig.title}</h3>
                            <p className="text-xs font-semibold text-slate-500">{gig.timeCommitment}</p>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg shadow-sm">
                              <BrainCircuit size={14}/> {gig.aiMatch}% AI Match
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mt-2 mb-4 leading-relaxed font-medium max-w-2xl">
                          {gig.description}
                        </p>
                        <div className="flex justify-between items-end">
                          <div className="flex flex-wrap gap-2">
                            {gig.tags.map((tag, idx) => (
                              <span key={idx} className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${tag.color}`}>{tag.text}</span>
                            ))}
                          </div>
                          <Button size="sm" variant="primary" className="shadow-sm hover:shadow-md rounded-xl px-5 font-semibold">
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
                    <div key={mentor.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex gap-5 hover:border-blue-300 hover:shadow-md transition-all shadow-sm group">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${mentor.iconBg} flex items-center justify-center text-white shrink-0 shadow-sm font-bold text-lg`}>
                        {mentor.initials}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">{mentor.name}</h3>
                            <p className="text-xs font-semibold text-slate-500">{mentor.role}</p>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold rounded-lg shadow-sm">
                              <Network size={14}/> {mentor.matchScore}% Complementary
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mt-2 mb-4 leading-relaxed font-medium max-w-2xl">
                          {mentor.description}
                        </p>
                        <div className="flex justify-end">
                          <Button size="sm" variant="primary" className="shadow-sm rounded-lg px-4 font-semibold">
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
          <Card className="p-6 bg-slate-900 border border-slate-800 flex flex-col gap-4 relative overflow-hidden shadow-md rounded-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-3 z-10">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-sm text-sky-400">
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wide">How We Match You</h3>
            </div>
            
            <div className="flex flex-col gap-3 mt-2 z-10">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 shadow-sm backdrop-blur-sm">
                <h4 className="text-sm font-bold text-white mb-1.5">Hybrid Recommender</h4>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  We look at your current skills (content-based) AND the historical success of employees who made similar moves (collaborative filtering).
                </p>
              </div>
              
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 shadow-sm backdrop-blur-sm">
                <h4 className="text-sm font-bold text-white mb-1.5">Vector Similarity</h4>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  For mentoring, our ML model maps you and prospective mentors into a vector space, searching for complementary skill profiles.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 flex flex-col gap-4 bg-white border border-slate-200 shadow-sm rounded-2xl">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500"/> Your Applications
            </h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Cloud Migration Tiger Team</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">Applied 2 days ago</p>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200">Under Review</span>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};
