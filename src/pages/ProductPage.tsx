import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch } from '@/app/hooks';
import { useProduct } from '@/features/catalog/useProducts';
import { cartActions } from '@/features/cart/cartSlice';
import { StartLightsLoader } from '@/components/StartLightsLoader';
import {
  TEAM_LABEL,
  TEAM_ACCENT,
  CATEGORY_LABEL,
} from '@/features/catalog/teamPalette';

export function ProductPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data: product, isLoading, isError } = useProduct(id);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1200);
    return () => window.clearTimeout(t);
  }, [added]);

  if (isLoading) {
    return (
      <section className="container-page py-16">
        <StartLightsLoader label="Завантаження товару" />
      </section>
    );
  }

  if (isError || !product) {
    return (
      <section className="container-page py-32 text-center">
        <p className="eyebrow">Помилка</p>
        <h1 className="font-display text-4xl mt-4 mb-8">Товар не знайдено</h1>
        <Link to="/catalog" className="btn-ghost">
          Назад до каталогу
        </Link>
      </section>
    );
  }

  const accent = TEAM_ACCENT[product.team];

  return (
    <section className="container-page py-16">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="relative aspect-[4/3] bg-ink-100 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 80% at 30% 20%, ${accent}33 0%, transparent 60%), linear-gradient(135deg, #f7f7f7 0%, #e5e5e5 100%)`,
            }}
          />
          <img
            src={product.image}
            alt=""
            className="relative h-full w-full object-cover opacity-0 transition-opacity duration-300"
            onLoad={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = '1';
            }}
          />
          <div
            className="absolute left-0 bottom-0 h-1.5 w-full"
            style={{ backgroundColor: accent }}
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: accent }}
            >
              {TEAM_LABEL[product.team]}
            </span>
            <span className="h-px w-8 bg-ink-200" />
            <span className="text-xs text-ink-400 uppercase tracking-widest">
              {CATEGORY_LABEL[product.category]}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl tracking-tight">
            {product.title}
          </h1>

          <p className="text-ink-500 leading-relaxed">{product.description}</p>

          <div className="divider" />

          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow mb-1">Ціна</p>
              <p className="font-mono text-3xl">
                {product.price} <span className="text-ink-400 text-base">EUR</span>
              </p>
            </div>
            <p className="text-xs text-ink-400 uppercase tracking-widest">
              На складі: {product.stock}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                dispatch(cartActions.add(product));
                setAdded(true);
              }}
              className={clsx(
                'btn flex-1 transition-colors duration-200',
                added
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'btn-primary',
              )}
            >
              {added ? (
                <span className="inline-flex items-center gap-2 animate-added-pop">
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M3 8.5 L6.5 12 L13 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Додано в кошик
                </span>
              ) : (
                'Додати в кошик'
              )}
            </button>
            <Link to="/catalog" className="btn-ghost">
              Каталог
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
