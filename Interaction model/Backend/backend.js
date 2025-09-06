// Load dependencies and environment
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Protect your API key using environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY is not set in the .env file.');
  process.exit(1);
}

const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
const systemPrompt = "You are a helpful assistant. You provide concise, friendly, and encouraging responses. Do not comment on the user's appearance or emotions, even if they mention it. Focus only on answering their questions or continuing the conversation.";

// Simple in-memory chat history storage (can use DB in production)
const sessions = {}; // { sessionId: [chatHistory] }

// Helper to get session ID from request, or create new
function getSessionId(req) {
  // In production, use cookies, JWT, or authentication
  return req.headers['x-session-id'] || 'default-session';
}

// Route for chat messages
app.post('/api/chat', async (req, res) => {
  try {
    const { chatHistory } = req.body;
    const sessionId = getSessionId(req);

    // Initialize history if new session
    if (!sessions[sessionId]) sessions[sessionId] = [];

    // Append new user message to session history
    if (chatHistory && Array.isArray(chatHistory) && chatHistory.length) {
      sessions[sessionId] = chatHistory;
    }

    const payload = {
      contents: sessions[sessionId],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    // Robust Gemini API handling
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    const aiResponse = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiResponse) {
      throw new Error('Gemini API returned no text.');
    }

    // Add assistant's reply to chat history
    sessions[sessionId].push({ role: 'model', parts: [{ text: aiResponse }] });

    res.json({
      text: aiResponse,
      history: sessions[sessionId] // Optional: return context for frontend
    });
  } catch (error) {
    console.error('Backend API error:', error);
    res.status(500).json({ error: 'Sorry, I am unable to connect to the assistant right now.' });
  }
});

// Health check & debug endpoint (Optional)
app.get('/api/history', (req, res) => {
  const sessionId = getSessionId(req);
  res.json({ chatHistory: sessions[sessionId] || [] });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});