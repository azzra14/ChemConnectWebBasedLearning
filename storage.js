// src/services/storage.js
// Wrapper agar sesuai prompt: window.storage.set() & window.storage.get()
// Data persistent via localStorage.

const STORAGE_PREFIX = "chemconnect:";

function safeJsonParse(value, fallback = null) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function toKey(key) {
  return `${STORAGE_PREFIX}${key}`;
}

export const storage = {
  get(key, fallback = null) {
    const raw = localStorage.getItem(toKey(key));
    if (raw === null || raw === undefined) return fallback;
    return safeJsonParse(raw, fallback);
  },
  set(key, value) {
    localStorage.setItem(toKey(key), JSON.stringify(value));
    return true;
  },
  remove(key) {
    localStorage.removeItem(toKey(key));
  },
  keys() {
    return Object.keys(localStorage)
      .filter((k) => k.startsWith(STORAGE_PREFIX))
      .map((k) => k.replace(STORAGE_PREFIX, ""));
  },
  raw() {
    // untuk debugging di guru dashboard
    const out = {};
    for (const k of Object.keys(localStorage)) {
      if (k.startsWith(STORAGE_PREFIX)) out[k.replace(STORAGE_PREFIX, "")] = localStorage.getItem(k);
    }
    return out;
  },
};

// expose ke window sesuai prompt
if (typeof window !== "undefined") {
  window.storage = storage;
}
