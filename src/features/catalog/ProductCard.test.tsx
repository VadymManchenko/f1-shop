import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types/domain';

const product: Product = {
  id: 'p-test',
  title: 'Test Cap',
  team: 'ferrari',
  category: 'cap',
  group: 'apparel',
  price: 49,
  currency: 'EUR',
  description: '',
  image: '',
  stock: 10,
  createdAt: '2026-01-01',
};

function renderCard(onAdd: (p: Product) => void = jest.fn()) {
  return render(
    <MemoryRouter>
      <ProductCard product={product} onAdd={onAdd} />
    </MemoryRouter>,
  );
}

describe('ProductCard', () => {
  it('відображає назву, команду, категорію та ціну', () => {
    renderCard();

    expect(screen.getByRole('heading', { name: 'Test Cap' })).toBeInTheDocument();
    expect(screen.getByText(/Ferrari/i)).toBeInTheDocument();
    expect(screen.getByText('Кепка')).toBeInTheDocument();
    expect(screen.getByText(/49/)).toBeInTheDocument();
    expect(screen.getAllByText('EUR').length).toBeGreaterThan(0);
  });

  it('лінкується на сторінку товару', () => {
    renderCard();
    const link = screen.getAllByRole('link')[0];
    expect(link).toHaveAttribute('href', '/product/p-test');
  });

  it('викликає onAdd з товаром і показує підтвердження «Додано»', () => {
    const onAdd = jest.fn();
    renderCard(onAdd);

    const button = screen.getByRole('button', { name: 'У кошик' });
    fireEvent.click(button);

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(product);
    expect(screen.getByText('Додано')).toBeInTheDocument();
  });
});
