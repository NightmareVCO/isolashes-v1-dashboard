"use client";

import { Icon } from "@iconify/react";
import IsolashesLogo from "@icons/IsolashesLogo";
import {
  Avatar,
  AvatarIcon,
  Button,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import Search from "@ui/search/Search";
import Sidebar from "@ui/sidebar/Sidebar";
import SidebarDrawer from "@ui/sidebar/sidebarDrawer/SidebarDrawer";
import { sectionItems } from "@ui/sidebar/sidebarItem/SidebarItem";
import { cleanTitle } from "@utils/cleanTitle";
import { cn } from "@utils/cn";
import { toTitleCase } from "@utils/toTitleCase";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

type MainWrapperProperties = {
  children: React.ReactNode;
  user: any;
};

export function useMainWrapper() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();
  let cleanPathname = pathname.split("/")[2] ?? pathname.split("/")[1];
  if (cleanPathname.includes("-")) cleanPathname = cleanTitle(cleanPathname);
  const cleanPathnameTitleCase = toTitleCase(cleanPathname);

  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isCompact = isCollapsed || isMobile;

  const onToggle = React.useCallback(() => {
    setIsCollapsed((previous) => !previous);
  }, []);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return {
    isOpen,
    onOpen,
    onOpenChange,
    cleanPathname,
    cleanPathnameTitleCase,
    isCompact,
    onToggle,
    handleBack,
  };
}

export default function MainWrapper({ user, children }: MainWrapperProperties) {
  const {
    isOpen,
    onOpenChange,
    cleanPathname,
    cleanPathnameTitleCase,
    isCompact,
    onToggle,
    handleBack,
  } = useMainWrapper();

  const content = (
    <div
      className={cn(
        "relative flex flex-col flex-1 h-full p-6 transition-width",
        {
          "w-72": !isCompact,
          "w-16 items-center px-2 py-6": isCompact,
        },
      )}
    >
      <div className="flex items-center gap-2 px-2">
        <Link href="/dashboard">
          <IsolashesLogo
            className={cn("h-auto mb-4", {
              "w-40 lg:w-48 xl:w-60": !isCompact,
              "w-8": isCompact,
            })}
          />
        </Link>
      </div>
      <Spacer y={8} />
      <div className="flex items-center gap-3 px-3">
        <Avatar
          isBordered
          size="md"
          color="primary"
          src={user?.image}
          icon={user?.image ? "" : <AvatarIcon />}
          classNames={{
            icon: "text-secondary",
          }}
        />
        <div className={cn("flex flex-col", { hidden: isCompact })}>
          <p className="font-medium text-small text-default-600">
            {user.name} {user.lastName}
          </p>
          <p className="text-tiny text-default-400">{user.email}</p>
        </div>
      </div>
      <Spacer y={8} />
      <Sidebar
        defaultSelectedKey={
          cleanPathname === "dashboard" ? "inicio" : cleanPathname
        }
        items={sectionItems}
        isCompact={isCompact}
      />
      <Spacer y={8} />
      <div className="flex flex-col mt-auto">
        <Button
          type="submit"
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          startContent={
            <Icon
              className="rotate-180 text-default-500"
              icon="solar:minus-circle-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          <Link prefetch href="/logout">
            Cerrar Sesión
          </Link>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex w-full overflow-y-hidden h-dvh">
      <SidebarDrawer
        className="!border-r-small border-divider"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {content}
      </SidebarDrawer>
      <div className="flex-col flex-1 w-full p-4">
        <header className="flex items-center justify-between h-16 gap-2 px-4 rounded-medium bg-primary/80 border-divider">
          <div className="flex gap-1">
            <Button isIconOnly size="sm" variant="light" onPress={handleBack}>
              <Icon
                className="text-white"
                height={24}
                width={24}
                icon="solar:double-alt-arrow-left-linear"
              />
            </Button>
            <Button isIconOnly size="sm" variant="light" onPress={onToggle}>
              <Icon
                className="text-white"
                height={24}
                width={24}
                icon="solar:sidebar-minimalistic-outline"
              />
            </Button>
          </div>
          <h2 className="font-medium text-white text-large">
            {cleanPathnameTitleCase || "Inicio"}
          </h2>
          <div className="w-1/4 ">
            <Search placeholder={`Buscar ${cleanPathname}...`} />
          </div>
        </header>
        <main className="w-full h-full mt-4 overflow-visible">
          <div className="flex h-[90%] w-full flex-col gap-4 rounded-medium">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
