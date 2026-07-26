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
        <h1 className="text-3xl font-bold mb-1 text-slate-900 tracking-tight">Innovation & Knowledge Hub</h1>
        <p className="text-base text-slate-500 font-medium">Organization Digital Twin • Submit ideas, join communities, and track innovation pipeline using ML text embeddings.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        
        {/* Left Column: Submit & Predict */}
        <div className="col-span-1 flex flex-col gap-6">
          <Card className="p-6 flex flex-col gap-5 relative overflow-hidden group bg-white border border-slate-200 shadow-sm rounded-2xl">
            
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm">
                <Lightbulb size={20} className={scoreResult ? 'text-emerald-500' : 'text-slate-600'}/>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Submit Idea</h3>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-0.5">Real-time ML Scoring</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 z-10">
              <input 
                type="text" 
                placeholder="Idea Title (e.g. Automated Onboarding)" 
                className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 bg-slate-50 shadow-sm transition-colors"
                value={ideaTitle}
                onChange={e => setIdeaTitle(e.target.value)}
              />
              <textarea 
                placeholder="Describe your idea in detail..." 
                className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 placeholder:text-slate-400 outline-none focus:border-blue-500 bg-slate-50 shadow-sm h-32 resize-none transition-colors"
                value={ideaDesc}
                onChange={e => setIdeaDesc(e.target.value)}
              />
              
              {!scoreResult ? (
                <Button 
                  variant="primary" 
                  className="w-full shadow-sm hover:shadow-md rounded-xl py-3 font-semibold flex justify-center items-center gap-2"
                  onClick={handleScoreIdea}
                  disabled={isScoring || !ideaTitle || !ideaDesc}
                >
                  {isScoring ? (
                    <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div> AI Processing...</>
                  ) : (
                    <><BrainCircuit size={18}/> Evaluate Feasibility</>
                  )}
                </Button>
              ) : (
                <div className="p-5 bg-white border border-emerald-200 rounded-xl flex flex-col gap-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-semibold text-slate-500 tracking-wide">Predicted Impact</span>
                    <span className="text-sm font-bold text-emerald-700">{scoreResult.impact}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-semibold text-slate-500 tracking-wide">Est. Feasibility</span>
                    <span className="text-sm font-bold text-blue-600">{scoreResult.feasibility}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-semibold text-slate-500 tracking-wide">Similar Past Ideas</span>
                    <span className="text-sm font-bold text-amber-600">{scoreResult.similar} found</span>
                  </div>
                  
                  <div className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-100 p-3 rounded-lg leading-relaxed">
                    Supervised classification model analyzing your text embeddings predicts a high success rate based on past implementations.
                  </div>

                  <Button variant="primary" className="w-full font-semibold py-2.5 rounded-xl shadow-sm hover:shadow-md" onClick={() => { setScoreResult(null); setIdeaTitle(''); setIdeaDesc(''); }}>
                    Submit for Review
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Leaderboard & Communities */}
        <div className="col-span-2 flex flex-col gap-6">
          
          <Card className="p-6 flex flex-col gap-5 border border-slate-200 bg-white rounded-2xl shadow-sm">
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2">
                <Rocket size={16} className="text-blue-600"/> Top Ranked Ideas Pipeline
              </h3>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Ranked by ML Impact Score & Feasibility</p>
            </div>

            <div className="flex flex-col gap-4">
              
              {mockTopIdeas.map((idea) => (
                <div key={idea.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-start justify-between shadow-sm hover:border-blue-300 hover:shadow-md transition-all group">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${idea.authorBg} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm`}>
                      {idea.authorInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{idea.title}</h4>
                        {idea.patentPending && (
                          <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm"><Sparkles size={10}/> Patent Pending</span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-500 line-clamp-1 max-w-md">{idea.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] uppercase font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg text-emerald-700 shadow-sm">Impact: {idea.impactScore}/100</span>
                        <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg shadow-sm ${idea.feasibility === 'High' ? 'bg-blue-50 border border-blue-200 text-blue-700' : 'bg-amber-50 border border-amber-200 text-amber-700'}`}>Feasibility: {idea.feasibility}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wide ${idea.status === 'Approved' ? 'text-emerald-600' : 'text-slate-400'}`}>{idea.status}</span>
                    <button className="text-slate-400 hover:text-blue-600 p-1.5 bg-slate-50 hover:bg-blue-50 rounded-lg border border-slate-200 shadow-sm transition-colors"><ChevronRight size={16}/></button>
                  </div>
                </div>
              ))}

            </div>
          </Card>

          <Card className="p-6 flex flex-col gap-5 border border-slate-200 bg-white rounded-2xl shadow-sm">
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2">
                <Network size={16} className="text-blue-600"/> Communities of Practice
              </h3>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Knowledge sharing across the organization</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {mockCommunities.map((community) => (
                <div key={community.id} className="p-5 bg-white rounded-xl border border-slate-200 flex flex-col gap-3 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${community.bgClass} flex items-center justify-center font-bold shadow-sm`}>
                      {community.icon === 'TrendingUp' && <TrendingUp size={18} className="text-white"/>}
                      {community.icon === 'Share2' && <Share2 size={18} className="text-white"/>}
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{community.name}</h4>
                  </div>
                  <p className="text-xs font-medium text-slate-500">{community.members} Active Members</p>
                  <Button size="sm" variant="ghost" className={`bg-slate-50 border border-slate-200 font-semibold mt-1 text-xs shadow-sm hover:border-blue-300 ${community.joined ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'}`}>
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
