import type { OpenRouterModel } from "../types";

/**
 * Lista estática (curada) de alguns modelos populares disponíveis no OpenRouter.
 *
 * Isso é só para preencher o seletor de modelos da interface. Quando você
 * conectar a API de verdade, pode:
 *   1) manter esta lista fixa (mais simples, funciona offline), ou
 *   2) substituí-la por uma busca dinâmica em `GET https://openrouter.ai/api/v1/models`
 *      (esse endpoint é público e não exige API key) — ver comentário em
 *      `src/services/openrouter.ts`.
 *
 * Os `id`s seguem o formato usado pelo OpenRouter: "provedor/modelo".
 */
export const AVAILABLE_MODELS: OpenRouterModel[] = [
  {
    id: "anthropic/claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    description: "Equilíbrio entre qualidade e velocidade para tarefas gerais.",
    contextLength: 200000,
  },
  {
    id: "anthropic/claude-opus-4.1",
    name: "Claude Opus 4.1",
    provider: "Anthropic",
    description: "O modelo mais capaz da Anthropic, ótimo para raciocínio complexo.",
    contextLength: 200000,
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description: "Modelo multimodal rápido e versátil da OpenAI.",
    contextLength: 128000,
  },
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o mini",
    provider: "OpenAI",
    description: "Versão compacta e econômica do GPT-4o.",
    contextLength: 128000,
  },
  {
    id: "google/gemini-2.0-flash-exp",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    description: "Modelo rápido do Google, bom custo-benefício.",
    contextLength: 1000000,
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct",
    name: "Llama 3.3 70B",
    provider: "Meta",
    description: "Modelo open-weight de alto desempenho da Meta.",
    contextLength: 131072,
  },
  {
    id: "mistralai/mistral-large",
    name: "Mistral Large",
    provider: "Mistral AI",
    description: "Modelo carro-chefe da Mistral AI.",
    contextLength: 128000,
  },
  {
    id: "deepseek/deepseek-chat",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    description: "Modelo open-weight com ótima relação custo-benefício.",
    contextLength: 64000,
  },
];

export const DEFAULT_MODEL_ID = AVAILABLE_MODELS[0].id;
