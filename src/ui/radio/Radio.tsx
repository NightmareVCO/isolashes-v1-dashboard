import { cn, Radio as NextUIRadio } from "@nextui-org/react";
import React from "react";

export const Radio = (properties: any) => {
  const { children, ...otherProperties } = properties;

  return (
    <NextUIRadio
      {...otherProperties}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary data-[hover=true]:border-primary",
        ),
      }}
    >
      {children}
    </NextUIRadio>
  );
};
