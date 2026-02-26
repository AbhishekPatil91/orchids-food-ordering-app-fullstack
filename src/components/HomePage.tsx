"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categories, foodItems } from "@/lib/food-data";
import FoodCard from "@/components/FoodCard";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Filter items by category or show all
  const filteredItems =
    activeCategory === "all"
      ? foodItems
      : foodItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Hero Section - matches the orange banner from the UI */}
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-400 mx-4 sm:mx-6 lg:mx-8 mt-6 rounded-2xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 py-16 sm:py-24 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-lg">
            Order your favourite food here
          </h1>
          <p className="text-white/90 mt-6 max-w-md text-sm sm:text-base leading-relaxed">
            Choose from a diverse menu featuring a delectable array of dishes crafted with the finest
            ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your
            dining experience, one delicious meal at a time.
          </p>
          <Link
            href="#menu"
            className="inline-block mt-8 px-8 py-3 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-100 transition"
          >
            View Menu
          </Link>
        </div>
        {/* Decorative hero image */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop"
            alt="Hero food"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
      </section>

      {/* Explore Menu Section */}
      <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore our menu</h2>
        <p className="text-gray-500 mb-8 max-w-2xl">
          Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your
          cravings and elevate your dining experience, one delicious meal at a time.
        </p>

        {/* Category filters - circular images like the UI */}
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          <button
            onClick={() => setActiveCategory("all")}
            className={`flex flex-col items-center gap-2 flex-shrink-0 transition ${
              activeCategory === "all" ? "opacity-100" : "opacity-70 hover:opacity-100"
            }`}
          >
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm ${
                activeCategory === "all" ? "ring-4 ring-orange-300" : ""
              }`}
            >
              All
            </div>
            <span className="text-sm font-medium text-gray-700">All</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center gap-2 flex-shrink-0 transition ${
                activeCategory === cat.id ? "opacity-100" : "opacity-70 hover:opacity-100"
              }`}
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden relative ${
                  activeCategory === cat.id ? "ring-4 ring-orange-300" : ""
                }`}
              >
                <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="96px" />
              </div>
              <span className="text-sm font-medium text-gray-700">{cat.name}</span>
            </button>
          ))}
        </div>

        <hr className="my-8 border-gray-200" />

        {/* Section title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          {activeCategory === "all"
            ? "Top dishes near you"
            : `${categories.find((c) => c.id === activeCategory)?.name || ""} dishes`}
        </h3>

        {/* Food items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* App Download Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          For Better Experience Download
          <br />
          Tomato App
        </h2>
        <div className="flex justify-center gap-4 flex-wrap">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            width={180}
            height={53}
            className="cursor-pointer hover:opacity-80 transition"
          />
          <Image
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            width={160}
            height={53}
            className="cursor-pointer hover:opacity-80 transition"
          />
        </div>
      </section>
    </div>
  );
}
