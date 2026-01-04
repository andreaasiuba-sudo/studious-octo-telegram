"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Accordion from "@/components/ui/Accordion";
import { getProductBySlug, products } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import { Product } from "@/lib/types";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const slug = params.slug as string;
    const foundProduct = getProductBySlug(slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImageIndex(0);
      setSelectedMaterial(foundProduct.materials[0]);
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[2] || foundProduct.sizes[0]);
      }
    }
  }, [params.slug]);

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!product || product.images.length <= 1) return;
      
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

    addItem(product, selectedMaterial, selectedSize || undefined);

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

  const materialLabels: Record<string, string> = {
    "plata-925": "Plata 925",
    "oro-vermeil": "Oro Vermeil",
  };

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
              onClick={() => router.push("/shop")}
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
              <div className="aspect-square bg-accent/20 flex items-center justify-center relative overflow-hidden">
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
                  className="w-full h-full object-cover"
                />
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
                  {product.price} €
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

              {/* Material Selector */}
              <div>
                <h4 className="font-sans text-sm text-foreground mb-3">
                  Material
                </h4>
                <div className="flex gap-3">
                  {product.materials.map((material) => (
                    <button
                      key={material}
                      onClick={() => setSelectedMaterial(material)}
                      className={`px-6 py-3 font-sans text-sm border transition-colors ${
                        selectedMaterial === material
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {materialLabels[material]}
                    </button>
                  ))}
                </div>
              </div>

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

              {/* Add to Cart */}
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

      <Footer />
    </>
  );
}

