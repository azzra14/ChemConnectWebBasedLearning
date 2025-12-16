// src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./app.css";

import { storage } from "./services/storage";

import Home from "./pages/Home";
import Layout from "./components/Layout";

import SiswaDashboard from "./pages/SiswaDashboard";
import Materi from "./pages/Materi";
import Latihan from "./pages/Latihan";
import Refleksi from "./pages/Refleksi";
import GuruDashboard from "./pages/GuruDashboard";

import { CLASSES, getMateriByClass } from "./data/materi";

const KEY = {
  profile: (u) => `student:${u}:profile`,
  progress: (u, classId) => `student:${u}:progress:class${classId}`,
  quiz: (u, materiId) => `student:${u}:quiz:${materiId}`,
  reflection: (u, materiId) => `student:${u}:reflection:${materiId}`,
};

function safeNowISO() {
  try {
    return new Date().toISOString();
  } catch {
    return "";
  }
}

function initialStudentProgress(u, classId) {
  const items = getMateriByClass(classId);
  return {
    classId: Number(classId),
    totalMateri: items.length,
    doneMateriIds: [],
    updatedAtISO: safeNowISO(),
  };
}

export default function App() {
  const [user, setUser] = useState(null); // { role, username }
  const [page, setPage] = useState("siswa"); // siswa|materi|latihan|refleksi|guru
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedMateriId, setSelectedMateriId] = useState(null);

  // trigger refresh data dari storage (untuk guru/siswa)
  const [tick, setTick] = useState(0);

  const role = user?.role || null;
  const username = user?.username || null;

  const isTeacher = role === "guru";
  const isStudent = role === "siswa";

  // ====== LOAD PROFILE saat login ======
  useEffect(() => {
    if (!username || !isStudent) return;

    const profKey = KEY.profile(username);
    const existing = storage.get(profKey, null);

    const nextProfile = {
      username,
      selectedClassId: existing?.selectedClassId ?? null,
      lastLoginISO: safeNowISO(),
      createdAtISO: existing?.createdAtISO || safeNowISO(),
    };

    storage.set(profKey, nextProfile);

    if (nextProfile.selectedClassId) {
      setSelectedClassId(nextProfile.selectedClassId);
      setPage("siswa");
    } else {
      setSelectedClassId(null);
      setPage("siswa");
    }

    setTick((t) => t + 1);
  }, [username, isStudent]);

  // ====== HELPERS STORAGE ======
  const profile = useMemo(() => {
    if (!username || !isStudent) return null;
    return storage.get(KEY.profile(username), null);
  }, [username, isStudent, tick]);

  const progress = useMemo(() => {
    if (!username || !isStudent) return null;

    // kumpulin progress semua kelas biar dashboard bisa hitung
    const out = {};
    for (const c of CLASSES) {
      const k = KEY.progress(username, c.id);
      const v = storage.get(k, null);
      if (v) out[`class${c.id}`] = v;
    }
    return out;
  }, [username, isStudent, tick]);

  const progressForClass = useMemo(() => {
    if (!username || !isStudent || !selectedClassId) return null;
    return storage.get(KEY.progress(username, selectedClassId), null);
  }, [username, isStudent, selectedClassId, tick]);

  // ====== ACTIONS ======
  function handleLogin(payload) {
    setUser(payload);

    if (payload.role === "guru") {
      setPage("guru");
      setSelectedClassId(null);
      setSelectedMateriId(null);
    } else {
      setPage("siswa");
    }
  }

  function logout() {
    setUser(null);
    setPage("siswa");
    setSelectedClassId(null);
    setSelectedMateriId(null);
  }

  function pickClass(classId) {
    if (!username) return;

    setSelectedClassId(classId);

    // update profile
    const profKey = KEY.profile(username);
    const existing = storage.get(profKey, null) || { username };
    storage.set(profKey, {
      ...existing,
      selectedClassId: Number(classId),
      lastLoginISO: safeNowISO(),
    });

    // init progress jika belum ada
    const pKey = KEY.progress(username, classId);
    const existingP = storage.get(pKey, null);
    if (!existingP) {
      storage.set(pKey, initialStudentProgress(username, classId));
    } else {
      // sync totalMateri (kalau materi berubah)
      const items = getMateriByClass(classId);
      storage.set(pKey, {
        ...existingP,
        classId: Number(classId),
        totalMateri: items.length,
      });
    }

    // pilih materi pertama default
    const items = getMateriByClass(classId);
    setSelectedMateriId(items?.[0]?.id || null);

    setTick((t) => t + 1);
    setPage("materi");
  }

  function selectMateri(materiId) {
    setSelectedMateriId(materiId);
    setPage("materi");
  }

  function markDone(materiId) {
    if (!username || !selectedClassId) return;

    const pKey = KEY.progress(username, selectedClassId);
    const cur = storage.get(pKey, null) || initialStudentProgress(username, selectedClassId);
    const done = new Set(cur.doneMateriIds || []);
    done.add(materiId);

    storage.set(pKey, {
      ...cur,
      doneMateriIds: Array.from(done),
      updatedAtISO: safeNowISO(),
      totalMateri: getMateriByClass(selectedClassId).length,
    });

    setTick((t) => t + 1);
  }

  function goLatihan(materiId) {
    setSelectedMateriId(materiId);
    setPage("latihan");
  }

  function finishToRefleksi(materiId) {
    setSelectedMateriId(materiId);
    setPage("refleksi");
  }

  function backToMateri() {
    setPage("materi");
  }

  function retryLatihan(materiId) {
    setSelectedMateriId(materiId);
    setPage("latihan");
  }

  function saveQuizAttempt(materiId, payload) {
    if (!username) return;
    storage.set(KEY.quiz(username, materiId), payload);
    setTick((t) => t + 1);
  }

  function getAttempts(materiId) {
    if (!username) return null;
    return storage.get(KEY.quiz(username, materiId), null);
  }

  function saveReflection(materiId, payload) {
    if (!username) return;
    storage.set(KEY.reflection(username, materiId), payload);
    setTick((t) => t + 1);
  }

  // ====== RIGHT TOP UI ======
  const rightTop = useMemo(() => {
    if (!user) return null;

    if (isTeacher) {
      return (
        <div className="topPills">
          <div className="topPill">Mode Guru</div>
          <button className="btn ghost" onClick={() => setTick((t) => t + 1)}>
            Refresh Data
          </button>
        </div>
      );
    }

    const label = selectedClassId ? `Kelas ${selectedClassId}` : "Belum pilih kelas";
    return (
      <div className="topPills">
        <div className="topPill">{label}</div>
        <button className="btn ghost" onClick={() => setPage("siswa")}>
          Ganti Kelas
        </button>
      </div>
    );
  }, [user, isTeacher, selectedClassId]);

  // ====== RENDER ======
  if (!user) {
    return <Home onLogin={handleLogin} />;
  }

  return (
    <Layout
      role={role}
      user={user}
      page={page}
      onNav={(k) => {
        // guru hanya 1 tab
        if (isTeacher) return setPage("guru");
        setPage(k);
      }}
      onLogout={logout}
      rightTop={rightTop}
    >
      {isTeacher ? (
        <GuruDashboard />
      ) : (
        <>
          {page === "siswa" ? (
            <SiswaDashboard
              user={{ username }}
              progress={progress}
              onPickClass={pickClass}
              selectedClassId={selectedClassId}
            />
          ) : null}

          {page === "materi" ? (
            <Materi
              user={{ username }}
              selectedClassId={selectedClassId}
              selectedMateriId={selectedMateriId}
              onSelectMateri={selectMateri}
              onMarkDone={markDone}
              onGoLatihan={goLatihan}
              progressForClass={progressForClass}
            />
          ) : null}

          {page === "latihan" ? (
            <Latihan
              user={{ username }}
              selectedMateriId={selectedMateriId}
              onFinishToRefleksi={finishToRefleksi}
              onRetry={retryLatihan}
              onBackToMateri={backToMateri}
              saveQuizAttempt={saveQuizAttempt}
              getAttempts={getAttempts}
            />
          ) : null}

          {page === "refleksi" ? (
            <Refleksi
              user={{ username }}
              selectedMateriId={selectedMateriId}
              saveReflection={saveReflection}
              onBackToMateri={backToMateri}
            />
          ) : null}
        </>
      )}
    </Layout>
  );
}
