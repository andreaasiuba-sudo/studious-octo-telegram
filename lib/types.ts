export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  category: "anillos" | "collares" | "pendientes" | "pulseras";
  materials: ("plata-925" | "oro-vermeil" | "hecho-a-mano")[];
  sizes?: string[];
  images: string[];
  tags: ("nuevo" | "bestseller" | "regalo" | "especial")[];
  details: string;
  care: string;
  isSpecial?: boolean;
  specialEdition?: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedMaterial: string;
  selectedSize?: string;
}

export interface CheckoutFormData {
  nombre: string;
  email: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  envio: "estandar" | "express";
  metodoPago: "tarjeta" | "paypal";
}


