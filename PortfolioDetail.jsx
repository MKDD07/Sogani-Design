import React, { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Swatch from '../components/Swatch.jsx'
import useReveal from '../hooks/useReveal.js'
import { PORTFOLIO, getBySlug } from '../data/portfolio.js'
import '../styles/portfolio-detail.css'

export default function PortfolioDetail(){
  const { slug } = useParams()
  const item = getBySlug(slug)
  useReveal('.reveal', [slug])

  useEffect(()=>{ window.scrollTo(0,0) }, [slug])

  if(!item) return <Navigate to="/portfolio" replace />

  const idx = PORTFOLIO.findIndex(p=>p.slug===slug)
  const related = PORTFOLIO.filter(p=>p.category===item.category && p.slug!==slug).slice(0,3)

  return (
    <article className="work">
      <header className="work__hero">
        <div className="wrap">
          <p className="page-hero__crumb reveal">
            <Link to="/portfolio">Portfolio</Link> / {item.category} / {item.name}
          </p>
          <div className="work__title-row reveal">
            <h1>{item.name}</h1>
            {item.tag && <span className="tag work__award">{item.tag}</span>}
          </div>
        </div>
      </header>

      <div className="wrap work__media reveal">
        <Swatch label={`${item.name} — hero view`} index={idx} ratio="16/8" icon="fa-light fa-lightbulb" />
      </div>

      <section className="section work__body">
        <div className="wrap grid-2">
          <div className="reveal">
            <p className="eyebrow">The Design</p>
            <h2 className="work__lede">{item.blurb}</h2>
          </div>
          <div className="reveal work__specs">
            <p>
              Every SOGANI piece is developed as a customized commission — dimensions,
              finish, and light temperature are tuned to the room, facade, or landscape
              it will inhabit. Material studies and hand-finishing are carried out in the
              studio's Gurgaon workshop.
            </p>
            <dl>
              <div><dt>Category</dt><dd>{item.category}</dd></div>
              <div><dt>Studio</dt><dd>Sogani by Vibhor Sogani</dd></div>
              <div><dt>Application</dt><dd>Bespoke commission</dd></div>
              {item.tag && <div><dt>Recognition</dt><dd>{item.tag}</dd></div>}
            </dl>
            <Link to="/contact" className="btn">Enquire About This Piece <i className="fa-solid fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      <div className="wrap work__gallery">
        {[0,1].map(i=>(
          <Swatch key={i} label={`${item.name} — detail ${i+1}`} index={idx+i+1} ratio="4/3" className="reveal" />
        ))}
      </div>

      <section className="section related">
        <div className="wrap">
          <div className="section-head reveal">
            <h2>More in {item.category}</h2>
            <p>Continue exploring the studio's repository.</p>
          </div>
          <div className="related__grid">
            {related.map((p,i)=>(
              <Link to={`/work/${p.slug}`} key={p.slug} className="portfolio-card reveal">
                <Swatch label={p.name} index={i+1} ratio="4/5" />
                <div className="portfolio-card__meta">
                  <div><h3>{p.name}</h3><span>{p.category}</span></div>
                  <i className="fa-solid fa-arrow-up-right"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
