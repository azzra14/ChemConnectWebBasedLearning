// src/pages/GuruDashboard.jsx
import React, { useMemo, useState } from "react";
import { storage } from "../services/storage";
import { Search, Download, Users, BarChart3, ClipboardList, MessageSquareText, Tag } from "lucide-react";
import * as XLSX from "xlsx";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function parseAllFromStorage() {
  const keys = storage.keys();
  const students = new Map(); // username -> { profile, progress, quizzes, reflections }
  const teacherFeedback = []; // {username, materiId, data}

  for (const k of keys) {
    if (k.startsWith("student:")) {
      const parts = k.split(":"); // student:{username}:...
      const username = parts[1];
      if (!students.has(username)) {
        students.set(username, {
          username,
          profile: null,
          progress: {},
          quizzes: {},
          reflections: {},
        });
      }

      const value = storage.get(k);

      if (k.includes(":profile")) students.get(username).profile = value;

      if (k.includes(":progress:")) {
        // student:{u}:progress:class10
        const classKey = parts[3]; // class10
        students.get(username).progress[classKey] = value;
      }

      if (k.includes(":quiz:")) {
        const materiId = parts[3];
        students.get(username).quizzes[materiId] = value;
      }

      if (k.includes(":reflection:")) {
        const materiId = parts[3];
        students.get(username).reflections[materiId] = value;
      }
    }

    if (k.startsWith("teacher:feedback:")) {
      const parts = k.split(":"); // teacher:feedback:{username}:{materiId}
      const username = parts[2];
      const materiId = parts[3];
      teacherFeedback.push({ username, materiId, data: storage.get(k) });
    }
  }

  return { students: Array.from(students.values()), teacherFeedback };
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso || "-";
  }
}

function keyFor(username, materiId) {
  return `${username}__${materiId}`;
}

export default function GuruDashboard() {
  const [tab, setTab] = useState("overview"); // overview | students | quizzes | reflections
  const [q, setQ] = useState("");
  const [filterClass, setFilterClass] = useState("all");

  const { students } = useMemo(() => parseAllFromStorage(), []);

  // ======================
  // STUDENT TABLE
  // ======================
  const studentRows = useMemo(() => {
    const lower = q.trim().toLowerCase();
    return students
      .filter((s) => (lower ? s.username.toLowerCase().includes(lower) : true))
      .map((s) => {
        const lastLogin = s.profile?.lastLoginISO || null;

        let doneTotal = 0;
        let totalMateri = 0;

        for (const classKey of Object.keys(s.progress || {})) {
          const p = s.progress[classKey];
          doneTotal += p?.doneMateriIds?.length || 0;
          totalMateri += p?.totalMateri || 0;
        }

        const pct = totalMateri ? Math.round((doneTotal / totalMateri) * 100) : 0;

        return {
          username: s.username,
          classPicked: s.profile?.selectedClassId || "-",
          doneTotal,
          totalMateri,
          pct,
          lastLogin,
        };
      })
      .filter((row) => (filterClass === "all" ? true : String(row.classPicked) === String(filterClass)));
  }, [students, q, filterClass]);

  // ======================
  // QUIZ TABLE
  // ======================
  const quizRows = useMemo(() => {
    const lower = q.trim().toLowerCase();
    const rows = [];
    for (const s of students) {
      if (lower && !s.username.toLowerCase().includes(lower)) continue;
      for (const materiId of Object.keys(s.quizzes || {})) {
        const v = s.quizzes[materiId];
        if (!v) continue;
        rows.push({
          username: s.username,
          classPicked: s.profile?.selectedClassId || "-",
          materiId,
          materiTitle: v.materiTitle || materiId,
          score: v.score,
          total: v.total,
          attemptCount: v.attemptCount || 1,
          seconds: v.seconds || 0,
          dateISO: v.dateISO,
        });
      }
    }
    return rows.filter((row) => (filterClass === "all" ? true : String(row.classPicked) === String(filterClass)));
  }, [students, q, filterClass]);

  // ======================
  // REFLECTION TABLE
  // ======================
  const reflectionRows = useMemo(() => {
    const lower = q.trim().toLowerCase();
    const rows = [];
    for (const s of students) {
      if (lower && !s.username.toLowerCase().includes(lower)) continue;
      for (const materiId of Object.keys(s.reflections || {})) {
        const v = s.reflections[materiId];
        if (!v) continue;
        rows.push({
          username: s.username,
          classPicked: s.profile?.selectedClassId || "-",
          materiId,
          materiTitle: v.materiTitle || materiId,
          confirm: v.confirm || [],
          reflections: v.reflections || [],
          dateISO: v.dateISO,
        });
      }
    }
    return rows.filter((row) => (filterClass === "all" ? true : String(row.classPicked) === String(filterClass)));
  }, [students, q, filterClass]);

  // ======================
  // OVERVIEW
  // ======================
  const overview = useMemo(() => {
    const totalStudents = students.length;
    const active = students.filter((s) => s.profile?.lastLoginISO).length;

    const byClass = { "10": 0, "11": 0, "12": 0 };
    for (const row of quizRows) {
      const c = String(row.classPicked);
      if (byClass[c] !== undefined) byClass[c] += 1;
    }

    const chartData = Object.keys(byClass).map((k) => ({
      kelas: `Kelas ${k}`,
      aktivitas: byClass[k],
    }));

    return { totalStudents, active, chartData };
  }, [students, quizRows]);

  function exportExcel() {
    // Format: Username | Kelas | Sub-Materi | Skor | Tanggal | Waktu(s) | Percobaan
    const rows = quizRows.map((r) => ({
      Username: r.username,
      Kelas: r.classPicked,
      "Sub-Materi": r.materiTitle,
      Skor: `${r.score}/${r.total}`,
      Tanggal: formatDate(r.dateISO),
      "Waktu (detik)": r.seconds,
      Percobaan: r.attemptCount,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, "Hasil Latihan");
    XLSX.writeFile(wb, "ChemConnect_Hasil_Latihan.xlsx");
  }

  // ======================
  // FEEDBACK GURU (localStorage)
  // ======================
  const [fbText, setFbText] = useState({});
  const [fbTags, setFbTags] = useState({});

  function loadFeedback(username, materiId) {
    const k = `teacher:feedback:${username}:${materiId}`;
    return storage.get(k, { text: "", tags: [] });
  }

  function saveFeedback(username, materiId, data) {
    const k = `teacher:feedback:${username}:${materiId}`;
    storage.set(k, data);
  }

  function ensureFeedbackState(username, materiId) {
    const k = keyFor(username, materiId);
    if (fbText[k] !== undefined) return;

    const existing = loadFeedback(username, materiId);
    setFbText((p) => ({ ...p, [k]: existing.text || "" }));
    setFbTags((p) => ({ ...p, [k]: Array.isArray(existing.tags) ? existing.tags : [] }));
  }

  function addTag(username, materiId, tagValue) {
    const k = keyFor(username, materiId);
    const tag = tagValue.trim();
    if (!tag) return;

    setFbTags((prev) => {
      const cur = prev[k] || [];
      if (cur.includes(tag)) return prev;
      const next = { ...prev, [k]: [...cur, tag] };
      saveFeedback(username, materiId, { text: fbText[k] || "", tags: next[k] });
      return next;
    });
  }

  function removeTag(username, materiId, tag) {
    const k = keyFor(username, materiId);
    setFbTags((prev) => {
      const cur = prev[k] || [];
      const nextTags = cur.filter((t) => t !== tag);
      const next = { ...prev, [k]: nextTags };
      saveFeedback(username, materiId, { text: fbText[k] || "", tags: nextTags });
      return next;
    });
  }

  return (
    <div className="page">
      <div className="pageHead">
        <div>
          <div className="h1">Dashboard Guru</div>
          <div className="muted">Monitoring siswa, hasil latihan, refleksi, dan export data.</div>
        </div>

        <div className="pillRow">
          <div className="pill">
            <Users size={16} />
            <span>Total siswa: <b>{overview.totalStudents}</b></span>
          </div>
          <div className="pill">
            <BarChart3 size={16} />
            <span>Aktif: <b>{overview.active}</b></span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabsRow">
        <button className={`tabBtn ${tab === "overview" ? "active" : ""}`} onClick={() => setTab("overview")}>
          <BarChart3 size={16} /> Overview
        </button>
        <button className={`tabBtn ${tab === "students" ? "active" : ""}`} onClick={() => setTab("students")}>
          <Users size={16} /> Siswa
        </button>
        <button className={`tabBtn ${tab === "quizzes" ? "active" : ""}`} onClick={() => setTab("quizzes")}>
          <ClipboardList size={16} /> Hasil Latihan
        </button>
        <button className={`tabBtn ${tab === "reflections" ? "active" : ""}`} onClick={() => setTab("reflections")}>
          <MessageSquareText size={16} /> Refleksi
        </button>
      </div>

      {/* Search + Filter */}
      <div className="card" style={{ marginTop: 12 }}>
        <div className="rowBetween" style={{ gap: 12, flexWrap: "wrap" }}>
          <div className="inputIcon" style={{ minWidth: 260 }}>
            <Search size={16} />
            <input
              placeholder="Cari username..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="row" style={{ gap: 10, alignItems: "center" }}>
            <div className="muted">Filter kelas:</div>
            <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="select">
              <option value="all">Semua</option>
              <option value="10">Kelas 10</option>
              <option value="11">Kelas 11</option>
              <option value="12">Kelas 12</option>
            </select>

            {tab === "quizzes" ? (
              <button className="btn primary" onClick={exportExcel}>
                <Download size={16} />
                <span>Export Excel</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      {tab === "overview" ? (
        <div className="grid2" style={{ marginTop: 12 }}>
          <div className="card">
            <div className="h3">Ringkasan</div>
            <div className="muted" style={{ marginTop: 8 }}>
              - Total siswa terdeteksi: <b>{overview.totalStudents}</b><br />
              - Siswa yang pernah login: <b>{overview.active}</b><br />
              - Aktivitas dihitung dari jumlah record latihan (quiz) per kelas.
            </div>
          </div>

          <div className="card">
            <div className="h3">Aktivitas per Kelas (Latihan)</div>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={overview.chartData}>
                  <XAxis dataKey="kelas" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="aktivitas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : null}

      {tab === "students" ? (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="h3">Daftar Siswa</div>
          <div className="tableWrap" style={{ marginTop: 10 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Kelas</th>
                  <th>Progress</th>
                  <th>Last Login</th>
                </tr>
              </thead>
              <tbody>
                {studentRows.length ? (
                  studentRows.map((r) => (
                    <tr key={r.username}>
                      <td><b>{r.username}</b></td>
                      <td>{r.classPicked}</td>
                      <td>{r.doneTotal}/{r.totalMateri} ({r.pct}%)</td>
                      <td>{r.lastLogin ? formatDate(r.lastLogin) : "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="muted">Tidak ada data.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {tab === "quizzes" ? (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="h3">Hasil Latihan</div>
          <div className="tableWrap" style={{ marginTop: 10 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Kelas</th>
                  <th>Sub-Materi</th>
                  <th>Skor</th>
                  <th>Percobaan</th>
                  <th>Waktu</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {quizRows.length ? (
                  quizRows.map((r, i) => (
                    <tr key={`${r.username}-${r.materiId}-${i}`}>
                      <td><b>{r.username}</b></td>
                      <td>{r.classPicked}</td>
                      <td>{r.materiTitle}</td>
                      <td>{r.score}/{r.total}</td>
                      <td>{r.attemptCount}</td>
                      <td>{r.seconds}s</td>
                      <td>{formatDate(r.dateISO)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7" className="muted">Belum ada data latihan.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {tab === "reflections" ? (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="h3">Refleksi Siswa</div>
          <div className="muted">Klik sebuah row untuk melihat detail (atau scroll).</div>

          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
            {reflectionRows.length ? (
              reflectionRows.map((r, i) => {
                const k = keyFor(r.username, r.materiId);
                const localText = fbText[k] ?? "";
                const localTags = fbTags[k] ?? [];

                return (
                  <div key={`${r.username}-${r.materiId}-${i}`} className="card" style={{ border: "1px solid var(--line)", boxShadow: "none" }}>
                    <div className="rowBetween" style={{ gap: 10, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontWeight: 800 }}>{r.username}</div>
                        <div className="muted">
                          Kelas: <b>{r.classPicked}</b> • Materi: <b>{r.materiTitle}</b> • {formatDate(r.dateISO)}
                        </div>
                      </div>

                      <button
                        className="btn ghost"
                        onClick={() => ensureFeedbackState(r.username, r.materiId)}
                        title="Muat feedback guru"
                      >
                        <Tag size={16} />
                        <span>Muat Feedback</span>
                      </button>
                    </div>

                    <div style={{ marginTop: 10 }}>
                      <div className="h3" style={{ fontSize: 14 }}>Konfirmasi (3)</div>
                      <div className="muted">
                        {Array.isArray(r.confirm) && r.confirm.length
                          ? r.confirm.map((x, idx) => `Q${idx + 1}: ${x}`).join(" • ")
                          : "-"}
                      </div>
                    </div>

                    <div style={{ marginTop: 10 }}>
                      <div className="h3" style={{ fontSize: 14 }}>Uraian (3)</div>
                      <ol style={{ marginTop: 6 }}>
                        {(r.reflections || []).map((t, idx) => (
                          <li key={idx} style={{ marginBottom: 6 }}>{t}</li>
                        ))}
                      </ol>
                    </div>

                    <div style={{ marginTop: 10 }}>
                      <div className="h3" style={{ fontSize: 14 }}>Feedback Guru (opsional)</div>

                      <textarea
                        className="textarea"
                        value={localText}
                        onFocus={() => ensureFeedbackState(r.username, r.materiId)}
                        onChange={(e) => {
                          const v = e.target.value;
                          setFbText((prev) => {
                            const next = { ...prev, [k]: v };
                            saveFeedback(r.username, r.materiId, { text: v, tags: localTags });
                            return next;
                          });
                        }}
                        placeholder="Tulis komentar/umpan balik untuk siswa..."
                      />

                      <div className="rowBetween" style={{ marginTop: 8, gap: 10, flexWrap: "wrap" }}>
                        <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
                          {(localTags || []).map((t) => (
                            <span key={t} className="chip active" style={{ cursor: "pointer" }} onClick={() => removeTag(r.username, r.materiId, t)}>
                              {t} ✕
                            </span>
                          ))}
                        </div>

                        <button
                          className="btn ghost"
                          onClick={() => {
                            const tag = prompt("Tambah tag (contoh: Perlu Remedial / Bagus / Aktif):");
                            if (tag) addTag(r.username, r.materiId, tag);
                          }}
                        >
                          <Tag size={16} />
                          <span>Tambah Tag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="muted" style={{ marginTop: 10 }}>Belum ada refleksi tersimpan.</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
