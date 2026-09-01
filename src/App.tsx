import { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { useConversations } from "./hooks/useConversations";
import { useTheme } from "./hooks/useTheme";
import { sendChatMessage } from "./services/openrouter";
import type { ChatMessage } from "./types";

export default function App() {
  const {
    conversations,
    activeConversation,
    activeId,
    setActiveId,
    newConversation,
    deleteConversation,
    renameConversation,
    setConversationModel,
    updateMessages,
  } = useConversations();

  const { theme, toggleTheme } = useTheme();

  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSend = async (text: string) => {
    if (!activeConversation || isGenerating) return;
    const conversationId = activeConversation.id;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };

    const isFirstMessage = activeConversation.messages.length === 0;
    updateMessages(conversationId, (msgs) => [...msgs, userMessage]);
    if (isFirstMessage) {
      renameConversation(conversationId, text.slice(0, 40));
    }

    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      streaming: true,
      createdAt: Date.now(),
    };
    updateMessages(conversationId, (msgs) => [...msgs, assistantMessage]);

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsGenerating(true);

    const history = [...activeConversation.messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      await sendChatMessage({
        model: activeConversation.modelId,
        messages: history,
        signal: controller.signal,
        onToken: (token) => {
          updateMessages(conversationId, (msgs) =>
            msgs.map((m) =>
              m.id === assistantMessage.id
                ? { ...m, content: m.content + token }
                : m
            )
          );
        },
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao gerar resposta.";
      updateMessages(conversationId, (msgs) =>
        msgs.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, content: m.content || `⚠️ ${message}` }
            : m
        )
      );
    } finally {
      updateMessages(conversationId, (msgs) =>
        msgs.map((m) =>
          m.id === assistantMessage.id ? { ...m, streaming: false } : m
        )
      );
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-cream-50 dark:bg-ink-950">
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={(id) => {
          setActiveId(id);
          setSidebarOpen(false);
        }}
        onNew={() => {
          newConversation();
          setSidebarOpen(false);
        }}
        onDelete={deleteConversation}
        onRename={renameConversation}
        theme={theme}
        onToggleTheme={toggleTheme}
        isOpen={sidebarOpen}
        onToggleOpen={() => setSidebarOpen((o) => !o)}
      />

      {activeConversation && (
        <ChatWindow
          conversation={activeConversation}
          isGenerating={isGenerating}
          onSend={handleSend}
          onStop={handleStop}
          onModelChange={(modelId) =>
            setConversationModel(activeConversation.id, modelId)
          }
          onToggleSidebar={() => setSidebarOpen((o) => !o)}
        />
      )}
    </div>
  );
}
