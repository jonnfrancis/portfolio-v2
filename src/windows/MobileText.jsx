import React from 'react'
import { WindowControls } from '#components'
import { SlideWrapper } from '#hoc'
import useSlideStore from '#store/slide'

const MobileText = () => {
  const { slides } = useSlideStore()
  const data = slides.mobile_txtfile?.data
  if (!data) return null

  const { name, image, subtitle, description } = data

  const hasDescription = Array.isArray(description) && description.length > 0
  return (
    <>
      <div id="window-header" className="flex items-center justify-between px-4 py-3 bg-white/50">
        <WindowControls target={'mobile_txtfile'} storeType="slide" />
        <h2 className="text-base">{name}</h2>
        <div className="w-6" />
      </div>

      <div className="p-4 overflow-auto">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-auto rounded mb-4"
            decoding="async"
            loading="eager"
          />
        ) : null}

        {subtitle ? <h3 className="text-lg font-semibold">{subtitle}</h3> : null}

        {hasDescription ? (
          <div className="space-y-3 leading-relaxed text-base text-gray-800">
            {description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : (
          <div role="status" aria-live="polite" className="text-sm text-neutral-600">
            No additional details available.
          </div>
        )}
      </div>
    </>
  )
}

const MobileTextWindow = SlideWrapper(MobileText, 'mobile_txtfile')

export default MobileTextWindow
