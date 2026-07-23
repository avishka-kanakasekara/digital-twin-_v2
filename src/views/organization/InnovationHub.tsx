import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Lightbulb, Network, BrainCircuit, Rocket, TrendingUp, Sparkles, MessageSquare, ChevronRight, Share2 } from 'lucide-react';
import { mockTopIdeas, mockCommunities } from '../../dummy/organization/innovationData';

export const InnovationHub: React.FC = () => {
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDesc, setIdeaDesc] = useState('');
  const [isScoring, setIsScoring] = useState(false);
  const [scoreResult, setScoreResult] = useState<{ impact: string, feasibility: string, similar: number } | null>(null);

  const handleScoreIdea = () => {
    if (!ideaTitle || !ideaDesc) return;
    setIsScoring(true);
    setTimeout(() => {
      setIsScoring(false);
      setScoreResult({
        impact: 'High',
        feasibility: '82%',
        similar: 2
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 relative pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold mb-2 text-primary tracking-tight">Innovation & Knowledge Hub</h1>
        <p className="text-secondary text-sm font-medium">Organization Digital Twin • Submit ideas, join communities, and track innovation pipeline using ML text embeddings.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        
        {/* Left Column: Submit & Predict */}
        <div className="col-span-1 flex flex-col gap-6">
          <Card className="glass p-6 flex flex-col gap-4 relative overflow-hidden group border border-[var(--border-subtle)] bg-white/80 shadow-md">
            
            <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary">
                <Lightbulb size={20} className={scoreResult ? 'text-success' : 'text-primary'}/>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-primary uppercase tracking-wider">Submit Idea</h3>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mt-0.5">Real-time ML Scoring</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 z-10">
              <input 
                type="text" 
                placeholder="Idea Title (e.g. Automated Onboarding)" 
                className="w-full p-3 rounded-xl border border-[var(--border-subtle)] text-sm font-semibold text-primary placeholder:font-medium placeholder:text-tertiary outline-none focus:border-primary bg-white shadow-sm transition-colors"
                value={ideaTitle}
                onChange={e => setIdeaTitle(e.target.value)}
              />
              <textarea 
                placeholder="Describe your idea in detail..." 
                className="w-full p-3 rounded-xl border border-[var(--border-subtle)] text-sm font-medium text-secondary placeholder:font-medium placeholder:text-tertiary outline-none focus:border-primary bg-white shadow-sm h-32 resize-none transition-colors"
                value={ideaDesc}
                onChange={e => setIdeaDesc(e.target.value)}
              />
              
              {!scoreResult ? (
                <Button 
                  variant="primary" 
                  className="w-full shadow-md rounded-xl py-3 font-bold flex justify-center items-center gap-2"
                  onClick={handleScoreIdea}
                  disabled={isScoring || !ideaTitle || !ideaDesc}
                >
                  {isScoring ? (
                    <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div> AI Processing...</>
                  ) : (
                    <><BrainCircuit size={16}/> Evaluate Feasibility</>
                  )}
                </Button>
              ) : (
                <div className="p-4 bg-white/80 border border-success/30 rounded-xl flex flex-col gap-3 animate-fade-in shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-tertiary">Predicted Impact</span>
                    <span className="text-sm font-black text-success-dark">{scoreResult.impact}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-tertiary">Est. Feasibility</span>
                    <span className="text-sm font-black text-primary">{scoreResult.feasibility}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-tertiary">Similar Past Ideas</span>
                    <span className="text-sm font-black text-warning-dark">{scoreResult.similar} found</span>
                  </div>
                  
                  <div className="text-[10px] font-bold text-secondary bg-primary-light/30 p-2 rounded-lg leading-relaxed mt-1">
                    Supervised classification model analyzing your text embeddings predicts a high success rate based on past implementations.
                  </div>

                  <Button variant="primary" className="w-full mt-2 font-bold py-2" onClick={() => { setScoreResult(null); setIdeaTitle(''); setIdeaDesc(''); }}>
                    Submit for Review
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Leaderboard & Communities */}
        <div className="col-span-2 flex flex-col gap-6">
          
          <Card className="glass p-6 flex flex-col gap-5 border border-[var(--border-subtle)]">
            <div>
              <h3 className="font-extrabold text-primary text-sm uppercase tracking-wider flex items-center gap-2">
                <Rocket size={16} className="text-primary"/> Top Ranked Ideas Pipeline
              </h3>
              <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider mt-0.5">Ranked by ML Impact Score & Feasibility</p>
            </div>

            <div className="flex flex-col gap-4">
              
              {mockTopIdeas.map((idea) => (
                <div key={idea.id} className="bg-white/60 p-4 rounded-xl border border-[var(--border-subtle)] flex items-start justify-between shadow-sm hover:border-primary/30 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${idea.authorBg} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                      {idea.authorInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-extrabold text-primary text-sm group-hover:text-primary-hover transition-colors">{idea.title}</h4>
                        {idea.patentPending && (
                          <span className="text-[10px] uppercase font-bold text-warning bg-warning/10 border border-warning/20 px-2.5 py-1 rounded-lg flex items-center gap-1"><Sparkles size={12}/> Patent Pending</span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-secondary line-clamp-1 max-w-md">{idea.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] uppercase font-bold bg-success/10 border border-success/20 px-2.5 py-1 rounded-lg text-success">Impact: {idea.impactScore}/100</span>
                        <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg ${idea.feasibility === 'High' ? 'bg-primary/10 border border-primary/20 text-primary' : 'bg-warning/10 border border-warning/20 text-warning-dark'}`}>Feasibility: {idea.feasibility}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] font-bold ${idea.status === 'Approved' ? 'text-success' : 'text-tertiary'}`}>{idea.status}</span>
                    <button className="text-primary hover:text-primary-hover p-1 bg-white rounded-lg shadow-sm border border-[var(--border-subtle)]"><ChevronRight size={16}/></button>
                  </div>
                </div>
              ))}

            </div>
          </Card>

          <Card className="glass p-6 flex flex-col gap-5 border border-[var(--border-subtle)]">
            <div>
              <h3 className="font-extrabold text-primary text-sm uppercase tracking-wider flex items-center gap-2">
                <Network size={16} className="text-primary"/> Communities of Practice
              </h3>
              <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider mt-0.5">Knowledge sharing across the organization</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {mockCommunities.map((community) => (
                <div key={community.id} className="p-5 bg-white rounded-xl border border-[var(--border-subtle)] flex flex-col gap-3 shadow-sm hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${community.bgClass} flex items-center justify-center font-black`}>
                      {community.icon === 'TrendingUp' && <TrendingUp size={18}/>}
                      {community.icon === 'Share2' && <Share2 size={18}/>}
                    </div>
                    <h4 className="font-extrabold text-sm text-primary">{community.name}</h4>
                  </div>
                  <p className="text-xs font-medium text-secondary">{community.members} Active Members</p>
                  <Button size="sm" variant="ghost" className={`bg-white border border-[var(--border-subtle)] font-bold mt-1 text-xs shadow-sm hover:border-primary ${community.joined ? 'text-primary' : ''}`}>
                    {community.joined ? 'Joined' : 'Join Community'}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
};
