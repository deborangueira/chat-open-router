import { useEffect, useRef, useState } from "react";
import { AVAILABLE_MODELS } from "../data/models";
import { ChevronDownIcon } from "./icons";

interface Props {
  modelId: string;
  onChange: (modelId: string) => void;
}

export default function ModelSelector({ modelId, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current =
    AVAILABLE_MODELS.find((m) => m.id === modelId) ?? AVAILABLE_MODELS[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-ink-900 transition hover:bg-ink-800/5 dark:text-cream-100 dark:hover:bg-cream-100/10"
      >
        {current.name}
        <ChevronDownIcon
          width={14}
          height={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1.5 w-80 overflow-hidden rounded-xl border border-ink-800/10 bg-white py-1.5 shadow-lg dark:border-cream-100/10 dark:bg-ink-900">
          {AVAILABLE_MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                onChange(model.id);
                setOpen(false);
              }}
              className={`flex w-full flex-col items-start gap-0.5 px-3.5 py-2 text-left transition hover:bg-ink-800/5 dark:hover:bg-cream-100/10 ${
                model.id === modelId ? "bg-accent/10" : ""
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-sm font-medium text-ink-900 dark:text-cream-100">
                  {model.name}
                </span>
                <span className="text-[11px] uppercase tracking-wide text-ink-800/40 dark:text-cream-100/40">
                  {model.provider}
                </span>
              </div>
              <span className="text-xs text-ink-800/55 dark:text-cream-100/55">
                {model.description}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
