import { useRef, useState, useEffect } from 'react'
import { Tooltip } from 'react-tooltip';

import { dockApps } from '#constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useWindowStore from '#store/window';

const Dock = () => {
    const dockRef = useRef(null);
    const {openWindow, closeWindow, windows} = useWindowStore();
    const [focusIndex, setFocusIndex] = useState(null)
    const itemRefs = useRef([])

    useEffect(() => {
        // ensure refs array length matches apps
        itemRefs.current = itemRefs.current.slice(0, dockApps.length)
    }, [])

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll(".dock-icon");

        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect();

            icons.forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** 2.5) / 20000);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power2.out",
                })
            })
        }

        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();

            animateIcons(e.clientX - left);
        }

        const resetIcons = () => 
            icons.forEach((icon) =>
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power1.out",
                })
            )

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        }
    }, [])

    

    const toggleApp = (app) => {
        if (!app.canOpen) return;

        const window = windows[app.id];
        if (!window) {
            console.error(`No window found for app id: ${app.id}`);
            return;
        }

        if (window.isMinimized) {
            // restore minimized windows
            const { restoreWindow } = useWindowStore.getState()
            restoreWindow && restoreWindow(app.id)
            return
        }

        if (window.isOpen) {
            closeWindow(app.id);
        } else {
            openWindow(app.id);
        }

    }
    const focusItem = (index) => {
        const clamped = ((index % dockApps.length) + dockApps.length) % dockApps.length
        setFocusIndex(clamped)
        const el = itemRefs.current[clamped]
        if (el && el.focus) el.focus()
    }

    const onKeyDown = (e, idx, app) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault(); focusItem(idx + 1)
            return
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault(); focusItem(idx - 1)
            return
        }
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); toggleApp(app)
            return
        }
    }

    return (
        <section id="dock" role="toolbar" aria-label="App dock">
                <div ref={dockRef} className='dock-container'>
                        {dockApps.map(({ id, name, icon, canOpen }, idx) => {
                                const win = windows[id] || {}
                                const isPressed = Boolean(win.isOpen && !win.isMinimized)
                                return (
                                <div key={id} className="relative flex justify-center">
                                        <button
                                            ref={el => itemRefs.current[idx] = el}
                                            type="button"
                                            className="dock-icon focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/40 rounded-lg"
                                            aria-label={name}
                                            role="button"
                                            aria-pressed={isPressed}
                                            data-tooltip-id="dock-tooltip"
                                            data-tooltip-content={name}
                                            data-tooltip-delay-show={150}
                                            disabled={!canOpen}
                                            onClick={() => toggleApp({ id, canOpen})}
                                            onKeyDown={(e) => onKeyDown(e, idx, { id, canOpen })}
                                            tabIndex={0}
                                        >
                                                <img src={`/images/${icon}`} alt={name} loading="lazy" className={canOpen ? "" : "opacity-60"} />
                                        </button>
                                </div>
                        )})}

                        <Tooltip id="dock-tooltip" place="top" effect="solid" className="tooltip" />
                </div>
        </section>
    )
}

export default Dock