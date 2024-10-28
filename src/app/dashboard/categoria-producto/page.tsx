import { getSessionUser } from "@data/auth.data";
import { getProductsCategories } from "@data/productsCategories.data";
import ProductCategoryTable from "@ui/tables/ProductCategoryTable";

export default async function ProductCategoryTablePage() {
  const user = await getSessionUser();
  const categories = await getProductsCategories();

  return <ProductCategoryTable categories={categories} user={user} />;
}
