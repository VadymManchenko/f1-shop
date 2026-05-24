export type FieldError = string | undefined;

export const required = (value: unknown): FieldError =>
  value === undefined || value === null || value === '' ? 'Обовʼязкове поле' : undefined;

export const email = (value: string): FieldError => {
  if (!value) return undefined;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : 'Некоректний email';
};

export const minLength = (n: number) => (value: string): FieldError => {
  if (!value) return undefined;
  return value.length >= n ? undefined : `Мінімум ${n} символів`;
};

export const maxLength = (n: number) => (value: string): FieldError => {
  if (!value) return undefined;
  return value.length <= n ? undefined : `Максимум ${n} символів`;
};

export const matchesField = (otherField: string, label: string) =>
  <A extends object>(value: string, allValues: A): FieldError => {
    const other = (allValues as Record<string, unknown>)[otherField];
    return value === other ? undefined : `Має збігатися з полем «${label}»`;
  };

export function luhn(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\s+/g, '');
  if (!/^\d{12,19}$/.test(digits)) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

export const cardNumber = (value: string): FieldError => {
  if (!value) return undefined;
  return luhn(value) ? undefined : 'Невалідний номер картки';
};

export const postalCode = (value: string): FieldError => {
  if (!value) return undefined;
  return /^[A-Z0-9\- ]{3,10}$/i.test(value) ? undefined : 'Невалідний індекс';
};

export const composeValidators =
  <V, A extends object>(
    ...validators: Array<(value: V, allValues: A) => FieldError>
  ) =>
  (value: V, allValues: A): FieldError => {
    for (const v of validators) {
      const err = v(value, allValues);
      if (err) return err;
    }
    return undefined;
  };
