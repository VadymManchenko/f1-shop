import { all, fork } from 'redux-saga/effects';
import { checkoutSaga } from '@/features/checkout/checkoutSaga';

export function* rootSaga() {
  yield all([fork(checkoutSaga)]);
}
