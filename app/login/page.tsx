'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '@/app/components/AdminPanel';
import { Role } from '@/app/lib/users';

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
          <div style={styles.userName}>{user}</div>
          <div style={styles.userRole}>{role}</div>
        </div>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>

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
            Admin
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        {activeTab === 'Admin' && role === 'admin' ? (
          <AdminPanel />
        ) : (
          <div style={styles.placeholder}>
            <h3>{activeTab}</h3>
            <p>Content will be here</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f4f5f7, #e9eaee)',
    padding: 24,
    fontFamily: 'Inter, Arial, sans-serif',
  },

  topBar: {
    background: '#fff',
    borderRadius: 16,
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
  },

  userName: {
    fontWeight: 600,
    fontSize: 16,
  },

  userRole: {
    fontSize: 13,
    color: '#777',
    textTransform: 'capitalize',
  },

  logout: {
    padding: '8px 16px',
    borderRadius: 12,
    border: 'none',
    background: '#ff4d4f',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
  },

  tabs: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 20,
  },

  tab: {
    padding: '10px 18px',
    borderRadius: 14,
    border: '1px solid #ddd',
    background: '#fff',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  },

  tabActive: {
    background: '#111',
    color: '#fff',
    border: '1px solid #111',
  },

  adminTab: {
    border: '1px solid #ff4d4f',
    color: '#ff4d4f',
  },

  adminTabActive: {
    background: '#ff4d4f',
    color: '#fff',
  },

  content: {
    background: '#fff',
    borderRadius: 20,
    padding: 24,
    minHeight: 300,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },

  placeholder: {
    textAlign: 'center',
    color: '#777',
  },
};
