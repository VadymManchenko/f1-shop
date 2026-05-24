import clsx from 'clsx';
import type { ResolvedRace } from './raceStatus';
import { formatRaceDates } from './raceStatus';

interface Props {
  race: ResolvedRace;
}

const STATUS_LABEL: Record<ResolvedRace['resolvedStatus'], string> = {
  completed: 'Завершено',
  cancelled: 'Скасовано',
  next: 'Наступний',
  upcoming: 'Попереду',
};

const STATUS_THEME: Record<ResolvedRace['resolvedStatus'], {
  ring: string;
  tint: string;
  dot: string;
  badge: string;
  textMuted: string;
}> = {
  completed: {
    ring: 'ring-emerald-500/40',
    tint: 'bg-emerald-500/35 mix-blend-multiply',
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-500 text-white',
    textMuted: 'text-emerald-50/80',
  },
  cancelled: {
    ring: 'ring-red-500/40',
    tint: 'bg-red-600/45 mix-blend-multiply',
    dot: 'bg-red-500',
    badge: 'bg-red-600 text-white',
    textMuted: 'text-red-50/80',
  },
  next: {
    ring: 'ring-yellow-400/70',
    tint: 'bg-yellow-400/40 mix-blend-multiply',
    dot: 'bg-yellow-400',
    badge: 'bg-yellow-400 text-black',
    textMuted: 'text-yellow-50/90',
  },
  upcoming: {
    ring: 'ring-ink-200/40',
    tint: 'bg-ink-700/45 mix-blend-multiply',
    dot: 'bg-ink-300',
    badge: 'bg-ink-200 text-ink-900',
    textMuted: 'text-ink-100/80',
  },
};

export function RaceCard({ race }: Props) {
  const theme = STATUS_THEME[race.resolvedStatus];
  const isCancelled = race.resolvedStatus === 'cancelled';

  return (
    <article
      className={clsx(
        'group relative shrink-0 w-[260px] h-[180px] overflow-hidden border bg-ink-900 text-white',
        'border-ink-100 ring-1 ring-inset transition-all duration-300 ease-out',
        'hover:scale-[1.05] hover:-translate-y-1 hover:shadow-2xl hover:z-10',
        theme.ring,
        race.resolvedStatus === 'next' && 'scale-[1.02] shadow-xl',
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/tracks/${race.slug}.jpg)` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/35 to-ink-900/10" />
      <div className={clsx('absolute inset-0', theme.tint)} />

      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className={clsx('h-2 w-2 rounded-full', theme.dot)} />
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-90">
              R{String(race.round).padStart(2, '0')}
            </span>
          </div>
          <span
            className={clsx(
              'px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest',
              theme.badge,
            )}
          >
            {STATUS_LABEL[race.resolvedStatus]}
          </span>
        </div>

        <div>
          <div className={clsx('font-display text-xl leading-tight', isCancelled && 'line-through opacity-90')}>
            {race.shortName}
          </div>
          <div className="text-[11px] uppercase tracking-widest opacity-70 mt-0.5">
            {race.country}
          </div>
          <div className="mt-3 font-mono text-sm tracking-widest">
            {formatRaceDates(race.startDate, race.endDate)}
          </div>
        </div>
      </div>
    </article>
  );
}
