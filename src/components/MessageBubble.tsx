import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import type { ChatMessage } from "../types";
import { CheckIcon, CopyIcon, BotIcon } from "./icons";
import { useTheme } from "../hooks/useTheme";

interface Props {
  message: ChatMessage;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard indisponível — ignora silenciosamente
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 text-[15px] leading-relaxed text-white shadow-sm">
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex gap-3 animate-fade-in">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white">
        <BotIcon width={16} height={16} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="prose-chat max-w-none text-[15px] text-ink-900 dark:text-cream-100">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                const isInline = !match;
                if (isInline) {
                  return (
                    <code className={className} {...rest}>
                      {children}
                    </code>
                  );
                }
                return (
                  <SyntaxHighlighter
                    style={theme === "dark" ? oneDark : oneLight}
                    language={match?.[1]}
                    PreTag="div"
                    customStyle={{ margin: 0 }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                );
              },
            }}
          >
            {message.content || " "}
          </ReactMarkdown>
          {message.streaming && (
            <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-blink bg-ink-800/70 dark:bg-cream-100/70" />
          )}
        </div>

        {!message.streaming && message.content && (
          <button
            onClick={handleCopy}
            className="mt-1.5 flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-ink-800/50 opacity-0 transition hover:bg-ink-800/5 hover:text-ink-800/80 group-hover:opacity-100 dark:text-cream-100/50 dark:hover:bg-cream-100/10 dark:hover:text-cream-100/80"
          >
            {copied ? (
              <>
                <CheckIcon width={13} height={13} /> Copiado
              </>
            ) : (
              <>
                <CopyIcon width={13} height={13} /> Copiar
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
