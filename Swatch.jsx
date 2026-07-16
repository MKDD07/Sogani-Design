import React from 'react'
import '../styles/swatch.css'

const PALETTE = ['t1','t2','t3','t4']

export default function Swatch({ label, index=0, ratio='4/5', icon='fa-light fa-lightbulb' }){
  const tone = PALETTE[index % PALETTE.length]
  return (
    <div className={`swatch swatch--${tone}`} style={{aspectRatio:ratio}}>
      <div className="swatch__grid" />
      <i className={`swatch__icon ${icon}`}></i>
      {label && <span className="swatch__label">{label}</span>}
    </div>
  )
}
