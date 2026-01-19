export type Role = 'admin' | 'manager1' | 'manager2' | 'master';

export type User = {
  login: string;
  password: string;
  role: Role;
};

const STORAGE_KEY = 'users';

/* ================= GET USERS ================= */
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

/* ================= SAVE USERS ================= */
export function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/* ================= INIT ADMIN (ONCE) ================= */
export function initAdminIfNeeded() {
  if (typeof window === 'undefined') return;

  const users = getUsers();
  if (users.length > 0) return;

  const admin: User = {
    login: 'Lika',
    password: 'Lomka',
    role: 'admin',
  };

  saveUsers([admin]);
}
