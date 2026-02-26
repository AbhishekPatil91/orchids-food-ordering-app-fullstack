"use client";

import React from "react";
import { FoodItem } from "@/lib/food-data";
import { useCart } from "@/context/CartContext";
import { Plus, Minus, Star } from "lucide-react";
import Image from "next/image";

// Individual food card with add-to-cart and quantity controls
export default function FoodCard({ item }: { item: FoodItem }) {
  const { items, addToCart, increment, decrement } = useCart();
  const cartItem = items.find((i) => i.id === item.id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group border border-gray-100">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Add / Quantity control overlay */}
        <div className="absolute bottom-3 right-3">
          {!cartItem ? (
            <button
              onClick={() => addToCart(item)}
              className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white rounded-full shadow-lg px-2 py-1">
              <button
                onClick={() => decrement(item.id)}
                className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-sm w-6 text-center">{cartItem.quantity}</span>
              <button
                onClick={() => increment(item.id)}
                className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            <span className="text-sm text-gray-600">{item.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.description}</p>
        <p className="text-orange-500 font-bold text-lg">&#8377;{item.price}</p>
      </div>
    </div>
  );
}
