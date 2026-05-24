import type { Race, RaceStatus } from '@/types/domain';

export interface ResolvedRace extends Race {
  resolvedStatus: RaceStatus;
}

const MONTH_SHORT = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

export function formatRaceDates(startISO: string, endISO: string): string {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const startDay = String(start.getUTCDate()).padStart(2, '0');
  const endDay = String(end.getUTCDate()).padStart(2, '0');
  const sameMonth = start.getUTCMonth() === end.getUTCMonth();
  const startMonth = MONTH_SHORT[start.getUTCMonth()];
  const endMonth = MONTH_SHORT[end.getUTCMonth()];

  if (sameMonth) {
    return `${startDay} — ${endDay} ${endMonth}`;
  }
  return `${startDay} ${startMonth} — ${endDay} ${endMonth}`;
}

export function resolveRaceStatuses(races: Race[], today = new Date()): ResolvedRace[] {
  const todayMs = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );

  const nextRaceId = (() => {
    const future = races
      .filter((r) => r.status === 'scheduled')
      .filter((r) => new Date(r.endDate).getTime() >= todayMs)
      .sort((a, b) => a.startDate.localeCompare(b.startDate));
    return future[0]?.id;
  })();

  return races.map((race) => {
    let resolvedStatus: RaceStatus;
    if (race.status === 'cancelled') {
      resolvedStatus = 'cancelled';
    } else if (new Date(race.endDate).getTime() < todayMs) {
      resolvedStatus = 'completed';
    } else if (race.id === nextRaceId) {
      resolvedStatus = 'next';
    } else {
      resolvedStatus = 'upcoming';
    }
    return { ...race, resolvedStatus };
  });
}
