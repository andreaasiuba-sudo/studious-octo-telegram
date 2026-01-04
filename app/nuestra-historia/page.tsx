"use client";

import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function StoryPage() {
  return (
    <>
      <Header />
      <main className="bg-background pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="font-sans text-xs tracking-[0.3em] text-muted uppercase mb-4 block">
              Desde 2024
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground">
              Nuestra Historia
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] bg-accent flex items-center justify-center overflow-hidden"
            >
              <div className="text-foreground/20 font-serif text-8xl">P\L</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-3xl text-foreground">
                El origen de Pera y Limón
              </h2>
              <p className="font-sans text-muted leading-relaxed">
                Pera y Limón nace de la energía inagotable de Andrea Cid. Una mujer
                con una sonrisa que ilumina cualquier estancia y unas ganas infinitas
                de comerse el mundo.
              </p>
              <p className="font-sans text-muted leading-relaxed">
                Amiga de todo el mundo y con una pasión contagiosa por lo auténtico,
                Andrea decidió canalizar su creatividad en algo único. Así nació
                esta marca, con raíces profundas en los canales de Ámsterdam.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-pear/10 p-12 md:p-20 text-center space-y-8"
          >
            <h2 className="font-serif text-4xl text-foreground italic">
              "Cada pieza lleva tu historia."
            </h2>
            <div className="w-16 h-px bg-border mx-auto" />
            <p className="font-sans text-muted max-w-2xl mx-auto">
              No creamos accesorios, creamos piezas únicas que abrazan tu esencia 
              y celebran lo irrepetible que hay en ti. Porque ser diferente 
              no es una elección, es tu naturaleza.
            </p>
          </motion.div>

          <div className="mt-24 grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <h2 className="font-serif text-3xl text-foreground mb-6">
                Desde Ámsterdam al mundo
              </h2>
              <p className="font-sans text-muted leading-relaxed mb-4">
                Cada pieza de Pera y Limón es un tributo a la paciencia y el detalle. 
                Todas nuestras piezas se montan cuidadosamente a mano y se envían 
                directamente desde nuestro taller en Ámsterdam, Países Bajos.
              </p>
              <p className="font-sans text-muted leading-relaxed">
                Trabajamos con metales nobles, asegurando que cada pieza que sale
                de nuestras manos sea digna de llevar el nombre de Andrea y la
                identidad de quien la elige.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-[4/5] overflow-hidden order-1 md:order-2"
            >
              <img
                src="/images/amsterdam-canal.jpg"
                alt="Canal de Ámsterdam"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

