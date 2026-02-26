"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

export default function CartPage() {
  const { items, increment, decrement, removeFromCart, subtotal, tax, deliveryFee, total } = useCart();
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
        <Link
          href="/#menu"
          className="inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header row */}
          <div className="hidden sm:grid grid-cols-[1fr_120px_120px_120px_40px] gap-4 px-4 py-3 bg-gray-50 rounded-xl text-sm font-semibold text-gray-500">
            <span>Items</span>
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-center">Total</span>
            <span></span>
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-[1fr_120px_120px_120px_40px] gap-4 items-center px-4 py-4 bg-white border border-gray-100 rounded-xl"
            >
              {/* Item info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden relative flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 sm:hidden">&#8377;{item.price}</p>
                </div>
              </div>

              {/* Price */}
              <p className="hidden sm:block text-center font-medium text-gray-700">&#8377;{item.price}</p>

              {/* Quantity controls */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => decrement(item.id)}
                  className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => increment(item.id)}
                  className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Total */}
              <p className="hidden sm:block text-center font-bold text-gray-900">
                &#8377;{item.price * item.quantity}
              </p>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-500 transition justify-self-center"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-gray-50 rounded-2xl p-6 h-fit sticky top-24">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Cart Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">&#8377;{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">GST (5%)</span>
              <span className="font-medium">&#8377;{tax}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Fee</span>
              <span className="font-medium">&#8377;{deliveryFee}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-orange-500">&#8377;{total}</span>
            </div>
          </div>

          {user ? (
            <Link
              href="/checkout"
              className="block w-full mt-6 py-3 bg-orange-500 text-white font-semibold rounded-xl text-center hover:bg-orange-600 transition"
            >
              Proceed to Checkout
            </Link>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="w-full mt-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition"
            >
              Sign in to Checkout
            </button>
          )}
        </div>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
