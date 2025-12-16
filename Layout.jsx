// src/components/Layout.jsx
import React from "react";
import { Beaker, Home, BookOpen, FileQuestion, MessageSquareText, LogOut, Users, BarChart3 } from "lucide-react";

export default function Layout({
  role,
  user,
  page,
  onNav,
  onLogout,
  rightTop,
  children,
}) {
  const isTeacher = role === "guru";
  const navItems = isTeacher
    ? [
        { key: "guru", label: "Dashboard Guru", icon: BarChart3 },
      ]
    : [
        { key: "siswa", label: "Dashboard", icon: Home },
        { key: "materi", label: "Materi", icon: BookOpen },
        { key: "latihan", label: "Latihan", icon: FileQuestion },
        { key: "refleksi", label: "Refleksi", icon: MessageSquareText },
      ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandIcon">
            <Beaker size={20} />
          </div>
          <div className="brandText">
            <div className="brandName">ChemConnect</div>
            <div className="brandSub">Web-Based Learning</div>
          </div>
        </div>

        <div className="userCard">
          <div className="avatar">{(user?.username || "U")[0].toUpperCase()}</div>
          <div className="userMeta">
            <div className="userName">{user?.username || "-"}</div>
            <div className="userRole">{isTeacher ? "Guru" : "Siswa"}</div>
          </div>
        </div>

        <nav className="nav">
          {navItems.map((it) => {
            const Icon = it.icon;
            const active = page === it.key || (isTeacher && page === "guru");
            return (
              <button
                key={it.key}
                className={`navItem ${active ? "active" : ""}`}
                onClick={() => onNav(it.key)}
              >
                <Icon size={18} />
                <span>{it.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebarFooter">
          <button className="btn ghost" onClick={onLogout} title="Logout">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
          <div className="smallMuted">
            Fullscreen desktop • scroll hanya di konten
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="breadcrumbs">
            <span className="crumb">ChemConnect</span>
            <span className="dot" />
            <span className="crumbStrong">
              {isTeacher ? "Dashboard Guru" : page.toUpperCase()}
            </span>
          </div>
          <div className="topbarRight">{rightTop}</div>
        </header>

        <section className="content">{children}</section>
      </main>
    </div>
  );
}
