interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// To define the type, it is needed to check the API to know what type has each of the element in the product object and create a similar structrure here

interface Products {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// This document is not created automatically in that case
