# AIR PARADISE: Flight Booking Chatbot Application

AIR PARADISE is a comprehensive flight booking application that uses a conversational AI chatbot to help users search for flights and make bookings through natural language interaction. This project consists of a React.js frontend and a Node.js/Express backend, connected to a MySQL database.

## Application Architecture

The application follows a modern client-server architecture:

![Flow Diagram](/assets/flow-diagram.svg)

### Key Components

1. **Frontend (React.js)**
   - Interactive chat interface for natural language interactions
   - Flight search results display
   - Booking flow implementation
   - Responsive design for multiple devices

2. **Backend (Node.js/Express)**
   - RESTful API endpoints for chat processing
   - Language Model integration
   - MySQL database interactions
   - Secure booking processing

3. **Database (MySQL)**
   - Flights table with comprehensive flight information
   - Bookings table for customer reservations
   - Relational structure for data integrity

4. **Language Model Integration**
   - Gemini API for natural language understanding
   - Query generation for flight searches
   - Conversational responses for user interactions

## How It Works

The application follows this sequence when processing user interactions:

![Sequence Diagram](/assets/sequence-diagram.svg)

1. **User Interaction**:
   - User enters a natural language query (e.g., "Find flights from LAX to SEA on June 15")
   - The frontend sends this message to the backend API

2. **LLM Processing**:
   - The backend forwards the query to the Gemini API
   - The LLM interprets the request and generates either:
     - An SQL query for flight searches
     - A conversational response for other interactions

3. **Database Interaction**:
   - If the LLM returns an SQL query, it's validated and executed against the database
   - Flight results are retrieved and formatted for display

4. **Booking Flow**:
   - For booking requests, the backend manages a multi-step conversation
   - User provides name, passport, and payment details
   - System generates a booking reference and stores reservation

## Technical Details

### Backend Architecture
- **API Endpoints**: RESTful endpoints for chat processing
- **Security**: SQL validation, input sanitization, parameterized queries
- **Performance**: Connection pooling, in-memory cache for frequent queries
- **Error Handling**: Comprehensive error tracking and user-friendly responses

### Frontend Features
- **State Management**: Manages chat history and booking state
- **UI Components**: Chat interface, flight results display, booking forms
- **API Integration**: Asynchronous API calls with proper error handling

### Database Schema
- **Flights Table**: Comprehensive flight details including schedules and pricing
- **Bookings Table**: Customer reservations with references to flights

## Getting Started

### Prerequisites
- Node.js (v14+)
- MySQL (v8+)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies for both frontend and backend
3. Configure environment variables
4. Set up the database using the provided schema
5. Start both servers

## Deployment Options
- **Backend**: Render, Railway, Fly.io
- **Database**: PlanetScale, Supabase, Neon
- **Frontend**: Netlify, Vercel