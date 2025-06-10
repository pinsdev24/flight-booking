"use client";

import React from 'react';
import { Flight } from '../../lib/types';
import { formatDateTime } from '../../lib/utils';

interface FlightCardProps {
  flight: Flight;
  onBook: (flightNumber: string) => void;
}

const FlightCard = React.memo(({ flight, onBook }: FlightCardProps) => {
  const handleBookClick = () => {
    onBook(flight.airline + flight.flight_number);
  };

  return (
    <div className="flight-card">
      <div className="flight-card-header">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">
            {flight.flight_number}: {flight.origin_airport} to {flight.destination_airport}
          </h3>
          <div className="rounded-full bg-white text-blue-600 px-3 py-1 text-sm font-bold">
            {flight.airline}
          </div>
        </div>
      </div>
      
      <div className="flight-card-content">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <div className="flex items-center space-x-10">
              <div className="text-center">
                <div className="text-xl font-bold">{formatDateTime(flight.scheduled_departure)}</div>
                <div className="text-sm text-secondary-dark">{flight.origin_airport}</div>
              </div>
              <div className="flex-1 px-4 relative">
                <div className="h-0.5 bg-gray-300 w-full absolute top-3"></div>
                <div className="absolute -top-0.5 left-0 w-2 h-2 rounded-full bg-primary"></div>
                <div className="absolute -top-0.5 right-0 w-2 h-2 rounded-full bg-primary"></div>
                <div className="text-xs text-center mt-2">{flight.air_time} min</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{formatDateTime(flight.scheduled_arrival)}</div>
                <div className="text-sm text-secondary-dark">{flight.destination_airport}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flight-details-grid">
          <div className="flight-detail-item">
            <span className="flight-detail-label">Distance</span>
            <span className="flight-detail-value">{flight.distance} miles</span>
          </div>
          <div className="flight-detail-item">
            <span className="flight-detail-label">Date</span>
            <span className="flight-detail-value">{flight.month}/{flight.day}/{flight.year}</span>
          </div>
          <div className="flight-detail-item">
            <span className="flight-detail-label">Day</span>
            <span className="flight-detail-value">
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][flight.day_of_week % 7]}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flight-card-footer">
        <div className="flight-price">${flight.predicted_price}</div>
        <button 
          className="book-button"
          onClick={handleBookClick}
          aria-label={`Book flight ${flight.flight_number}`}
        >
          Book This Flight
        </button>
      </div>
    </div>
  );
});

FlightCard.displayName = 'FlightCard';

export default FlightCard;
