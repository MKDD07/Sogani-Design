import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, FileText, ExternalLink, ZoomIn } from "lucide-react";
import "./PressSection.scss";

gsap.registerPlugin(ScrollTrigger);

export interface PressItem {
  title: string;
  date: string;
  img: string;
  pdf?: string;
}

const PRESS_ITEMS: PressItem[] = [
  {
    title: "Vibhor Sogani: Celebrated Artist & Sculptor | Jindal Stainless",
    date: "2023",
    img: "https://sogani.design/wp-content/uploads/2023/12/WhatsApp-Image-2023-11-28-at-12.12.26_675579f9-300x252.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2023/12/Vibhor-Sogani-Interview-Jindal-Stainless.pdf",
  },
  {
    title: "Commune",
    date: "2023",
    img: "https://sogani.design/wp-content/uploads/2023/12/Commune-1-236x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2023/12/Commune-1.pdf",
  },
  {
    title: "Nebula",
    date: "2023",
    img: "https://sogani.design/wp-content/uploads/2023/12/WhatsApp-Image-2023-11-28-at-11.16.04_5487cd6b-296x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2023/12/Nebula.pdf",
  },
  {
    title: "PM Vishwakarma",
    date: "2023",
    img: "https://sogani.design/wp-content/uploads/2023/12/WhatsApp-Image-2023-11-28-at-11.20.21_fbe65142-237x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2023/12/PM-Vishwakarma.pdf",
  },
  {
    title: "IFJ Collector's Edition",
    date: "2022",
    img: "https://sogani.design/wp-content/uploads/2022/10/WhatsApp-Image-2022-10-28-at-12.56.45-219x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2022/10/IFJ-Collector-Editon.pdf",
  },
  {
    title: "Moulded Magic",
    date: "2022",
    img: "https://sogani.design/wp-content/uploads/2022/10/WhatsApp-Image-2022-10-28-at-12.57.06-212x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2022/10/Moulded-Magic.pdf",
  },
  {
    title: "A1 Lighting, UK, Cover feature",
    date: "March 2020",
    img: "https://sogani.design/wp-content/uploads/2020/05/andaz-cover-web-216x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/05/03-Cover-Story-UK-A1-Lighting-web-1.pdf",
  },
  {
    title: "Hotelier India",
    date: "February 2020",
    img: "https://sogani.design/wp-content/uploads/2020/03/Vibhor-Sogani-Studio-Hotelier-India-Feb-2020-227x300.png",
    pdf: "https://sogani.design/wp-content/uploads/2020/03/Sogani_HotelierIndia_Feb20.pdf",
  },
  {
    title: "A1 Lighting",
    date: "February 2020",
    img: "https://sogani.design/wp-content/uploads/2020/03/A1-Lighting-Vibhor-Sogani-1-227x300.png",
    pdf: "https://sogani.design/wp-content/uploads/2020/03/A1Lighting_SOGANI_Aroma_Feb20.pdf",
  },
  {
    title: "IFJ",
    date: "February 2020",
    img: "https://sogani.design/wp-content/uploads/2020/03/IFJ-01-259x300.png",
    pdf: "https://sogani.design/wp-content/uploads/2020/03/02-feb-Vibhor-Sogani_IFJ_Feb20_compressed.pdf",
  },
  {
    title: "Joy Art Soul Life",
    date: "December 2019",
    img: "https://sogani.design/wp-content/uploads/2020/02/Joy_Art_Soul_Life_Vibhor_Sogani-300x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/02/Joy_Art_Soul_Life_Vibhor_Sogani_compressed.pdf",
  },
  {
    title: "Aroma Darc",
    date: "December 2019",
    img: "https://sogani.design/wp-content/uploads/2020/02/Aroma_Darc_December_2019-300x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/02/Aroma_Darc_December_19_compressed.pdf",
  },
];

interface PressCardProps {
  item: PressItem;
  onOpen: (item: PressItem) => void;
}

const PressCard: React.FC<PressCardProps> = ({ item, onOpen }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.4, ease: "power2.out" });
    gsap.to(overlayRef.current, { backgroundColor: "rgba(20,18,15,0.35)", duration: 0.25 });
    gsap.to(badgeRef.current, { autoAlpha: 1, y: 0, duration: 0.22, ease: "power2.out" });
    gsap.to(cardRef.current, {
      boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
      borderColor: "#d8d0c4",
      duration: 0.25,
    });
  };

  const handleLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(overlayRef.current, { backgroundColor: "rgba(20,18,15,0)", duration: 0.25 });
    gsap.to(badgeRef.current, { autoAlpha: 0, y: 8, duration: 0.22, ease: "power2.out" });
    gsap.to(cardRef.current, {
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      borderColor: "#ececec",
      duration: 0.25,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`press-card${item.pdf ? "" : " press-card--static"}`}
      onClick={() => item.pdf && onOpen(item)}
      onMouseEnter={item.pdf ? handleEnter : undefined}
      onMouseLeave={item.pdf ? handleLeave : undefined}
    >
      <div className="press-card__media">
        <img ref={imgRef} className="press-card__img" src={item.img} alt={item.title} loading="lazy" />
        {item.pdf && (
          <div ref={overlayRef} className="press-card__overlay">
            <div ref={badgeRef} className="press-card__badge">
              <ZoomIn size={14} /> View PDF
            </div>
          </div>
        )}
      </div>
      <div className="press-card__body">
        <h3 className="press-card__item-title">{item.title}</h3>
        <p className="press-card__date">{item.date}</p>
      </div>
    </div>
  );
};

interface PdfModalProps {
  item: PressItem | null;
  onClose: () => void;
}

const PdfModal: React.FC<PdfModalProps> = ({ item, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef(false);

  useEffect(() => {
    if (!item) return;
    closingRef.current = false;
    setLoaded(false);

    const tl = gsap.timeline({ onComplete: () => setVisible(true) });
    tl.set(overlayRef.current, { autoAlpha: 0 });
    tl.set(panelRef.current, { autoAlpha: 0, scale: 0.92, y: 24 });
    tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.22, ease: "power1.out" });
    tl.to(
      panelRef.current,
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.32, ease: "back.out(1.6)" },
      "-=0.1"
    );

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { autoAlpha: 0, scale: 0.92, y: 24, duration: 0.2, ease: "power1.in" });
    tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.18, ease: "power1.in" }, "-=0.1");
  };

  if (!item) return null;

  return (
    <div ref={overlayRef} className="pdf-modal" onClick={handleClose}>
      <div ref={panelRef} className="pdf-modal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-modal__header">
          <div className="pdf-modal__heading">
            <FileText size={18} color="#8a6b4a" />
            <div>
              <div className="pdf-modal__title">{item.title}</div>
              <div className="pdf-modal__date">{item.date}</div>
            </div>
          </div>
          <div className="pdf-modal__actions">
            <a className="pdf-modal__link" href={item.pdf} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} /> Open
            </a>
            <button className="pdf-modal__close" aria-label="Close" onClick={handleClose}>
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="pdf-modal__body">
          {!loaded && (
            <div className="pdf-modal__loading">
              <span className="pdf-modal__spinner" />
              Loading document…
            </div>
          )}
          <iframe
            title={item.title}
            src={item.pdf}
            onLoad={() => setLoaded(true)}
            className={`pdf-modal__frame${loaded ? " pdf-modal__frame--loaded" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

const PressSection: React.FC = () => {
  const [active, setActive] = useState<PressItem | null>(null);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="press-section">
      <div className="press-section__inner">
        <h2 className="press-section__title">Press &amp; media</h2>
        <p className="press-section__subtitle">
          A selection of features and interviews. Click any item to read the PDF.
        </p>
        <div className="press-section__grid">
          {PRESS_ITEMS.map((item) => (
            <PressCard key={item.title} item={item} onOpen={setActive} />
          ))}
        </div>
      </div>
      <PdfModal item={active} onClose={() => setActive(null)} />
    </section>
  );
};

export default PressSection;
