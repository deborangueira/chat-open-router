import type { Role } from "../types";

export interface SendMessageParams {
  model: string;
  messages: { role: Role; content: string }[];
  onToken: (token: string) => void;
  signal?: AbortSignal;
}

export async function sendChatMessage({
  model,
  messages,
  onToken,
  signal,
}: SendMessageParams): Promise<void> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages }),
    signal,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || data.error || `Erro na API: ${response.status}`);
  }

  const content = data.choices?.[0]?.message?.content ?? "";
  onToken(content);
}
