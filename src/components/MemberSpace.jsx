import { useEffect, useState } from "react";
import { useLang } from "../i18n.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import PatientDashboard from "./PatientDashboard.jsx";

const CARD_IMAGES = {
  direction: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=700&q=80",
  patient: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80",
};

export default function MemberSpace({ open, onClose }) {
  const { t } = useLang();
  const m = t.member;
  const [role, setRole] = useState(null);
  const [dashboard, setDashboard] = useState(null); // "admin" | "patient" | null
  const [loggedPatient, setLoggedPatient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (role) setRole(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, role, onClose]);

  useEffect(() => {
    if (!open) {
      setRole(null);
      setDashboard(null);
      setLoggedPatient(null);
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    setError(null);
  }, [role]);

  if (!open) return null;

  const handleLogout = () => {
    setDashboard(null);
    setRole(null);
    setLoggedPatient(null);
    onClose();
  };

  if (dashboard === "admin") {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (dashboard === "patient") {
    return <PatientDashboard onLogout={handleLogout} patientData={loggedPatient} />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    setError(null);

    try {
      const response = await fetch("/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await response.json();
      if (data.success) {
        if (data.role === "direction") {
          setDashboard("admin");
        } else if (data.role === "patient") {
          setLoggedPatient(data.patient);
          setDashboard("patient");
        }
      } else {
        setError(data.error || "Identifiant ou mot de passe incorrect");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    }
  };

  return (
    <div className="member-page">
      <header className="member-header">
        <a href="#accueil" className="brand" onClick={onClose}>
          <span className="brand-logo">
            <img src="/logo.final.ASS.png" alt="Logo Association Diabète.ma" />
          </span>
          <span className="brand-text">
            <span className="brand-name">
              <span>Association marocaine</span>
              <strong>Diabète.ma</strong>
            </span>
          </span>
        </a>
        <button className="member-back" onClick={onClose} aria-label={m.close}>×</button>
      </header>

      <div className="member-body">
        <h1 className="member-title">{m.title}</h1>
        <p className="member-subtitle">{m.subtitle}</p>

        <div className="member-cards">
          <button type="button" className="member-card" onClick={() => setRole("direction")}>
            <div className="member-card-media">
              <img src={CARD_IMAGES.direction} alt={m.direction} />
            </div>
            <div className="member-card-body">
              <h3>{m.direction}</h3>
              <p>{m.directionDesc}</p>
            </div>
          </button>

          <button type="button" className="member-card" onClick={() => setRole("patient")}>
            <div className="member-card-media">
              <img src={CARD_IMAGES.patient} alt={m.patient} />
            </div>
            <div className="member-card-body">
              <h3>{m.patient}</h3>
              <p>{m.patientDesc}</p>
            </div>
          </button>
        </div>
      </div>

      {role && (
        <div className="login-overlay" onClick={() => setRole(null)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="login-close" aria-label={m.close} onClick={() => setRole(null)}>×</button>
            <h2 className="login-title">
              {m.login} — {role === "direction" ? m.direction : m.patient}
            </h2>
            <form className="login-form" onSubmit={handleLogin}>
              {error && (
                <div style={{ color: "#d9534f", marginBottom: 16, fontSize: "0.95rem", fontWeight: 600, textAlign: "center" }}>
                  {error}
                </div>
              )}
              <label>
                <span>{m.username}</span>
                <input name="username" type="text" autoComplete="username" required />
              </label>
              <label>
                <span>{m.password}</span>
                <input name="password" type="password" autoComplete="current-password" required />
              </label>
              <button type="submit" className="btn btn-primary login-submit">{m.submit}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
