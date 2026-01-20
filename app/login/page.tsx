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
      <div style={styles.glass}>
        <h2 style={styles.title}>USER LOGIN</h2>

        <div style={styles.field}>
          <span style={styles.icon}>✉</span>
          <input
            style={styles.input}
            placeholder="Email ID"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div style={styles.field}>
          <span style={styles.icon}>🔒</span>
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.buttons}>
          <button style={styles.secondary}>REGISTER</button>
          <button style={styles.primary} onClick={handleLogin}>
            LOGIN
          </button>
        </div>

        <div style={styles.forgot}>Forgot password?</div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background:
      'linear-gradient(135deg, #4f5b66 0%, #c9c9c9 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, Arial, sans-serif',
  },

  glass: {
    width: 420,
    padding: '30px 32px',
    borderRadius: 4,
    background: 'rgba(255,255,255,0.18)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(255,255,255,0.6)',
    color: '#fff',
  },

  title: {
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 2,
    fontWeight: 400,
  },

  field: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.7)',
    marginBottom: 20,
    paddingBottom: 6,
  },

  icon: {
    marginRight: 10,
    fontSize: 16,
    opacity: 0.9,
  },

  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: 14,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  primary: {
    width: 140,
    height: 38,
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.8)',
    color: '#fff',
    cursor: 'pointer',
    letterSpacing: 1,
  },

  secondary: {
    width: 140,
    height: 38,
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.4)',
    color: '#fff',
    cursor: 'pointer',
    letterSpacing: 1,
    opacity: 0.8,
  },

  forgot: {
    marginTop: 18,
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.8,
    cursor: 'pointer',
  },

  error: {
    marginTop: 10,
    color: '#ffd6d6',
    fontSize: 13,
    textAlign: 'center',
  },
};
