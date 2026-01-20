import { SERVICES, ServiceItem } from '../config/services';

export type StoredService = ServiceItem & {
  enabled: boolean;
};

const STORAGE_KEY = 'services';

/**
 * Инициализация сервисов:
 * берём дефолтные услуги из config/services.ts
 * и кладём в localStorage, если там ещё пусто
 */
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

/**
 * Получить все сервисы из localStorage
 */
export function getServices(): StoredService[] {
  if (typeof window === 'undefined') return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as StoredService[];
  } catch {
    return [];
  }
}

/**
 * Сохранить сервисы в localStorage
 */
export function saveServices(services: StoredService[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
}
