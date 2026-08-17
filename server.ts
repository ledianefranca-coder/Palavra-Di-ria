import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from environment variables.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Endpoint for Custom Biblical Reflection with ARA Bible
app.post("/api/gemini/reflect", async (req, res) => {
  try {
    const { topic, sentiment } = req.body;
    const ai = getGeminiClient();

    const prompt = `Você é um mentor espiritual cristão acolhedor, sábio e edificante.
Gere uma reflexão cristã de fé e esperança em português do Brasil com base na Bíblia Sagrada na tradução Almeida Revista e Atualizada (ARA).
${topic ? `Tópico ou sentimento solicitado pelo usuário: "${topic}"` : ""}
${sentiment ? `Sentimento atual do usuário: "${sentiment}"` : ""}

Estrutura da resposta em formato JSON:
- "versiculo": Texto exato do versículo em ARA.
- "referencia": Livro, Capítulo:Versículo (ex: "Salmos 23:1-3", "Filipenses 4:6-7", "Isaías 40:31", "Provérbios 3:5-6").
- "titulo": Um título curto e inspirador para a reflexão.
- "reflexao": Um texto de reflexão profunda, de 2 a 3 parágrafos curtos, encorajador, prático e espiritualmente edificante.
- "oracao": Uma oração sincera e simples de 3 a 5 linhas para o usuário fazer.
- "acaoPratica": Uma pequena atitude prática para o dia de hoje.
- "categoriaNatureza": Sugestão de ambiente da natureza que combina com a mensagem (opções: "montanhas", "floresta", "pôr do sol", "lago", "mar", "cachoeira", "flores", "céu estrelado").`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "Retorne apenas o JSON no formato estrito solicitado. Use estritamente a tradução da Bíblia Almeida Revista e Atualizada (ARA).",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Erro na API Gemini de Reflexão:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Não foi possível gerar a reflexão no momento.",
    });
  }
});

// Endpoint for Audio TTS Generation using Gemini
app.post("/api/gemini/tts", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Texto inválido" });
    }

    const ai = getGeminiClient();
    const promptText = `Leia este texto bíblico e de reflexão com voz calma, solene, pausada e reconfortante em português: ${text.slice(0, 600)}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: promptText }] }],
      config: {
        responseModalities: ["AUDIO" as any],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      res.json({ success: true, audioBase64: base64Audio });
    } else {
      res.status(500).json({ success: false, error: "Sem áudio retornado" });
    }
  } catch (error: any) {
    console.error("Erro no TTS do Gemini:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer();
