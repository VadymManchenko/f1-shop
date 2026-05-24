import { useQuery } from '@tanstack/react-query';
import { racesApi } from '@/api/racesApi';
import { resolveRaceStatuses, ResolvedRace } from './raceStatus';

export function useRaces() {
  return useQuery<ResolvedRace[]>({
    queryKey: ['races', '2026'],
    queryFn: async () => {
      const raw = await racesApi.list();
      return resolveRaceStatuses(raw);
    },
    staleTime: 5 * 60_000,
  });
}
