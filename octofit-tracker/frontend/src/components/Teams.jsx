import { useEffect, useState } from 'react';
import { apiBaseUrl, fetchApiResource } from './api';

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setError(null);

    fetchApiResource(apiBaseUrl, 'teams')
      .then((data) => {
        if (!cancelled) {
          setTeams(data);
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
        <h2 className="h4 mb-3">Teams</h2>
        {status === 'loading' && <p>Loading teams...</p>}
        {status === 'error' && <div className="alert alert-danger">{error}</div>}
        {status === 'ready' && teams.length === 0 && (
          <div className="alert alert-warning">No teams currently available.</div>
        )}
        {status === 'ready' && teams.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Members</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team._id || team.name}>
                    <td>{team.name}</td>
                    <td>{team.description}</td>
                    <td>{team.members}</td>
                    <td>{team.createdAt ? formatDate(team.createdAt) : '—'}</td>
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
