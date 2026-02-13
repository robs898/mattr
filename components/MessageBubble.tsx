import React from 'react';
import { Message } from '../types';
import { TripleTheoryCard } from './TripleTheoryCard';
import { User, Bot, ChevronDown, ChevronUp, AlertCircle, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  message: Message;
  onExpand: (id: string) => void;
  onSkipClarification: () => void;
}

export const MessageBubble: React.FC<Props> = ({ message, onExpand, onSkipClarification }) => {
  const isUser = message.role === 'user';
  const hasAnalysis = message.data?.analysis && !message.data.needsClarification;
  const needsClarification = message.data?.needsClarification;

  return (
    <div className={`flex w-full mb-8 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
          isUser ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200 text-stone-600 shadow-sm'
        }`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Content Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-5 py-4 rounded-2xl shadow-sm text-base leading-relaxed ${
            isUser 
              ? 'bg-stone-800 text-stone-50 rounded-tr-none' 
              : 'bg-white border border-stone-100 text-stone-800 rounded-tl-none'
          }`}>
            {message.isLoading ? (
               <div className="flex items-center gap-2 text-stone-400">
                 <Sparkles size={16} className="animate-pulse" />
                 <span className="text-sm font-medium">Applying Ethical Framework...</span>
               </div>
            ) : (
              <>
                <p className={!isUser && hasAnalysis ? "font-serif text-lg font-medium" : ""}>
                  {message.content}
                </p>

                {needsClarification && !isUser && (
                   <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col gap-2">
                     <p className="text-xs text-stone-500 uppercase font-semibold tracking-wider">
                       Clarification Needed
                     </p>
                     <p className="text-sm text-stone-600 italic">
                       {message.data?.clarificationQuestion || "I need a bit more detail to provide an accurate ethical judgment."}
                     </p>
                     <button 
                       onClick={onSkipClarification}
                       className="mt-2 text-xs bg-stone-100 hover:bg-stone-200 text-stone-600 px-3 py-2 rounded transition-colors self-start font-medium"
                     >
                       Skip & use general assumptions
                     </button>
                   </div>
                )}
              </>
            )}
          </div>

          {/* Expand Button for Analysis */}
          {!isUser && !message.isLoading && hasAnalysis && message.data?.analysis && (
            <div className="mt-2 w-full">
              {!message.isExpanded ? (
                <button
                  onClick={() => onExpand(message.id)}
                  className="group flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors px-1"
                >
                  <span className="w-1 h-1 bg-stone-400 rounded-full group-hover:bg-stone-800"></span>
                  VIEW ETHICAL ANALYSIS
                  <ChevronDown size={14} />
                </button>
              ) : (
                <div className="bg-white rounded-xl border border-stone-200 shadow-lg p-1 mt-1 overflow-hidden transition-all duration-300">
                  <div className="bg-stone-50/50 p-4 md:p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                       <h3 className="text-sm font-bold text-stone-800 flex items-center gap-2">
                         <BookOpen size={16} /> Ethical Framework
                       </h3>
                       <button 
                         onClick={() => onExpand(message.id)}
                         className="text-stone-400 hover:text-stone-700"
                       >
                         <ChevronUp size={16} />
                       </button>
                    </div>
                    <TripleTheoryCard analysis={message.data.analysis} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};