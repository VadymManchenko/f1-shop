import { Field, reduxForm, SubmissionError, InjectedFormProps } from 'redux-form';
import { useNavigate, Link } from 'react-router-dom';
import { InputField } from '@/components/forms/InputField';
import { useAppDispatch } from '@/app/hooks';
import { loginThunk } from './authThunks';
import { composeValidators, email, minLength, required } from './validators';
import type { AuthCredentials } from '@/types/domain';

const validateEmail = composeValidators<string, AuthCredentials>(required, email);
const validatePassword = composeValidators<string, AuthCredentials>(required, minLength(6));

function LoginFormInner({
  handleSubmit,
  submitting,
  error,
}: InjectedFormProps<AuthCredentials>) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: AuthCredentials) => {
    const ok = await dispatch(loginThunk(values));
    if (!ok) {
      throw new SubmissionError({ _error: 'Невірний email або пароль' });
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-10 space-y-2" noValidate>
      <Field
        name="email"
        component={InputField}
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        validate={validateEmail}
      />
      <Field
        name="password"
        component={InputField}
        label="Пароль"
        type="password"
        autoComplete="current-password"
        validate={validatePassword}
      />

      {error && (
        <p className="text-xs text-red-600 -mt-2 pb-2 tracking-wide">{error}</p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? 'Вхід...' : 'Увійти'}
      </button>

      <p className="text-center text-xs text-ink-400 pt-4">
        Немає акаунту?{' '}
        <Link to="/register" className="text-ink-900 underline underline-offset-4">
          Створити
        </Link>
      </p>
    </form>
  );
}

export const LoginForm = reduxForm<AuthCredentials>({
  form: 'login',
})(LoginFormInner);
