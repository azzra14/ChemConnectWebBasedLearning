// src/pages/Materi.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getMateriByClass, getMateriById } from "../data/materi";
import {
  CheckCircle2,
  Circle,
  BookOpenText,
  ChevronDown,
  Info,
  Play,
  Sparkles,
  ExternalLink,
} from "lucide-react";

function statusFor(materiId, doneSet, currentId) {
  if (doneSet.has(materiId)) return "done";
  if (currentId === materiId) return "current";
  return "todo";
}

function countDone(items, doneSet) {
  return items.reduce((acc, it) => acc + (doneSet.has(it.id) ? 1 : 0), 0);
}

export default function Materi({
  user,
  selectedClassId,
  selectedMateriId,
  onSelectMateri,
  onMarkDone,
  onGoLatihan,
  progressForClass,
}) {
  const items = useMemo(() => getMateriByClass(selectedClassId), [selectedClassId]);
  const doneSet = useMemo(
    () => new Set(progressForClass?.doneMateriIds || []),
    [progressForClass]
  );
  const doneCount = useMemo(() => countDone(items, doneSet), [items, doneSet]);

  const materi = useMemo(() => {
    return getMateriById(selectedMateriId) || items[0] || null;
  }, [selectedMateriId, items]);

  const [openAcc, setOpenAcc] = useState(0);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setOpenAcc(0);
  }, [materi?.id]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  }

  if (!selectedClassId) {
    return (
      <div className="page">
        <div className="emptyState">
          <div className="h1">Belum pilih kelas</div>
          <div className="muted">Balik ke Dashboard lalu pilih kelas dulu ya.</div>
        </div>
      </div>
    );
  }

  if (!materi) {
    return (
      <div className="page">
        <div className="emptyState">
          <div className="h1">Materi tidak ditemukan</div>
          <div className="muted">Coba pilih materi lain dari daftar.</div>
        </div>
      </div>
    );
  }

  const progressText = `${doneCount}/${items.length} Materi Selesai`;
  const percent = Math.round((doneCount / Math.max(1, items.length)) * 100);

  return (
    <div className="materiShell">
      {/* Sidebar list materi */}
      <aside className="materiSide">
        <div className="materiSideTop">
          <div className="h2">Sub-Materi</div>
          <div className="muted">{progressText}</div>
          <div className="progressBar small">
            <div className="progressFill" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className="materiList">
          {items.map((it) => {
            const st = statusFor(it.id, doneSet, materi.id);
            return (
              <button
                key={it.id}
                className={`materiItem ${materi.id === it.id ? "active" : ""}`}
                onClick={() => onSelectMateri(it.id)}
              >
                <div className={`dotStatus ${st}`}>
                  {st === "done" ? (
                    <CheckCircle2 size={16} />
                  ) : st === "current" ? (
                    <BookOpenText size={16} />
                  ) : (
                    <Circle size={16} />
                  )}
                </div>
                <div className="materiMeta">
                  <div className="materiTitle">{it.title}</div>
                  <div className="materiMini">{it.tags?.join(" • ")}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="materiSideBottom">
          <div className="sideHint">✅ sudah dipelajari • 📖 sedang dipelajari • ⭕ belum dipelajari</div>
        </div>
      </aside>

      {/* Content */}
      <div className="materiContent">
        <div className="materiHead">
          <div>
            <div className="h1">{materi.title}</div>
            <div className="muted">
              {materi.level} • {materi.tags?.join(" • ")}
            </div>
          </div>

          <div className="materiHeadRight">
            <div className="pill">
              <Sparkles size={16} /> <span>Tooltip • Accordion • Interaktif</span>
            </div>
            <button className="btn ghost" onClick={() => showToast("Bookmark (demo) disimpan!")}>
              <ExternalLink size={16} />
              <span>Bookmark</span>
            </button>
          </div>
        </div>

        {/* Highlight box */}
        <div className="highlightBox">
          <div className="highlightTitle">{materi.highlight?.title}</div>
          <div className="highlightBody">{materi.highlight?.content}</div>
        </div>

        {/* Tooltip terms */}
        <div className="tipsRow">
          {materi.tips?.map((t) => (
            <div key={t.term} className="tipChip">
              <Info size={14} />
              <span className="tipTerm">{t.term}</span>
              <span className="tipPopup">{t.def}</span>
            </div>
          ))}
        </div>

        {/* Sections with accordion */}
        <div className="accordion">
          {materi.sections?.map((sec, idx) => {
            const open = openAcc === idx;
            return (
              <div key={sec.h} className={`accItem ${open ? "open" : ""}`}>
                <button className="accHead" onClick={() => setOpenAcc(open ? -1 : idx)}>
                  <div className="accTitle">{sec.h}</div>
                  <ChevronDown size={18} className="chev" />
                </button>

                <div className="accBody">
                  {(sec.p || []).map((p, i) => (
                    <p key={i} className="para">
                      {p}
                    </p>
                  ))}

                  {sec.interactive ? (
                    <InteractiveBlock kind={sec.interactive} onToast={showToast} />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="keyPoints">
          <div className="h3">Ringkasan Cepat</div>
          <ul>
            {(materi.keyPoints || []).map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>

        <div className="ctaRow">
          <button
            className="btn success"
            onClick={() => {
              onMarkDone(materi.id);
              showToast("Materi ditandai selesai ✅");
            }}
          >
            <CheckCircle2 size={16} />
            <span>Tandai Selesai</span>
          </button>

          <button className="btn primary pulse" onClick={() => onGoLatihan(materi.id)}>
            <Play size={16} />
            <span>Lanjut ke Latihan Soal</span>
          </button>
        </div>

        {toast ? <div className="toast">{toast}</div> : null}
      </div>
    </div>
  );
}

function InteractiveBlock({ kind, onToast }) {
  const [val, setVal] = useState(0.6);
  const [step, setStep] = useState(0);

  if (kind === "EN_SLIDER") {
    const label = val < 0.3 ? "Kovalen Nonpolar" : val < 0.7 ? "Kovalen Polar" : "Cenderung Ionik";
    return (
      <div className="miniLab">
        <div className="miniTitle">Mini Lab: ΔEN → Prediksi Ikatan</div>
        <div className="muted">Geser slider untuk melihat kecenderungan jenis ikatan.</div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
        />
        <div className="miniRow">
          <div className="badge">ΔEN: {val.toFixed(2)}</div>
          <div className="badge strong">{label}</div>
        </div>
      </div>
    );
  }

  if (kind === "VALENCE_SIM") {
    const steps = [
      "Atom A dan Atom B belum stabil (kulit valensi belum penuh).",
      "Atom A melepas / berbagi elektron untuk menuju konfigurasi stabil.",
      "Atom B menerima / berbagi elektron agar mendekati oktet/duplet.",
      "Keduanya mencapai keadaan lebih stabil → ikatan terbentuk.",
    ];
    return (
      <div className="miniLab">
        <div className="miniTitle">Simulasi: Kecenderungan Elektron Valensi</div>
        <div className="muted">{steps[step]}</div>
        <div className="miniRow">
          <button className="btn ghost" onClick={() => setStep((s) => Math.max(0, s - 1))}>
            Sebelumnya
          </button>
          <button className="btn primary" onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>
            Berikutnya
          </button>
          <button className="btn success" onClick={() => onToast("Nice! Kamu menjalankan simulasi.")}>
            Selesai
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="miniLab">
      <div className="miniTitle">Interaksi: Diagram/Visual (Demo)</div>
      <div className="muted">Klik tombol untuk animasi mini.</div>
      <div className="miniRow">
        <button className="btn primary" onClick={() => onToast(`Interaksi "${kind}" dijalankan ✨`)}>
          Jalankan
        </button>
      </div>
    </div>
  );
}
