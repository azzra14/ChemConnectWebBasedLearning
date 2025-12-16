// src/pages/SiswaDashboard.jsx
import React, { useMemo } from "react";
import { CLASSES, getMateriByClass } from "../data/materi";
import { Award, GraduationCap, Sparkles } from "lucide-react";

function pct(done, total) {
  if (!total) return 0;
  return Math.round((done / total) * 100);
}

export default function SiswaDashboard({ user, progress, onPickClass, selectedClassId }) {
  const cards = useMemo(() => {
    return CLASSES.map((c) => {
      const items = getMateriByClass(c.id);
      const doneIds = progress?.[`class${c.id}`]?.doneMateriIds || [];
      const doneCount = doneIds.length;
      const total = items.length;
      const percent = pct(doneCount, total);

      return {
        ...c,
        total,
        doneCount,
        percent,
      };
    });
  }, [progress]);

  const greet = useMemo(() => {
    const h = new Date().getHours();
    if (h < 11) return "Pagi";
    if (h < 15) return "Siang";
    if (h < 19) return "Sore";
    return "Malam";
  }, []);

  return (
    <div className="page">
      <div className="pageHead">
        <div>
          <div className="h1">Pilih Kelas Kamu</div>
          <div className="muted">
            Selamat {greet}, <b>{user.username}</b> 👋 • Progress belajarmu tersimpan otomatis.
          </div>
        </div>
        <div className="pillRow">
          <div className="pill">
            <Sparkles size={16} />
            <span>Modern • Clean • Interaktif</span>
          </div>
          <div className="pill">
            <Award size={16} />
            <span>Badge & progress</span>
          </div>
        </div>
      </div>

      <div className="grid3">
        {cards.map((c) => {
          const active = Number(selectedClassId) === Number(c.id);
          return (
            <div key={c.id} className={`card lift ${active ? "activeCard" : ""}`}>
              <div className="cardTop">
                <div className="cardIcon">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <div className="cardTitle">{c.title}</div>
                  <div className="cardSub">{c.subtitle}</div>
                </div>
              </div>

              <div className="stats">
                <div className="stat">
                  <div className="statNum">{c.total}</div>
                  <div className="statLbl">Sub-materi</div>
                </div>
                <div className="stat">
                  <div className="statNum">{c.doneCount}</div>
                  <div className="statLbl">Selesai</div>
                </div>
                <div className="stat">
                  <div className="statNum">{c.percent}%</div>
                  <div className="statLbl">Progress</div>
                </div>
              </div>

              <div className="progressBar">
                <div className="progressFill" style={{ width: `${c.percent}%` }} />
              </div>

              <button className="btn primary pulse" onClick={() => onPickClass(c.id)}>
                Mulai Belajar
              </button>
            </div>
          );
        })}
      </div>

      <div className="noteCard">
        <b>Catatan:</b> Checklist materi dan progress tracker tersedia saat kamu masuk halaman Materi.
      </div>
    </div>
  );
}
