import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { Message, ApiResponse, Theme } from '../types';
import { ChatMessage } from './ChatMessage';
import { DreamInput } from './DreamInput';
import { LoadingSpinner } from './LoadingSpinner';
import { ConfirmDialog } from './ConfirmDialog';

interface ChatProps {
  theme: Theme;
}

export const Chat = ({ theme }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Load messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem('dreamMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dreamMessages', JSON.stringify(messages));
  }, [messages]);

  const clearHistory = () => {
    setMessages([]);
    setShowClearConfirm(false);
  };

  const interpretDream = async (dream: string) => {
    setIsLoading(true);
    setError(null);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: dream,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await axios.post<ApiResponse>(
        'https://api.deepseek.com/chat/completions',
        {
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "你是一位专业的解梦大师，擅长分析梦境并给出富有洞察力的解释。请以温和、专业的语气解释用户描述的梦境。"
            },
            {
              role: "user",
              content: dream
            }
          ],
          stream: false
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk-276795b35b3449ea81b8f76814b62491'
          }
        }
      );

      const interpretation = response.data.choices[0].message.content;
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: interpretation,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('抱歉，解梦失败了。请稍后再试。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col min-h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="text-center py-6 relative">
        {messages.length > 0 && (
          <div className="absolute right-0 top-6">
            <button
              onClick={() => setShowClearConfirm(true)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Clear history"
            >
              <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        )}
        <p className="text-gray-600 dark:text-gray-300">描述你的梦境，让我来为你解析</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} theme={theme} />
        ))}
        {isLoading && <LoadingSpinner />}
        {error && (
          <div className="text-red-500 text-center p-2 bg-red-50 dark:bg-red-900/50 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <div className={`sticky bottom-0 pt-4 ${
        theme === 'dark' 
          ? 'bg-gray-900/80' 
          : 'bg-white/80'
      } backdrop-blur-sm`}>
        <DreamInput onSubmit={interpretDream} isLoading={isLoading} theme={theme} />
      </div>

      <ConfirmDialog 
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={clearHistory}
        title="清除历史记录"
        message="确定要清除所有对话历史吗？此操作不可撤销。"
        theme={theme}
      />
    </div>
  );
};
