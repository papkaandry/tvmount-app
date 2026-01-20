export type Role = 'admin' | 'manager1' | 'manager2' | 'master';

export type User = {
  login: string;
  password: string;
  role: Role;
};

const STORAGE_KEY = 'users';

/** init default users */
export function initUsersIfNeeded() {
  if (typeof window === 'undefined') return;

  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return;

  const initial: User[] = [
    { login: 'Lika', password: 'Lomka', role: 'admin' },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
}

/** get users */
export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/** save users */
export function saveUsers(users: User[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}
