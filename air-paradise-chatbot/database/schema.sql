-- Database creation
CREATE DATABASE IF NOT EXISTS air_paradise;
USE air_paradise;

-- Flights table
CREATE TABLE IF NOT EXISTS flights (
  id INT PRIMARY KEY AUTO_INCREMENT,
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
  distance INT NOT NULL,
  air_time INT NOT NULL,
  generated_price DECIMAL(10, 2) NOT NULL,
  
  -- Indexes for improved search performance
  INDEX idx_flight_route (origin_airport, destination_airport),
  INDEX idx_flight_date (year, month, day),
  INDEX idx_flight_airline (airline),
  INDEX idx_flight_number (flight_number)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  flight_id INT NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  passport_number VARCHAR(20) NOT NULL,
  booking_reference VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Foreign key constraint
  FOREIGN KEY (flight_id) REFERENCES flights(id),
  -- Index for looking up booking reference
  INDEX idx_booking_reference (booking_reference)
);