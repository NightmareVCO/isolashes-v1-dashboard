"use client";

import { Pagination as NextUIPagination } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export function usePagination() {
  const searchParameters = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = useRef(searchParameters.get("pagina"));

  const handlePagination = useDebouncedCallback((page: number) => {
    const parameters = new URLSearchParams(searchParameters.toString());
    parameters.set("pagina", page.toString());
    if (parameters.get("q") === "") {
      parameters.delete("q");
    }
    replace(`${pathname}?${parameters}`);
  }, 300);

  return {
    page: page.current ? Number.parseInt(page.current) : 1,
    handlePagination,
  };
}

type PaginationProperties = {
  total: number;
};

export default function Pagination({ total }: PaginationProperties) {
  const { page, handlePagination } = usePagination();

  return (
    <NextUIPagination
      loop
      showControls
      isCompact
      page={page}
      total={total}
      onChange={handlePagination}
      className="text-white"
    />
  );
}
