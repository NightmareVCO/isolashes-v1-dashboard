import { getAppointmentsById } from "@data/appointment.data";
import { getSessionUser } from "@data/auth.data";

import MedicalForm from "@/ui/medicalForm/MedicalForm";

export default async function AppointmentAttend({ params }: any) {
  const user = await getSessionUser();
  const { slug } = params;
  const appointment = await getAppointmentsById({
    appointmentId: slug,
    userId: user?.id ?? "",
    noStore: true,
  });

  return (
    <section className="overflow-y-scroll">
      <MedicalForm appointment={appointment} user={user} />
    </section>
  );
}
