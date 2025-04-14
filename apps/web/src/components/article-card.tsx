import React from "react";
import { Calendar, MessageSquare, Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { NEXT_CACHE_TAG_MAX_LENGTH } from "next/dist/lib/constants";
import { CategoryChip } from "./ui/category-chip";
import { twMerge } from "tailwind-merge";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: StaticImageData;
  category: {
    name: string;
    color: string;
  };
  date: string;
  commentCount: number;
  rating?: number;
  isFeatured?: boolean;
}

export function ArticleCard({
  id,
  title,
  excerpt,
  imageUrl,
  category,
  date,
  commentCount,
  rating,
  isFeatured = false,
}: ArticleCardProps) {
  return (
    <Link href={`/article/${id}`} className="block h-full group">
      <article
        className={twMerge(
          "gaming-card h-full flex flex-col animate-fade-in relative",
          isFeatured ? "md:flex-row" : ""
        )}
      >
        {/* Glowing border effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-gaming-purple/30 via-gaming-blue/30 to-gaming-purple/30 blur rounded-lg -z-10 group-hover:animate-pulse-glow transition-opacity duration-500"></div>

        <div
          className={`relative overflow-hidden ${
            isFeatured ? "md:w-2/3 aspect-[16/9]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={imageUrl}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-0 inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <CategoryChip color={category.color} name={category.name} />

          {rating && (
            <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded-md">
              <Star className="h-3 w-3 fill-gaming-orange text-gaming-orange" />
              <span className="text-xs font-semibold">{rating}</span>
            </div>
          )}
        </div>

        <div
          className={`flex flex-col p-4 ${isFeatured ? "md:w-1/3" : ""} relative`}
        >
          {/* Pixel art corner accents */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gaming-purple/30"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gaming-blue/30"></div>

          <h3
            className={`font-display font-bold leading-tight text-white ${
              isFeatured ? "text-xl md:text-2xl" : "text-lg"
            } group-hover:text-gaming-purple transition-colors duration-300`}
          >
            {title}
          </h3>

          <p className="mt-2 text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
            {excerpt}
          </p>

          <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-3 w-3" />
              <span>{commentCount}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
