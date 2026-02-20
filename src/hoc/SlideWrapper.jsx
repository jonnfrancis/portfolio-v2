import useSlideStore from "#store/slide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect, useLayoutEffect, useRef } from "react";
import haptics from "#utils/haptics";

const SlideWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusSlide, closeSlide, slides = {}, hapticsEnabled } = useSlideStore();
    const slide = (slides && slides[windowKey]) || {};
    const { isOpen = false, zIndex = 0 } = slide;
    const ref = useRef(null);
    const draggableRef = useRef(null);
    const backdropRef = useRef(null);

    // Slide-in animation when opened (iOS-like)
    useEffect(() => {
      const el = ref.current;
      const backdrop = backdropRef.current;
      if (!el || !backdrop) return;

      // ensure visible when opening
      if (isOpen) {
        el.style.display = 'block';
        backdrop.style.display = 'block';

        gsap.killTweensOf([el, backdrop]);
        gsap.set(el, { y: 200, opacity: 0, scale: 0.995, borderRadius: 18, willChange: 'transform,opacity' });
        gsap.set(backdrop, { autoAlpha: 0 });

        gsap.to(backdrop, { autoAlpha: 1, duration: 0.32, ease: 'power3.out' });
        gsap.to(el, { y: 0, opacity: 1, scale: 1, duration: 0.36, ease: 'power3.out' });
      }
    }, [isOpen]);

    // Make the element draggable vertically; swipe down to dismiss
    useGSAP(() => {
      const el = ref.current;
      const backdrop = backdropRef.current;
      if (!el || !backdrop) return;

      const header = el.querySelector('#window-header') || el;

      let instances = null;

      try {
        instances = Draggable.create(el, {
          type: "y",
          trigger: header,
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
            const t = Math.min(Math.max(y, 0) / 800, 0.06);
            // subtle scale and rounding feedback
            gsap.set(el, { scale: 1 - t, borderRadius: 18 + t * 12 });

            const alpha = Math.max(0, 1 - Math.abs(y) / (window.innerHeight * 0.7));
            gsap.set(backdrop, { autoAlpha: alpha });
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

            let fastFlick = false;
            try {
              const dir = this.getDirection && this.getDirection("velocity");
              const vy = dir && typeof dir.y === 'number' ? dir.y : 0;
              fastFlick = this.endY > 0 && Math.abs(vy) > 0.65;
            } catch (e) {
              // ignore velocity errors
              if (import.meta.env.DEV) console.debug("Velocity check error", e)
            }
            if (y > threshold || fastFlick) {
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
              gsap.to(backdrop, { autoAlpha: 0, duration: 0.22 });
            } else {
              try {
                if (hapticsEnabled && haptics && haptics.impact) haptics.impact('light')
              } catch (e) {
                if (import.meta.env.DEV) console.debug("Haptics snap-back error", e)
              }
              // snap back
              gsap.to(el, { y: 0, duration: 0.42, ease: 'elastic.out(1, 0.6)' });
              gsap.to(el, { scale: 1, borderRadius: 18, duration: 0.32, ease: 'power3.out' });
              gsap.to(backdrop, { autoAlpha: 1, duration: 0.22, ease: 'power3.out' });
            }
          },
        });
      } catch (e) {
        if (import.meta.env.DEV) console.debug("Draggable init error", e);
      }


      const inst = Array.isArray(instances) ? instances[0] : null; 
      draggableRef.current = inst;

      return () => {
        try {
          draggableRef.current?.kill();
          gsap.killTweensOf([el, backdrop]);
        } catch (e) {
          // noop
          if (import.meta.env.DEV) console.debug("Draggable kill error", e);
        }
      };
    }, [closeSlide, focusSlide, hapticsEnabled, windowKey]);

    // Animate when a close is requested via the store (e.g., X button)
    useEffect(() => {
      const closing = slide.isClosing;
      if (!closing) return;
      const el = ref.current;
      const backdrop = backdropRef.current;
      if (!el || !backdrop) return;

      gsap.killTweensOf([el, backdrop]);
      gsap.to(backdrop, { autoAlpha: 0, duration: 0.22, ease: 'power2.in' });
      gsap.to(el, {
        y: window.innerHeight,
        opacity: 0,
        duration: 0.5,
        ease: 'power1.in',
        onComplete: () => {
          const { clearClosingFlag, closeSlide } = useSlideStore.getState();
          clearClosingFlag && clearClosingFlag(windowKey);
          closeSlide && closeSlide(windowKey);
        }
      });
    }, [slide.isClosing]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
      // ensure element resets transform when hidden
      //   if (!isOpen) {
      //     gsap.set(el, { clearProps: "all" });
      //   }
    }, [isOpen]);

    const onBackdropClick = (e) => {
      e.stopPropagation();
      closeSlide(windowKey);
    };

    return (
      <>
        <div
          ref={backdropRef}
          onClick={onBackdropClick}
          style={{ zIndex: Math.max(0, zIndex - 1), display: isOpen ? 'block' : 'none' }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto"
        />


        <section
          id={windowKey}
          ref={ref}
          style={{ zIndex: Number.isFinite(zIndex) ? zIndex : 0, display: isOpen ? 'block' : 'none' }}
          className="absolute max-h-max inset-0 pointer-events-auto rounded-t-2xl bg-white/6 backdrop-blur-md shadow-lg overflow-hidden"
        >
          <Component {...props} />
        </section>
      </>
    );
  };

  Wrapped.displayName = `SlideWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default SlideWrapper;
