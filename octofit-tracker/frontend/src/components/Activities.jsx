import { useEffect, useState } from 'react'
import { normalizeResponse } from './api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const ACTIVITIES_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [meta, setMeta] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch(ACTIVITIES_ENDPOINT, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`)
        }
        const payload = await response.json()
        return { items: normalizeResponse(payload), meta: payload?.meta ?? payload?.pagination ?? null }
      })
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
