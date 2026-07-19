import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";

const NAV_ITEMS = [
  { href: "#accueil", key: "accueil" },
  { href: "#apropos", key: "apropos" },
  { href: "#activites", key: "activites" },
  { href: "#contact", key: "contact" },
];

const LANGUAGES = [
  { code: "fr", label: "FRC" },
  { code: "en", label: "ENG" },
  { code: "ar", label: "AR" },
];

export default function Navbar({ onMemberClick }) {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#accueil");
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const selectLang = (code) => {
    setLang(code);
    setLangOpen(false);
  };

  const currentLabel = LANGUAGES.find((l) => l.code === lang)?.label || "FRC";

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a href="#accueil" className="brand" aria-label="Accueil - Association Diabète & Vie">
          <span className="brand-logo">
            <img src="/logo.final.ASS.png" alt="Logo Association Diabète & Vie" />
          </span>
          <span className="brand-text">
            <span className="brand-name">
              <span>Association marocaine</span>
              <strong>Diabète.ma</strong>
            </span>
          </span>
        </a>

        <nav className={`nav-links${menuOpen ? " open" : ""}`} aria-label="Navigation principale">
          {NAV_ITEMS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeHref === link.href ? "active" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button type="button" className="btn btn-member" onClick={onMemberClick}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path fill="currentColor" d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6z" />
            </svg>
            {t.nav.membre}
          </button>

          <div className={`lang-switch${langOpen ? " open" : ""}`} ref={langRef}>
            <button
              className="lang-btn"
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen((v) => !v);
              }}
            >
              <span className="lang-current">{currentLabel}</span>
              <svg className="lang-caret" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path fill="currentColor" d="M7 10l5 5 5-5z" />
              </svg>
            </button>
            <ul className="lang-menu" role="menu">
              {LANGUAGES.map((l) => (
                <li key={l.code}>
                  <button role="menuitem" onClick={() => selectLang(l.code)}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          className={`nav-toggle${menuOpen ? " active" : ""}`}
          aria-label="Ouvrir le menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
