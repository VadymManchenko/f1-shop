import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { productsApi, ProductListQuery } from '@/api/productsApi';
import type { Product } from '@/types/domain';

export function useProducts(query: ProductListQuery) {
  return useQuery<Product[]>({
    queryKey: ['products', query],
    queryFn: () => productsApi.list(query),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}

export function useProduct(id: string | undefined) {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => productsApi.byId(id as string),
    enabled: Boolean(id),
  });
}
