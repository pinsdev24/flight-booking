/**
 * Generate a random booking reference
 * @returns {string} - 6-character booking reference
 */
function generateBookingReference() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let reference = '';
  
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    reference += characters.charAt(randomIndex);
  }
  
  return reference;
}

/**
 * Format date from year, month, day
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day (1-31)
 * @returns {string} - Formatted date (MM/DD/YYYY)
 */
function formatDate(year, month, day) {
  return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
}

/**
 * Format price with currency symbol
 * @param {number} price - Price value
 * @returns {string} - Formatted price
 */
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

/**
 * Format time from 24-hour format to 12-hour format
 * @param {string} time - Time in 24-hour format (e.g., '0800')
 * @returns {string} - Formatted time (e.g., '8:00 AM')
 */
function formatTime(time) {
  if (!time || time.length !== 4) {
    return 'Unknown';
  }
  
  const hours = parseInt(time.substring(0, 2));
  const minutes = time.substring(2);
  const period = hours >= 12 ? 'PM' : 'AM';
  const standardHours = hours % 12 || 12;
  
  return `${standardHours}:${minutes} ${period}`;
}

/**
 * Parse user message for flight details
 * @param {string} message - User message
 * @returns {Object} - Extracted details
 */
function parseFlightDetails(message) {
  const details = {};
  
  // Extract origin and destination airports
  const fromToRegex = /from\s+([A-Z]{3})\s+to\s+([A-Z]{3})/i;
  const fromToMatch = message.match(fromToRegex);
  
  if (fromToMatch) {
    details.originAirport = fromToMatch[1].toUpperCase();
    details.destinationAirport = fromToMatch[2].toUpperCase();
  }
  
  // Extract dates
  const dateRegex = /(?:on|for)\s+(\w+)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})?/i;
  const dateMatch = message.match(dateRegex);
  
  if (dateMatch) {
    const monthNames = {
      january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
      july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
      jan: 1, feb: 2, mar: 3, apr: 4, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12
    };
    
    const monthName = dateMatch[1].toLowerCase();
    details.month = monthNames[monthName] || null;
    details.day = parseInt(dateMatch[2]);
    details.year = dateMatch[3] ? parseInt(dateMatch[3]) : new Date().getFullYear();
  }
  
  return details;
}

module.exports = {
  generateBookingReference,
  formatDate,
  formatPrice,
  formatTime,
  parseFlightDetails
};
