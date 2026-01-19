'use client';

import { useEffect, useState } from 'react';
import { getUsers, saveUsers, User, Role } from '@/app/lib/users';

const roles: Role[] = ['admin', 'manager1', 'manager2', 'master'];

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('manager1');
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const addUser = () => {
    if (!login || !password) return;

    if (users.find((u) => u.login === login)) {
      alert('User already exists');
      return;
    }

    const updated = [...users, { login, password, role }];
    setUsers(updated);
    saveUsers(updated);

    setLogin('');
    setPassword('');
    setRole('manager1');
  };

  const togglePassword = (login: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [login]: !prev[login],
    }));
  };

  const maskPassword = (pwd: string) =>
    pwd.length <= 2 ? '**' : pwd.slice(0, 2) + '*'.repeat(pwd.length - 2);

  return (
    <div style={styles.box}>
      <h3>Admin panel — Users</h3>

      {/* TABLE HEADER */}
      <div style={{ ...styles.row, fontWeight: 600 }}>
        <div>Login</div>
        <div>Password</div>
        <div>Role</div>
      </div>

      {/* USERS */}
      {users.map((u) => (
        <div key={u.login} style={styles.row}>
          <div>{u.login}</div>

          <div style={styles.passwordCell}>
            <span>
              {visiblePasswords[u.login] ? u.password : maskPassword(u.password)}
            </span>
            <button
              onClick={() => togglePassword(u.login)}
              style={styles.eye}
              title="Show / hide password"
            >
              👁
            </button>
          </div>

          <div>{u.role}</div>
        </div>
      ))}

      {/* ADD USER */}
      <div style={styles.addBox}>
        <input
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          style={styles.input}
        >
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <button onClick={addUser} style={styles.button}>
          Add user
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  box: {
    background: '#ffecec',
    padding: 20,
    borderRadius: 10,
    border: '1px solid #b00020',
  },

  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 10,
    padding: '6px 0',
    alignItems: 'center',
  },

  passwordCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },

  eye: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
  },

  addBox: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr auto',
    gap: 10,
    marginTop: 15,
  },

  input: {
    padding: 8,
    borderRadius: 6,
    border: '1px solid #ccc',
  },

  button: {
    padding: '8px 14px',
    borderRadius: 6,
    border: 'none',
    background: '#b00020',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
