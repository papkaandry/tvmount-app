import { Role } from './users';

export const permissions: Record<Role, { accessSettings: boolean }> = {
  admin: { accessSettings: true },
  manager1: { accessSettings: false },
  manager2: { accessSettings: false },
  master: { accessSettings: false },
};
