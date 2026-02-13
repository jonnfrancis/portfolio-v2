import useWindowStore from "#store/window"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useLayoutEffect, useRef } from "react";

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows, setFocusWindow } = useWindowStore();
        const win = windows[windowKey] || {};
        const { isOpen = false, zIndex = 0, isMinimized = false, isMaximized = false } = win;
        const ref = useRef(null);

        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            el.style.display = "block";

            gsap.fromTo(el,
                { opacity: 0, scale: 0.8, y: 40 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
            );
        }, [isOpen])

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, { onPress: () => focusWindow(windowKey) })

            return () => instance.kill();
        }, [])

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            // hide when closed or minimized
            el.style.display = (!isOpen || isMinimized) ? 'none' : 'block';
        }, [isOpen, isMinimized])

        const handleFocus = () => {
            if (setFocusWindow) setFocusWindow(windowKey)
        }

        const containerClass = `${isMaximized ? 'fixed inset-0' : 'absolute'} focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/40`;

        return <section id={windowKey} ref={ref} style={{ zIndex, display: (!isOpen || isMinimized) ? 'none' : 'block' }} className={containerClass} onMouseDown={() => focusWindow(windowKey)} tabIndex={0} role="dialog" aria-label={`${windowKey} window`} onFocus={handleFocus}>
            <Component {...props} />
        </section>
    }

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;
    
    return Wrapped
}

export default WindowWrapper