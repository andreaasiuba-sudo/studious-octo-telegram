"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="bg-background pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-sans text-xs tracking-[0.3em] text-muted uppercase mb-4 block">
                Atención al cliente
              </span>
              <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-8">
                Hablemos
              </h1>
              <p className="font-sans text-muted leading-relaxed mb-12 max-w-md">
                ¿Tienes alguna pregunta sobre nuestras piezas, envíos o 
                necesitas asesoramiento personal? Estamos aquí para ayudarte.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">Email</h3>
                  <p className="font-sans text-muted">andrea@peraylimon.com</p>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">Horario</h3>
                  <p className="font-sans text-muted">Lunes a Viernes: 09:00 — 18:00</p>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">Síguenos</h3>
                  <p className="font-sans text-muted">@peraylimon_accesorios</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-accent/30 p-8 md:p-12"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-2xl text-foreground">Mensaje enviado</h2>
                  <p className="font-sans text-muted">
                    Gracias por contactarnos. Te responderemos lo antes posible.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Enviar otro mensaje
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input label="Nombre" placeholder="Tu nombre" required />
                  <Input label="Email" type="email" placeholder="tu@email.com" required />
                  <div className="space-y-2">
                    <label className="block text-sm font-sans text-muted mb-2">
                      Mensaje
                    </label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 bg-transparent border border-border text-foreground font-sans text-sm placeholder:text-muted/60 focus:outline-none focus:border-foreground transition-colors duration-300"
                      placeholder="¿Cómo podemos ayudarte?"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Enviar mensaje
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

