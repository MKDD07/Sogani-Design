import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/pagehero.css'

gsap.registerPlugin(ScrollTrigger)

export default function PageHero({ eyebrow, title, sub, crumb }){
  const heroRef = useRef(null)

  useEffect(() => {
    const element = heroRef.current
    if (!element) return

    const mediaQuery = window.matchMedia('(max-width: 768px)')
    let ctx

    const initScrollTrigger = () => {
      if (ctx) ctx.revert()

      if (mediaQuery.matches) {
        ctx = gsap.context(() => {
          const inner = element.querySelector('.wrap')
          if (inner) {
            gsap.to(inner, {
              scale: 0.82,
              y: -40,
              opacity: 0.25,
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top top+=110', // start shrinking as it scrolls up
                end: 'bottom top',
                scrub: 0.5,
              }
            })
          }
        }, element)
      }
    }

    initScrollTrigger()
    mediaQuery.addEventListener('change', initScrollTrigger)

    return () => {
      if (ctx) ctx.revert()
      mediaQuery.removeEventListener('change', initScrollTrigger)
    }
  }, [])

  return (
    <header ref={heroRef} className="page-hero">
      <div className="wrap">
        {crumb && <p className="page-hero__crumb">{crumb}</p>}
        <p className="eyebrow reveal">{eyebrow}</p>
        <h1 className="page-hero__title gsap-text-reveal">{title}</h1>
        {sub && <p className="page-hero__sub reveal">{sub}</p>}
      </div>
    </header>
  )
}
