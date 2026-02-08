import { WindowControls } from "#components"
import { techStack } from "#constants"
import { SlideWrapper } from "#hoc"
import { Check, Flag } from "lucide-react"

const MobileTerminal = () => {
  const stacks = Array.isArray(techStack) ? techStack : []
  const totalCategories = stacks.length
  const totalItems = stacks.reduce((acc, s) => acc + (Array.isArray(s.items) ? s.items.length : 0), 0)

  return (
    <>
      {/* Header: neutral visuals; SlideWrapper owns glass/backdrop */}
      <div
        id="window-header"
        className="w-full flex items-center justify-between px-4 py-3 bg-white/50"
        role="region"
        aria-labelledby="mobile-terminal-title"
      >
        <WindowControls target="mobile_terminal" storeType="slide" />
        <h2 id="mobile-terminal-title" className="text-base font-medium">Tech Stack</h2>
      </div>

      <div className="techstack p-4 overflow-auto">
        <p aria-live="polite">
          <span className="font-bold"><code>@johnfrancis %</code> </span>
          <code>show tech stack</code>
        </p>

        <div className="label mt-3 flex items-center gap-4">
          <p className="w-28 font-semibold">Category</p>
          <p>Technologies</p>
        </div>

        {stacks.length === 0 ? (
          <div role="status" aria-live="polite" className="mt-3 text-sm text-neutral-600">
            No tech stack data available.
          </div>
        ) : (
          <ul className="content mt-2 space-y-3">
            {stacks.map(({ category, items }) => (
              <li key={category} className="flex items-start gap-3">
                <Check className="check mt-1" size={20} aria-hidden="true" focusable="false" />
                <div>
                  <h3 className="font-semibold">{category}</h3>
                  <ul className="text-sm text-neutral-700">
                    {(Array.isArray(items) ? items : []).map((item, i, arr) => {
                      const key = typeof item === 'string' ? item : `item-${i}`
                      return (
                        <li key={key} className="inline">
                          {item}
                          {i < arr.length - 1 ? ", " : ""}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="footnote mt-4 flex items-center justify-between text-sm">
          <p className="flex items-center gap-2">
            <Check size={18} aria-hidden="true" focusable="false" /> {totalCategories} categor{totalCategories === 1 ? "y" : "ies"} • {totalItems} item{totalItems === 1 ? "" : "s"}
          </p>
          <p className="text-black flex items-center gap-2">
            <Flag size={14} fill="currentColor" aria-hidden="true" focusable="false" /> Render time: 6ms
          </p>
        </div>
      </div>
    </>
  )
}

const MobileTerminalWindow = SlideWrapper(MobileTerminal, "mobile_terminal")

export default MobileTerminalWindow