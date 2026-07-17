import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import '../styles/about.css'
import useDocumentMetadata from '../hooks/useDocumentMetadata.js'

gsap.registerPlugin(ScrollTrigger)

/* ── Awards data ──────────────────────────── */
const AWARDS = [
  { year: '2022', title: 'IIID DRC Design Excellence Honours Awards' },
  { year: '2018', title: 'IIID Design Excellence Regional Awards for "Drape"' },
  { year: '2018', title: 'Best Lighting Designer of the Year — EDIDA India for "Casa"' },
  { year: '2018', title: 'Decorative Wall Lighting Product of the Year — Light Middle East Awards, Dubai for "Umbra"' },
  { year: '2015', title: 'Acetech Platinum Winner — Grand Stand Awards, Mumbai' },
  { year: '2014', title: 'Indian Art Icon of the Year — Camera, Catwalk and Canvas, Singapore' },
  { year: '2013', title: 'Flame for Creative Genius — Index Mumbai' },
  { year: '2012', title: 'Star "The Abstract Iconoclast" — Realty Awards, India' },
  { year: '2011', title: 'Best Lighting Designer of the Year — EDIDA India for "Slice"' },
  { year: '2009', title: 'Gold Award — Joburg Easter Festival, South Africa' },
  { year: '2008', title: 'Best Lighting Designer of the Year — EDIDA India for "Chroma" & "Golden Dew"' },
  { year: '2002', title: 'Best Applied Art Show — India Habitat Centre, New Delhi' },
]

const SPEAKING = [
  'New York Light Fair, New York, USA, 2023',
  'Amsterdam Light Festival, Netherlands 2023–24',
  'Jindal School of Art & Architecture, Webinar, 2021',
  'UID Karnavati University, Webinar, 2020',
  'Ishanya 2019, Design Meet, IIT Guwahati 2019',
  'Think Light Conference, Dubai 2018',
  'IIID Knowledge Series, Vadodara, India 2018',
  'NASA at Jaipur, India 2017',
  'ID Symposium at India Design 2017',
  'IIID Delhi Chapter, India 2017',
  'Nine Dot Squares, Jaipur, India 2016',
  'Isola (Earth and Upon), Delhi, India 2014',
  'DesignXDesign, New Delhi, India 2012',
  'APSDA, Goa, India, 2012',
  'Manthan, Delhi, India 2009',
]

const EXHIBITIONS = [
  'Amsterdam Light Festival (ALF), Netherlands, 2023–24',
  'Dubai Design Week, D3, UAE, 2020',
  'India Design 2019, New Delhi',
  'Light First, New Delhi, India, Nov 2018',
  'AD Design Show 2018, Mumbai, India',
  'Light and Building 2018, Frankfurt, Germany',
  'India Design 2017, New Delhi',
  'India Design 2016, New Delhi',
  'iDecorama Trade Show 2016, Mumbai',
  'India Design 2015, New Delhi',
  'India Design 2014, New Delhi',
  'India Design 2013, New Delhi',
  'Index, Mumbai, 2013',
  'Joburg Easter Festival, South Africa, 2009',
  'Images Unwind, 2002',
]

export default function About() {
  useDocumentMetadata({
    title: 'About Vibhor Sogani & SOGANI Design Studio',
    description: 'Learn about Vibhor Sogani, specialized industrial designer from NID, Ahmedabad, creating bespoke light installations and conceptual art across 12+ countries.',
    keywords: 'Vibhor Sogani, NID designer, lighting artist, Navdeep Sogani, SOGANI design studio history, design awards, decorative wall lights',
    canonicalUrl: 'https://sogani.design/about/'
  });

  useEffect(() => {
    /* Set initial states */
    gsap.set('.abt-reveal', { opacity: 0, y: 40 })
    gsap.set('.abt-reveal-x', { opacity: 0, x: -30 })

    /* Hero entrance */
    const heroTL = gsap.timeline({ delay: 0.2, defaults: { ease: 'power4.out' } })
    heroTL
      .to('.about-hero .eyebrow', { opacity: 1, y: 0, duration: 0.7 })
      .to('.about-hero__sub', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')

    /* Scroll reveals */
    document.querySelectorAll('.abt-reveal').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      })
    })

    document.querySelectorAll('.abt-reveal-x').forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      })
    })

    /* Stagger award items */
    gsap.fromTo('.award-item',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.award-list', start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    )

    /* Stagger event list items */
    document.querySelectorAll('.event-list').forEach(list => {
      gsap.fromTo(list.querySelectorAll('li'),
        { opacity: 0, x: -16 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: list, start: 'top 82%', toggleActions: 'play none none reverse' }
        }
      )
    })

    /* Founder image clip reveal */
    document.querySelectorAll('.founder-img').forEach(img => {
      gsap.fromTo(img,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: img, start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      )
    })

    // Parallax effect on all slide images within the about carousel
    gsap.fromTo('.about-root .contact-slide-wrap img',
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-root .contact-parallax-carousel',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div className="about-root">

      {/* ══════════ HERO ══════════ */}
      <header className="about-hero">
        <div className="wrap">
          <p className="eyebrow abt-reveal">About Sogani Design</p>
          <h1 className="abt-reveal split-text-reveal">Art meets<br/>precision.</h1>
          <p className="about-hero__sub abt-reveal">
            A signature brand of contemporary light installations — where
            Indian artisanal craft meets cutting-edge design.
          </p>
        </div>
      </header>

      {/* ══════════ BRAND STORY ══════════ */}
      <section className="about-story">
        <div className="wrap">
          <div className="about-story__grid">
            <div className="about-story__label abt-reveal-x">
              <span className="eyebrow">The Brand</span>
              <span className="eyebrow">Est. 1992</span>
            </div>
            <div className="about-story__body">
              <div className="about-story__lead abt-reveal">
                SOGANI is a signature brand of contemporary light installations —
                quality craftsmanship and creative design solutions that add value
                and beauty to everyday life.
              </div>
              <div className="about-story__text abt-reveal">
                <p className="drop-cap">
                  Along with avant-garde aesthetics, the designs fuse innovative use
                  of material with state-of-the-art technology to create customized
                  lights that are bespoke and sculptural. The lights, bordering into
                  light installations, are an eclectic mix of contemporary Indian
                  artisanal skills and new technology.
                </p>
                <p>
                  Personalized and exclusive, we deliver customized lighting solutions
                  to suit the desired space and lifestyle. The studio's eclectic
                  repository of over a hundred designs continues to grow as it explores
                  broader avenues of concept light installations.
                </p>
                <p>
                  The studio also works on commissioned projects beyond lights to concept
                  Light Installations depicting thought-provoking art — <em>'Lights with
                  a new dimension'</em>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PARALLAX CAROUSEL ══════════ */}
      <section className="contact-parallax-carousel">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          speed={1500}
          className="contact-swiper"
        >
          <SwiperSlide>
            <div className="contact-slide-wrap">
              <img src="/assets/banner/banner-001.png" alt="Sogani Installation 1" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="contact-slide-wrap">
              <img src="/assets/banner/banner-002.png" alt="Sogani Installation 2" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="contact-slide-wrap">
              <img src="/assets/banner/banner-003.png" alt="Sogani Installation 3" />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* ══════════ FOUNDERS ══════════ */}
      <section className="about-founders">
        <div className="wrap">
          <div className="about-founders__head abt-reveal">
            <span className="eyebrow">The Founders</span>
            <h2 className="split-text-reveal">The Vision Behind<br/>the Light</h2>
          </div>

          {/* Vibhor Sogani */}
          <div className="founder-card">
            <div className="founder-img abt-reveal">
              <img src="/assets/about/about_viibhor.jpg" alt="Vibhor Sogani" />
            </div>
            <div className="founder-info">
              <h3 className="founder-name abt-reveal">Vibhor Sogani</h3>
              <span className="founder-role abt-reveal">Founder Director</span>
              <div className="founder-bio abt-reveal">
                <p className="drop-cap">
                  Born in Jaipur, Rajasthan, Vibhor Sogani specialized in Industrial
                  Design from the prestigious NID, Ahmedabad. Since 1992, he has engaged
                  in various commissioned installations, design projects, and conceptual
                  art assignments. Vibhor is considered one of the few Indian designers
                  to create a mark in the international lighting industry.
                </p>
                <p>
                  His works have been exhibited in various art and design shows in India
                  and overseas — Australia, Zimbabwe, Tanzania, South Africa, Singapore,
                  Germany and more. His exhibitions have often been supported by the
                  Indian Government and the Governments abroad.
                </p>
                <p>
                  One of his most prominent works is <strong>'Sprouts'</strong>, a 40 feet
                  high Public Art Installation in stainless steel located in the heart of
                  the capital city, New Delhi.
                </p>
                <p>
                  Recipient of many honours, Vibhor has been awarded 'Indian Art Icon
                  of the Year 2014' in Singapore. He has also served as a Government
                  nominated member of the India Design Council.
                </p>
                <p>
                  For a detailed profile, visit{' '}
                  <a href="https://www.vibhorsogani.com" target="_blank" rel="noopener noreferrer">
                    www.vibhorsogani.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Navdeep Sogani */}
          <div className="founder-card founder-card--reverse">
            <div className="founder-img abt-reveal">
              <img src="/assets/about/about_navdeep.png" alt="Navdeep Sogani" />
            </div>
            <div className="founder-info">
              <h3 className="founder-name abt-reveal">Navdeep Sogani</h3>
              <span className="founder-role abt-reveal">Founder Director</span>
              <div className="founder-bio abt-reveal">
                <p className="drop-cap">
                  With an extensive experience of over 20 years across the domains of
                  design, art and architecture, Navdeep Sogani spearheads the creative
                  enterprise of the signature brand 'SOGANI by Vibhor Sogani'.
                </p>
                <p>
                  While Vibhor's design authorship forms the heart of the brand, her
                  extensive understanding of the design and lighting industry brings
                  with it a sensibility that infuses life into this combined vision
                  of theirs.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════ AWARDS ══════════ */}
      <section className="about-awards">
        <div className="wrap">
          <div className="about-awards__head">
            <div className="abt-reveal">
            <span className="eyebrow">Recognition</span>
            <h2 className="split-text-reveal">Awards &<br/>Honours</h2>
          </div>
          </div>
          <ul className="award-list">
            {AWARDS.map((a, i) => (
              <li className="award-item" key={i}>
                <span className="award-year">{a.year}</span>
                <span className="award-title">{a.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ SPEAKING & EXHIBITIONS ══════════ */}
      <section className="about-events">
        <div className="wrap">
          <div className="abt-reveal" style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}>
            <span className="eyebrow">Global Presence</span>
            <h2 className="split-text-reveal" style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.12 }}>
              Events &<br/>Exhibitions
            </h2>
          </div>
          <div className="about-events__grid">
            <div className="events-col">
              <h3>Speaker Engagements</h3>
              <ul className="event-list">
                {SPEAKING.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="events-col">
              <h3>Exhibitions</h3>
              <ul className="event-list">
                {EXHIBITIONS.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
