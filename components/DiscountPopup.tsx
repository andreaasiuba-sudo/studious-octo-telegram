"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DISCOUNT_CODE = "10PERAYLIMON";
const DISCOUNT_PERCENTAGE = 10;

export default function DiscountPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya ha visto el popup
    const seen = localStorage.getItem("discount-popup-seen");
    if (!seen) {
      // Mostrar el popup después de 10 segundos
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000);
      return () => clearTimeout(timer);
    } else {
      setHasSeenPopup(true);
    }
  }, []);

  const handleGetCode = () => {
    setShowCode(true);
    // Guardar en localStorage que ya vio el popup
    localStorage.setItem("discount-popup-seen", "true");
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("discount-popup-seen", "true");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(DISCOUNT_CODE);
    // Mostrar feedback visual
    const button = document.getElementById("copy-button");
    if (button) {
      const originalText = button.textContent;
      button.textContent = "¡Copiado!";
      setTimeout(() => {
        if (button) button.textContent = originalText;
      }, 2000);
    }
  };

  if (hasSeenPopup) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] bg-background border border-border shadow-2xl max-w-md w-full mx-4 p-8"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
              aria-label="Cerrar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {!showCode ? (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-foreground/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl">🎁</span>
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-foreground mb-2">
                    ¡Obtén un {DISCOUNT_PERCENTAGE}% de descuento!
                  </h2>
                  <p className="font-sans text-muted">
                    Código exclusivo para tu primera compra
                  </p>
                </div>
                <motion.button
                  onClick={handleGetCode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 bg-foreground text-background font-sans text-sm tracking-wider hover:bg-foreground/90 transition-colors"
                >
                  Obtener código
                </motion.button>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl">✓</span>
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-foreground mb-4">
                    ¡Tu código de descuento!
                  </h2>
                  <div className="bg-accent/20 p-4 border border-border mb-4">
                    <p className="font-mono text-2xl font-bold text-foreground tracking-wider">
                      {DISCOUNT_CODE}
                    </p>
                  </div>
                  <p className="font-sans text-sm text-muted mb-4">
                    Usa este código al finalizar tu compra para obtener un {DISCOUNT_PERCENTAGE}% de descuento
                  </p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    id="copy-button"
                    onClick={copyToClipboard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 border border-foreground text-foreground font-sans text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors"
                  >
                    Copiar código
                  </motion.button>
                  <motion.button
                    onClick={handleClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 bg-foreground text-background font-sans text-sm tracking-wider hover:bg-foreground/90 transition-colors"
                  >
                    Cerrar
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

