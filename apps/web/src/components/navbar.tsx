"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, Menu, X, User, LogIn, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { OversixGaming } from "./oversix-gaming";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categories = [
    { name: "News", href: "/category/news" },
    { name: "Reviews", href: "/category/reviews" },
    { name: "Features", href: "/category/features" },
    { name: "Videos", href: "/category/videos" },
    { name: "Guides", href: "/category/guides" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // This would be replaced with actual auth logic
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-md border-b border-gaming-purple/40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <OversixGaming />

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm font-medium text-gray-300 hover:text-gaming-purple transition-colors relative group"
              >
                {category.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gaming-purple transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Search and Auth */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-gaming-purple"
            >
              <Search className="h-5 w-5" />
            </Button>

            {isLoggedIn ? (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-gaming-purple/10 hover:bg-gaming-purple/20"
                onClick={toggleLogin}
              >
                <User className="h-5 w-5 text-gaming-purple" />
              </Button>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex border-gaming-purple text-gaming-purple hover:bg-gaming-purple/10"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-300" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-gaming-purple/20">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block py-2 text-base font-medium text-gray-300 hover:text-gaming-purple"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            {!isLoggedIn && (
              <Button
                variant="outline"
                className="mt-3 w-full border-gaming-purple text-gaming-purple hover:bg-gaming-purple/10"
                onClick={toggleLogin}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
