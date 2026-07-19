import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";

const QUICK_KEYS = [
  { href: "#accueil", key: "accueil" },
  { href: "#apropos", key: "apropos" },
  { href: "#activites", key: "activites" },
  { href: "#contact", key: "contact" },
];

export default function Footer() {
  const { t } = useLang();
  const actions = [t.footer.a1, t.footer.a2, t.footer.a3, t.footer.a4, t.footer.a5];
  const [toast, setToast] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const message = form.message.value;

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });
      const data = await response.json();
      
      if (data.success) {
        form.reset();
        setToast(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setToast(false), 4000);
      } else {
        alert(data.error || 'Erreur lors de l\'envoi du message');
      }
    } catch (err) {
      alert('Erreur de connexion');
    }
  };

  return (
    <footer className="footer" id="contact">
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14.4l-4-4L8.4 11l2.6 2.6L15.6 9l1.4 1.4-6 6z" />
        </svg>
        <span>{t.footer.toast}</span>
      </div>

      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#accueil" className="brand">
            <span className="brand-logo">
              <img src="/logo.final.ASS.png" alt="Logo Association Diabète & Vie" />
            </span>
            <span className="brand-text">
              <span className="brand-name">
                <span>Association</span>
                <strong>Diabète.ma</strong>
              </span>
              <span className="brand-tag">{t.footer.tag}</span>
            </span>
          </a>

          <div className="footer-social">
            <a href="#" className="social fb" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M13 22v-8h2.7l.4-3H13V9c0-.9.3-1.5 1.6-1.5H16V4.8c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 3.9V11H7.5v3H10v8h3z"/></svg>
            </a>
            <a href="#" className="social ig" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4a3.9 3.9 0 01-1.4-.9 3.9 3.9 0 01-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1012 18.6 6.6 6.6 0 0012 5.4zm0 10.9a4.3 4.3 0 110-8.6 4.3 4.3 0 010 8.6zM19.3 5.9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>
            </a>
            <a href="#" className="social yt" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M23 12s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C19.3 5.2 12 5.2 12 5.2s-7.3 0-8.9.4c-.8.2-1.5.9-1.7 1.7C1 8.8 1 12 1 12s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7 1.6.4 8.9.4 8.9.4s7.3 0 8.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.7.4-4.7zM9.7 15.3V8.7l5.7 3.3-5.7 3.3z"/></svg>
            </a>
            <a href="#" className="social wa" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1a6.7 6.7 0 01-2-1.2 7.4 7.4 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4c.1-.2.2-.3.2-.5.1-.1 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4 0-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.4c.1.2 1.7 2.6 4.1 3.6.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">{t.footer.quick}</h4>
          <ul className="footer-list">
            {QUICK_KEYS.map((link) => (
              <li key={link.key}><a href={link.href}>{t.nav[link.key]}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">{t.footer.actions}</h4>
          <ul className="footer-list">
            {actions.map((action) => (
              <li key={action}><a href="#activites">{action}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">{t.footer.contact}</h4>
          <ul className="footer-contact">
            <li>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.1 2.2z"/></svg>
              +212 5 12 34 56 78
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm8 7L4 6.5V6l8 4.5L20 6v.5L12 11z"/></svg>
              contact@diabete.ma
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>
              Avenue Al Barid, Bensouda Caablanca 20340
            </li>
            
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">{t.footer.newsletter}</h4>
          <p className="footer-news-text">{t.footer.newsText}</p>
          <form className="footer-news" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              className="footer-news-input"
              placeholder={t.footer.email}
              aria-label={t.footer.email}
              required
            />
            <textarea
              name="message"
              className="footer-news-input"
              placeholder={t.footer.message}
              aria-label={t.footer.message}
              rows="3"
            ></textarea>
            <button type="submit" className="footer-news-btn">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
              {t.footer.send}
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
