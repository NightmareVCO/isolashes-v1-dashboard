import { getSessionUser } from "@data/auth.data";
import { getServicesCategories } from "@data/servicesCategories.data";
import ServiceCategoryTable from "@ui/tables/ServiceCategoryTable";

export default async function ServiceCategoryTablePage() {
  const user = await getSessionUser();
  const categories = await getServicesCategories();

  return <ServiceCategoryTable categories={categories} user={user} />;
}
