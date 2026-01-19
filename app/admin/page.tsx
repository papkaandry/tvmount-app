'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    const storedUser = localStorage.getItem('user');

    if (role !== 'admin') {
      router.push('/');
      return;
    }

    setUser(storedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <div>
          <strong>Admin:</strong> {user}
        </div>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>

      <h2 style={styles.title}>Admin access settings</h2>

      <div style={styles.card}>
        <p>🔒 This section is available only for admin</p>

        <ul>
          <li>Manage user roles</li>
          <li>Access permissions</li>
          <li>System settings</li>
          <li>Security rules</li>
        </ul>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    padding: 30,
    background: '#f2f2f2',
    fontFamily: 'Arial, sans-serif',
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

  card: {
    background: '#fff',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  },
};

