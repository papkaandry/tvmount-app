'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import AdminPanel from './components/AdminPanel';
import WorksPanel from './components/WorksPanel';
import OrdersPanel from './components/OrdersPanel';

import type { Role } from './lib/users';
import { initServicesIfNeeded } from './lib/services';

export default function HomePage() {
  const router = useRouter();

  const [role, setRole] = useState<Role | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'Dashboard' | 'Orders' | 'Works' | 'Admin'
  >('Dashboard');

  useEffect(() => {
    // 🔥 КРИТИЧЕСКИ ВАЖНО
    initServicesIfNeeded();

    const r = localStorage.getItem('role') as Role | null;
    const u = localStorage.getItem('user');

    if (!r || !u) {
      router.push('/login');
      return;
    }

    setRole(r);
    setUser(u);
  }, [router]);

  const logout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (!role) return null;

  return (
    <div style={styles.page}>
      {/* TOP BAR */}
      <div style={styles.top}>
        <div>
          <b>User:</b> {user}
          <br />
          <b>Role:</b> {role}
        </div>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>

      {/* TABS */}
      <div style={styles.tabs}>
        <button
          onClick={() => setActiveTab('Dashboard')}
          style={tabStyle(activeTab === 'Dashboard')}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab('Orders')}
          style={tabStyle(activeTab === 'Orders')}
        >
          Orders
        </button>

        <button
          onClick={() => setActiveTab('Works')}
          style={tabStyle(activeTab === 'Works')}
        >
          Works
        </button>

        {role === 'admin' && (
          <button
            onClick={() => setActiveTab('Admin')}
            style={{
              ...tabStyle(activeTab === 'Admin'),
              borderColor: 'red',
              color: 'red',
            }}
          >
            Admin
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        {activeTab === 'Dashboard' && <div>Dashboard</div>}
        {activeTab === 'Orders' && <OrdersPanel />}
        {activeTab === 'Works' && <WorksPanel />}
        {activeTab === 'Admin' && role === 'admin' && <AdminPanel />}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid #ccc',
  background: active ? '#333' : '#fff',
  color: active ? '#fff' : '#000',
  cursor: 'pointer',
});

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: 24,
    background: '#f2f2f2',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logout: {
    background: '#b00020',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '8px 14px',
    cursor: 'pointer',
    fontWeight: 600,
  },
  tabs: {
    display: 'flex',
    gap: 8,
    marginBottom: 20,
  },
  content: {
    background: '#fff',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
};
