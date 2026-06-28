import { useEffect, useState } from 'react';
import { fetchApiResource } from './api';

export default function Leaderboard({ apiBaseUrl }) {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setError(null);

    fetchApiResource(apiBaseUrl, 'leaderboard')
      .then((data) => {
        if (!cancelled) {
          setEntries(data);
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
        <h2 className="h4 mb-3">Leaderboard</h2>
        {status === 'loading' && <p>Loading leaderboard...</p>}
        {status === 'error' && <div className="alert alert-danger">{error}</div>}
        {status === 'ready' && entries.length === 0 && (
          <div className="alert alert-warning">No leaderboard entries found.</div>
        )}
        {status === 'ready' && entries.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Points</th>
                  <th>Metric</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id || entry.rank}>
                    <td>{entry.rank}</td>
                    <td>{entry.name}</td>
                    <td>{entry.points}</td>
                    <td>{entry.metric}</td>
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
