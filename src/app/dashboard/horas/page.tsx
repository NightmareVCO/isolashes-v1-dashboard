import { getSessionUser } from "@data/auth.data";
import { getHours } from "@data/hour.data";
import HoursTable from "@ui/tables/HourTable";

export default async function HoursTablePage() {
  const user = await getSessionUser();
  const hours = await getHours();

  return <HoursTable hours={hours} user={user} />;
}
