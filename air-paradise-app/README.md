# AIR PARADISE Chatbot Frontend

A Next.js application for the AIR PARADISE flight booking chatbot. This frontend allows users to search for flights and book them via a conversational chat interface.

## Features

- Conversational chat interface for flight searches and bookings
- Real-time flight search results displayed as cards
- Complete booking flow through natural language
- Session persistence
- Responsive design
- Accessibility features

## Technologies Used

- Next.js (App Router)
- Tailwind CSS for styling
- Shadcn/UI for components
- Axios for API requests
- TypeScript for type safety

## Prerequisites

- Node.js 16.8 or later
- npm (Node Package Manager)
- AIR PARADISE backend running on http://localhost:3000

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3001](http://localhost:3001) with your browser to see the application

## Usage

1. The chatbot will greet you with a welcome message
2. Ask about flights with natural language, for example:
   - "Show me flights from LAX to SEA on June 15, 2025"
   - "I need to fly from New York to Chicago next week"
3. When flights are returned, click the "Book" button on a flight card
4. Follow the conversation prompts to complete your booking

## API Integration

The frontend communicates with the AIR PARADISE backend API via the following endpoint:

- POST `/chat` - Send and receive chat messages, flight data, and booking information
