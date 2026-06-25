"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

function LinkedInIcon({ className }: { className?: string }) {
  // LinkedIn is a brand mark; lucide-react doesn't ship it, so inline the glyph.
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

interface TeamMember {
  name: string;
  shortName?: string;
  role: string;
  description: string;
  bio: string;
  linkedin?: string;
  // TODO: replace with real headshot when team photos are ready
  image?: string;
}

const team: TeamMember[] = [
  {
    name: "Keerthi Raj K C",
    shortName: "Keerthi",
    role: "Founder & CEO",
    description: "Driving the transition to renewable energy.",
    bio: "With a Masters in Renewable Systems, Keerthi has spearheaded over 20+ large-scale solar installations across Germany and India.",
    // TODO: replace with real headshot when team photos are ready
    linkedin: "#", // TODO: add LinkedIn URL
  },
  {
    name: "Maruthi S Pavan",
    shortName: "Pavan",
    role: "Head of Engineering",
    description: "Lead architect of our high-efficiency solar grid systems.",
    bio: "Pavan is a civil engineering veteran with deep expertise designing distributed solar systems for the Indian grid.",
    // TODO: replace with real headshot when team photos are ready
    linkedin: "#", // TODO: add LinkedIn URL
  },
  {
    name: "Maruthi S Tejas",
    shortName: "Tejas",
    role: "Head of Marketing",
    description: "Ensuring every project leaves a positive footprint on our planet.",
    bio: "Tejas leads brand and growth, translating Irradiant's engineering depth into stories customers and partners trust.",
    // TODO: replace with real headshot when team photos are ready
    linkedin: "#", // TODO: add LinkedIn URL
  },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function TeamCard({
  member,
  index,
  reduceMotion,
}: {
  member: TeamMember;
  index: number;
  reduceMotion: boolean;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const initials = getInitials(member.name);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: EASE_OUT_EXPO,
      }}
      className="h-[460px] w-full cursor-pointer [perspective:1000px]"
      onClick={() => setIsFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped((f) => !f);
        }
      }}
      aria-label={`${member.name}, ${member.role}. Tap to view bio.`}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
          <div
            aria-hidden="true"
            className="w-36 h-36 mb-6 rounded-full flex items-center justify-center flex-shrink-0 bg-[#52842D] text-white font-display font-semibold text-4xl tracking-wide select-none"
          >
            {initials}
          </div>
          <h3 className="font-display text-xl font-semibold text-[#1d1d1f] mb-1">
            {member.name}
          </h3>
          <p className="text-sm font-semibold text-[#52842D] tracking-wide mb-3">
            {member.role}
          </p>
          <p className="text-[#6F6F6F] text-sm leading-relaxed">
            {member.description}
          </p>
          <div className="mt-auto pt-4 flex items-center gap-1.5 text-[#6F6F6F]/80 text-xs font-medium">
            <span>Tap to view bio</span>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#52842D] text-white rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
          <h3 className="font-display text-xl font-semibold text-white mb-4">
            About {member.shortName || member.name.split(" ")[0]}
          </h3>
          <p className="text-white/90 leading-relaxed mb-8 max-w-xs">
            {member.bio}
          </p>
          {member.linkedin && (
            <a
              href={member.linkedin}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/15 hover:bg-white/25 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              aria-label={`${member.name} on LinkedIn`}
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function AboutTeam() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="py-24 md:py-32 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight">
            Meet the Visionaries
          </h2>
          <p className="text-[#6F6F6F] mt-3 text-lg">
            The experts leading the charge toward energy independence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {team.map((member, i) => (
            <TeamCard
              key={member.name}
              member={member}
              index={i}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
