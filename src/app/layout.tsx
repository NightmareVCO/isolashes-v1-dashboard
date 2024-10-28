import "@styles/globals.css";

import { Providers } from "@app/providers";
import { siteConfig } from "@config/site";
import clsx from "clsx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="light scroll-smooth">
      <head />
      <body className={clsx("min-h-screen bg-background antialiased")}>
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <div className="flex-grow">
              <main>{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
