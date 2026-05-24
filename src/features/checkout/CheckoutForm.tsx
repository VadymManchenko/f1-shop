import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { InputField } from '@/components/forms/InputField';
import { useAppDispatch } from '@/app/hooks';
import { checkoutActions } from './checkoutSlice';
import {
  composeValidators,
  minLength,
  postalCode as postalCodeValidator,
  required,
} from '@/features/auth/validators';

export interface CheckoutFormValues {
  address: string;
  city: string;
  postalCode: string;
}

const validateAddress = composeValidators<string, CheckoutFormValues>(required, minLength(5));
const validateCity = composeValidators<string, CheckoutFormValues>(required, minLength(2));
const validatePostal = composeValidators<string, CheckoutFormValues>(required, postalCodeValidator);

interface OwnProps {
  disabled?: boolean;
}

function CheckoutFormInner({
  handleSubmit,
  submitting,
  disabled,
}: InjectedFormProps<CheckoutFormValues, OwnProps> & OwnProps) {
  const dispatch = useAppDispatch();

  const onSubmit = (values: CheckoutFormValues) => {
    dispatch(checkoutActions.submit(values));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-10 space-y-2" noValidate>
      <Field
        name="address"
        component={InputField}
        label="Адреса"
        placeholder="вул. Соборна, 95, кв. 4"
        autoComplete="street-address"
        validate={validateAddress}
        disabled={disabled}
      />
      <div className="grid grid-cols-[1fr_160px] gap-4">
        <Field
          name="city"
          component={InputField}
          label="Місто"
          autoComplete="address-level2"
          validate={validateCity}
          disabled={disabled}
        />
        <Field
          name="postalCode"
          component={InputField}
          label="Індекс"
          autoComplete="postal-code"
          validate={validatePostal}
          disabled={disabled}
        />
      </div>
      <button
        type="submit"
        disabled={submitting || disabled}
        className="btn-primary w-full mt-2"
      >
        {submitting || disabled ? 'Оформлення...' : 'Підтвердити замовлення'}
      </button>

      <p className="text-center text-xs text-ink-400 pt-4">
        Оплата при отриманні
      </p>
    </form>
  );
}

export const CheckoutForm = reduxForm<CheckoutFormValues, OwnProps>({
  form: 'checkout',
})(CheckoutFormInner);
