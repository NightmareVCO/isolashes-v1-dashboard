import { getSessionUser } from "@data/auth.data";
import { getBranches } from "@data/branch.data";
import { getProducts } from "@data/products.data";
import { getUsers } from "@data/users.data";
import ProductList from "@ui/productList/ProductList";

export default async function SellProducts({ searchParams }: any) {
  const q = searchParams.q || "";
  const userQ = searchParams.userQ || "";

  const user = await getSessionUser();
  const products = await getProducts({
    order: "createdAt",
    orderDirection: "desc",
    takeValue: 100,
    skipValue: 0,
    cursor: "",
    status: "true",
    where: "status",
    whereValue: "true",
    query: q || "",
  });

  const users =
    userQ === ""
      ? []
      : await getUsers({
          order: "createdAt",
          orderDirection: "desc",
          takeValue: 100,
          skipValue: 0,
          cursor: "",
          status: "true",
          where: "",
          whereValue: "",
          query: userQ || "",
          adminId: user?.id,
        });

  const branches = await getBranches();

  const availableProducts = {
    ...products,
    products: products.products.filter(
      (product: any) =>
        product.stock > 0 &&
        product.status === true &&
        product.minStock < product.stock,
    ),
  };

  return (
    <section className="min-h-full">
      <ProductList
        products={availableProducts}
        branches={branches}
        user={user}
        users={users.users}
      />
    </section>
  );
}
