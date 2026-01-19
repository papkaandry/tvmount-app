'use client';

import { useEffect, useState } from 'react';
import { getUsers, saveUsers, User, Role } from '@/app/lib/users';

const roles: Role[] = ['admin', 'manager1', 'manager2', 'master'];

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('manager1');

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

  return (
    <div style={styles.box}>
      <h3>Admin panel — Users</h3>

      {/* USERS TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Login</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.login}>
              <td>{u.login}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

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

/* ===== STYLES ===== */

const styles: Record<string, React.CSSProperties> = {
  box: {
    background: '#ffecec',
    padding: 20,
    borderRadius: 10,
    border: '1px solid #b00020',
  },
  table: {
    width: '100%',
    marginBottom: 20,
    borderCollapse: 'collapse',
  },
  addBox: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
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
