import gsap from "gsap"
import { Draggable } from "gsap/draggable"

import { Navbar, Welcome, Dock } from "#components"
import Terminal from "#windows/Terminal"

gsap.registerPlugin(Draggable)

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
    </main>
  )
}

export default App