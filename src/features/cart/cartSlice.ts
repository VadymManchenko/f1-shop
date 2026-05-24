import type { Product } from '@/types/domain';

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartLine[];
}

const initialState: CartState = { items: [] };

export const CART_ADD = 'cart/add' as const;
export const CART_REMOVE = 'cart/remove' as const;
export const CART_SET_QTY = 'cart/setQty' as const;
export const CART_CLEAR = 'cart/clear' as const;

interface AddAction {
  type: typeof CART_ADD;
  payload: { product: Product; quantity: number };
}
interface RemoveAction {
  type: typeof CART_REMOVE;
  payload: { productId: string };
}
interface SetQtyAction {
  type: typeof CART_SET_QTY;
  payload: { productId: string; quantity: number };
}
interface ClearAction {
  type: typeof CART_CLEAR;
}

export type CartAction = AddAction | RemoveAction | SetQtyAction | ClearAction;

export const cartActions = {
  add: (product: Product, quantity = 1): AddAction => ({
    type: CART_ADD,
    payload: { product, quantity },
  }),
  remove: (productId: string): RemoveAction => ({
    type: CART_REMOVE,
    payload: { productId },
  }),
  setQty: (productId: string, quantity: number): SetQtyAction => ({
    type: CART_SET_QTY,
    payload: { productId, quantity },
  }),
  clear: (): ClearAction => ({ type: CART_CLEAR }),
};

export function cartReducer(
  state: CartState = initialState,
  action: CartAction,
): CartState {
  switch (action.type) {
    case CART_ADD: {
      const { product, quantity } = action.payload;
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          ),
        };
      }
      return { items: [...state.items, { product, quantity }] };
    }
    case CART_REMOVE:
      return {
        items: state.items.filter((i) => i.product.id !== action.payload.productId),
      };
    case CART_SET_QTY: {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== productId) };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === productId ? { ...i, quantity } : i,
        ),
      };
    }
    case CART_CLEAR:
      return initialState;
    default:
      return state;
  }
}
