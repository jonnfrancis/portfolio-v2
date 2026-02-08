import React from 'react'
import { WindowControls } from '#components'
import { SlideWrapper } from '#hoc'
import useSlideStore from '#store/slide'

const MobileImage = () => {
  const { slides } = useSlideStore()
  const data = slides?.mobile_imgfile?.data
  if (!data) return null

  const { name, imageUrl } = data
  const title = name || 'Image'

  return (
    <>
      <div id="window-header" className="flex items-center justify-between px-4 py-3 bg-white/50">
        <WindowControls target={'mobile_imgfile'} storeType="slide" />
        <h2 className="text-base">{name}</h2>
        <div className="w-6" />
      </div>

      <div className="p-4 overflow-auto">
        {imageUrl ? (
          <div className="w-full flex items-center justify-center">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-auto max-h-[70vh] object-contain rounded"
              decoding="async"
              loading="eager"
              fetchpriority="high"
            />
          </div>
        ) : (
          <div role="status" aria-live="polite" className="text-sm text-neutral-600">
            No image to display.
          </div>
        )}
      </div>
    </>

  )
}

const MobileImageWindow = SlideWrapper(MobileImage, 'mobile_imgfile')

export default MobileImageWindow