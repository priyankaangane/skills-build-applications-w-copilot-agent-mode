import { useEffect, useState } from 'react';
import { fetchApiResource } from './api';

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setError(null);

    fetchApiResource(apiBaseUrl, 'users')
      .then((data) => {
        if (!cancelled) {
          setUsers(data);
          setStatus('ready');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setStatus('error');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl]);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        {status === 'loading' && <p>Loading users...</p>}
        {status === 'error' && <div className="alert alert-danger">{error}</div>}
        {status === 'ready' && users.length === 0 && (
          <div className="alert alert-warning">No users found.</div>
        )}
        {status === 'ready' && users.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Team</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.email}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.team}</td>
                    <td>{user.joinedAt ? formatDate(user.joinedAt) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
