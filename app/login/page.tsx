'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lang, setLang] = useState<'ru' | 'ua' | 'en'>('ua');

  const texts = {
    ru: { title: 'Вход', email: 'Email', password: 'Пароль', button: 'Войти' },
    ua: { title: 'Вхід', email: 'Email', password: 'Пароль', button: 'Увійти' },
    en: { title: 'Login', email: 'Email', password: 'Password', button: 'Sign in' },
  };

  const t = texts[lang];

  return (
    <div style={styles.wrapper}>
      <div style={styles.lang}>
        {(['ru', 'ua', 'en'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              ...styles.langBtn,
              ...(lang === l ? styles.langBtnActive : {}),
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>{t.title}</h2>

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
    background: '#e6e6e6',
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
    gap: 6,
  },
  langBtn: {
    padding: '6px 10px',
    fontSize: 12,
    borderRadius: 4,
    border: '1px solid #bbb',
    background: '#f5f5f5',
    cursor: 'pointer',
  },
  langBtnActive: {
    background: '#333',
    color: '#fff',
    borderColor: '#333',
  },
  card: {
    background: '#fff',
    padding: 32,
    borderRadius: 10,
    width: 320,
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  button: {
    padding: 12,
    marginTop: 10,
    background: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
  },
};
