import { getAllAppointmentsCount } from "@data/appointment.data";
import { getSessionUser } from "@data/auth.data";
import { getAllBranchesCount } from "@data/branch.data";
import { getAllOrdersCount } from "@data/orders.data";
import { getAllProductsCount } from "@data/products.data";
import { getAllServicesCount } from "@data/service.data";
import { getAllUsersCount } from "@data/users.data";
import { Divider, Spacer } from "@nextui-org/react";
import DashboardCards from "@ui/cards/DashboardCards";
import DashboardCountCard, {
  DashboardCountCardProperties,
} from "@ui/cards/DashboardCountCard";

async function useDashboardInitialPage() {
  const user = await getSessionUser();
  if (!user || !user.id) return { itemsCounts: [] };

  const appointments = await getAllAppointmentsCount(user.id);
  const users = await getAllUsersCount(user.id);
  const products = await getAllProductsCount();
  const services = await getAllServicesCount();
  const branches = await getAllBranchesCount();
  const orders = await getAllOrdersCount();

  const itemsCounts: DashboardCountCardProperties[] = [
    {
      key: "appointments",
      title: "Citas de hoy",
      icon: "solar:calendar-mark-linear",
      count: appointments.allToday,
      href: "/dashboard/citas",
    },
    {
      key: "orders",
      title: "Ordenes",
      icon: "solar:cart-5-linear",
      count: orders,
      href: "/dashboard/ordenes",
    },
    {
      key: "users",
      title: "Usuarios",
      icon: "solar:users-group-two-rounded-outline",
      count: users,
      href: "/dashboard/usuarios",
    },
    {
      key: "products",
      title: "Productos",
      icon: "solar:cart-check-linear",
      count: products,
      href: "/dashboard/productos",
    },
    {
      key: "services",
      title: "Servicios",
      icon: "solar:hand-shake-linear",
      count: services,
      href: "/dashboard/servicios",
    },
    {
      key: "branches",
      title: "Sucursales",
      icon: "solar:shop-2-linear",
      count: branches,
      href: "/dashboard/sucursales",
    },
  ];

  return { itemsCounts };
}

export default async function DashboardInitialPage() {
  const { itemsCounts } = await useDashboardInitialPage();

  return (
    <section className="w-full overflow-y-scroll">
      <h2 className="w-full text-lg text-start">Cantidades</h2>
      <Divider />
      <Spacer y={4} />
      <div className="flex flex-row flex-wrap items-center gap-5 justify-evenly">
        {itemsCounts?.map((item) => {
          return <DashboardCountCard key={item.key} item={item} />;
        })}
      </div>

      <Spacer y={4} />
      <DashboardCards />
    </section>
  );
}
