import React, { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import useReveal from '../hooks/useReveal.js'
import useDocumentMetadata from '../hooks/useDocumentMetadata.js'

const POLICIES = [
  {
    id: 'bespoke',
    title: 'Bespoke & Commission Policy',
    content: (
      <>
        <p>
          Every light installation at SOGANI is crafted to order, customized to match the unique architecture
          and aesthetic of your space. Due to the highly bespoke nature of our sculptural lighting, the following
          terms apply to all commissions:
        </p>
        <ul>
          <li><strong>Lead Times:</strong> Standard production lead time is 8 to 12 weeks from deposit receipt and technical drawing approval.</li>
          <li><strong>Payment Terms:</strong> A 50% non-refundable deposit is required to initiate design and engineering. The remaining 50% balance is due prior to dispatch.</li>
          <li><strong>Cancellations:</strong> Because raw materials and master artisan scheduling are reserved immediately, commissions cannot be cancelled or refunded once production has begun.</li>
          <li><strong>Installation:</strong> Detailed installation manuals and structural specifications are provided. Professional installation by a certified electrician is required.</li>
        </ul>
      </>
    )
  },
  {
    id: 'warranty',
    title: 'Warranty & Material Care',
    content: (
      <>
        <p>
          We take pride in utilizing state-of-the-art technology alongside hand-beaten, woven, and patinated metals.
          All installations are backed by our studio's commitment to quality.
        </p>
        <ul>
          <li><strong>Warranty Period:</strong> We offer a 3-year structural warranty on metal framing and a 2-year warranty on LED drivers and electrical components.</li>
          <li><strong>Metal Care:</strong> Our finishes (including stainless steel, copper, and brass) are treated with protective lacquers. Clean only with a dry microfibre cloth. Never use chemical cleaners or abrasives.</li>
          <li><strong>Outdoor Installations:</strong> Specific collections are engineered for outdoor environments. Ensure the correct IP rating is requested and noted in your commission brief.</li>
        </ul>
      </>
    )
  },
  {
    id: 'privacy',
    title: 'Privacy & Data Protection',
    content: (
      <>
        <p>
          SOGANI respects your privacy and is committed to protecting your personal data. This policy explains how we
          handle information collected through enquiries, private viewing requests, and newsletter subscriptions:
        </p>
        <ul>
          <li><strong>Information We Collect:</strong> We collect names, email addresses, phone numbers, and project specifications voluntarily submitted through our enquiry forms.</li>
          <li><strong>Usage:</strong> Your information is used strictly to consult on commissions, schedule studio visits, and deliver news regarding collections. We never sell or share data with third parties.</li>
          <li><strong>Security:</strong> All client data is encrypted and stored in secure systems. You may request the modification or deletion of your records at any time.</li>
        </ul>
      </>
    )
  }
]

export default function Policy() {
  useDocumentMetadata({
    title: 'Studio Policies & Terms | SOGANI Studio',
    description: 'Read SOGANI Design Studio policies regarding bespoke lighting commissions, material care, structural warranty, and client data privacy.',
    keywords: 'SOGANI policy, bespoke lighting warranty, custom chandelier return policy, lighting material care, privacy policy SOGANI',
    canonicalUrl: 'https://sogani.design/policies/'
  });

  useReveal('.reveal')
  const [activeTab, setActiveTab] = useState('bespoke')

  return (
    <>
      <PageHero
        eyebrow="Guidelines"
        title="Studio Policies."
        sub="Our commitment to craftsmanship, materials, and secure client relations."
      />

      <section className="section policy-section">
        <div className="wrap">
          <div className="policy-grid">
            
            {/* Tabs Sidebar */}
            <aside className="policy-sidebar reveal">
              <nav className="policy-nav">
                {POLICIES.map((p) => (
                  <button
                    key={p.id}
                    className={`policy-nav-btn ${activeTab === p.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(p.id)}
                  >
                    <span>{p.title}</span>
                    <i className="fa-solid fa-chevron-right" />
                  </button>
                ))}
              </nav>
            </aside>

            {/* Policy Content */}
            <article className="policy-body reveal">
              {POLICIES.map((p) => {
                if (p.id !== activeTab) return null
                return (
                  <div key={p.id} className="policy-content-block">
                    <h2 className="policy-title-header">{p.title}</h2>
                    <div className="policy-text-wrap">
                      {p.content}
                    </div>
                  </div>
                )
              })}
            </article>

          </div>
        </div>
      </section>
    </>
  )
}
