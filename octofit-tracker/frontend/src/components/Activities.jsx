import { useEffect, useState } from 'react'
import { fetchApi } from './api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [meta, setMeta] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchApi('activities', controller.signal)
      .then(({ items, meta: pageMeta }) => {
        setActivities(items)
        setMeta(pageMeta)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load activities')
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Activities</h2>
          <p className="text-muted mb-0">
            Recent activity records from the OctoFit back end.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="text-muted">Loading activities...</div>}

      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-warning">No activities found.</div>
      )}

      {!loading && !error && activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Distance (km)</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity._id ?? index}>
                  <td>{activity.user}</td>
                  <td>{activity.type}</td>
                  <td>{activity.distanceKm}</td>
                  <td>{activity.durationMin}</td>
                  <td>{activity.calories}</td>
                  <td>{new Date(activity.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {meta && (
        <div className="mt-3 text-muted small">
          {meta.page != null ? `Page ${meta.page}` : meta.currentPage != null ? `Page ${meta.currentPage}` : null}
          {meta.total != null && ` · ${meta.total} total records`}
        </div>
      )}
    </section>
  )
}

export default Activities
