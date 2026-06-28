import { useEffect, useState } from 'react'
import { fetchApi } from './api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [meta, setMeta] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchApi('leaderboard', controller.signal)
      .then(({ items, meta: pageMeta }) => {
        setEntries(items)
        setMeta(pageMeta)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load leaderboard')
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Leaderboard</h2>
          <p className="text-muted mb-0">
            Current ranking and score metrics for leaderboard competitors.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="text-muted">Loading leaderboard...</div>}

      {!loading && !error && entries.length === 0 && (
        <div className="alert alert-warning">No leaderboard entries available.</div>
      )}

      {!loading && !error && entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Points</th>
                <th>Metric</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id ?? index}>
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

      {meta && (
        <div className="mt-3 text-muted small">
          {meta.page != null ? `Page ${meta.page}` : meta.currentPage != null ? `Page ${meta.currentPage}` : null}
          {meta.total != null && ` · ${meta.total} total entries`}
        </div>
      )}
    </section>
  )
}

export default Leaderboard
