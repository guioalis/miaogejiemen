export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface ApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export type Theme = 'light' | 'dark';
