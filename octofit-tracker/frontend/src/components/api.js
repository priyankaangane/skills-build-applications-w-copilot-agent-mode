export const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function normalizeApiList(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (!payload || typeof payload !== 'object') {
    return [];
  }
  if (Array.isArray(payload.data)) {
    return payload.data;
  }
  if (Array.isArray(payload.results)) {
    return payload.results;
  }
  if (Array.isArray(payload.items)) {
    return payload.items;
  }
  if (Array.isArray(payload.data?.items)) {
    return payload.data.items;
  }
  return [];
}

export async function fetchApiResource(apiBaseUrl, resource) {
  const url = `${apiBaseUrl}/${resource}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${resource}: ${response.statusText}`);
  }
  const payload = await response.json();
  return normalizeApiList(payload);
}
