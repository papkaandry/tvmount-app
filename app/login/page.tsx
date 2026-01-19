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
