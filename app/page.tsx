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
  'Access settings', // admin only
];

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (!storedRole) {
      router.push('/login');
      return;
    }
    setRole(storedRole);
  }, [router]);

  if (!role) return null;

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Dashboard</h2>

      <div style={styles.tabs}>
        {tabs.map((tab, index) => {
          const isAdminTab = tab === 'Access settings';
          const disabled = isAdminTab && role !== 'admin';

          return (
            <button
              key={tab}
              onClick={() => !disabled && setActiveTab(index)}
              style={{
                ...styles.tab,
                ...(activeTab === index ? styles.tabActive : {}),
                ...(isAdminTab ? styles.adminTab : {}),
                ...(disabled ? styles.tabDisabled : {}),
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

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
  },
  tabDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  content: {
    padding: 20,
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
  },
};
