import { useCallback, useEffect, useState } from "react";

const IMAGES = [
  { src: "/galerie/affiche.png", alt: "Affiche de sensibilisation" },
  { src: "/galerie/flyer.png", alt: "Flyer de l'association" },
  { src: "/galerie/panneau.png", alt: "Panneau publicitaire" },
  { src: "/galerie/vehicule.png", alt: "Habillage du véhicule médical" },
  { src: "/galerie/rollup.png", alt: "Roll-up de l'association" },
];

export default function Galerie() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(null); // index ouvert
  const [zoom, setZoom] = useState(1);

  // Défilement automatique en boucle
  useEffect(() => {
    if (paused || lightbox !== null) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % IMAGES.length);
    }, 2800);
    return () => clearInterval(id);
  }, [paused, lightbox]);

  const openLightbox = (i) => {
    setLightbox(i);
    setZoom(1);
  };
  const closeLightbox = useCallback(() => {
    setLightbox(null);
    setZoom(1);
  }, []);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.3, 4));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.3, 1));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox]);

  return (
    <section className="galerie" id="galerie">
      <div className="container">
        <div
          className="galerie-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {IMAGES.map((img, i) => {
            const offset = (i - current + IMAGES.length) % IMAGES.length;
            let pos = "hidden";
            if (offset === 0) pos = "active";
            else if (offset === 1) pos = "next";
            else if (offset === IMAGES.length - 1) pos = "prev";
            return (
              <button
                type="button"
                key={img.src}
                className={`galerie-item ${pos}`}
                onClick={() => (pos === "active" ? openLightbox(i) : setCurrent(i))}
                aria-label={img.alt}
              >
                <img src={img.src} alt={img.alt} />
              </button>
            );
          })}
        </div>

        <div className="galerie-dots">
          {IMAGES.map((img, i) => (
            <button
              type="button"
              key={img.src}
              className={`galerie-dot${i === current ? " on" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" aria-label="Fermer" onClick={closeLightbox}>×</button>

          <div className="lightbox-tools" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Zoom arrière" onClick={zoomOut}>−</button>
            <span>{Math.round(zoom * 100)}%</span>
            <button aria-label="Zoom avant" onClick={zoomIn}>+</button>
          </div>

          <div className="lightbox-canvas" onClick={(e) => e.stopPropagation()}>
            <img
              src={IMAGES[lightbox].src}
              alt={IMAGES[lightbox].alt}
              style={{ transform: `scale(${zoom})`, cursor: zoom > 1 ? "grab" : "zoom-in" }}
              onClick={() => (zoom > 1 ? zoomOut() : zoomIn())}
            />
          </div>
        </div>
      )}
    </section>
  );
}
