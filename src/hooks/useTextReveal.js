import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useTextReveal(selector = '.split-text-reveal', deps = []) {
  useEffect(() => {
    // A small timeout ensures React finishes painting the DOM
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(selector)
      const triggers = []

      elements.forEach((el) => {
        // Prevent duplicate splitting if the page re-renders
        if (el.dataset.splitDone) return

        const htmlContent = el.innerHTML.trim()
        if (!htmlContent) return

        // Split by <br/> tag to preserve line breaks
        const lines = htmlContent.split(/<br\s*\/?>/i)
        
        const newHtml = lines.map(line => {
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = line.trim()
          const decodedText = tempDiv.textContent || tempDiv.innerText || ''
          
          if (!decodedText.trim()) return ''
          
          const words = decodedText.split(/\s+/)
          
          const lineWordsHtml = words.map(word => {
            const characters = Array.from(word)
            const charsHtml = characters.map(char => {
              return `<span class="reveal-char" style="display: inline-block; will-change: transform, opacity;">${char}</span>`
            }).join('')
            
            return `<span class="reveal-word-outer" style="display: inline-block; white-space: nowrap; margin-right: 0.25em;">${charsHtml}</span>`
          }).join('')

          return `<span class="reveal-line" style="display: block; line-height: 1.15;">${lineWordsHtml}</span>`
        }).join('')

        el.innerHTML = newHtml
        el.dataset.splitDone = 'true'

        const chars = el.querySelectorAll('.reveal-char')

        // Animate each character/letter on scroll as requested by the user
        const tween = gsap.from(chars, {
          opacity: 0.1,
          y: 10,
          stagger: 0.05,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
          }
        })

        if (tween.scrollTrigger) {
          triggers.push(tween.scrollTrigger)
        }
      })

      // Clean up triggers on unmount
      return () => {
        triggers.forEach(t => t && t.kill())
      }
    }, 50)

    return () => clearTimeout(timer)
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
