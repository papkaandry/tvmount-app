'use client';

import { useEffect, useState } from 'react';
import { getUsers, saveUsers, User, Role } from '@/app/lib/users';

const roles: Role[] = ['admin', 'manager1', 'manager2', 'master'];

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [newLogin, setNewLogin] = useState('');
  const [newRole, setNewRole] = useState<Role>('manager1');

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const updateRole = (login: string, role: Role) => {
    const updated = users.map(u =>
      u.login === login ? { ...u, role } : u
    );
    setUsers(updated);
    saveUsers(updated);
  };

  const addUser = () => {
    if (!newLogin.trim()) return;

    if (users.find(u => u.login === newLogin)) {
      alert('User already exists');
      return;
    }

    const updated = [...users, { login: newLogin, role: newRole }];
    setUsers(updated);
    saveUsers(updated);

    setNewLogin('');
    setNewRole('manager1');
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
          {users.map(user => (
            <tr key={user.login}>
              <td>{user.login}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) =>
                    updateRole(user.login, e.target.value as Role)
                  }
                >
                  {roles.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD USER */}
      <div style={styles.addBox}>
        <input
          placeholder="Login"
          value={newLogin}
          onChange={(e) => setNewLogin(e.target.value)}
          style={styles.input}
        />

        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value as Role)}
          style={styles.input}
        >
          {roles.map(r => (
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

