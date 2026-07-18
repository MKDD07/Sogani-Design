import React, { useEffect, useRef, useState } from 'react'
import { Link }            from 'react-router-dom'
import gsap               from 'gsap'
import { ScrollTrigger }  from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import '../styles/home.css'
import useDocumentMetadata from '../hooks/useDocumentMetadata.js'

gsap.registerPlugin(ScrollTrigger)

const HERO_SLIDES = [
  '/assets/banner/banner-001.png',
  '/assets/banner/banner-002.png',
  '/assets/banner/banner-003.png',
  '/assets/banner/banner-004.png',
  '/assets/banner/banner-005.png',
]

const S3_CAROUSEL = [
  '/assets/Products/Artisanal Lighting/Drape-featured.jpg',
  '/assets/Products/Artisanal Lighting/glo-hero.jpg',
  '/assets/Products/chandelier, stainless steel/flux-01.jpg',
  '/assets/Products/Sculptural Lighting/zenith-01.jpg',
  '/assets/Products/Living Room/goldendew-01.jpg',
  '/assets/Products/Artisanal Lighting, sculptural/halo-01.jpg',
]

/* ── curated data ─────────────────────────────── */
const WORKS = [
  { slug:'drape',   name:'Drape',   cat:'Installation', img:'/assets/Products/Artisanal Lighting/Drape-featured.jpg' },
  { slug:'zenith',  name:'Zenith',  cat:'Installation', img:'/assets/Products/Sculptural Lighting/zenith-01.jpg' },
  { slug:'chroma',  name:'Chroma',  cat:'Pendant',      img:'/assets/Products/Steel, Interior/chroma-01.jpg' },
  { slug:'flock',   name:'Flock',   cat:'Installation', img:'/assets/Products/Sculptural Lighting, exterior, steel/flock-01.jpg' },
  { slug:'crystal', name:'Crystal', cat:'Wall',         img:'/assets/Products/Sculptural Lighting/crystal-hero.jpg' },
  { slug:'umbra',   name:'Umbra',   cat:'Wall',         img:'/assets/Products/Wall Lights/umbra-01.jpg' },
]

const HSCROLL_IMGS = [
  { img:'/assets/Products/Artisanal Lighting/glo-hero.jpg',             label:'Glo' },
  { img:'/assets/Products/Living Room/goldendew-01.jpg',                label:'Golden Dew' },
  { img:'/assets/Products/chandelier, stainless steel/flux-01.jpg',     label:'Flux' },
  { img:'/assets/Products/Sculptural Lighting, exterior/fiori-01-1.jpg',label:'Fiori' },
  { img:'/assets/Products/Steel, Interior/beehive-01.jpg',              label:'Beehive' },
]

const STATS = [
  { n:'100+', label:'Unique designs' },
  { n:'30+',  label:'Years of craft' },
  { n:'12+',  label:'Countries' },
  { n:'15+',  label:'Design awards' },
]

const PROCESS = [
  { num:'01', title:'Brief',   body:'We begin with a conversation — understanding the space, material palette, and the mood of light required.' },
  { num:'02', title:'Design',  body:'Concept sketches evolve into detailed material studies. Each form is resolved by hand in our Gurgaon studio.' },
  { num:'03', title:'Craft',   body:'Artisans bring the design to life: metal-beating, weaving, patination and precision LED integration.' },
  { num:'04', title:'Install', body:'Our team installs and commissions each piece with full after-care, wherever in the world the project sits.' },
]

/* ──────────────────────────────────────────────── */

export default function Home() {
  useDocumentMetadata({
    title: 'SOGANI | Bespoke Light Installations & Sculptural Art',
    description: 'SOGANI is an award-winning design studio specializing in bespoke light installations, custom modern chandeliers, and architectural metal sculptures by Vibhor Sogani.',
    keywords: 'bespoke lighting, light installations, Vibhor Sogani, luxury chandeliers, art installations, modern light sculpture, Indian design studio, steel light sculpture',
    canonicalUrl: 'https://sogani.design/'
  });

  const [isInitiallyLoading, setIsInitiallyLoading] = useState(!window.__soganiLoaded)
  const heroRef    = useRef(null)
  const hScrollRef = useRef(null)
  const s3Ref      = useRef(null)

  useEffect(() => {
    if (window.__soganiLoaded) {
      setIsInitiallyLoading(false)
      return
    }

    const checkInterval = setInterval(() => {
      if (window.__soganiLoaded) {
        setIsInitiallyLoading(false)
        clearInterval(checkInterval)
      }
    }, 50)

    return () => clearInterval(checkInterval)
  }, [])

  /* ─── MAIN ANIMATIONS ─── */
  useEffect(() => {
    if (isInitiallyLoading) return

    gsap.set('.reveal-y',   { opacity: 0, y: 48 })
    gsap.set('.reveal-x',   { opacity: 0, x: -36 })
    gsap.set('.reveal-fade', { opacity: 0 })

    /* §1 Hero entrance */
    const heroTL = gsap.timeline({ delay: 0.15, defaults: { ease:'power4.out' }})
    heroTL
      .to('.h1-line span', { yPercent:0, opacity:1, duration:1.1, stagger:0.1 })
      .to('.h1-sub',       { opacity:1, y:0, duration:0.8 }, '-=0.5')
      .to('.h1-cta',       { opacity:1, y:0, duration:0.7 }, '-=0.4')
      .to('.h1-ticker',    { opacity:1, duration:0.6 }, '-=0.3')

    /* §2 Horizontal scroll panel */
    const hWrap = hScrollRef.current
    if (hWrap) {
      const track = hWrap.querySelector('.hs2-track')
      const totalW = track.scrollWidth - hWrap.offsetWidth

      gsap.to(track, {
        x: -totalW,
        ease: 'none',
        scrollTrigger: {
          trigger: hWrap,
          start: 'top top',
          end: () => `+=${totalW + 600}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        }
      })
    }

    /* §3 The Maker — editorial reveal */
    const s3 = s3Ref.current
    if (s3) {
      const s3carousel = s3.querySelector('.s3-carousel-wrap')
      const s3heading = s3.querySelector('.s3-heading')
      const s3accent = s3.querySelector('.s3-accent-line')
      const s3bio = s3.querySelector('.s3-bio')
      const s3link = s3.querySelector('.s3-link')
      const s3eyebrow = s3.querySelector('.eyebrow')

      gsap.fromTo(s3carousel,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: s3, start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo(s3eyebrow,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: s3, start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      )


      gsap.fromTo(s3accent,
        { width: 0 },
        { width: 60, duration: 0.8, ease: 'power2.inOut',
          scrollTrigger: { trigger: s3, start: 'top 60%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo(s3bio,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: s3, start: 'top 55%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo(s3link,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: s3, start: 'top 50%', toggleActions: 'play none none reverse' }
        }
      )
    }

    /* Banner parallax */
    document.querySelectorAll('.banner-bg img').forEach(img => {
      gsap.to(img, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.banner-section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })
    })

    /* Generic reveals */
    document.querySelectorAll('.reveal-y').forEach(el => {
      gsap.to(el, { opacity:1, y:0, duration:0.85, ease:'power3.out',
        scrollTrigger: { trigger:el, start:'top 88%', toggleActions:'play none none reverse' }
      })
    })
    document.querySelectorAll('.reveal-x').forEach(el => {
      gsap.to(el, { opacity:1, x:0, duration:0.8, ease:'power3.out',
        scrollTrigger: { trigger:el, start:'top 88%', toggleActions:'play none none reverse' }
      })
    })
    document.querySelectorAll('.reveal-fade').forEach(el => {
      gsap.to(el, { opacity:1, duration:1, ease:'power2.out',
        scrollTrigger: { trigger:el, start:'top 86%', toggleActions:'play none none reverse' }
      })
    })

    /* Counter animation */
    document.querySelectorAll('.stat-num').forEach(el => {
      const final = parseFloat(el.dataset.val)
      const countObj = { val: 0 }
      gsap.to(countObj, {
        val: final,
        duration: 1.6,
        ease: 'power2.out',
        snap: { val: 1 },
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        onUpdate: function() {
          el.textContent = Math.round(countObj.val) + '+'
        }
      })
    })

    /* CTA line draw */
    gsap.fromTo('.cta-line',
      { width:'0%' },
      { width:'100%', duration:1.2, ease:'power3.inOut',
        scrollTrigger: { trigger:'.cta-line', start:'top 80%' }
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [isInitiallyLoading])

  return (
    <div className="home-root">

      {/* ══════════ §1 HERO WITH CAROUSEL ══════════ */}
      <section className="s1-hero" ref={heroRef}>
        {/* Background carousel */}
        <div className="s1-bg-carousel">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            speed={1500}
            className="s1-bg-swiper"
          >
            {HERO_SLIDES.map((src, i) => (
              <SwiperSlide key={i}>
                <img src={src} alt={`Hero ${i + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="s1-bg-overlay" />
        </div>

        <div className="s1-inner">
          <p className="s1-eyebrow">Sogani Studio — New Delhi</p>
          <h1 className="s1-h1">
            {['Bespoke', 'light,', 'by hand.'].map((w,i) => (
              <span className="h1-line" key={i}>
                <span style={{ display:'inline-block', transform:'translateY(110%)', opacity:0 }}>{w}</span>
              </span>
            ))}
          </h1>
          <p className="s1-sub h1-sub">
            Sculptural light installations — fusing Indian artisanal craft
            with precision optical engineering.
          </p>
          <div className="s1-cta h1-cta">
            <Link to="/portfolio" className="btn btn-hero">View Portfolio <i className="fa-solid fa-arrow-right"/></Link>
            <Link to="/contact" className="btn btn-hero-ghost">Commission a Piece</Link>
          </div>
        </div>
        <span className="s1-num h1-ticker"></span>
        <div className="s1-scroll">
          <span className="s1-scroll__bar"/>
          <span>Scroll</span>
        </div>
      </section>

      {/* ══════════ FOUNDER INTRO ══════════ */}
      <section className="s-founder">
        <div className="wrap">
          <div className="founder-intro-grid">
            <div className="founder-intro-left">
              <span className="eyebrow reveal-y">The Visionary</span>
              <h2 className="founder-intro-name split-text-reveal">Vibhor<br/>Sogani</h2>
              <span className="founder-intro-role reveal-y">Founder Director</span>
            </div>
            <div className="founder-intro-right">
              <p className="founder-intro-quote reveal-y">
                "Light is material — it has weight, texture, and the capacity
                to transform a room into an experience."
              </p>
              <p className="founder-intro-bio reveal-y">
                Born in Jaipur, Rajasthan, specialized in Industrial Design from
                the prestigious NID, Ahmedabad. Since 1992, Vibhor has engaged in
                commissioned installations across 12+ countries — considered one of
                the few Indian designers to create a mark in the international
                lighting industry.
              </p>
              <div className="founder-intro-stats reveal-y">
                <div className="founder-stat">
                  <span className="founder-stat__num">30+</span>
                  <span className="founder-stat__label">Years</span>
                </div>
                <div className="founder-stat">
                  <span className="founder-stat__num">100+</span>
                  <span className="founder-stat__label">Designs</span>
                </div>
                <div className="founder-stat">
                  <span className="founder-stat__num">15+</span>
                  <span className="founder-stat__label">Awards</span>
                </div>
              </div>
              <Link to="/about" className="btn btn-ghost reveal-y" style={{marginTop:'12px'}}>
                Full Story <i className="fa-solid fa-arrow-right"/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ §2 HORIZONTAL GALLERY ══════════ */}
      <section className="s2-hscroll" ref={hScrollRef}>
        <div className="hs2-track">
          <div className="hs2-intro">
            <p className="eyebrow" style={{color:'var(--accent)'}}></p>
            <h2 className="split-text-reveal">Selected<br/>Works</h2>
            <p>Scroll to explore →</p>
          </div>
          {HSCROLL_IMGS.map((item, i) => (
            <div className="hs2-card" key={i}>
              <div className="hs2-card__img">
                <img src={item.img} alt={item.label} />
              </div>
              <div className="hs2-card__label">
                <span>{String(i+1).padStart(2,'0')}</span>
                <strong>{item.label}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ §3 THE MAKER ══════════ */}
      <section className="s3-maker" ref={s3Ref}>
        <div className="wrap s3-inner">
          <div className="s3-col-img">
            <div className="s3-carousel-wrap">
              <img
                src="https://www.darcmagazine.com/wp-content/uploads/2018/09/sogani.jpg"
                alt="Vibhor Sogani"
              />
            </div>
            <span className="s3-img-caption">In the studio, New Delhi</span>
          </div>
          <div className="s3-col-text">
            <span className="eyebrow">The Maker</span>
            <h2 className="s3-heading split-text-reveal">The Art of<br/>Light & Form</h2>
            <div className="s3-accent-line" />
            <p className="s3-bio">
              With over three decades of artistic practice, Vibhor Sogani transforms
              raw materials — stainless steel, copper, crystal — into luminous
              sculptures that redefine architectural spaces. Each piece is a dialogue
              between Indian handcraft tradition and contemporary design thinking.
            </p>
            <Link to="/about" className="s3-link">
              <span>Read the full story</span>
              <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ BANNER 1 ══════════ */}
      <section className="banner-section reveal-fade">
        <div className="banner-bg">
          <img src="/assets/banner/banner-002.png" alt="Artisanal lighting" />
        </div>
        <div className="banner-content">
          <span className="eyebrow">Artisanal Excellence</span>
          <h2 className="split-text-reveal">Where Craft<br/>Meets Light</h2>
          <p>
            Every piece begins as raw material — hand-beaten, woven, and
            patinated by master artisans in our New Delhi atelier.
          </p>
          <Link to="/about" className="btn">Discover the Studio <i className="fa-solid fa-arrow-right"/></Link>
        </div>
      </section>

      {/* ══════════ §4 STUDIO / MANIFESTO ══════════ */}
      <section className="s4-studio">
        <div className="wrap">
          <div className="s4-inner">
            <div className="s4-label reveal-x">
              <span className="eyebrow"></span>
              <span className="eyebrow">The Studio</span>
            </div>
            <div className="s4-body">
              <blockquote className="s4-quote split-text-reveal">
                "Light is material — it has weight,<br/>
                texture, and the capacity to transform<br/>
                a room into an experience."
              </blockquote>
              <div className="s4-text reveal-y">
                <p>
                  At brand SOGANI, quality craftsmanship and creative design solutions
                  that add value and beauty to everyday life are quintessential.
                </p>
                <p>
                  The designs fuse innovative material with state-of-the-art technology
                  to create lights that are bespoke and sculptural — bordering into
                  full light installations.
                </p>
                <Link to="/about" className="btn btn-ghost" style={{marginTop:'28px'}}>
                  The Full Story <i className="fa-solid fa-arrow-right"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ §5 WORKS GRID ══════════ */}
      <section className="s5-works">
        <div className="wrap">
          <div className="s5-head reveal-y">
            <span className="eyebrow">Portfolio</span>
            <Link to="/portfolio" className="s5-all">
              All Works <i className="fa-solid fa-arrow-right"/>
            </Link>
          </div>
          <div className="s5-grid">
            {WORKS.map((p, i) => (
              <Link to="/portfolio" className="s5-item reveal-y" key={p.slug} style={{ '--i': i }}>
                <div className="s5-item__img">
                  <img src={p.img} alt={p.name}/>
                  <div className="s5-item__overlay">
                    <span>{p.cat}</span>
                    <i className="fa-solid fa-arrow-up-right"/>
                  </div>
                </div>
                <div className="s5-item__meta">
                  <strong>{p.name}</strong>
                  <span>{String(i+1).padStart(2,'0')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BANNER 2 ══════════ */}
      <section className="banner-section reveal-fade">
        <div className="banner-bg">
          <img src="/assets/Products/chandelier, stainless steel/flux-01.jpg" alt="Chandelier installation" />
        </div>
        <div className="banner-content">
          <span className="eyebrow">Global Installations</span>
          <h2 className="split-text-reveal">Light Without<br/>Borders</h2>
          <p>
            From Mumbai penthouses to London hotels — our installations
            illuminate spaces across 12+ countries worldwide.
          </p>
          <Link to="/portfolio" className="btn">Explore Portfolio <i className="fa-solid fa-arrow-right"/></Link>
        </div>
      </section>

      {/* ══════════ §6 STATS ══════════ */}
      <section className="s6-stats">
        <div className="wrap">
          <p className="eyebrow reveal-y" style={{marginBottom:'48px'}}>By the numbers</p>
          <div className="s6-grid">
            {STATS.map((s,i) => (
              <div className="s6-item" key={i}>
                <div className="s6-item__num reveal-fade">
                  <span className="stat-num" data-val={parseInt(s.n)}>0+</span>
                </div>
                <p className="s6-item__label reveal-y">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ §7 PROCESS ══════════ */}
      <section className="s7-process">
        <div className="wrap">
          <div className="s7-head reveal-y">
            <span className="eyebrow">How we work</span>
            <h2 className="split-text-reveal">A commission,<br/>from brief to beam.</h2>
          </div>
          <div className="s7-steps">
            {PROCESS.map((step, i) => (
              <div className="s7-step reveal-y" key={i} style={{'--i':i}}>
                <div className="s7-step__num">{step.num}</div>
                <div className="s7-step__line"/>
                <h3 className="s7-step__title">{step.title}</h3>
                <p className="s7-step__body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ NEWSLETTER ══════════ */}
      <section className="s-newsletter">
        <div className="wrap">
          <div className="newsletter-inner">
            <div className="newsletter-left reveal-y">
              <span className="eyebrow">Stay Illuminated</span>
              <h2 className="split-text-reveal">Join Our<br/>Inner Circle</h2>
              <p>
                Be the first to discover new collections, studio stories,
                and exclusive invitations to private viewings.
              </p>
            </div>
            <div className="newsletter-form reveal-y">
              <div className="input-row">
                <input type="text" placeholder="Your name" id="newsletter-name" />
              </div>
              <div className="input-row">
                <input type="email" placeholder="Email address" id="newsletter-email" />
              </div>
              <button className="btn" type="button">
                Subscribe <i className="fa-solid fa-arrow-right"/>
              </button>
              <p className="newsletter-note">
                No spam, ever. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT / CTA ══════════ */}
      <section className="s-contact">
        <div className="wrap">
          <p className="eyebrow reveal-y" style={{ marginBottom: '32px' }}>Inquiries</p>
          <div className="cta-line reveal-fade" />
          
          <div className="s-contact__grid">
            {/* Left: Editorial Column */}
            <div className="s-contact__editorial reveal-y">
              <h2 className="contact-title split-text-reveal">
                Have a space in<br />mind for light?
              </h2>
              <p className="contact-subtitle">
                We design and engineer residential, hospitality, and public art commissions worldwide. Every signature installation begins with a conversation.
              </p>
              <div className="contact-actions">
                <Link to="/contact" className="btn btn-luxury-gold">
                  Begin a Commission <i className="fa-solid fa-arrow-right" />
                </Link>
                <Link to="/portfolio" className="btn btn-luxury-ghost">
                  Explore Designs
                </Link>
              </div>
            </div>

            {/* Right: Premium Information Rows */}
            <div className="s-contact__details reveal-y">
              <div className="s-contact__row">
                <span className="s-contact__row-num">01</span>
                <div className="s-contact__row-content">
                  <h4>Head Office</h4>
                  <p>Villa #100, Tatvam Villas, Sector 48, Sohna Road, Gurgaon-122018, Haryana, India</p>
                </div>
              </div>

              <div className="s-contact__row">
                <span className="s-contact__row-num">02</span>
                <div className="s-contact__row-content">
                  <h4>Design Studio</h4>
                  <p>By appointment only — Gurgaon studio, India</p>
                </div>
              </div>

              <div className="s-contact__row">
                <span className="s-contact__row-num">03</span>
                <div className="s-contact__row-content">
                  <h4>Direct Voice</h4>
                  <p><a href="tel:+919810950888" className="s-contact__link">+91-9810950888</a></p>
                </div>
              </div>

              <div className="s-contact__row">
                <span className="s-contact__row-num">04</span>
                <div className="s-contact__row-content">
                  <h4>Electronic Mail</h4>
                  <p>
                    General: <a href="mailto:info@sogani.design" className="s-contact__link">info@sogani.design</a><br />
                    Media: <a href="mailto:media@sogani.design" className="s-contact__link">media@sogani.design</a>
                  </p>
                </div>
              </div>

              <div className="s-contact__row">
                <span className="s-contact__row-num">05</span>
                <div className="s-contact__row-content">
                  <h4>Follow Studio</h4>
                  <div className="s-contact__socials">
                    <a href="https://twitter.com/DesignSogani" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X"><i className="fa-brands fa-x-twitter" /></a>
                    <a href="https://www.facebook.com/StudioVibhorSogani/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
                    <a href="https://www.instagram.com/studiovibhorsogani/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
                    <a href="https://in.linkedin.com/company/soganibyvibhor" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-credits reveal-fade" style={{ marginTop: '100px' }}>
            <span>© {new Date().getFullYear()} SOGANI Design Studio.</span>
            <span>Villa #100, Tatvam Villas, Gurgaon, India</span>
            <span>info@sogani.design</span>
          </div>
        </div>
      </section>
    </div>
  )
}
