import type { Order } from '@/types/domain';

export interface CheckoutState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  order: Order | null;
  error: string | null;
}

const initialState: CheckoutState = {
  status: 'idle',
  order: null,
  error: null,
};

export const CHECKOUT_SUBMIT = 'checkout/submit' as const;
export const CHECKOUT_SUCCESS = 'checkout/success' as const;
export const CHECKOUT_FAILURE = 'checkout/failure' as const;
export const CHECKOUT_RESET = 'checkout/reset' as const;

interface SubmitAction {
  type: typeof CHECKOUT_SUBMIT;
  payload: {
    address: string;
    city: string;
    postalCode: string;
  };
}
interface SuccessAction {
  type: typeof CHECKOUT_SUCCESS;
  payload: Order;
}
interface FailureAction {
  type: typeof CHECKOUT_FAILURE;
  payload: string;
}
interface ResetAction {
  type: typeof CHECKOUT_RESET;
}

export type CheckoutAction = SubmitAction | SuccessAction | FailureAction | ResetAction;

export const checkoutActions = {
  submit: (payload: SubmitAction['payload']): SubmitAction => ({
    type: CHECKOUT_SUBMIT,
    payload,
  }),
  success: (order: Order): SuccessAction => ({ type: CHECKOUT_SUCCESS, payload: order }),
  failure: (error: string): FailureAction => ({ type: CHECKOUT_FAILURE, payload: error }),
  reset: (): ResetAction => ({ type: CHECKOUT_RESET }),
};

export function checkoutReducer(
  state: CheckoutState = initialState,
  action: CheckoutAction,
): CheckoutState {
  switch (action.type) {
    case CHECKOUT_SUBMIT:
      return { status: 'submitting', order: null, error: null };
    case CHECKOUT_SUCCESS:
      return { status: 'success', order: action.payload, error: null };
    case CHECKOUT_FAILURE:
      return { status: 'error', order: null, error: action.payload };
    case CHECKOUT_RESET:
      return initialState;
    default:
      return state;
  }
}
