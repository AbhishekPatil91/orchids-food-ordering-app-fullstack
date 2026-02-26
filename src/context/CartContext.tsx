"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { FoodItem } from "@/lib/food-data";

// Cart item extends FoodItem with quantity
export interface CartItem extends FoodItem {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: FoodItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "INCREMENT"; payload: string }
  | { type: "DECREMENT"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

interface CartContextType {
  items: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Reducer to handle all cart operations
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case "INCREMENT":
      return {
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREMENT": {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity <= 1) {
        return { items: state.items.filter((i) => i.id !== action.payload) };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }
    case "CLEAR_CART":
      return { items: [] };
    case "LOAD_CART":
      return { items: action.payload };
    default:
      return state;
  }
}

const DELIVERY_FEE = 49; // ₹49 delivery fee
const TAX_RATE = 0.05; // 5% GST

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tomato-cart");
      if (saved) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(saved) });
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem("tomato-cart", JSON.stringify(state.items));
  }, [state.items]);

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const deliveryFee = state.items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + tax + deliveryFee;
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const value: CartContextType = {
    items: state.items,
    addToCart: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
    removeFromCart: (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
    increment: (id) => dispatch({ type: "INCREMENT", payload: id }),
    decrement: (id) => dispatch({ type: "DECREMENT", payload: id }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    itemCount,
    subtotal,
    tax,
    deliveryFee,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
