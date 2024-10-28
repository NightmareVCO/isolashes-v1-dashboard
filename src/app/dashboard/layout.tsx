import { getSessionUser } from "@data/auth.data";
import MainWrapper from "@ui/mainWrapper/MainWrapper";

export default async function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  return <MainWrapper user={user}>{children}</MainWrapper>;
}
