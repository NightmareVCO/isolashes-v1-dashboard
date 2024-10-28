"use client";
import { Divider, Spacer } from "@nextui-org/react";
import DashboardCard from "@ui/cards/DashboardCard";
import { sectionItems } from "@ui/sidebar/sidebarItem/SidebarItem";

export default function DashboardCards() {
  return (
    <div className="flex flex-wrap w-full h-full justify-evenly">
      {sectionItems.map((item) => {
        return (
          <div key={item.key} className="flex flex-col w-full">
            <h2 className="w-full text-lg text-start">{item.title}</h2>
            <Divider />
            <Spacer y={4} />
            <div className="flex flex-wrap items-center w-full gap-5 justify-evenly">
              {item.items?.map((item) => (
                <DashboardCard key={item.key} item={item} />
              ))}
            </div>
            <Spacer y={6} />
          </div>
        );
      })}
    </div>
  );
}
