import type { Role } from './users';

export type OrderItem = {
  serviceId: string;
  name: string;
  price: number;
  qty: number;
  total: number;
};

export type Order = {
  id: string;
  createdAt: string;
  createdBy: string;
  role: Role;

  items: OrderItem[];
  total: number;

  locked: boolean;
};

const STORAGE_KEY = 'orders';

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}
