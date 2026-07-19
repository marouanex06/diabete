import { useLang } from "../i18n.jsx";

const ICONS = {
  green: <path fill="currentColor" d="M12 2l8 3v6c0 5-3.4 8.5-8 11-4.6-2.5-8-6-8-11V5l8-3zm-1.2 13l5-5-1.4-1.4-3.6 3.6-1.6-1.6L7.8 12l3 3z" />,
  orange: <path fill="currentColor" d="M16 11a3 3 0 100-6 3 3 0 000 6zm-8 0a3 3 0 100-6 3 3 0 000 6zm0 2c-2.7 0-6 1.3-6 4v2h8v-2c0-1 .4-1.9 1-2.6C10.3 13.3 9 13 8 13zm8 0c-.5 0-1.1 0-1.7.1 1 .8 1.7 1.9 1.7 3.3V18h6v-2c0-2.7-3.3-3-6-3z" />,
  red: <path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 100 12 6 6 0 000-12zm0 3a3 3 0 100 6 3 3 0 000-6z" />,
};

export default function About() {
  const { t } = useLang();
  const features = [
    { iconClass: "icon-green", icon: ICONS.green, title: t.about.f1t, text: t.about.f1x },
    { iconClass: "icon-orange", icon: ICONS.orange, title: t.about.f2t, text: t.about.f2x },
    { iconClass: "icon-red", icon: ICONS.red, title: t.about.f3t, text: t.about.f3x },
  ];

  return (
    <section className="about" id="apropos">
      <div className="container about-inner">
        <div className="about-intro">
          <p className="overline">{t.about.overline}</p>
          <h2 className="about-title">
            <span className="nowrap">{t.about.title1}</span>
            <br />{t.about.title2}
          </h2>
          <p className="about-text">{t.about.text}</p>
        </div>

        <div className="about-features">
          {features.map((feature) => (
            <article className="feature" key={feature.title}>
              <span className={`feature-icon ${feature.iconClass}`} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26">
                  {feature.icon}
                </svg>
              </span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-text">{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
