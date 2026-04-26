"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

ScrollTrigger.defaults({
  toggleActions: "play none none reverse",
  markers: false,
});

export { gsap, ScrollTrigger, useGSAP };
