/**
 * Validate SQL query to ensure it's safe to execute
 * @param {string} sqlQuery - SQL query to validate
 * @returns {Object} - Validation result with valid flag and sanitized query
 */
function validateSqlQuery(sqlQuery) {
  // Trim whitespace and normalize
  const normalizedQuery = sqlQuery.trim();
  
  // Must start with SELECT
  if (!normalizedQuery.toUpperCase().startsWith('SELECT')) {
    return {
      valid: false,
      reason: 'Query must start with SELECT',
      sanitizedQuery: null
    };
  }
  
  // Must reference flights table
  if (!normalizedQuery.toUpperCase().includes('FROM FLIGHTS')) {
    return {
      valid: false,
      reason: 'Query must reference the flights table',
      sanitizedQuery: null
    };
  }
  
  // Must not contain multiple statements (no semicolons except at the end)
  if (normalizedQuery.indexOf(';') !== -1 && normalizedQuery.indexOf(';') !== normalizedQuery.length - 1) {
    return {
      valid: false,
      reason: 'Multiple SQL statements are not allowed',
      sanitizedQuery: null
    };
  }
  
  // Check for valid columns
  const validColumns = [
    'flight_id', 'year', 'month', 'day', 'day_of_week', 'airline', 
    'flight_number', 'origin_airport', 'destination_airport', 
    'scheduled_departure', 'scheduled_arrival', 'distance', 
    'air_time', 'generated_price'
  ];
  
  // Must not contain dangerous keywords
  const dangerousKeywords = [
    'DROP', 'DELETE', 'UPDATE', 'INSERT', 'CREATE', 'ALTER', 
    'TRUNCATE', 'GRANT', 'EXECUTE', 'UNION'
  ];
  
  for (const keyword of dangerousKeywords) {
    if (normalizedQuery.toUpperCase().includes(keyword)) {
      return {
        valid: false,
        reason: `Query contains disallowed keyword: ${keyword}`,
        sanitizedQuery: null
      };
    }
  }
  
  // Sanitize the query (remove trailing semicolon if present)
  let sanitizedQuery = normalizedQuery;
  if (sanitizedQuery.endsWith(';')) {
    sanitizedQuery = sanitizedQuery.slice(0, -1);
  }
  
  return {
    valid: true,
    sanitizedQuery
  };
}

module.exports = {
  validateSqlQuery
};
