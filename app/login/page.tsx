'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lang, setLang] = useState<'ru' | 'ua' | 'en'>('ru');

  const texts = {
    ru: {
      title: 'Вход',
      email: 'Email',
      password: 'Пароль',
      button: 'Войти',
    },
    ua: {
      title: 'Вхід',
      email: 'Email',
      password: 'Пароль',
      button: 'Увійти',
    },
    en: {
      title: 'Login',
      email: 'Email',
      password: 'Password',
      button: 'Sign in',
    },
  };

  const t = texts[lang];

  return (
    <div style={styles.wrapper}>
      <div style={styles.lang}>
        <button onClick={() => setLang('ru')}>RU</button>
        <button onClick={() => setLang('ua')}>UA</button>
        <button onClick={() => setLang('en')}>EN</button>
      </div>

      <div style={styles.card}>
        <h2>{t.title}</h2>

        <input
          style={styles.input}
          type="email"
          placeholder={t.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder={t.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button}>{t.button}</button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: '100vh',
    background: '#f2f2f2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    fontFamily: 'Arial, sans-serif',
  },
  lang: {
    position: 'absolute',
    top: 20,
    right: 20,
    display: 'flex',
    gap: 8,
  },
  card: {
    background: '#fff',
    padding: 32,
    borderRadius: 8,
    width: 320,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    padding: 10,
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  button: {
    padding: 10,
    marginTop: 10,
    background: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};

