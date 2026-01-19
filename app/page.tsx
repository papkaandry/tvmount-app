'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from './components/AdminPanel';
import { Role } from './lib/users';

const tabs = [
  'Dashboard',
  'Orders',
  'Clients',
  'Calendar',
  'Reports',
  'Messages',
  'Warehouse',
  'Finance',
  'Analytics',
  'Support',
];

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Dashboard');

  useEffect(() => {
    const r = localStorage.getItem('role') as Role | null;
    const u = localStorage.getItem('user');

    if (!r || !u) {
      router.push('/login');
      return;
    }

    setRole(r);
    setUser(u);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    router.push('/login');
  };

  if (!role) return null;

  return (
    <div style={styles.page}>
      {/* TOP BAR */}
      <div style={styles.topBar}>
        <div>
          <strong>User:</strong> {user}<br />
          <strong>Role:</strong> {role}
        </div>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>

      <h2 style={styles.title}>Dashboard</h2>

      {/* TABS */}
      <div style={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.tabActive : {}),
            }}
          >
            {tab}
          </button>
        ))}

        {role === 'admin' && (
          <button
            onClick={() => setActiveTab('Admin')}
            style={{
              ...styles.tab,
              ...styles.adminTab,
              ...(activeTab === 'Admin' ? styles.adminTabActive : {}),
            }}
          >
            ⚠ Admin panel
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        {activeTab === 'Admin' && role === 'admin' ? (
          <AdminPanel />
        ) : (
          <div>
            <strong>Active tab:</strong> {activeTab}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: 30,
    fontFamily: 'Arial, sans-serif',
    background: '#f2f2f2',
    minHeight: '100vh',
  },

  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  logout: {
    padding: '8px 14px',
    borderRadius: 8,
    border: 'none',
    background: '#b00020',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
  },

  title: {
    marginBottom: 20,
  },

  tabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },

  tab: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #ccc',
    background: '#fff',
    cursor: 'pointer',
  },

  tabActive: {
    background: '#333',
    color: '#fff',
    border: '1px solid #333',
  },

  adminTab: {
    border: '1px solid #b00020',
    color: '#b00020',
    fontWeight: 600,
  },

  adminTabActive: {
    background: '#b00020',
    color: '#fff',
  },

  content: {
    padding: 20,
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
  },
};
