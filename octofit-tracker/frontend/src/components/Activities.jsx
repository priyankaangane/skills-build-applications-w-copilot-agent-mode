import { useEffect, useState } from 'react';
import { normalizeApiList } from './api';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setError(null);

    fetch(`${apiBaseUrl}/activities/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load activities: ${response.statusText}`);
        }
        return response.json();
      })
      .then((payload) => {
        if (!cancelled) {
          setActivities(normalizeApiList(payload));
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
        <h2 className="h4 mb-3">Recent Activities</h2>
        {status === 'loading' && <p>Loading activity data...</p>}
        {status === 'error' && <div className="alert alert-danger">{error}</div>}
        {status === 'ready' && activities.length === 0 && (
          <div className="alert alert-warning">No activities available.</div>
        )}
        {status === 'ready' && activities.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Activity</th>
                  <th>Distance</th>
                  <th>Duration</th>
                  <th>Calories</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || `${activity.user}-${activity.date}`}> 
                    <td>{activity.user}</td>
                    <td>{activity.type}</td>
                    <td>{activity.distanceKm ?? '—'} km</td>
                    <td>{activity.durationMin ?? '—'} min</td>
                    <td>{activity.calories ?? '—'}</td>
                    <td>{activity.date ? formatDate(activity.date) : '—'}</td>
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
