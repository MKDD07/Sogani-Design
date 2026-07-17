import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useTextReveal(selector = '.gsap-text-reveal', deps = []) {
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
          const trimmedLine = line.trim()
          if (!trimmedLine) return ''
          
          // Split the line into words
          const words = trimmedLine.split(/\s+/)
          
          // Wrap words in container spans
          const lineWordsHtml = words.map(word => {
            return `<span class="reveal-word-outer" style="display: inline-block; overflow: hidden; vertical-align: top; margin-right: 0.25em;">` +
              `<span class="reveal-word-inner" style="display: inline-block; opacity: 0; will-change: transform, opacity;">${word}</span>` +
            `</span>`
          }).join('')

          return `<span class="reveal-line" style="display: block; overflow: hidden; white-space: nowrap; line-height: 1.15;">${lineWordsHtml}</span>`
        }).join('')

        el.innerHTML = newHtml
        el.dataset.splitDone = 'true'

        const wordInners = el.querySelectorAll('.reveal-word-inner')

        const tween = gsap.fromTo(wordInners, 
          {
            yPercent: 105,
            opacity: 0
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.04,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            }
          }
        )

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
