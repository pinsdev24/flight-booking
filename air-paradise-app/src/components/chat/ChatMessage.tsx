"use client";

import React from 'react';
import { cn } from '../../lib/utils';
import { ChatMessage as ChatMessageType } from '../../lib/types';

interface ChatMessageProps {
  message: ChatMessageType;
}

// Use React.memo to prevent unnecessary re-renders
const ChatMessage = React.memo(({ message }: ChatMessageProps) => {
  const messageClasses = {
    user: 'user-message',
    bot: 'bot-message',
    error: 'error-message',
    confirmation: 'confirmation-message',
  };
  
  // Special formatting for bot messages that might contain flight info
  const formatBotMessage = (content: string) => {
    if (message.type !== 'bot') return content;
    
    // Convert newlines to <br> tags first
    let formattedContent = content.replace(/\n/g, '<br>');
    
    // Bold flight numbers format: WN123, AA456, DL789, etc.
    formattedContent = formattedContent.replace(/([A-Z]{2}\d{3,4})/g, '<strong>$1</strong>');
    
    // Bold prices format: $123, $45.67
    const withPrices = formattedContent.replace(/\$(\d+(\.\d+)?)/g, '<strong>$$$1</strong>');
    
    return withPrices;
  };

  // Add avatar for bot messages
  const renderAvatar = () => {
    if (message.type !== 'bot') return null;
    
    return (
      <div className="avatar-container">
        <div className="avatar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12Z" fill="#3B82F6" opacity="0.2"/>
            <path d="M16.25 3.75L14.5 9L9.5 4L8.25 6L12.75 10.5H5.5L4 13H12.75L10.75 19.25L12 20L18.5 10.5H21.5L16.25 3.75Z" fill="#3B82F6"/>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="message-wrapper flex items-start mb-4">
      {message.type === 'bot' && renderAvatar()}
      <div 
        className={cn(
          'chat-message',
          messageClasses[message.type]
        )}
        role="listitem"
        dangerouslySetInnerHTML={{
          __html: message.type === 'bot' ? formatBotMessage(message.content) : message.content
        }}
      />
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
