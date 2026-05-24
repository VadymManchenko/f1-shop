import type { User } from '@/types/domain';

export interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

export const AUTH_LOGIN_REQUEST = 'auth/loginRequest' as const;
export const AUTH_LOGIN_SUCCESS = 'auth/loginSuccess' as const;
export const AUTH_LOGIN_FAILURE = 'auth/loginFailure' as const;
export const AUTH_LOGOUT = 'auth/logout' as const;
export const AUTH_UPDATE_USER = 'auth/updateUser' as const;

interface LoginRequest {
  type: typeof AUTH_LOGIN_REQUEST;
}
interface LoginSuccess {
  type: typeof AUTH_LOGIN_SUCCESS;
  payload: { user: User; token: string };
}
interface LoginFailure {
  type: typeof AUTH_LOGIN_FAILURE;
  payload: { error: string };
}
interface Logout {
  type: typeof AUTH_LOGOUT;
}
interface UpdateUser {
  type: typeof AUTH_UPDATE_USER;
  payload: User;
}

export type AuthAction =
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | Logout
  | UpdateUser;

export const authActions = {
  loginRequest: (): LoginRequest => ({ type: AUTH_LOGIN_REQUEST }),
  loginSuccess: (user: User, token: string): LoginSuccess => ({
    type: AUTH_LOGIN_SUCCESS,
    payload: { user, token },
  }),
  loginFailure: (error: string): LoginFailure => ({
    type: AUTH_LOGIN_FAILURE,
    payload: { error },
  }),
  logout: (): Logout => ({ type: AUTH_LOGOUT }),
  updateUser: (user: User): UpdateUser => ({
    type: AUTH_UPDATE_USER,
    payload: user,
  }),
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { ...state, status: 'loading', error: null };
    case AUTH_LOGIN_SUCCESS:
      return {
        user: action.payload.user,
        token: action.payload.token,
        status: 'authenticated',
        error: null,
      };
    case AUTH_LOGIN_FAILURE:
      return { ...state, status: 'error', error: action.payload.error };
    case AUTH_LOGOUT:
      return initialState;
    case AUTH_UPDATE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
