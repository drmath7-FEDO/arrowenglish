const VAULT_STORAGE_KEY = 'arrow_study_vault';
const MASTERED_COUNT_KEY = 'arrow_vault_mastered_count';
const VAULT_UPDATED_EVENT = 'arrow-vault-updated';

const DB_NAME = 'ArrowEnglishDB';
const DB_VERSION = 1;
const STORE_NAME = 'handles';
const HANDLE_KEY = 'vault_directory_handle';

let activeDirectoryHandle = null;

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
        storagePath: snapshot.storagePath || (activeDirectoryHandle ? `PC 폴더: [${activeDirectoryHandle.name}]` : ''),
        directoryName: activeDirectoryHandle?.name || ''
      }
    }));
  }
}

// --- IndexedDB Directory Handle Storage ---
function openDirectoryDb() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getStoredDirectoryHandle() {
  try {
    const db = await openDirectoryDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(HANDLE_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function storeDirectoryHandle(handle) {
  try {
    const db = await openDirectoryDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(handle, HANDLE_KEY);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return false;
  }
}

async function removeStoredDirectoryHandle() {
  try {
    const db = await openDirectoryDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(HANDLE_KEY);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

// --- Helper Utilities for Web File System Access API ---
function sanitizeFileName(name) {
  const withoutControlChars = Array.from(String(name || 'vault-item'))
    .map((character) => (character.charCodeAt(0) < 32 ? '_' : character))
    .join('');

  const sanitized = withoutControlChars
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, '_')
    .slice(0, 120);

  return sanitized || 'vault-item';
}

function getVaultItemId(result) {
  return result?.id || result?.english || result?.arrowKorean || `vault-${Date.now()}`;
}

async function verifyDirectoryPermission(handle, readWrite = true) {
  if (!handle) return false;
  const options = { mode: readWrite ? 'readwrite' : 'read' };
  try {
    if ((await handle.queryPermission(options)) === 'granted') {
      return true;
    }
    if ((await handle.requestPermission(options)) === 'granted') {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

async function readDirectoryVaultSnapshot(dirHandle) {
  const items = [];
  let masteredCount = 0;

  try {
    for await (const entry of dirHandle.values()) {
      if (entry.kind === 'file') {
        if (entry.name === '_vault_meta.json') {
          try {
            const file = await entry.getFile();
            const text = await file.text();
            const meta = JSON.parse(text);
            masteredCount = meta.masteredCount || 0;
          } catch {}
        } else if (entry.name.endsWith('.json')) {
          try {
            const file = await entry.getFile();
            const text = await file.text();
            const item = JSON.parse(text);
            if (item) items.push(item);
          } catch {}
        }
      }
    }
  } catch (err) {
    console.error('Failed reading directory handle:', err);
  }

  items.sort((left, right) => (right.savedAt || '').localeCompare(left.savedAt || ''));

  return {
    items,
    masteredCount,
    storagePath: `PC 폴더: [${dirHandle.name}]`
  };
}

async function writeDirectoryVaultItem(dirHandle, item) {
  const fileName = `${sanitizeFileName(item.id)}.json`;
  const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(JSON.stringify(item, null, 2));
  await writable.close();
}

async function deleteDirectoryVaultItem(dirHandle, itemId) {
  const fileName = `${sanitizeFileName(itemId)}.json`;
  try {
    await dirHandle.removeEntry(fileName);
  } catch {
    for await (const entry of dirHandle.values()) {
      if (entry.kind === 'file' && entry.name.endsWith('.json') && entry.name !== '_vault_meta.json') {
        try {
          const file = await entry.getFile();
          const text = await file.text();
          const item = JSON.parse(text);
          if (item && (item.id === itemId || item.english === itemId || item.arrowKorean === itemId)) {
            await dirHandle.removeEntry(entry.name);
            break;
          }
        } catch {}
      }
    }
  }
}

async function writeDirectoryVaultMeta(dirHandle, meta) {
  const fileHandle = await dirHandle.getFileHandle('_vault_meta.json', { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(JSON.stringify(meta, null, 2));
  await writable.close();
}

// --- Public Directory Selection API ---
export async function selectLocalDirectory() {
  if (typeof window === 'undefined' || !('showDirectoryPicker' in window)) {
    throw new Error('이 브라우저는 PC 폴더 직접 연동(File System Access API)을 지원하지 않습니다. Google Chrome 또는 Microsoft Edge 브라우저를 이용해 주세요.');
  }

  const dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
  await storeDirectoryHandle(dirHandle);
  activeDirectoryHandle = dirHandle;

  const snapshot = await readDirectoryVaultSnapshot(dirHandle);
  cacheVaultSnapshot(snapshot);
  return snapshot;
}

export async function disconnectLocalDirectory() {
  await removeStoredDirectoryHandle();
  activeDirectoryHandle = null;
  const snapshot = {
    items: getCachedVaultItems(),
    masteredCount: getCachedMasteredCount(),
    storagePath: ''
  };
  cacheVaultSnapshot(snapshot);
  return snapshot;
}

export function getDirectoryStatus() {
  return {
    isConnected: !!activeDirectoryHandle,
    folderName: activeDirectoryHandle?.name || '',
    isSupported: typeof window !== 'undefined' && 'showDirectoryPicker' in window
  };
}

// --- Standard Vault API calls with fallbacks ---
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
    newItems = items.filter((_, idx) => idx !== existingIndex);
    isSaved = false;
  } else {
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
  // 1. Dev Server API
  try {
    const snapshot = await requestVaultApi('/api/vault');
    cacheVaultSnapshot(snapshot);
    return snapshot;
  } catch {
    // 2. Web File System Access API
    if (!activeDirectoryHandle) {
      const storedHandle = await getStoredDirectoryHandle();
      if (storedHandle) {
        const hasPermission = await verifyDirectoryPermission(storedHandle, true);
        if (hasPermission) {
          activeDirectoryHandle = storedHandle;
        }
      }
    }

    if (activeDirectoryHandle) {
      try {
        const snapshot = await readDirectoryVaultSnapshot(activeDirectoryHandle);
        cacheVaultSnapshot(snapshot);
        return snapshot;
      } catch (err) {
        console.warn('Directory snapshot read failed, falling back:', err);
      }
    }

    // 3. LocalStorage Fallback
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

  // 1. Dev Server API
  try {
    const snapshot = await requestVaultApi('/api/vault/toggle', {
      method: 'POST',
      body: JSON.stringify({ result })
    });

    cacheVaultSnapshot(snapshot);
    return snapshot;
  } catch (error) {
    // 2. Web File System Access API
    if (activeDirectoryHandle) {
      try {
        const snapshot = await readDirectoryVaultSnapshot(activeDirectoryHandle);
        const targetId = getVaultItemId(result);
        const existingIndex = snapshot.items.findIndex(
          (item) => item.id === targetId || item.arrowKorean === result.arrowKorean || item.english === result.english
        );

        let isSaved = false;
        if (existingIndex >= 0) {
          const itemToRemove = snapshot.items[existingIndex];
          await deleteDirectoryVaultItem(activeDirectoryHandle, itemToRemove.id);
          isSaved = false;
        } else {
          const newItem = {
            ...result,
            id: targetId,
            savedAt: new Date().toISOString()
          };
          await writeDirectoryVaultItem(activeDirectoryHandle, newItem);
          isSaved = true;
        }

        const newSnapshot = await readDirectoryVaultSnapshot(activeDirectoryHandle);
        cacheVaultSnapshot(newSnapshot);
        return { isSaved, ...newSnapshot };
      } catch (err) {
        console.error('Failed writing to local PC directory:', err);
      }
    }

    // 3. LocalStorage Fallback
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

  // 1. Dev Server API
  try {
    const snapshot = await requestVaultApi('/api/vault/remove', {
      method: 'POST',
      body: JSON.stringify({ itemId })
    });

    cacheVaultSnapshot(snapshot);
    return snapshot;
  } catch (error) {
    // 2. Web File System Access API
    if (activeDirectoryHandle) {
      try {
        await deleteDirectoryVaultItem(activeDirectoryHandle, itemId);
        const snapshot = await readDirectoryVaultSnapshot(activeDirectoryHandle);
        const newMasteredCount = (snapshot.masteredCount || 0) + 1;
        await writeDirectoryVaultMeta(activeDirectoryHandle, { masteredCount: newMasteredCount });

        const updatedSnapshot = {
          ...snapshot,
          masteredCount: newMasteredCount
        };
        cacheVaultSnapshot(updatedSnapshot);
        return updatedSnapshot;
      } catch (err) {
        console.error('Failed removing from local PC directory:', err);
      }
    }

    // 3. LocalStorage Fallback
    return removeLocalVaultItem(itemId);
  }
}
