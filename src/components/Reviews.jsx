import { useRef } from "react";
import { useLang } from "../i18n.jsx";

const REVIEWS = [
  {
    name: "Fatima Z.",
    role: "Patiente accompagnée",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    stars: 5,
    text: "Grâce à l’association, j’ai appris à mieux gérer mon diabète au quotidien. L’écoute et le soutien de l’équipe ont changé ma vie.",
  },
  {
    name: "Dr. Karim B.",
    role: "Médecin bénévole",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80",
    stars: 5,
    text: "Une organisation exemplaire sur le terrain. Les caravanes de dépistage permettent de toucher des personnes qui n’ont pas accès aux soins.",
  },
  {
    name: "Hassan M.",
    role: "Parent d’un enfant diabétique",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    stars: 4,
    text: "Les ateliers de nutrition nous ont beaucoup aidés en famille. On se sent enfin accompagnés et moins seuls face à la maladie.",
  },
  {
    name: "Salma A.",
    role: "Bénévole",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    stars: 5,
    text: "Participer aux actions de l’association est une expérience humaine incroyable. Chaque sourire des bénéficiaires nous motive.",
  },
  {
    name: "Youssef R.",
    role: "Patient accompagné",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    stars: 5,
    text: "Le suivi personnalisé m’a permis de reprendre confiance. Je sais désormais vers qui me tourner en cas de besoin.",
  },
  {
    name: "Nadia L.",
    role: "Infirmière partenaire",
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=200&q=80",
    stars: 4,
    text: "Une équipe engagée et professionnelle. Les campagnes de dépistage sont parfaitement organisées sur le terrain.",
  },
  {
    name: "Omar T.",
    role: "Donateur",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    stars: 5,
    text: "Je soutiens l’association depuis trois ans. La transparence et l’impact réel de leurs actions m’ont totalement convaincu.",
  },
  {
    name: "Khadija E.",
    role: "Aidante familiale",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    stars: 5,
    text: "Les ateliers m’ont appris à mieux accompagner ma mère au quotidien. Un vrai soutien pour toute la famille.",
  },
  {
    name: "Rachid B.",
    role: "Patient accompagné",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    stars: 4,
    text: "Grâce aux séances d’éducation thérapeutique, j’ai enfin compris comment équilibrer mon alimentation.",
  },
  {
    name: "Imane S.",
    role: "Étudiante bénévole",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
    stars: 5,
    text: "M’engager auprès de l’association donne du sens à mon parcours. On apprend énormément au contact des patients.",
  },
];

function Stars({ count }) {
  return (
    <div className="review-stars" aria-label={`${count} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="16" height="16" className={i < count ? "on" : "off"}>
          <path fill="currentColor" d="M12 17.3l-6.2 3.7 1.6-7L2 9.2l7.1-.6L12 2l2.9 6.6 7.1.6-5.4 4.8 1.6 7z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const { t } = useLang();
  const trackRef = useRef(null);

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="reviews" id="temoignages">
      <div className="container">
        <h2 className="section-title">
          {t.reviews.title1} <span className="accent-orange">{t.reviews.title2}</span>
        </h2>
        <span className="section-underline" aria-hidden="true"></span>

        <div className="reviews-carousel">
          <button
            type="button"
            className="reviews-arrow prev"
            aria-label="Précédent"
            onClick={() => scroll(-1)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M15 6l-6 6 6 6z" /></svg>
          </button>

          <div className="reviews-track" ref={trackRef}>
            {REVIEWS.map((review) => (
              <article className="review-card" key={review.name}>
                <span className="review-quote" aria-hidden="true">“</span>
                <Stars count={review.stars} />
                <p className="review-text">{review.text}</p>
                <div className="review-author">
                  <img src={review.avatar} alt={review.name} />
                  <div>
                    <h4 className="review-name">{review.name}</h4>
                    <p className="review-role">{review.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="reviews-arrow next"
            aria-label="Suivant"
            onClick={() => scroll(1)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M9 6l6 6-6 6z" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
