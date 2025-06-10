const express = require('express');
const router = express.Router();
const { processChat } = require('../services/chatService');

/**
 * POST /api/chat
 * Process user messages and generate responses through the LLM
 * Request Body: { session_id, message, history }
 * Response: { response, flights }
 */
router.post('/chat', async (req, res, next) => {
  try {
    const { session_id, message, history } = req.body;
    
    // Input validation
    if (!session_id || !message) {
      return res.status(400).json({ error: 'session_id and message are required' });
    }
    
    // Process the chat message
    const result = await processChat(session_id, message, history || []);
    
    // Send the response
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
