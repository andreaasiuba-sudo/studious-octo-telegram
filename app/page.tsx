"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAccessStore, validateKey } from "@/lib/access-store";

export default function PortalPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const router = useRouter();
  const hasAccess = useAccessStore((state) => state.hasAccess);
  const setAccess = useAccessStore((state) => state.setAccess);

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
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="/images/portal-background.png"
          alt="Background"
          className="w-full h-full object-cover scale-105"
        />
      </div>

      {/* Snowfall Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: "-10px",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: ["0px", (Math.random() - 0.5) * 50 + "px"],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Camouflaged Header */}
      <div className="w-full py-4 px-6 flex items-center justify-between opacity-20 hover:opacity-100 transition-opacity duration-500">
        <div className="font-serif text-xl tracking-wider text-foreground">
          ∞
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <div className="w-12 h-px bg-border"></div>
          <div className="w-8 h-px bg-border"></div>
          <div className="w-16 h-px bg-border"></div>
          <div className="w-10 h-px bg-border"></div>
        </nav>
        <div className="w-5 h-5 border border-border rounded-sm opacity-50"></div>
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4 text-3xl opacity-40"
              >
                ❄️
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-3xl md:text-4xl text-white mb-8 tracking-tight drop-shadow-lg"
              >
                Regalo de Navidad 2026
              </motion.h2>
              
              <motion.button
                onClick={startCountdown}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#111"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-white/40 text-white font-sans text-sm tracking-wider transition-all"
              >
                Empezar
              </motion.button>
            </motion.div>
          )}

          {showCountdown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 text-center space-y-8"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-sans text-sm tracking-[0.3em] text-white/80 uppercase flex items-center justify-center gap-1"
              >
                <span>Preparando regalo para Andrea</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ...
                </motion.span>
              </motion.div>
              
              {/* Barra de progreso minimalista */}
              <div className="w-80 mx-auto">
                <div className="h-px bg-white/20 relative overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-white/80"
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md text-center"
          >
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 space-y-3"
            >
              <h1 className="font-serif text-2xl md:text-3xl text-white tracking-tight leading-relaxed drop-shadow-md">
                Esto no es<br />solo un regalo.
              </h1>
              <p className="font-serif text-base text-white/80 italic drop-shadow-md">
                Esto no es solo para ti.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="relative">
                <input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Clave: ¿Cuál es nuestro postre favorito?"
                  className="w-full px-4 py-3 bg-transparent border-b border-white/30 text-white text-center font-sans text-sm placeholder:text-white/40 focus:outline-none focus:border-white transition-colors duration-300"
                  autoFocus
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-sans text-sm text-white/70"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isLoading || !key}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 1)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-white/90 text-[#111] font-sans text-xs tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                ) : (
                  "Entrar"
                )}
              </motion.button>
            </motion.form>

            {/* Decorative element */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 h-px bg-white/20 w-16 mx-auto"
            />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
