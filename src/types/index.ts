export interface MenuItem {
  id: string;
  name: string;
  price: number;
  available: boolean;
  category: string;
  description?: string;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  order: number;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  whatsapp: string;
  address: string;
  hours: string;
  instagram: string;
  facebook: string;
  isOpen: boolean;
}

export interface CartItem extends MenuItem {
  cartItemId: string;
  quantity: number;
}

export interface Order {
  id: string;
  table: number;
  items: CartItem[];
  note: string;
  status: "en_attente" | "en_preparation" | "prete" | "servie";
  timestamp: string;
  total: number;
}
