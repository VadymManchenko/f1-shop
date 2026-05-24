import { resolveRaceStatuses } from './raceStatus';
import type { Race } from '@/types/domain';

function makeRace(overrides: Partial<Race> = {}): Race {
  return {
    id: 'r',
    round: 1,
    slug: 'test',
    name: 'Test GP',
    shortName: 'TEST',
    country: 'XX',
    circuit: 'Test Circuit',
    startDate: '2026-04-10',
    endDate: '2026-04-12',
    status: 'scheduled',
    isSprint: false,
    ...overrides,
  };
}

describe('resolveRaceStatuses', () => {
  const today = new Date('2026-05-14T12:00:00Z');

  it('cancelled залишається cancelled навіть для майбутньої дати', () => {
    const races = [makeRace({ id: '1', startDate: '2026-03-06', endDate: '2026-03-08', status: 'cancelled' })];
    const [r] = resolveRaceStatuses(races, today);
    expect(r.resolvedStatus).toBe('cancelled');
  });

  it('минула scheduled → completed', () => {
    const races = [makeRace({ id: '1', startDate: '2026-04-10', endDate: '2026-04-12' })];
    const [r] = resolveRaceStatuses(races, today);
    expect(r.resolvedStatus).toBe('completed');
  });

  it('найближча майбутня → next, наступні → upcoming', () => {
    const races = [
      makeRace({ id: 'a', startDate: '2026-04-10', endDate: '2026-04-12' }),
      makeRace({ id: 'b', startDate: '2026-06-05', endDate: '2026-06-07' }),
      makeRace({ id: 'c', startDate: '2026-07-03', endDate: '2026-07-05' }),
    ];
    const resolved = resolveRaceStatuses(races, today);
    expect(resolved.find((r) => r.id === 'a')!.resolvedStatus).toBe('completed');
    expect(resolved.find((r) => r.id === 'b')!.resolvedStatus).toBe('next');
    expect(resolved.find((r) => r.id === 'c')!.resolvedStatus).toBe('upcoming');
  });

  it('пропускає скасовані при виборі next', () => {
    const races = [
      makeRace({ id: 'a', startDate: '2026-05-20', endDate: '2026-05-22', status: 'cancelled' }),
      makeRace({ id: 'b', startDate: '2026-06-05', endDate: '2026-06-07' }),
    ];
    const resolved = resolveRaceStatuses(races, today);
    expect(resolved.find((r) => r.id === 'a')!.resolvedStatus).toBe('cancelled');
    expect(resolved.find((r) => r.id === 'b')!.resolvedStatus).toBe('next');
  });
});
