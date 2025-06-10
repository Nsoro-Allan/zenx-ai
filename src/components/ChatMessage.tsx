
import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}
           style={{ 
             backgroundColor: isUser ? '#161618' : '#161618',
             border: '1px solid #333'
           }}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div className={`max-w-[80%] ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block px-6 py-4 rounded-2xl`}
             style={{
               backgroundColor: '#161618',
               border: '1px solid #333',
               color: 'white'
             }}>
          <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className="text-xs text-gray-500 mt-2 px-2">
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
