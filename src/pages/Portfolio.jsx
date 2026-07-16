import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import useReveal from '../hooks/useReveal.js'
import { PORTFOLIO, CATEGORIES } from '../data/portfolio.js'
import gsap from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import '../styles/portfolio.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import useDocumentMetadata from '../hooks/useDocumentMetadata.js'

const CATEGORY_ICONS = {
  Pendant:      'fa-solid fa-lightbulb',
  Installation: 'fa-solid fa-plus',
  Wall:         'fa-solid fa-border-all',
  Floor:        'fa-solid fa-arrows-up-down',
  Table:        'fa-solid fa-table',
  All:          'fa-solid fa-shapes'
}

export default function Portfolio() {
  const { category } = useParams()
  const navigate    = useNavigate()
  const active      = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'All'

  useDocumentMetadata({
    title: active === 'All' 
      ? 'Bespoke Lighting Portfolio | SOGANI Studio' 
      : `${active} Portfolio | Bespoke Lighting by SOGANI`,
    description: active === 'All'
      ? 'Explore the curated gallery of award-winning light sculptures, bespoke chandeliers, and public art installations by SOGANI.'
      : `Browse SOGANI's award-winning ${active.toLowerCase()} lighting installations and bespoke design creations.`,
    keywords: `bespoke lighting portfolio, ${active.toLowerCase()} lights, luxury lighting art, custom chandeliers, Vibhor Sogani works`,
    canonicalUrl: active === 'All' 
      ? 'https://sogani.design/portfolio/' 
      : `https://sogani.design/portfolio/${active.toLowerCase()}/`
  });

  const [activeItem, setActiveItem] = useState(null)
  const overlayRef  = useRef(null)
  const swiperRef   = useRef(null)

  const items = useMemo(() => {
    if (active === 'All') return PORTFOLIO
    return PORTFOLIO.filter(p => p.category === active)
  }, [active])

  useReveal('.reveal', [active])

  // Open: set state → GSAP animates overlay UP from bottom
  const openProject = (item) => {
    setActiveItem(item)
  }

  // Every time activeItem changes to a real item, slide the overlay up
  useEffect(() => {
    if (!activeItem) return
    const el = overlayRef.current
    if (!el) return

    // Make sure overlay is visible first (remove any previous transform)
    gsap.set(el, { y: '100%', autoAlpha: 1 })

    gsap.to(el, {
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
      onStart: () => {
        // Lock body scroll
        document.body.style.overflow = 'hidden'
      }
    })

    // Stagger the sidebar text blocks in
    gsap.fromTo(
      '.sidebar-reveal',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power2.out', delay: 0.25 }
    )
  }, [activeItem])

  // Close: slide overlay back down → then clear state
  const closeProject = (e) => {
    if (e) e.stopPropagation()
    const el = overlayRef.current
    if (!el) return

    gsap.to(el, {
      y: '100%',
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        setActiveItem(null)
        document.body.style.overflow = ''
      }
    })
  }

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeProject() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Collect all images for the active item's swiper
  const allImages = activeItem
    ? [activeItem.image, ...(activeItem.images || [])].filter(Boolean)
    : []

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="A repository of over a hundred designs."
        sub="Accent lighting, ambient lighting, customized lighting, and sculptural lighting — click any piece to view its images."
      />

      <section className="section portfolio-list" style={{ paddingTop: '40px' }}>
        <div className="wrap">

          {/* Category filters */}
          <div className="portfolio-filter reveal">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={active === c ? 'is-active' : ''}
                onClick={() =>
                  navigate(c === 'All' ? '/portfolio' : `/portfolio/${c.toLowerCase()}`)
                }
              >
                {c}
              </button>
            ))}
            <span className="portfolio-filter__count">{items.length} works</span>
          </div>

          {/* Row-based list */}
          <div className="portfolio-list-wrapper">
            {items.map((p) => (
              <div
                key={p.slug}
                className="portfolio-row reveal"
                onClick={() => openProject(p)}
              >
                <div className="portfolio-row__text">
                  <div className="portfolio-row__icon-box">
                    <i className={CATEGORY_ICONS[p.category] || 'fa-solid fa-shapes'} />
                  </div>
                  <h3 className="portfolio-row__title">{p.name}</h3>
                  <span className="portfolio-row__sub">{p.tag || 'SOGANI STUDIO'}</span>
                </div>

                <div className="portfolio-row__image-box">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <div className="portfolio-row__hover-cue">
                    <span>View</span> <i className="fa-solid fa-arrow-right" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── OVERLAY ─────────────────────────────────────────────────────────── */}
      {/*
        The overlay is ALWAYS mounted (even when activeItem is null) so that
        overlayRef.current is always available for GSAP. We start it translated
        offscreen via initial inline style and hide pointer events when inactive.
      */}
      <div
        ref={overlayRef}
        className="portfolio-overlay"
        style={{ transform: 'translateY(100%)', visibility: activeItem ? 'visible' : 'hidden' }}
        aria-hidden={!activeItem}
      >
        {/* Close button */}
        <button className="portfolio-overlay__close" onClick={closeProject}>
          <i className="fa-solid fa-xmark" /> Close
        </button>

        {/* ── LEFT: sidebar info ── */}
        <div className="portfolio-overlay__sidebar">
          {activeItem && (
            <>
              <div className="portfolio-overlay__sidebar-top">
                <div className="overlay-icon-box sidebar-reveal">
                  <i className={CATEGORY_ICONS[activeItem.category] || 'fa-solid fa-shapes'} />
                </div>

                <h2 className="overlay-title sidebar-reveal">{activeItem.name}</h2>
                <span className="overlay-location sidebar-reveal">
                  {activeItem.tag || 'SOGANI Bespoke, India'}
                </span>

                <p className="overlay-blurb sidebar-reveal">{activeItem.blurb}</p>

                <div className="overlay-meta sidebar-reveal">
                  <div className="overlay-meta__item">
                    <span>YEAR</span>
                    <strong>{activeItem.year || '2026'}</strong>
                  </div>
                  <div className="overlay-meta__item">
                    <span>CLIENT</span>
                    <strong>{activeItem.client || 'SOGANI Studio'}</strong>
                  </div>
                  <div className="overlay-meta__item">
                    <span>TYPOLOGY</span>
                    <strong>{activeItem.category.toUpperCase()}</strong>
                  </div>
                  <div className="overlay-meta__item">
                    <span>STATUS</span>
                    <strong>{activeItem.status || 'COMPLETED'}</strong>
                  </div>
                </div>
              </div>

              <div className="portfolio-overlay__sidebar-bottom sidebar-reveal">
                <Link to="/contact" className="btn btn-overlay">
                  Enquire <i className="fa-solid fa-arrow-right" />
                </Link>
                <div className="overlay-share-links">
                  <a href="#email"   aria-label="Share via Email"><i className="fa-solid fa-envelope" /></a>
                  <a href="#linkedin" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
                  <a href="#twitter" aria-label="Twitter"><i className="fa-brands fa-x-twitter" /></a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── RIGHT: Swiper image gallery ── */}
        <div className="portfolio-overlay__slider-container">
          {activeItem && allImages.length > 0 && (
            <Swiper
              key={activeItem.slug}   /* re-mount swiper when product changes */
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={24}
              slidesPerView={1.15}
              centeredSlides={false}
              grabCursor
              className="overlay-swiper"
            >
              {allImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img src={img} alt={`${activeItem.name} — view ${idx + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

      </div>
    </>
  )
}
