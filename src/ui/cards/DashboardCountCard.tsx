"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

export type DashboardCountCardProperties = {
  key: string;
  title: string;
  href: string;
  icon: string;
  count: number;
};

export default function DashboardCountCard({
  item,
}: {
  item: DashboardCountCardProperties;
}) {
  return (
    <Link href={item.href!}>
      <Card className="transition-transform border-small hover:scale-105 size-80 border-primary/50">
        <CardBody>
          <div className="flex items-center justify-between">
            <Icon icon={item.icon!} width={50} className="text-primary" />
            <span className="ml-2 text-lg">{item.title}:</span>
            <span className="ml-2 text-lg">{item.count}</span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
