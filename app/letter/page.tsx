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
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-accent/20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-prose text-center">
        <div className="space-y-8 min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="popLayout">
            {letterParagraphs.slice(0, currentIndex + 1).map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`font-serif text-lg md:text-xl text-foreground leading-relaxed whitespace-pre-line ${
                  index < currentIndex ? "opacity-30" : "opacity-100"
                } transition-opacity duration-1000`}
              >
                {paragraph}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 h-24 flex flex-col items-center justify-center">
          {!isComplete ? (
            <motion.button
              onClick={handleNext}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              className="group flex flex-col items-center gap-2"
            >
              <span className="font-sans text-[10px] tracking-[0.2em] text-muted uppercase">
                Toca la flecha derecha o haz click
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-pulse">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="h-px bg-border w-32 mx-auto" />
              
              <motion.button
                onClick={() => router.push("/home")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-foreground text-background font-sans text-sm tracking-wider hover:bg-foreground/90 transition-all shadow-xl shadow-foreground/10"
              >
                Descubrir el regalo
              </motion.button>

              <p className="font-serif text-base text-muted italic">
                Con todo mi cariño
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
