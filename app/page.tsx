'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from './components/AdminPanel';
import WorksPanel from './components/WorksPanel';
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
  'Works', // ← было Support
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
        {activeTab === 'Admin' && role === 'admin' && <AdminPanel />}

        {activeTab === 'Works' && <WorksPanel />}

        {activeTab !== 'Admin' && activeTab !== 'Works' && (
          <div>
            <strong>Active tab:</strong> {activeTab}
          </div>
        )}
      </div>
    </div>
  );
}
