import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { searchActions } from '@/features/catalog/searchSlice';
import { cartActions } from '@/features/cart/cartSlice';
import { useProducts } from '@/features/catalog/useProducts';
import { ProductCard } from '@/features/catalog/ProductCard';
import { StartLightsLoader } from '@/components/StartLightsLoader';
import {
  ALL_TEAMS,
  ALL_CATEGORIES,
  TEAM_LABEL,
  CATEGORY_LABEL,
} from '@/features/catalog/teamPalette';
import clsx from 'clsx';

export function CatalogPage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.search.filters);

  const { data, isFetching } = useProducts({
    query: filters.query || undefined,
    teams: filters.teams,
    categories: filters.categories,
    sortBy: filters.sortBy,
  });

  return (
    <section className="container-page py-16">
      <p className="eyebrow">Каталог · сезон 2026</p>
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mt-2 mb-10">
        Атрибутика та аксесуари
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
        <aside className="space-y-8">
          <FilterGroup title="Команда">
            <div className="flex flex-wrap gap-2">
              {ALL_TEAMS.map((team) => (
                <Chip
                  key={team}
                  active={filters.teams.includes(team)}
                  onClick={() => dispatch(searchActions.toggleTeam(team))}
                >
                  {TEAM_LABEL[team]}
                </Chip>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Категорія">
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map((cat) => (
                <Chip
                  key={cat}
                  active={filters.categories.includes(cat)}
                  onClick={() => dispatch(searchActions.toggleCategory(cat))}
                >
                  {CATEGORY_LABEL[cat]}
                </Chip>
              ))}
            </div>
          </FilterGroup>

          <button
            type="button"
            onClick={() => dispatch(searchActions.reset())}
            className="btn-subtle px-0"
          >
            Скинути фільтри
          </button>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-ink-400">
              {isFetching ? 'Завантаження…' : `Знайдено: ${data?.length ?? 0}`}
            </span>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                dispatch(searchActions.setSort(e.target.value as typeof filters.sortBy))
              }
              className="input max-w-[200px] py-2"
            >
              <option value="newest">Спочатку нові</option>
              <option value="price-asc">Ціна: за зростанням</option>
              <option value="price-desc">Ціна: за спаданням</option>
            </select>
          </div>

          {isFetching ? (
            <StartLightsLoader label="Завантаження каталогу" />
          ) : data && data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {data.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAdd={(prod) => dispatch(cartActions.add(prod))}
                />
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center text-ink-400">
              За цими параметрами нічого не знайдено.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label">{title}</p>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'px-3 py-1.5 text-xs uppercase tracking-widest border transition-colors',
        active
          ? 'bg-ink-900 text-white border-ink-900'
          : 'bg-white text-ink-500 border-ink-200 hover:border-ink-900 hover:text-ink-900',
      )}
    >
      {children}
    </button>
  );
}
