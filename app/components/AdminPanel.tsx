import { useEffect, useState } from 'react';
import { getUsers, saveUsers, User, Role } from '@/app/lib/users';

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

    const updatedUsers: User[] = [
      ...users,
      { login, password, role },
    ];

    setUsers(updatedUsers);
    saveUsers(updatedUsers); // ← 🔴 ВОТ ЭТОГО НЕ ХВАТАЛО

    setLogin('');
    setPassword('');
    setRole('manager1');
  };

  return (
    <div style={styles.adminBox}>
      <h3>Admin panel — Users</h3>

      {/* USERS LIST */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Login</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.login}</td>
              <td>{'*'.repeat(u.password.length)}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD USER */}
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
    </div>
  );
}
