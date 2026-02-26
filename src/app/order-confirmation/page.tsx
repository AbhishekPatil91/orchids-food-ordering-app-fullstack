"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase";

interface OrderData {
  id: string;
  total: number;
  delivery_name: string;
  delivery_address: string;
  created_at: string;
  status: string;
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    if (!orderId) return;
    const supabase = createClient();
    supabase
      .from("orders")
      .select("id, total, delivery_name, delivery_address, created_at, status")
      .eq("id", orderId)
      .single()
      .then(({ data }) => {
        if (data) setOrder(data);
      });
  }, [orderId]);

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
      <p className="text-gray-500 mb-8">
        Thank you for your order. Your food is being prepared and will be delivered soon.
      </p>

      {order && (
        <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID</span>
              <span className="font-mono text-xs">{order.id.slice(0, 8)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="font-semibold text-green-600 capitalize">{order.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Deliver to</span>
              <span className="font-medium">{order.delivery_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total</span>
              <span className="font-bold text-orange-500">&#8377;{order.total}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
        >
          Continue Shopping
        </Link>
        <Link
          href="/orders"
          className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition"
        >
          My Orders
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="max-w-lg mx-auto px-4 py-24 text-center"><p>Loading...</p></div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
