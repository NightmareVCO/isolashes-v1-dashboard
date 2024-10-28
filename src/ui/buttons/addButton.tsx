"use client";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";

export default function AddProductButton({
  action,
  product,
}: {
  action: (product: any) => void;
  product: any;
}) {
  return (
    <Button
      onPress={() => action(product)}
      size="sm"
      isIconOnly
      color="primary"
      aria-label="add-to-cart"
    >
      <Icon className="text-white" icon="solar:add-circle-bold" width={20} />
    </Button>
  );
}
