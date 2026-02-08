import React, { useMemo, useRef } from 'react'
import { locations } from '#constants'
import useMobileLocationStore from '#store/mobile-location'
import useSlideStore from '#store/slide'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/Draggable'

const MobileHome = () => {
    const containerRef = useRef(null)
    const { setActiveLocation } = useMobileLocationStore()
    const { openSlide } = useSlideStore()

    // Defensive locations read
    const locs = useMemo(() => {
        try {
            return (locations && typeof locations === 'object') ? Object.values(locations) : []
        } catch {
            return []
        }
    }, [])

    // Prefer reduced-motion: disable inertia if requested
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false

    useGSAP(() => {
        const el = containerRef.current
        if (!el) return

        let inst = []

        try {
            inst = Draggable.create(el, {
                type: 'y',
                edgeResistance: 0.85,
                inertia: !prefersReducedMotion,
                bounds: { minY: -120, maxY: 120 },
                allowContextMenu: true,
                allowNativeTouchScrolling: true,
                minimumMovement: 6, // avoid accidental drags on taps
                onDragStart(e) {
                    // If drag starts on a button, let the tap/click pass through (do not start drag)
                    const target = e.target
                    if (target && (target.closest('button') || target.closest('[data-no-drag]'))) {
                        // cancel this drag
                        this.endDrag()
                    }
                },
            })
        } catch (e) {
            // noop
            console.warn('Draggable init failed:', e)
        }

        return () => {
            try {
                if (Array.isArray(inst) && inst.length && inst[0]) {
                    inst[0].kill()
                }
            } catch (e) {
                // noop
                console.warn('Draggable cleanup failed:', e)
            }
        }
    }, [prefersReducedMotion])

    const handleOpen = (loc) => {
        setActiveLocation(loc)
        openSlide('mobile_finder', loc)
    }

    // If no locations, render nothing (or an empty state, depending on design)
    if (!locs.length) return null

    return (
        <div
            ref={containerRef}
            className="fixed left-1/2 bottom-30 -translate-x-1/2 z-40 w-[92%] max-w-lg"
            style={{ touchAction: 'pan-y' }}
            role="region"
            aria-label="App Dock"
        >
            <div className="grid grid-cols-4 gap-3 bg-white/4 backdrop-blur-md px-3 py-3 rounded-xl shadow-lg">
                {locs.map((loc, idx) => {
                    const key = loc.id ?? loc.name ?? `loc-${idx}`
                    const label = typeof loc.name === 'string' ? loc.name : 'Open'
                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => handleOpen(loc)}
                            className="flex flex-col items-center gap-2 px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 rounded-lg"
                            aria-label={`Open ${label}`}
                            data-no-drag
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                                <img
                                    src={loc.icon}
                                    alt=""
                                    aria-hidden="true"
                                    className="w-8 h-8 object-contain"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <span className="text-[11px] text-white/90 truncate w-16 text-center">{loc.name}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default MobileHome