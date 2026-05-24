import type { ThunkAction } from 'redux-thunk';
import type { AnyAction } from 'redux';
import { authApi } from '@/api/authApi';
import { authActions } from './authSlice';
import type { RootState } from '@/app/rootReducer';
import type { AuthCredentials, RegisterPayload } from '@/types/domain';

const TOKEN_KEY = 'f1store.token';
const USER_KEY = 'f1store.user';

type AppThunk<R = void> = ThunkAction<Promise<R>, RootState, unknown, AnyAction>;

export function loginThunk(credentials: AuthCredentials): AppThunk<boolean> {
  return async (dispatch) => {
    dispatch(authActions.loginRequest());
    try {
      const { user, token } = await authApi.login(credentials);
      window.localStorage.setItem(TOKEN_KEY, token);
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
      dispatch(authActions.loginSuccess(user, token));
      return true;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Помилка входу';
      dispatch(authActions.loginFailure(message));
      return false;
    }
  };
}

export function registerThunk(payload: RegisterPayload): AppThunk<boolean> {
  return async (dispatch) => {
    dispatch(authActions.loginRequest());
    try {
      const { user, token } = await authApi.register(payload);
      window.localStorage.setItem(TOKEN_KEY, token);
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
      dispatch(authActions.loginSuccess(user, token));
      return true;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Помилка реєстрації';
      dispatch(authActions.loginFailure(message));
      return false;
    }
  };
}

export function updateProfileThunk(payload: {
  firstName: string;
  lastName: string;
  email: string;
}): AppThunk<boolean> {
  return async (dispatch) => {
    try {
      const updated = await authApi.update(payload);
      window.localStorage.setItem(USER_KEY, JSON.stringify(updated));
      dispatch(authActions.updateUser(updated));
      return true;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Помилка збереження';
      dispatch(authActions.loginFailure(message));
      return false;
    }
  };
}

export function logoutThunk(): AppThunk {
  return async (dispatch) => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    dispatch(authActions.logout());
  };
}

export function hydrateAuthThunk(): AppThunk {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const userRaw = window.localStorage.getItem(USER_KEY);
    if (!token || !userRaw) return;
    try {
      const user = JSON.parse(userRaw);
      dispatch(authActions.loginSuccess(user, token));
    } catch {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(USER_KEY);
    }
  };
}
