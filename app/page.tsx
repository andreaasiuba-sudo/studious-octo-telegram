"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAccessStore, validateKey } from "@/lib/access-store";

const backgroundImages = [
  "/images/portal-background.png",
  "/images/hero-background-v3.png",
  "/images/hero-background-v4.png"
];

export default function PortalPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const router = useRouter();
  const hasAccess = useAccessStore((state) => state.hasAccess);
  const setAccess = useAccessStore((state) => state.setAccess);

  // Carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Eliminada la redirección automática para que siempre empiece desde el principio
  useEffect(() => {
    // Solo nos aseguramos de que el estado inicial sea el correcto al montar
    setShowStartButton(true);
    setShowCountdown(false);
    setShowContent(false);
  }, []);

  const startCountdown = () => {
    setShowStartButton(false);
    setShowCountdown(true);
    setCountdown(10);
  };

  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showCountdown && countdown === 0) {
      setShowCountdown(false);
      setTimeout(() => setShowContent(true), 500);
    }
  }, [countdown, showCountdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Small delay for effect
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (validateKey(key)) {
      setAccess(true);
      // Animate out then navigate
      setShowContent(false);
      await new Promise((resolve) => setTimeout(resolve, 600));
      router.push("/carta");
    } else {
      setError("No es la palabra correcta.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Image with Overlay - ONLY visible before clicking Start */}
      <AnimatePresence initial={false}>
        {showStartButton && (
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={backgroundImages[currentBgIndex]}
              alt="Background"
              className="w-full h-full object-cover scale-105"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Snowfall Effect - Ultra Mega Intensified */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(550)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 4.5 + 0.5 + "px",
              height: Math.random() * 4.5 + 0.5 + "px",
              left: Math.random() * 100 + "%",
              top: "-10px",
              opacity: Math.random() * 0.85 + 0.1,
              filter: Math.random() > 0.6 ? `blur(${Math.random() * 2.5}px)` : "none",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: ["0px", (Math.random() - 0.5) * 200 + "px"],
            }}
            transition={{
              duration: Math.random() * 18 + 4,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 25,
            }}
          />
        ))}
      </div>

      {/* Camouflaged Header */}
      <div className={`w-full py-4 px-6 flex items-center justify-between opacity-20 hover:opacity-100 transition-opacity duration-500 z-20 ${showStartButton ? 'text-white' : 'text-foreground'}`}>
        <div className="font-serif text-xl tracking-wider">
          ∞
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <div className={`w-12 h-px ${showStartButton ? 'bg-white/40' : 'bg-border'}`}></div>
          <div className={`w-8 h-px ${showStartButton ? 'bg-white/40' : 'bg-border'}`}></div>
          <div className={`w-16 h-px ${showStartButton ? 'bg-white/40' : 'bg-border'}`}></div>
          <div className={`w-10 h-px ${showStartButton ? 'bg-white/40' : 'bg-border'}`}></div>
        </nav>
        <div className={`w-5 h-5 border rounded-sm opacity-50 ${showStartButton ? 'border-white' : 'border-border'}`}></div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #111 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          {showStartButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 flex flex-col items-center gap-12"
            >
              <div className="relative flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6 text-4xl opacity-60"
                >
                  ❄️
                </motion.div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-[#3D3D33]/70 blur-2xl -inset-y-6 -inset-x-12 rounded-full" />
                  <h2 className="relative font-serif text-5xl md:text-8xl text-white tracking-tighter leading-none text-center px-4">
                    Regalo de Navidad 2026
                  </h2>
                </div>
              </div>
              
              <motion.button
                onClick={startCountdown}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  color: "#111"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-16 py-4 border border-white/30 text-white font-sans text-xs tracking-[0.4em] uppercase transition-all backdrop-blur-sm bg-white/5"
              >
                Empezar
              </motion.button>
            </motion.div>
          )}

          {showCountdown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col items-center gap-12"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-border/5 blur-2xl -inset-y-4 -inset-x-8 rounded-full" />
                <div className="relative font-sans text-xs tracking-[0.4em] text-muted uppercase flex items-center justify-center gap-2">
                  <span>Preparando regalo para Andrea</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ...
                  </motion.span>
                </div>
              </div>
              
              {/* Barra de progreso minimalista */}
              <div className="w-64 md:w-96">
                <div className="h-[1px] bg-border/20 relative overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-foreground/40"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ 
                      duration: 10, 
                      ease: "linear" 
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md flex flex-col items-center text-center gap-12"
          >
            {/* Main content */}
            <div className="space-y-4">
              <h1 className="font-serif text-4xl md:text-5xl text-foreground tracking-tighter leading-tight">
                Esto no es<br />solo un regalo.
              </h1>
              <p className="font-serif text-lg text-muted italic">
                Esto no es solo para ti.
              </p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="w-full space-y-8"
            >
              <div className="relative">
                <input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Clave: ¿Cuál es nuestro postre favorito?"
                  className="w-full px-4 py-4 bg-transparent border-b border-border text-center font-sans text-sm tracking-widest placeholder:text-muted/30 focus:outline-none focus:border-foreground transition-colors duration-500"
                  autoFocus
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-sans text-[10px] tracking-widest text-muted uppercase"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isLoading || !key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-foreground text-background font-sans text-[10px] tracking-[0.4em] uppercase hover:bg-foreground/90 transition-all shadow-xl shadow-foreground/5 disabled:opacity-30"
              >
                {isLoading ? "..." : "Entrar"}
              </motion.button>
            </motion.form>

            <div className="h-px bg-border/30 w-12" />
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
