"use client";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";

export default function RemoveProductButton({
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
      color="danger"
      aria-label="add-to-cart"
    >
      <Icon className="text-white" icon="solar:minus-circle-bold" width={20} />
    </Button>
  );
}
