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

function toggleLocalVaultItem(result) {
  const items = getCachedVaultItems();
  const targetId = result.id || result.english || result.arrowKorean || `vault-${Date.now()}`;

  const existingIndex = items.findIndex((item) =>
    item.id === targetId || item.arrowKorean === result.arrowKorean || item.english === result.english
  );

  let isSaved = false;
  let newItems = [];

  if (existingIndex >= 0) {
    // Untoggle / remove
    newItems = items.filter((_, idx) => idx !== existingIndex);
    isSaved = false;
  } else {
    // Toggle on / add
    const newItem = {
      ...result,
      id: targetId,
      savedAt: new Date().toISOString()
    };
    newItems = [newItem, ...items];
    isSaved = true;
  }

  const snapshot = {
    items: newItems,
    masteredCount: getCachedMasteredCount(),
    storagePath: ''
  };

  cacheVaultSnapshot(snapshot);
  return { isSaved, ...snapshot };
}

function removeLocalVaultItem(itemId) {
  const items = getCachedVaultItems();
  const existingIndex = items.findIndex((item) =>
    item.id === itemId || item.arrowKorean === itemId || item.english === itemId
  );

  let newItems = items;
  let masteredCount = getCachedMasteredCount();

  if (existingIndex >= 0) {
    newItems = items.filter((_, idx) => idx !== existingIndex);
    masteredCount += 1;
  }

  const snapshot = {
    items: newItems,
    masteredCount,
    storagePath: ''
  };

  cacheVaultSnapshot(snapshot);
  return snapshot;
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
  } catch {
    const snapshot = {
      items: getCachedVaultItems(),
      masteredCount: getCachedMasteredCount(),
      storagePath: ''
    };
    cacheVaultSnapshot(snapshot);
    return snapshot;
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
    // Pure client-side localStorage fallback when server API fails/is offline
    return toggleLocalVaultItem(result);
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
    // Pure client-side localStorage fallback when server API fails/is offline
    return removeLocalVaultItem(itemId);
  }
}
