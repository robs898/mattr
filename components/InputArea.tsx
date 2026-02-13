import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowUp } from 'lucide-react';

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

export const InputArea: React.FC<Props> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-stone-50/90 backdrop-blur-md border-t border-stone-200 py-4 px-4 pb-8 z-10">
      <div className="max-w-2xl mx-auto relative">
        <form onSubmit={handleSubmit} className="relative group">
          <textarea
            ref={textareaRef}
            rows={1}
            disabled={disabled}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a moral question (e.g., Should I buy a diesel car?)"
            className="w-full bg-white border border-stone-300 text-stone-800 rounded-3xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent resize-none overflow-hidden max-h-32 shadow-sm placeholder:text-stone-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || disabled}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-stone-900 text-white rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-700 transition-colors w-10 h-10"
          >
            <ArrowUp size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};