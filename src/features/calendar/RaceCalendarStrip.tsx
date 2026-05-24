import { useEffect, useRef, useState } from 'react';
import { useRaces } from './useRaces';
import { RaceCard } from './RaceCard';

const AUTO_SCROLL_PX_PER_FRAME = 0.5;

export function RaceCalendarStrip() {
  const { data, isLoading, isError } = useRaces();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!data || paused) return;
    const el = scrollerRef.current;
    if (!el) return;

    let rafId = 0;
    const step = () => {
      const half = el.scrollWidth / 2;
      if (half > 0 && el.scrollLeft >= half) {
        el.scrollLeft -= half;
      }
      el.scrollLeft += AUTO_SCROLL_PX_PER_FRAME;
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [data, paused]);

  return (
    <section className="border-t border-ink-100 bg-ink-50">
      <div className="container-page pt-12 pb-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="eyebrow">Календар сезону</p>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight mt-2">
              F1 2026
            </h2>
          </div>
          <CalendarLegend />
        </div>
      </div>

      <div className="relative pb-12">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16
            bg-gradient-to-r from-ink-50 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16
            bg-gradient-to-l from-ink-50 to-transparent"
          aria-hidden="true"
        />

        {isLoading && (
          <div className="flex gap-4 px-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-[260px] h-[180px] bg-ink-100 animate-pulse border border-ink-100 shrink-0"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="container-page text-sm text-ink-400">
            Не вдалося завантажити календар.
          </div>
        )}

        {data && data.length > 0 && (
          <div
            ref={scrollerRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
            className="overflow-x-auto pb-4 [scrollbar-width:thin]"
          >
            <div className="flex w-max gap-4 px-6 py-3">
              {[...data, ...data].map((race, idx) => (
                <div key={`${race.id}-${idx}`} aria-hidden={idx >= data.length}>
                  <RaceCard race={race} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CalendarLegend() {
  const items = [
    { label: 'Завершено', color: 'bg-emerald-500' },
    { label: 'Наступний', color: 'bg-yellow-400' },
    { label: 'Попереду', color: 'bg-ink-300' },
    { label: 'Скасовано', color: 'bg-red-500' },
  ];
  return (
    <div className="hidden md:flex items-center gap-5">
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${i.color}`} />
          <span className="text-xs uppercase tracking-widest text-ink-400">
            {i.label}
          </span>
        </div>
      ))}
    </div>
  );
}
