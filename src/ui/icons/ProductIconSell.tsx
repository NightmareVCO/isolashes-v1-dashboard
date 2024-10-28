"use client";

import { User } from "@nextui-org/react";
import Image from "next/image";

export default function ProductIconSell({ product }: { product: any }) {
  return (
    <User
      name={`${product.name} - RD$${product.isPromotion ? product.promotionPrice : product.price}`}
      description={`${product.quantity} agregados - total: RD$${product.isPromotion ? product.promotionPrice * product.quantity : product.price * product.quantity}`}
      className={`${product.isPromotion && "text-red-500"}`}
      avatarProps={{
        radius: "sm",
        src: product.productImage[0]?.url,
        ImgComponent: () => (
          <Image
            src={product.productImage[0]?.url}
            alt={product.name}
            width={40}
            height={40}
          />
        ),
      }}
    />
  );
}
