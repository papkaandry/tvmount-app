'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUsers, initUsersIfNeeded } from '@/app/lib/users';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    initUsersIfNeeded();
  }, []);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    const users = getUsers();
    const user = users.find(
      (u) => u.login === login && u.password === password
    );

    if (!user) {
      setError('Invalid login or password');
      return;
    }

    localStorage.setItem('user', user.login);
    localStorage.setItem('role', user.role);
    router.push('/');
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign in</h2>

        <div style={styles.field}>
          <input
            style={styles.input}
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div style={styles.field}>
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f4f5f7, #e9eaee)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Inter, Arial, sans-serif',
  },

  card: {
    width: 360,
    background: '#ffffff',
    padding: 32,
    borderRadius: 24,
    boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },

  title: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 22,
    marginBottom: 10,
  },

  field: {
    display: 'flex',
    flexDirection: 'column',
  },

  input: {
    height: 46,
    padding: '0 16px',
    borderRadius: 14,
    border: '1px solid #ddd',
    fontSize: 15,
    outline: 'none',
    transition: 'border 0.2s ease',
  },

  button: {
    marginTop: 10,
    height: 48,
    borderRadius: 16,
    border: 'none',
    background: '#111',
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },

  error: {
    color: '#ff4d4f',
    fontSize: 13,
    textAlign: 'center',
  },
};

