// src/pages/Refleksi.jsx
import React, { useMemo, useState } from "react";
import { getMateriById } from "../data/materi";
import { MessageSquareText, Send, CheckCircle2 } from "lucide-react";

const CONFIRM_Q = [
  {
    q: "Aku bisa membedakan ikatan ion dan kovalen berdasarkan proses pembentukannya.",
    options: ["Belum", "Cukup", "Yakin", "Sangat Yakin"],
  },
  {
    q: "Aku bisa menghubungkan bentuk molekul dengan kepolaran molekul.",
    options: ["Belum", "Cukup", "Yakin", "Sangat Yakin"],
  },
  {
    q: "Aku memahami bagaimana gaya antarmolekul memengaruhi titik didih/leleh.",
    options: ["Belum", "Cukup", "Yakin", "Sangat Yakin"],
  },
];

export default function Refleksi({ user, selectedMateriId, saveReflection, onBackToMateri }) {
  const materi = useMemo(() => getMateriById(selectedMateriId), [selectedMateriId]);
  const [confirm, setConfirm] = useState([null, null, null]);
  const [text, setText] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const counts = text.map((t) => t.length);

  const prompts = useMemo(() => {
    const name = materi?.title || "[nama materi]";
    return [
      `Apa yang kamu pelajari dari materi ${name} ini?`,
      "Bagaimana materi ini bisa diterapkan dalam kehidupan sehari-hari?",
      "Apa bagian yang paling sulit dipahami dan kenapa?",
    ];
  }, [materi]);

  function updateConfirm(i, v) {
    setConfirm((prev) => prev.map((x, idx) => (idx === i ? v : x)));
  }

  function updateText(i, v) {
    setText((prev) => prev.map((x, idx) => (idx === i ? v : x)));
  }

  async function submit() {
    setLoading(true);

    const allConfirm = confirm.every((x) => x !== null);
    const allText = text.every((x) => x.trim().length >= 10);

    if (!allConfirm || !allText) {
      setLoading(false);
      alert("Lengkapi semua jawaban ya (PG + uraian minimal 10 karakter).");
      return;
    }

    const payload = {
      username: user.username,
      materiId: selectedMateriId,
      materiTitle: materi?.title || selectedMateriId,
      confirm,
      reflections: text,
      dateISO: new Date().toISOString(),
    };

    saveReflection(selectedMateriId, payload);

    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSubmitted(true);
  }

  if (!selectedMateriId) {
    return (
      <div className="page">
        <div className="emptyState">
          <div className="h1">Refleksi belum siap</div>
          <div className="muted">Selesaikan latihan dulu lalu masuk refleksi.</div>
          <button className="btn primary" onClick={onBackToMateri}>Ke Materi</button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="page">
        <div className="card">
          <div className="h1" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <CheckCircle2 /> Terima kasih! 🎓
          </div>
          <div className="muted">Terima kasih sudah menyelesaikan materi ini! Guru akan membaca refleksimu.</div>
          <div className="ctaRow" style={{ marginTop: 16 }}>
            <button className="btn primary" onClick={onBackToMateri}>Kembali ke Daftar Materi</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="pageHead">
        <div>
          <div className="h1" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <MessageSquareText /> Refleksi
          </div>
          <div className="muted">
            Materi: <b>{materi?.title || selectedMateriId}</b>
          </div>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="h3">Bagian 1 — Konfirmasi Pemahaman (3 Soal)</div>
          <div className="muted">Pilih salah satu opsi per pertanyaan.</div>

          <div className="reflectQ">
            {CONFIRM_Q.map((qq, i) => (
              <div key={qq.q} className="reflectBlock">
                <div className="reflectTitle">{i + 1}. {qq.q}</div>
                <div className="reflectOptions">
                  {qq.options.map((op, j) => (
                    <button
                      key={op}
                      className={`chip ${confirm[i] === j ? "active" : ""}`}
                      onClick={() => updateConfirm(i, j)}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="h3">Bagian 2 — Refleksi Uraian (3 Pertanyaan)</div>
          <div className="muted">Tulis minimal 10 karakter. Ada counter otomatis.</div>

          {prompts.map((p, i) => (
            <div key={p} className="reflectBlock">
              <div className="reflectTitle">{i + 1}. {p}</div>
              <textarea
                value={text[i]}
                onChange={(e) => updateText(i, e.target.value)}
                placeholder="Tulis pemikiranmu di sini... 💭"
                className="textarea"
              />
              <div className="counter">{counts[i]} karakter</div>
            </div>
          ))}

          <button className="btn primary pulse" onClick={submit} disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" /> Mengirim...
              </>
            ) : (
              <>
                <Send size={16} /> Kirim Refleksi
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
