import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { GoogleGenAI } from '@google/genai';

function apiPlugin() {
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

  function getRequestBody(req: any): Promise<string> {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk: any) => { body += chunk; });
      req.on('end', () => resolve(body));
      req.on('error', (err: any) => reject(err));
    });
  }

  return {
    name: 'api-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        res.setHeader('Content-Type', 'application/json');

        try {
          if (req.url === '/api/chat' && req.method === 'POST') {
            const bodyStr = await getRequestBody(req);
            const body = JSON.parse(bodyStr);
            const { messages } = body;

            const ai = getAi();
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: messages,
              config: {
                systemInstruction: `You are NOVA-X, the highly advanced, futuristic Windows AI Assistant. You possess deep knowledge of Windows 10/11 system internals, PyAutoGUI desktop automation, ADB Android control, VS Code scripting, and local Python pipelines. Respond with a technical, helpful, and sleek robotic/futuristic tone (sleek command-center operator vibe, yet extremely clear and accurate). You are running inside the NOVA-X Quantum Core. Keep responses relatively concise, using clean Markdown formatting. Suggest PowerShell, Python (pyautogui, psutil), or command line code blocks when helpful.`,
              }
            });

            res.end(JSON.stringify({ text: response.text }));
            return;
          }

          if (req.url === '/api/analyze-screen' && req.method === 'POST') {
            const bodyStr = await getRequestBody(req);
            const body = JSON.parse(bodyStr);
            const { image, query } = body;

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

            res.end(JSON.stringify({ text: response.text }));
            return;
          }

          if (req.url === '/api/generate-code' && req.method === 'POST') {
            const bodyStr = await getRequestBody(req);
            const body = JSON.parse(bodyStr);
            const { prompt } = body;

            const ai = getAi();
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: `Write a clean, functional Windows automation script in Python or PowerShell based on: "${prompt}". Use standard libraries like pyautogui, os, sys, psutil, subprocess, or adbutils if it mentions mobile. Make it modular and explain how it connects to the NOVA-X dashboard. Return your output as JSON: { "code": "...", "explanation": "..." }. Follow this JSON schema exactly without markdown wrapping in the JSON values.`,
              config: {
                responseMimeType: 'application/json',
              }
            });

            res.end(response.text);
            return;
          }

          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Not Found' }));
        } catch (error: any) {
          console.error('Vite Dev API Error:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
