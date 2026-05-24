import { cartActions, cartReducer, CartState } from './cartSlice';
import type { Product } from '@/types/domain';

const makeProduct = (id: string): Product => ({
  id,
  title: `Product ${id}`,
  team: 'ferrari',
  category: 'cap',
  group: 'apparel',
  price: 50,
  currency: 'EUR',
  description: '',
  image: '',
  stock: 10,
  createdAt: '2026-01-01',
});

const p1 = makeProduct('p1');
const p2 = makeProduct('p2');

const EMPTY: CartState = { items: [] };

describe('cartReducer', () => {
  it('додає новий товар', () => {
    const next = cartReducer(EMPTY, cartActions.add(p1, 2));
    expect(next.items).toEqual([{ product: p1, quantity: 2 }]);
  });

  it('інкрементує кількість при повторному додаванні', () => {
    const state: CartState = { items: [{ product: p1, quantity: 1 }] };
    const next = cartReducer(state, cartActions.add(p1, 3));
    expect(next.items).toEqual([{ product: p1, quantity: 4 }]);
  });

  it('видаляє товар', () => {
    const state: CartState = {
      items: [
        { product: p1, quantity: 1 },
        { product: p2, quantity: 2 },
      ],
    };
    const next = cartReducer(state, cartActions.remove('p1'));
    expect(next.items).toEqual([{ product: p2, quantity: 2 }]);
  });

  it('setQty=0 знімає товар з кошика', () => {
    const state: CartState = { items: [{ product: p1, quantity: 5 }] };
    const next = cartReducer(state, cartActions.setQty('p1', 0));
    expect(next.items).toEqual([]);
  });

  it('setQty оновлює кількість', () => {
    const state: CartState = { items: [{ product: p1, quantity: 5 }] };
    const next = cartReducer(state, cartActions.setQty('p1', 2));
    expect(next.items).toEqual([{ product: p1, quantity: 2 }]);
  });

  it('clear очищує кошик', () => {
    const state: CartState = { items: [{ product: p1, quantity: 5 }] };
    const next = cartReducer(state, cartActions.clear());
    expect(next.items).toEqual([]);
  });
});
