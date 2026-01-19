'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/* ================= USERS (TEMP, later backend) ================= */

const USERS = {
  Lika: {
    password: 'Lomka',
    role: 'admin',
  },
  manager1: {
    password: '1234',
    role: 'manager',
  },
  master1: {
    password: '1234',
    role: 'master',
  },
} as const;

type UserKey = keyof typeof USERS;

/* ================= COMPONENT ================= */

export default function LoginPage() {
  const router = useRouter();

  const [lang, setLang] = useState<'ru' | 'ua' | 'en'>('ru');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const texts = {
    ru: {
      title: 'Вход',
      email: 'Логин',
      password: 'Пароль',
      button: 'Войти',
      error: 'Неверный логин или пароль',
    },
    ua: {
      title: 'Вхід',
      email: 'Логін',
      password: 'Пароль',
      button: 'Увійти',
      error: 'Невірний логін або пароль',
    },
    en: {
      title: 'Login',
      email: 'Login',
      password: 'Password',
      button: 'Sign in',
      error: 'Invalid login or password',
    },
  };

  const t = texts[lang];

  const handleLogin = () => {
    const userKey = login as UserKey;
    const user = USERS[userKey];

    if (user && user.password === password) {
      localStorage.setItem('user', login);
      localStorage.setItem('role', user.role);
      router.push('/');
      return;
    }

    setError(t.error);
  };

  return (
    <div style={styles.page}>
      {/* Language switcher */}
      <div style={styles.langSwitcher}>
        {(['ru', 'ua', 'en'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              ...styles.langButton,
              ...(lang === l ? styles.langButtonActive : {}),
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Login card */}
      <div style={styles.card}>
        <h2 style={styles.title}>{t.title}</h2>

        <input
          type="text"
          placeholder={t.email}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder={t.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <div style={styles.error}>{error}</div>}

        <button style={styles.button} onClick={handleLogin}>
          {t.button}
        </button>
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
    position: 'relative',
  },

  langSwitcher: {
    position: 'absolute',
    top: 20,
    right: 20,
    display: 'flex',
    gap: 6,
  },

  langButton: {
    padding: '6px 10px',
    fontSize: 12,
    borderRadius: 6,
    border: '1px solid #bbb',
    background: '#f5f5f5',
    color: '#333',
    cursor: 'pointer',
  },

  langButtonActive: {
    background: '#333',
    color: '#fff',
    border: '1px solid #333',
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

  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#222',
    fontWeight: 600,
  },

  input: {
    padding: 12,
    fontSize: 14,
    borderRadius: 8,
    border: '1px solid #ccc',
    color: '#222',
    outline: 'none',
  },

  button: {
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
    border: 'none',
    background: '#333',
    color: '#f2f2f2',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },

  error: {
    color: '#c62828',
    fontSize: 13,
    textAlign: 'center',
  },
};
