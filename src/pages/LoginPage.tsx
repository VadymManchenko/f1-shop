import { LoginForm } from '@/features/auth/LoginForm';

export function LoginPage() {
  return (
    <section className="container-page py-16 max-w-md">
      <p className="eyebrow">Аутентифікація</p>
      <h1 className="font-display text-4xl tracking-tight mt-2 mb-10">Увійти</h1>
      <LoginForm />
    </section>
  );
}
