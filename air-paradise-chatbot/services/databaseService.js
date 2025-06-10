const { query } = require('../config/database');
const cache = require('../utils/cache');

/**
 * Execute a SQL query with parameters
 * @param {string} sql - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<Array>} - Query results
 */
async function executeQuery(sql, params = []) {
  try {
    // Try to get from cache first for SELECT queries
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
      const cacheKey = getCacheKey(sql, params);
      const cachedResult = cache.get(cacheKey);
      
      if (cachedResult) {
        console.log('Cache hit for query:', sql);
        return cachedResult;
      }
      
      // Execute the query
      const results = await query(sql, params);
      
      // Store in cache for future use
      cache.set(cacheKey, results);
      
      return results;
    }
    
    // For non-SELECT queries, just execute
    return await query(sql, params);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Generate a cache key for a SQL query
 * @param {string} sql - SQL query string
 * @param {Array} params - Query parameters
 * @returns {string} - Cache key
 */
function getCacheKey(sql, params) {
  return `${sql}-${JSON.stringify(params)}`;
}

/**
 * Get a single flight by ID
 * @param {number} flightId - Flight ID
 * @returns {Promise<Object>} - Flight data
 */
async function getFlightById(flightId) {
  const sql = 'SELECT * FROM flights WHERE id = ?';
  const results = await executeQuery(sql, [flightId]);
  return results.length > 0 ? results[0] : null;
}

/**
 * Create a new booking
 * @param {Object} bookingData - Booking data
 * @returns {Promise<Object>} - Created booking
 */
async function createBooking(bookingData) {
  const { flight_id, user_name, passport_number, booking_reference } = bookingData;
  
  const sql = `
    INSERT INTO bookings (flight_id, user_name, passport_number, booking_reference)
    VALUES (?, ?, ?, ?)
  `;
  
  await executeQuery(sql, [flight_id, user_name, passport_number, booking_reference]);
  
  return { 
    flight_id,
    user_name,
    passport_number,
    booking_reference
  };
}

module.exports = {
  executeQuery,
  getFlightById,
  createBooking
};
