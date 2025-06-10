"use client";

import React from 'react';
import { cn } from '../../lib/utils';
import { ChatMessage as ChatMessageType } from '../../lib/types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const BotAvatar: React.FC = () => (
  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-md">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12Z" fill="currentColor" opacity="0.3"/>
      <path d="M16.25 3.75L14.5 9L9.5 4L8.25 6L12.75 10.5H5.5L4 13H12.75L10.75 19.25L12 20L18.5 10.5H21.5L16.25 3.75Z" fill="currentColor"/>
    </svg>
  </div>
);

const UserAvatar: React.FC = () => (
  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center ml-3 shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-300">
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
  </div>
);

const ChatMessage = React.memo(({ message }: ChatMessageProps) => {
  const isUser = message.type === 'user';
  const isBot = message.type === 'bot';
  const isError = message.type === 'error';

  const formatMessageContent = (content: string) => {
    let formatted = content.replace(/\n/g, '<br />');
    if (isBot) {
      // Bold flight numbers (e.g., WN123, AA456)
      formatted = formatted.replace(/([A-Z]{2}\d{3,4})/g, '<strong>$1</strong>');
      // Bold prices (e.g., $123, $45.67)
      formatted = formatted.replace(/\$(\d+(\.\d{1,2})?)/g, '<strong>$$$1</strong>');
    }
    return formatted;
  };

  const timestamp = message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex items-end max-w-[85%] sm:max-w-[75%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        {isBot && <BotAvatar />}
        {isUser && <UserAvatar />} {/* Moved here to appear on the right for user messages */}
        
        <div className={cn(
          "px-4 py-3 rounded-2xl shadow-md text-sm sm:text-base leading-relaxed break-words",
          isUser && "bg-blue-600 text-white rounded-br-none",
          isBot && "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none",
          isError && "bg-red-100 dark:bg-red-800/50 text-red-700 dark:text-red-200 border border-red-300 dark:border-red-600 rounded-lg"
        )}>
          <div dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }} />
          {timestamp && (
            <div className={cn(
              "text-xs mt-1.5",
              isUser ? "text-blue-200 text-right" : "text-gray-400 dark:text-gray-500 text-left"
            )}>
              {timestamp}
            </div>
          )}
        </div>
        {/* UserAvatar removed from here */}
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
