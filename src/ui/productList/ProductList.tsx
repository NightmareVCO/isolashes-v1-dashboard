/* eslint-disable unicorn/no-array-reduce */
"use client";
import { Card, CardBody, Input } from "@nextui-org/react";
import AddProductButton from "@ui/buttons/addButton";
import RemoveProductButton from "@ui/buttons/removeButton";
import ProductIcon from "@ui/icons/ProductIcon";
import ProductIconSell from "@ui/icons/ProductIconSell";
import { SellModal } from "@ui/modals/SellModal";
import { useEffect, useRef, useState } from "react";

export function useProductList() {
  const [productsToSell, setProductsToSell] = useState<any>([]);
  const [inputValues, setInputValues] = useState<{ [key: string]: number }>({});
  const [previousLength, setPreviousLength] = useState(0);
  const scrollReference = useRef<HTMLDivElement>(null);

  const addProductToSell = (product: any, quantity: number) => {
    setProductsToSell((previousProducts: any) => {
      const existingProduct = previousProducts.find(
        (p: any) => p.id === product.id,
      );
      const maxQuantity = product.stock - product.minStock;

      if (existingProduct) {
        const newQuantity = existingProduct.quantity + quantity;
        return newQuantity > maxQuantity
          ? previousProducts.map((p: any) =>
              p.id === product.id ? { ...p, quantity: maxQuantity } : p,
            )
          : previousProducts.map((p: any) =>
              p.id === product.id ? { ...p, quantity: newQuantity } : p,
            );
      } else {
        return quantity > maxQuantity
          ? [...previousProducts, { ...product, quantity: maxQuantity }]
          : [...previousProducts, { ...product, quantity }];
      }
    });
  };

  const removeProductToSell = (product: any) => {
    setProductsToSell((previousProducts: any) => {
      const existingProduct = previousProducts.find(
        (p: any) => p.id === product.id,
      );
      return existingProduct && existingProduct.quantity > 1
        ? previousProducts.map((p: any) =>
            p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p,
          )
        : previousProducts.filter((p: any) => p.id !== product.id);
    });
  };

  const handleInputChange = (productId: string, value: number) => {
    setInputValues((previousValues) => ({
      ...previousValues,
      [productId]: value,
    }));
  };

  const handleAddProduct = (product: any) => {
    const quantity = inputValues[product.id] || 1;
    addProductToSell(product, quantity);
    setInputValues((previousValues) => ({
      ...previousValues,
      [product.id]: 1,
    }));
  };

  useEffect(() => {
    if (productsToSell.length > previousLength && scrollReference.current) {
      scrollReference.current.scrollTop = 0;
    }
    setPreviousLength(productsToSell.length);
  }, [productsToSell, previousLength]);

  const totalProducts = productsToSell.reduce(
    (accumulator: number, product: any) => accumulator + product.quantity,
    0,
  );
  const totalPrice = productsToSell.reduce(
    (accumulator: number, product: any) =>
      accumulator +
      (product.isPromotion
        ? product.promotionPrice * product.quantity
        : product.price * product.quantity),
    0,
  );

  return {
    productsToSell,
    setProductsToSell,
    addProductToSell,
    removeProductToSell,
    handleInputChange,
    handleAddProduct,
    totalProducts,
    totalPrice,
    inputValues,
    scrollReference,
  };
}

export default function ProductList({
  products,
  branches,
  user,
  users,
}: {
  products: any;
  branches: any;
  user: any;
  users: any;
}) {
  const {
    productsToSell,
    setProductsToSell,
    removeProductToSell,
    handleInputChange,
    handleAddProduct,
    totalPrice,
    inputValues,
    scrollReference,
  } = useProductList();

  return (
    <div className="relative flex h-screen gap-2">
      <div className="flex flex-col items-center justify-start overflow-y-scroll flex-2">
        {products.products.map((product: any) => (
          <Card
            key={product.id}
            shadow="none"
            className="p-4 flex justify-center items-center border-t border-l h-fit min-h-[120px]"
            radius="none"
            fullWidth
          >
            <CardBody>
              <div className="flex items-center justify-between h-full gap-2">
                <ProductIcon product={product} />
                <div className="flex gap-2">
                  <Input
                    placeholder="1"
                    type="number"
                    min="1"
                    max={product.stock - product.minStock}
                    value={inputValues[product.id]?.toString() || ""}
                    onChange={(event) =>
                      handleInputChange(
                        product.id,
                        Number.parseInt(event.target.value),
                      )
                    }
                  />
                  <AddProductButton
                    action={() => handleAddProduct(product)}
                    product={product}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="flex flex-col flex-3">
        {productsToSell.length === 0 && (
          <div className="flex items-center justify-center min-h-[calc(100vh_-_100px)] ">
            <p className="text-default-400">
              Todavía no ha agregado ningún producto{" "}
            </p>
          </div>
        )}
        {productsToSell.length > 0 && (
          <div className="flex items-center border rounded-md mb-2 justify-between flex-1 max-h-[100px] px-10">
            <SellModal
              products={productsToSell}
              setProducts={setProductsToSell}
              branches={branches}
              totalPrice={totalPrice.toFixed(2)}
              user={user}
              users={users}
            />
            <p className="text-xl font-medium text-default-700">
              Monto total: ${totalPrice.toFixed(2)}
            </p>
          </div>
        )}

        <div className="max-h-[calc(100vh_-_180px)] overflow-y-scroll">
          <div
            ref={scrollReference}
            className="flex flex-col-reverse items-center justify-end flex-4"
          >
            {productsToSell.map((product: any) => (
              <Card
                key={product.id}
                shadow="none"
                className={`p-4 border-t min-h-[100px] h-full border-l ${product === productsToSell.at(0) ? "border-b" : " "} h-fit`}
                radius="none"
                fullWidth
              >
                <CardBody>
                  <div className="flex items-center justify-between gap-2">
                    <ProductIconSell product={product} />
                    <RemoveProductButton
                      action={removeProductToSell}
                      product={product}
                    />
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
