import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useReveal(selector='.reveal', deps=[]){
  const scope = useRef(null)

  useEffect(()=>{
    const root = scope.current || document
    const els = root.querySelectorAll(selector)
    const triggers = []

    els.forEach((el, i)=>{
      const tween = gsap.fromTo(el, {
        opacity:0, y:40
      },{
        opacity:1, y:0,
        duration:0.9,
        delay:(i%4)*0.06,
        ease:'power3.out',
        scrollTrigger:{
          trigger:el,
          start:'top 88%',
          toggleActions:'play none none reverse'
        }
      })
      triggers.push(tween.scrollTrigger)
    })

    return ()=>{
      triggers.forEach(t=> t && t.kill())
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  return scope
}
