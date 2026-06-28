import { useEffect, useState } from 'react'
import { fetchApi } from './api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [meta, setMeta] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchApi('workouts', controller.signal)
      .then(({ items, meta: pageMeta }) => {
        setWorkouts(items)
        setMeta(pageMeta)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load workouts')
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Workouts</h2>
          <p className="text-muted mb-0">Workout plans and recommendations returned by the API.</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="text-muted">Loading workouts...</div>}

      {!loading && !error && workouts.length === 0 && (
        <div className="alert alert-warning">No workouts available.</div>
      )}

      {!loading && !error && workouts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Duration (min)</th>
                <th>Focus</th>
                <th>Difficulty</th>
                <th>Recommended For</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr key={workout._id ?? index}>
                  <td>{workout.name}</td>
                  <td>{workout.durationMin}</td>
                  <td>{workout.focus}</td>
                  <td>{workout.difficulty}</td>
                  <td>{Array.isArray(workout.recommendedFor) ? workout.recommendedFor.join(', ') : workout.recommendedFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {meta && (
        <div className="mt-3 text-muted small">
          {meta.page != null ? `Page ${meta.page}` : meta.currentPage != null ? `Page ${meta.currentPage}` : null}
          {meta.total != null && ` · ${meta.total} total workouts`}
        </div>
      )}
    </section>
  )
}

export default Workouts
