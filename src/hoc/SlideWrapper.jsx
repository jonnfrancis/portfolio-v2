import useSlideStore from "#store/slide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useLayoutEffect, useRef } from "react";

const SlideWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusSlide, closeSlide, slides } = useSlideStore();
    const { isOpen, zIndex } = slides[windowKey];
    const ref = useRef(null);
    const draggableRef = useRef(null);

    // Slide-in animation when opened (iOS-like)
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.36, ease: "power3.out" }
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
        onPress: () => focusSlide(windowKey),
        onDragEnd: function () {
          const threshold = 120; // px to drag to trigger close
          const y = this.y;
          if (y > threshold) {
            // animate offscreen then close
            gsap.to(el, {
              y: window.innerHeight,
              opacity: 0,
              duration: 0.28,
              ease: "power1.in",
              onComplete: () => closeSlide(windowKey),
            });
          } else {
            // snap back
            gsap.to(el, { y: 0, duration: 0.22, ease: "power3.out" });
          }
        },
      });

      draggableRef.current = instances[0];

      return () => {
        try {
          draggableRef.current && draggableRef.current.kill();
        } catch (e) {
          // noop
          console.log("Error killing Draggable instance:", e); 
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
        style={{ zIndex }}
        className="absolute max-h-[82vh] max-h-max inset-0 pointer-events-auto rounded-t-2xl bg-white/6 backdrop-blur-md shadow-lg overflow-hidden"
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `SlideWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default SlideWrapper;
