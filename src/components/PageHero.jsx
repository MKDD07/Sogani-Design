import React from 'react'
import '../styles/pagehero.css'

export default function PageHero({ eyebrow, title, sub, crumb }){
  return (
    <header className="page-hero">
      <div className="wrap">
        {crumb && <p className="page-hero__crumb">{crumb}</p>}
        <p className="eyebrow reveal">{eyebrow}</p>
        <h1 className="page-hero__title reveal">{title}</h1>
        {sub && <p className="page-hero__sub reveal">{sub}</p>}
      </div>
    </header>
  )
}
