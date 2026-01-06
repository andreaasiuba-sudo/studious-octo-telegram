import { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    slug: "collar-riviera-dreams",
    name: "Collar Riviera Dreams",
    price: 14.95,
    description: "Inspirado en los atardeceres de la Costa Azul francesa. Este collar artesanal combina cuentas en tonos tierra con una estrella marina azul cobalto que evoca las aguas cristalinas del Mediterráneo.",
    shortDescription: "Elegancia costera mediterránea",
    category: "collares",
    materials: ["hecho-a-mano"],
    images: ["/images/collar-costa-azul-1.jpg", "/images/collar-costa-azul-2.jpg"],
    tags: ["bestseller", "regalo"],
    details: "Hecho a mano con estrella marina azul cobalto",
    care: "Evita el contacto con perfumes para proteger el color de las cuentas.",
    stock: 5,
  },
  {
    id: "2",
    slug: "azulejo-lisboa-soul",
    name: "Azulejo Lisboa Soul",
    price: 12.95,
    description: "Tradición portuguesa en un formato contemporáneo. Este azulejo azul y blanco es una pieza decorativa que simboliza la artesanía y el detalle que define a Pera y Limón.",
    shortDescription: "Tradición portuguesa, alma moderna",
    category: "pulseras", 
    materials: ["hecho-a-mano"],
    images: ["/images/azulejo-portugues-1.jpg", "/images/azulejo-portugues-2.jpg", "/images/azulejo-portugues-3.jpg"],
    tags: ["especial", "regalo"],
    details: "Hecho a mano | Estilo portugués clásico",
    care: "Una pieza eterna para tu hogar.",
    stock: 5,
    isSpecial: true,
    specialEdition: "Pieza Única",
  },
  {
    id: "3",
    slug: "collar-amsterdam-smiles",
    name: "Collar Ámsterdam Smiles",
    price: 17.95,
    description: "Una explosión de color y alegría. Este collar de cuentas artesanales captura la energía de las tardes entre amigos. Una pieza jovial diseñada para quienes no tienen miedo de mostrar su verdadera esencia.",
    shortDescription: "Color y energía artesanal",
    category: "collares",
    materials: ["hecho-a-mano"],
    images: ["/images/collar-amsterdam-1.jpg", "/images/collar-amsterdam-2.jpg"],
    tags: ["nuevo", "especial"],
    details: "Hecho a mano con cuentas de colores",
    care: "Límpialo con cariño y guárdalo en un lugar seco.",
    stock: 7,
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getProductsByCategory = (category: Product["category"]): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getSpecialProduct = (): Product | undefined => {
  return products.find((p) => p.isSpecial);
};

export const getFeaturedProducts = (): Product[] => {
  return products;
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
};

export const filterProducts = (
  category?: string,
  material?: string,
  minPrice?: number,
  maxPrice?: number
): Product[] => {
  return products.filter((p) => {
    if (category && p.category !== category) return false;
    if (material && !p.materials.includes(material as "hecho-a-mano")) return false;
    if (minPrice && p.price < minPrice) return false;
    if (maxPrice && p.price > maxPrice) return false;
    return true;
  });
};

export const sortProducts = (
  productList: Product[],
  sortBy: "popular" | "price-asc" | "price-desc" | "newest"
): Product[] => {
  const sorted = [...productList];
  switch (sortBy) {
    case "popular":
      return sorted;
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted;
    default:
      return sorted;
  }
};
