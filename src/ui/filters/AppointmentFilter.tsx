"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function useAppointmentFilter() {
  const searchParameters = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [date, setDate] = useState(searchParameters.get("date") || "");

  const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const parameters = new URLSearchParams(searchParameters.toString());
    const query = event.target.value;
    if (query === "") {
      parameters.delete("date");
    } else {
      parameters.set("date", query);
      setDate(query);
    }

    replace(`${pathname}?${parameters}`);
  };

  return { handleSearch, date };
}

export default function AppointmentFilter() {
  const { handleSearch, date } = useAppointmentFilter();

  return (
    <Select
      variant="faded"
      size="sm"
      label="Fecha"
      name="date"
      radius="full"
      onChange={handleSearch}
      defaultSelectedKeys={[date]}
    >
      <SelectItem key="Hoy" title="Hoy">
        Hoy
      </SelectItem>
      <SelectItem key="Ayer" title="Ayer">
        Ayer
      </SelectItem>
      <SelectItem key="Mañana" title="Mañana">
        Mañana
      </SelectItem>
      <SelectItem key="Semana Pasada" title="Semana Pasada">
        Semana Pasada
      </SelectItem>
      <SelectItem key="Hace 2 Semanas" title="Hace 2 Semanas">
        Hace 2 Semanas
      </SelectItem>
      <SelectItem key="Hace 3 Semanas" title="Hace 3 Semanas">
        Hace 3 Semanas
      </SelectItem>
      <SelectItem key="Hace 1 mes" title="Hace 1 mes">
        Hace 1 Mes
      </SelectItem>
      <SelectItem key="Hace más de 1 mes" title="Hace más de 1 mes">
        Hace más de 1 Mes
      </SelectItem>
    </Select>
  );
}
