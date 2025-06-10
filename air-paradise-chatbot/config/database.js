const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URI
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
