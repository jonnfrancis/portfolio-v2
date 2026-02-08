import React from 'react'
import { WindowControls } from '#components'
import { locations } from '#constants'
import { SlideWrapper } from '#hoc'
import clsx from 'clsx'
import { Folder, Search } from 'lucide-react'
import useSlideStore from '#store/slide'
import useMobileLocationStore from '#store/mobile-location'

const MobileFinder = () => {
  const { openSlide } = useSlideStore();
  const { activeLocation, setActiveLocation } = useMobileLocationStore();

  const safeLocations = (locations && typeof locations === 'object')
    ? Object.values(locations)
    : [];

  const handleExternalOpen = (href) => {
    try {
      window.open(href, '_blank', 'noopener');
    } catch {
      // noop
    }
  };

  const renderList = (name, items) => (
    <div>
      <h3 className="text-sm font-semibold mb-2">{name}</h3>
      <ul
        className="mt-3 flex gap-3 overflow-x-auto pb-2"
        aria-label={name}
      >
        {items.length === 0 ? (
          <li className="text-sm text-neutral-500 px-1 py-2">No items</li>
        ) : (
          items.map((item) => {
            const isActive = item.id === activeLocation?.id;
            return (
              <li key={item.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveLocation(item)}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20',
                    isActive ? 'bg-blue-50 text-blue-900' : 'hover:bg-white/5'
                  )}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <img
                    src={item.icon}
                    className="w-5 h-5"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-sm w-max whitespace-nowrap font-medium">
                    {item.name}
                  </span>
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );

  const openItem = (item) => {
    if (item.fileType === 'pdf') return openSlide('mobile_resume', item);
    if (item.kind === 'folder') return setActiveLocation(item);
    if (['fig', 'url'].includes(item.fileType) && item.href) return handleExternalOpen(item.href);

    // e.g. txtfile -> mobile_txtfile, imgfile -> mobile_imgfile
    const targetKey = `mobile_${item.fileType}${item.kind}`;
    openSlide(targetKey, item);
  };

  const children = Array.isArray(activeLocation?.children) ? activeLocation.children : [];

  return (
    <>
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-3 bg-white/50"
        role="region"
        aria-labelledby="mobile-finder-title"
      >
        <WindowControls target={'mobile_finder'} storeType="slide" />
        <h2 id="mobile-finder-title" className="text-base font-medium">Finder</h2>
        <Search className="icon" aria-hidden="true" focusable="false" />
      </div>

      <div className="p-4 space-y-4">
        <div>
          {renderList("Favorites", safeLocations)}
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">{activeLocation?.name ?? 'Current'}</h3>
          {children.length === 0 ? (
            <div role="status" aria-live="polite" className="text-sm text-neutral-500 px-1 py-2">
              No items in this location.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {children.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openItem(item)}
                  className="flex flex-col items-start gap-3 p-3 rounded-lg bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
                >
                  <div className="w-full h-36 bg-gray-100 rounded-md overflow-hidden">
                    {item.kind === 'folder' ? (
                      <Folder className="w-full h-full" aria-hidden="true" focusable="false" />
                    ) : (
                      <img
                        src={item.imageUrl || item.icon}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                  <p className="text-sm font-medium">{item.name}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const MobileFinderWindow = SlideWrapper(MobileFinder, 'mobile_finder')

export default MobileFinderWindow