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
      <div style={styles.wrapper}>
        <h1 style={styles.logo}>Service Panel</h1>
        <p style={styles.subtitle}>Sign in to your workspace</p>

        <div style={styles.form}>
          <input
            style={styles.input}
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div style={styles.error}>{error}</div>}

          <button style={styles.button} onClick={handleLogin}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0b0d12',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont',
    color: '#fff',
  },

  wrapper: {
    width: '100%',
    maxWidth: 420,
    padding: '0 24px',
  },

  logo: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 8,
    letterSpacing: '-0.5px',
  },

  subtitle: {
    fontSize: 14,
    color: '#9ba1aa',
    marginBottom: 32,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },

  input: {
    height: 48,
    background: '#141824',
    border: '1px solid #1f2433',
    borderRadius: 12,
    padding: '0 16px',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
  },

  button: {
    marginTop: 12,
    height: 48,
    borderRadius: 14,
    border: 'none',
    background: '#ffffff',
    color: '#000',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },

  error: {
    fontSize: 13,
    color: '#ff6b6b',
    marginTop: 4,
  },
};
