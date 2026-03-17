import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getUsers()
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h4>All Users</h4>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-modern-wrapper mt-3">
          <div className="table-responsive">
            <table className="table-modern">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Phone</th>
                </tr>
              </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={4} className="text-center text-muted">No users found.</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge-modern ${
                        u.role === 'admin' ? 'badge-red' :
                        u.role === 'doctor' ? 'badge-blue' :
                        u.role === 'receptionist' ? 'badge-green' : 'badge-gray'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td>{u.phone || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </div>
  );
}
