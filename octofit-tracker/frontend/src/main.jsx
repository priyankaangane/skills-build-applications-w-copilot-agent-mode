import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { apiBaseUrl, codespaceName } from './components/api'

if (!codespaceName) {
  console.warn(
    'VITE_CODESPACE_NAME is not defined. Falling back to http://localhost:8000/api. Define it in .env.local for Codespaces routing.',
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App apiBaseUrl={apiBaseUrl} codespaceName={codespaceName} />
    </BrowserRouter>
  </StrictMode>,
)
