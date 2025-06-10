-- Database creation would be separate, typically done with:
-- CREATE DATABASE air_paradise;

-- Flights table
CREATE TABLE IF NOT EXISTS flights (
  id SERIAL PRIMARY KEY,
  year INT NOT NULL,
  month INT NOT NULL,
  day INT NOT NULL,
  day_of_week INT NOT NULL,
  airline VARCHAR(2) NOT NULL,
  flight_number VARCHAR(10) NOT NULL,
  origin_airport VARCHAR(3) NOT NULL,
  destination_airport VARCHAR(3) NOT NULL,
  scheduled_departure VARCHAR(4) NOT NULL,
  scheduled_arrival VARCHAR(4) NOT NULL,
  scheduled_time INT NOT NULL,
  distance INT NOT NULL,
  air_time INT NOT NULL,
  predicted_price DECIMAL(10, 2) NOT NULL
);

-- Create indexes for flights table
CREATE INDEX idx_flight_route ON flights (origin_airport, destination_airport);
CREATE INDEX idx_flight_date ON flights (year, month, day);
CREATE INDEX idx_flight_airline ON flights (airline);
CREATE INDEX idx_flight_number ON flights (flight_number);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  flight_id INT NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  passport_number VARCHAR(20) NOT NULL,
  booking_reference VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Foreign key constraint
  FOREIGN KEY (flight_id) REFERENCES flights(id)
);

-- Create index for bookings table
CREATE INDEX idx_booking_reference ON bookings (booking_reference);