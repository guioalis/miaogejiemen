import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Cat } from 'lucide-react';
import { Message, ApiResponse, Theme } from '../types';
import { ChatMessage } from './ChatMessage';
import { DreamInput } from './DreamInput';
import { LoadingSpinner } from './LoadingSpinner';
import { ConfirmDialog } from './ConfirmDialog';
import { toast } from './Toast';

interface ChatProps {
  theme: Theme;
}

const SYSTEM_PROMPT = `喵哥解梦风水系统 V6.0 - 终极整合版

本喵乃修行千年的"玄猫真人"，精通解梦、风水、命理的全能大师。集周公解梦、河洛风水、紫微斗数等诸多玄学体系于一身，人称喵哥。性格温和睿智，专业中带着烟火气。

解答模板：
"呼噜噜...本喵来为你解析喵~

能量场感知：[具体环境/梦境]显示[能量特征]喵~
八卦分析：从[具体卦象]来看，表示[详细解释]喵~
风水格局：目前格局[具体分析]，建议[详细建议]喵~

调整方案：
- 空间调整：[具体方法]
- 物品摆放：[具体建议]
- 能量调和：[具体操作]
- 化解方案：[具体建议]
- 开运布局：[具体方案]"`;

export const Chat = ({ theme }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem('dreamMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const systemMessage: Message = {
        id: 'system-0',
        type: 'assistant',
        content: SYSTEM_PROMPT,
        role: 'system',
        timestamp: new Date().toISOString(),
      };
      setMessages([systemMessage]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dreamMessages', JSON.stringify(messages));
  }, [messages]);

  const clearHistory = () => {
    const systemMessage: Message = {
      id: 'system-' + Date.now(),
      type: 'assistant',
      content: SYSTEM_PROMPT,
      role: 'system',
      timestamp: new Date().toISOString(),
    };
    setMessages([systemMessage]);
    setShowClearConfirm(false);
    toast.success('历史记录已清除');
  };

  const interpretDream = async (dream: string) => {
    setIsLoading(true);
    setError(null);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: dream,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const conversationHistory = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role || m.type,
          content: m.content
        }));

      const response = await axios.post<ApiResponse>(
        'https://api.deepseek.com/chat/completions',
        {
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT
            },
            ...conversationHistory,
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
        role: 'assistant',
        content: interpretation,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('抱歉，解梦失败了。请稍后再试。');
      toast.error('解梦失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const displayMessages = messages.filter(m => m.role !== 'system');

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col min-h-[calc(100vh-64px)]">
      <div className="text-center py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <Cat className="w-16 h-16 text-purple-600 dark:text-purple-400" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-gray-800">仙</span>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">喵哥解梦</h1>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">玄猫真人·风水大师</p>
          </div>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          探索梦境玄机，掌握风水密码
        </p>
        
        {displayMessages.length > 0 && (
          <div className="absolute right-4 top-24">
            <button
              onClick={() => setShowClearConfirm(true)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Clear history"
            >
              <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {displayMessages.map(message => (
          <ChatMessage key={message.id} message={message} theme={theme} />
        ))}
        {isLoading && <LoadingSpinner />}
        {error && (
          <div className="text-red-500 text-center p-2 bg-red-50 dark:bg-red-900/50 rounded-lg">
            {error}
          </div>
        )}
      </div>

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
