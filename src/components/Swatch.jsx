import React from 'react'
import '../styles/swatch.css'

const PALETTE = ['t1','t2','t3','t4']

export default function Swatch({ label, index=0, ratio='4/5', icon='fa-light fa-lightbulb', image, className = '' }){
  const tone = PALETTE[index % PALETTE.length]
  return (
    <div className={`swatch swatch--${tone} ${className}`} style={{aspectRatio:ratio}}>
      {image ? (
        <img 
          src={image} 
          alt={label || "SOGANI installation product"} 
          loading="lazy"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            display: 'block', 
            transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)' 
          }}
          className="swatch__image"
          onError={(e) => {
            // If image fails to load, hide image and show standard fallback icon/grid
            e.target.style.display = 'none';
            const iconEl = e.target.parentNode.querySelector('.swatch__icon-fallback');
            if (iconEl) iconEl.style.display = 'block';
            const gridEl = e.target.parentNode.querySelector('.swatch__grid');
            if (gridEl) gridEl.style.display = 'block';
          }}
        />
      ) : null}

      {/* Fallbacks if image is missing or fails to load */}
      <div className="swatch__grid" style={{ display: image ? 'none' : 'block' }} />
      <i className={`swatch__icon ${icon} swatch__icon-fallback`} style={{ display: image ? 'none' : 'block' }}></i>

      {label && <span className="swatch__label">{label}</span>}
    </div>
  )
}
