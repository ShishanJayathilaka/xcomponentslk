import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/layout/HeroSection";
import BrandMarquee from "@/components/layout/BrandMarquee";
import CategoryGrid from "@/components/layout/CategoryGrid";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <BrandMarquee />
        <CategoryGrid />
      </main>

      <Footer />
    </div>
  );
}