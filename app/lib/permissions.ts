import type { Role } from './users';

type PermissionSet = {
  accessSettings: boolean;
};

export const permissions: Record<Role, PermissionSet> = {
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
