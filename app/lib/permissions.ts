export type Role = 'admin' | 'manager1' | 'manager2' | 'master';

export const permissions: Record<Role, { accessSettings: boolean }> = {
  admin: {
    accessSettings: true,
  },
  manager1: {
    accessSettings: false,
  },
  manager2: {
    accessSettings: false,
  },
  master: {
    accessSettings: false,
  },
};
