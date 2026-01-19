'use client';

import { useState } from 'react';

export default function LoginPage() {
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
          type="email"
          placeholder={t.email}
          style={styles.input}
        />

        <input
          type="password"
          placeholder={t.password}
          style={styles.input}
        />

        <button style={styles.button}>{t.button}</button>
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
};
