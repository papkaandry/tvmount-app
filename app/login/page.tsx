'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUsers, initUsersIfNeeded } from '@/app/lib/users';

const MONKEY_GIF =
  'https://www.meme-arsenal.com/memes/7fde6ef643da6245009051178297c9e9.jpg';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    initUsersIfNeeded();
  }, []);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showMonkey, setShowMonkey] = useState(false);

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

        <button style={styles.primary} onClick={handleLogin}>
          LOGIN
        </button>

        <div
          style={styles.forgot}
          onClick={() => setShowMonkey(true)}
        >
          Forgot password?
        </div>
      </div>

      {showMonkey && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowMonkey(false)}
        >
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={MONKEY_GIF}
              alt="monkey"
              style={styles.monkey}
            />
            <div style={styles.modalText}>
              **Write to the admin**
            </div>
            <button
              style={styles.closeBtn}
              onClick={() => setShowMonkey(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
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
    position: 'relative',
    zIndex: 2,
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

  primary: {
    width: '100%',
    height: 38,
    marginTop: 30,
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.8)',
    color: '#fff',
    cursor: 'pointer',
    letterSpacing: 1,
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

  /* ===== MONKEY MODAL ===== */

  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },

  modal: {
    width: 320,
    padding: 20,
    borderRadius: 10,
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.4)',
    textAlign: 'center',
    color: '#fff',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  },

  monkey: {
    width: '100%',
    borderRadius: 6,
    marginBottom: 12,
  },

  modalText: {
    fontSize: 13,
    opacity: 0.85,
    marginBottom: 14,
    letterSpacing: 0.5,
  },

  closeBtn: {
    width: '100%',
    height: 34,
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.6)',
    color: '#fff',
    cursor: 'pointer',
  },
};
