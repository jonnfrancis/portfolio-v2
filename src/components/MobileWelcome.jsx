import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/**
 * MobileWelcome: 2026 Kinetic Typography
 * Designed for immediate impact with "Variable Font" feel and staggered reveal.
 */
const MobileWelcome = () => {
  const container = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    
    tl.fromTo('.reveal-text', 
      { y: 40, opacity: 0, rotateX: -30 }, 
      { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1, delay: 0.2 }
    )
    tl.fromTo('.reveal-sub', 
      { opacity: 0, x: -10 }, 
      { opacity: 1, x: 0, duration: 0.8 }, 
      "-=0.6"
    )
  }, { scope: container })

  return (
    <section id="welcome-mobile" ref={container} className="px-6 py-12 flex flex-col justify-center min-h-[60vh]">
      <div className="overflow-hidden">
        <p className="reveal-text text-sm uppercase tracking-[0.2em] text-black/90 font-semibold mb-2">
          Creative Developer
        </p>
      </div>
      <div className="overflow-hidden">
        <h1 className="reveal-text text-6xl font-bold tracking-tighter leading-[0.9] text-neutral-900">
          John <br /> Francis
        </h1>
      </div>
      <div className="overflow-hidden mt-6">
        <div className="reveal-sub flex items-center gap-3 text-neutral-600 bg-neutral-100/50 w-fit px-4 py-2 rounded-full border border-neutral-200/50 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-xs font-medium">Available for 2026 Projects</p>
        </div>
      </div>
      
      <div className="mt-8 space-y-4 max-w-60">
        <p className="reveal-sub text-lg leading-snug text-neutral-800 font-medium">
          Building high-fidelity digital systems.
        </p>
        <p className="reveal-sub text-sm text-black/90 leading-relaxed">
          Optimized for touch. Engineered for performance. Explore via the docks below. Drag down or tap X to close tabs.
        </p>
      </div>
    </section>
  )
}

export default MobileWelcome