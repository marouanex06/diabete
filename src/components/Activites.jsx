import { useState } from "react";
import { useLang } from "../i18n.jsx";

const IMAGES = [
  "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80",
];

const EXTRA_IMAGES = [
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
];

// [jour, index du mois (0-11), année] — partagées entre les langues
const MAIN_DATES = [[12, 6, 2026], [28, 5, 2026], [15, 4, 2026], [5, 4, 2026]];
const EXTRA_DATES = [
  [29, 3, 2026], [22, 3, 2026], [14, 2, 2026], [7, 2, 2026], [26, 1, 2026],
  [19, 1, 2026], [11, 1, 2026], [3, 1, 2026], [27, 0, 2026], [18, 0, 2026],
  [9, 0, 2026], [26, 11, 2025], [13, 11, 2025], [5, 11, 2025], [26, 10, 2025],
  [15, 10, 2025], [5, 10, 2025], [28, 9, 2025], [13, 9, 2025], [6, 8, 2025],
];

const MONTHS = {
  fr: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ar: ["يناير", "فبراير", "مارس", "أبريل", "ماي", "يونيو", "يوليوز", "غشت", "شتنبر", "أكتوبر", "نونبر", "دجنبر"],
};

function fmtDate(lang, [d, m, y]) {
  return `${String(d).padStart(2, "0")} ${MONTHS[lang][m]} ${y}`;
}

const CONTENT = {
  fr: {
    main: [
      { badge: "badge-green", title: "Caravane médicale à Fés", text: "Une journée de dépistage et de sensibilisation au diabète.", details: "Nos équipes médicales se sont déplacées à Fés pour offrir des dépistages gratuits, des conseils personnalisés et une orientation vers les structures de soins adaptées.", info: { beneficiaires: "+320 personnes", lieu: "Fés, Maroc", benevoles: "25 bénévoles", duree: "1 journée" } },
      { badge: "badge-orange", title: "Conférence sur la nutrition", text: "Atelier sur l’alimentation équilibrée pour les personnes diabétiques.", details: "Des nutritionnistes ont partagé des conseils pratiques pour composer des repas équilibrés et adaptés à la vie quotidienne des personnes diabétiques.", info: { beneficiaires: "+120 participants", lieu: "Rabat, Maroc", benevoles: "8 intervenants", duree: "3 heures" } },
      { badge: "badge-green", title: "Dépistage gratuit à Rabat", text: "Plus de 200 personnes dépistées lors de notre campagne.", details: "Une campagne d’une journée qui a permis de dépister plus de 200 personnes et d’orienter les cas à risque vers un suivi médical approprié.", info: { beneficiaires: "+200 personnes", lieu: "Rabat, Maroc", benevoles: "18 bénévoles", duree: "1 journée" } },
      { badge: "badge-orange", title: "Journée mondiale du diabète", text: "Retour en images sur notre journée de sensibilisation.", details: "Une journée riche en ateliers, témoignages et animations de sensibilisation, réunissant patients, familles et professionnels de santé.", info: { beneficiaires: "+500 visiteurs", lieu: "Casablanca, Maroc", benevoles: "40 bénévoles", duree: "1 journée" } },
    ],
    extraTitles: [
      "Atelier d’éducation thérapeutique", "Marche solidaire pour le diabète", "Campagne de dépistage à Marrakech",
      "Formation des bénévoles", "Sensibilisation dans les écoles", "Consultation gratuite à Tanger",
      "Rencontre des patients", "Webinaire prévention & nutrition", "Distribution de kits de dépistage",
      "Conférence médicale à Casablanca", "Journée sport & santé", "Atelier cuisine équilibrée",
      "Dépistage en milieu rural", "Table ronde avec des experts", "Campagne de vaccination",
      "Accompagnement psychologique", "Séance de yoga adaptée", "Forum associatif régional",
      "Caravane médicale à Agadir", "Collecte de dons annuelle",
    ],
    extraTexts: [
      "Un moment d’échange pour mieux vivre au quotidien avec le diabète.",
      "Des centaines de participants réunis pour une bonne cause.",
      "Une équipe mobilisée au plus près des habitants.",
      "Renforcer les compétences de nos équipes sur le terrain.",
      "Prévenir dès le plus jeune âge grâce à l’information.",
      "Des consultations ouvertes à toutes et à tous.",
    ],
    detail: {
      p2: "Cette action s’inscrit pleinement dans la mission de l’Association Diabète.ma : prévenir, accompagner et soutenir les personnes atteintes de diabète ainsi que leurs familles.",
      p3: "Grâce à la mobilisation de nos bénévoles et de nos partenaires, nous continuons d’agir sur le terrain pour améliorer la qualité de vie des patients partout au Maroc.",
      defaultDetails: "Un grand merci à nos bénévoles, partenaires et participants qui ont fait de cet événement un moment fort au service des personnes atteintes de diabète.",
      facts: ["Bénéficiaires", "Lieu", "Bénévoles mobilisés", "Durée"],
      defaults: { beneficiaires: "+150 personnes", lieu: "Maroc", benevoles: "20+ bénévoles", duree: "1 journée" },
      back: "← Fermer cet onglet",
      brandName: "Association marocaine",
    },
  },
  en: {
    main: [
      { badge: "badge-green", title: "Medical caravan in Fez", text: "A day of diabetes screening and awareness.", details: "Our medical teams travelled to Fez to offer free screenings, personalized advice and referral to appropriate care facilities.", info: { beneficiaires: "+320 people", lieu: "Fez, Morocco", benevoles: "25 volunteers", duree: "1 day" } },
      { badge: "badge-orange", title: "Nutrition conference", text: "Workshop on a balanced diet for people with diabetes.", details: "Nutritionists shared practical tips for putting together balanced meals suited to the daily life of people with diabetes.", info: { beneficiaires: "+120 participants", lieu: "Rabat, Morocco", benevoles: "8 speakers", duree: "3 hours" } },
      { badge: "badge-green", title: "Free screening in Rabat", text: "More than 200 people screened during our campaign.", details: "A one-day campaign that screened more than 200 people and referred at-risk cases to appropriate medical follow-up.", info: { beneficiaires: "+200 people", lieu: "Rabat, Morocco", benevoles: "18 volunteers", duree: "1 day" } },
      { badge: "badge-orange", title: "World Diabetes Day", text: "A look back in pictures at our awareness day.", details: "A day full of workshops, testimonials and awareness activities, bringing together patients, families and health professionals.", info: { beneficiaires: "+500 visitors", lieu: "Casablanca, Morocco", benevoles: "40 volunteers", duree: "1 day" } },
    ],
    extraTitles: [
      "Therapeutic education workshop", "Solidarity walk for diabetes", "Screening campaign in Marrakech",
      "Volunteer training", "Awareness in schools", "Free consultation in Tangier",
      "Patient meet-up", "Prevention & nutrition webinar", "Distribution of screening kits",
      "Medical conference in Casablanca", "Sport & health day", "Balanced cooking workshop",
      "Screening in rural areas", "Round table with experts", "Vaccination campaign",
      "Psychological support", "Adapted yoga session", "Regional association forum",
      "Medical caravan in Agadir", "Annual donation drive",
    ],
    extraTexts: [
      "A moment of exchange to better live daily with diabetes.",
      "Hundreds of participants gathered for a good cause.",
      "A team mobilized as close as possible to residents.",
      "Strengthening the skills of our teams in the field.",
      "Preventing from an early age through information.",
      "Consultations open to everyone.",
    ],
    detail: {
      p2: "This action is fully part of the mission of the Diabète.ma Association: to prevent, support and stand by people with diabetes and their families.",
      p3: "Thanks to the mobilization of our volunteers and partners, we continue to act on the ground to improve patients’ quality of life throughout Morocco.",
      defaultDetails: "A big thank you to our volunteers, partners and participants who made this event a strong moment serving people with diabetes.",
      facts: ["Beneficiaries", "Location", "Volunteers mobilized", "Duration"],
      defaults: { beneficiaires: "+150 people", lieu: "Morocco", benevoles: "20+ volunteers", duree: "1 day" },
      back: "← Close this tab",
      brandName: "Moroccan association",
    },
  },
  ar: {
    main: [
      { badge: "badge-green", title: "قافلة طبية بفاس", text: "يوم للكشف والتوعية بداء السكري.", details: "تنقّلت فرقنا الطبية إلى فاس لتقديم كشوفات مجانية ونصائح مخصصة وتوجيه نحو بنيات العلاج المناسبة.", info: { beneficiaires: "+320 شخص", lieu: "فاس، المغرب", benevoles: "25 متطوعاً", duree: "يوم واحد" } },
      { badge: "badge-orange", title: "ندوة حول التغذية", text: "ورشة حول التغذية المتوازنة للمصابين بداء السكري.", details: "شارك أخصائيو التغذية نصائح عملية لإعداد وجبات متوازنة تناسب الحياة اليومية للمصابين بداء السكري.", info: { beneficiaires: "+120 مشارك", lieu: "الرباط، المغرب", benevoles: "8 متدخلين", duree: "3 ساعات" } },
      { badge: "badge-green", title: "كشف مجاني بالرباط", text: "أزيد من 200 شخص تم كشفهم خلال حملتنا.", details: "حملة ليوم واحد مكّنت من كشف أزيد من 200 شخص وتوجيه الحالات المعرضة للخطر نحو تتبع طبي مناسب.", info: { beneficiaires: "+200 شخص", lieu: "الرباط، المغرب", benevoles: "18 متطوعاً", duree: "يوم واحد" } },
      { badge: "badge-orange", title: "اليوم العالمي للسكري", text: "عودة بالصور إلى يوم التوعية الذي نظمناه.", details: "يوم حافل بالورشات والشهادات وأنشطة التوعية، جمع المرضى والعائلات ومهنيي الصحة.", info: { beneficiaires: "+500 زائر", lieu: "الدار البيضاء، المغرب", benevoles: "40 متطوعاً", duree: "يوم واحد" } },
    ],
    extraTitles: [
      "ورشة التربية العلاجية", "مسيرة تضامنية من أجل مرضى السكري", "حملة كشف بمراكش",
      "تكوين المتطوعين", "التوعية في المدارس", "استشارة مجانية بطنجة",
      "لقاء المرضى", "ندوة عن بعد حول الوقاية والتغذية", "توزيع أطقم الكشف",
      "ندوة طبية بالدار البيضاء", "يوم الرياضة والصحة", "ورشة الطبخ المتوازن",
      "الكشف في الوسط القروي", "مائدة مستديرة مع خبراء", "حملة تلقيح",
      "المواكبة النفسية", "حصة يوغا ملائمة", "منتدى جمعوي جهوي",
      "قافلة طبية بأكادير", "حملة سنوية لجمع التبرعات",
    ],
    extraTexts: [
      "لحظة تبادل من أجل عيش أفضل يومياً مع داء السكري.",
      "مئات المشاركين اجتمعوا من أجل قضية نبيلة.",
      "فريق معبّأ في أقرب مكان من الساكنة.",
      "تعزيز مهارات فرقنا في الميدان.",
      "الوقاية منذ الصغر بفضل الإعلام.",
      "استشارات مفتوحة للجميع.",
    ],
    detail: {
      p2: "يندرج هذا العمل بالكامل ضمن رسالة جمعية Diabète.ma: الوقاية والمرافقة ودعم المصابين بداء السكري وأسرهم.",
      p3: "بفضل تعبئة متطوعينا وشركائنا، نواصل العمل في الميدان لتحسين جودة حياة المرضى في جميع أنحاء المغرب.",
      defaultDetails: "شكراً جزيلاً لمتطوعينا وشركائنا والمشاركين الذين جعلوا من هذا الحدث لحظة قوية في خدمة المصابين بداء السكري.",
      facts: ["المستفيدون", "المكان", "المتطوعون المعبَّؤون", "المدة"],
      defaults: { beneficiaires: "+150 شخص", lieu: "المغرب", benevoles: "+20 متطوعاً", duree: "يوم واحد" },
      back: "← إغلاق هذه التبويبة",
      brandName: "الجمعية المغربية",
    },
  },
};

const GALLERY_POOL = [
  "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=900&q=80",
];

function buildActivities(lang) {
  const c = CONTENT[lang];
  const main = c.main.map((m, i) => ({
    image: IMAGES[i],
    date: fmtDate(lang, MAIN_DATES[i]),
    badge: m.badge,
    title: m.title,
    text: m.text,
    details: m.details,
    info: m.info,
  }));
  const extra = c.extraTitles.map((title, i) => ({
    image: EXTRA_IMAGES[i],
    date: fmtDate(lang, EXTRA_DATES[i]),
    badge: i % 2 === 0 ? "badge-green" : "badge-orange",
    title,
    text: c.extraTexts[i % c.extraTexts.length],
  }));
  return { main, extra };
}

function openActivityDetail(item, index, lang) {
  const win = window.open("", "_blank");
  if (!win) return;

  const d = CONTENT[lang].detail;
  const dir = lang === "ar" ? "rtl" : "ltr";

  const gallery = [
    item.image.replace("w=600", "w=1000"),
    GALLERY_POOL[index % GALLERY_POOL.length],
    GALLERY_POOL[(index + 1) % GALLERY_POOL.length],
  ];

  const paragraphs = [item.details || d.defaultDetails, d.p2, d.p3];

  const info = item.info || {};
  const facts = [
    { icon: "M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6z", label: d.facts[0], value: info.beneficiaires || d.defaults.beneficiaires },
    { icon: "M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z", label: d.facts[1], value: info.lieu || d.defaults.lieu },
    { icon: "M16 11a3 3 0 100-6 3 3 0 000 6zm-8 0a3 3 0 100-6 3 3 0 000 6zm0 2c-2.7 0-6 1.3-6 4v2h8v-2c0-1 .4-1.9 1-2.6C10.3 13.3 9 13 8 13z", label: d.facts[2], value: info.benevoles || d.defaults.benevoles },
    { icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm1 11H7v-2h4V6h2z", label: d.facts[3], value: info.duree || d.defaults.duree },
  ];

  const html = `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${item.title} — Diabète.ma</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:"Poppins",sans-serif; color:#2b2b2b; background:#fbf6ef; line-height:1.7; }
  .topbar { background:#fff; border-bottom:1px solid #f0e9de; padding:16px 0; }
  .wrap { width:min(900px,92%); margin:0 auto; }
  .brand { display:flex; align-items:center; gap:10px; }
  .brand img { width:46px; height:46px; object-fit:contain; }
  .brand strong { color:#357a48; font-size:1.1rem; }
  .brand span { display:block; font-size:.72rem; color:#6b7280; }
  .hero { padding:34px 0 10px; }
  .badge { display:inline-block; background:#3f8f56; color:#fff; font-size:.78rem; font-weight:700; padding:6px 14px; border-radius:8px; margin-bottom:16px; }
  .badge.orange { background:#ec7f2e; }
  h1 { font-size:clamp(1.8rem,4vw,2.6rem); font-weight:800; letter-spacing:-.5px; margin-bottom:8px; }
  .lead { color:#6b7280; font-size:1.05rem; margin-bottom:24px; }
  .cover { width:100%; height:auto; aspect-ratio:16/8; object-fit:cover; border-radius:18px; box-shadow:0 20px 45px rgba(20,20,20,.1); }
  .content { padding:30px 0 20px; }
  .content p { margin-bottom:18px; color:#4a4a4a; }
  .gallery { display:grid; grid-template-columns:1fr 1fr; gap:16px; padding-bottom:40px; }
  .gallery img { width:100%; height:220px; object-fit:cover; border-radius:14px; }
  .facts { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:6px 0 30px; }
  .fact { background:#fff; border:1px solid #eadfce; border-radius:14px; padding:20px 16px; text-align:center; }
  .fact .ic { display:grid; place-items:center; width:44px; height:44px; margin:0 auto 10px; border-radius:50%; background:rgba(63,143,86,.12); color:#3f8f56; }
  .fact .val { font-size:1.15rem; font-weight:800; color:#2b2b2b; }
  .fact .lbl { font-size:.8rem; color:#6b7280; margin-top:2px; }
  .back { display:inline-block; margin:10px 0 40px; color:#ec7f2e; font-weight:600; text-decoration:none; cursor:pointer; }
  .back:hover { color:#e0741f; }
  @media (max-width:700px){ .facts{ grid-template-columns:1fr 1fr; } }
  @media (max-width:600px){ .gallery{ grid-template-columns:1fr; } }
</style>
</head>
<body>
  <div class="topbar">
    <div class="wrap brand">
      <img src="/logo.jpg" alt="Logo" />
      <span><span>${d.brandName}</span><strong>Diabète.ma</strong></span>
    </div>
  </div>

  <div class="wrap hero">
    <span class="badge ${item.badge === "badge-orange" ? "orange" : ""}">${item.date}</span>
    <h1>${item.title}</h1>
    <p class="lead">${item.text}</p>
    <img class="cover" src="${gallery[0]}" alt="${item.title}" />
  </div>

  <div class="wrap content">
    ${paragraphs.map((p) => `<p>${p}</p>`).join("")}
  </div>

  <div class="wrap facts">
    ${facts.map((f) => `
      <div class="fact">
        <span class="ic"><svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="${f.icon}"/></svg></span>
        <div class="val">${f.value}</div>
        <div class="lbl">${f.label}</div>
      </div>`).join("")}
  </div>

  <div class="wrap gallery">
    <img src="${gallery[1]}" alt="${item.title}" />
    <img src="${gallery[2]}" alt="${item.title}" />
  </div>

  <div class="wrap">
    <a class="back" onclick="window.close()">${d.back}</a>
  </div>
</body>
</html>`;

  win.document.write(html);
  win.document.close();
}

function ActivityCard({ item, phase = null, index = 0, lang }) {
  const { t } = useLang();
  const cls =
    phase === "in" ? " reveal" : phase === "out" ? " hide" : "";
  const delay = phase === "in" ? index * 60 : phase === "out" ? index * 25 : 0;

  return (
    <article
      className={`activity-card${cls}`}
      style={phase ? { animationDelay: `${delay}ms` } : undefined}
    >
      <div className="activity-media">
        <img src={item.image} alt={item.title} />
        <span className={`activity-date ${item.badge}`}>{item.date}</span>
      </div>
      <div className="activity-body">
        <h3 className="activity-title">{item.title}</h3>
        <p className="activity-text">{item.text}</p>
        <button
          type="button"
          className="activity-link"
          onClick={() => openActivityDetail(item, index, lang)}
        >
          {t.activites.more}
        </button>
      </div>
    </article>
  );
}

export default function Activites() {
  const { lang, t } = useLang();
  const [showAll, setShowAll] = useState(false);
  const [closing, setClosing] = useState(false);

  const { main, extra } = buildActivities(lang);

  const handleToggle = () => {
    if (!showAll) {
      setShowAll(true);
    } else {
      setClosing(true);
      setTimeout(() => {
        setShowAll(false);
        setClosing(false);
      }, 550);
    }
  };

  return (
    <section className="activites" id="activites">
      <div className="container">
        <h2 className="section-title">
          {t.activites.title1} <span className="accent-orange">{t.activites.title2}</span>
        </h2>
        <span className="section-underline" aria-hidden="true"></span>

        <div className="activites-grid">
          {main.map((item) => (
            <ActivityCard item={item} key={item.title} lang={lang} />
          ))}
          {showAll && extra.map((item, i) => (
            <ActivityCard
              item={item}
              key={item.title}
              phase={closing ? "out" : "in"}
              index={i}
              lang={lang}
            />
          ))}
        </div>

        <div className="activites-cta">
          <button
            type="button"
            className="btn btn-red"
            onClick={handleToggle}
          >
            {showAll && !closing ? t.activites.seeLess : t.activites.seeAll}
          </button>
        </div>
      </div>
    </section>
  );
}
