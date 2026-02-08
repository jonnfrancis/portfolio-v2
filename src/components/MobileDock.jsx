import React, { useRef } from 'react'
import { dockApps } from '#constants'
import useSlideStore from '#store/slide'
import {
  FileText,
  Globe,
  Image as ImageIcon,
  Mail,
  Terminal as TerminalIcon,
  Archive,
} from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const iconMap = {
  finder: FileText,
  safari: Globe,
  photos: ImageIcon,
  contact: Mail,
  terminal: TerminalIcon,
  trash: Archive,
}

const MobileDock = () => {
  const { openSlide, closeSlide, slides } = useSlideStore();
  const dockRef = useRef(null);

  const toggle = (appId, canOpen) => {
    if (!canOpen) return;
    const mobileKey = `mobile_${appId}`;
    const s = slides[mobileKey];
    
    // Physical feedback animation
    gsap.fromTo(`[data-app="${appId}"]`, 
      { scale: 0.8 }, 
      { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
    );

    if (!s || !s.isOpen) openSlide(mobileKey);
    else closeSlide(mobileKey);
  }

  useGSAP(() => {
    gsap.fromTo(dockRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.8 }
    );
  }, []);

  return (
    <section 
      ref={dockRef}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-[94%] max-w-md"
    > 
      <div className="flex justify-between items-end px-3 py-3 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
        {dockApps.map((app) => {
          const Icon = iconMap[app.id] || FileText
          const isActive = slides[`mobile_${app.id}`]?.isOpen;

          return (
            <button
              key={app.id}
              data-app={app.id}
              onClick={() => toggle(app.id, app.canOpen)}
              className={`relative group flex flex-col items-center transition-all duration-300 ${app.canOpen ? 'visible' : 'hidden'}`}
            >
              <div className={`
                w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500
                ${isActive ? 'bg-neutral-900 shadow-2xl scale-110' : 'bg-white/80 shadow-sm group-hover:bg-white'}
              `}>
                <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-white' : 'text-neutral-700'}`} />
              </div>
              
              {/* iOS Indicator Dot */}
              <div className={`
                mt-1.5 w-1 h-1 rounded-full bg-neutral-900 transition-all duration-500
                ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
              `} />
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default MobileDock;