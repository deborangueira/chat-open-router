export type Role = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  /** true enquanto a resposta ainda está sendo "gerada" (streaming) */
  streaming?: boolean;
  /** timestamp em ms desde epoch */
  createdAt: number;
}

export interface Conversation {
  id: string;
  title: string;
  modelId: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

export interface OpenRouterModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  contextLength: number;
}
