"use client";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f8fafc] border-t mt-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
                <img src="https://res.cloudinary.com/drmeagmkl/image/upload/v1772007286/logo_rcsr8h.png" className="w-[70px] h-[70px] rounded-full" alt="" />
                <h2 className="text-2xl font-bold text-primary tracking-tight">
              FoodHub 
            </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Discover & order delicious meals from trusted providers near you.
              Fresh food. Fast delivery. Simple experience.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Products
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/meals" className="hover:text-primary transition">Browse Meals</Link></li>
              <li><Link href="/providers" className="hover:text-primary transition">Providers</Link></li>
              <li><Link href="/login" className="hover:text-primary transition">Login</Link></li>
              <li><Link href="/register" className="hover:text-primary transition">Register</Link></li>
            </ul>
          </div>

          {/* Customers */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              For Customers
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/cart" className="hover:text-primary transition">Cart</Link></li>
              <li><Link href="/orders" className="hover:text-primary transition">My Orders</Link></li>
              <li><Link href="/profile" className="hover:text-primary transition">Profile</Link></li>
              <li><Link href="/checkout" className="hover:text-primary transition">Checkout</Link></li>
            </ul>
          </div>

          {/* Providers */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              For Providers
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/provider/dashboard" className="hover:text-primary transition">Dashboard</Link></li>
              <li><Link href="/provider/menu" className="hover:text-primary transition">Manage Menu</Link></li>
              <li><Link href="/provider/orders" className="hover:text-primary transition">Orders</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-primary transition cursor-pointer">
                support@foodhub.com
              </li>
              <li className="hover:text-primary transition cursor-pointer">
                +880 1788477912
              </li>
              <li className="text-gray-500">
                Sylhet, Bangladesh
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <Facebook className="w-5 h-5 text-gray-500 hover:text-primary transition cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-500 hover:text-primary transition cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-500 hover:text-primary transition cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-500 hover:text-primary transition cursor-pointer" />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FoodHub. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-primary transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}