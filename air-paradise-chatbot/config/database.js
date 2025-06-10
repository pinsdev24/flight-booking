const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'air_paradise',
  port: process.env.DB_PORT || 5432,
  max: 10, // Connection pool size
  idleTimeoutMillis: 30000 // Close idle clients after 30 seconds
});

// Log pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

module.exports = {
  pool,
  query: async (sql, params) => {
    const { rows } = await pool.query(sql, params || []);
    return rows;
  }
};
