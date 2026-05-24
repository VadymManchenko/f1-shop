import { useRaces } from '@/features/calendar/useRaces';
import { RaceCard } from '@/features/calendar/RaceCard';
import { StartLightsLoader } from '@/components/StartLightsLoader';

export function CalendarPage() {
  const { data, isLoading, isError } = useRaces();

  return (
    <section className="container-page py-16">
      <p className="eyebrow">Сезон 2026</p>
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mt-2 mb-4">
        Календар Формули-1
      </h1>
      <p className="text-ink-500 max-w-2xl mb-10">
        Усі Гран-прі сезону, відмічено завершені етапи, наступну гонку та
        скасовані заїзди.
      </p>

      {isLoading && <StartLightsLoader label="Завантаження календаря" />}

      {isError && (
        <div className="card p-12 text-center text-ink-400">
          Не вдалося завантажити календар.
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </div>
      )}
    </section>
  );
}
