import { Category, MenuItem, RestaurantInfo } from "../types";

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "cat_burgers", name: "BURGERS", order: 1 },
  { id: "cat_pizzas", name: "PIZZAS", order: 2 },
  { id: "cat_chicken", name: "CHICKEN", order: 3 },
  { id: "cat_sides", name: "ACCOMPAGNEMENTS", order: 4 },
  { id: "cat_drinks", name: "BOISSONS", order: 5 },
];

export const DEFAULT_MENU: MenuItem[] = [
  { id: "m1", category: "cat_burgers", name: "Cheese Burger", price: 2500, available: true },
  { id: "m2", category: "cat_burgers", name: "Chicken Burger", price: 2500, available: true },
  { id: "m3", category: "cat_burgers", name: "Double Burger", price: 3500, available: true },
  { id: "m4", category: "cat_burgers", name: "Classic Burger", price: 2000, available: true },
  { id: "m5", category: "cat_burgers", name: "BBQ Burger", price: 3000, available: true },
  
  { id: "m6", category: "cat_pizzas", name: "Margherita", price: 3000, available: true },
  { id: "m7", category: "cat_pizzas", name: "Chicken Spicy", price: 3500, available: true },
  { id: "m8", category: "cat_pizzas", name: "Pepperoni", price: 4000, available: true },
  { id: "m9", category: "cat_pizzas", name: "4 Fromages", price: 4500, available: true },
  { id: "m10", category: "cat_pizzas", name: "Végétarienne", price: 3000, available: true },

  { id: "m11", category: "cat_chicken", name: "Bucket 6 pièces", price: 3500, available: true },
  { id: "m12", category: "cat_chicken", name: "Bucket 12 pièces", price: 6000, available: true },
  { id: "m13", category: "cat_chicken", name: "Wings x6", price: 2500, available: true, imageUrl: "/src/assets/img/chicken_wings.jpeg" },
  { id: "m14", category: "cat_chicken", name: "Chicken Box", price: 3000, available: true },
  { id: "m15", category: "cat_chicken", name: "Tenders x5", price: 2500, available: true },

  { id: "m16", category: "cat_sides", name: "Frites classiques", price: 1000, available: true },
  { id: "m17", category: "cat_sides", name: "Frites épicées", price: 1200, available: true },
  { id: "m18", category: "cat_sides", name: "Onion Rings", price: 1200, available: true },
  { id: "m19", category: "cat_sides", name: "Coleslaw", price: 800, available: true },

  { id: "m20", category: "cat_drinks", name: "Coca-Cola", price: 600, available: true },
  { id: "m21", category: "cat_drinks", name: "Fanta", price: 600, available: true },
  { id: "m22", category: "cat_drinks", name: "Jus de fruits", price: 700, available: true },
  { id: "m23", category: "cat_drinks", name: "Eau", price: 400, available: true },
  { id: "m24", category: "cat_drinks", name: "Bissap", price: 800, available: true },
];

export const DEFAULT_RESTAURANT_INFO: RestaurantInfo = {
  name: "Elite Pizza Burger",
  tagline: "Ici, la faim n'a aucune chance.",
  whatsapp: "22893015679",
  address: "Boulevard de la Kara · Feu rouge Université IAEC / Adewui · Tokoin Doumasséssé · Lomé, Togo",
  hours: "Tous les jours 11h00 – 22h00",
  instagram: "elitechickenpizzaburgerlome",
  facebook: "",
  isOpen: true,
};
