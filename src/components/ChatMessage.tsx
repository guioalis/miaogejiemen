import { Message, Theme } from '../types';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  theme: Theme;
}

export const ChatMessage = ({ message, theme }: ChatMessageProps) => {
  const isUser = message.type === 'user';
  const formattedTime = message.timestamp 
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} group`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
          <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
      )}
      <div className="flex flex-col gap-1">
        {message.timestamp && (
          <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
            {formattedTime}
          </span>
        )}
        <div
          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
            isUser 
              ? 'bg-purple-600 text-white' 
              : theme === 'dark'
                ? 'bg-gray-800 text-gray-100'
                : 'bg-gray-100 text-gray-800'
          }`}
        >
          {message.content}
        </div>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};
