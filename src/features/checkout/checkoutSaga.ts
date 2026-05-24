import { call, put, select, takeLatest } from 'redux-saga/effects';
import { reset as resetForm } from 'redux-form';
import {
  CHECKOUT_SUBMIT,
  checkoutActions,
  CheckoutAction,
} from './checkoutSlice';
import { cartActions, CartLine } from '@/features/cart/cartSlice';
import { ordersApi } from '@/api/ordersApi';
import type { RootState } from '@/app/rootReducer';
import type { Order } from '@/types/domain';

function* handleSubmit(action: Extract<CheckoutAction, { type: typeof CHECKOUT_SUBMIT }>) {
  try {
    const items: CartLine[] = yield select((s: RootState) => s.cart.items);
    const userId: string = yield select((s: RootState) => s.auth.user?.id ?? 'guest');

    if (items.length === 0) {
      yield put(checkoutActions.failure('Кошик порожній'));
      return;
    }

    const apiItems = items.map(({ product, quantity }) => ({
      productId: product.id,
      quantity,
    }));

    const order: Order = yield call(ordersApi.create, {
      userId,
      items: apiItems,
      shipping: action.payload,
    });

    yield put(checkoutActions.success(order));
    yield put(cartActions.clear());
    yield put(resetForm('checkout'));
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Помилка оформлення замовлення';
    yield put(checkoutActions.failure(message));
  }
}

export function* checkoutSaga() {
  yield takeLatest(CHECKOUT_SUBMIT, handleSubmit);
}
