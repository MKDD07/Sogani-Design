import React, { useState, useEffect } from 'react'
import PageHero from '../components/PageHero.jsx'
import useReveal from '../hooks/useReveal.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import useDocumentMetadata from '../hooks/useDocumentMetadata.js'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  useDocumentMetadata({
    title: 'Commission Bespoke Lighting | Contact SOGANI Studio',
    description: 'Get in touch with SOGANI Design Studio in Gurgaon, India to discuss custom, sculptural light installations for residential, commercial, or public spaces.',
    keywords: 'contact SOGANI, Gurgaon light studio, custom chandelier enquiry, luxury lighting commissions, Vibhor Sogani studio contact',
    canonicalUrl: 'https://sogani.design/contact/'
  });

  useReveal('.reveal')
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Residential',
    message: ''
  })

  useEffect(() => {
    // Parallax effect on all slide images within the contact carousel
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-slide-wrap img',
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.contact-parallax-carousel',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* ══════════ CONTACT CAROUSEL PARALLAX ══════════ */}
      <section className="contact-parallax-carousel">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          speed={1500}
          className="contact-swiper"
        >
          <SwiperSlide>
            <div className="contact-slide-wrap">
              <img src="/assets/banner/banner-001.png" alt="Sogani Installation 1" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="contact-slide-wrap">
              <img src="/assets/banner/banner-002.png" alt="Sogani Installation 2" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="contact-slide-wrap">
              <img src="/assets/banner/banner-003.png" alt="Sogani Installation 3" />
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="contact-hero-overlay">
          <div className="wrap">
            <span className="eyebrow" style={{ color: '#ffffff', opacity: 0.9 }}>Enquire</span>
            <h1 className="contact-hero-title gsap-text-reveal">Start a commission.</h1>
            <p className="contact-hero-sub">
              Connect with our design workshop to discuss custom sizes, materials, and installations.
            </p>
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="wrap contact-grid-container">
          
          <div className="contact-info-panel reveal">
            <div>
              <span className="eyebrow">Direct Contact</span>
              <h2 className="contact-info-title gsap-text-reveal">The Gurgaon Workshop</h2>
              
              <div className="contact-details">
                <div className="contact-detail-item">
                  <i className="fa-solid fa-location-dot" />
                  <div>
                    <h4>Workshop Address</h4>
                    <p>
                      Sogani Design Studio<br />
                      Phase IV, Udyog Vihar,<br />
                      Sector 18, Gurugram,<br />
                      Haryana 122015, India
                    </p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <i className="fa-solid fa-envelope" />
                  <div>
                    <h4>Email Us</h4>
                    <p><a href="mailto:studio@vibhorsogani.com">studio@vibhorsogani.com</a></p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <i className="fa-solid fa-phone" />
                  <div>
                    <h4>Phone Number</h4>
                    <p><a href="tel:+911244009856">+91 124 400 9856</a></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-note">
              <p>* By appointment only. Our standard lead time for customized orders is 8–12 weeks.</p>
            </div>
          </div>

          <div className="contact-form-panel reveal">
            {submitted ? (
              <div className="contact-success">
                <i className="fa-solid fa-circle-check"></i>
                <h3>Enquiry Received</h3>
                <p>Thank you for reaching out. A design consultant from our studio will contact you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-ghost" style={{ marginTop: '24px' }}>Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="form-title">Send an Enquiry</h3>
                
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Project Type</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="form-select"
                  >
                    <option value="Residential">Residential Space</option>
                    <option value="Commercial">Commercial / Hotel Lobby</option>
                    <option value="Public">Public Art / Facade</option>
                    <option value="Other">Other Space</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message or Specifications</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Tell us about the space, ceiling height, and designs you are interested in..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-submit">Send Enquiry <i className="fa-solid fa-arrow-right" /></button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
