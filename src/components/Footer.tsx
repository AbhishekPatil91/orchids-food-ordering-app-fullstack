import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold text-orange-500 mb-4">Tomato.</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your favourite food delivery partner. We bring the best restaurants and dishes right to your doorstep.
              Fresh ingredients, amazing flavours, delivered fast.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-wide">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-orange-500 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-orange-500 transition">About us</Link></li>
              <li><Link href="/contact" className="hover:text-orange-500 transition">Delivery</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition">Privacy policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-wide">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li>+91-98765-43210</li>
              <li>contact@tomato.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          Copyright 2026 &copy; Tomato.com - All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
