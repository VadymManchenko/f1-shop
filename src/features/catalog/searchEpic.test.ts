import { Subject } from 'rxjs';
import type { Action } from 'redux';
import type { StateObservable } from 'redux-observable';
import { searchEpic } from './searchEpic';
import { searchActions, SearchAction } from './searchSlice';
import { productsApi } from '@/api/productsApi';
import type { Product } from '@/types/domain';
import type { RootState } from '@/app/rootReducer';

jest.mock('@/api/productsApi', () => ({
  productsApi: {
    search: jest.fn(),
  },
}));

const product: Product = {
  id: '1',
  title: 'Ferrari Cap',
  team: 'ferrari',
  category: 'cap',
  group: 'apparel',
  price: 45,
  currency: 'EUR',
  description: 'test',
  image: '/img.jpg',
  stock: 10,
  createdAt: '2026-01-01',
};

describe('searchEpic', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('дебаунсить запити (250 мс) і робить один виклик API', async () => {
    (productsApi.search as jest.Mock).mockResolvedValue([product]);

    const action$ = new Subject<SearchAction>();
    const state$ = new Subject() as unknown as StateObservable<RootState>;
    const output: Action[] = [];
    const sub = searchEpic(action$ as never, state$, undefined as never).subscribe(
      (a) => output.push(a),
    );

    action$.next(searchActions.setQuery('fer'));
    action$.next(searchActions.setQuery('ferr'));
    action$.next(searchActions.setQuery('ferrari'));

    await jest.advanceTimersByTimeAsync(250);

    expect(productsApi.search).toHaveBeenCalledTimes(1);
    expect(productsApi.search).toHaveBeenCalledWith('ferrari');
    expect(output).toEqual([searchActions.suggestSuccess([product])]);

    sub.unsubscribe();
  });

  it('ігнорує короткі запити (<2 символів)', async () => {
    (productsApi.search as jest.Mock).mockResolvedValue([]);

    const action$ = new Subject<SearchAction>();
    const state$ = new Subject() as unknown as StateObservable<RootState>;
    const output: Action[] = [];
    const sub = searchEpic(action$ as never, state$, undefined as never).subscribe(
      (a) => output.push(a),
    );

    action$.next(searchActions.setQuery('f'));
    await jest.advanceTimersByTimeAsync(300);

    expect(productsApi.search).not.toHaveBeenCalled();
    expect(output).toEqual([]);

    sub.unsubscribe();
  });
});
