import { useEffect, useState } from "react";
import { useLang } from "../i18n.jsx";

export default function Soutien() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="soutien" id="soutenir">
      <div className="container">
        <div className="soutien-banner">
          <div className="soutien-media">
            <img
              src="/soutien.png"
              alt="Mains solidaires autour d'un cœur"
            />
          </div>

          <div className="soutien-content">
            <h2 className="soutien-title">{t.soutien.title}</h2>
            <p className="soutien-text">{t.soutien.text}</p>
            <button type="button" className="btn soutien-btn" onClick={() => setOpen(true)}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path fill="currentColor" d="M12 21s-8-4.5-8-10a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 11c0 5.5-8 10-8 10z" />
              </svg>
              {t.soutien.btn}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="don-overlay" onClick={() => setOpen(false)}>
          <div className="don-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="don-close" aria-label={t.don.close} onClick={() => setOpen(false)}>×</button>

            <h3 className="don-title">{t.don.title}</h3>

            <p className="don-paragraph">{t.don.p1}</p>

            <div className="don-rib">
              <p><span>{t.don.holder}</span> ASSOCIATION DIABETE MAROC </p>
              <p><span>RIB :</span> 230 450 38253947221627700 61</p>
              <p><span>IBAN :</span> MA64 2304 5739 2536 3211 0277 0061</p>
              <p><span>Code SWIFT :</span> CIHMMAMC</p>
            </div>

            <p className="don-paragraph">{t.don.p2}</p>

            <p className="don-thanks">{t.don.thanks}</p>
          </div>
        </div>
      )}
    </section>
  );
}
