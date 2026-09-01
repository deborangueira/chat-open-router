import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "OPENROUTER_API_KEY não configurada. Preencha o arquivo .env na raiz do projeto.",
    });
  }

  const { model, messages } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "Chat OpenRouter",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 1024,
    }),
  });

  const data = await response.json();
  res.status(response.status).json(data);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
