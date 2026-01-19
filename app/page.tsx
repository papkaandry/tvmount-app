'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'admin' | 'manager1' | 'manager2' | 'master';

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
  const [activeTab, setActiveTab] = useState<string>('Dashboard');

  useEffect(() => {
    const storedRole = localStorage.getItem('role') as Role | null;
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
          <strong>User:</strong> {user}<br />
          <strong>Role:</strong> {role}
        </div>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>

      <h2 style={styles.title}>Dashboard</h2>

      {/* Tabs */}
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

        {/* 🔴 ADMIN TAB */}
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

      {/* Content */}
      <div style={styles.content}>
        {activeTab !== 'Admin' && (
          <>
            <strong>Active tab:</strong> {activeTab}
          </>
        )}

        {activeTab === 'Admin' && role === 'admin' && (
          <AdminPanel />
        )}
      </div>
    </div>
  );
}

/* ================= ADMIN PANEL ================= */

function AdminPanel() {
  return (
    <div style={styles.adminBox}>
      <h3>Admin panel</h3>
      <p>Only admin can see this section</p>

      <ul>
        <li>Manage users</li>
        <li>Assign roles</li>
        <li>Access permissions</li>
        <li>System settings</li>
      </ul>
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

  adminBox: {
    padding: 20,
    borderRadius: 10,
    background: '#ffe5e5',
    border: '1px solid #b00020',
    color: '#660000',
  },
};
