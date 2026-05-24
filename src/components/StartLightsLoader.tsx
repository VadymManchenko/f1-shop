import { useEffect, useState } from 'react';

type Props = {
  label?: string;
};

const LIGHT_COUNT = 5;
const STEP_MS = 600;

export function StartLightsLoader({ label = 'Підготовка стартової решітки' }: Props) {
  const [lit, setLit] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLit((n) => (n >= LIGHT_COUNT ? 1 : n + 1));
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-6 py-16"
    >
      <div className="flex items-center gap-3">
        {Array.from({ length: LIGHT_COUNT }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 border border-ink-900 bg-ink-800 px-2 py-2 rounded-sm"
          >
            <Lamp on={i < lit} />
            <Lamp on={i < lit} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-ink-200" />
        <span className="text-xs text-ink-400 uppercase tracking-widest font-mono">
          {label}
        </span>
        <span className="h-px w-8 bg-ink-200" />
      </div>
    </div>
  );
}

function Lamp({ on }: { on: boolean }) {
  return (
    <span
      className={
        'block h-4 w-4 rounded-full transition-all duration-200 ' +
        (on
          ? 'bg-[#DC0000] shadow-[0_0_14px_rgba(220,0,0,0.7)]'
          : 'bg-ink-700')
      }
    />
  );
}
