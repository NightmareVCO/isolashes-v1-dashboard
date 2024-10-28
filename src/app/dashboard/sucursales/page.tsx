import { getSessionUser } from "@data/auth.data";
import { getBranches } from "@data/branch.data";
import BranchesTable from "@ui/tables/BranchTable";

export default async function BranchesTablePage() {
  const user = await getSessionUser();
  const branches = await getBranches();

  return <BranchesTable branches={branches} user={user} />;
}
