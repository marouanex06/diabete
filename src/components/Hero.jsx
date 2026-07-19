import { useLang } from "../i18n.jsx";

export default function Hero({ onDiscover }) {
  const { t } = useLang();
  return (
    <section className="hero" id="accueil">
      <div className="hero-bg" aria-hidden="true">
        <img src="/hero.png" alt="" />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-shapes" aria-hidden="true">
        <span className="shape circle-green"></span>
      </div>

      <div className="container hero-inner">
        <div className="hero-content">
          <p className="overline">{t.hero.overline}</p>
          <h1 className="hero-title">
            {t.hero.title1}
            <span className="accent-orange">{t.hero.title2}</span>
            <span className="accent-green">{t.hero.title3}</span>
          </h1>
          <p className="hero-text">{t.hero.text}</p>
          <div className="hero-actions">
            <a href="#soutenir" className="btn btn-primary">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path fill="currentColor" d="M12 21s-8-4.5-8-10a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 11c0 5.5-8 10-8 10z" />
              </svg>
              {t.hero.soutenir}
            </a>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onDiscover}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path fill="currentColor" d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6z" />
              </svg>
              {t.hero.decouvrir}
            </button>
          </div>
        </div>

        <div className="mission-card">
          <span className="mission-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 21s-8-4.5-8-10a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 11c0 5.5-8 10-8 10z" />
            </svg>
          </span>
          <div>
            <h3 className="mission-title">{t.hero.missionTitle}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
