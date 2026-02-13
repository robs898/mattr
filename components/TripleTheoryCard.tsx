import React from 'react';
import { TripleTheoryAnalysis } from '../types';
import { Scale, Users, Gavel, BookOpen } from 'lucide-react';

interface Props {
  analysis: TripleTheoryAnalysis;
}

const TheorySection: React.FC<{
  title: string;
  icon: React.ReactNode;
  content: string;
  colorClass: string;
}> = ({ title, icon, content, colorClass }) => (
  <div className={`p-4 rounded-lg border ${colorClass} bg-opacity-50 mb-3`}>
    <div className="flex items-center gap-2 mb-2 font-semibold text-stone-800">
      {icon}
      <h3>{title}</h3>
    </div>
    <p className="text-sm text-stone-700 leading-relaxed font-serif">
      {content}
    </p>
  </div>
);

export const TripleTheoryCard: React.FC<Props> = ({ analysis }) => {
  return (
    <div className="mt-4 animate-fade-in space-y-4">
      <div className="border-t border-stone-200 pt-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 text-center">
          Ethical Framework Analysis
        </h4>
        
        <TheorySection 
          title="Rule Consequentialism" 
          icon={<Scale size={16} />}
          content={analysis.ruleConsequentialism}
          colorClass="bg-blue-50 border-blue-100"
        />
        
        <TheorySection 
          title="Kantian Contractualism" 
          icon={<Users size={16} />}
          content={analysis.kantianContractualism}
          colorClass="bg-emerald-50 border-emerald-100"
        />
        
        <TheorySection 
          title="Scanlonian Contractualism" 
          icon={<Gavel size={16} />}
          content={analysis.scanlonianContractualism}
          colorClass="bg-amber-50 border-amber-100"
        />

        <div className="mt-6 p-5 bg-stone-100 rounded-xl border border-stone-200">
          <div className="flex items-center gap-2 mb-2 font-bold text-stone-900">
            <BookOpen size={18} />
            <h3>Final Synthesis</h3>
          </div>
          <p className="text-stone-800 font-serif leading-relaxed italic">
            "{analysis.synthesis}"
          </p>
        </div>
      </div>
    </div>
  );
};