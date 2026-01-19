export const permissions = {
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

export type Role = keyof typeof permissions;
