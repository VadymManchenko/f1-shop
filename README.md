# APEX — інтернет-магазин атрибутики Формули-1

Курсовий проєкт з дисципліни **«Мережні інформаційні технології»**
(ВНТУ, спеціальність 123 «Комп'ютерна інженерія»).

Сезон 2026, реальний календар (Bahrain та Saudi скасовані за графіком ESPN).

---

## Стек

| Шар | Технологія |
| --- | --- |
| Білдер | Vite 5 |
| Мова | TypeScript 5 |
| UI | React 18, React Router 6 (HashRouter), Tailwind CSS |
| Стан клієнта | Redux 4 + react-redux 8 |
| Server state | TanStack React Query 5 |
| Middleware | redux-thunk, redux-saga, redux-observable (rxjs) |
| Форми | redux-form 8 |
| Mock-API | MSW (Mock Service Worker) |
| Тести | Jest 29, Cypress 14 |
| Деплой | gh-pages |

> Redux 4 (а не 5) — бо redux-form ще не підтримує react-redux 9.

---

## Розподіл middleware по фічах

Методичка вимагає всі бібліотеки в одному проєкті. Щоб не «приклеювати»
зайве, кожній відведено окрему фічу з чіткою аргументацією:

| Middleware | Фіча | Файл | Чому саме тут |
| --- | --- | --- | --- |
| **Thunk** | Auth (login/register/logout/hydrate) | `features/auth/authThunks.ts` | Прості асинхронні дії «request → success/failure» + робота з localStorage. Saga/Observable були б надмірними. |
| **Saga** | Checkout flow | `features/checkout/checkoutSaga.ts` | Послідовний потік: `select(cart)` → API → `cartActions.clear` → `reset` форми. Saga дає лінійний код для бізнес-процесу. |
| **Redux-Observable** | Live-search (debounce + switchMap) | `features/catalog/searchEpic.ts` | rxjs — стандарт для реактивних потоків подій (друк у пошуку, скасування попереднього запиту). |
| **React Query** | Server-state каталогу і календаря | `features/catalog/useProducts.ts`, `features/calendar/useRaces.ts` | Кешування, інвалідація, `keepPreviousData` для фільтрації каталогу. Дублювати це у Redux немає сенсу. |
| **Redux-Form** | Login, Register, Checkout | `features/auth/*Form.tsx`, `features/checkout/CheckoutForm.tsx` | Декларативна валідація, `SubmissionError`, інтеграція з saga через `reset(formName)`. |

---

## Сторінки

| Шлях | Файл | Опис |
| --- | --- | --- |
| `/` | `pages/HomePage.tsx` | Лендінг + стрічка календаря |
| `/catalog` | `pages/CatalogPage.tsx` | Список товарів з фільтрами по командах, категоріях, сортуванням |
| `/product/:id` | `pages/ProductPage.tsx` | Деталка товару |
| `/cart` | `pages/CartPage.tsx` | Кошик |
| `/checkout` | `pages/CheckoutPage.tsx` | Оформлення замовлення (saga) |
| `/login`, `/register` | `pages/Login/RegisterPage.tsx` | Аутентифікація (thunk + redux-form) |
| `/profile` | `pages/ProfilePage.tsx` | Профіль + вихід |
| `/calendar` | `pages/CalendarPage.tsx` | Повний розклад Гран-прі 2026 |
| `/about` | `pages/AboutPage.tsx` | Про магазин |

---

## Mock-дані та штучна затримка

MSW перехоплює fetch-запити до `*/api/*` і віддає дані з `src/mocks/data/*`.
Затримка на ендпоінтах товарів — **1000 мс**, щоб під час захисту було
помітно роботу лоадера `<StartLightsLoader />` (стилізований під F1
стартовий світлофор).

Див. `src/mocks/handlers.ts`.

---

## Скрипти

```
npm run dev        # dev-сервер Vite, http://localhost:5173
npm run build      # типобілд + збірка
npm run preview    # запуск зібраного бандла
npm test           # Jest
npm run cypress:open  # Cypress GUI
npm run e2e        # старт vite + headless cypress
npm run deploy     # gh-pages
```

---

## Тести

Jest:

- `features/cart/cartReducer.test.ts` — редюсер кошика
- `features/catalog/searchEpic.test.ts` — debounce + switchMap epic
- `features/calendar/raceStatus.test.ts` — обчислення статусу гонок
- `features/calendar/RaceCard.test.tsx` — снапшот компонента

Cypress:

- `cypress/e2e/checkout-flow.cy.ts` — повний шлях: каталог → товар → кошик → оформлення.

---

## Структура

```
src/
  api/             axios-обгортки навколо MSW-ендпоінтів
  app/             store, rootReducer, rootSaga, rootEpic, типізовані hooks
  components/      Header, Footer, Layout, StartLightsLoader, forms/InputField
  features/
    auth/          thunks + redux-form
    cart/          slice
    catalog/       useProducts (React Query) + searchEpic (rxjs)
    checkout/      saga + redux-form
    calendar/      useRaces (React Query) + raceStatus
  mocks/           MSW handlers + data (products, races)
  pages/           кожен маршрут — окрема сторінка
  types/domain.ts  доменні типи
```
