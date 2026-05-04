"use client";

import { useRef, useEffect, useCallback } from "react";

interface UseVideoLoopOptions {
  fadeInDuration?: number;
  fadeOutDuration?: number;
  loopDelay?: number;
}

export function useVideoLoop(options: UseVideoLoopOptions = {}) {
  const {
    fadeInDuration = 0.5,
    fadeOutDuration = 0.5,
    loopDelay = 100,
  } = options;

  const videoRef = useRef<HTMLVideoElement>(null);
  const rafIdRef = useRef<number | null>(null);

  const updateOpacity = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || video.paused) {
      rafIdRef.current = requestAnimationFrame(updateOpacity);
      return;
    }

    const { currentTime, duration } = video;
    const fadeOutStart = duration - fadeOutDuration;

    let opacity = 1;

    if (currentTime < fadeInDuration) {
      opacity = currentTime / fadeInDuration;
    } else if (currentTime > fadeOutStart) {
      opacity = (duration - currentTime) / fadeOutDuration;
    }

    video.style.opacity = String(Math.max(0, Math.min(1, opacity)));
    rafIdRef.current = requestAnimationFrame(updateOpacity);
  }, [fadeInDuration, fadeOutDuration]);

  const handleVideoEnd = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = "0";

    setTimeout(() => {
      video.currentTime = 0;
      video.play().catch(() => {});
    }, loopDelay);
  }, [loopDelay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = "0";
    video.style.transition = "none";

    video.addEventListener("ended", handleVideoEnd);
    rafIdRef.current = requestAnimationFrame(updateOpacity);

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleVideoEnd, updateOpacity]);

  return { videoRef };
}
