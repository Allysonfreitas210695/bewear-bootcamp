import Image from "next/image";

import ProductList from "@/components/common/product-list";
import { db } from "@/db";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  return (
    <>
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src={"/banner-01.png"}
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-full w-full"
          />
        </div>

        <ProductList title="Mais vendidos" products={products} />

        <div className="px-5">
          <Image
            src={"/banner-02.png"}
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-full w-full"
          />
        </div>
      </div>
    </>
  );
}
