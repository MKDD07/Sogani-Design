import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import useReveal from '../hooks/useReveal.js'
import Swatch from '../components/Swatch.jsx'
import { PORTFOLIO } from '../data/portfolio.js'
import '../styles/home.css'

const FEATURED = PORTFOLIO.filter(p=>['casa','drape','umbra','chroma','zenith','crystal'].includes(p.slug))

export default function Home(){
  const heroRef = useRef(null)
  useReveal('.reveal')

  useEffect(()=>{
    const tl = gsap.timeline({defaults:{ease:'power4.out'}})
    tl.fromTo('.hero__eyebrow', {opacity:0, y:16}, {opacity:1, y:0, duration:.7})
      .fromTo('.hero__title span', {yPercent:110}, {yPercent:0, duration:1, stagger:0.08}, '-=.3')
      .fromTo('.hero__sub', {opacity:0, y:16}, {opacity:1, y:0, duration:.7}, '-=.5')
      .fromTo('.hero__cta', {opacity:0, y:16}, {opacity:1, y:0, duration:.6}, '-=.5')
      .fromTo('.hero__frame', {opacity:0, scale:1.06}, {opacity:1, scale:1, duration:1.3}, '-=1')

    gsap.to('.hero__ring', {rotate:360, duration:40, repeat:-1, ease:'none'})
  },[])

  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="hero__ring" aria-hidden="true"></div>
        <div className="wrap hero__inner">
          <p className="hero__eyebrow eyebrow">Sogani by Vibhor Sogani</p>
          <h1 className="hero__title">
            <span className="line"><span>Light,</span></span>
            <span className="line"><span>sculpted&nbsp;by&nbsp;hand.</span></span>
          </h1>
          <p className="hero__sub">
            Bespoke, sculptural light installations — an eclectic fusion of contemporary
            Indian artisanal craft and precise new technology.
          </p>
          <div className="hero__cta">
            <Link to="/portfolio" className="btn">View Portfolio <i className="fa-solid fa-arrow-right"></i></Link>
            <Link to="/contact" className="btn btn-ghost">Start a Commission</Link>
          </div>
        </div>
        <div className="hero__frame">
          <Swatch label="Signature Installation — Sprouts, New Delhi" index={0} ratio="21/9" icon="fa-light fa-tower-observation" />
        </div>
        <div className="hero__scroll"><span></span> Scroll</div>
      </section>

      <section className="section intro">
        <div className="wrap intro__grid">
          <p className="eyebrow reveal">The Studio</p>
          <h2 className="reveal">
            Over a hundred designs, one continuing repository of light —
            personalized, exclusive, and built to suit the space it lives in.
          </h2>
          <div className="intro__body reveal">
            <p>
              At brand SOGANI, quality craftsmanship and creative design solutions
              that add value and beauty to everyday life are quintessential. The designs
              fuse innovative material with state-of-the-art technology to create lights
              that are bespoke and sculptural — bordering into full light installations.
            </p>
            <Link to="/about" className="btn btn-ghost">The Full Story <i className="fa-solid fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      <section className="section featured">
        <div className="wrap">
          <div className="section-head reveal">
            <h2>Selected Works</h2>
            <p>A rotating view of the studio's repository — from intimate interior
              pendants to landmark public installations.</p>
          </div>
          <div className="featured__grid">
            {FEATURED.map((p,i)=>(
              <Link to={`/work/${p.slug}`} className="featured__item reveal" key={p.slug}>
                <Swatch label={p.name} index={i} ratio={i%3===1 ? '3/4':'4/3'} />
                <div className="featured__meta">
                  <span>{p.category}</span>
                  <i className="fa-solid fa-arrow-up-right"></i>
                </div>
              </Link>
            ))}
          </div>
          <div className="featured__foot reveal">
            <Link to="/portfolio" className="btn">See Full Portfolio <i className="fa-solid fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      <section className="section stats">
        <div className="wrap stats__grid">
          {[
            {n:'100+', l:'Designs in the studio repository'},
            {n:'30+', l:'Years of commissioned installation work'},
            {n:'12+', l:'Countries exhibited across'},
            {n:'15+', l:'Design awards & honours'},
          ].map((s,i)=>(
            <div className="stats__item reveal" key={i}>
              <h3>{s.n}</h3>
              <p>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section cta-strip">
        <div className="wrap cta-strip__inner reveal">
          <h2>Have a space in mind for light?</h2>
          <Link to="/contact" className="btn">Get in Touch <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
      </section>
    </>
  )
}
