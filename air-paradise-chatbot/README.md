# AIR PARADISE Chatbot Backend

A Node.js/Express server for a flight booking chatbot that uses an LLM API to interpret user messages and generate SQL queries or conversational responses.

## Tech Stack

- Node.js with Express for the server
- MySQL for the database
- Communication with an LLM API (OpenAI/Gemini compatible)
- React frontend communication via REST API

## Features

- Flight search using natural language
- Conversational booking flow
- Database caching for performance
- Security measures for SQL queries

## Project Structure

```
air-paradise-chatbot/
│
├── config/
│   └── database.js           # MySQL connection configuration
│
├── routes/
│   └── chat.js               # API endpoints
│
├── services/
│   ├── chatService.js        # Main chat processing logic
│   ├── databaseService.js    # Database operations
│   └── llmService.js         # Language model API integration
│
├── utils/
│   ├── cache.js              # In-memory cache for database queries
│   ├── helpers.js            # Helper functions
│   └── sqlValidator.js       # SQL query validation
│
├── database/
│   └── schema.sql            # Database schema and sample data
│
├── .env.example              # Environment variables template
├── app.js                    # Express server entry point
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MySQL (v8+)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd air-paradise-chatbot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Set up your environment variables in the `.env` file:
   - Database credentials
   - LLM API key and endpoint
   - Server port

5. Create the database and tables:
   ```
   mysql -u root -p < database/schema.sql
   ```
   Or you can run schema.sql in MySQL Workbench or phpMyAdmin directly.

6. Import flight data:
   ```
   mysql -u root -p < database/flights_data.sql
   ```
   Note: The flights_data.sql file contains a large dataset of flight information. Importing may take some time depending on your system.

### Manual Import with phpMyAdmin

1. **Create Database**:
   - Open phpMyAdmin in your web browser (usually at http://localhost/phpmyadmin)
   - Click on the "Databases" tab
   - Enter "air_paradise" in the "Database name" field
   - Click "Create"

2. **Import Schema**:
   - Select the "air_paradise" database from the left sidebar
   - Click on the "Import" tab
   - Click "Browse" and select the `database/schema.sql` file
   - Scroll down and click "Go" to execute the import

3. **Import Flight Data**:
   - With the "air_paradise" database still selected
   - Click on the "Import" tab again
   - Click "Browse" and select the `database/flights_data.sql` file
   - Scroll down and click "Go" to execute the import
   - Note: For large files, you may need to adjust the import settings:
     - Set "Maximum size" to a higher value (e.g., 50MB)
     - Check the "Enable foreign key checks" option

### Manual Import with MySQL Workbench

1. **Create Database**:
   - Open MySQL Workbench and connect to your MySQL server
   - Click on the "Create a new schema" icon in the Navigator panel
   - Enter "air_paradise" as the schema name
   - Click "Apply" and then "Finish"

2. **Import Schema**:
   - Select "File" > "Open SQL Script"
   - Navigate to and select the `database/schema.sql` file
   - Click the lightning bolt icon to execute the script

3. **Import Flight Data**:
   - Select "File" > "Open SQL Script" again
   - Navigate to and select the `database/flights_data.sql` file
   - Click the lightning bolt icon to execute the script
   - Note: For large files, you may need to:
     - Go to Edit > Preferences > SQL Editor
     - Increase the "DBMS connection read timeout interval" value
     - Check "Continue on Error" if you want import to proceed despite any errors

### Running the Server

Start the development server:
```
npm run dev
```

For production:
```
npm start
```

## API Endpoints

### POST /api/chat
Receives user messages and returns chatbot responses.

Request body:
```json
{
  "session_id": "unique-session-id",
  "message": "Find flights from LAX to SEA on June 15, 2025",
  "history": []
}
```

Response:
```json
{
  "response": "Found 3 flights: WN123 at 8:00 AM for $149.99, DL456 at 10:00 AM for $199.99, AA789 at 12:00 PM for $179.99",
  "flights": [
    {
      "flight_id": 1,
      "airline": "WN",
      "flight_number": "WN123",
      "scheduled_departure": "0800",
      "scheduled_arrival": "1030",
      "origin_airport": "LAX",
      "destination_airport": "SEA",
      "generated_price": 149.99,
      "year": 2025,
      "month": 6,
      "day": 15
    },
    // ...more flights
  ]
}
```

## Security Considerations

- SQL injection prevention through query validation
- Parameterized queries
- Input sanitization
- No storage of sensitive data beyond session

## Testing

For testing without an LLM API key, the system will use mock responses in development mode.

## License

ISC
