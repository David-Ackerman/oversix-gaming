"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const categories = [
  { id: "all", name: "All" },
  { id: "news", name: "News" },
  { id: "reviews", name: "Reviews" },
  { id: "guides", name: "Guides" },
  { id: "features", name: "Features" },
  { id: "videos", name: "Videos" },
];

type CategoryTabsProps = {
  onSelectCategory: (categoryId: string) => void;
};

export function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="border-b border-secondary mb-8">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto hide-scrollbar py-2 space-x-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={twMerge(
                "px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors",
                activeCategory === category.id
                  ? "bg-gaming-purple/20 text-gaming-purple"
                  : "text-gray-400 hover:text-white hover:bg-secondary/50"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
