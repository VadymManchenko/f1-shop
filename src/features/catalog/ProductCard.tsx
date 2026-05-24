import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type { Product } from '@/types/domain';
import { TEAM_ACCENT, TEAM_LABEL, CATEGORY_LABEL } from './teamPalette';
import { assetUrl } from '@/lib/assetUrl';

interface Props {
  product: Product;
  onAdd?: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: Props) {
  const accent = TEAM_ACCENT[product.team];
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const id = window.setTimeout(() => setAdded(false), 1200);
    return () => window.clearTimeout(id);
  }, [added]);

  return (
    <article className="card group flex flex-col transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1 hover:shadow-2xl hover:border-ink-300">
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-ink-100"
      >
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={{
            background: `radial-gradient(120% 80% at 30% 20%, ${accent}33 0%, transparent 60%), linear-gradient(135deg, #f7f7f7 0%, #e5e5e5 100%)`,
          }}
        />
        <img
          src={assetUrl(product.image)}
          alt=""
          loading="lazy"
          className="relative h-full w-full object-cover opacity-0 transition-opacity duration-300"
          onLoad={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = '1';
          }}
        />
        <div
          className="absolute left-0 bottom-0 h-1 w-full"
          style={{ backgroundColor: accent }}
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-medium uppercase tracking-widest"
            style={{ color: accent }}
          >
            {TEAM_LABEL[product.team]}
          </span>
          <span className="text-[10px] text-ink-400 uppercase tracking-widest">
            {CATEGORY_LABEL[product.category]}
          </span>
        </div>

        <h3 className="font-display text-lg leading-snug">{product.title}</h3>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-mono text-lg">
            {product.price}
            <span className="text-ink-400 text-sm ml-1">EUR</span>
          </span>
          <button
            type="button"
            onClick={() => {
              onAdd?.(product);
              setAdded(true);
            }}
            className={clsx(
              'btn py-2 px-3 text-xs transition-colors duration-200',
              added
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'btn-ghost',
            )}
          >
            {added ? (
              <span className="inline-flex items-center gap-1 animate-added-pop">
                <Check />
                <span>Додано</span>
              </span>
            ) : (
              'У кошик'
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8.5 L6.5 12 L13 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
