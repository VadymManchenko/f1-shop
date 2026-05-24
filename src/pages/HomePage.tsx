import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <section className="container-page pt-4 pb-8 lg:pt-6 lg:pb-10">
      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-12 items-center">
        <div>
          <p className="eyebrow mb-4">Season 2026 · Official merch</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]">
            Атрибутика
            <br />
            та аксесуари
            <br />
            Формули&nbsp;1.
          </h1>
          <div className="mt-6">
            <Link to="/catalog" className="btn-primary">
              Дивитись каталог
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] lg:aspect-square w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 60% at 50% 50%, rgba(220,0,0,0.10) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
          <img
            src="/helmet.png"
            alt="Шолом пілота Формули-1"
            className="relative h-full w-full object-contain object-center"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
            }}
          />
        </div>
      </div>

      <div className="mt-8 lg:mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-100 border border-ink-100">
        {[
          { value: '10', label: 'Команд' },
          { value: '120+', label: 'Товарів' },
          { value: '24', label: 'Гран-прі' },
          { value: '01', label: 'Магазин' },
        ].map((s, i) => (
          <div
            key={s.label}
            className="bg-white p-6 animate-stat-in"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="font-mono text-xs text-ink-400 mb-2">{s.label}</div>
            <div className="font-display text-3xl lg:text-4xl">{s.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
