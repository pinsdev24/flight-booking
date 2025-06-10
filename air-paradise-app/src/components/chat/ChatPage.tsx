"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Header from '../chat/Header';
import ChatWindow from '../chat/ChatWindow';
import ChatInput from '../chat/ChatInput';
import { chatApi } from '../../lib/api';
import { ChatMessage, ChatHistory, Flight } from '../../lib/types';
import { limitHistory } from '../../lib/utils';

// Welcome message displayed on initial load
const WELCOME_MESSAGE = "Welcome to AIR PARADISE Chatbot! How can I help you today? You can ask me about flights, booking information, or travel tips.";

const ChatPage: React.FC = () => {
  // State management
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize session and welcome message
  useEffect(() => {
    // Generate or retrieve session ID
    const storedSessionId = localStorage.getItem('airParadiseSessionId');
    const newSessionId = storedSessionId || Date.now().toString();
    
    if (!storedSessionId) {
      localStorage.setItem('airParadiseSessionId', newSessionId);
    }
    
    setSessionId(newSessionId);
    
    // Add welcome message
    setMessages([{
      type: 'bot',
      content: WELCOME_MESSAGE,
      timestamp: Date.now()
    }]);
  }, []);

  /**
   * Send a message to the chatbot API
   */
  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || !sessionId) return;
    
    // Optimistically add user message
    const userMessage: ChatMessage = {
      type: 'user',
      content: messageText,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Prepare the request payload
      const request = {
        session_id: sessionId,
        message: messageText,
        history: limitHistory(chatHistory, 5) // Limit to 5 exchanges to reduce payload size
      };
      
      // Send to the API
      const response = await chatApi.sendMessage(request);
      
      // Add bot response and update flights
      const botMessage: ChatMessage = {
        type: 'bot',
        content: response.response,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // If the response contains flights, update the flights state
      if (response.flights && response.flights.length > 0) {
        setFlights(response.flights);
      } else if (response.flights && response.flights.length === 0 && flights.length > 0) {
        // Clear flights when we get an empty array (user is moving to booking flow)
        setFlights([]);
      }
      
      // Update chat history
      setChatHistory(prev => [...prev, {
        user: messageText,
        bot: response.response
      }]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        type: 'error',
        content: 'Sorry, there was an error communicating with the server. Please try again.',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, chatHistory, flights]);

  /**
   * Handle booking a flight
   */
  const handleBookFlight = useCallback((flightNumber: string) => {
    const bookMessage = `Book ${flightNumber}`;
    sendMessage(bookMessage);
  }, [sendMessage]);
  
  /**
   * Reset the chat and start a new session
   */
  const resetChat = useCallback(() => {
    // Generate a new session ID
    const newSessionId = Date.now().toString();
    localStorage.setItem('airParadiseSessionId', newSessionId);
    setSessionId(newSessionId);
    
    // Clear chat history
    setChatHistory([]);
    
    // Clear flights
    setFlights([]);
    
    // Reset messages to just the welcome message
    setMessages([{
      type: 'bot',
      content: WELCOME_MESSAGE,
      timestamp: Date.now()
    }]);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onResetChat={resetChat} />
      
      <main className="flex-1 pt-16 pb-36 sm:pb-28 w-full">
        <ChatWindow 
          messages={messages}
          flights={flights}
          onBookFlight={handleBookFlight}
        />
        
        <ChatInput 
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default ChatPage;
