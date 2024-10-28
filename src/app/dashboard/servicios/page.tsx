import { getSessionUser } from "@data/auth.data";
import { getServices } from "@data/service.data";
import { getServicesCategories } from "@data/servicesCategories.data";
import ServicesTable from "@ui/tables/ServicesTable";

export default async function ServicesTablePage() {
  const user = await getSessionUser();
  const services = await getServices("");
  const categories = await getServicesCategories();

  return (
    <ServicesTable services={services} categories={categories} user={user} />
  );
}
