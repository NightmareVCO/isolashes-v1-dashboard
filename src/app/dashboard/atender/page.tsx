import { getAppointments } from "@data/appointment.data";
import { getSessionUser } from "@data/auth.data";
import { getServices } from "@data/service.data";
import { Spacer } from "@nextui-org/react";
import AppointmentCard from "@ui/cards/AppointmentCard";
import AppointmentFilter from "@ui/filters/AppointmentFilter";

const timeMap: { [key: string]: number } = {
  "8:00 AM - 9:00 AM": 1,
  "9:00 AM - 10:00 AM": 2,
  "10:00 AM - 11:00 AM": 3,
  "11:00 AM - 12:00 PM": 4,
  "12:00 PM - 1:00 PM": 5,
  "1:00 PM - 2:00 PM": 6,
  "2:00 PM - 3:00 PM": 7,
  "3:00 PM - 4:00 PM": 8,
  "4:00 PM - 5:00 PM": 9,
  "5:00 PM - 6:00 PM": 10,
  "6:00 PM - 7:00 PM": 11,
};

export default async function ManageAppointment({ searchParams }: any) {
  const user = await getSessionUser();
  const q = searchParams.q || "";
  const date = searchParams.date || "Hoy";
  const servicesQ = searchParams.servicesQ || "";

  const appointments = await getAppointments({
    id: user?.id ?? "",
    order: "createdAt",
    orderDirection: "desc",
    takeValue: 10,
    skipValue: 0,
    cursor: "",
    status: "true",
    date: date,
    query: q,
  });

  const services = await getServices(servicesQ);

  appointments.appointments.sort(
    (a: { hours: { time: string } }, b: { hours: { time: string } }) =>
      timeMap[a.hours.time] - timeMap[b.hours.time],
  );

  return (
    <section className="overflow-y-scroll">
      <AppointmentFilter />
      <Spacer y={2} />
      {appointments.appointments.map((appointment: any) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          user={user}
          services={services}
        />
      ))}
      {appointments.total === 0 && (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-2xl text-gray-400">No hay citas</h1>
        </div>
      )}
    </section>
  );
}
