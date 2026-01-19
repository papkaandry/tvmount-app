'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUsers, initUsersIfNeeded } from '@/app/lib/users';

export default function LoginPage() {
  const router = useRouter();

  // 🔥 КЛЮЧЕВОЕ МЕСТО — ИНИЦИАЛИЗАЦИЯ USERS
  useEffect(() => {
    initUsersIfNeeded();
  }, []);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const users = getUsers();

    const user = users.find(
      (u) => u.login === login && u.password === password
    );

    if (!user) {
      setError('Неверный логин или пароль');
      return;
    }

    localStorage.setItem('user', user.login);
    localStorage.setItem('role', user.role);

    router.push('/');
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Login</h2>

        <input
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div style={styles.error}>{error}</div>}

        <button onClick={handleLogin}>Sign in</button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#e6e6e6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },

  card: {
    width: 320,
    background: '#ffffff',
    padding: 24,
    borderRadius: 14,
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  error: {
    color: '#c62828',
    fontSize: 13,
    textAlign: 'center',
  },
};
