import { getSessionUser } from "@data/auth.data";
import { getOrders } from "@data/orders.data";
import OrdersTable from "@ui/tables/OrdersTable";

const AMOUNT_OF_ORDERS = 9;

export default async function OrdersTablePage({ searchParams }: any) {
  const currentPage = searchParams.pagina || 1;
  const search = searchParams.q || "";
  const user = await getSessionUser();

  const orders = await getOrders({
    id: user?.id || "",
    order: "createdAt",
    orderDirection: "desc",
    takeValue: AMOUNT_OF_ORDERS,
    skipValue: currentPage * AMOUNT_OF_ORDERS - AMOUNT_OF_ORDERS,
    cursor: "",
    status: "true",
    where: "",
    whereValue: "",
    query: search || "",
  });

  const allOrdersPages = Math.ceil(orders.total / AMOUNT_OF_ORDERS);

  return (
    <OrdersTable
      orders={orders.orders}
      allOrdersPages={allOrdersPages}
      user={user}
    />
  );
}
