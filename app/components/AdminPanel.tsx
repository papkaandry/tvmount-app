import { useEffect, useState } from 'react';
import { getUsers, saveUsers, User, Role } from '@/app/lib/users';

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('manager1');

  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const currentUserLogin =
    typeof window !== 'undefined'
      ? localStorage.getItem('user')
      : null;

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const addUser = () => {
    if (!login || !password) return;

    const updatedUsers: User[] = [
      ...users,
      { login, password, role },
    ];

    setUsers(updatedUsers);
    saveUsers(updatedUsers);

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

  const confirmDelete = () => {
    if (!deleteUser) return;

    const admins = users.filter((u) => u.role === 'admin');

    if (
      deleteUser.login === currentUserLogin ||
      (deleteUser.role === 'admin' && admins.length === 1)
    ) {
      setDeleteUser(null);
      return;
    }

    const updated = users.filter(
      (u) => u.login !== deleteUser.login
    );

    setUsers(updated);
    saveUsers(updated);
    setDeleteUser(null);
  };

  return (
    <div style={styles.adminBox}>
      <h3>Admin panel — Users</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Login</th>
            <th>Password</th>
            <th>Role</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const isVisible = visiblePasswords[u.login];

            return (
              <tr key={u.login}>
                <td>{u.login}</td>

                <td style={styles.passwordCell}>
                  {isVisible ? u.password : '••••••'}
                  <button
                    style={styles.eye}
                    onClick={() => togglePassword(u.login)}
                  >
                    👁
                  </button>
                </td>

                <td>{u.role}</td>

                <td>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => setDeleteUser(u)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={styles.form}>
        <input
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          <option value="manager1">manager1</option>
          <option value="manager2">manager2</option>
          <option value="master">master</option>
        </select>

        <button onClick={addUser}>Add user</button>
      </div>

      {deleteUser && (
        <div
          style={styles.modalOverlay}
          onClick={() => setDeleteUser(null)}
        >
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <p>
              Delete user <b>{deleteUser.login}</b>?
            </p>

            <div style={styles.modalActions}>
              <button onClick={() => setDeleteUser(null)}>
                Cancel
              </button>
              <button
                style={styles.confirmDelete}
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  adminBox: {
    padding: 20,
    background: '#ffe5e5',
    borderRadius: 10,
    border: '1px solid #b00020',
  },

  table: {
    width: '100%',
    marginBottom: 16,
    borderCollapse: 'collapse',
  },

  passwordCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },

  eye: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
  },

  deleteBtn: {
    background: 'transparent',
    border: '1px solid #b00020',
    color: '#b00020',
    cursor: 'pointer',
    padding: '2px 8px',
  },

  form: {
    display: 'flex',
    gap: 8,
  },

  /* MODAL */

  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },

  modal: {
    background: '#fff',
    padding: 20,
    borderRadius: 8,
    minWidth: 260,
  },

  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 16,
  },

  confirmDelete: {
    background: '#b00020',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
  },
};
