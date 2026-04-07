export interface Phone {
  id: string;
  brand: string;
  model: string;
  connectivity: string;
  ram: string;
  storage: string;
  price: number;
  fullName: string;
  images: string[];
  category: string;
  category_id: number;
}

export type BrandFilter =
  | "Todos"
  | "Samsung"
  | "Xiaomi/Poco"
  | "Honor"
  | "ZTE"
  | "Motorola"
  | "Infinix"
  | "Tablets"
  | "Básicos";
