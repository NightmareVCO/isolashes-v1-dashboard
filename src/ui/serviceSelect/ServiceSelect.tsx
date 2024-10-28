import { Avatar, Select, SelectItem } from "@nextui-org/react";
import React from "react";

export default function ServiceSelect({
  services,
  previousSelection,
  setPreviousSelection,
  resetKey,
  firstService,
}: {
  services: any[];
  previousSelection: any[];
  setPreviousSelection: any;
  resetKey: number;
  firstService: any;
}) {
  if (!services) return null;
  const handleOnSelectionChange = (value: any) => {
    if (value.anchorKey === undefined) {
      setPreviousSelection([firstService.id]);
    } else {
      setPreviousSelection(value);
    }
  };

  return (
    <Select
      key={resetKey}
      items={services ?? []}
      label="Servicios"
      selectionMode="multiple"
      variant="bordered"
      onSelectionChange={handleOnSelectionChange}
      selectedKeys={[...previousSelection]}
      classNames={{
        label: "group-data-[filled=true]:-translate-y-20",
        trigger: "min-h-52",
        listboxWrapper: "max-h-[300px]",
        innerWrapper: "max-h-44 overflow-auto",
        value: "flex flex-col items-start justify-center gap-y-1 h-full",
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-primary",
          ],
        },
      }}
      popoverProps={{
        classNames: {
          base: "before:bg-default-200",
          content: "p-0 border-small border-divider bg-background",
        },
      }}
      renderValue={(items) => {
        return items?.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <Avatar
              alt={item.data.name}
              className="flex-shrink-0"
              size="sm"
              src={
                item.data.serviceCategory.cover ??
                item.data.serviceCategory.cover2 ??
                "/placeholder.webp"
              }
            />
            <div className="flex flex-col">
              <span>{item.data.name}</span>
              <span className="text-default-500 text-tiny truncate">
                ({item.data.description + " - RD$" + item.data.price})
              </span>
            </div>
          </div>
        ));
      }}
    >
      {(service) => (
        <SelectItem key={service.id} textValue={service.name} value={service}>
          <div className="flex items-center gap-2">
            <Avatar
              alt={service.name}
              className="flex-shrink-0"
              size="sm"
              src={
                service.serviceCategory.cover ??
                service.serviceCategory.cover2 ??
                "/placeholder.webp"
              }
            />
            <div className="flex flex-col">
              <span className="text-small">{service.name}</span>
              <span className="text-tiny text-default-400">
                {service.description + " - RD$" + service.price}
              </span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
