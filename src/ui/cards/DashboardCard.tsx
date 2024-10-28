"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";

import { SidebarItem } from "@/ui/sidebar/Sidebar";

export default function DashboardCard({ item }: { item: SidebarItem }) {
  return (
    <Link href={item.href!}>
      <Card className="transition-transform border-small hover:scale-105 size-80 border-primary/50">
        <CardHeader className="flex items-center justify-center">
          <Icon icon={item.icon!} width={60} className="text-primary" />
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-center">
            <span className="ml-2 text-lg">{item.title}</span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
