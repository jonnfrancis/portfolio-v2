import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { useEffect } from "react"
import { useMediaQuery } from 'react-responsive'
import useSlideStore from '#store/slide'
import useWindowStore from '#store/window'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

import { Navbar, Welcome, MobileWelcome, Dock, Home, MobileDock } from "#components"
import { Terminal, MobileTerminal, MobileImage, Safari, Resume, Finder, Text, MobileText, ImageWindowContent, Contact, Photos, MobileContact, MobileSafari, MobilePhotos, MobileFinder, MobileResume, MobileHome } from "#windows"

gsap.registerPlugin(Draggable)

const App = () => {
  const mobile = useMediaQuery({ query: '(max-width: 768px)' })

  // Global keyboard handler: Escape closes topmost slide, then topmost window.
  useEffect(() => {
    const isEditable = (el) => {
      if (!el) return false
      const tag = el.tagName
      if (!tag) return false
      const editable = el.getAttribute && el.getAttribute('contenteditable')
      return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        editable === '' ||
        editable === 'true'
      )
    }

    const handler = (e) => {
      if (e.key !== 'Escape') return
      // don't intercept when focusing an editable field
      if (isEditable(document.activeElement)) return

      const slideState = useSlideStore.getState()
      const slides = slideState.slides || {}
      const openSlides = Object.entries(slides).filter(([, s]) => s && s.isOpen)
      if (openSlides.length > 0) {
        // close the highest zIndex slide
        openSlides.sort((a, b) => (b[1].zIndex || 0) - (a[1].zIndex || 0))
        const topKey = openSlides[0][0]
        slideState.closeSlide(topKey)
        return
      }

      const winState = useWindowStore.getState()
      const wins = winState.windows || {}
      const openWins = Object.entries(wins).filter(([, w]) => w && w.isOpen)
      if (openWins.length > 0) {
        openWins.sort((a, b) => (b[1].zIndex || 0) - (a[1].zIndex || 0))
        const topWin = openWins[0][0]
        winState.closeWindow(topWin)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <main>
      <Navbar />
      {mobile ? <MobileWelcome /> : <Welcome />}
      {mobile ? <MobileDock /> : <Dock />}

      {mobile ? <MobileTerminal /> : <Terminal />}
      {mobile ? <MobileSafari /> : <Safari />}
      {mobile ? <MobileResume /> : <Resume />}
      {mobile ? <MobileFinder /> : <Finder />}
      {mobile ? <MobileText /> : <Text />}
      {mobile ? <MobileImage /> : <ImageWindowContent />}
      {mobile ? <MobileContact /> : <Contact />}
      {mobile ? <MobileHome /> : <Home />}
      {mobile ? <MobilePhotos /> : <Photos />}
      <Analytics />
      <SpeedInsights />
    </main>
  )
}

export default App