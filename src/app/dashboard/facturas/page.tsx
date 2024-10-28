import { getSessionUser } from "@data/auth.data";
import { getReceipts } from "@data/receipts.data";
import ReceiptsTable from "@ui/tables/ReceiptsTable";

const AMOUNT_OF_RECEIPTS = 9;

export default async function ReceiptsTablePage({ searchParams }: any) {
  const currentPage = searchParams.pagina || 1;
  const search = searchParams.q || "";
  const user = await getSessionUser();

  const receipts = await getReceipts({
    id: user?.id || "",
    order: "createdAt",
    orderDirection: "desc",
    takeValue: AMOUNT_OF_RECEIPTS,
    skipValue: currentPage * AMOUNT_OF_RECEIPTS - AMOUNT_OF_RECEIPTS,
    cursor: "",
    status: "true",
    where: "",
    whereValue: "",
    query: search || "",
  });

  const allReceiptsPages = Math.ceil(receipts.total / AMOUNT_OF_RECEIPTS);

  return (
    <ReceiptsTable
      receipts={receipts.receipts}
      allReceiptsPages={allReceiptsPages}
      user={user}
    />
  );
}
