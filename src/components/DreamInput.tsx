import { useState } from 'react';
import { SendHorizonal } from 'lucide-react';
import { Theme } from '../types';

interface DreamInputProps {
  onSubmit: (dream: string) => void;
  isLoading: boolean;
  theme: Theme;
}

export const DreamInput = ({ onSubmit, isLoading, theme }: DreamInputProps) => {
  const [dream, setDream] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dream.trim() && !isLoading) {
      onSubmit(dream);
      setDream('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder="描述你的梦境或咨询风水问题..."
          className={`flex-1 p-3 rounded-lg border transition-colors ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500'
              : 'bg-white border-gray-200 text-gray-800 focus:ring-purple-500'
          } focus:outline-none focus:ring-2 focus:border-transparent`}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !dream.trim()}
          className={`p-3 rounded-lg text-white transition-colors ${
            isLoading || !dream.trim()
              ? 'bg-purple-300 dark:bg-purple-900 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600'
          }`}
        >
          <SendHorizonal className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
