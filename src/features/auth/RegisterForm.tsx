import { Field, reduxForm, SubmissionError, InjectedFormProps } from 'redux-form';
import { useNavigate, Link } from 'react-router-dom';
import { InputField } from '@/components/forms/InputField';
import { useAppDispatch } from '@/app/hooks';
import { registerThunk } from './authThunks';
import {
  composeValidators,
  email,
  matchesField,
  maxLength,
  minLength,
  required,
} from './validators';
import type { RegisterPayload } from '@/types/domain';

interface RegisterFormValues extends RegisterPayload {
  passwordConfirm: string;
}

const validateName = composeValidators<string, RegisterFormValues>(
  required,
  minLength(2),
  maxLength(40),
);
const validateEmail = composeValidators<string, RegisterFormValues>(required, email);
const validatePassword = composeValidators<string, RegisterFormValues>(
  required,
  minLength(6),
);
const validatePasswordConfirm = composeValidators<string, RegisterFormValues>(
  required,
  matchesField('password', 'Пароль'),
);

function RegisterFormInner({
  handleSubmit,
  submitting,
  error,
}: InjectedFormProps<RegisterFormValues>) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: RegisterFormValues) => {
    const { passwordConfirm: _drop, ...payload } = values;
    const ok = await dispatch(registerThunk(payload));
    if (!ok) {
      throw new SubmissionError({ _error: 'Не вдалося створити акаунт' });
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-10 space-y-2" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <Field
          name="firstName"
          component={InputField}
          label="Імʼя"
          autoComplete="given-name"
          validate={validateName}
        />
        <Field
          name="lastName"
          component={InputField}
          label="Прізвище"
          autoComplete="family-name"
          validate={validateName}
        />
      </div>
      <Field
        name="email"
        component={InputField}
        label="Email"
        type="email"
        autoComplete="email"
        validate={validateEmail}
      />
      <Field
        name="password"
        component={InputField}
        label="Пароль"
        type="password"
        autoComplete="new-password"
        validate={validatePassword}
      />
      <Field
        name="passwordConfirm"
        component={InputField}
        label="Підтвердіть пароль"
        type="password"
        autoComplete="new-password"
        validate={validatePasswordConfirm}
      />

      {error && (
        <p className="text-xs text-red-600 -mt-2 pb-2 tracking-wide">{error}</p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? 'Створення...' : 'Створити акаунт'}
      </button>

      <p className="text-center text-xs text-ink-400 pt-4">
        Вже є акаунт?{' '}
        <Link to="/login" className="text-ink-900 underline underline-offset-4">
          Увійти
        </Link>
      </p>
    </form>
  );
}

export const RegisterForm = reduxForm<RegisterFormValues>({
  form: 'register',
})(RegisterFormInner);
