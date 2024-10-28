/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionItem,
  type ListboxProps,
  type ListboxSectionProps,
  type Selection,
} from "@nextui-org/react";
import {
  Listbox,
  ListboxItem,
  ListboxSection,
  Tooltip,
} from "@nextui-org/react";
import { cn } from "@utils/cn";
import React from "react";

export enum SidebarItemType {
  Nest = "nest",
}

export type SidebarItem = {
  key: string;
  title: string;
  icon?: string;
  href?: string;
  type?: SidebarItemType.Nest;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  items?: SidebarItem[];
  className?: string;
};

export type SidebarProperties = Omit<ListboxProps<SidebarItem>, "children"> & {
  items: SidebarItem[];
  isCompact?: boolean;
  hideEndContent?: boolean;
  iconClassName?: string;
  sectionClasses?: ListboxSectionProps["classNames"];
  classNames?: ListboxProps["classNames"];
  defaultSelectedKey: string;
  onSelect?: (key: string) => void;
};

const Sidebar = React.forwardRef<HTMLElement, SidebarProperties>(
  (
    {
      items,
      isCompact,
      defaultSelectedKey,
      onSelect,
      hideEndContent,
      sectionClasses: sectionClassesProperty = {},
      itemClasses: itemClassesProperty = {},
      iconClassName,
      classNames,
      className,
      ...properties
    },
    reference,
  ) => {
    const [selected, setSelected] =
      React.useState<React.Key>(defaultSelectedKey);

    const sectionClasses = {
      ...sectionClassesProperty,
      base: cn(sectionClassesProperty?.base, "w-full", {
        "p-0 max-w-[44px]": isCompact,
      }),
      group: cn(sectionClassesProperty?.group, {
        "flex flex-col gap-1": isCompact,
      }),
      heading: cn(sectionClassesProperty?.heading, {
        hidden: isCompact,
      }),
    };

    const itemClasses = {
      ...itemClassesProperty,
      base: cn(itemClassesProperty?.base, {
        "w-11 h-11 gap-0 p-0": isCompact,
      }),
    };

    const renderNestItem = React.useCallback(
      (item: SidebarItem) => {
        const isNestType =
          item.items &&
          item.items?.length > 0 &&
          item?.type === SidebarItemType.Nest;

        if (isNestType) {
          // Is a nest type item , so we need to remove the href
          delete item.href;
        }

        return (
          <ListboxItem
            {...item}
            key={item.key}
            classNames={{
              base: cn(
                {
                  "h-auto p-0": !isCompact && isNestType,
                },
                {
                  "inline-block w-11": isCompact && isNestType,
                },
              ),
            }}
            endContent={
              isCompact || isNestType || hideEndContent
                ? null
                : item.endContent ?? null
            }
            startContent={
              isCompact || isNestType ? null : item.icon ? (
                <Icon
                  className={cn(
                    "text-white group-data-[selected=true]:text-white group-data-[hover=true]:text-white",
                    iconClassName,
                  )}
                  icon={item.icon}
                  width={24}
                />
              ) : (
                item.startContent ?? null
              )
            }
            title={isCompact || isNestType ? null : item.title}
          >
            {isCompact ? (
              <Tooltip content={item.title} placement="right">
                <div className="flex items-center justify-center w-full">
                  {item.icon ? (
                    <Icon
                      className={cn(
                        "text-default-500 group-data-[selected=true]:text-white group-data-[hover=true]:text-white",
                        iconClassName,
                      )}
                      icon={item.icon}
                      width={24}
                    />
                  ) : (
                    item.startContent ?? null
                  )}
                </div>
              </Tooltip>
            ) : null}
            {!isCompact && isNestType ? (
              <Accordion className={"p-0"}>
                <AccordionItem
                  key={item.key}
                  aria-label={item.title}
                  classNames={{
                    heading: "pr-3",
                    trigger: "p-0",
                    content: "py-0 pl-4",
                  }}
                  title={
                    item.icon ? (
                      <div
                        className={"flex h-11 items-center gap-2 px-2 py-1.5"}
                      >
                        <Icon
                          className={cn(
                            "text-default-500 group-data-[selected=true]:text-foreground",
                            iconClassName,
                          )}
                          icon={item.icon}
                          width={24}
                        />
                        <span className="text-small font-medium text-default-500 group-data-[selected=true]:text-foreground">
                          {item.title}
                        </span>
                      </div>
                    ) : (
                      item.startContent ?? null
                    )
                  }
                >
                  {item.items && item.items?.length > 0 ? (
                    <Listbox
                      className={"mt-0.5"}
                      classNames={{
                        list: cn("border-l border-default-200 pl-4"),
                      }}
                      items={item.items}
                      variant="flat"
                    >
                      {item.items.map((element) => renderItem(element))}
                    </Listbox>
                  ) : (
                    renderItem(item)
                  )}
                </AccordionItem>
              </Accordion>
            ) : null}
          </ListboxItem>
        );
      },
      [isCompact, hideEndContent, iconClassName, items],
    );

    const renderItem = React.useCallback(
      (item: SidebarItem) => {
        const isNestType =
          item.items &&
          item.items?.length > 0 &&
          item?.type === SidebarItemType.Nest;

        if (isNestType) {
          return renderNestItem(item);
        }

        return (
          <ListboxItem
            {...item}
            key={item.key}
            endContent={
              isCompact || hideEndContent ? null : item.endContent ?? null
            }
            startContent={
              isCompact ? null : item.icon ? (
                <Icon
                  className={cn(
                    "text-default-500 group-data-[selected=true]:text-white group-data-[hover=true]:text-white",
                    iconClassName,
                  )}
                  icon={item.icon}
                  width={24}
                />
              ) : (
                item.startContent ?? null
              )
            }
            textValue={item.title}
            title={isCompact ? null : item.title}
          >
            {isCompact ? (
              <Tooltip content={item.title} placement="right">
                <div className="flex items-center justify-center w-full">
                  {item.icon ? (
                    <Icon
                      className={cn(
                        "text-default-500 group-data-[selected=true]:text-white group-data-[hover=true]:text-white",
                        iconClassName,
                      )}
                      icon={item.icon}
                      width={24}
                    />
                  ) : (
                    item.startContent ?? null
                  )}
                </div>
              </Tooltip>
            ) : null}
          </ListboxItem>
        );
      },
      [isCompact, hideEndContent, iconClassName, itemClasses?.base],
    );

    return (
      <Listbox
        key={isCompact ? "compact" : "default"}
        ref={reference}
        hideSelectedIcon
        as="nav"
        className={cn("list-none", className)}
        classNames={{
          ...classNames,
          list: cn("items-center", classNames?.list),
        }}
        color="default"
        //aquí tengo los colores de los hover y seleccionado, tanto del texto como del fondo
        itemClasses={{
          ...itemClasses,
          base: cn(
            "px-3 min-h-11 rounded-large h-[44px] data-[selected=true]:bg-primary data-[selectable=true]:focus:bg-primary data-[hover=true]:bg-primary/90",
            itemClasses?.base,
          ),
          title: cn(
            "text-small font-medium text-default-500 group-data-[selected=true]:text-white group-data-[hover=true]:text-white",
            itemClasses?.title,
          ),
        }}
        items={items}
        selectedKeys={[selected] as unknown as Selection}
        selectionMode="single"
        variant="flat"
        onAction={(key) => {
          setSelected(key as React.Key);
          onSelect?.(key as string);
        }}
        {...properties}
      >
        {(item) => {
          return item.items &&
            item.items?.length > 0 &&
            item?.type === SidebarItemType.Nest ? (
            renderNestItem(item)
          ) : item.items && item.items?.length > 0 ? (
            <ListboxSection
              key={item.key}
              classNames={sectionClasses}
              showDivider={isCompact}
              title={item.title}
            >
              {item.items.map((element) => renderItem(element))}
            </ListboxSection>
          ) : (
            renderItem(item)
          );
        }}
      </Listbox>
    );
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
