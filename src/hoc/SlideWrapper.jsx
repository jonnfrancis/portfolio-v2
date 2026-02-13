import useSlideStore from "#store/slide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useLayoutEffect, useRef } from "react";
import haptics from "#utils/haptics";

const SlideWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusSlide, closeSlide, slides = {}, hapticsEnabled } = useSlideStore();
    const slide = (slides && slides[windowKey]) || {};
    const { isOpen = false, zIndex = 0 } = slide;
    const ref = useRef(null);
    const draggableRef = useRef(null);

    // Slide-in animation when opened (iOS-like)
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      // apply will-change only during the animation for better performance
      el.style.willChange = 'transform, opacity';
      gsap.fromTo(
        el,
        { y: 200, opacity: 0, scale: 0.9, borderRadius: 18 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', onComplete: () => { el.style.willChange = '' } }
      );
    }, [isOpen]);

    // Make the element draggable vertically; swipe down to dismiss
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;
      

      const instances = Draggable.create(el, {
        type: "y",
        edgeResistance: 0.85,
        inertia: false,
        bounds: { minY: -window.innerHeight, maxY: window.innerHeight },
        onPress: function () {
          focusSlide(windowKey)
          try {
            if (hapticsEnabled && haptics && haptics.impact) haptics.impact('light')
          } catch (e) {
            if (import.meta.env.DEV) console.debug("Haptics press error", e)
          }
        },
        onDrag: function () {
          const y = this.y;
          const t = Math.min(Math.abs(y) / 800, 0.06);
          // subtle scale and rounding feedback
          gsap.set(el, { scale: 1 - t, borderRadius: 18 + t * 12 });
          // small tick when crossing a small drag threshold to give feedback
          try {
            if (hapticsEnabled && haptics && haptics.impact) {
              const tickThreshold = 40
              if (Math.abs(y) > tickThreshold && !this._hapticTicked) {
                haptics.impact('light')
                this._hapticTicked = true
              }
              if (Math.abs(y) <= tickThreshold) this._hapticTicked = false
            }
          } catch (e) {
            if (import.meta.env.DEV) console.debug("Haptics drag error", e)
          }
        },
        onDragEnd: function () {
          const threshold = 120; // px to drag to trigger close
          const y = this.y;
          if (y > threshold) {
            try {
              if (hapticsEnabled && haptics && haptics.impact) haptics.impact('medium')
            } catch (e) {
              if (import.meta.env.DEV) console.debug("Haptics close error", e)
            }
            gsap.to(el, {
              y: window.innerHeight,
              opacity: 0,
              duration: 0.28,
              ease: "power1.in",
              onComplete: () => closeSlide(windowKey),
            });
          } else {
            try {
              if (hapticsEnabled && haptics && haptics.impact) haptics.impact('light')
            } catch (e) { 
              if (import.meta.env.DEV) console.debug("Haptics snap-back error", e)
            }
            // snap back
            gsap.to(el, { y: 0, duration: 0.42, ease: 'elastic.out(1, 0.6)' });
            gsap.to(el, { scale: 1, borderRadius: 18, duration: 0.32, ease: 'power3.out' });
          }
        },
      });

      draggableRef.current = instances[0];

      return () => {
        try {
          draggableRef.current && draggableRef.current.kill();
        } catch (e) {
          // noop
          if (import.meta.env.DEV) console.debug("Draggable kill error", e);
        }
      };
    }, []);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
      // ensure element resets transform when hidden
      //   if (!isOpen) {
      //     gsap.set(el, { clearProps: "all" });
      //   }
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex: Number.isFinite(zIndex) ? zIndex : 0 }}
        className="absolute max-h-max inset-0 pointer-events-auto rounded-t-2xl bg-white/6 backdrop-blur-md shadow-lg overflow-hidden"
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `SlideWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default SlideWrapper;
