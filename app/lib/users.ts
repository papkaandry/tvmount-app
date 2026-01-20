export type Role = 'admin' | 'manager1' | 'manager2' | 'master';

export type User = {
  login: string;
  password: string;
  role: Role;
};
