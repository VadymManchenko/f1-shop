import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckoutForm } from '@/features/checkout/CheckoutForm';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { checkoutActions } from '@/features/checkout/checkoutSlice';

export function CheckoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, order, error } = useAppSelector((s) => s.checkout);
  const cartCount = useAppSelector((s) => s.cart.items.length);

  useEffect(() => {
    return () => {
      dispatch(checkoutActions.reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === 'idle' && cartCount === 0) {
      navigate('/cart', { replace: true });
    }
  }, [status, cartCount, navigate]);

  if (status === 'success' && order) {
    return (
      <section className="container-page py-16 max-w-2xl">
        <p className="eyebrow">Готово</p>
        <h1 className="font-display text-4xl tracking-tight mt-2 mb-10">
          Замовлення прийнято
        </h1>
        <div className="card p-10 space-y-6">
          <div className="flex justify-between">
            <span className="text-sm text-ink-500">Номер</span>
            <span className="font-mono">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-ink-500">Сума</span>
            <span className="font-mono">{order.total} EUR</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-ink-500">Статус</span>
            <span className="text-xs uppercase tracking-widest">{order.status}</span>
          </div>
          <div className="divider" />
          <Link to="/catalog" className="btn-ghost w-full">
            Продовжити покупки
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-16 max-w-2xl">
      <p className="eyebrow">Оформлення</p>
      <h1 className="font-display text-4xl tracking-tight mt-2 mb-10">
        Доставка та оплата
      </h1>

      {error && (
        <div className="card border-red-200 bg-red-50 p-4 mb-6 text-sm text-red-700">
          {error}
        </div>
      )}

      <CheckoutForm disabled={status === 'submitting'} />
    </section>
  );
}
