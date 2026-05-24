import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authReducer, AuthAction } from '@/features/auth/authSlice';
import { cartReducer, CartAction } from '@/features/cart/cartSlice';
import { searchReducer, SearchAction } from '@/features/catalog/searchSlice';
import { checkoutReducer, CheckoutAction } from '@/features/checkout/checkoutSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  search: searchReducer,
  checkout: checkoutReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type RootAction =
  | AuthAction
  | CartAction
  | SearchAction
  | CheckoutAction;
