import { Epic, ofType } from 'redux-observable';
import { catchError, debounceTime, filter, map, of, switchMap, from } from 'rxjs';
import {
  SEARCH_SET_QUERY,
  searchActions,
  SearchAction,
} from './searchSlice';
import { productsApi } from '@/api/productsApi';
import type { RootState } from '@/app/rootReducer';

export const searchEpic: Epic<SearchAction, SearchAction, RootState> = (action$) =>
  action$.pipe(
    ofType(SEARCH_SET_QUERY),
    debounceTime(250),
    filter(
      (a): a is ReturnType<typeof searchActions.setQuery> =>
        a.type === SEARCH_SET_QUERY && a.payload.trim().length >= 2,
    ),
    switchMap((a) =>
      from(productsApi.search(a.payload)).pipe(
        map((items) => searchActions.suggestSuccess(items)),
        catchError(() => of(searchActions.suggestFailure())),
      ),
    ),
  );
