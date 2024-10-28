import { getAppointments } from "@data/appointment.data";
import { getUser } from "@data/auth.data";
import { getOrders } from "@data/orders.data";
import { getServices } from "@data/service.data";
import TabsUserDetails from "@ui/userDetails/UserDetails";

export default async function UserDetails({ params, searchParams }: any) {
  const searchQ = searchParams.q || "";
  const { slug } = params;
  const noStore = true;
  const user = await getUser(slug, noStore);
  const appointments = await getAppointments({
    id: user.id,
    order: "date",
    orderDirection: "desc",
    takeValue: 100,
    skipValue: 0,
    cursor: "",
    status: "",
    date: "",
    noStore: true,
  });
  const services = await getServices(searchQ);
  const orders = await getOrders({
    id: user.id,
    order: "dateOrdered",
    orderDirection: "desc",
    takeValue: 100,
    skipValue: 0,
    cursor: "",
    status: "",
    where: "",
    whereValue: "",
    query: "",
  });

  return (
    <TabsUserDetails
      user={user}
      appointments={appointments}
      services={services}
      orders={orders}
    />
  );
}
