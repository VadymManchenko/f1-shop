import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class HttpClient {
  protected readonly client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10_000,
      headers: { 'Content-Type': 'application/json' },
    });

    this.client.interceptors.request.use((config) => {
      const token = typeof window !== 'undefined'
        ? window.localStorage.getItem('f1store.token')
        : null;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (r) => r,
      (error) => Promise.reject(this.normalizeError(error)),
    );
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.client.get<T>(url, config);
    return data;
  }

  protected async post<T, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const { data } = await this.client.post<T>(url, body, config);
    return data;
  }

  protected async put<T, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const { data } = await this.client.put<T>(url, body, config);
    return data;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.client.delete<T>(url, config);
    return data;
  }

  private normalizeError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message ??
        'Network error';
      return new Error(message);
    }
    return error instanceof Error ? error : new Error('Unknown error');
  }
}
