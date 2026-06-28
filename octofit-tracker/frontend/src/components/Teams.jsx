import { useEffect, useState } from 'react'
import { normalizeResponse } from './api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const TEAMS_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [meta, setMeta] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch(TEAMS_ENDPOINT, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`)
        }
        const payload = await response.json()
        return { items: normalizeResponse(payload), meta: payload?.meta ?? payload?.pagination ?? null }
      })
      .then(({ items, meta: pageMeta }) => {
        setTeams(items)
        setMeta(pageMeta)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load teams')
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Teams</h2>
          <p className="text-muted mb-0">Team records and member counts from the backend.</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="text-muted">Loading teams...</div>}

      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-warning">No teams found.</div>
      )}

      {!loading && !error && teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team._id ?? index}>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                  <td>{team.members}</td>
                  <td>{new Date(team.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {meta && (
        <div className="mt-3 text-muted small">
          {meta.page != null ? `Page ${meta.page}` : meta.currentPage != null ? `Page ${meta.currentPage}` : null}
          {meta.total != null && ` · ${meta.total} total teams`}
        </div>
      )}
    </section>
  )
}

export default Teams
