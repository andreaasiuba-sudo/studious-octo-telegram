"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/shop/ProductGrid";
import { products, filterProducts, sortProducts, searchProducts } from "@/lib/products";

type SortOption = "popular" | "price-asc" | "price-desc" | "newest";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const filteredProducts = useMemo(() => {
    let result = products;

    // Apply search
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    // Apply filters
    result = filterProducts(
      selectedCategory || undefined,
      selectedMaterial || undefined
    ).filter((p) => (searchQuery ? result.some((r) => r.id === p.id) : true));

    // If search is active, filter the already filtered products
    if (searchQuery) {
      const searchResults = searchProducts(searchQuery);
      result = result.filter((p) => searchResults.some((r) => r.id === p.id));
    }

    // Apply sorting
    result = sortProducts(result, sortBy);

    return result;
  }, [searchQuery, selectedCategory, selectedMaterial, sortBy]);

  const categories = [
    { value: "", label: "Todas" },
    { value: "anillos", label: "Anillos" },
    { value: "collares", label: "Collares" },
    { value: "pendientes", label: "Pendientes" },
    { value: "pulseras", label: "Pulseras" },
  ];

  const materials = [
    { value: "", label: "Todos" },
    { value: "plata-925", label: "Plata 925" },
    { value: "oro-vermeil", label: "Oro Vermeil" },
  ];

  const sortOptions = [
    { value: "popular", label: "Popularidad" },
    { value: "newest", label: "Novedades" },
    { value: "price-asc", label: "Precio: menor a mayor" },
    { value: "price-desc", label: "Precio: mayor a menor" },
  ];

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedMaterial("");
    setSortBy("popular");
  };

  return (
    <>
      <Header />

      <main className="bg-background min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Colección
            </h1>
            <p className="font-sans text-muted max-w-md mx-auto">
              Cada pieza cuenta una historia. Encuentra la tuya.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar accesorios..."
                  className="w-full px-6 py-3 bg-transparent border border-border text-foreground font-sans text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-8 border-b border-border"
          >
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-muted">Categoría:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-transparent border border-border text-foreground font-sans text-sm focus:outline-none focus:border-foreground transition-colors cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Material Filter */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-muted">Material:</span>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="px-4 py-2 bg-transparent border border-border text-foreground font-sans text-sm focus:outline-none focus:border-foreground transition-colors cursor-pointer"
                >
                  {materials.map((mat) => (
                    <option key={mat.value} value={mat.value}>
                      {mat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(selectedCategory || selectedMaterial || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="font-sans text-xs text-muted hover:text-foreground transition-colors underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs text-muted">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-transparent border border-border text-foreground font-sans text-sm focus:outline-none focus:border-foreground transition-colors cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-sm text-muted mb-8"
          >
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
          </motion.p>

          {/* Product Grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </main>

      <Footer />
    </>
  );
}

