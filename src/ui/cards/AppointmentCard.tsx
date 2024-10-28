"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import { AppointmentCardModal } from "@ui/modals/AppointmentCardModal";
import { SellModalAppointment } from "@ui/modals/SellModalAppointment";

export const useAppointmentCard = () => {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  return {
    onOpen,
    isOpen,
    onOpenChange,
  };
};

export default function AppointmentCard({
  appointment,
  user,
  services,
}: {
  appointment: any;
  user: any;
  services: any;
}) {
  const { onOpen, isOpen, onOpenChange } = useAppointmentCard();
  return (
    <>
      <Card
        key={appointment.id}
        shadow="none"
        className="p-4 h-fit border-y"
        radius="none"
        fullWidth
      >
        <CardBody className="flex flex-row flex-wrap items-center justify-center h-full p-0 lg:items-start lg:justify-start sm:flex-nowrap">
          <div className="px-4 py-5 flex-3">
            <h3 className="text-lg font-medium">
              {appointment.service.name} -{" "}
              {appointment.service.serviceCategory.name}
            </h3>
            <div className="flex flex-col gap-3 pt-2 text-default-400">
              <div className="flex items-center justify-start gap-x-4">
                <p>
                  Nombre del cliente:{" "}
                  <span className="text-default-500">
                    {appointment.fullName}
                  </span>
                </p>
                <p>
                  Número de teléfono:{" "}
                  <span className="text-default-500">{appointment.phone}</span>
                </p>
              </div>

              <div className="flex items-center justify-start gap-x-4">
                <p>
                  Fecha:{" "}
                  <span className="text-default-500">
                    {new Date(appointment.date).toLocaleDateString("es", {
                      timeZone: "UTC",
                    })}
                  </span>
                </p>
                <p>
                  Hora:{" "}
                  <span className="text-default-500">
                    {appointment.hours.time}
                  </span>
                </p>
                <p>
                  Sucursal:{" "}
                  <span className="text-default-500">
                    {appointment.branch.name}
                  </span>
                </p>
                {/*  TODO No está porque aún no se conecta el recibo con la cita, se requiere para renderizar el recibo */}
                {/* <div className="items-center justify-start hidden lg:flex gap-x-4">
                <p>
                  Sucursal:{" "}
                  <span className="text-default-500">
                    {appointment.branch.name}
                  </span>
                </p>
                <p>Estado: </p>
                {appointment.completed ? (
                  <Chip color="success" size="md">
                    Completado
                  </Chip>
                ) : (
                  <Chip color="warning" size="md">
                    Pendiente
                  </Chip>
                )}
              </div> */}
              </div>

              <div className="flex items-center justify-start gap-x-4">
                <p>Estado: </p>
                {appointment.completed ? (
                  <Chip color="success" variant="flat" size="md">
                    Completado
                  </Chip>
                ) : (
                  <Chip color="warning" variant="flat" size="md">
                    Pendiente
                  </Chip>
                )}

                <p>Pagada: </p>
                {appointment.paid ? (
                  <Chip color="success" variant="flat" size="md">
                    Pagada
                  </Chip>
                ) : (
                  <Chip color="warning" variant="flat" size="md">
                    Pendiente
                  </Chip>
                )}

                <p>Resultado: </p>
                {appointment.image ? (
                  <Chip color="success" variant="flat" size="md">
                    Subido
                  </Chip>
                ) : (
                  <Chip color="warning" variant="flat" size="md">
                    Pendiente
                  </Chip>
                )}
              </div>
            </div>
          </div>
          <div className=" px-4 py-5 flex items-center justify-center flex-1 h-full min-h-[144px]">
            {!appointment.completed && (
              <Button
                href={`/dashboard/atender/${appointment.id}`}
                as={Link}
                color="primary"
                className="text-white"
              >
                Atender cita
              </Button>
            )}
            {appointment.completed && (
              <div className="flex flex-col gap-y-4">
                <Button
                  href={`/dashboard/atender/${appointment.id}`}
                  as={Link}
                  color="success"
                  className="text-white"
                >
                  Ver Datos
                </Button>

                {appointment.paid ? (
                  // <Button
                  //   href={`/dashboard/atender/${appointment.id}`}
                  //   as={Link}
                  //   color="success"
                  //   className="text-white"
                  // >
                  //   Ver Factura
                  // </Button>
                  <></>
                ) : (
                  <SellModalAppointment
                    user={user}
                    appointment={appointment}
                    services={services}
                  />
                )}

                {appointment.image ? (
                  <Button
                    as={Link}
                    color="success"
                    className="text-white"
                    onPress={onOpen}
                  >
                    Ver resultado
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    color="primary"
                    className="text-white"
                    onPress={onOpen}
                  >
                    Subir resultado
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
      <AppointmentCardModal
        user={user}
        appointment={appointment}
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
