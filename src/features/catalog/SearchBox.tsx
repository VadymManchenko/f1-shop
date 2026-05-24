import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { searchActions } from './searchSlice';
import { TEAM_LABEL } from './teamPalette';

export function SearchBox() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { filters, suggestions, status } = useAppSelector((s) => s.search);

  const showDropdown =
    filters.query.trim().length >= 2 &&
    (status === 'loading' || suggestions.length > 0);

  return (
    <div className="relative hidden lg:block w-64">
      <input
        type="search"
        value={filters.query}
        onChange={(e) => dispatch(searchActions.setQuery(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            navigate('/catalog');
          }
        }}
        placeholder="Пошук товарів"
        className="w-full border border-ink-200 bg-white px-3 py-2 text-sm placeholder:text-ink-300 focus:border-ink-900 focus:outline-none"
      />
      {showDropdown && (
        <div className="absolute right-0 left-0 top-full mt-1 max-h-80 overflow-auto border border-ink-100 bg-white shadow-lg z-50">
          {status === 'loading' && (
            <div className="px-4 py-3 text-xs text-ink-400">Пошук…</div>
          )}
          {suggestions.slice(0, 6).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                navigate(`/product/${p.id}`);
                dispatch(searchActions.setQuery(''));
              }}
              className="w-full text-left px-4 py-3 hover:bg-ink-50 border-b border-ink-100 last:border-0"
            >
              <div className="text-[10px] uppercase tracking-widest text-ink-400">
                {TEAM_LABEL[p.team]}
              </div>
              <div className="text-sm">{p.title}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
