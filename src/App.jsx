import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

import { Navbar, Welcome, MobileWelcome, Dock, Home, MobileDock } from "#components"
import { Terminal, MobileTerminal, MobileImage, Safari, Resume, Finder, Text, MobileText, ImageWindowContent, Contact, Photos, MobileContact, MobileSafari, MobilePhotos, MobileFinder, MobileResume, MobileHome } from "#windows"

gsap.registerPlugin(Draggable)

const App = () => {
  const [mobile, setMobile] = useState(() => window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth <= 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
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