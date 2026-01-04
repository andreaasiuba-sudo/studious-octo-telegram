"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/shop/ProductCard";
import { getFeaturedProducts, getSpecialProduct } from "@/lib/products";

const backgroundImages = [
  "/images/hero-background-v2.png",
  "/images/hero-background-v3.png",
  "/images/hero-background-v4.png"
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const specialProduct = getSpecialProduct();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header />

      <main className="bg-background">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
          {/* Background Image Carousel */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentBgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-black/45 z-10" />
                <img
                  src={backgroundImages[currentBgIndex]}
                  alt="Pera y Limón"
                  className="w-full h-full object-cover"
                  style={{ imageRendering: 'auto' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-20 max-w-4xl text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="space-y-6 mb-12"
            >
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] drop-shadow-2xl tracking-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0px 0px 16px rgba(0,0,0,0.6)' }}>
                PERA Y LIMÓN
              </h1>
              
              <p className="font-serif text-lg md:text-xl lg:text-2xl font-light text-white/80 leading-relaxed drop-shadow-lg max-w-xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6), 0px 0px 8px rgba(0,0,0,0.4)' }}>
                Piezas únicas con alma de Ámsterdam.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              className="mb-16"
            >
              <p className="font-sans text-sm md:text-base text-white/90 max-w-xl mx-auto font-light leading-relaxed" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.5)' }}>
                Accesorios artesanales creados para quienes buscan proyectar una identidad propia e irrepetible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
            >
              <Link
                href="/coleccion"
                className="inline-block px-16 py-5 bg-white/95 text-foreground font-sans text-xs tracking-[0.3em] uppercase hover:bg-white transition-all shadow-2xl backdrop-blur-sm border border-white/20"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)' }}
              >
                Descubrir Colección
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Special Product - "La elegida para ti" */}
        {specialProduct && (
          <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <span className="font-sans text-xs tracking-[0.2em] text-muted uppercase">
                  Edición especial
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-4">
                  La elegida para ti
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                {/* Image */}
                <div className="aspect-square bg-accent/20 flex items-center justify-center overflow-hidden">
                  <img
                    src={specialProduct.images[0]}
                    alt={specialProduct.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 font-sans text-xs tracking-wider">
                    {specialProduct.specialEdition}
                  </div>
                  <h3 className="font-serif text-3xl text-foreground">
                    {specialProduct.name}
                  </h3>
                  <p className="font-sans text-muted leading-relaxed">
                    {specialProduct.description}
                  </p>
                  <p className="font-sans text-xl text-foreground">
                    {specialProduct.price} €
                  </p>
                  <Link
                        href={`/producto/${specialProduct.slug}`}
                    className="inline-block px-8 py-3 bg-foreground text-background font-sans text-sm tracking-wider hover:bg-foreground/90 transition-colors"
                  >
                    Descubrir
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Featured Products */}
        <section className="py-24 px-6 bg-lemon/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                Colección destacada
              </h2>
              <p className="font-sans text-muted mt-4">
                Las piezas más queridas
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mt-12"
            >
              <Link
                href="/coleccion"
                className="inline-block px-8 py-3 border border-foreground text-foreground font-sans text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                Ver toda la colección
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Envío gratis",
                  description: "En todos los pedidos, sin mínimo de compra.",
                },
                {
                  title: "Devoluciones 30 días",
                  description: "Si no te convence, te devolvemos el dinero.",
                },
                {
                  title: "Envoltorio para regalo",
                  description: "Cada pieza viene lista para regalar.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 border border-border rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-2 h-2 bg-foreground rounded-full" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="font-sans text-sm text-muted">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

              {/* From Amsterdam to the World */}
              <section className="py-24 px-6 bg-lemon/20">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden rounded-sm">
                      <img
                        src="/images/amsterdam-canal.jpg"
                        alt="Canal de Ámsterdam al atardecer"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                        Desde Ámsterdam al mundo
                      </h2>
                      <div className="space-y-4 font-sans text-muted leading-relaxed">
                        <p>
                          Cada pieza de Pera y Limón es un tributo a la paciencia y el detalle. Todas nuestras piezas se montan cuidadosamente a mano y se envían directamente desde nuestro taller en Ámsterdam, Países Bajos.
                        </p>
                        <p>
                          Trabajamos con todo tipo de materiales, asegurando que cada pieza que sale de nuestras manos sea digna de llevar, todo con la identidad de quien la elige.
                        </p>
                      </div>
                      <div className="pt-4">
                        <Link
                          href="/nuestra-historia"
                          className="inline-block px-8 py-3 border border-foreground text-foreground font-sans text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors"
                        >
                          Conoce nuestra historia
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Newsletter */}
              <section className="py-24 px-6 bg-foreground text-background">
                <div className="max-w-xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="font-serif text-3xl mb-4">Únete a nosotros</h2>
                    <p className="font-sans text-background/70 mb-8">
                      Recibe novedades y ofertas exclusivas.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        placeholder="Tu email"
                        className="flex-1 px-6 py-3 bg-transparent border border-background/30 text-background placeholder:text-background/50 font-sans text-sm focus:outline-none focus:border-background transition-colors"
                      />
                      <button
                        type="button"
                        className="px-8 py-3 bg-background text-foreground font-sans text-sm tracking-wider hover:bg-background/90 transition-colors"
                      >
                        Suscribir
                      </button>
                    </form>
                  </motion.div>
                </div>
              </section>
      </main>

      <Footer />
    </>
  );
}

