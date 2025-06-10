const axios = require('axios');

/**
 * Get a response from the Language Model API
 * @param {string} message - User's message
 * @param {Array} history - Previous conversation history
 * @param {Object} bookingState - Current booking state
 * @returns {string} - LLM response
 */
async function getLLMResponse(message, history, bookingState) {
  try {
    const apiKey = process.env.LLM_API_KEY;
    const apiUrl = process.env.LLM_API_URL;
    
    if (!apiKey || !apiUrl) {
      throw new Error('LLM API configuration is missing');
    }
    
    // Format the conversation history for the API
    const formattedHistory = formatConversationHistory(history);
    
    // Create system prompt with booking state context if needed
    const systemPrompt = createSystemPrompt(bookingState);
    
    // Create the API request payload
    const payload = {
      "system_instruction": {
        "parts": [
          {"text": systemPrompt}
        ]
      },
      "contents": [
        ...formattedHistory,
        {
          "role": 'user',
          "parts": [
            {
              "text": message
            }
          ]
        }
      ],
      "generation_config": {
        "temperature": 0.7,
        "max_output_tokens": 200,
      },
    };
    
    // Make the API request
    const response = await axios.post(apiUrl + apiKey, payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    // Extract and return the response text
    if (response.data && 
        response.data.candidates && 
        response.data.candidates.length > 0 &&
        response.data.candidates[0].content.parts.length > 0 &&
        response.data.candidates[0].content.parts[0].text) {
      return response.data.candidates[0].content.parts[0].text.trim();
    }
    
    throw new Error('Invalid response format from LLM API');
  } catch (error) {
    console.error('Error getting LLM response:', error);
    
    // Return a fallback response for common scenarios
    if (error.response && error.response.status === 429) {
      return "I'm currently experiencing high demand. Please try again in a moment.";
    }
    
    // For testing without an API key, return mock responses
    if (process.env.NODE_ENV === 'development' && (!process.env.LLM_API_KEY || !process.env.LLM_API_URL)) {
      return getMockLLMResponse(message, bookingState);
    }
    
    return "Sorry, I'm having trouble connecting to my language processing service. Please try again.";
  }
}

/**
 * Format conversation history for the LLM API
 * @param {Array} history - Previous conversation history
 * @returns {Array} - Formatted history
 */
function formatConversationHistory(history) {
  const formattedHistory = [];
  
  // Limit history to last 5 exchanges to avoid token limits
  const limitedHistory = history.slice(-5);
  
  limitedHistory.forEach(exchange => {
    if (exchange.user) {
      formattedHistory.push({
        "role": "user",
        "parts": [
          {
            "text": exchange.user
          }
        ]
      });
    }
    if (exchange.bot) {
      formattedHistory.push({
        "role": "model",
        "parts": [
          {
            "text": exchange.bot
          }
        ]
      });
    }
  });
  
  return formattedHistory;
}

/**
 * Create system prompt for the LLM
 * @param {Object} bookingState - Current booking state
 * @returns {string} - System prompt
 */
function createSystemPrompt(bookingState) {
  let systemPrompt = `
You are an AI assistant for AIR PARADISE, a flight booking service. Your role is to help users search for flights and book them conversationally.

Database Schema:
- Table: flights
  - Columns: flight_id, year, month, day, day_of_week, airline, flight_number, origin_airport, destination_airport, scheduled_departure, scheduled_arrival, distance, air_time, generated_price
- Table: bookings
  - Columns: booking_id, flight_id, user_name, passport_number, booking_reference

Tasks:
1. For flight searches, generate SELECT SQL queries. Example:
   - User: "Flights from LAX to SEA on June 15, 2025"
   - SQL: SELECT * FROM flights WHERE origin_airport='LAX' AND destination_airport='SEA' AND year=2025 AND month=6 AND day=15;
2. Only generate SELECT queries for searches. Do not use INSERT, UPDATE, or DELETE.
3. For booking, guide the user to provide name, passport number, and payment details (simulated). Confirm with a fictional booking reference (e.g., 'ABC123').
4. Use conversation history to maintain context.
5. If unclear, ask for clarification (e.g., "Please specify departure date").
6. Be polite and concise.

Security:
- Only generate SELECT queries.
- Do not include raw user input in SQL.
- Simulate booking without storing sensitive data.

Examples:
- User: "Find flights from LAX to SEA on June 15"
  - Response: SELECT * FROM flights WHERE origin_airport='LAX' AND destination_airport='SEA' AND year=2025 AND month=6 AND day=15;
- User: "Book the 8 AM flight"
  - Response: Please provide your full name and passport number.
- User: "John Doe, 123456789"
  - Response: Thank you, John. Please enter your credit card number for simulation.
- User: "1234-5678-9012-3456"
  - Response: Booking confirmed! Your reference is ABC123.
  `;
  
  // Add booking state context if available
  if (bookingState && bookingState.stage !== 'initial') {
    systemPrompt += `\nCurrent booking state: ${bookingState.stage}`;
    
    if (bookingState.airline && bookingState.flightNumber) {
      systemPrompt += `\nThe user is booking flight ${bookingState.airline}${bookingState.flightNumber}.`;
    }
    
    if (bookingState.userName) {
      systemPrompt += `\nThe user's name is ${bookingState.userName}.`;
    }
    
    if (bookingState.stage === 'awaiting_payment') {
      systemPrompt += `\nAsk the user for their credit card information for simulation.`;
    }
  }
  
  return systemPrompt.trim();
}

/**
 * Get a mock LLM response for testing without an API key
 * @param {string} message - User's message
 * @param {Object} bookingState - Current booking state
 * @returns {string} - Mock response
 */
function getMockLLMResponse(message, bookingState) {
  const lowercaseMessage = message.toLowerCase();
  
  // Flight search mock responses
  if (lowercaseMessage.includes('flight') || 
      lowercaseMessage.includes('from') && lowercaseMessage.includes('to')) {
    
    // Extract airports if present
    let originAirport = 'LAX';
    let destinationAirport = 'SEA';
    
    // Try to parse airport codes from message
    const fromToMatch = lowercaseMessage.match(/from\s+([a-z]{3})\s+to\s+([a-z]{3})/i);
    if (fromToMatch) {
      originAirport = fromToMatch[1].toUpperCase();
      destinationAirport = fromToMatch[2].toUpperCase();
    }
    
    // Return SQL query for flight search
    return `SELECT * FROM flights WHERE origin_airport='${originAirport}' AND destination_airport='${destinationAirport}' AND year=2015 AND month=1 AND day=1;`;
  }
  
  // Booking flow mock responses
  if (lowercaseMessage.includes('book')) {
    return "Please provide your full name and passport number.";
  }
  
  if (bookingState.stage === 'awaiting_name') {
    return "Thank you. Please enter your credit card number for payment simulation.";
  }
  
  if (bookingState.stage === 'awaiting_payment') {
    return "Payment processed. Your booking is confirmed!";
  }
  
  // General responses
  if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
    return "Hello! I'm AIR PARADISE's virtual assistant. How can I help you today? I can help you search for flights or make a booking.";
  }
  
  if (lowercaseMessage.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with?";
  }
  
  // Default response
  return "I can help you search for flights or make a booking. For example, you could ask me to find flights from LAX to SEA on June 15, 2025.";
}

module.exports = {
  getLLMResponse
};
