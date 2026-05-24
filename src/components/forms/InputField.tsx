import type { WrappedFieldProps } from 'redux-form';
import clsx from 'clsx';

interface InputFieldProps extends WrappedFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
}

export function InputField({
  input,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  disabled,
  meta: { touched, error },
}: InputFieldProps) {
  const hasError = Boolean(touched && error);

  return (
    <div className="space-y-2">
      <label className="label" htmlFor={input.name}>
        {label}
      </label>
      <input
        {...input}
        id={input.name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className={clsx('input', hasError && 'border-red-600 focus:border-red-600')}
      />
      <p
        className={clsx(
          'text-xs min-h-[1rem] transition-colors',
          hasError ? 'text-red-600' : 'text-transparent',
        )}
      >
        {hasError ? error : ' '}
      </p>
    </div>
  );
}
