"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Lightweight, accessible accordion. Hand-rolled instead of pulling in
 * @radix-ui/react-accordion — keeps the bundle small and the API tiny for
 * our limited use cases. Single-open behaviour by default; pass
 * allowMultiple to switch to multi-open.
 */

export interface AccordionItem {
  /** Unique id for the item — used for keying + aria-controls. */
  id: string;
  question: ReactNode;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** When true, multiple items can be open at once. Default: false (single-open). */
  allowMultiple?: boolean;
  /** Optional id of an item to be open by default. */
  defaultOpenId?: string;
}

export function Accordion({ items, allowMultiple = false, defaultOpenId }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(defaultOpenId ? [defaultOpenId] : []),
  );
  const reduceMotion = useReducedMotion();

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="divide-y divide-gray-100 border-y border-gray-100">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const panelId = `accordion-panel-${item.id}`;
        const buttonId = `accordion-button-${item.id}`;

        return (
          <div key={item.id}>
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
              className="flex items-center justify-between gap-4 w-full py-5 px-1 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#52842D]/30 rounded-md"
            >
              <span className="text-sm sm:text-base font-medium text-[#1d1d1f] leading-snug">
                {item.question}
              </span>
              <ChevronDown
                className={`shrink-0 w-5 h-5 text-[#6F6F6F] group-hover:text-[#52842D] transition-all duration-300 ${
                  isOpen ? "rotate-180 text-[#52842D]" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          height: "auto",
                          opacity: 1,
                          transition: { duration: 0.28, ease: EASE_OUT_EXPO },
                        }
                  }
                  exit={
                    reduceMotion
                      ? undefined
                      : {
                          height: 0,
                          opacity: 0,
                          transition: { duration: 0.2, ease: EASE_OUT_EXPO },
                        }
                  }
                  className="overflow-hidden"
                >
                  <div className="pb-5 px-1 pr-9 text-sm text-[#6F6F6F] leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
