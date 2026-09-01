import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { SendIcon, StopIcon } from "./icons";

interface Props {
  onSend: (text: string) => void;
  onStop: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export default function MessageInput({
  onSend,
  onStop,
  isGenerating,
  disabled,
}: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  const handleSend = () => {
    const text = value.trim();
    if (!text || isGenerating || disabled) return;
    onSend(text);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-4">
      <div className="flex items-end gap-2 rounded-2xl border border-ink-800/10 bg-white p-2 shadow-sm transition focus-within:border-accent/50 dark:border-cream-100/10 dark:bg-ink-900">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Envie uma mensagem..."
          rows={1}
          disabled={disabled}
          className="max-h-[200px] flex-1 resize-none bg-transparent px-2 py-1.5 text-[15px] text-ink-900 placeholder:text-ink-800/40 focus:outline-none dark:text-cream-100 dark:placeholder:text-cream-100/40"
        />

        {isGenerating ? (
          <button
            onClick={onStop}
            title="Parar geração"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-white transition hover:opacity-85 dark:bg-cream-100 dark:text-ink-900"
          >
            <StopIcon width={15} height={15} />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            title="Enviar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition enabled:hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-30"
          >
            <SendIcon width={16} height={16} />
          </button>
        )}
      </div>
    </div>
  );
}
