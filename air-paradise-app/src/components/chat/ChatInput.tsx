"use client";

import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Spinner } from '../ui/spinner';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus the input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSendMessage = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      
      // Refocus the input after sending
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="chat-input-container">
      <input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        disabled={isLoading}
        aria-label="Chat message input"
        className="flex-1 bg-transparent outline-none text-base"
      />
      <button 
        onClick={handleSendMessage}
        disabled={!message.trim() || isLoading}
        className={`book-button p-2 rounded-full w-10 h-10 flex items-center justify-center ${!message.trim() || isLoading ? 'opacity-50' : ''}`}
        aria-label="Send message"
        style={{ backgroundColor: '#3b82f6' }}
      >
        {isLoading ? (
          <Spinner size="sm" />
        ) : (
          <span className="text-white text-lg" style={{ fontWeight: 'bold' }}>
            ➤
          </span>
        )}
      </button>
    </div>
  );
};

export default ChatInput;
