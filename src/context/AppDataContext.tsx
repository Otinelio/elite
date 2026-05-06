import React, { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { MenuItem, RestaurantInfo, Order, Category } from "../types";
import { DEFAULT_MENU, DEFAULT_RESTAURANT_INFO, DEFAULT_CATEGORIES } from "../data/defaultData";

interface AppDataContextType {
  menu: MenuItem[];
  setMenu: (menu: MenuItem[] | ((prev: MenuItem[]) => MenuItem[])) => void;
  categories: Category[];
  setCategories: (categories: Category[] | ((prev: Category[]) => Category[])) => void;
  restaurantInfo: RestaurantInfo;
  setRestaurantInfo: (info: RestaurantInfo | ((prev: RestaurantInfo) => RestaurantInfo)) => void;
  orders: Order[];
  setOrders: (orders: Order[] | ((prev: Order[]) => Order[])) => void;
  tableNumber: string;
  setTableNumber: (table: string | ((prev: string) => string)) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [menu, setMenu] = useLocalStorage<MenuItem[]>("elite_menu", DEFAULT_MENU);
  const [categories, setCategories] = useLocalStorage<Category[]>("elite_categories", DEFAULT_CATEGORIES);
  const [restaurantInfo, setRestaurantInfo] = useLocalStorage<RestaurantInfo>("elite_restaurant_info", DEFAULT_RESTAURANT_INFO);
  const [orders, setOrders] = useLocalStorage<Order[]>("elite_orders", []);
  const [tableNumber, setTableNumber] = useLocalStorage<string>("elite_table_number", "");

  return (
    <AppDataContext.Provider value={{
      menu, setMenu,
      categories, setCategories,
      restaurantInfo, setRestaurantInfo,
      orders, setOrders,
      tableNumber, setTableNumber
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
};
