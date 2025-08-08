import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import Orders from "./components/orders";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) redirect("/login");

  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  const parsedOrders = orders.map((order) => ({
    id: order.id,
    totalPriceInCents: order.totalPriceInCents,
    status: order.status,
    createdAt: order.createdAt,
    items: order.items.map((item) => ({
      imageURL: item.productVariant.imageUrl,
      productName: item.productVariant.product.name,
      productvariantName: item.productVariant.product.name,
      priceInCents: item.productVariant.priceInCents,
      quantity: item.quantity,
    })),
  }));

  return (
    <div className="px-5">
      <Orders orders={parsedOrders} />
    </div>
  );
};

export default MyOrdersPage;
