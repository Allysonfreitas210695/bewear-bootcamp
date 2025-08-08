"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { orderTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

interface OrderProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: (typeof orderTable.$inferSelect)["status"];
    createdAt: Date;
    items: Array<{
      imageURL: string;
      productName: string;
      productvariantName: string;
      priceInCents: number;
      quantity: number;
    }>;
  }>;
}

const Orders = ({ orders }: OrderProps) => {
  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex flex-col gap-1">
                    {
                      {
                        pending: <Badge>Pendente de pagamento</Badge>,
                        paid: <Badge variant="secondary">Pago</Badge>,
                        canceled: (
                          <Badge variant="destructive">Cancelado</Badge>
                        ),
                      }[order.status]
                    }
                    <p>
                      Pedido feito em{" "}
                      {new Date(order.createdAt).toLocaleDateString("pt-BR")} ás
                      {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-between">
                    <p className="text-sm">Subtotal</p>
                    <p className="text-muted-foreground text-sm font-medium">
                      {formatCentsToBRL(order.totalPriceInCents)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Frete</p>
                    <p className="text-muted-foreground text-sm font-medium">
                      GRÁTIS
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Total</p>
                    <p className="text-muted-foreground text-sm font-medium">
                      {formatCentsToBRL(order.totalPriceInCents)}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
