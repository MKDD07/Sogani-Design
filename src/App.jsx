import React, { useEffect, useState, useRef } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Home from './pages/Home.jsx'
import Portfolio from './pages/Portfolio.jsx'
import PortfolioDetail from './pages/PortfolioDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Policy from './pages/Policy.jsx'
import Media from './pages/Media.jsx'
import News from './pages/News.jsx'
import './styles/global.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const { pathname } = useLocation()
  const [isSticky, setIsSticky] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)
  const [loading, setLoading] = useState(!window.__soganiLoaded)

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Global preloader timeline - runs once per site entry
  useEffect(() => {
    if (window.__soganiLoaded) {
      setLoading(false)
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        window.__soganiLoaded = true
        setLoading(false)
      }
    })

    tl.to('.loader-logo', { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.2)
      .to('.loader-bar-track', { opacity: 1, duration: 0.3 }, 0.4)
      .to('.loader-text', { opacity: 1, duration: 0.3 }, 0.5)
      .to('.loader-bar-fill', { width: '100%', duration: 1.8, ease: 'power2.inOut' }, 0.6)
      .to('.loader-screen', {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        delay: 0.2,
      })

    return () => tl.kill()
  }, [])

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenis.on('scroll', ScrollTrigger.update)
    window.lenis = lenis

    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // Sticky & Hide-on-scroll logic
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Sticky threshold
      if (currentScrollY > 80) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.lenis = null
      lenis.destroy()
      window.removeEventListener('scroll', handleScroll)
      gsap.ticker.remove(updateTicker)
    }
  }, [])

  const isTransparentHeaderPage = pathname === '/' || pathname === '/contact'
  const headerClass = `app-header ${isSticky ? 'header--sticky' : ''} ${isHidden ? 'header--hidden' : ''} ${!isTransparentHeaderPage ? 'header--always-light' : ''}`

  return (
    <>
      {/* Global Preloader - runs once per site visit */}
      {loading && (
        <div className="loader-screen">
          <img
            src="/assets/logo/logo-original.png"
            alt="SOGANI"
            className="loader-logo"
          />
          <div className="loader-bar-track">
            <div className="loader-bar-fill" />
          </div>
          <span className="loader-text">Loading Experience</span>
        </div>
      )}



      <header className={headerClass}>
        <div className="wrap app-header__inner">
          <Link to="/" className="logo">
            <img src="/assets/logo/logo-white.png" alt="SOGANI" className="logo-img logo-white" />
            <img src="/assets/logo/logo-original.png" alt="SOGANI" className="logo-img logo-dark" />
          </Link>
          <nav className="nav">
            <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>About</Link>
            <Link to="/portfolio" className={`nav-link ${pathname.startsWith('/portfolio') || pathname.startsWith('/work') ? 'active' : ''}`}>Portfolio</Link>
            <Link to="/news" className={`nav-link ${pathname === '/news' ? 'active' : ''}`}>News</Link>
            <Link to="/media" className={`nav-link ${pathname === '/media' ? 'active' : ''}`}>Media</Link>
            <Link to="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
          </nav>
        </div>
      </header>

      <main style={{ minHeight: '80vh', paddingTop: isTransparentHeaderPage ? '0' : '110px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:category" element={<Portfolio />} />
          <Route path="/work/:slug" element={<PortfolioDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/media" element={<Media />} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="wrap app-footer__inner">
          <div className="app-footer__logo">
            <Link to="/" className="logo">
              <img src="/assets/logo/logo-original.png" alt="SOGANI" className="logo-img" />
            </Link>
            <p>Bespoke light installations combining Indian artisanal craftsmanship with state-of-the-art optical engineering.</p>
          </div>
          <div className="app-footer__links">
            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/about">About Studio</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/policy">Studio Policies</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Categories</h4>
              <ul>
                <li><Link to="/portfolio/pendant">Pendants</Link></li>
                <li><Link to="/portfolio/installation">Installations</Link></li>
                <li><Link to="/portfolio/wall">Wall lights</Link></li>
                <li><Link to="/portfolio/floor">Floor lamps</Link></li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <span>© {new Date().getFullYear()} SOGANI Design Studio. All rights reserved.</span>
            <span>Handcrafted in India</span>
          </div>
        </div>
      </footer>
    </>
  )
}
