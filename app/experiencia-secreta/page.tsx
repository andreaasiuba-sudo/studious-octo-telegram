"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PragueQuiz from "@/components/PragueQuiz";

export default function ExperienciaSecretaPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            {!showQuiz ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-8"
              >
                {/* Imagen del regalo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="relative max-w-md mx-auto"
                >
                  <img
                    src="/images/how-to-wrap-present-mc-221206-93309c.webp"
                    alt="Regalo misterioso"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Contenido */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="space-y-6"
                >
                  <h1 className="font-serif text-4xl md:text-5xl text-foreground">
                    Experiencia Misteriosa
                  </h1>
                  
                  <p className="text-lg text-muted max-w-2xl mx-auto">
                    Has encontrado algo muy especial. Una experiencia única te espera, 
                    pero primero tendrás que demostrar tu conocimiento sobre una ciudad 
                    europea muy especial...
                  </p>

                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <p className="text-sm text-muted/70 italic">
                      ¿Estás lista para el desafío?
                    </p>
                    
                    <motion.button
                      onClick={() => setShowQuiz(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-accent text-background font-sans text-sm tracking-wider hover:bg-accent/90 transition-colors rounded-lg"
                    >
                      🔍 Descubrir el Misterio
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8 text-center">
                  <h2 className="font-serif text-2xl text-foreground mb-4">
                    🏰 Descubre tu Destino Misterioso
                  </h2>
                </div>
                
                <PragueQuiz 
                  onComplete={() => {
                    setQuizCompleted(true);
                    setTimeout(() => {
                      setShowQuiz(false);
                      setQuizCompleted(false);
                    }, 8000);
                  }} 
                />
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}


