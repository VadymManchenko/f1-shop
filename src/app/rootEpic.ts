import { combineEpics, Epic } from 'redux-observable';
import { searchEpic } from '@/features/catalog/searchEpic';
import type { RootAction, RootState } from './rootReducer';

export const rootEpic: Epic<RootAction, RootAction, RootState> = combineEpics(
  searchEpic as Epic<RootAction, RootAction, RootState>,
);
