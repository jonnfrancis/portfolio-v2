import React, { useMemo, useState } from 'react'
  import { WindowControls } from '#components'
  import { gallery, photosLinks } from '#constants'
  import { SlideWrapper } from '#hoc'
  import useSlideStore from '#store/slide'
  
  // Helper to normalize strings for loose matching
  const norm = (v) => (v || '').toString().trim().toLowerCase()
  
  const MobilePhotos = () => {
    const { openSlide } = useSlideStore()
  
    const hasCollections = Array.isArray(photosLinks) && photosLinks.length > 0
    const hasGallery = Array.isArray(gallery) && gallery.length > 0
  
    // Build collections with a leading "Library" as the All pseudo-collection.
    // We derive an internal key for each collection for matching.
    const collections = useMemo(() => {
      const derived = (hasCollections ? photosLinks : []).map((c, idx) => ({
        ...c,
        // Prefer provided id; otherwise fallback to title; ensure we have a stable key
        key: c.id != null ? String(c.id) : (c.title ? norm(c.title) : `col-${idx}`),
        title: c.title || c.name || `Collection ${idx + 1}`,
      }))
  
      if (derived.length === 0) {
        // Fallback single Library if no collections provided
        return [{ key: 'all', id: 'all', title: 'Library', icon: undefined, isAll: true }]
      }
  
      // Ensure first item is treated as "Library" (All pseudo-collection) visually and functionally
      const first = { ...derived[0], key: 'all', id: derived[0].id ?? 'all', title: 'Library', isAll: true }
      return [first, ...derived.slice(1)]
    }, [hasCollections, photosLinks.length])
  
    // Active collection key; default to 'all' (Library)
    const [activeKey, setActiveKey] = useState('all')
  
    const activeCollection = useMemo(
      () => collections.find((c) => (c.key || c.id) === activeKey) || collections[0],
      [collections, activeKey]
    )
  
    // Client-side filter:
    // - If active is 'all' -> show all
    // - Else include items whose collection matches by:
    //   - item.collection equals active.id or active.title (case-insensitive), or
    //   - item.tags includes either (if tags array exists), or
    //   - item.collectionId equals active.id (if present)
    const filteredGallery = useMemo(() => {
      if (!hasGallery) return []
      if (!activeCollection || activeCollection.isAll) return gallery
  
      const targetId = norm(activeCollection.id)
      const targetTitle = norm(activeCollection.title)
  
      return gallery.filter((item) => {
        const c1 = norm(item?.collection)
        const c2 = norm(item?.collectionId)
        const titleMatch = c1 && (c1 === targetId || c1 === targetTitle)
        const idMatch = c2 && (c2 === targetId || c2 === targetTitle)
        const tags = Array.isArray(item?.tags) ? item.tags.map(norm) : []
        const tagsMatch = tags.includes(targetId) || tags.includes(targetTitle)
        return Boolean(titleMatch || idMatch || tagsMatch)
      })
    }, [hasGallery, activeCollection])
  
    const openImage = (item, indexInFiltered) => {
      // Slide key remains as requested
      openSlide('mobile_imgfile', {
        id: item.id,
        name: item.name || 'Gallery image',
        icon: '/images/image.png',
        kind: 'file',
        fileType: 'img',
        imageUrl: item.img,
        index: indexInFiltered,
        // Provide collection context for the viewer
        collection: activeCollection?.isAll ? 'library' : (activeCollection?.id || activeCollection?.title),
        filteredIds: filteredGallery.map((g) => g.id).filter((x) => x != null),
      })
    }
  
    return (
      <>
        {/* Header: neutral visuals; SlideWrapper handles glass/backdrop */}
        <div
          id="window-header"
          className="flex items-center justify-between px-4 py-3 bg-white/50"
          role="region"
          aria-labelledby="mobile-photos-title"
        >
          <WindowControls target="mobile_photos" storeType="slide" />
          <h2 id="mobile-photos-title" className="text-base font-medium">
            Gallery
          </h2>
          <div></div>
        </div>
  
        <div className="px-4 pb-6">
          <div className="mb-4">
            <h3 className="font-semibold">Collections</h3>
            {collections.length === 0 ? (
              <div role="status" aria-live="polite" className="text-sm text-neutral-500 px-1 py-2">
                No collections available.
              </div>
            ) : (
              <div
                className="mt-3 flex gap-3 overflow-x-auto pb-2"
                aria-label="Collections"
              >
                {collections.map(({ id, key, icon, title, isAll }) => {
                  const currentKey = key || id
                  const isActive = (currentKey === activeKey) || (isAll && activeKey === 'all')
                  return (
                    <button
                      key={currentKey}
                      type="button"
                      onClick={() => setActiveKey(currentKey)}
                      className={[
                        'shrink-0 px-3 py-2 rounded-lg transition-colors',
                        isActive ? 'bg-blue-50 text-blue-900' : 'bg-white/8 hover:bg-white/10',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20',
                      ].join(' ')}
                      aria-current={isActive ? 'true' : undefined}
                      aria-label={isAll ? 'Show all photos (Library)' : `Show ${title} photos`}
                    >
                      <div className="flex items-center gap-2">
                        {icon ? (
                          <img
                            src={icon}
                            alt=""
                            aria-hidden="true"
                            className="w-5 h-5"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : null}
                        <span className="text-sm">{isAll ? 'Library' : title}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
  
          {!hasGallery ? (
            <div role="status" aria-live="polite" className="text-sm text-neutral-500 px-1 py-2">
              No photos in the gallery.
            </div>
          ) : filteredGallery.length === 0 ? (
            <div role="status" aria-live="polite" className="text-sm text-neutral-500 px-1 py-2">
              No photos match this collection. Showing all.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredGallery.map((item, index) => (
                <button
                  key={item.id ?? `photo-${index}`}
                  type="button"
                  onClick={() => openImage(item, index)}
                  className="block rounded-lg overflow-hidden bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
                  aria-label={item.name ? `Open ${item.name}` : 'Open image'}
                >
                  <img
                    src={item.img}
                    alt=""
                    className="w-full h-40 object-cover"
                    loading="lazy"
                    decoding="async"
                    fetchPriority={index < 2 ? 'high' : 'low'}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </>
    )
  }
  
  const MobilePhotosWindow = SlideWrapper(MobilePhotos, 'mobile_photos')
  
  export default MobilePhotosWindow