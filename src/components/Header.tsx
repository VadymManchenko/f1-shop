import { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import { useAppSelector } from '@/app/hooks';
import { SearchBox } from '@/features/catalog/SearchBox';

const navItems = [
  { to: '/', label: 'Головна', end: true },
  { to: '/catalog', label: 'Каталог' },
  { to: '/calendar', label: 'Календар' },
];

export function Header() {
  const cartCount = useAppSelector((s) =>
    s.cart.items.reduce((sum, i) => sum + i.quantity, 0),
  );
  const user = useAppSelector((s) => s.auth.user);

  const prevCountRef = useRef(cartCount);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (cartCount > prevCountRef.current) {
      setPulseKey((k) => k + 1);
    }
    prevCountRef.current = cartCount;
  }, [cartCount]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-8">
        <Link to="/" className="flex items-center gap-3 group">
          <Logo />
          <span className="font-display text-lg font-semibold tracking-widest">
            F1 Store
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                clsx(
                  'text-xs font-medium uppercase tracking-widest transition-colors',
                  isActive ? 'text-ink-900' : 'text-ink-400 hover:text-ink-900',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <SearchBox />

        <div className="flex items-center gap-2">
          {user ? (
            <Link to="/profile" className="btn-subtle">
              {user.firstName}
            </Link>
          ) : (
            <Link to="/login" className="btn-subtle">
              Увійти
            </Link>
          )}
          <Link to="/cart" className="btn-ghost relative">
            <span>Кошик</span>
            <span
              key={pulseKey}
              className={clsx(
                'font-mono text-xs inline-block origin-center',
                pulseKey > 0 && 'animate-cart-pulse',
              )}
            >
              {cartCount.toString().padStart(2, '0')}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" fill="#000" />
      <path d="M6 22 L16 6 L26 22 Z" fill="#fff" />
      <rect x="6" y="22" width="20" height="2" fill="#DC0000" />
    </svg>
  );
}
