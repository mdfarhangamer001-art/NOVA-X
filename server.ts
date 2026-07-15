import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '15mb' }));

let aiClient: any = null;
function getAi() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing. Please configure it in your Secrets panel.');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// API Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: messages,
      config: {
        systemInstruction: `You are NOVA-X, the highly advanced, futuristic Windows AI Assistant. You possess deep knowledge of Windows 10/11 system internals, PyAutoGUI desktop automation, ADB Android control, VS Code scripting, and local Python pipelines. Respond with a technical, helpful, and sleek robotic/futuristic tone (sleek command-center operator vibe, yet extremely clear and accurate). You are running inside the NOVA-X Quantum Core. Keep responses relatively concise, using clean Markdown formatting. Suggest PowerShell, Python (pyautogui, psutil), or command line code blocks when helpful.`,
      }
    });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.post('/api/analyze-screen', async (req, res) => {
  try {
    const { image, query } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Base64 image is required' });
    }
    const ai = getAi();
    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          inlineData: {
            mimeType: 'image/png',
            data: cleanBase64
          }
        },
        query || 'Analyze this screenshot and list any visible interactive UI elements with approximate pixel coordinates (X, Y in standard 1920x1080 resolution if possible) so a PyAutoGUI script can click them. Return a structured breakdown of what is on screen and suggested automation actions.'
      ],
      config: {
        systemInstruction: 'You are the Vision Module of NOVA-X. You excel at OCR, screen coordinate tracking, and window layout understanding. Be precise and structured.'
      }
    });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Vision API Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.post('/api/generate-code', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a clean, functional Windows automation script in Python or PowerShell based on: "${prompt}". Use standard libraries like pyautogui, os, sys, psutil, subprocess, or adbutils if it mentions mobile. Make it modular and explain how it connects to the NOVA-X dashboard. Return your output as JSON: { "code": "...", "explanation": "..." }. Follow this JSON schema exactly without markdown wrapping in the JSON values.`,
      config: {
        responseMimeType: 'application/json',
      }
    });
    res.json(JSON.parse(response.text));
  } catch (error: any) {
    console.error('Code Gen API Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.post('/api/council', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are the NOVA-X AI Council. Simulate a high-level real-time engineering debate about the following user prompt: "${prompt}".
      Generate a professional, detailed multi-agent discussion between 5 specialized agents:
      1. Planner: Focuses on architecture, workflows, high-level steps, and prerequisites.
      2. Researcher: Explains platform APIs, system constraints, security privileges, and technical research.
      3. Designer: Focuses on user interaction, UI/UX aesthetics, and layout mappings.
      4. Coder: Writes clean, professional, fully realized Python or PowerShell code snippets to solve the problem.
      5. Tester: Verifies code safety, security warnings (like mouse lock or administrative rights), and asserts testing protocols.

      Format your output as a strict JSON object with this schema:
      {
        "discussion": [
          { "agent": "Planner", "message": "Detailed architectural plan..." },
          { "agent": "Researcher", "message": "Detailed research and platform API constraints..." },
          { "agent": "Designer", "message": "Detailed UX/UI layout suggestions..." },
          { "agent": "Coder", "message": "Professional executable code block (use \\n for newlines)..." },
          { "agent": "Tester", "message": "Detailed safety warnings, assertions and testing logs..." }
        ],
        "conclusion": "Unified consolidated recommendation..."
      }
      Do NOT include any markdown code blocks inside the JSON fields.`,
      config: {
        responseMimeType: 'application/json',
      }
    });
    res.json(JSON.parse(response.text));
  } catch (error: any) {
    console.error('AI Council API Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Serve static assets in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`NOVA-X Production Server running on port ${port}`);
});
