'use client';

import { useEffect, useState } from 'react';
import { permissions } from '@/app/lib/permissions';
import type { Role } from '@/app/lib/users';

const commonTabs = [
  'Dashboard',
  'Orders',
  'Clients',
  'Masters',
  'Analytics',
  'Reports',
  'Finance',
  'Works',
  'Notifications',
  'Profile',
];

export default function Sidebar() {
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role') as Role | null;
    setRole(storedRole);
  }, []);

  if (!role) return null;

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>TVMount</div>

      {commonTabs.map((tab) => (
        <div key={tab} style={styles.item}>
          {tab}
        </div>
      ))}

      {permissions[role]?.accessSettings && (
        <div style={{ ...styles.item, ...styles.adminItem }}>
          Access Settings
        </div>
      )}
    </aside>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 230,
    background: '#1f1f1f',
    color: '#eee',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    minHeight: '100vh',
  },
  logo: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 20,
  },
  item: {
    padding: '10px 12px',
    borderRadius: 6,
    cursor: 'pointer',
    background: '#2a2a2a',
  },
  adminItem: {
    background: '#8b0000',
    color: '#fff',
    fontWeight: 600,
  },
};
