import React, { useState, useRef, useEffect } from 'react';
import { Message, MattrResponse } from './types';
import { sendMessageToGemini } from './services/geminiService';
import { MessageBubble } from './components/MessageBubble';
import { InputArea } from './components/InputArea';
import { AboutPage } from './components/AboutPage';
import { Scale, Info } from 'lucide-react';

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'intro',
    role: 'assistant',
    content: "I am Mattr, your ethical assistant. Ask me a moral conundrum, and I will analyze it through three distinct ethical lenses to help you find the best way forward.",
  }
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [view, setView] = useState<'chat' | 'about'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (view === 'chat') {
      scrollToBottom();
    }
  }, [messages, isTyping, view]);

  const handleSendMessage = async (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.role === 'user' ? m.content : JSON.stringify(m.data) || m.content }]
    }));

    try {
      const response = await sendMessageToGemini(history, text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.shortAnswer,
        data: response,
        isExpanded: false
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting to the ethical reasoning engine. Please check your API key and try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleExpand = (id: string) => {
    setMessages(prev => prev.map(m => 
      m.id === id ? { ...m, isExpanded: !m.isExpanded } : m
    ));
  };

  const handleSkipClarification = () => {
    handleSendMessage("Please proceed with general assumptions without further details.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 font-sans selection:bg-stone-200">
      
      {/* Header */}
      <header className="sticky top-0 bg-stone-50/80 backdrop-blur-md z-20 border-b border-stone-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setView('chat')}
          >
            <div className="p-2 bg-stone-900 rounded-lg text-white group-hover:bg-stone-800 transition-colors">
              <Scale size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-stone-900 font-serif">
              Mattr
            </h1>
          </div>
          
          <button 
            onClick={() => setView(view === 'chat' ? 'about' : 'chat')}
            className="text-stone-500 hover:text-stone-900 text-sm font-semibold transition-colors flex items-center gap-2"
          >
            {view === 'chat' ? (
              <>
                About <Info size={16} />
              </>
            ) : (
              "Close"
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      {view === 'chat' ? (
        <>
          <main className="flex-1 max-w-2xl mx-auto w-full px-4 pt-8 pb-32">
            {messages.map((msg) => (
              <MessageBubble 
                key={msg.id} 
                message={msg} 
                onExpand={toggleExpand}
                onSkipClarification={handleSkipClarification}
              />
            ))}
            {isTyping && (
              <MessageBubble 
                message={{
                  id: 'loading',
                  role: 'assistant',
                  content: '',
                  isLoading: true
                }}
                onExpand={() => {}}
                onSkipClarification={() => {}}
              />
            )}
            <div ref={messagesEndRef} />
          </main>
          <InputArea onSend={handleSendMessage} disabled={isTyping} />
        </>
      ) : (
        <AboutPage onBack={() => setView('chat')} />
      )}
    </div>
  );
}