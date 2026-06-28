import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function Home({ apiBaseUrl, codespaceName }) {
  return (
    <div>
      <div className="card shadow-sm mb-4">
        <div className="card-body p-5">
          <h1 className="display-6 fw-bold mb-3">OctoFit Tracker</h1>
          <p className="lead text-muted mb-4">
            A modern multi-tier fitness tracking experience for teams,
            workouts, and leaderboard challenges.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <span className="badge bg-primary-subtle text-primary-emphasis">React 19</span>
            <span className="badge bg-success-subtle text-success-emphasis">Vite</span>
            <span className="badge bg-warning-subtle text-warning-emphasis">Express + TypeScript</span>
            <span className="badge bg-info-subtle text-info-emphasis">MongoDB + Mongoose</span>
          </div>
        </div>
      </div>
      <div className="alert alert-secondary">
        API base URL:
        <code className="ms-2">{apiBaseUrl}</code>
      </div>
      {!codespaceName && (
        <div className="alert alert-warning">
          VITE_CODESPACE_NAME is not defined. The application is falling back to{' '}
          <code>http://localhost:8000/api</code>. Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for codespace-managed HTTPS routing.
        </div>
      )}
    </div>
  )
}

function App({ apiBaseUrl, codespaceName }) {
  const linkClass = ({ isActive }) =>
    `nav-link${isActive ? ' active fw-semibold' : ' text-secondary'}`

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="h2 mb-2">OctoFit Tracker</h1>
              <p className="text-muted mb-0">Browse users, teams, activities, workouts, and the leaderboard.</p>
            </div>
            <nav className="nav nav-pills">
              <NavLink to="/" className={linkClass} end>
                Home
              </NavLink>
              <NavLink to="/users" className={linkClass}>
                Users
              </NavLink>
              <NavLink to="/teams" className={linkClass}>
                Teams
              </NavLink>
              <NavLink to="/activities" className={linkClass}>
                Activities
              </NavLink>
              <NavLink to="/workouts" className={linkClass}>
                Workouts
              </NavLink>
              <NavLink to="/leaderboard" className={linkClass}>
                Leaderboard
              </NavLink>
            </nav>
          </div>

          <Routes>
            <Route path="/" element={<Home apiBaseUrl={apiBaseUrl} codespaceName={codespaceName} />} />
            <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
            <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
            <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
            <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
            <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
            <Route path="*" element={<Home apiBaseUrl={apiBaseUrl} codespaceName={codespaceName} />} />
          </Routes>
        </div>
      </div>
    </main>
  )
}

export default App
