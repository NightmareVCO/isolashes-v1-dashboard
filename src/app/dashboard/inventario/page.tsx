import { getSessionUser } from "@data/auth.data";
import { getProducts } from "@data/products.data";
import ProductCard from "@ui/cards/ProductCard";
import Pagination from "@ui/pagination/Pagination";

const AMOUNT_OF_PRODUCTS = 9;

export default async function InventoryPage({ searchParams }: any) {
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
    where: "isNew",
    whereValue: "false",
    query: search || "",
  });
  const allProductsPages = Math.ceil(products.total / AMOUNT_OF_PRODUCTS);

  return (
    <section className="flex flex-col items-center justify-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-5 fl">
        {products.products.map((product: any) => (
          <ProductCard key={product.id} product={product} user={user} />
        ))}
      </div>

      <div className="flex items-center justify-center">
        <Pagination total={allProductsPages} />
      </div>
    </section>
  );
}
