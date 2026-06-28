import { useEffect, useState } from 'react';
import { normalizeApiList } from './api';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setError(null);

    fetch(`${apiBaseUrl}/workouts/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load workouts: ${response.statusText}`);
        }
        return response.json();
      })
      .then((payload) => {
        if (!cancelled) {
          setWorkouts(normalizeApiList(payload));
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
        <h2 className="h4 mb-3">Workouts</h2>
        {status === 'loading' && <p>Loading workouts...</p>}
        {status === 'error' && <div className="alert alert-danger">{error}</div>}
        {status === 'ready' && workouts.length === 0 && (
          <div className="alert alert-warning">No workouts available.</div>
        )}
        {status === 'ready' && workouts.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Duration</th>
                  <th>Focus</th>
                  <th>Difficulty</th>
                  <th>Recommended For</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout._id || workout.name}>
                    <td>{workout.name}</td>
                    <td>{workout.durationMin ?? '—'} min</td>
                    <td>{workout.focus}</td>
                    <td>{workout.difficulty}</td>
                    <td>{Array.isArray(workout.recommendedFor) ? workout.recommendedFor.join(', ') : workout.recommendedFor}</td>
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
