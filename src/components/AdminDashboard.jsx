import { useState, useEffect } from "react";

const ICONS = {
  dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  patients: "M16 11a3 3 0 100-6 3 3 0 000 6zm-8 0a3 3 0 100-6 3 3 0 000 6zm0 2c-2.7 0-6 1.3-6 4v2h8v-2c0-1 .4-1.9 1-2.6C10.3 13.3 9 13 8 13zm8 0c-.5 0-1.1 0-1.7.1 1 .8 1.7 1.9 1.7 3.3V18h6v-2c0-2.7-3.3-3-6-3z",
  dons: "M12 21s-8-4.5-8-10a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 11c0 5.5-8 10-8 10z",
  campagnes: "M3 11l18-5v12L3 14v3H1v-6h2zm16 4.5V8.5l-9 2.5v2z",
  membres: "M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6z",
  profil: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a4 4 0 110 8 4 4 0 010-8zm0 15a8 8 0 01-6-2.7c0-2.7 4-4.1 6-4.1s6 1.4 6 4.1A8 8 0 0112 21z",
};

const SECTIONS = [
  { id: "dashboard", label: "Tableau de bord", tabs: [] },
  { id: "patients", label: "Gestion des patients", tabs: ["Ajouter un patient", "Modifier les informations", "Consulter le dossier", "Suivi médical", "Historique des consultations"] },
  { id: "dons", label: "Gestion des dons", tabs: ["Liste des dons", "Validation des paiements", "Reçus de dons", "Statistiques"] },
  { id: "campagnes", label: "Gestion des campagnes", tabs: ["Caravanes médicales", "Journées de sensibilisation", "Ateliers", "Inscriptions"] },
  { id: "membres", label: "Gestion des membres", tabs: ["Ajouter un membre", "Attribuer un rôle", "Activer/Désactiver un compte", "Paramètres"] },
  { id: "profil", label: "Profil", tabs: ["Changer le mot de passe", "Déconnexion"] },
];

const STATS = [
  { label: "Patients inscrits", value: "1 248", icon: ICONS.patients, color: "#3f8f56" },
  { label: "Membres", value: "86", icon: ICONS.membres, color: "#ec7f2e" },
  { label: "Dons reçus", value: "342 500 DH", icon: ICONS.dons, color: "#d9534f" },
];

const RDV = [
  { heure: "09:00", patient: "Réunion du bureau", motif: "Point hebdomadaire avec le conseil d’administration" },
  { heure: "10:30", patient: "Partenaires médicaux", motif: "Échange avec les médecins bénévoles" },
  { heure: "11:15", patient: "Préparation caravane", motif: "Organisation de la caravane de Meknès" },
  { heure: "14:00", patient: "Entretien donateurs", motif: "Suivi des dons et partenariats" },
  { heure: "16:00", patient: "Équipe de terrain", motif: "Briefing des bénévoles régionaux" },
];

const EVENTS = [
  { date: "22 juil. 2026", titre: "Caravane médicale à Meknès", lieu: "Meknès" },
  { date: "05 août 2026", titre: "Atelier nutrition", lieu: "Rabat" },
  { date: "14 nov. 2026", titre: "Journée mondiale du diabète", lieu: "Casablanca" },
];

const PATIENTS = [
  { id: "P-1024", nom: "Fatima Zahra B.", age: 54, type: "Type 2", tel: "0661-23-45-67", statut: "Actif" },
  { id: "P-1025", nom: "Ahmed L.", age: 41, type: "Type 1", tel: "0662-98-76-54", statut: "Actif" },
  { id: "P-1026", nom: "Sanae M.", age: 33, type: "Gestationnel", tel: "0663-11-22-33", statut: "Suivi" },
  { id: "P-1027", nom: "Youssef R.", age: 60, type: "Type 2", tel: "0664-44-55-66", statut: "Actif" },
];

const DONS = [
  { id: "D-501", donateur: "Omar T.", montant: "1 000 DH", date: "10 juil. 2026", statut: "Validé" },
  { id: "D-502", donateur: "Société ALPHA", montant: "25 000 DH", date: "08 juil. 2026", statut: "En attente" },
  { id: "D-503", donateur: "Khadija E.", montant: "500 DH", date: "05 juil. 2026", statut: "Validé" },
  { id: "D-504", donateur: "Anonyme", montant: "2 500 DH", date: "01 juil. 2026", statut: "En attente" },
];

const MEMBRES = [
  { id: "M-01", nom: "Kadous Oumaima", role: "Présidente", statut: "Actif" },
  { id: "M-02", nom: "Dr. Karim B.", role: "Administrateur", statut: "Actif" },
  { id: "M-03", nom: "Nadia L.", role: "Coordinatrice", statut: "Actif" },
  { id: "M-04", nom: "Salma A.", role: "Bénévole", statut: "Désactivé" },
];

const DON_MONTHS = [
  { label: "Jan", value: 28 },
  { label: "Fév", value: 35 },
  { label: "Mar", value: 42 },
  { label: "Avr", value: 38 },
  { label: "Mai", value: 55 },
  { label: "Juin", value: 48 },
  { label: "Juil", value: 62 },
];

const DON_TYPES = [
  { label: "Particuliers", value: 55, color: "#3f8f56" },
  { label: "Entreprises", value: 30, color: "#ec7f2e" },
  { label: "Anonymes", value: 15, color: "#4a90d9" },
];

function StatusPill({ value }) {
  const cls =
    value === "Validé" || value === "Actif" || value === "Ouvert" || value === "Terminée"
      ? "ok"
      : value === "Désactivé"
      ? "off"
      : "pending";
  return <span className={`pill ${cls}`}>{value}</span>;
}

function Table({ columns, rows }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PatientForm({ onAdd }) {
  const [form, setForm] = useState({ nom: "", age: "", type: "Type 1", tel: "", email: "", ville: "", username: "", password: "" });
  const [saved, setSaved] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.username.trim() || !form.password.trim()) {
      alert("Le nom complet, l'identifiant et le mot de passe sont requis");
      return;
    }
    onAdd({
      nom: form.nom.trim(),
      age: form.age || null,
      type: form.type,
      tel: form.tel || "",
      email: form.email || "",
      ville: form.ville || "",
      username: form.username.trim(),
      password: form.password.trim(),
      statut: "Actif",
    });
    setForm({ nom: "", age: "", type: "Type 1", tel: "", email: "", ville: "", username: "", password: "" });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form className="admin-form" onSubmit={submit}>
      <div className="admin-form-grid">
        <label><span>Nom complet *</span><input type="text" placeholder="Nom et prénom" value={form.nom} onChange={update("nom")} required /></label>
        <label><span>Âge</span><input type="number" placeholder="Âge" value={form.age} onChange={update("age")} /></label>
        <label><span>Type de diabète</span>
          <select value={form.type} onChange={update("type")}><option>Type 1</option><option>Type 2</option><option>Gestationnel</option></select>
        </label>
        <label><span>Téléphone</span><input type="tel" placeholder="06xx-xx-xx-xx" value={form.tel} onChange={update("tel")} /></label>
        <label><span>Email</span><input type="email" placeholder="email@exemple.ma" value={form.email} onChange={update("email")} /></label>
        <label><span>Ville</span><input type="text" placeholder="Ville" value={form.ville} onChange={update("ville")} /></label>
        <label><span>Identifiant de connexion *</span><input type="text" placeholder="Nom d'utilisateur" value={form.username} onChange={update("username")} required /></label>
        <label><span>Mot de passe *</span><input type="text" placeholder="Mot de passe de connexion" value={form.password} onChange={update("password")} required /></label>
      </div>
      <label className="full"><span>Notes médicales</span><textarea rows="3" placeholder="Antécédents, traitements..."></textarea></label>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Enregistrer le patient</button>
        {saved && <span className="form-saved">✓ Patient ajouté à la liste</span>}
      </div>
    </form>
  );
}

function MembreForm() {
  return (
    <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
      <div className="admin-form-grid">
        <label><span>Nom complet</span><input type="text" placeholder="Nom et prénom" /></label>
        <label><span>Email</span><input type="email" placeholder="email@exemple.ma" /></label>
        <label><span>Rôle</span>
          <select><option>Administrateur</option><option>Coordinateur</option><option>Bénévole</option><option>Médecin</option></select>
        </label>
        <label><span>Mot de passe temporaire</span><input type="password" placeholder="••••••••" /></label>
      </div>
      <button type="submit" className="btn btn-primary">Ajouter le membre</button>
    </form>
  );
}

function openReceipt(don) {
  const win = window.open("", "_blank");
  if (!win) return;
  const today = new Date().toLocaleDateString("fr-FR");
  const logoUrl = `${window.location.origin}/logo.final.ASS.png`;
  win.document.write(`<!doctype html><html lang="fr"><head><meta charset="UTF-8" />
<title>Reçu de don ${don.id} — Diabète.ma</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;}
  body{background:#f4f6f8;color:#1f2937;padding:40px;}
  .receipt{max-width:720px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:44px;}
  .logo-row{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:24px;padding-bottom:20px;border-bottom:2px solid #14322a;}
  .logo-row img{width:72px;height:72px;object-fit:contain;}
  .logo-row h1{color:#14322a;font-size:1.5rem;margin-bottom:4px;}
  .logo-row p{color:#6b7280;font-size:.85rem;}
  .head{display:flex;justify-content:space-between;align-items:center;margin-bottom:26px;}
  .tag{background:#e2f5e9;color:#2f8a4e;padding:6px 14px;border-radius:8px;font-weight:700;font-size:.8rem;}
  h2{font-size:1.1rem;margin-bottom:16px;color:#14322a;}
  table{width:100%;border-collapse:collapse;margin-bottom:24px;}
  td{padding:12px 0;border-bottom:1px solid #f0f2f4;font-size:.95rem;}
  td.k{color:#6b7280;width:40%;}
  td.v{font-weight:600;text-align:right;}
  .total{font-size:1.6rem;font-weight:800;color:#ec7f2e;}
  .foot{margin-top:30px;color:#6b7280;font-size:.82rem;line-height:1.6;border-top:1px solid #f0f2f4;padding-top:20px;}
  .btns{max-width:720px;margin:20px auto 0;text-align:center;}
  button{background:#14322a;color:#fff;border:none;padding:12px 26px;border-radius:8px;font-size:.95rem;cursor:pointer;}
  @media print{.btns{display:none;}body{background:#fff;padding:0;}.receipt{border:none;}}
</style></head><body>
  <div class="receipt">
    <div class="logo-row">
      <img src="${logoUrl}" alt="Logo Association Diabète.ma" />
      <div>
        <h1>Association Diabète.ma</h1>
        <p>Avenue Al Barid, Bensouda — Casablanca 20340<br/>contact@diabete.ma · www.diabete.ma</p>
      </div>
    </div>
    <div class="head">
      <h2>Reçu n° ${don.id}</h2>
      <span class="tag">REÇU DE DON</span>
    </div>
    <table>
      <tr><td class="k">Donateur</td><td class="v">${don.donateur}</td></tr>
      <tr><td class="k">Date du don</td><td class="v">${don.date}</td></tr>
      <tr><td class="k">Date d'émission</td><td class="v">${today}</td></tr>
      <tr><td class="k">Mode</td><td class="v">Virement / Chèque</td></tr>
      <tr><td class="k">Montant</td><td class="v total">${don.montant}</td></tr>
    </table>
    <div class="foot">Ce reçu atteste du don effectué au profit de l'Association Diabète.ma.
    Nous vous remercions chaleureusement pour votre générosité et votre soutien à nos actions.</div>
  </div>
  <div class="btns"><button onclick="window.print()">Imprimer / Enregistrer en PDF</button></div>
</body></html>`);
  win.document.close();
}

function DonStatsCharts() {
  const max = Math.max(...DON_MONTHS.map((m) => m.value));
  const w = 520;
  const h = 200;
  const pad = 28;
  const points = DON_MONTHS.map((m, i) => {
    const x = pad + (i * (w - pad * 2)) / (DON_MONTHS.length - 1);
    const y = h - pad - (m.value / max) * (h - pad * 2);
    return `${x},${y}`;
  }).join(" ");
  const area = `M ${pad},${h - pad} L ${points.split(" ").map((p) => p).join(" L ")} L ${w - pad},${h - pad} Z`;

  return (
    <>
      <div className="stat-grid">
        <div className="admin-stat"><div><div className="admin-stat-value">342 500 DH</div><div className="admin-stat-label">Total collecté</div></div></div>
        <div className="admin-stat"><div><div className="admin-stat-value">128</div><div className="admin-stat-label">Nombre de dons</div></div></div>
        <div className="admin-stat"><div><div className="admin-stat-value">2 676 DH</div><div className="admin-stat-label">Don moyen</div></div></div>
      </div>

      <div className="admin-two-col charts-row">
        <div className="admin-card">
          <h3>Évolution mensuelle des dons</h3>
          <div className="chart-bars">
            {DON_MONTHS.map((m) => (
              <div className="chart-bar-col" key={m.label}>
                <div className="chart-bar-wrap">
                  <div className="chart-bar" style={{ height: `${(m.value / max) * 100}%` }} />
                </div>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h3>Répartition par type de donateur</h3>
          <div className="chart-pie-wrap">
            <svg viewBox="0 0 36 36" className="chart-pie">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3.5" />
              {(() => {
                let offset = 0;
                return DON_TYPES.map((t) => {
                  const dash = `${t.value} ${100 - t.value}`;
                  const el = (
                    <circle
                      key={t.label}
                      cx="18" cy="18" r="15.9"
                      fill="none"
                      stroke={t.color}
                      strokeWidth="3.5"
                      strokeDasharray={dash}
                      strokeDashoffset={-offset}
                      transform="rotate(-90 18 18)"
                    />
                  );
                  offset += t.value;
                  return el;
                });
              })()}
            </svg>
            <ul className="chart-legend">
              {DON_TYPES.map((t) => (
                <li key={t.label}>
                  <span className="dot" style={{ background: t.color }} />
                  {t.label} <strong>{t.value}%</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="admin-card chart-curve-card">
        <h3>Courbe des dons (en milliers de DH)</h3>
        <svg viewBox={`0 0 ${w} ${h}`} className="chart-curve" preserveAspectRatio="none">
          <defs>
            <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3f8f56" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3f8f56" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#curveFill)" />
          <polyline points={points} fill="none" stroke="#3f8f56" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          {DON_MONTHS.map((m, i) => {
            const x = pad + (i * (w - pad * 2)) / (DON_MONTHS.length - 1);
            const y = h - pad - (m.value / max) * (h - pad * 2);
            return <circle key={m.label} cx={x} cy={y} r="5" fill="#ec7f2e" stroke="#fff" strokeWidth="2" />;
          })}
        </svg>
        <div className="chart-curve-labels">
          {DON_MONTHS.map((m) => <span key={m.label}>{m.label}</span>)}
        </div>
      </div>
    </>
  );
}

function Panel({ section, tab, onLogout, patients, onAddPatient, onEditPatient, onDeletePatient, onResetPassword, dons, onValidateDon, onViewDon, membres, onToggleMembre, onRoleChange }) {
  if (section === "dashboard") {
    return (
      <>
        <div className="stat-grid">
          {STATS.map((s) => (
            <div className="admin-stat" key={s.label}>
              <span className="admin-stat-icon" style={{ background: `${s.color}1a`, color: s.color }}>
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d={s.icon} /></svg>
              </span>
              <div>
                <div className="admin-stat-value">{s.value}</div>
                <div className="admin-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-two-col">
          <div className="admin-card">
            <h3>Agenda de la présidente</h3>
            <ul className="rdv-list">
              {RDV.map((r) => (
                <li key={r.heure}>
                  <span className="rdv-heure">{r.heure}</span>
                  <span className="rdv-info"><strong>{r.patient}</strong><small>{r.motif}</small></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="admin-card">
            <h3>Événements à venir</h3>
            <ul className="event-list">
              {EVENTS.map((e) => (
                <li key={e.titre}>
                  <span className="event-date">{e.date}</span>
                  <span className="event-info"><strong>{e.titre}</strong><small>{e.lieu}</small></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }

  if (section === "patients") {
    if (tab === "Ajouter un patient") return <PatientForm onAdd={onAddPatient} />;
    if (tab === "Suivi médical")
      return <Table columns={["Patient", "Dernière glycémie", "HbA1c", "Traitement", "Prochain RDV"]}
        rows={[
          ["Fatima Zahra B.", "1.35 g/L", "6.8 %", "Metformine", "22 juil."],
          ["Ahmed L.", "1.10 g/L", "7.2 %", "Insuline", "25 juil."],
          ["Sanae M.", "1.22 g/L", "6.4 %", "Régime + suivi", "28 juil."],
          ["Youssef R.", "1.48 g/L", "7.5 %", "Metformine + Glibenclamide", "30 juil."],
          ["Khadija E.", "1.15 g/L", "6.1 %", "Insuline lente", "02 août"],
          ["Omar T.", "1.60 g/L", "8.0 %", "Insuline + Metformine", "05 août"],
          ["Nadia L.", "1.28 g/L", "6.9 %", "Metformine", "08 août"],
          ["Rachid B.", "1.05 g/L", "5.9 %", "Alimentation contrôlée", "12 août"],
        ]} />;
    if (tab === "Historique des consultations")
      return <Table columns={["Date", "Patient", "Médecin", "Motif", "Compte-rendu"]}
        rows={[
          ["10 juil. 2026", "Sanae M.", "Dr. Karim B.", "Suivi", "Stable"],
          ["02 juil. 2026", "Youssef R.", "Dr. Karim B.", "Bilan", "Ajustement traitement"],
          ["28 juin 2026", "Fatima Zahra B.", "Dr. Karim B.", "Contrôle glycémie", "Bonne évolution"],
          ["20 juin 2026", "Ahmed L.", "Dr. Nadia L.", "Éducation thérapeutique", "Objectifs atteints"],
          ["15 juin 2026", "Khadija E.", "Dr. Karim B.", "Suivi", "Réduction de la dose"],
          ["08 juin 2026", "Omar T.", "Dr. Karim B.", "Urgence glycémique", "Stabilisé"],
          ["01 juin 2026", "Nadia L.", "Dr. Nadia L.", "Première consultation", "Dossier ouvert"],
          ["25 mai 2026", "Rachid B.", "Dr. Karim B.", "Bilan annuel", "Résultats satisfaisants"],
        ]} />;
    return <Table columns={["ID", "Nom", "Âge", "Type", "Téléphone", "Statut", "Action"]}
      rows={patients.map((p) => [p.id, p.nom, p.age, p.type, p.tel, <StatusPill value={p.statut} />,
        <div className="row-actions">
          <button className="link-btn" onClick={() => onEditPatient(p)}>Modifier</button>
          <button className="link-btn" style={{color: '#d9534f'}} onClick={() => onResetPassword(p)}>Réinitialiser MDP</button>
          <button className="icon-btn danger" aria-label="Supprimer" title="Supprimer" onClick={() => onDeletePatient(p)}>
            <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2h4v2H2V6h4l1-2z" /></svg>
          </button>
        </div>])} />;
  }

  if (section === "dons") {
    if (tab === "Statistiques") return <DonStatsCharts />;
    if (tab === "Reçus de dons") {
      const valides = dons.filter((d) => d.statut === "Validé");
      if (valides.length === 0) return <div className="admin-card"><p>Aucun don validé pour le moment.</p></div>;
      return <Table columns={["N° reçu", "Donateur", "Montant", "Date", "Téléchargement"]}
        rows={valides.map((d) => [d.id, d.donateur, d.montant, d.date,
          <button className="link-btn" onClick={() => openReceipt(d)}>Télécharger PDF</button>])} />;
    }
    if (tab === "Validation des paiements") {
      const attente = dons.filter((d) => d.statut === "En attente");
      if (attente.length === 0) return <div className="admin-card"><p>Aucun paiement en attente de validation.</p></div>;
      return <Table columns={["ID", "Donateur", "Montant", "Date", "Statut", "Action"]}
        rows={attente.map((d) => [d.id, d.donateur, d.montant, d.date, <StatusPill value={d.statut} />,
          <button className="link-btn" onClick={() => onValidateDon(d.id)}>Valider le paiement</button>])} />;
    }
    return <Table columns={["ID", "Donateur", "Montant", "Date", "Statut", "Action"]}
      rows={dons.map((d) => [d.id, d.donateur, d.montant, d.date, <StatusPill value={d.statut} />,
        <div className="row-actions">
          <button className="link-btn" onClick={() => onViewDon(d)}>Voir</button>
          {d.statut === "En attente" && <button className="link-btn" onClick={() => onValidateDon(d.id)}>Valider</button>}
        </div>])} />;
  }

  if (section === "campagnes") {
    const data = {
      "Caravanes médicales": [
        ["Caravane Fès", "12 juil. 2026", "Fès", "Terminée"],
        ["Caravane Meknès", "22 juil. 2026", "Meknès", "Terminée"],
        ["Caravane Marrakech", "05 août 2026", "Marrakech", "Planifiée"],
        ["Caravane Agadir", "18 août 2026", "Agadir", "Planifiée"],
        ["Caravane Tanger", "02 sept. 2026", "Tanger", "Planifiée"],
        ["Caravane Rabat", "10 oct. 2026", "Rabat", "Planifiée"],
        ["Caravane Casablanca", "28 oct. 2026", "Casablanca", "Planifiée"],
      ],
      "Journées de sensibilisation": [["Journée mondiale du diabète", "14 nov. 2026", "Casablanca", "Planifiée"]],
      "Ateliers": [["Atelier nutrition", "05 août 2026", "Rabat", "Ouvert"], ["Atelier cuisine", "18 août 2026", "Rabat", "Ouvert"], ["Atelier sport", "05 sept. 2026", "Agadir", "Ouvert"]],
      "Inscriptions": [
        ["Atelier nutrition", "05 août 2026", "42 inscrits", "Ouvert"],
        ["Caravane Meknès", "22 juil. 2026", "120 inscrits", "Ouvert"],
        ["Caravane Marrakech", "05 août 2026", "85 inscrits", "Ouvert"],
        ["Caravane Agadir", "18 août 2026", "60 inscrits", "Ouvert"],
      ],
    };
    const cols = tab === "Inscriptions" ? ["Campagne", "Date", "Inscrits", "Statut"] : ["Nom", "Date", "Lieu", "Statut"];
    return <Table columns={cols} rows={(data[tab] || data["Caravanes médicales"]).map((r) => [...r.slice(0, 3), <StatusPill value={r[3]} />])} />;
  }

  if (section === "membres") {
    if (tab === "Ajouter un membre") return <MembreForm />;
    if (tab === "Paramètres")
      return (
        <div className="admin-card">
          <h3>Paramètres généraux</h3>
          <label className="switch-row"><span>Autoriser les inscriptions publiques</span><input type="checkbox" defaultChecked /></label>
          <label className="switch-row"><span>Notifications par email</span><input type="checkbox" defaultChecked /></label>
          <label className="switch-row"><span>Mode maintenance</span><input type="checkbox" /></label>
        </div>
      );
    return <Table columns={["ID", "Nom", "Rôle", "Statut", "Action"]}
      rows={membres.map((m) => [m.id, m.nom,
        tab === "Attribuer un rôle" ? (
          <select value={m.role} onChange={(e) => onRoleChange(m.id, e.target.value)}>
            <option>Présidente</option>
            <option>Administrateur</option>
            <option>Coordinatrice</option>
            <option>Bénévole</option>
            <option>Médecin</option>
          </select>
        ) : m.role,
        <StatusPill value={m.statut} />,
        <button className="link-btn" onClick={() => onToggleMembre(m.id)}>
          {m.statut === "Désactivé" ? "Activer" : "Désactiver"}
        </button>])} />;
  }

  if (section === "profil") {
    if (tab === "Déconnexion")
      return (
        <div className="admin-card logout-card">
          <p>Voulez-vous vraiment vous déconnecter de l’espace administration ?</p>
          <button className="btn btn-red" onClick={onLogout}>Se déconnecter</button>
        </div>
      );
    return (
      <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
        <label className="full"><span>Mot de passe actuel</span><input type="password" placeholder="••••••••" /></label>
        <label className="full"><span>Nouveau mot de passe</span><input type="password" placeholder="••••••••" /></label>
        <label className="full"><span>Confirmer le nouveau mot de passe</span><input type="password" placeholder="••••••••" /></label>
        <button type="submit" className="btn btn-primary">Mettre à jour</button>
      </form>
    );
  }

  return null;
}

function EditPatientModal({ patient, onSave, onClose }) {
  const [form, setForm] = useState({
    nom: patient.nom,
    age: patient.age,
    type: patient.type,
    tel: patient.tel,
    statut: patient.statut,
    username: patient.username || "",
    password: "",
    email: patient.email || "",
    ville: patient.ville || "",
  });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSave(patient.id, form);
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal admin-edit-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="login-close" aria-label="Fermer" onClick={onClose}>×</button>
        <h2 className="login-title">Modifier le patient — {patient.id}</h2>
        <form className="admin-form" onSubmit={submit} style={{ border: "none", padding: 0 }}>
          <div className="admin-form-grid">
            <label><span>Nom complet *</span><input type="text" value={form.nom} onChange={update("nom")} required /></label>
            <label><span>Âge</span><input type="number" value={form.age} onChange={update("age")} /></label>
            <label><span>Type de diabète</span>
              <select value={form.type} onChange={update("type")}><option>Type 1</option><option>Type 2</option><option>Gestationnel</option></select>
            </label>
            <label><span>Téléphone</span><input type="tel" value={form.tel} onChange={update("tel")} /></label>
            <label><span>Email</span><input type="email" value={form.email} onChange={update("email")} /></label>
            <label><span>Ville</span><input type="text" value={form.ville} onChange={update("ville")} /></label>
            <label><span>Statut</span>
              <select value={form.statut} onChange={update("statut")}><option>Actif</option><option>Suivi</option><option>Désactivé</option></select>
            </label>
            <label><span>Identifiant *</span><input type="text" value={form.username} onChange={update("username")} required /></label>
            <label><span>Nouveau mot de passe (laisser vide si inchangé)</span><input type="text" placeholder="••••••••" value={form.password} onChange={update("password")} /></label>
          </div>
          <button type="submit" className="btn btn-primary">Enregistrer les modifications</button>
        </form>
      </div>
    </div>
  );
}

function ConfirmDelete({ patient, onConfirm, onClose }) {
  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal confirm-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <span className="confirm-icon">
          <svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></svg>
        </span>
        <h2 className="confirm-title">Voulez-vous vraiment supprimer ce patient ?</h2>
        <p className="confirm-text">{patient.nom} ({patient.id}) sera définitivement retiré de la liste.</p>
        <div className="confirm-actions">
          <button className="btn btn-ghost" onClick={onClose}>Annuler</button>
          <button className="btn btn-red" onClick={() => onConfirm(patient.id)}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}

function DonModal({ don, onValidate, onClose }) {
  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="login-close" aria-label="Fermer" onClick={onClose}>×</button>
        <h2 className="login-title">Don {don.id}</h2>
        <table className="admin-table" style={{ minWidth: 0 }}>
          <tbody>
            <tr><td>Donateur</td><td style={{ textAlign: "right", fontWeight: 600 }}>{don.donateur}</td></tr>
            <tr><td>Montant</td><td style={{ textAlign: "right", fontWeight: 600 }}>{don.montant}</td></tr>
            <tr><td>Date</td><td style={{ textAlign: "right", fontWeight: 600 }}>{don.date}</td></tr>
            <tr><td>Statut</td><td style={{ textAlign: "right" }}><StatusPill value={don.statut} /></td></tr>
          </tbody>
        </table>
        {don.statut === "En attente" && (
          <button className="btn btn-primary" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}
            onClick={() => onValidate(don.id)}>Valider le paiement</button>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard({ onLogout }) {
  const [section, setSection] = useState("dashboard");
  const [tab, setTab] = useState("");
  const [patients, setPatients] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [dons, setDons] = useState(DONS);
  const [viewingDon, setViewingDon] = useState(null);
  const [membres, setMembres] = useState(MEMBRES);

  const current = SECTIONS.find((s) => s.id === section);

  const fetchPatients = async () => {
    try {
      const response = await fetch("/api/patients.php");
      const data = await response.json();
      if (data.success) {
        setPatients(data.patients);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des patients:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const selectSection = (s) => {
    setSection(s.id);
    setTab(s.tabs[0] || "");
  };

  const addPatient = async (data) => {
    try {
      const response = await fetch("/api/patients.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "create", ...data }),
      });
      const resData = await response.json();
      if (resData.success) {
        setPatients((prev) => [...prev, resData.patient]);
      } else {
        alert("Erreur lors de l'ajout : " + resData.error);
      }
    } catch (err) {
      alert("Erreur de connexion avec le serveur");
    }
  };

  const updatePatient = async (id, data) => {
    try {
      const response = await fetch("/api/patients.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "update", id, ...data }),
      });
      const resData = await response.json();
      if (resData.success) {
        setPatients((prev) => prev.map((p) => (p.id === id ? resData.patient : p)));
        setEditing(null);
      } else {
        alert("Erreur lors de la modification : " + resData.error);
      }
    } catch (err) {
      alert("Erreur de connexion avec le serveur");
    }
  };

  const deletePatient = async (id) => {
    try {
      const response = await fetch("/api/patients.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "delete", id }),
      });
      const resData = await response.json();
      if (resData.success) {
        setPatients((prev) => prev.filter((p) => p.id !== id));
        setDeleting(null);
      } else {
        alert("Erreur lors de la suppression : " + resData.error);
      }
    } catch (err) {
      alert("Erreur de connexion avec le serveur");
    }
  };

  const resetPassword = async (p) => {
    if (!window.confirm(`Voulez-vous générer un nouveau mot de passe pour ${p.nom} ?`)) return;

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    let newPassword = "";
    for (let i = 0; i < 8; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    try {
      const response = await fetch("/api/patients.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id: p.id,
          nom: p.nom,
          type: p.type,
          tel: p.tel,
          statut: p.statut,
          password: newPassword
        }),
      });
      const resData = await response.json();
      if (resData.success) {
        window.prompt("Mot de passe généré avec succès ! Copiez-le pour le transmettre au patient :", newPassword);
      } else {
        alert("Erreur lors de la modification : " + resData.error);
      }
    } catch (err) {
      alert("Erreur de connexion avec le serveur");
    }
  };

  const validateDon = (id) => {
    setDons((prev) => prev.map((d) => (d.id === id ? { ...d, statut: "Validé" } : d)));
    setViewingDon((v) => (v && v.id === id ? { ...v, statut: "Validé" } : v));
  };

  const toggleMembre = (id) => {
    setMembres((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, statut: m.statut === "Actif" ? "Désactivé" : "Actif" } : m
      )
    );
  };

  const changeRole = (id, role) => {
    setMembres((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
  };

  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/logo.final.ASS.png" alt="Logo Diabète.ma" />
          <div>
            <strong>Diabète.ma</strong>
            <small>Espace Administration</small>
          </div>
        </div>
        <nav className="admin-nav">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`admin-nav-item${section === s.id ? " active" : ""}`}
              onClick={() => selectSection(s)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d={ICONS[s.id]} /></svg>
              {s.label}
            </button>
          ))}
        </nav>
        <button type="button" className="admin-sidebar-logout" onClick={onLogout}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M10 17v-3h4v-4h-4V7l-5 5 5 5zm9-14H9c-1.1 0-2 .9-2 2v3h2V5h10v14H9v-3H7v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          </svg>
          Déconnexion
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <h1>{current.label}</h1>
          <div className="admin-user">
            <span className="admin-avatar">KO</span>
            <div><strong>Kadous Oumaima</strong><small>Présidente</small></div>
          </div>
        </header>

        {current.tabs.length > 0 && (
          <div className="admin-tabs">
            {current.tabs.map((tb) => (
              <button key={tb} className={`admin-tab${tab === tb ? " active" : ""}`} onClick={() => setTab(tb)}>
                {tb}
              </button>
            ))}
          </div>
        )}

        <div className="admin-content">
          <Panel
            section={section}
            tab={tab}
            onLogout={onLogout}
            patients={patients}
            onAddPatient={addPatient}
            onEditPatient={setEditing}
            onDeletePatient={setDeleting}
            onResetPassword={resetPassword}
            dons={dons}
            onValidateDon={validateDon}
            onViewDon={setViewingDon}
            membres={membres}
            onToggleMembre={toggleMembre}
            onRoleChange={changeRole}
          />
        </div>
      </main>

      {editing && (
        <EditPatientModal patient={editing} onSave={updatePatient} onClose={() => setEditing(null)} />
      )}
      {deleting && (
        <ConfirmDelete patient={deleting} onConfirm={deletePatient} onClose={() => setDeleting(null)} />
      )}
      {viewingDon && (
        <DonModal don={viewingDon} onValidate={validateDon} onClose={() => setViewingDon(null)} />
      )}
    </div>
  );
}
