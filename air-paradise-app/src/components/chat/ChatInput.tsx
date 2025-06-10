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
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 z-20">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50 transition-all">
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            disabled={isLoading}
            aria-label="Chat message input"
            className="flex-1 bg-transparent outline-none text-base py-2 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          
          {/* Suggested prompts could be added here */}
          
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            className={`p-2 rounded-full w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-colors ${!message.trim() || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Send message"
          >
            {isLoading ? (
              <Spinner size="sm" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
        <div className="h-1"></div> {/* Extra space for iOS devices with home indicator */}
      </div>
    </div>
  );
};

export default ChatInput;
