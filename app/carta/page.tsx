"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAccessStore } from "@/lib/access-store";

const letterParagraphs = [
  "Quería regalarte algo que no se gaste.",
  "Algo que no pase de moda.",
  "Algo que no puedas encontrar en cualquier sitio.",
  "Por eso hice esto.",
  "Para que tengas algo tan único como tu propia identidad.",
  "No para vender accesorios,\nsino para elegir una pieza que hable de ti.",
  "Cada una de estas piezas ha sido creada a mano.",
  "Porque mereces algo que no tenga nadie más.",
  "Algo que te recuerde que tu esencia es irrepetible.",
];

export default function LetterPage() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const hasAccess = useAccessStore((state) => state.hasAccess);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < letterParagraphs.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext]);

  useEffect(() => {
    if (mounted && !hasAccess) {
      router.push("/");
    }
  }, [mounted, hasAccess, router]);

  if (!mounted) {
    return null;
  }

  const isComplete = currentIndex >= letterParagraphs.length;

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-12 md:py-24">
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-accent/20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-prose text-center">
        <div className="space-y-3 md:space-y-5 flex flex-col justify-center py-4 md:py-8">
          <AnimatePresence mode="popLayout">
            {letterParagraphs.slice(0, currentIndex + 1).map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`font-serif text-base md:text-lg text-foreground leading-relaxed whitespace-pre-line ${
                  index < currentIndex ? "opacity-20" : "opacity-100"
                } transition-opacity duration-1000`}
              >
                {paragraph}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-8 min-h-[120px] flex flex-col items-center justify-center">
          {!isComplete ? (
            <motion.button
              onClick={handleNext}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              className="group flex flex-col items-center gap-2"
            >
              <span className="font-sans text-[10px] tracking-[0.2em] text-muted uppercase">
                Haz click o usa la flecha derecha
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-pulse">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="h-px bg-border/50 w-24 mx-auto" />
              
              <div className="space-y-6">
                <motion.button
                  onClick={() => router.push("/inicio")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-12 py-4 bg-foreground text-background font-sans text-xs tracking-[0.3em] uppercase hover:bg-foreground/90 transition-all shadow-xl shadow-foreground/10"
                >
                  Descubrir el regalo
                </motion.button>

                <p className="font-serif text-lg text-muted italic">
                  Con todo mi cariño,<br />
                  <span className="text-foreground not-italic font-medium tracking-widest uppercase text-sm mt-2 block">David</span>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
