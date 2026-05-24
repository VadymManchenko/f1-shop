export type Team =
  | 'ferrari'
  | 'mercedes'
  | 'redbull'
  | 'mclaren'
  | 'alpine'
  | 'aston'
  | 'williams'
  | 'haas'
  | 'rb'
  | 'sauber';

export type Category =
  | 'cap'
  | 'tshirt'
  | 'hoodie'
  | 'jacket'
  | 'polo'
  | 'mug'
  | 'keychain'
  | 'poster'
  | 'lanyard'
  | 'sunglasses'
  | 'model';

export type ProductGroup = 'apparel' | 'accessories' | 'collectibles';

export interface Product {
  id: string;
  title: string;
  team: Team;
  category: Category;
  group: ProductGroup;
  price: number;
  currency: 'EUR';
  description: string;
  image: string;
  stock: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthCredentials {
  firstName: string;
  lastName: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export type RaceStatus = 'completed' | 'cancelled' | 'next' | 'upcoming';

export interface Race {
  id: string;
  round: number;
  slug: string;
  name: string;
  shortName: string;
  country: string;
  circuit: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'cancelled' | 'scheduled';
  isSprint: boolean;
}
