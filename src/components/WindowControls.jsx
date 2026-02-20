import { useEffect, useState, useCallback } from 'react'
import useWindowStore from '#store/window'
import useSlideStore from '#store/slide'

const WindowControls = ({ target, storeType = 'window' }) => {
  const { closeWindow } = useWindowStore();
  const { closeSlide } = useSlideStore();
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onResize = () => setMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const { requestCloseSlide } = useSlideStore();

  const handleClose = useCallback(() => {
    if (storeType === 'slide') return requestCloseSlide ? requestCloseSlide(target) : closeSlide(target)
    return closeWindow(target)
  }, [storeType, target, closeSlide, closeWindow, requestCloseSlide])

  if (mobile) {
    return (
      <div className="flex items-center">
        <button
          aria-label="close"
          onClick={(e) => { e.stopPropagation(); handleClose(); }}
          className="w-8 h-8 rounded-full bg-neutral-500/80  flex items-center justify-center shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div id="window-controls">
      <div className="close" onClick={(e) => { e.stopPropagation(); handleClose(); }} />
      <div className="minimize" />
      <div className="maximize" />
    </div>
  )
}

export default WindowControls