import { useState } from 'react';
import { SendHorizonal, Sparkles } from 'lucide-react';
import { Theme } from '../types';
import axios from 'axios';

interface DreamInputProps {
  onSubmit: (dream: string) => void;
  isLoading: boolean;
  theme: Theme;
}

export const DreamInput = ({ onSubmit, isLoading, theme }: DreamInputProps) => {
  const [dream, setDream] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dream.trim() && !isLoading) {
      onSubmit(dream);
      setDream('');
    }
  };

  const generateDream = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post(
        'https://miaoge2024-zhang2025.hf.space/hf/v1/chat/completions',
        {
          model: "flux-pro/ultra",
          messages: [
            {
              role: "user",
              content: "请生成一个独特有趣的梦境场景，要包含具体的场景描写、人物、情节发展。要求生动形象，富有想象力。"
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        }
      );

      const generatedDream = response.data.choices[0].message.content;
      setDream(generatedDream);
    } catch (error) {
      console.error('Failed to generate dream:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={generateDream}
          disabled={isGenerating || isLoading}
          className={`p-3 rounded-lg transition-colors ${
            isGenerating || isLoading
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
              : theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700 text-purple-400'
              : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
          }`}
          title="生成梦境场景"
        >
          <Sparkles className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
        </button>
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
          disabled={isLoading || isGenerating}
        />
        <button
          type="submit"
          disabled={isLoading || isGenerating || !dream.trim()}
          className={`p-3 rounded-lg text-white transition-colors ${
            isLoading || isGenerating || !dream.trim()
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
