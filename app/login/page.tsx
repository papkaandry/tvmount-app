'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUsers } from '@/app/lib/users';

export default function LoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
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
        <h2>Login</h2>

        <input
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <div style={styles.error}>{error}</div>}

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#e6e6e6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 320,
    background: '#fff',
    padding: 24,
    borderRadius: 12,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: 10,
    background: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
};
