export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  role?: 'user' | 'assistant' | 'system';
}

export interface ApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export type Theme = 'light' | 'dark';

export interface Conversation {
  id: string;
  messages: Message[];
  title?: string;
  createdAt: string;
}
