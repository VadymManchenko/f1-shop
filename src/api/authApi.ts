import { HttpClient } from './HttpClient';
import type { AuthCredentials, RegisterPayload, User } from '@/types/domain';

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthApi extends HttpClient {
  constructor() {
    super(`${import.meta.env.BASE_URL}api`);
  }

  login(payload: AuthCredentials): Promise<AuthResponse> {
    return this.post<AuthResponse, AuthCredentials>('/auth/login', payload);
  }

  register(payload: RegisterPayload): Promise<AuthResponse> {
    return this.post<AuthResponse, RegisterPayload>('/auth/register', payload);
  }

  me(): Promise<User> {
    return this.get<User>('/auth/me');
  }

  update(payload: { firstName: string; lastName: string; email: string }): Promise<User> {
    return this.put<User, typeof payload>('/auth/me', payload);
  }
}

export const authApi = new AuthApi();
