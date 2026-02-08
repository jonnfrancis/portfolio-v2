import useSlideStore from "#store/slide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect, useLayoutEffect, useRef } from "react";

const getPrefersReducedMotion = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
};

const SlideWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusSlide, closeSlide, slides } = useSlideStore();
    const { isOpen, zIndex } = slides[windowKey] || { isOpen: false, zIndex: 1 };

    const ref = useRef(null);
    const draggableRef = useRef(null);
    const openerRef = useRef(null); // element that had focus before open
    const rdm = getPrefersReducedMotion();

    // Capture opener focus to restore later
    useEffect(() => {
      if (isOpen) {
        openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      }
    }, [isOpen]);

    // Slide-in animation when opened (iOS-like)
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      // Ensure visible for animation and screen readers
      el.style.display = "block";
      el.setAttribute("aria-hidden", "false");

      // Focus the container for accessibility
      el.tabIndex = -1;
      try {
        el.focus({ preventScroll: true });
      } catch {}

      const from = { y: 200, opacity: 0 };
      const to = { y: 0, opacity: 1, duration: rdm ? 0.001 : 0.36, ease: rdm ? "none" : "power3.out" };

      gsap.fromTo(el, from, to);
    }, [isOpen, rdm]);

    // Make the element draggable vertically; swipe down to dismiss
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      // Helper to compute bounds based on current viewport
      const computeBounds = () => ({ minY: -window.innerHeight, maxY: window.innerHeight });

      const instances = Draggable.create(el, {
        type: "y",
        edgeResistance: 0.85,
        inertia: false,
        bounds: computeBounds(),
        allowNativeTouchScrolling: true,
        minimumMovement: 8, // avoid accidental drags on taps
        onPress(e) {
          focusSlide(windowKey);

          // Only start dismiss-drag if press originated in the top "grab area" (32px)
          const rect = el.getBoundingClientRect();
          const pressY = (e && e.clientY) || (e && e.touches && e.touches[0] && e.touches[0].clientY);
          if (pressY != null && pressY > rect.top + 32) {
            // Prevent drag; allow internal scroll and clicks
            this.endDrag();
          }
        },
        onDragEnd: function () {
          // If not open, do nothing
          if (!isOpen) return;

          const threshold = 120; // px to drag to trigger close
          const y = this.y;
          if (y > threshold) {
            // animate offscreen then close
            gsap.to(el, {
              y: window.innerHeight,
              opacity: 0,
              duration: rdm ? 0.001 : 0.28,
              ease: rdm ? "none" : "power1.in",
              onComplete: () => {
                closeSlide(windowKey);
              },
            });
          } else {
            // snap back
            gsap.to(el, { y: 0, duration: rdm ? 0.001 : 0.22, ease: rdm ? "none" : "power3.out" });
          }
        },
      });

      draggableRef.current = instances && instances[0] ? instances[0] : null;

      // Update bounds on resize/orientation changes
      const handleResize = () => {
        try {
          if (draggableRef.current) {
            draggableRef.current.applyBounds({ minY: -window.innerHeight, maxY: window.innerHeight });
          }
        } catch {}
      };
      window.addEventListener("resize", handleResize);
      window.addEventListener("orientationchange", handleResize);

      return () => {
        try {
          if (draggableRef.current) {
            draggableRef.current.kill();
            draggableRef.current = null;
          }
        } catch {}
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("orientationchange", handleResize);
      };
    }, [focusSlide, closeSlide, windowKey, isOpen, rdm]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen) {
        el.style.display = "block";
        el.setAttribute("aria-hidden", "false");
      } else {
        el.setAttribute("aria-hidden", "true");
        el.style.display = "none";
        // clear transforms so the next open starts clean
        try {
          gsap.set(el, { clearProps: "transform,opacity" });
        } catch {}
        // restore focus to the opener if it still exists in DOM
        const opener = openerRef.current;
        if (opener && typeof opener.focus === "function" && document.body.contains(opener)) {
          try {
            opener.focus();
          } catch {}
        }
      }
    }, [isOpen]);

    // Determine aria-labelledby: allow prop override, else try `${windowKey}-title`
    const labelledBy = props.labelledBy || `${windowKey}-title`;

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-hidden={isOpen ? "false" : "true"}
        className="absolute inset-0 pointer-events-auto rounded-t-2xl bg-white/50 backdrop-blur-md shadow-lg overflow-hidden max-h-[82vh]"
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `SlideWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default SlideWrapper;