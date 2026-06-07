"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface TeamMember {
  name: string;
  shortName?: string;
  role: string;
  description: string;
  bio: string;
  image: string;
  linkedin?: string;
}

const team: TeamMember[] = [
  {
    name: "Keerthi Raj K C",
    shortName: "Keerthi",
    role: "Founder & CEO",
    description:
      "Driving the transition to renewable energy",
    bio: "With a Masters in Renewable Systems, Keerthi has spearheaded over 20+ large-scale solar installations in Germany.",
    image: "/team/keerthi-raj.jpg",
    linkedin: "#",
  },
  {
    name: "Maruthi S Pavan",
    shortName: "Pavan",
    role: "Head of Engineering",
    description:
      "Lead architect of our high-efficiency solar grid systems.",
    bio: "Pavan is an civil engineering veteran.",
    image: "/team/maruthi-pavan.jpg",
    linkedin: "#",
  },
  {
    name: "Maruthi S Tejas",
    shortName: "Tejas",
    role: "Marketing Head",
    description:
      "Ensuring every project leaves a positive footprint on our planet.",
    bio: "Tejas is a marketing expert.",
    image: "/team/maruthi-tejas.jpg",
    linkedin: "#",
  },
  {
    name: "Karthik",
    shortName: "Karthik",
    role: "Tech Support",
    description:
      "Providing technical support to the team.",
    bio: "Karthik is a technical support expert.",
    image: "/team/karthik.jpg",
    linkedin: "#",
  },
  {
    name: "Nikhil N Gowda",
    shortName: "Nikhil",
    role: "Tech Support",
    description:
      "Providing technical support to the team.",
    bio: "Nikhil is a technical support expert.",
    image: "/team/nikhil.jpg",
    linkedin: "#",
  },
];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: EASE_OUT_EXPO,
      }}
      className="h-[460px] w-full cursor-pointer [perspective:1000px]"
      onClick={() => setIsFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-600 [transform-style:preserve-3d]"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={member.image}
            alt={member.name}
            className="w-36 h-36 mb-5 rounded-full object-cover flex-shrink-0"
          />
          <h3 className="font-display text-xl font-semibold text-[#1d1d1f] mb-1">
            {member.name}
          </h3>
          <p className="text-sm font-semibold text-[#52842D] tracking-wide mb-3">
            {member.role}
          </p>
          <p className="text-[#6e6e73] text-sm leading-relaxed">
            {member.description}
          </p>
          <div className="mt-auto pt-4 flex items-center gap-1.5 text-[#86868b] text-xs font-medium">
            <span>Tap to view bio</span>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1b4332] text-white rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-lg overflow-hidden">
          <h3 className="font-display text-xl font-semibold text-[#a5d0b9] mb-4">
            About {member.shortName || member.name.split(" ")[0]}
          </h3>
          <p className="text-white/85 leading-relaxed mb-8 max-w-xs">
            {member.bio}
          </p>
          {member.linkedin && (
            <a
              href={member.linkedin}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              aria-label={`${member.name} on LinkedIn`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function AboutTeam() {
  return (
    <section className="py-24 md:py-32 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight">
            Meet the Visionaries
          </h2>
          <p className="text-[#6e6e73] mt-3 text-lg">
            The experts leading the charge toward energy independence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
