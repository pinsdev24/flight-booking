export interface Flight {
  id: number;
  airline: string;
  flight_number: string;
  origin_airport: string;
  destination_airport: string;
  scheduled_departure: string;
  scheduled_arrival: string;
  predicted_price: number;
  air_time: number;
  distance: number;
  year: number;
  month: number;
  day: number;
  day_of_week: number;
}

export interface ChatMessage {
  type: 'user' | 'bot' | 'error' | 'confirmation';
  content: string;
}

export interface ChatHistory {
  user: string;
  bot: string;
}

export interface ChatRequest {
  session_id: string;
  message: string;
  history: ChatHistory[];
}

export interface ChatResponse {
  response: string;
  flights: Flight[];
}
