"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function useAppointmentFilter() {
  const searchParameters = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [date, setDate] = useState(searchParameters.get("status") || "");

  const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const parameters = new URLSearchParams(searchParameters.toString());
    const query = event.target.value;
    if (query === "") {
      parameters.delete("status");
    } else {
      parameters.set("status", query);
      setDate(query);
    }

    replace(`${pathname}?${parameters}`);
  };

  return { handleSearch, date };
}

export default function OrderFilter() {
  const { handleSearch, date } = useAppointmentFilter();

  return (
    <Select
      variant="faded"
      size="sm"
      label="Estado"
      name="status"
      radius="full"
      onChange={handleSearch}
      defaultSelectedKeys={[date]}
    >
      <SelectItem key="true" title="Completadas">
        Completadas
      </SelectItem>
      <SelectItem key="false" title="Pendientes">
        Pendientes
      </SelectItem>
    </Select>
  );
}
