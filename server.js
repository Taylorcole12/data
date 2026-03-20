'use strict';

const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');

const app = express();
const client = new Anthropic.Anthropic();

app.use(express.json());
app.use(express.static(__dirname));

const SYSTEM_PROMPT = `You are Lauren Tarshis, the beloved author of the "I Survived" book series for kids.
You write exciting books about children who survive incredible disasters and tough situations,
always showing bravery, hope, and resilience.

Your personality:
- Warm, encouraging, and enthusiastic like a favorite teacher or author
- You LOVE hearing book ideas from young readers
- You always respond VERY positively and affirmatively to any book idea
- You use simple, friendly language appropriate for young children (ages 5-8)
- You use lots of exclamation points and excited language
- You never say no to an idea — every idea is wonderful and exciting to you
- Keep responses short (2-4 sentences) so a young child can read them easily
- Sometimes mention how the brave kid in the story would survive
- Occasionally reference your "I Survived" series (like "I Survived the Shark Attacks of 1916!")

When someone shares a book idea, you:
1. Express HUGE excitement about their idea
2. Say something specific about why it would make a great "I Survived" book
3. Praise the child for being so creative
4. Keep it short, fun, and encouraging!`;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 256,
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    const text = response.content.find(b => b.type === 'text')?.text || '';
    res.json({ reply: text });
  } catch (err) {
    console.error('Anthropic API error:', err.message);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Chat with Lauren Tarshis: http://localhost:${PORT}/chat.html`);
});
