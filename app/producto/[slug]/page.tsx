"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Accordion from "@/components/ui/Accordion";
import { getProductBySlug, products } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import { Product } from "@/lib/types";
import PragueQuiz from "@/components/PragueQuiz";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const slug = params.slug as string;
    const foundProduct = getProductBySlug(slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImageIndex(0);
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[2] || foundProduct.sizes[0]);
      }
    }
  }, [params.slug]);

  useEffect(() => {
    if (showLightbox || showQuiz) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLightbox, showQuiz]);

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!product) return;

      // Close lightbox on ESC
      if (e.key === "Escape") {
        setShowLightbox(false);
      }
      
      if (product.images.length <= 1) return;
      
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedImageIndex((prev) => 
          prev === 0 ? product.images.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelectedImageIndex((prev) => 
          prev === product.images.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product]);

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    addItem(product, "hecho-a-mano", selectedSize || undefined);

    setIsAdding(false);
    setAdded(true);

    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-32 pb-16 flex items-center justify-center">
          <p className="font-sans text-muted">Cargando...</p>
        </main>
        <Footer />
      </>
    );
  }


  return (
    <>
      <Header />

      <main className="bg-background min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-8 font-sans text-sm text-muted"
          >
            <button
              onClick={() => router.push("/coleccion")}
              className="hover:text-foreground transition-colors"
            >
              Colección
            </button>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </motion.nav>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div 
                className="aspect-square bg-accent/20 flex items-center justify-center relative overflow-hidden cursor-zoom-in group"
                onClick={() => setShowLightbox(true)}
              >
                {product.isSpecial && (
                  <div className="absolute top-6 left-6 z-10">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 font-sans text-xs tracking-wider">
                      {product.specialEdition}
                    </span>
                  </div>
                )}
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-3 rounded-full shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`aspect-square bg-accent/10 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all overflow-hidden border-2 ${
                      selectedImageIndex === i ? "border-foreground" : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 border border-border text-foreground text-[10px] font-sans tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="font-sans text-2xl text-foreground">
                  {product.slug === "experiencia-misteriosa" ? "????" : `${product.price} €`}
                </p>
              </div>

              {/* Description */}
              <p className="font-sans text-muted leading-relaxed">
                {product.description}
              </p>

              {/* Special Edition Notice */}
              {product.isSpecial && (
                <div className="p-6 bg-amber-50 border border-amber-200">
                  <h4 className="font-serif text-lg text-amber-800 mb-2">
                    Edición creada para ti
                  </h4>
                  <p className="font-sans text-sm text-amber-700">
                    Esta pieza es única y exclusiva. Ha sido seleccionada especialmente pensando en ti.
                  </p>
                </div>
              )}


              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h4 className="font-sans text-sm text-foreground mb-3">
                    Talla
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 font-sans text-sm border transition-colors ${
                          selectedSize === size
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart / Mystery Experience */}
              {product.slug === "experiencia-misteriosa" ? (
                <motion.button
                  onClick={() => setShowQuiz(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-accent text-background font-sans text-sm tracking-wider hover:bg-accent/90 transition-colors"
                >
                  🔍 Descubrir el Misterio
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 font-sans text-sm tracking-wider transition-colors ${
                    added
                      ? "bg-green-600 text-white"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  } disabled:opacity-50`}
                >
                  {isAdding ? "Añadiendo..." : added ? "¡Añadido!" : "Añadir al carrito"}
                </motion.button>
              )}

              {/* Accordions */}
              <div className="pt-8">
                <Accordion title="Detalles" defaultOpen>
                  {product.details}
                </Accordion>
                <Accordion title="Cuidados">
                  {product.care}
                </Accordion>
                <Accordion title="Envío y devoluciones">
                  <p><strong>Envío:</strong> Gratis en todos los pedidos. Entrega en 3-5 días laborables.</p>
                  <p className="mt-2"><strong>Devoluciones:</strong> 30 días para devolver sin preguntas. El artículo debe estar en perfectas condiciones.</p>
                </Accordion>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Overlay súper opaco */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/98 backdrop-blur-xl"
              onClick={() => !quizCompleted && setShowQuiz(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 w-full flex flex-col items-center justify-center bg-background border border-border shadow-2xl rounded-2xl p-8 md:p-12 max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => setShowQuiz(false)}
                  className="text-muted hover:text-foreground transition-colors p-2"
                  aria-label="Cerrar"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              
              <PragueQuiz 
                onComplete={() => {
                  setShowQuiz(false);
                }} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
            onClick={() => setShowLightbox(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[75vh] flex items-center justify-center">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              
              {/* Info & Counter */}
              <div className="flex flex-col items-center gap-1">
                <p className="font-serif text-xl text-foreground">{product.name}</p>
                <div className="text-muted font-sans text-[10px] tracking-[0.3em] uppercase">
                  {selectedImageIndex + 1} / {product.images.length}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-0 right-0 text-foreground/40 hover:text-foreground transition-colors p-2"
                aria-label="Cerrar"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              {/* Navigation Arrows in Lightbox */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) => 
                        prev === 0 ? product.images.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors p-2"
                    aria-label="Anterior"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) => 
                        prev === product.images.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors p-2"
                    aria-label="Siguiente"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

