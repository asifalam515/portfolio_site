import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const NAV_OFFSET = 96;

type IdleCallbackHandle = number;

const runWhenIdle = (callback: () => void) => {
  if ("requestIdleCallback" in window) {
    return (
      window as Window & {
        requestIdleCallback: (
          cb: IdleRequestCallback,
          opts?: IdleRequestOptions,
        ) => IdleCallbackHandle;
      }
    ).requestIdleCallback(() => callback(), { timeout: 900 });
  }

  return window.setTimeout(callback, 220);
};

const cancelIdle = (id: IdleCallbackHandle) => {
  if ("cancelIdleCallback" in window) {
    (
      window as Window & { cancelIdleCallback: (handle: number) => void }
    ).cancelIdleCallback(id);
    return;
  }

  window.clearTimeout(id);
};

const ScrollExperience = () => {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    let ctx: ReturnType<typeof gsap.context> | null = null;

    const idleId = runWhenIdle(() => {
      ctx = gsap.context(() => {
        // Animation Added: reusable parallax behavior via data attributes.
        const parallaxElements =
          gsap.utils.toArray<HTMLElement>("[data-parallax]");

        parallaxElements.forEach((element) => {
          const speed = Number(element.dataset.parallax ?? "0.12");
          const triggerSelector = element.dataset.parallaxTrigger;
          const triggerElement = triggerSelector
            ? document.querySelector(triggerSelector)
            : element;

          if (!triggerElement) return;

          gsap.set(element, { willChange: "transform" });

          gsap.to(element, {
            yPercent: speed * -100,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: triggerElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          });
        });
      });
    });

    return () => {
      cancelIdle(idleId);
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  useEffect(() => {
    // Animation Added: smooth in-page anchor scrolling transition.
    const handleAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!target) return;

      const hash = target.getAttribute("href");
      if (!hash || hash === "#") return;

      const id = decodeURIComponent(hash.slice(1));
      const section = document.getElementById(id);
      if (!section) return;

      event.preventDefault();

      gsap.to(window, {
        duration: 1.1,
        ease: "power3.out",
        scrollTo: { y: section, offsetY: NAV_OFFSET },
        overwrite: "auto",
      });

      history.pushState(null, "", hash);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
};

export default ScrollExperience;
