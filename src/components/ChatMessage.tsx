import { Message, Theme } from '../types';
import { User, Cat } from 'lucide-react';

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
        <div className="relative w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
          <Cat className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-[10px] font-bold text-gray-800">仙</span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1 max-w-[80%]">
        <div className="flex items-center gap-2">
          {message.timestamp && (
            <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {formattedTime}
            </span>
          )}
          {message.role === 'system' && (
            <span className="px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              系统
            </span>
          )}
        </div>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isUser 
              ? 'bg-purple-600 text-white' 
              : theme === 'dark'
                ? 'bg-gray-800 text-gray-100'
                : 'bg-gradient-to-r from-purple-50 to-purple-100 text-gray-800 dark:from-gray-800 dark:to-gray-700 dark:text-gray-100'
          }`}
        >
          {message.content.split('\n').map((line, i) => (
            <p key={i} className={line.startsWith('-') ? 'pl-4' : ''}>
              {line}
            </p>
          ))}
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
