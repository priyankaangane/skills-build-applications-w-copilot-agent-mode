import './App.css'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const pages = [
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/teams', label: 'Teams' },
  { path: '/users', label: 'Users' },
  { path: '/workouts', label: 'Workouts' },
]

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiPreviewUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

const navLinkClass = ({ isActive }) =>
  `nav-link${isActive ? ' active' : ''}`

function Home() {
  return (
    <>
      <div className="alert alert-secondary">
        Use the navigation above to browse OctoFit Tracker API data.
      </div>
      <div className="mb-4">
        <p className="text-muted">
          Frontend requests are built from <code>import.meta.env.VITE_CODESPACE_NAME</code>.
          If this value is not set, the app safely falls back to <code>http://localhost:8000/api</code>.
        </p>
        <p className="small text-break">
          Current API base: <code>{apiPreviewUrl}</code>
        </p>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {pages.map((page) => (
          <div className="col" key={page.path}>
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-2">{page.label}</h5>
                <p className="card-text text-muted">
                  View the {page.label.toLowerCase()} data returned by the back-end API.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-lg-5">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
                <div>
                  <h1 className="display-6 fw-bold mb-2">OctoFit Tracker</h1>
                  <p className="lead text-muted mb-0">
                    A modern multi-tier fitness tracker using React, Vite, Express, and MongoDB.
                  </p>
                </div>
                <nav className="nav nav-pills flex-wrap gap-2">
                  {pages.map((page) => (
                    <NavLink key={page.path} to={page.path} className={navLinkClass}>
                      {page.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/users" element={<Users />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="*" element={<Navigate replace to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
