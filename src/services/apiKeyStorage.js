const API_KEY_STORAGE_KEY = 'arrow_gemini_api_key';

export function getStoredApiKey() {
  try {
    return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export async function fetchStoredApiKeyAsync() {
  const localKey = getStoredApiKey();
  if (localKey) return localKey;

  try {
    const res = await fetch('/api/config/key');
    if (res.ok) {
      const data = await res.json();
      if (data && data.apiKey) {
        try {
          localStorage.setItem(API_KEY_STORAGE_KEY, data.apiKey);
        } catch {
          // ignore storage error
        }
        return data.apiKey;
      }
    }
  } catch {
    // Ignore network error
  }

  return '';
}

export async function saveStoredApiKey(apiKey) {
  const cleanKey = (apiKey || '').trim();
  try {
    localStorage.setItem(API_KEY_STORAGE_KEY, cleanKey);
  } catch {
    // Ignore storage error
  }

  try {
    await fetch('/api/config/key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: cleanKey })
    });
  } catch {
    // Ignore network error
  }
}

export async function clearStoredApiKey() {
  try {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  } catch {
    // Ignore storage error
  }

  try {
    await fetch('/api/config/key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: '' })
    });
  } catch {
    // Ignore network error
  }
}
