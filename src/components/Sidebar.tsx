import { useState } from "react";
import type { Conversation } from "../types";
import {
  EditIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
  TrashIcon,
  CloseIcon,
  CheckIcon,
  MenuIcon,
} from "./icons";

interface Props {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export default function Sidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  onRename,
  theme,
  onToggleTheme,
  isOpen,
  onToggleOpen,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  const startEditing = (conv: Conversation) => {
    setEditingId(conv.id);
    setDraftTitle(conv.title);
  };

  const confirmEditing = () => {
    if (editingId) onRename(editingId, draftTitle);
    setEditingId(null);
  };

  return (
    <>
      {/* overlay no mobile quando a sidebar está aberta */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={onToggleOpen}
        />
      )}

      <aside
        className={`fixed z-40 flex h-full w-72 shrink-0 flex-col border-r border-ink-800/10 bg-cream-100 transition-transform dark:border-cream-100/10 dark:bg-ink-950 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-3 pb-2 pt-3">
          <button
            onClick={onToggleOpen}
            className="rounded-lg p-1.5 text-ink-800/60 hover:bg-ink-800/5 dark:text-cream-100/60 dark:hover:bg-cream-100/10 md:hidden"
          >
            <CloseIcon width={18} height={18} />
          </button>
          <span className="px-1 text-sm font-semibold text-ink-900 dark:text-cream-100">
            Conversas
          </span>
          <div className="w-6 md:hidden" />
        </div>

        <div className="px-3">
          <button
            onClick={onNew}
            className="flex w-full items-center gap-2 rounded-xl bg-accent px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-accent-dark"
          >
            <PlusIcon width={16} height={16} />
            Nova conversa
          </button>
        </div>

        <div className="scroll-thin mt-3 flex-1 space-y-0.5 overflow-y-auto px-2 pb-2">
          {conversations.map((conv) => {
            const isActive = conv.id === activeId;
            const isEditing = editingId === conv.id;
            return (
              <div
                key={conv.id}
                onClick={() => !isEditing && onSelect(conv.id)}
                className={`group flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-2 text-sm transition ${
                  isActive
                    ? "bg-accent/15 text-ink-900 dark:text-cream-100"
                    : "text-ink-800/75 hover:bg-ink-800/5 dark:text-cream-100/75 dark:hover:bg-cream-100/10"
                }`}
              >
                {isEditing ? (
                  <input
                    autoFocus
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") confirmEditing();
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="min-w-0 flex-1 rounded bg-white px-1.5 py-0.5 text-sm text-ink-900 outline-none ring-1 ring-accent dark:bg-ink-900 dark:text-cream-100"
                  />
                ) : (
                  <span className="min-w-0 flex-1 truncate">{conv.title}</span>
                )}

                {isEditing ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmEditing();
                    }}
                    className="shrink-0 rounded p-1 text-ink-800/50 hover:text-accent dark:text-cream-100/50"
                  >
                    <CheckIcon width={14} height={14} />
                  </button>
                ) : (
                  <div className="flex shrink-0 items-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(conv);
                      }}
                      className="rounded p-1 text-ink-800/50 hover:text-accent dark:text-cream-100/50"
                      title="Renomear"
                    >
                      <EditIcon width={13} height={13} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(conv.id);
                      }}
                      className="rounded p-1 text-ink-800/50 hover:text-red-500 dark:text-cream-100/50"
                      title="Excluir"
                    >
                      <TrashIcon width={13} height={13} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-0.5 border-t border-ink-800/10 p-2 dark:border-cream-100/10">
          <button
            onClick={onToggleTheme}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-ink-800/75 transition hover:bg-ink-800/5 dark:text-cream-100/75 dark:hover:bg-cream-100/10"
          >
            {theme === "dark" ? (
              <SunIcon width={16} height={16} />
            ) : (
              <MoonIcon width={16} height={16} />
            )}
            {theme === "dark" ? "Tema claro" : "Tema escuro"}
          </button>
        </div>
      </aside>
    </>
  );
}

export function SidebarToggleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg p-1.5 text-ink-800/60 hover:bg-ink-800/5 dark:text-cream-100/60 dark:hover:bg-cream-100/10 md:hidden"
    >
      <MenuIcon width={18} height={18} />
    </button>
  );
}
