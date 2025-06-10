"use client";

import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import ChatMessage from './ChatMessage';
import FlightCard from './FlightCard';
import { ChatMessage as ChatMessageType, Flight } from '../../lib/types';

interface ChatWindowProps {
  messages: ChatMessageType[];
  flights: Flight[];
  onBookFlight: (flightNumber: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, flights, onBookFlight }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the most recent message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, flights]);
  
  return (
    <div className="relative flex-1 overflow-hidden">
      <ScrollArea 
        className="h-[calc(100vh-132px)] w-full py-6 px-4 sm:px-6" 
        aria-label="Chat messages" 
        role="log" 
        aria-live="polite"
      >
        <div className="max-w-screen-md mx-auto pb-20"> {/* Add padding to bottom for fixed input */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl max-w-md w-full">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600 dark:text-blue-400">
                    <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511C7.33787 18.8508 7.13446 18.7507 7.03517 18.7325C6.92345 18.7117 6.7883 18.7223 6.68369 18.7696C6.59161 18.8103 6.51923 18.9263 6.37447 19.1582L3.51472 23C3.00969 22.8392 2.67544 22.5456 2.5 22.236C2.32456 21.9264 2.31056 21.5353 2.5 21L3.59 19.429C4.4789 18.1779 4.92335 17.5524 5 17C5.06517 16.5303 4.98765 16.0638 4.85946 15.4374C4.7 14.6692 4.7 13.8382 4.7 12.1762V12C4.7 7.58172 8.72944 4 13.7 4C18.6706 4 22.7 7.58172 22.7 12C22.7 16.4183 18.9706 20 14 20M8.5 12C8.5 12.2761 8.27614 12.5 8 12.5C7.72386 12.5 7.5 12.2761 7.5 12C7.5 11.7239 7.72386 11.5 8 11.5C8.27614 11.5 8.5 11.7239 8.5 12ZM12.5 12C12.5 12.2761 12.2761 12.5 12 12.5C11.7239 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.7239 11.5 12 11.5C12.2761 11.5 12.5 11.7239 12.5 12ZM16.5 12C16.5 12.2761 16.2761 12.5 16 12.5C15.7239 12.5 15.5 12.2761 15.5 12C15.5 11.7239 15.7239 11.5 16 11.5C16.2761 11.5 16.5 11.7239 16.5 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300">Welcome to AIR PARADISE Chatbot</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-3">Ask about flights, bookings, or travel information</p>
                
                <div className="mt-6 space-y-3">
                  {["Show me flights from Paris to New York", "Help me book a flight", "When is the best time to visit Bali?"].map((suggestion, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-3 text-left text-sm shadow-sm transition-all hover:shadow-md cursor-pointer border border-gray-100 dark:border-gray-700">
                      {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {messages.length > 0 && (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <ChatMessage key={`msg-${index}`} message={message} />
              ))}
            </div>
          )}
          
          {flights.length > 0 && (
            <div className="mt-8 mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600 dark:text-blue-300">
                    <path d="M21 5H3C1.89543 5 1 5.89543 1 7V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V7C23 5.89543 22.1046 5 21 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300">
                  {flights.length} {flights.length === 1 ? 'Flight' : 'Flights'} Available
                </h3>
              </div>
              
              <div className="space-y-4 overflow-x-auto">
                {flights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onBook={onBookFlight}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-10" /> {/* Extra space at the bottom for better scroll experience */}
        </div>
      </ScrollArea>
      
      {/* Chat message progress indicator (optional) */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default ChatWindow;
