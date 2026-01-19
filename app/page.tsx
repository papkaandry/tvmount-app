'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedUser = localStorage.getItem('user');

    if (!storedRole || !storedUser) {
      router.push('/login');
      return;
    }

    setRole(storedRole);
    setUser(storedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (!role) return null;

  return (
    <div style={styles.page}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <div>
          <strong>User:</strong> {user} <br />
          <strong>Role:</strong> {role}
        </div>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>

      <h2 style={styles.title}>Dashboard</h2>

      {/* Tabs */}
      <div style={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            style={{
              ...styles.tab,
              ...(activeTab === index ? styles.tabActive : {}),
            }}
          >
            {tab}
          </button>
        ))}

        {/* 🔴 ADMIN TAB — ТОЛЬКО КНОПКА */}
        {role === 'admin' && (
          <button
            onClick={() => router.push('/admin')}
            style={{ ...styles.tab, ...styles.adminTab }}
          >
            ⚠ Admin panel
          </button>
        )}
      </div>

      {/* Content */}
      <div style={styles.content}>
        <strong>Active tab:</strong> {tabs[activeTab]}
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

  content: {
    padding: 20,
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
  },
};
