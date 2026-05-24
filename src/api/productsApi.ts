import { HttpClient } from './HttpClient';
import type { Product, Team, Category } from '@/types/domain';

export interface ProductListQuery {
  query?: string;
  teams?: Team[];
  categories?: Category[];
  sortBy?: 'newest' | 'price-asc' | 'price-desc';
}

class ProductsApi extends HttpClient {
  constructor() {
    super(`${import.meta.env.BASE_URL}api`);
  }

  list(query: ProductListQuery = {}): Promise<Product[]> {
    return this.get<Product[]>('/products', { params: this.serializeQuery(query) });
  }

  byId(id: string): Promise<Product> {
    return this.get<Product>(`/products/${id}`);
  }

  search(query: string): Promise<Product[]> {
    return this.get<Product[]>('/products', { params: { query } });
  }

  private serializeQuery(q: ProductListQuery): Record<string, string | undefined> {
    return {
      query: q.query || undefined,
      teams: q.teams?.length ? q.teams.join(',') : undefined,
      categories: q.categories?.length ? q.categories.join(',') : undefined,
      sortBy: q.sortBy,
    };
  }
}

export const productsApi = new ProductsApi();
