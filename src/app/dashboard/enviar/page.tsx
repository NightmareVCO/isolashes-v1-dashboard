import { getSessionUser } from "@data/auth.data";
import { getOrders } from "@data/orders.data";
import { Spacer } from "@nextui-org/react";
import OrderCard from "@ui/cards/OrderCard";

import OrderFilter from "@/ui/filters/OrderFilter";

const AMOUNT_OF_ORDERS = 20;

export default async function DeliverOrder({ searchParams }: any) {
  const user = await getSessionUser();
  const q = searchParams.q || "";
  const status = searchParams.status || "";

  const orders = await getOrders({
    id: user?.id || "",
    order: "createdAt",
    orderDirection: "desc",
    takeValue: AMOUNT_OF_ORDERS,
    skipValue: 0,
    cursor: "",
    status: "true",
    where: "completed",
    whereValue: status || "false",
    query: q || "",
  });

  return (
    <section className="overflow-y-scroll">
      <OrderFilter />
      <Spacer y={2} />
      {orders.orders.map((order: any) => (
        <OrderCard key={order.id} order={order} user={user} />
      ))}
      {orders.total === 0 && (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-2xl text-gray-400">No hay ordenes activas</h1>
        </div>
      )}
    </section>
  );
}
