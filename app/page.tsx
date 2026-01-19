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
      <div style={styles.topBar}>
        <div>
          <strong>User:</strong> {user}<br />
          <strong>Role:</strong> {role}
        </div>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>

      <div style={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={styles.tab}
          >
            {tab}
          </button>
        ))}

        {role === 'admin' && (
          <button
            onClick={() => setActiveTab('Admin')}
            style={{ ...styles.tab, color: 'red' }}
          >
            Admin panel
          </button>
        )}
      </div>

      <div style={styles.content}>
        {activeTab === 'Admin' && role === 'admin' ? (
          <AdminPanel />
        ) : (
          <div>{activeTab}</div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { padding: 30 },
  topBar: { display: 'flex', justifyContent: 'space-between' },
  logout: { background: '#b00020', color: '#fff' },
  tabs: { display: 'flex', gap: 8, marginBottom: 20 },
  tab: { padding: '8px 12px' },
  content: { background: '#fff', padding: 20 },
};
