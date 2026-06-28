const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

const normalizeResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload?.data) {
    return Array.isArray(payload.data) ? payload.data : [payload.data]
  }

  if (payload?.results) {
    return Array.isArray(payload.results) ? payload.results : [payload.results]
  }

  return []
}

export const fetchApi = async (component, signal) => {
  const safeComponent = component.replace(/^\/+|\/+$/g, '')
  const url = `${API_BASE_URL}/${safeComponent}/`
  const response = await fetch(url, { signal })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`)
  }

  const payload = await response.json()
  return {
    items: normalizeResponse(payload),
    meta: payload?.meta ?? payload?.pagination ?? null,
  }
}
