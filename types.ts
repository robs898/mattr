export interface TripleTheoryAnalysis {
  ruleConsequentialism: string;
  kantianContractualism: string;
  scanlonianContractualism: string;
  synthesis: string;
}

export interface MattrResponse {
  shortAnswer: string;
  clarificationQuestion?: string;
  needsClarification: boolean;
  analysis?: TripleTheoryAnalysis;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string; // Display text (user message or short answer)
  data?: MattrResponse; // The structured data from the model
  isExpanded?: boolean; // UI state for expansion
  isLoading?: boolean;
}