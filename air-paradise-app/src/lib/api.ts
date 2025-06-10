import axios from 'axios';
import { ChatRequest, ChatResponse } from './types';

// Get the API URL from environment variables with a fallback
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatApi = {
  /**
   * Send a message to the chat API
   * @param request ChatRequest object containing session_id, message, and history
   * @returns Promise with ChatResponse containing response text and flights array
   */
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    try {
      const response = await apiClient.post<ChatResponse>('/api/chat', request);
      return response.data;
    } catch (error) {
      console.error('Error sending message to API:', error);
      throw error;
    }
  },
};
