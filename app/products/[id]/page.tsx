import { notFound } from "next/navigation";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ProductPDPClient from "@/components/product/ProductPDPClient";
import { getProductById, getRelatedProducts, PRODUCTS } from "@/data/products";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(product.id, product.category, 6);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />
      <div className="flex-grow">
        <ProductPDPClient product={product} related={related} />
      </div>
      <Footer />
    </div>
  );
}
