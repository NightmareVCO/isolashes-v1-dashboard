import { getAppointments } from "@data/appointment.data";
import { getSessionUser } from "@data/auth.data";
import { getBranches } from "@data/branch.data";
import { getServices } from "@data/service.data";
import AppointmentsTable from "@ui/tables/AppointmentTable";

const AMOUNT_OF_APPOINTMENTS = 9;

export default async function AppointmentsTablePage({ searchParams }: any) {
  const user = await getSessionUser();
  const currentPage = searchParams.pagina || 1;
  const q = searchParams.q || "";

  const branches = await getBranches();
  const services = await getServices();
  const appointments = await getAppointments({
    id: user?.id ?? "",
    order: "date",
    orderDirection: "desc",
    takeValue: AMOUNT_OF_APPOINTMENTS,
    skipValue: currentPage * AMOUNT_OF_APPOINTMENTS - AMOUNT_OF_APPOINTMENTS,
    cursor: "",
    status: "true",
    date: "",
    query: q,
  });

  const allAppointmentPages = Math.ceil(
    appointments.total / AMOUNT_OF_APPOINTMENTS,
  );

  return (
    <AppointmentsTable
      appointments={appointments.appointments}
      branches={branches}
      services={services}
      user={user}
      allAppointmentsPages={allAppointmentPages}
    />
  );
}
