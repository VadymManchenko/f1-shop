import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Field,
  reduxForm,
  SubmissionError,
  InjectedFormProps,
} from 'redux-form';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { InputField } from '@/components/forms/InputField';
import { logoutThunk, updateProfileThunk } from '@/features/auth/authThunks';
import {
  composeValidators,
  email,
  maxLength,
  minLength,
  required,
} from '@/features/auth/validators';

interface ProfileValues {
  firstName: string;
  lastName: string;
  email: string;
}

const validateName = composeValidators<string, ProfileValues>(
  required,
  minLength(2),
  maxLength(40),
);
const validateEmail = composeValidators<string, ProfileValues>(required, email);

function ProfileFormInner({
  handleSubmit,
  submitting,
  pristine,
  error,
  onSaved,
}: InjectedFormProps<ProfileValues, { onSaved: () => void }> & {
  onSaved: () => void;
}) {
  const dispatch = useAppDispatch();

  const onSubmit = async (values: ProfileValues) => {
    const ok = await dispatch(updateProfileThunk(values));
    if (!ok) {
      throw new SubmissionError({ _error: 'Не вдалося зберегти зміни' });
    }
    onSaved();
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

      {error && (
        <p className="text-xs text-red-600 -mt-2 pb-2 tracking-wide">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting || pristine}
        className="btn-primary w-full"
      >
        {submitting ? 'Збереження...' : 'Зберегти зміни'}
      </button>
    </form>
  );
}

const ProfileForm = reduxForm<ProfileValues, { onSaved: () => void }>({
  form: 'profile',
  enableReinitialize: true,
})(ProfileFormInner);

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const t = window.setTimeout(() => setSaved(false), 2400);
    return () => window.clearTimeout(t);
  }, [saved]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="container-page py-16 max-w-xl">
      <p className="eyebrow">Акаунт</p>
      <h1 className="font-display text-4xl tracking-tight mt-2 mb-2">
        {user.firstName} {user.lastName}
      </h1>
      <p className="text-sm text-ink-400 mb-10 font-mono">{user.id}</p>

      {saved && (
        <div className="border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm p-4 mb-6">
          Зміни збережено.
        </div>
      )}

      <ProfileForm
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }}
        onSaved={() => setSaved(true)}
      />

      <button
        type="button"
        onClick={() => dispatch(logoutThunk())}
        className="btn-ghost w-full mt-4"
      >
        Вийти з акаунту
      </button>
    </section>
  );
}
