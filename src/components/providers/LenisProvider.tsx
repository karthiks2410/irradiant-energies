"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: ReactNode;
}

/**
 * Mounts Lenis (smooth wheel scrolling) and wires it to GSAP's ticker so
 * ScrollTrigger animations stay in sync. Site-wide.
 *
 * Lenis hijacks the wheel — when its raf loop is leaked or stops getting
 * called, the page can feel "stuck" because Lenis is suppressing native
 * deltas while not advancing its own scroll position. The cleanup
 * function below previously passed an inline arrow to gsap.ticker.remove,
 * which created a new function reference and so didn't actually
 * unregister the ticker. Fixed by hoisting the ticker callback into a
 * named const so add() and remove() see the same reference.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    // Single named callback so add() and remove() see the same reference.
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
