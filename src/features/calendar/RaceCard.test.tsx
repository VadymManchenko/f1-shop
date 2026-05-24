import { render } from '@testing-library/react';
import { RaceCard } from './RaceCard';
import type { ResolvedRace } from './raceStatus';

const baseRace: ResolvedRace = {
  id: 'bahrain',
  round: 1,
  slug: 'bahrain',
  name: 'Bahrain Grand Prix',
  shortName: 'BAHRAIN',
  country: 'BHR',
  circuit: 'Bahrain International Circuit',
  startDate: '2026-03-06',
  endDate: '2026-03-08',
  status: 'cancelled',
  isSprint: false,
  resolvedStatus: 'cancelled',
};

describe('RaceCard snapshot', () => {
  it('рендерить скасовану гонку', () => {
    const { asFragment } = render(<RaceCard race={baseRace} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('рендерить наступну гонку', () => {
    const next: ResolvedRace = {
      ...baseRace,
      id: 'monaco',
      round: 7,
      slug: 'monaco',
      shortName: 'MONACO',
      country: 'MCO',
      circuit: 'Circuit de Monaco',
      startDate: '2026-05-22',
      endDate: '2026-05-24',
      status: 'scheduled',
      resolvedStatus: 'next',
    };
    const { asFragment } = render(<RaceCard race={next} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
