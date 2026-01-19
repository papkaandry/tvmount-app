export type Role = 'admin' | 'manager1' | 'manager2' | 'master';

export type User = {
  login: string;
  password: string;
  role: Role;
};

const STORAGE_KEY = 'users';

const defaultUsers: User[] = [
  {
    login: 'Lika',
    password: 'Lomka',
    role: 'admin',
  },
];

export function getUsers(): User[] {
  if (typeof window === 'undefined') return defaultUsers;

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  return JSON.parse(data);
}

export function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}
