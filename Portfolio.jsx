import React, { useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Swatch from '../components/Swatch.jsx'
import useReveal from '../hooks/useReveal.js'
import { PORTFOLIO, CATEGORIES } from '../data/portfolio.js'
import '../styles/portfolio.css'

export default function Portfolio(){
  const { category } = useParams()
  const navigate = useNavigate()
  const active = category ? category.charAt(0).toUpperCase()+category.slice(1) : 'All'

  const items = useMemo(()=>{
    if(active === 'All') return PORTFOLIO
    return PORTFOLIO.filter(p=>p.category === active)
  },[active])

  useReveal('.reveal', [active])

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="A repository of over a hundred designs."
        sub="Accent lighting, ambient lighting, customized lighting, and sculptural lighting — filter by where the light lives."
      />

      <section className="section portfolio-list">
        <div className="wrap">
          <div className="portfolio-filter reveal">
            {CATEGORIES.map(c=>(
              <button
                key={c}
                className={active===c ? 'is-active':''}
                onClick={()=> navigate(c==='All' ? '/portfolio' : `/portfolio/${c.toLowerCase()}`)}
              >
                {c}
              </button>
            ))}
            <span className="portfolio-filter__count">{items.length} works</span>
          </div>

          <div className="portfolio-grid">
            {items.map((p,i)=>(
              <Link to={`/work/${p.slug}`} className="portfolio-card reveal" key={p.slug}>
                <Swatch label={p.name} index={i} ratio={i%2===0 ? '4/5':'4/3'} />
                <div className="portfolio-card__meta">
                  <div>
                    <h3>{p.name}</h3>
                    <span>{p.category}</span>
                  </div>
                  <i className="fa-solid fa-arrow-up-right"></i>
                </div>
                {p.tag && <span className="portfolio-card__tag">{p.tag}</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
