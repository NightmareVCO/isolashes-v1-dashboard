"use client";

import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

export interface ProvidersProperties {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children }: ProvidersProperties) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      {/* <NextThemesProvider {...themeProps}>{children}</NextThemesProvider> */}
      {children}
    </NextUIProvider>
  );
}
