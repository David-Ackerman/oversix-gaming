import { CategoryTabs } from "../components/category-tabs";
import { Footer } from "../components/footer";
import { HeroSection } from "../components/hero-section";
import { LatestArticles } from "../components/latest-articles";
import { Navbar } from "../components/navbar";
import { Newsletter } from "../components/newsletter";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CategoryTabs />
        <LatestArticles />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
