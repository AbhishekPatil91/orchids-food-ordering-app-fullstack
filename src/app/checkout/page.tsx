"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// Checkout page: capture delivery details and place order
export default function CheckoutPage() {
  const { items, subtotal, tax, deliveryFee, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name || "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || items.length === 0) return;

    setLoading(true);
    const supabase = createClient();

    // Save order to database
    const { data, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image })),
        subtotal,
        tax,
        delivery_fee: deliveryFee,
        total,
        delivery_name: form.name,
        delivery_phone: form.phone,
        delivery_address: form.address,
      })
      .select("id")
      .single();

    setLoading(false);

    if (error) {
      alert("Failed to place order. Please try again.");
      return;
    }

    clearCart();
    router.push(`/order-confirmation?id=${data.id}`);
  };

  // Redirect to cart if empty (must be done in useEffect to avoid SSR issues)
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Delivery Form */}
        <form onSubmit={handleSubmit} id="checkout-form" className="space-y-5">
          <h2 className="text-lg font-bold text-gray-800">Delivery Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="10-digit mobile number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              placeholder="Full address with pincode"
            />
          </div>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-2xl p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-medium">&#8377;{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>&#8377;{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">GST (5%)</span>
              <span>&#8377;{tax}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery</span>
              <span>&#8377;{deliveryFee}</span>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-orange-500">&#8377;{total}</span>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={loading}
            className="w-full mt-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
