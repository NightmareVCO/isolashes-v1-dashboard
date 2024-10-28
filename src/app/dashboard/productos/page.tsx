import { getSessionUser } from "@data/auth.data";
import { getProducts } from "@data/products.data";
import { getProductsCategories } from "@data/productsCategories.data";
import ProductsTable from "@ui/tables/ProductsTable";

const AMOUNT_OF_PRODUCTS = 9;

export default async function ProductsTablePage({ searchParams }: any) {
  const currentPage = searchParams.pagina || 1;
  const search = searchParams.q || "";
  const user = await getSessionUser();

  const products = await getProducts({
    order: "createdAt",
    orderDirection: "desc",
    takeValue: AMOUNT_OF_PRODUCTS,
    skipValue: currentPage * AMOUNT_OF_PRODUCTS - AMOUNT_OF_PRODUCTS,
    cursor: "",
    status: "true",
    where: "",
    whereValue: "",
    query: search || "",
  });
  const allProductsPages = Math.ceil(products.total / AMOUNT_OF_PRODUCTS);
  const categories = await getProductsCategories();

  return (
    <ProductsTable
      products={products.products}
      allProductsPages={allProductsPages}
      categories={categories}
      user={user}
    />
  );
}
