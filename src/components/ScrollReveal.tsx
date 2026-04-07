import { useGSAPScopedAnimation } from "@/hooks/use-gsap-scoped-animation";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ReactNode, useCallback, useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollReveal = ({ children, className = "", delay = 0 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Animation Added: section-level reveal on scroll.
  const setupReveal = useCallback(
    ({ reducedMotion }: { reducedMotion: boolean }) => {
      if (!ref.current) return;

      if (reducedMotion) {
        gsap.set(ref.current, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(ref.current, { willChange: "transform, opacity" });

      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.78,
          delay,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 84%",
            once: true,
          },
          onComplete: () => {
            gsap.set(ref.current, { clearProps: "willChange" });
          },
        },
      );
    },
    [delay],
  );

  useGSAPScopedAnimation({
    scopeRef: ref,
    setup: setupReveal,
    deps: [delay],
    reducedMotion: prefersReducedMotion,
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
