import { SERVICES, ServiceItem } from '@/app/config/services';

export type StoredService = ServiceItem & {
  enabled: boolean;
};

const STORAGE_KEY = 'services';

export function initServicesIfNeeded() {
  if (typeof window === 'undefined') return;

  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return;

  const initial: StoredService[] = SERVICES.map((s) => ({
    ...s,
    enabled: true,
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
}

export function getServices(): StoredService[] {
  if (typeof window === 'undefined') return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveServices(services: StoredService[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
}
