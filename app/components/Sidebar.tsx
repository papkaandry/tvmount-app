'use client';

import { permissions, Role } from '@/app/lib/permissions';

const commonTabs = [
  'Dashboard',
  'Orders',
  'Clients',
  'Masters',
  'Analytics',
  'Reports',
  'Finance',
  'Works', // ← было Support
  'Notifications',
  'Profile',
];

export default function Sidebar() {
  const role =
    typeof window !== 'undefined'
      ? (localStorage.getItem('role') as Role)
      : null;

  if (!role) return null;

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>TVMount</div>

      {commonTabs.map((tab) => (
        <div key={tab} style={styles.item}>
          {tab}
        </div>
      ))}

      {/* 🔴 ТОЛЬКО АДМИН */}
      {permissions[role]?.accessSettings && (
        <div style={{ ...styles.item, ...styles.adminItem }}>
          Access Settings
        </div>
      )}
    </aside>
  );
}

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
