import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { cartActions } from '@/features/cart/cartSlice';
import { TEAM_LABEL, TEAM_ACCENT } from '@/features/catalog/teamPalette';
import { assetUrl } from '@/lib/assetUrl';

export function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal > 0 ? Math.ceil(subtotal * 0.1) : 0;
  const total = subtotal + shipping;

  return (
    <section className="container-page py-16">
      <p className="eyebrow">Кошик</p>
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mt-2 mb-10">
        Ваше замовлення
      </h1>

      {items.length === 0 ? (
        <div className="card p-16 text-center">
          <p className="text-ink-400 mb-6">Поки що порожньо.</p>
          <Link to="/catalog" className="btn-ghost">
            Перейти до каталогу
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          <ul className="divide-y divide-ink-100 border-y border-ink-100">
            {items.map(({ product, quantity }) => {
              const accent = TEAM_ACCENT[product.team];
              return (
                <li key={product.id} className="flex gap-6 py-6">
                  <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-ink-100">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(120% 80% at 30% 20%, ${accent}33 0%, transparent 60%), linear-gradient(135deg, #f7f7f7 0%, #e5e5e5 100%)`,
                      }}
                      aria-hidden="true"
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
                      className="absolute left-0 bottom-0 h-0.5 w-full"
                      style={{ backgroundColor: accent }}
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <Link
                      to={`/product/${product.id}`}
                      className="font-display text-lg leading-snug hover:underline"
                    >
                      {product.title}
                    </Link>
                    <span className="text-xs uppercase tracking-widest text-ink-400 mt-1">
                      {TEAM_LABEL[product.team]}
                    </span>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(cartActions.setQty(product.id, quantity - 1))
                          }
                          className="w-8 h-8 border border-ink-200 hover:border-ink-900 transition-colors"
                          aria-label="Зменшити"
                        >
                          −
                        </button>
                        <span className="font-mono text-sm w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(cartActions.setQty(product.id, quantity + 1))
                          }
                          className="w-8 h-8 border border-ink-200 hover:border-ink-900 transition-colors"
                          aria-label="Збільшити"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => dispatch(cartActions.remove(product.id))}
                          className="ml-2 w-8 h-8 inline-flex items-center justify-center
                            border border-red-600 bg-red-600 text-white
                            hover:bg-red-700 hover:border-red-700 transition-colors"
                          aria-label="Видалити"
                          title="Видалити"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                      <span className="font-mono">
                        {product.price * quantity}
                        <span className="text-ink-400 text-xs ml-1">EUR</span>
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="card p-6 h-fit space-y-5">
            <p className="eyebrow">Підсумок</p>
            <div className="flex justify-between">
              <span className="text-sm text-ink-500">Сума</span>
              <span className="font-mono">{subtotal} EUR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-ink-500">Доставка (10%)</span>
              <span className="font-mono">{shipping} EUR</span>
            </div>
            <div className="divider" />
            <div className="flex justify-between text-lg">
              <span className="font-display">До сплати</span>
              <span className="font-mono">{total} EUR</span>
            </div>
            <Link to="/checkout" className="btn-primary w-full">
              Оформити замовлення
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 4h10 M6.5 4v-1.5h3V4 M5 4l0.5 9.5h5L11 4 M7 6.5v5 M9 6.5v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
