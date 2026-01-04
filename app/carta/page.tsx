"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAccessStore } from "@/lib/access-store";

const letterParagraphs = [
  "Quería regalarte algo que no tuvieras, algo que no se pudiera olvidar...",
  "Quería que tuvieras eso que no puedes comprar pero que sí sueñas con tener algun día.",
  "Quería que supieras cuánto confío en ti y recordarte que eres capaz de todo.",
  "Porque si quieres, lo haces.",
  "Porque si lo haces, lo haces como la mejor.",
  "Esto es solo un pedacito de mí para darte un pequeño empujón. Para que compartas algo de ti con todo el mundo y para que todos puedan conocerte como te conozco yo.",
  "Porque quiero que construyas aquello en lo que crees…",
];

export default function LetterPage() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [yesButtonPosition, setYesButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonHover, setNoButtonHover] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const hasAccess = useAccessStore((state) => state.hasAccess);

  useEffect(() => {
    setMounted(true);
    
    // Limpiar timeout al desmontar
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
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
              
              <div className="space-y-8">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-xl md:text-2xl text-foreground mb-8"
                >
                  ¿Estás lista para descubrir tu regalo?
                </motion.p>

                <div className="flex items-center justify-center gap-6 relative">
                  {/* Botón "Sí" que se mueve y NO es clicable */}
                  <motion.button
                    onMouseEnter={() => {
                      // Mover el botón inmediatamente cuando el mouse se acerca
                      const maxX = window.innerWidth - 300;
                      const maxY = window.innerHeight - 200;
                      setYesButtonPosition({
                        x: (Math.random() - 0.5) * maxX,
                        y: (Math.random() - 0.5) * maxY,
                      });
                    }}
                    onMouseMove={() => {
                      // Seguir moviendo mientras el mouse está cerca
                      const maxX = window.innerWidth - 300;
                      const maxY = window.innerHeight - 200;
                      setYesButtonPosition({
                        x: (Math.random() - 0.5) * maxX,
                        y: (Math.random() - 0.5) * maxY,
                      });
                    }}
                    onClick={(e) => {
                      // Prevenir cualquier acción al hacer clic
                      e.preventDefault();
                      e.stopPropagation();
                      // Mover el botón de nuevo
                      const maxX = window.innerWidth - 300;
                      const maxY = window.innerHeight - 200;
                      setYesButtonPosition({
                        x: (Math.random() - 0.5) * maxX,
                        y: (Math.random() - 0.5) * maxY,
                      });
                    }}
                    animate={{
                      x: yesButtonPosition.x,
                      y: yesButtonPosition.y,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    style={{
                      position: "relative",
                    }}
                    className="px-8 py-3 bg-foreground text-background font-sans text-sm tracking-[0.2em] uppercase transition-all shadow-lg cursor-not-allowed z-10"
                  >
                    Sí
                  </motion.button>

                  {/* Botón "No" que cambia a "Sí" después de 3 segundos de hover */}
                  <motion.button
                    onMouseEnter={() => {
                      // Iniciar timeout de 3 segundos
                      hoverTimeoutRef.current = setTimeout(() => {
                        setNoButtonHover(true);
                      }, 3000);
                    }}
                    onMouseLeave={() => {
                      // Limpiar timeout y resetear el estado
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current);
                        hoverTimeoutRef.current = null;
                      }
                      setNoButtonHover(false);
                    }}
                    onClick={() => router.push("/inicio")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-border text-foreground font-sans text-sm tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all shadow-lg cursor-pointer relative z-10"
                  >
                    {noButtonHover ? "Sí" : "No"}
                  </motion.button>
                </div>

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
