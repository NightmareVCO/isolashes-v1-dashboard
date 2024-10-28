"use client";

import {
  addProductInventory,
  removeProductInventory,
} from "@action/product.action";
import { Icon } from "@iconify/react";
import type { CardProps } from "@nextui-org/react";
import { Button, Card, CardBody, CardFooter, Spacer } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { useFormState } from "react-dom";

type ProductCardProperties = {
  product: any;
  properties?: CardProps;
  user: any;
};

export function useProductCard() {
  const [addProductState, addProductForm] = useFormState(
    addProductInventory,
    undefined,
  );

  const [removeProductState, removeProductForm] = useFormState(
    removeProductInventory,
    undefined,
  );

  return {
    addProductForm,
    removeProductForm,
    addProductState,
    removeProductState,
  };
}

export default function ProductCard({
  product,
  properties,
  user,
}: ProductCardProperties) {
  const { addProductForm, removeProductForm } = useProductCard();

  return (
    <Card className="w-[300px] grow" {...properties}>
      <CardBody className="flex flex-row items-center justify-center px-3 pb-1">
        <div className="flex items-center justify-center">
          <Image
            alt={product.name}
            width={100}
            height={100}
            src={product.productImage[0]?.url}
            className="rounded-lg"
          />
        </div>

        <Spacer y={2} />
        <div className="flex flex-col items-center justify-center gap-2 px-2">
          <p className="font-medium text-large">{product.name}</p>
          <p className="text-small text-default-400">
            Cantidad: {product.stock}
          </p>
          <p className="text-small text-default-400">
            Cantidad Minima: {product.minStock}
          </p>
        </div>
      </CardBody>
      <CardFooter className="justify-end gap-2">
        <form action={removeProductForm} className="w-full">
          <input
            type="hidden"
            className="sr-only"
            name="productId"
            value={product.id}
          />
          <input type="hidden" className="sr-only" name="id" value={user.id} />
          <Button fullWidth className="bg-red-500" type="submit">
            <Icon
              className="text-white"
              icon="solar:minus-circle-bold"
              width={24}
            />
          </Button>
        </form>
        <form action={addProductForm} className="w-full">
          <input
            type="hidden"
            className="sr-only"
            name="productId"
            value={product.id}
          />
          <input type="hidden" className="sr-only" name="id" value={user.id} />
          <Button fullWidth color="primary" type="submit">
            <Icon
              className="text-white"
              icon="solar:add-circle-bold"
              width={24}
            />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
