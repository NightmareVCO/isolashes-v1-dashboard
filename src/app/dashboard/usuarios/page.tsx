import { getSessionUser } from "@data/auth.data";
import { getUsers } from "@data/users.data";
import UsersTable from "@ui/tables/UsersTable";

const AMOUNT_OF_USERS = 10;

export default async function UsersTablePage({ searchParams }: any) {
  const currentPage = searchParams.pagina || 1;
  const search = searchParams.q || "";
  const user = await getSessionUser();

  const users = await getUsers({
    order: "createdAt",
    orderDirection: "desc",
    takeValue: AMOUNT_OF_USERS,
    skipValue: currentPage * AMOUNT_OF_USERS - AMOUNT_OF_USERS,
    cursor: "",
    status: "true",
    where: "",
    whereValue: "",
    query: search || "",
    adminId: user?.id,
  });
  const allUsersPages = Math.ceil(users.total / AMOUNT_OF_USERS);

  return (
    <UsersTable users={users.users} allUsersPages={allUsersPages} user={user} />
  );
}
