import { useEffect, useRef } from "react";
import type { Conversation } from "../types";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";
import ModelSelector from "./ModelSelector";
import { SidebarToggleButton } from "./Sidebar";

interface Props {
  conversation: Conversation;
  isGenerating: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
  onModelChange: (modelId: string) => void;
  onToggleSidebar: () => void;
}

export default function ChatWindow({
  conversation,
  isGenerating,
  onSend,
  onStop,
  onModelChange,
  onToggleSidebar,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages, conversation.id]);

  const hasMessages = conversation.messages.length > 0;

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col">
      <header className="flex items-center gap-2 border-b border-ink-800/10 px-3 py-2.5 dark:border-cream-100/10">
        <SidebarToggleButton onClick={onToggleSidebar} />
        <ModelSelector modelId={conversation.modelId} onChange={onModelChange} />
      </header>

      <div className="scroll-thin flex-1 overflow-y-auto">
        {hasMessages ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
            {conversation.messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={bottomRef} />
          </div>
        ) : (
          <EmptyState onPick={onSend} />
        )}
      </div>

      <MessageInput onSend={onSend} onStop={onStop} isGenerating={isGenerating} />
    </div>
  );
}
