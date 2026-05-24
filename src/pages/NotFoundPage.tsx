import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="container-page py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display text-6xl tracking-tight mt-4 mb-8">
        Сторінку не знайдено
      </h1>
      <Link to="/" className="btn-ghost">
        На головну
      </Link>
    </section>
  );
}
