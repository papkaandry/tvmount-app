export type ServiceItem = {
  id: string;
  name: string;
  price: number;
  hasQty?: boolean;
  unit?: string; // optional: pcs / hour
};

export const SERVICES: ServiceItem[] = [
  // === TV MOUNTING ===
  {
    id: 'tv_standard',
    name: 'Standard TV Mounting',
    price: 12,
    hasQty: true,
    unit: 'pcs',
  },
  {
    id: 'tv_large',
    name: 'Large TV Mounting',
    price: 18,
  },
  {
    id: 'tv_frame',
    name: 'Frame TV Mounting',
    price: 18,
  },
  {
    id: 'tv_fireplace',
    name: 'Fireplace TV Installation',
    price: 25,
  },
  {
    id: 'tv_mantel',
    name: 'Mantel Mount TV Installation',
    price: 40,
  },
  {
    id: 'tv_solid_surface',
    name: 'Mounting on Solid Surface or Ceiling',
    price: 10,
  },
  {
    id: 'tv_unmount',
    name: 'TV Unmounting',
    price: 5,
  },

  // === CABLE & WIRES ===
  {
    id: 'cable_channel',
    name: 'Cable Channel Installation',
    price: 10,
  },
  {
    id: 'wire_removal',
    name: 'Wire Removal (Behind Wall)',
    price: 20,
  },
  {
    id: 'cable_management',
    name: 'Cable Management',
    price: 5,
    hasQty: true,
    unit: 'pcs',
  },

  // === AUDIO / VIDEO ===
  {
    id: 'soundbar',
    name: 'Soundbar Installation',
    price: 10,
  },
  {
    id: 'tv_backlight',
    name: 'TV Backlight Installation',
    price: 10,
  },
  {
    id: 'console_setup',
    name: 'PS / XBOX Installation',
    price: 10,
  },

  // === ELECTRICAL ===
  {
    id: 'outlet_install',
    name: 'Outlet Installation',
    price: 30,
  },

  // === SHELVES / WALL ===
  {
    id: 'shelf_install',
    name: 'Shelf Installation',
    price: 10,
  },
  {
    id: 'painting_pictures',
    name: 'Painting & Picture Hanging',
    price: 5,
  },

  // === FURNITURE ===
  {
    id: 'furniture_assembly',
    name: 'Furniture Assembly (Hourly)',
    price: 25,
    unit: 'hour',
  },

  // === EXTRA / ADJUSTMENTS ===
  {
    id: 'extra_work',
    name: 'Extra Work',
    price: 0,
  },
  {
    id: 'distance_compensation',
    name: 'Distance Compensation',
    price: 0,
  },
  {
    id: 'minimum_pay_adjustment',
    name: 'Minimum Pay Adjustment',
    price: 0,
  },
  {
    id: 'tolls',
    name: 'Tolls',
    price: 0,
  },
  {
    id: 'tips',
    name: 'Tips',
    price: 0,
  },
];
