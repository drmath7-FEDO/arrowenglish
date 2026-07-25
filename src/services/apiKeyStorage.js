const API_KEY_STORAGE_KEY = 'arrow_gemini_api_key';

export function getStoredApiKey() {
  try {
    return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export function saveStoredApiKey(apiKey) {
  try {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey.trim());
  } catch {
    // Ignore storage write failures and keep the app usable.
  }
}

export function clearStoredApiKey() {
  try {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  } catch {
    // Ignore storage removal failures and keep the app usable.
  }
}
