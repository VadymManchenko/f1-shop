import { HttpClient } from './HttpClient';
import type { Order, CartItem } from '@/types/domain';

export interface CreateOrderPayload {
  userId: string;
  items: CartItem[];
  shipping: {
    address: string;
    city: string;
    postalCode: string;
  };
}

class OrdersApi extends HttpClient {
  constructor() {
    super(`${import.meta.env.BASE_URL}api`);
  }

  create = (payload: CreateOrderPayload): Promise<Order> => {
    return this.post<Order, CreateOrderPayload>('/orders', payload);
  };

  listByUser = (userId: string): Promise<Order[]> => {
    return this.get<Order[]>(`/orders`, { params: { userId } });
  };
}

export const ordersApi = new OrdersApi();
