// src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import "../styles/login.css";
import { Eye, EyeOff, User, Lock, Beaker } from "lucide-react";

export default function Home({ onLogin }) {
  const [role, setRole] = useState("siswa"); // siswa | guru
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState("");

  const demoPass = useMemo(() => (role === "guru" ? "demo-guru" : "demo-siswa"), [role]);

  function ripple(e) {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");
    const old = btn.getElementsByClassName("ripple")[0];
    if (old) old.remove();
    btn.appendChild(circle);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    const u = username.trim();
    const p = password.trim();
    if (!u) return setErr("Username wajib diisi.");
    if (!p) return setErr("Password wajib diisi.");

    if (p !== demoPass) {
      setErr(`Password salah. Gunakan password demo: ${demoPass}`);
      return;
    }

    onLogin({ role, username: u });
  }

  return (
    <div className="loginWrap">
      <div className="bgOrbs">
        <div className="orb a" />
        <div className="orb b" />
        <div className="orb c" />
        <div className="molecule m1" />
        <div className="molecule m2" />
        <div className="molecule m3" />
      </div>

      <div className="loginCard fadeIn">
        <div className="logoRow">
          <div className="logoIcon">
            <Beaker size={22} />
          </div>
          <div>
            <div className="logoTitle">ChemConnect</div>
            <div className="logoTagline">
              Selamat datang di ChemConnect - Jelajahi Dunia Ikatan Kimia!
            </div>
          </div>
        </div>

        <div className="roleSwitch" aria-label="pilih role">
          <button
            type="button"
            className={`roleBtn ${role === "siswa" ? "active" : ""}`}
            onClick={() => setRole("siswa")}
          >
            Login sebagai Siswa
          </button>
          <button
            type="button"
            className={`roleBtn ${role === "guru" ? "active" : ""}`}
            onClick={() => setRole("guru")}
          >
            Login sebagai Guru
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="label">Username</span>
            <div className="inputIcon">
              <User size={16} />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="contoh: azzra"
                autoComplete="off"
              />
            </div>
          </label>

          <label className="field">
            <span className="label">
              Password Demo: <b>{demoPass}</b>
            </span>
            <div className={`inputIcon ${err ? "shake" : ""}`}>
              <Lock size={16} />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={demoPass}
                type={showPass ? "text" : "password"}
              />
              <button
                type="button"
                className="iconBtn"
                onClick={() => setShowPass((s) => !s)}
                aria-label="toggle password"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          <div className="infoNote">
            ℹ️ Password ini hanya untuk akun demo. Siapapun dapat login sebagai guru atau siswa untuk keperluan penilaian web.
          </div>

          {err ? <div className="error">{err}</div> : null}

          <button className="loginBtn" onClick={ripple} type="submit">
            Masuk
          </button>

          <div className="mini">
            Tips: Kamu bisa login pakai username apa saja. Data tersimpan per-username.
          </div>
        </form>
      </div>
    </div>
  );
}
