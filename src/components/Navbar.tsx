"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./AuthModal";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react";

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-3xl font-bold text-orange-500 tracking-tight">
              Tomato.
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-700 hover:text-orange-500 transition font-medium">
                home
              </Link>
              <Link href="/#menu" className="text-gray-700 hover:text-orange-500 transition font-medium">
                menu
              </Link>
              <Link href="/reserve" className="text-gray-700 hover:text-orange-500 transition font-medium">
                reserve table
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-500 transition font-medium">
                contact us
              </Link>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
                <ShoppingBag className="w-6 h-6 text-gray-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Auth */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium truncate max-w-[100px]">
                      {user.user_metadata?.full_name || user.email?.split("@")[0]}
                    </span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => { signOut(); setShowUserMenu(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="px-5 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition"
                >
                  sign in
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4 flex flex-col gap-3">
              <Link href="/" className="text-gray-700 hover:text-orange-500 font-medium" onClick={() => setMobileOpen(false)}>
                home
              </Link>
              <Link href="/#menu" className="text-gray-700 hover:text-orange-500 font-medium" onClick={() => setMobileOpen(false)}>
                menu
              </Link>
              <Link href="/reserve" className="text-gray-700 hover:text-orange-500 font-medium" onClick={() => setMobileOpen(false)}>
                reserve table
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-500 font-medium" onClick={() => setMobileOpen(false)}>
                contact us
              </Link>
            </div>
          )}
        </div>
      </nav>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
