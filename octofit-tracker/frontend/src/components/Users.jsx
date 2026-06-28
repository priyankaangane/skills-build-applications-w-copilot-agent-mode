import { useEffect, useState } from 'react'
import { fetchApi } from './api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [meta, setMeta] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchApi('users', controller.signal)
      .then(({ items, meta: pageMeta }) => {
        setUsers(items)
        setMeta(pageMeta)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load users')
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Users</h2>
          <p className="text-muted mb-0">User profiles and team assignment data from the backend.</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="text-muted">Loading users...</div>}

      {!loading && !error && users.length === 0 && (
        <div className="alert alert-warning">No users found.</div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-borderless align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Team</th>
                <th>Joined At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id ?? index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.team}</td>
                  <td>{new Date(user.joinedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {meta && (
        <div className="mt-3 text-muted small">
          {meta.page != null ? `Page ${meta.page}` : meta.currentPage != null ? `Page ${meta.currentPage}` : null}
          {meta.total != null && ` · ${meta.total} total users`}
        </div>
      )}
    </section>
  )
}

export default Users
