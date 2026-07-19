import { useState } from "react";

const ICONS = {
  accueil: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  profil: "M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6z",
  dossier: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z",
  rdv: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z",
  analyses: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.4-1.4L12 14.2l5.6-5.6L19 10l-7 7z",
  conseils: "M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
  evenements: "M3 11l18-5v12L3 14v3H1v-6h2zm16 4.5V8.5l-9 2.5v2z",
  contact: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  parametres: "M19.1 12.9a7.5 7.5 0 000-1.8l2-1.5-2-3.4-2.4 1a7.4 7.4 0 00-1.5-.9L14.8 3h-4l-.4 2.3a7.4 7.4 0 00-1.5.9l-2.4-1-2 3.4 2 1.5a7.5 7.5 0 000 1.8l-2 1.5 2 3.4 2.4-1c.5.4 1 .7 1.5.9l.4 2.3h4l.4-2.3c.5-.2 1-.5 1.5-.9l2.4 1 2-3.4-2-1.5zM12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z",
};

const SECTIONS = [
  { id: "accueil", label: "Accueil" },
  { id: "profil", label: "Mon profil", tabs: ["Informations personnelles", "Modifier le téléphone", "Modifier l'adresse"] },
  { id: "dossier", label: "Mon dossier" },
  { id: "rdv", label: "Mes rendez-vous", tabs: ["Rendez-vous à venir", "Historique"] },
  { id: "analyses", label: "Mes analyses", tabs: ["Glycémie", "HbA1c", "Poids", "Tension", "Téléchargement des résultats"] },
  { id: "conseils", label: "Conseils santé", tabs: ["Alimentation", "Activité physique", "Gestion de l'insuline", "Prévention"] },
  { id: "evenements", label: "Événements", tabs: ["Caravanes médicales", "Ateliers", "Conférences"] },
  { id: "contact", label: "Contact", tabs: ["Envoyer un message", "Numéros utiles"] },
  { id: "parametres", label: "Paramètres", tabs: ["Changer le mot de passe", "Déconnexion"] },
];

const NEWS = [
  { date: "12 juil. 2026", titre: "Caravane médicale à Fès", text: "Plus de 320 personnes ont bénéficié d’un dépistage gratuit." },
  { date: "28 juin 2026", titre: "Atelier nutrition", text: "Conseils pratiques pour une alimentation adaptée au diabète." },
  { date: "15 mai 2026", titre: "Campagne de dépistage à Rabat", text: "Plus de 200 personnes dépistées lors de notre journée." },
];

const RDV_A_VENIR = [
  { date: "22 juil. 2026", heure: "10:00", lieu: "Centre médical — Casablanca", motif: "Consultation de suivi" },
  { date: "05 août 2026", heure: "14:30", lieu: "Association Diabète.ma", motif: "Éducation thérapeutique" },
];

const RDV_HISTO = [
  { date: "10 juin 2026", heure: "09:30", lieu: "Centre médical — Casablanca", motif: "Bilan glycémique", statut: "Terminé" },
  { date: "02 mai 2026", heure: "11:00", lieu: "Association Diabète.ma", motif: "Première consultation", statut: "Terminé" },
];

const ANALYSES = {
  Glycémie: [
    { date: "10 juil. 2026", valeur: "1.28 g/L", statut: "Normal" },
    { date: "03 juil. 2026", valeur: "1.42 g/L", statut: "Élevé" },
    { date: "26 juin 2026", valeur: "1.20 g/L", statut: "Normal" },
  ],
  HbA1c: [
    { date: "01 juil. 2026", valeur: "6.8 %", statut: "Bon" },
    { date: "01 avr. 2026", valeur: "7.1 %", statut: "À surveiller" },
  ],
  Poids: [
    { date: "10 juil. 2026", valeur: "78 kg", statut: "Stable" },
    { date: "10 juin 2026", valeur: "79 kg", statut: "Stable" },
  ],
  Tension: [
    { date: "10 juil. 2026", valeur: "12.5 / 8", statut: "Normal" },
    { date: "10 juin 2026", valeur: "13 / 8.5", statut: "Normal" },
  ],
};

const CONSEILS = {
  Alimentation: [
    "Privilégiez les légumes, les fibres et les protéines maigres.",
    "Limitez les sucres rapides et les boissons sucrées.",
    "Mangez à heures régulières pour stabiliser votre glycémie.",
  ],
  "Activité physique": [
    "Marchez au moins 30 minutes par jour.",
    "Pratiquez une activité adaptée (natation, vélo, yoga).",
    "Contrôlez votre glycémie avant et après l’effort.",
  ],
  "Gestion de l'insuline": [
    "Respectez les horaires et doses prescrits par votre médecin.",
    "Conservez l’insuline au frais, à l’abri de la chaleur.",
    "Notez chaque injection dans votre carnet de suivi.",
  ],
  Prévention: [
    "Surveillez vos pieds chaque jour.",
    "Effectuez vos bilans médicaux régulièrement.",
    "En cas de malaise, contactez immédiatement votre médecin.",
  ],
};

const EVENTS = {
  "Caravanes médicales": [
    { titre: "Caravane Meknès", date: "22 juil. 2026", lieu: "Meknès" },
    { titre: "Caravane Marrakech", date: "05 août 2026", lieu: "Marrakech" },
    { titre: "Caravane Agadir", date: "18 août 2026", lieu: "Agadir" },
  ],
  Ateliers: [
    { titre: "Atelier nutrition", date: "05 août 2026", lieu: "Rabat" },
    { titre: "Atelier cuisine équilibrée", date: "18 août 2026", lieu: "Rabat" },
  ],
  Conférences: [
    { titre: "Conférence sur le diabète gestationnel", date: "12 sept. 2026", lieu: "Casablanca" },
    { titre: "Journée mondiale du diabète", date: "14 nov. 2026", lieu: "Casablanca" },
  ],
};

function StatusPill({ value }) {
  const ok = ["Normal", "Bon", "Stable", "Terminé"].includes(value);
  return <span className={`pill ${ok ? "ok" : "pending"}`}>{value}</span>;
}

function Panel({ section, tab, profil, onUpdateProfile, onLogout }) {
  const [msgSent, setMsgSent] = useState(false);
  const [pwdSaved, setPwdSaved] = useState(false);

  if (section === "accueil") {
    return (
      <>
        <div className="patient-welcome">
          <h2>Bonjour, {profil.prenom}</h2>
          <p>Bienvenue dans votre espace patient. Suivez votre santé, vos rendez-vous et les conseils de l’association.</p>
        </div>
        <div className="patient-quick">
          <div className="admin-stat"><div><div className="admin-stat-value">{profil.type}</div><div className="admin-stat-label">Type de diabète</div></div></div>
          <div className="admin-stat"><div><div className="admin-stat-value">1.28 g/L</div><div className="admin-stat-label">Dernière glycémie</div></div></div>
          <div className="admin-stat"><div><div className="admin-stat-value">22 juil.</div><div className="admin-stat-label">Prochain RDV</div></div></div>
        </div>
        <div className="admin-card" style={{ marginTop: 22 }}>
          <h3>Dernières actualités</h3>
          <ul className="event-list">
            {NEWS.map((n) => (
              <li key={n.titre}>
                <span className="event-date">{n.date}</span>
                <span className="event-info"><strong>{n.titre}</strong><small>{n.text}</small></span>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  if (section === "profil") {
    if (tab === "Modifier le téléphone") {
      return (
        <form className="admin-form" onSubmit={(e) => { e.preventDefault(); onUpdateProfile("tel", e.target.tel.value); }}>
          <label className="full"><span>Nouveau téléphone</span>
            <input name="tel" type="tel" defaultValue={profil.tel} required />
          </label>
          <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
      );
    }
    if (tab === "Modifier l'adresse") {
      return (
        <form className="admin-form" onSubmit={(e) => { e.preventDefault(); onUpdateProfile("adresse", e.target.adresse.value); }}>
          <label className="full"><span>Nouvelle adresse</span>
            <input name="adresse" type="text" defaultValue={profil.adresse} required />
          </label>
          <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
      );
    }
    return (
      <div className="admin-card patient-info-card">
        <h3>Informations personnelles</h3>
        <table className="admin-table" style={{ minWidth: 0 }}>
          <tbody>
            <tr><td>Nom</td><td style={{ textAlign: "right", fontWeight: 600 }}>{profil.nom}</td></tr>
            <tr><td>Prénom</td><td style={{ textAlign: "right", fontWeight: 600 }}>{profil.prenom}</td></tr>
            <tr><td>Email</td><td style={{ textAlign: "right", fontWeight: 600 }}>{profil.email}</td></tr>
            <tr><td>Téléphone</td><td style={{ textAlign: "right", fontWeight: 600 }}>{profil.tel}</td></tr>
            <tr><td>Adresse</td><td style={{ textAlign: "right", fontWeight: 600 }}>{profil.adresse}</td></tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (section === "dossier") {
    return (
      <div className="admin-card patient-info-card">
        <h3>Mon dossier médical</h3>
        <table className="admin-table" style={{ minWidth: 0 }}>
          <tbody>
            <tr><td>Type de diabète</td><td style={{ textAlign: "right", fontWeight: 600 }}>{profil.type}</td></tr>
            <tr><td>Date de diagnostic</td><td style={{ textAlign: "right", fontWeight: 600 }}>{profil.diagnostic}</td></tr>
            <tr><td>Médecin référent</td><td style={{ textAlign: "right", fontWeight: 600 }}>{profil.medecin}</td></tr>
            <tr><td>Traitement</td><td style={{ textAlign: "right", fontWeight: 600 }}>{profil.traitement}</td></tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (section === "rdv") {
    const list = tab === "Historique" ? RDV_HISTO : RDV_A_VENIR;
    return (
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th><th>Heure</th><th>Lieu</th><th>Motif</th>
              {tab === "Historique" && <th>Statut</th>}
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.date + r.heure}>
                <td>{r.date}</td>
                <td>{r.heure}</td>
                <td>{r.lieu}</td>
                <td>{r.motif}</td>
                {tab === "Historique" && <td><StatusPill value={r.statut} /></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (section === "analyses") {
    if (tab === "Téléchargement des résultats") {
      return (
        <div className="admin-card">
          <h3>Téléchargement des résultats</h3>
          <ul className="patient-download-list">
            {["Bilan glycémie — juil. 2026", "HbA1c — juil. 2026", "Bilan complet — avr. 2026"].map((f) => (
              <li key={f}>
                <span>{f}</span>
                <button type="button" className="link-btn" onClick={() => window.alert("Téléchargement simulé : " + f)}>Télécharger PDF</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    const rows = ANALYSES[tab] || ANALYSES.Glycémie;
    return (
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Date</th><th>Valeur</th><th>Statut</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.date + r.valeur}>
                <td>{r.date}</td>
                <td><strong>{r.valeur}</strong></td>
                <td><StatusPill value={r.statut} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (section === "conseils") {
    const items = CONSEILS[tab] || CONSEILS.Alimentation;
    return (
      <div className="admin-card">
        <h3>{tab}</h3>
        <ul className="patient-tips">
          {items.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
    );
  }

  if (section === "evenements") {
    const list = EVENTS[tab] || EVENTS["Caravanes médicales"];
    return (
      <div className="admin-card">
        <h3>{tab}</h3>
        <ul className="event-list">
          {list.map((e) => (
            <li key={e.titre}>
              <span className="event-date">{e.date}</span>
              <span className="event-info"><strong>{e.titre}</strong><small>{e.lieu}</small></span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (section === "contact") {
    if (tab === "Numéros utiles") {
      return (
        <div className="admin-card">
          <h3>Numéros utiles</h3>
          <ul className="patient-tips">
            <li><strong>Association Diabète.ma :</strong> +212 5 12 34 56 78</li>
            <li><strong>Urgences médicales :</strong> 15 / 141</li>
            <li><strong>Médecin référent :</strong> {profil.medecin} — 0661-00-11-22</li>
            <li><strong>Email :</strong> contact@diabete.ma</li>
          </ul>
        </div>
      );
    }
    return (
      <form
        className="admin-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.target.reset();
          setMsgSent(true);
          setTimeout(() => setMsgSent(false), 3500);
        }}
      >
        <label className="full"><span>Objet</span><input type="text" placeholder="Objet du message" required /></label>
        <label className="full"><span>Message</span><textarea rows="5" placeholder="Écrivez votre message à l’association…" required /></label>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Envoyer</button>
          {msgSent && <span className="form-saved">✓ Message envoyé</span>}
        </div>
      </form>
    );
  }

  if (section === "parametres") {
    if (tab === "Déconnexion") {
      return (
        <div className="admin-card logout-card">
          <p>Voulez-vous vraiment vous déconnecter de votre espace patient ?</p>
          <button className="btn btn-red" onClick={onLogout}>Se déconnecter</button>
        </div>
      );
    }
    return (
      <form
        className="admin-form"
        onSubmit={(e) => {
          e.preventDefault();
          const newPassword = e.target.elements[1].value;
          const confirmPassword = e.target.elements[2].value;
          if (newPassword !== confirmPassword) {
            alert("Les nouveaux mots de passe ne correspondent pas.");
            return;
          }
          onUpdateProfile("password", newPassword);
          setPwdSaved(true);
          setTimeout(() => setPwdSaved(false), 3000);
          e.target.reset();
        }}
      >
        <label className="full"><span>Mot de passe actuel</span><input type="password" required /></label>
        <label className="full"><span>Nouveau mot de passe</span><input type="password" required /></label>
        <label className="full"><span>Confirmer</span><input type="password" required /></label>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Mettre à jour</button>
          {pwdSaved && <span className="form-saved">✓ Mot de passe modifié</span>}
        </div>
      </form>
    );
  }

  return null;
}

export default function PatientDashboard({ onLogout, patientData }) {
  const [section, setSection] = useState("accueil");
  const [tab, setTab] = useState("");

  const getParsedProfil = (p) => {
    if (!p) return {};
    const parts = (p.nom || "").trim().split(" ");
    const prenom = parts.length > 1 ? parts.slice(0, -1).join(" ") : parts[0] || "";
    const nom = parts.length > 1 ? parts[parts.length - 1] : "";
    return {
      nom: nom,
      prenom: prenom,
      email: p.email || "",
      tel: p.tel || "",
      adresse: p.adresse || p.ville || "Avenue Hassan II, Casablanca",
      type: p.type || "Type 2",
      diagnostic: p.diagnostic || "15 mars 2019",
      medecin: p.medecin || "Dr. Karim B.",
      traitement: p.traitement || "Metformine 850 mg",
    };
  };

  const [profil, setProfil] = useState(() => getParsedProfil(patientData));

  const current = SECTIONS.find((s) => s.id === section);

  const selectSection = (s) => {
    setSection(s.id);
    setTab(s.tabs?.[0] || "");
  };

  const handleUpdateProfile = async (field, value) => {
    try {
      const response = await fetch("/api/patients.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          id: patientData.id,
          nom: patientData.nom,
          age: patientData.age,
          type: patientData.type,
          tel: field === "tel" ? value : profil.tel,
          adresse: field === "adresse" ? value : profil.adresse,
          password: field === "password" ? value : undefined,
          statut: patientData.statut,
          email: patientData.email,
          ville: patientData.ville,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setProfil((prev) => ({
          ...prev,
          [field]: value,
        }));
      } else {
        alert("Erreur: " + data.error);
      }
    } catch (err) {
      alert("Erreur de connexion avec le serveur");
    }
  };

  const getInitials = (prenom, nom) => {
    const p = prenom ? prenom.charAt(0).toUpperCase() : "";
    const n = nom ? nom.charAt(0).toUpperCase() : "";
    return p + n || "P";
  };

  return (
    <div className="admin patient-space">
      <aside className="admin-sidebar patient-sidebar">
        <div className="admin-brand">
          <img src="/logo.final.ASS.png" alt="Logo Diabète.ma" />
          <div>
            <strong>Diabète.ma</strong>
            <small>Espace Patient</small>
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
          Déconnexion
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <h1>{current.label}</h1>
          <div className="admin-user">
            <span className="admin-avatar patient-avatar">{getInitials(profil.prenom, profil.nom)}</span>
            <div>
              <strong>{profil.prenom} {profil.nom}</strong>
              <small>Patient(e)</small>
            </div>
          </div>
        </header>

        {current.tabs?.length > 0 && (
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
            profil={profil}
            onUpdateProfile={handleUpdateProfile}
            onLogout={onLogout}
          />
        </div>
      </main>
    </div>
  );
}
