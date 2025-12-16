// src/pages/Latihan.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getQuizByMateriId } from "../data/quizzes";
import { getMateriById } from "../data/materi";
import { Check, X, Sparkles, Timer, TimerOff, RotateCcw, ArrowRight } from "lucide-react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

function nowISO() {
  return new Date().toISOString();
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

export default function Latihan({
  user,
  selectedMateriId,
  onFinishToRefleksi,
  onRetry,
  onBackToMateri,
  saveQuizAttempt,
  getAttempts,
}) {
  const materi = useMemo(() => getMateriById(selectedMateriId), [selectedMateriId]);
  const questions = useMemo(
    () => (selectedMateriId ? getQuizByMateriId(selectedMateriId) : null),
    [selectedMateriId]
  );

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [shake, setShake] = useState(false);

  const [timerOn, setTimerOn] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setIdx(0);
    setPicked(null);
    setFeedback(null);
    setAnswers([]);
    setShake(false);
    setTimerOn(false);
    setSeconds(0);
  }, [selectedMateriId]);

  useEffect(() => {
    if (!timerOn) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [timerOn]);

  if (!selectedMateriId) {
    return (
      <div className="page">
        <div className="emptyState">
          <div className="h1">Pilih materi dulu</div>
          <div className="muted">Masuk ke Materi dan klik “Lanjut ke Latihan Soal”.</div>
          <button className="btn primary" onClick={onBackToMateri}>Ke Materi</button>
        </div>
      </div>
    );
  }

  if (!questions) {
    return (
      <div className="page">
        <div className="emptyState">
          <div className="h1">Quiz belum tersedia</div>
          <div className="muted">Materi ini belum punya paket soal.</div>
          <button className="btn primary" onClick={onBackToMateri}>Ke Materi</button>
        </div>
      </div>
    );
  }

  const total = questions.length;
  const q = questions[idx];

  const finished = answers.length === total;
  const score = answers.reduce((a, x) => a + (x.ok ? 1 : 0), 0);

  function saveResult() {
    const prev = getAttempts(selectedMateriId);
    const attemptCount = (prev?.attemptCount || 0) + 1;

    const payload = {
      username: user.username,
      materiId: selectedMateriId,
      materiTitle: materi?.title || selectedMateriId,
      score,
      total,
      attemptCount,
      seconds,
      timerOn,
      dateISO: nowISO(),
    };

    saveQuizAttempt(selectedMateriId, payload);
  }

  useEffect(() => {
    if (!finished) return;
    saveResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function pickOption(i) {
    if (picked !== null) return;
    setPicked(i);

    const ok = i === q.answerIndex;
    const msg = ok
      ? `Benar sekali! 🎉 ${q.explainCorrect}`
      : `Yah, belum tepat 😊 ${q.explainWrong} (Jawaban: ${q.options[q.answerIndex]})`;

    if (!ok) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
    } else {
      const el = document.querySelector(".quizCard");
      if (el) {
        el.classList.add("sparkle");
        setTimeout(() => el.classList.remove("sparkle"), 700);
      }
    }

    setFeedback({ ok, msg });
    setAnswers((prev) => [...prev, { pick: i, ok }]);
  }

  function next() {
    setPicked(null);
    setFeedback(null);
    setIdx((i) => clamp(i + 1, 0, total - 1));
  }

  if (finished) {
    const data = [
      { name: "Benar", value: score },
      { name: "Salah", value: total - score },
    ];

    const msg =
      score === total
        ? "Sempurna! 🌟 Kamu menguasai materi ini!"
        : score >= 3
        ? "Bagus! 💪 Terus tingkatkan ya!"
        : "Jangan menyerah! 📚 Coba baca materi lagi dan ulangi latihannya";

    return (
      <div className="page">
        <div className="pageHead">
          <div>
            <div className="h1">Hasil Latihan</div>
            <div className="muted">
              {materi?.title} • Skor: <b>{score}/{total}</b>
            </div>
          </div>
          <div className="pillRow">
            <div className="pill">
              <Sparkles size={16} />
              <span>Feedback interaktif</span>
            </div>
          </div>
        </div>

        <div className="grid2">
          <div className="card">
            <div className="h3">Ringkasan</div>
            <div className="bigScore">{score}/{total}</div>
            <div className="muted">{msg}</div>

            <div className="progressBar" style={{ marginTop: 12 }}>
              <div className="progressFill" style={{ width: `${Math.round((score / total) * 100)}%` }} />
            </div>

            <div className="muted" style={{ marginTop: 10 }}>
              Percobaan tersimpan per-username (demo).
            </div>

            <div className="ctaRow" style={{ marginTop: 14 }}>
              <button className="btn ghost" onClick={() => onRetry(selectedMateriId)}>
                <RotateCcw size={16} />
                <span>Ulangi Latihan</span>
              </button>
              <button className="btn primary pulse" onClick={() => onFinishToRefleksi(selectedMateriId)}>
                <ArrowRight size={16} />
                <span>Lanjut ke Refleksi</span>
              </button>
            </div>
          </div>

          <div className="card">
            <div className="h3">Visualisasi</div>
            <div className="chartBox">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie dataKey="value" data={data} outerRadius={90} label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="muted">(Menggunakan Recharts)</div>
          </div>
        </div>
      </div>
    );
  }

  const stepText = `Soal ${idx + 1}/${total}`;

  return (
    <div className="page">
      <div className="pageHead">
        <div>
          <div className="h1">Latihan Soal</div>
          <div className="muted">
            {materi?.title} • <b>{stepText}</b>
          </div>
        </div>

        <div className="pillRow">
          <button className="pillBtn" onClick={() => setTimerOn((t) => !t)}>
            {timerOn ? <Timer size={16} /> : <TimerOff size={16} />}
            <span>{timerOn ? `Timer: ${seconds}s` : "Timer Off"}</span>
          </button>
        </div>
      </div>

      <div className={`quizCard card ${shake ? "shake" : ""}`}>
        <div className="qText">{q.q}</div>

        <div className="options">
          {q.options.map((opt, i) => {
            const chosen = picked === i;
            const correct = picked !== null && i === q.answerIndex;
            const wrong = chosen && picked !== q.answerIndex;

            return (
              <button
                key={`${idx}-${i}`}
                className={`opt ${chosen ? "chosen" : ""} ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                onClick={() => pickOption(i)}
              >
                <span className="optKey">{String.fromCharCode(65 + i)}</span>
                <span className="optText">{opt}</span>
                {picked !== null ? (correct ? <Check size={18} /> : wrong ? <X size={18} /> : <span />) : <span />}
              </button>
            );
          })}
        </div>

        {feedback ? (
          <div className={`feedback ${feedback.ok ? "ok" : "bad"}`}>{feedback.msg}</div>
        ) : (
          <div className="muted" style={{ marginTop: 10 }}>
            Pilih jawaban untuk melihat feedback (benar/salah).
          </div>
        )}

        <div className="ctaRow" style={{ marginTop: 14 }}>
          <button className="btn ghost" onClick={onBackToMateri}>Kembali ke Materi</button>
          <button className="btn primary" disabled={picked === null} onClick={next}>
            Soal Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}
