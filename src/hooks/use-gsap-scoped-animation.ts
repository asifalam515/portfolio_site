import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

type SetupContext = {
  scope: HTMLElement;
  reducedMotion: boolean;
};

type SetupFn = (ctx: SetupContext) => void;

type UseGSAPScopedAnimationOptions = {
  scopeRef: RefObject<HTMLElement | null>;
  setup: SetupFn;
  deps?: ReadonlyArray<unknown>;
  enabled?: boolean;
  reducedMotion?: boolean;
};

// Animation Utility Added: reusable GSAP-scoped lifecycle wrapper.
export const useGSAPScopedAnimation = ({
  scopeRef,
  setup,
  deps = [],
  enabled = true,
  reducedMotion = false,
}: UseGSAPScopedAnimationOptions) => {
  useLayoutEffect(() => {
    if (!enabled || !scopeRef.current) return;

    const scope = scopeRef.current;
    const ctx = gsap.context(() => {
      setup({ scope, reducedMotion });
    }, scopeRef);

    return () => {
      ctx.revert();
    };
  }, [enabled, reducedMotion, scopeRef, setup, ...deps]);
};
