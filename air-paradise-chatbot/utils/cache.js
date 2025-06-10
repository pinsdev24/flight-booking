/**
 * Simple in-memory cache for database queries
 * This improves performance by caching frequent flight queries
 */
class Cache {
  constructor(maxSize = 100, ttl = 1800000) { // Default TTL: 30 minutes
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }
  
  /**
   * Get a value from cache
   * @param {string} key - Cache key
   * @returns {*} - Cached value or undefined if not found
   */
  get(key) {
    if (!this.cache.has(key)) {
      return undefined;
    }
    
    const item = this.cache.get(key);
    
    // Check if the item has expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return undefined;
    }
    
    return item.value;
  }
  
  /**
   * Set a value in cache
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} ttl - Time to live in milliseconds (optional)
   */
  set(key, value, ttl = this.ttl) {
    // Evict oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl
    });
  }
  
  /**
   * Remove a value from cache
   * @param {string} key - Cache key
   */
  delete(key) {
    this.cache.delete(key);
  }
  
  /**
   * Clear entire cache
   */
  clear() {
    this.cache.clear();
  }
  
  /**
   * Get cache size
   * @returns {number} - Number of entries in cache
   */
  size() {
    return this.cache.size;
  }
}

// Export a singleton instance
module.exports = new Cache();
