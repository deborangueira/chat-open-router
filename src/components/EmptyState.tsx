import { BotIcon } from "./icons";

const SUGGESTIONS = [
  "Explique o que é o OpenRouter em poucas frases",
  "Escreva uma função em Python que inverte uma string",
  "Me dê ideias de nomes para um projeto de chat",
  "Resuma os prós e contras de usar Tailwind CSS",
];

interface Props {
  onPick: (text: string) => void;
}

export default function EmptyState({ onPick }: Props) {
  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white">
        <BotIcon width={24} height={24} />
      </div>
      <h1 className="text-2xl font-semibold text-ink-900 dark:text-cream-100">
        Como posso ajudar hoje?
      </h1>
      <p className="mt-2 text-sm text-ink-800/60 dark:text-cream-100/60">
        Escolha um modelo acima e comece a conversar.
      </p>

      <div className="mt-8 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
        {SUGGESTIONS.map((text) => (
          <button
            key={text}
            onClick={() => onPick(text)}
            className="rounded-xl border border-ink-800/10 bg-white px-4 py-3 text-left text-sm text-ink-900 shadow-sm transition hover:border-accent/40 hover:bg-accent/5 dark:border-cream-100/10 dark:bg-ink-900 dark:text-cream-100"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
