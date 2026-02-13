import React from 'react';
import { ArrowLeft, Mountain, Scale, Users, Gavel } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const AboutPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8 animate-fade-in pb-24">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 font-medium"
      >
        <ArrowLeft size={20} />
        Back to Chat
      </button>

      <article className="prose prose-stone max-w-none">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-6">The Philosophy of Mattr</h1>
        
        <p className="text-xl text-stone-600 font-serif leading-relaxed mb-12">
          Mattr is an attempt to operationalize one of the most significant achievements in modern moral philosophy: 
          Derek Parfit's <em>Triple Theory</em>.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-3">
            <Mountain className="text-stone-400" />
            Climbing the Mountain
          </h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            In his magnum opus <em>On What Matters</em>, Derek Parfit argued that the three major traditions of Western ethics are not rival theories fighting for supremacy. Instead, they are like three climbers scaling the same mountain from different sides.
          </p>
          <p className="text-stone-700 leading-relaxed">
            Parfit believed that if we look closely, these distinct paths converge at the summit. He combined them into a single, unified framework known as the <strong>Triple Theory</strong>.
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <Scale size={20} />
            </div>
            <h3 className="font-bold text-stone-900 mb-2">Rule Consequentialism</h3>
            <p className="text-sm text-stone-600">
              Principles whose universal acceptance would make things go best.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="bg-emerald-50 w-10 h-10 rounded-full flex items-center justify-center text-emerald-600 mb-4">
              <Users size={20} />
            </div>
            <h3 className="font-bold text-stone-900 mb-2">Kantian Contractualism</h3>
            <p className="text-sm text-stone-600">
              Principles that everyone could rationally will to be universal laws.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="bg-amber-50 w-10 h-10 rounded-full flex items-center justify-center text-amber-600 mb-4">
              <Gavel size={20} />
            </div>
            <h3 className="font-bold text-stone-900 mb-2">Scanlonian Contractualism</h3>
            <p className="text-sm text-stone-600">
              Principles that no one could reasonably reject.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">The Superior Secular Ethic</h2>
          <div className="space-y-4 text-stone-700 leading-relaxed">
            <p>
              In an increasingly secular world, we often face the "crisis of foundations": without religious dogma, are moral judgments just matters of opinion?
            </p>
            <p>
              Parfit’s work provides a robust "Yes" to objective morality without relying on the supernatural. It suggests that <strong>ethics is a matter of reason, not just preference</strong>.
            </p>
            <p>
              By triangulating these three perspectives, the Triple Theory filters out biases. It prevents the "end justifies the means" ruthlessness of pure utilitarianism, and the rigid inflexibility of pure duty-based ethics. It asks us to justify our actions in a way that no reasonable person could object to—a standard that bridges cultural and personal divides.
            </p>
          </div>
        </section>
        
        <div className="bg-stone-900 text-stone-50 p-8 rounded-2xl">
           <p className="font-serif italic text-lg text-center leading-relaxed">
             "An act is wrong just when such acts are disallowed by some principle that is one of the principles whose being universal laws would make things go best, one of the only principles whose being universal laws everyone could rationally will, and a principle that no one could reasonably reject."
           </p>
           <p className="text-center mt-6 text-stone-400 text-sm font-medium tracking-widest uppercase">— Derek Parfit, On What Matters</p>
        </div>

      </article>
    </div>
  );
};