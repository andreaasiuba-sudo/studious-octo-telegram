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
  const [countdown, setCountdown] = useState(5);
  const [showCountdown, setShowCountdown] = useState(true);
  const router = useRouter();
  const setAccess = useAccessStore((state) => state.setAccess);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowCountdown(false);
      setTimeout(() => setShowContent(true), 500);
    }
  }, [countdown]);

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
    <main className="min-h-screen bg-background flex flex-col">
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
          {showCountdown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 text-center"
            >
              <motion.div
                key={countdown}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="font-serif text-8xl md:text-9xl text-foreground mb-4"
              >
                {countdown}
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-sans text-sm tracking-[0.3em] text-muted uppercase"
              >
                Preparando experiencia
              </motion.p>
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
              className="mb-12 space-y-4"
            >
              <h1 className="font-serif text-4xl md:text-5xl text-foreground tracking-tight leading-tight">
                Esto no es<br />solo un regalo.
              </h1>
              <p className="font-serif text-xl text-muted italic">
                Esto no es solo para ti.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="relative">
                <input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Clave: ¿Qué postre te apetece?"
                  className="w-full px-6 py-4 bg-transparent border-b border-border text-center font-sans text-lg placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors duration-300"
                  autoFocus
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-sans text-sm text-muted"
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
                className="w-full py-4 bg-foreground text-background font-sans text-sm tracking-wider hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="mt-16 h-px bg-border w-24 mx-auto"
            />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
