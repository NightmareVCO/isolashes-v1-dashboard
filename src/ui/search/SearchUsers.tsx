"use client";

import { Icon } from "@iconify/react";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useSearch() {
  const searchParameters = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [q, setQ] = useState(searchParameters.get("userQ") || "");

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const parameters = new URLSearchParams(searchParameters.toString());
      const query = event.target.value;
      if (query === "") {
        parameters.delete("userQ");
      } else {
        parameters.set("userQ", query);
        setQ(query);
      }

      replace(`${pathname}?${parameters}`);
    },
    300,
  );

  return { handleSearch, q };
}

type SearchProperties = {
  placeholder: string;
};

export default function SearchUsers({ placeholder }: SearchProperties) {
  const { handleSearch, q } = useSearch();

  return (
    <Input
      type="text"
      variant="bordered"
      isClearable
      placeholder={placeholder}
      defaultValue={q}
      endContent={<Icon icon="solar:magnifer-liner" />}
      onChange={handleSearch}
    />
  );
}
