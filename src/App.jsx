import gsap from "gsap"
import { Draggable } from "gsap/draggable"

import { Navbar, Welcome, Dock, Home } from "#components"
import { Terminal, Safari, Resume, Finder, Text, ImageWindowContent, Contact, Photos } from "#windows"

gsap.registerPlugin(Draggable)

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <ImageWindowContent />
      <Contact />
      <Home />
      <Photos />
    </main>
  )
}

export default App