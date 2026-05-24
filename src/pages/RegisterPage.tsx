import { RegisterForm } from '@/features/auth/RegisterForm';

export function RegisterPage() {
  return (
    <section className="container-page py-16 max-w-md">
      <p className="eyebrow">Аутентифікація</p>
      <h1 className="font-display text-4xl tracking-tight mt-2 mb-10">Реєстрація</h1>
      <RegisterForm />
    </section>
  );
}
