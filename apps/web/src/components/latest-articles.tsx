import { Newspaper } from "lucide-react";
import { ArticleCard } from "./article-card";
import heroImage from "../assets/hero-image.jpg";
const articles = [
  {
    id: "gta6-trailer-breakdown",
    title: "GTA 6 Trailer Breakdown: Everything We Learned About Vice City",
    excerpt:
      "We analyze every frame of the new trailer to uncover hidden details about the upcoming Grand Theft Auto sequel.",
    imageUrl: heroImage,
    category: {
      name: "News",
      color: "blue",
    },
    date: "Apr 2, 2025",
    commentCount: 32,
  },
  {
    id: "starfield-new-update",
    title: "Starfield's Latest Update Introduces Ship Building Overhaul",
    excerpt:
      "Bethesda's new patch brings major improvements to the spaceship customization system and adds new exploration features.",
    imageUrl: heroImage,
    category: {
      name: "News",
      color: "blue",
    },
    date: "Apr 1, 2025",
    commentCount: 17,
  },
  {
    id: "zelda-echoes-review",
    title: "The Legend of Zelda: Echoes of Wisdom Review",
    excerpt:
      "Link takes a backseat as Princess Zelda finally gets her own full adventure in this delightful spin-off.",
    imageUrl: heroImage,
    category: {
      name: "Review",
      color: "green",
    },
    date: "Mar 30, 2025",
    commentCount: 28,
    rating: 9.0,
  },
  {
    id: "baldurs-gate-dlc",
    title: "Baldur's Gate 3 Announces First Major Story Expansion",
    excerpt:
      "Larian Studios reveals plans for a massive new chapter continuing the story of the acclaimed RPG.",
    imageUrl: heroImage,
    category: {
      name: "News",
      color: "blue",
    },
    date: "Mar 28, 2025",
    commentCount: 41,
  },
  {
    id: "hollow-knight-silksong",
    title: "Hollow Knight: Silksong Finally Gets Release Date",
    excerpt:
      "Team Cherry's long-awaited sequel to the beloved metroidvania has been confirmed for this summer.",
    imageUrl: heroImage,
    category: {
      name: "News",
      color: "blue",
    },
    date: "Mar 26, 2025",
    commentCount: 63,
  },
  {
    id: "gaming-pc-build-guide",
    title: "2025 Gaming PC Build Guide: Best Setups for Every Budget",
    excerpt:
      "Our comprehensive guide helps you build the perfect gaming rig whether you have $800 or $3000 to spend.",
    imageUrl: heroImage,
    category: {
      name: "Guide",
      color: "orange",
    },
    date: "Mar 24, 2025",
    commentCount: 29,
  },
];

export function LatestArticles() {
  return (
    <section className="container mx-auto px-4 py-8 relative">
      {/* Gaming-inspired background elements */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gaming-cyan/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gaming-pink/5 rounded-full blur-3xl"></div>

      <div className="relative flex items-center mb-8">
        <Newspaper className="h-7 w-7 text-gaming-blue mr-3" />
        <h2 className="text-2xl md:text-3xl font-display font-bold relative">
          LATEST
          <span className="text-gaming-blue ml-2">ARTICLES</span>
          <div className="absolute -bottom-2 left-0 h-[3px] w-32 bg-gradient-to-r from-gaming-blue to-gaming-cyan"></div>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="gaming-button relative overflow-hidden group">
          <span className="relative z-10">LOAD MORE ARTICLES</span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gaming-purple via-gaming-blue to-gaming-purple bg-size-200 group-hover:bg-pos-100 transition-all duration-500"></span>
        </button>
      </div>
    </section>
  );
}
