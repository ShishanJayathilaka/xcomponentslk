import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CartPageClient from "@/components/cart/CartPageClient";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />
      <CheckoutStepper />
      <div className="flex-grow">
        <CartPageClient />
      </div>
      <Footer />
    </div>
  );
}
