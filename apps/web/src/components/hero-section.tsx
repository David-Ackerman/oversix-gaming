import React from "react";
import { ArticleCard } from "./article-card";
import { Gamepad2 } from "lucide-react";
import heroImage from "../assets/hero-image.jpg"; // Placeholder for the hero image

// Mock data for featured article
const featuredArticle = {
  id: "elder-ring-dlc-review",
  title:
    "Elden Ring: Shadow of the Erdtree Expansion Takes the Series to New Heights",
  excerpt:
    "FromSoftware's latest DLC for Elden Ring introduces challenging new areas, bosses, and lore that expands on the critically acclaimed base game.",
  imageUrl: heroImage,
  category: {
    name: "Review",
    color: "green",
  },
  date: "Apr 3, 2025",
  commentCount: 48,
  rating: 9.5,
};

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 pt-6 pb-12 relative overflow-hidden">
      {/* Gaming-inspired decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gaming-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gaming-blue/5 rounded-full blur-3xl"></div>

      <div className="relative flex items-center mb-8">
        <Gamepad2 className="h-7 w-7 text-gaming-purple mr-3" />
        <h1 className="text-2xl md:text-3xl font-display font-bold relative">
          FEATURED
          <span className="text-gaming-purple">CONTENT</span>
          <div className="absolute -bottom-2 left-0 h-[3px] w-32 bg-gradient-to-r from-gaming-purple to-gaming-blue"></div>
        </h1>
      </div>

      <div className="w-full relative">
        {/* Pixel-inspired decorative corner */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-gaming-purple"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-gaming-blue"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-gaming-blue"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-gaming-purple"></div>

        <ArticleCard {...featuredArticle} isFeatured={true} />
      </div>
    </section>
  );
}
