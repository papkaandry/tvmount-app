export type Role = 'admin' | 'manager1' | 'manager2' | 'master';

export type User = {
  login: string;
  password: string;
  role: Role;
};

const STORAGE_KEY = 'users';

/* ===== DEFAULT USERS ===== */
const defaultUsers: User[] = [
  {
    login: 'Lika',
    password: 'Lomka',
    role: 'admin',
  },
];

/* ===== GET USERS ===== */
export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  return JSON.parse(data);
}

/* ===== SAVE USERS ===== */
export function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/* ===== AUTH ===== */
export function authenticate(
  login: string,
  password: string
): User | null {
  const users = getUsers();
  return (
    users.find(
      (u) => u.login === login && u.password === password
    ) || null
  );
}
