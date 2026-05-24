import type { Product, Team, Category } from '@/types/domain';

export interface SearchFilters {
  query: string;
  teams: Team[];
  categories: Category[];
  sortBy: 'newest' | 'price-asc' | 'price-desc';
}

export interface SearchState {
  filters: SearchFilters;
  suggestions: Product[];
  status: 'idle' | 'loading' | 'done' | 'error';
}

const initialState: SearchState = {
  filters: {
    query: '',
    teams: [],
    categories: [],
    sortBy: 'newest',
  },
  suggestions: [],
  status: 'idle',
};

export const SEARCH_SET_QUERY = 'search/setQuery' as const;
export const SEARCH_TOGGLE_TEAM = 'search/toggleTeam' as const;
export const SEARCH_TOGGLE_CATEGORY = 'search/toggleCategory' as const;
export const SEARCH_SET_SORT = 'search/setSort' as const;
export const SEARCH_RESET = 'search/reset' as const;
export const SEARCH_SUGGEST_LOADING = 'search/suggestLoading' as const;
export const SEARCH_SUGGEST_SUCCESS = 'search/suggestSuccess' as const;
export const SEARCH_SUGGEST_FAILURE = 'search/suggestFailure' as const;

interface SetQueryAction {
  type: typeof SEARCH_SET_QUERY;
  payload: string;
}
interface ToggleTeamAction {
  type: typeof SEARCH_TOGGLE_TEAM;
  payload: Team;
}
interface ToggleCategoryAction {
  type: typeof SEARCH_TOGGLE_CATEGORY;
  payload: Category;
}
interface SetSortAction {
  type: typeof SEARCH_SET_SORT;
  payload: SearchFilters['sortBy'];
}
interface ResetAction {
  type: typeof SEARCH_RESET;
}
interface SuggestLoadingAction {
  type: typeof SEARCH_SUGGEST_LOADING;
}
interface SuggestSuccessAction {
  type: typeof SEARCH_SUGGEST_SUCCESS;
  payload: Product[];
}
interface SuggestFailureAction {
  type: typeof SEARCH_SUGGEST_FAILURE;
}

export type SearchAction =
  | SetQueryAction
  | ToggleTeamAction
  | ToggleCategoryAction
  | SetSortAction
  | ResetAction
  | SuggestLoadingAction
  | SuggestSuccessAction
  | SuggestFailureAction;

export const searchActions = {
  setQuery: (q: string): SetQueryAction => ({ type: SEARCH_SET_QUERY, payload: q }),
  toggleTeam: (t: Team): ToggleTeamAction => ({ type: SEARCH_TOGGLE_TEAM, payload: t }),
  toggleCategory: (c: Category): ToggleCategoryAction => ({
    type: SEARCH_TOGGLE_CATEGORY,
    payload: c,
  }),
  setSort: (s: SearchFilters['sortBy']): SetSortAction => ({
    type: SEARCH_SET_SORT,
    payload: s,
  }),
  reset: (): ResetAction => ({ type: SEARCH_RESET }),
  suggestLoading: (): SuggestLoadingAction => ({ type: SEARCH_SUGGEST_LOADING }),
  suggestSuccess: (items: Product[]): SuggestSuccessAction => ({
    type: SEARCH_SUGGEST_SUCCESS,
    payload: items,
  }),
  suggestFailure: (): SuggestFailureAction => ({ type: SEARCH_SUGGEST_FAILURE }),
};

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

export function searchReducer(
  state: SearchState = initialState,
  action: SearchAction,
): SearchState {
  switch (action.type) {
    case SEARCH_SET_QUERY:
      return { ...state, filters: { ...state.filters, query: action.payload } };
    case SEARCH_TOGGLE_TEAM:
      return {
        ...state,
        filters: { ...state.filters, teams: toggle(state.filters.teams, action.payload) },
      };
    case SEARCH_TOGGLE_CATEGORY:
      return {
        ...state,
        filters: {
          ...state.filters,
          categories: toggle(state.filters.categories, action.payload),
        },
      };
    case SEARCH_SET_SORT:
      return { ...state, filters: { ...state.filters, sortBy: action.payload } };
    case SEARCH_RESET:
      return initialState;
    case SEARCH_SUGGEST_LOADING:
      return { ...state, status: 'loading' };
    case SEARCH_SUGGEST_SUCCESS:
      return { ...state, status: 'done', suggestions: action.payload };
    case SEARCH_SUGGEST_FAILURE:
      return { ...state, status: 'error', suggestions: [] };
    default:
      return state;
  }
}
