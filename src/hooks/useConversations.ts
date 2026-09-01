import { useCallback, useEffect, useState } from "react";
import type { ChatMessage, Conversation } from "../types";
import { DEFAULT_MODEL_ID } from "../data/models";

const STORAGE_KEY = "chat-openrouter:conversations";
const ACTIVE_KEY = "chat-openrouter:active-id";

function createConversation(modelId: string = DEFAULT_MODEL_ID): Conversation {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    title: "Nova conversa",
    modelId,
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

function loadConversations(): Conversation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Conversation[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const loaded = loadConversations();
    return loaded.length > 0 ? loaded : [createConversation()];
  });

  const [activeId, setActiveId] = useState<string>(() => {
    const saved = localStorage.getItem(ACTIVE_KEY);
    const loaded = loadConversations();
    if (saved && loaded.some((c) => c.id === saved)) return saved;
    return loaded[0]?.id ?? conversations[0].id;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(ACTIVE_KEY, activeId);
  }, [activeId]);

  const activeConversation =
    conversations.find((c) => c.id === activeId) ?? conversations[0];

  const newConversation = useCallback((modelId?: string) => {
    const conv = createConversation(modelId);
    setConversations((prev) => [conv, ...prev]);
    setActiveId(conv.id);
    return conv.id;
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id);
        if (next.length === 0) {
          const fresh = createConversation();
          if (id === activeId) setActiveId(fresh.id);
          return [fresh];
        }
        if (id === activeId) {
          setActiveId(next[0].id);
        }
        return next;
      });
    },
    [activeId]
  );

  const renameConversation = useCallback((id: string, title: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, title: title.trim() || "Sem título" } : c
      )
    );
  }, []);

  const setConversationModel = useCallback((id: string, modelId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, modelId } : c))
    );
  }, []);

  const updateMessages = useCallback(
    (id: string, updater: (messages: ChatMessage[]) => ChatMessage[]) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, messages: updater(c.messages), updatedAt: Date.now() }
            : c
        )
      );
    },
    []
  );

  return {
    conversations,
    activeConversation,
    activeId,
    setActiveId,
    newConversation,
    deleteConversation,
    renameConversation,
    setConversationModel,
    updateMessages,
  };
}
