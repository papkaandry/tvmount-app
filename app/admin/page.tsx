'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'admin' | 'manager1' | 'manager2' | 'master';

type User = {
  login: string;
  password: string;
  role: Role;
};

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('manager1');

  // 🔒 access control
  useEffect(() => {
    const currentRole = localStorage.getItem('role');
    if (currentRole !== 'admin') {
      router.push('/');
      return;
    }

    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // initial admin user
      const initialUsers: User[] = [
        { login: 'Lika', password: 'Lomka', role: 'admin' },
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
      setUsers(initialUsers);
    }
  }, [router]);

  // ➕ add user
  const addUser = () => {
    if (!login || !password) return;

    const exists = users.some((u) => u.login === login);
    if (exists) {
      alert('User already exists');
      return;
    }

    const newUser: User = { login, password, role };
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setLogin('');
    setPassword('');
    setRole('manager1');
  };

  return (
    <div style={styles.page}>
      <h2>Admin panel</h2>

      {/* USERS LIST */}
      <div style={styles.card}>
        <h3>Users</h3>

        {users.map((user, index) => (
          <div key={index} style={styles.userRow}>
            <div>
              <strong>{user.login}</strong>
            </div>
            <div>{user.role}</div>
          </div>
        ))}
      </div>

      {/* ADD USER */}
      <div style={styles.card}>
        <h3>Add user</h3>

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
          <option value="admin">admin</option>
          <option value="manager1">manager1</option>
          <option value="manager2">manager2</option>
          <option value="master">master</option>
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
  page: {
    padding: 30,
    fontFamily: 'Arial, sans-serif',
    background: '#f2f2f2',
    minHeight: '100vh',
  },

  card: {
    background: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
  },

  userRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
  },

  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
  },

  button: {
    padding: 10,
    borderRadius: 6,
    border: 'none',
    background: '#333',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
  },
};
