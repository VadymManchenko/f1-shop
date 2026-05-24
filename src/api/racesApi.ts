import { HttpClient } from './HttpClient';
import type { Race } from '@/types/domain';

class RacesApi extends HttpClient {
  constructor() {
    super(`${import.meta.env.BASE_URL}api`);
  }

  list(): Promise<Race[]> {
    return this.get<Race[]>('/races');
  }
}

export const racesApi = new RacesApi();
