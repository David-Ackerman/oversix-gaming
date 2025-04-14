import React from "react";
import {
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Twitch,
  Heart,
  Gamepad2,
} from "lucide-react";
import Link from "next/link";
import { OversixGaming } from "./oversix-gaming";

export function Footer() {
  return (
    <footer className="bg-black/80 border-t border-gaming-purple/30 mt-12 relative overflow-hidden">
      {/* Gaming-inspired glowing effect */}
      <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-gaming-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-gaming-blue/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <OversixGaming />
            <p className="mt-4 text-sm text-gray-400">
              Your ultimate source for gaming news, reviews, and in-depth
              coverage of the gaming universe.
            </p>
            <div className="mt-4 flex space-x-3">
              <a
                href="#"
                className="text-gray-400 hover:text-gaming-purple transition-colors bg-secondary/50 p-2 rounded-full"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gaming-blue transition-colors bg-secondary/50 p-2 rounded-full"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gaming-pink transition-colors bg-secondary/50 p-2 rounded-full"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gaming-red transition-colors bg-secondary/50 p-2 rounded-full"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gaming-purple transition-colors bg-secondary/50 p-2 rounded-full"
              >
                <Twitch className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
                Categories
                <div className="absolute -bottom-1 left-0 h-[2px] w-12 bg-gaming-purple"></div>
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/category/news"
                    className="text-gray-400 hover:text-gaming-purple transition-colors text-sm"
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/reviews"
                    className="text-gray-400 hover:text-gaming-purple transition-colors text-sm"
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/features"
                    className="text-gray-400 hover:text-gaming-purple transition-colors text-sm"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/guides"
                    className="text-gray-400 hover:text-gaming-purple transition-colors text-sm"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/videos"
                    className="text-gray-400 hover:text-gaming-purple transition-colors text-sm"
                  >
                    Videos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
                Platforms
                <div className="absolute -bottom-1 left-0 h-[2px] w-12 bg-gaming-blue"></div>
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/platform/pc"
                    className="text-gray-400 hover:text-gaming-blue transition-colors text-sm"
                  >
                    PC
                  </Link>
                </li>
                <li>
                  <Link
                    href="/platform/playstation"
                    className="text-gray-400 hover:text-gaming-blue transition-colors text-sm"
                  >
                    PlayStation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/platform/xbox"
                    className="text-gray-400 hover:text-gaming-blue transition-colors text-sm"
                  >
                    Xbox
                  </Link>
                </li>
                <li>
                  <Link
                    href="/platform/nintendo"
                    className="text-gray-400 hover:text-gaming-blue transition-colors text-sm"
                  >
                    Nintendo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/platform/mobile"
                    className="text-gray-400 hover:text-gaming-blue transition-colors text-sm"
                  >
                    Mobile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
                About
                <div className="absolute -bottom-1 left-0 h-[2px] w-12 bg-gaming-cyan"></div>
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-gaming-cyan transition-colors text-sm"
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-gaming-cyan transition-colors text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-gaming-cyan transition-colors text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-gaming-cyan transition-colors text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/advertise"
                    className="text-gray-400 hover:text-gaming-cyan transition-colors text-sm"
                  >
                    Advertise
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} OVERSIX Gaming. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-4 md:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-gaming-pink" /> for
            gamers
          </p>
        </div>
      </div>
    </footer>
  );
}
