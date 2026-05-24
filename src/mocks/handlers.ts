import { http, HttpResponse, delay } from 'msw';
import { products } from './data/products';
import { races2026 } from './data/races';
import type {
  Order,
  Product,
  Team,
  Category,
  AuthCredentials,
  RegisterPayload,
  User,
} from '@/types/domain';

const users = new Map<string, User & { password: string }>();

users.set('demo@f1store.com', {
  id: 'u-demo',
  email: 'demo@f1store.com',
  firstName: 'Demo',
  lastName: 'User',
  password: 'f1store2026',
});

let orderSeq = 1;

const issueToken = (userId: string) =>
  `mock.${userId}.${Math.random().toString(36).slice(2, 10)}`;

const filterProducts = (url: URL): Product[] => {
  const query = url.searchParams.get('query')?.toLowerCase().trim();
  const teams = url.searchParams.get('teams')?.split(',').filter(Boolean) as Team[] | undefined;
  const categories = url.searchParams
    .get('categories')
    ?.split(',')
    .filter(Boolean) as Category[] | undefined;
  const sortBy = url.searchParams.get('sortBy') ?? 'newest';

  let out = [...products];

  if (query) {
    out = out.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.team.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query),
    );
  }
  if (teams && teams.length > 0) {
    out = out.filter((p) => teams.includes(p.team));
  }
  if (categories && categories.length > 0) {
    out = out.filter((p) => categories.includes(p.category));
  }

  switch (sortBy) {
    case 'price-asc':
      out.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      out.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
    default:
      out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  return out;
};

export const handlers = [
  http.get('*/api/products', async ({ request }) => {
    await delay(3000);
    const url = new URL(request.url);
    return HttpResponse.json(filterProducts(url));
  }),

  http.get('*/api/products/:id', async ({ params }) => {
    await delay(3000);
    const product = products.find((p) => p.id === params.id);
    if (!product) {
      return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  http.get('*/api/races', async () => {
    await delay(80);
    return HttpResponse.json(races2026);
  }),

  http.post('*/api/auth/login', async ({ request }) => {
    await delay(200);
    const body = (await request.json()) as AuthCredentials;
    const record = users.get(body.email);
    if (!record || record.password !== body.password) {
      return HttpResponse.json({ message: 'Невірні дані входу' }, { status: 401 });
    }
    const { password: _pw, ...user } = record;
    return HttpResponse.json({ user, token: issueToken(user.id) });
  }),

  http.post('*/api/auth/register', async ({ request }) => {
    await delay(250);
    const body = (await request.json()) as RegisterPayload;
    if (users.has(body.email)) {
      return HttpResponse.json({ message: 'Користувач вже існує' }, { status: 409 });
    }
    const user: User & { password: string } = {
      id: `u-${Math.random().toString(36).slice(2, 8)}`,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      password: body.password,
    };
    users.set(user.email, user);
    const { password: _pw, ...safe } = user;
    return HttpResponse.json({ user: safe, token: issueToken(user.id) });
  }),

  http.put('*/api/auth/me', async ({ request }) => {
    await delay(700);
    const auth = request.headers.get('Authorization');
    const token = auth?.replace('Bearer ', '');
    const userId = token?.split('.')[1];
    if (!userId) {
      return HttpResponse.json({ message: 'Не авторизовано' }, { status: 401 });
    }

    let foundKey: string | undefined;
    let foundUser: (User & { password: string }) | undefined;
    for (const [key, u] of users) {
      if (u.id === userId) {
        foundKey = key;
        foundUser = u;
        break;
      }
    }
    if (!foundKey || !foundUser) {
      return HttpResponse.json({ message: 'Користувача не знайдено' }, { status: 404 });
    }

    const body = (await request.json()) as {
      firstName: string;
      lastName: string;
      email: string;
    };

    if (body.email !== foundUser.email && users.has(body.email)) {
      return HttpResponse.json({ message: 'Email вже зайнятий' }, { status: 409 });
    }

    const updated: User & { password: string } = {
      ...foundUser,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    };
    users.delete(foundKey);
    users.set(updated.email, updated);
    const { password: _pw, ...safe } = updated;
    return HttpResponse.json(safe);
  }),

  http.post('*/api/orders', async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as {
      userId: string;
      items: { productId: string; quantity: number }[];
    };
    const total = body.items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    const order: Order = {
      id: `o-${String(orderSeq++).padStart(5, '0')}`,
      userId: body.userId,
      items: body.items,
      total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    return HttpResponse.json(order);
  }),
];
