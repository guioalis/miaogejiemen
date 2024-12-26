import { useState } from 'react';
import { Send } from 'lucide-react';
import { Theme } from '../types';

interface DreamInputProps {
  onSubmit: (dream: string) => void;
  isLoading: boolean;
  theme: Theme;
}

const MAX_LENGTH = 500;

export const DreamInput = ({ onSubmit, isLoading, theme }: DreamInputProps) => {
  const [dream, setDream] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dream.trim() && !isLoading && dream.length <= MAX_LENGTH) {
      onSubmit(dream);
      setDream('');
    }
  };

  const charCount = dream.length;
  const isOverLimit = charCount > MAX_LENGTH;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="描述你的梦境..."
            className={`flex-1 p-3 rounded-lg border transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500'
                : 'bg-white border-gray-200 text-gray-800 focus:ring-purple-500'
            } focus:outline-none focus:ring-2 focus:border-transparent`}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !dream.trim() || isOverLimit}
            className="p-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:bg-purple-300 dark:disabled:bg-purple-900 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className={`text-xs ${
          isOverLimit ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {charCount}/{MAX_LENGTH} 字
        </div>
      </div>
    </form>
  );
};
