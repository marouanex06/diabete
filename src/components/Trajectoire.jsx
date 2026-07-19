import { useLang } from "../i18n.jsx";

export default function Trajectoire({ open, sectionRef }) {
  const { t } = useLang();
  const tr = t.trajectoire;
  const stats = [
    { className: "accent-orange", label: tr.s1, number: "2006" },
    { className: "accent-green", number: "+15 000", sub: tr.s2 },
    { className: "accent-red", number: "+67", sub: tr.s3 },
    { className: "accent-pink", number: "12", sub: tr.s4 },
  ];

  return (
    <section
      className={`trajectoire${open ? " show" : ""}`}
      id="trajectoire"
      ref={sectionRef}
    >
      <div className="container traj-inner">
        <div className="traj-stats">
          {stats.map((stat, i) => (
            <div className="stat" key={i}>
              {stat.label && (
                <span className={`stat-label ${stat.className}`}>{stat.label}</span>
              )}
              <span className={`stat-number ${stat.className}`}>{stat.number}</span>
              {stat.sub && (
                <span className={`stat-sub ${stat.className}`}>{stat.sub}</span>
              )}
            </div>
          ))}
        </div>

        <div className="traj-content">
          {tr.p.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </div>

      <div className="container traj-hierarchie">
        <img
          className="hierarchie-img"
          src="/hierarchie.png"
          alt="Organigramme de l'association"
        />
      </div>
    </section>
  );
}
