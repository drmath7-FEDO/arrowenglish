const VAULT_STORAGE_KEY = 'arrow_study_vault';
const MASTERED_COUNT_KEY = 'arrow_vault_mastered_count';
const VAULT_UPDATED_EVENT = 'arrow-vault-updated';

function getCachedVaultItems() {
  try {
    const raw = localStorage.getItem(VAULT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getCachedMasteredCount() {
  try {
    const raw = localStorage.getItem(MASTERED_COUNT_KEY);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

function cacheVaultSnapshot(snapshot) {
  try {
    localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(snapshot.items || []));
    localStorage.setItem(MASTERED_COUNT_KEY, String(snapshot.masteredCount || 0));
  } catch {
    // Ignore cache write failures and keep the app usable.
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(VAULT_UPDATED_EVENT, {
      detail: {
        items: snapshot.items || [],
        masteredCount: snapshot.masteredCount || 0,
        storagePath: snapshot.storagePath || ''
      }
    }));
  }
}

async function requestVaultApi(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Vault API request failed: ${response.status}`);
  }

  return response.json();
}

export function getVaultItems() {
  return getCachedVaultItems();
}

export function getMasteredCount() {
  return getCachedMasteredCount();
}

export function isItemSaved(resultOrId) {
  if (!resultOrId) return false;

  const items = getCachedVaultItems();
  const targetId = typeof resultOrId === 'string'
    ? resultOrId
    : (resultOrId.id || resultOrId.english || resultOrId.arrowKorean);

  return items.some((item) =>
    item.id === targetId || item.english === targetId || item.arrowKorean === targetId
  );
}

export function subscribeToVaultChanges(listener) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handler = (event) => listener(event.detail);
  window.addEventListener(VAULT_UPDATED_EVENT, handler);

  return () => {
    window.removeEventListener(VAULT_UPDATED_EVENT, handler);
  };
}

export async function loadVaultSnapshot() {
  try {
    const snapshot = await requestVaultApi('/api/vault');
    cacheVaultSnapshot(snapshot);
    return snapshot;
  } catch (error) {
    console.error('Failed to load study vault from file storage:', error);
    return {
      items: getCachedVaultItems(),
      masteredCount: getCachedMasteredCount(),
      storagePath: ''
    };
  }
}

export async function initVaultStorage() {
  return loadVaultSnapshot();
}

export async function saveToVault(result) {
  if (!result) {
    return {
      isSaved: false,
      items: getCachedVaultItems(),
      masteredCount: getCachedMasteredCount(),
      storagePath: ''
    };
  }

  try {
    const snapshot = await requestVaultApi('/api/vault/toggle', {
      method: 'POST',
      body: JSON.stringify({ result })
    });

    cacheVaultSnapshot(snapshot);
    return snapshot;
  } catch (error) {
    console.error('Failed to save study vault item to file storage:', error);
    return {
      isSaved: isItemSaved(result),
      items: getCachedVaultItems(),
      masteredCount: getCachedMasteredCount(),
      storagePath: ''
    };
  }
}

export async function removeFromVault(itemId) {
  if (!itemId) {
    return {
      items: getCachedVaultItems(),
      masteredCount: getCachedMasteredCount(),
      storagePath: ''
    };
  }

  try {
    const snapshot = await requestVaultApi('/api/vault/remove', {
      method: 'POST',
      body: JSON.stringify({ itemId })
    });

    cacheVaultSnapshot(snapshot);
    return snapshot;
  } catch (error) {
    console.error('Failed to remove study vault item from file storage:', error);
    return {
      items: getCachedVaultItems(),
      masteredCount: getCachedMasteredCount(),
      storagePath: ''
    };
  }
}
