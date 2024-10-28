"use client";

import { Card, Divider, Spacer, Tab, Tabs } from "@nextui-org/react";
import AppointmentCard from "@ui/cards/AppointmentCard";

import OrderCard from "../cards/OrderCard";

type TabsUserDetailsProperties = {
  user: any;
  appointments: any;
  services: any;
  orders: any;
};

export function useTabsUserDetails() {
  const medicalInfoMapping: { [key: string]: string } = {
    contactLenses: "Uso de Lentes de Contacto",
    sensitiveEyes: "Ojos Sensibles",
    dryEyes: "Ojos Secos",
    hormonalImbalance: "Desbalance Hormonal (Hiper o Hipotiroidismo)",
    seasonalAllergies: "Alergias Estacionales",
    vitaminDeficiencies:
      "Deficiencias vitamínicas o minerales que puedan contribuir a la pérdida de cabello o pestañas: A, F, B, Selenio, Zinc, Hierro.",
    tricholomania: "Tricholomania (desorden de caída del cabello)",
    other: "Otro",
  };

  const rolesMapping: { [key: string]: string } = {
    EMPLOYEE: "Empleado",
    CUSTOMER: "Usuario",
    ADMIN: "Administrador",
  };

  return {
    medicalInfoMapping,
    rolesMapping,
  };
}

export default function TabsUserDetails({
  appointments,
  user,
  services,
  orders,
}: TabsUserDetailsProperties) {
  const { medicalInfoMapping, rolesMapping } = useTabsUserDetails();

  return (
    <Card radius="none" className="w-full h-full overflow-y-scroll">
      <Tabs
        aria-label="Dynamic tabs"
        size="lg"
        color="secondary"
        variant="underlined"
        fullWidth
      >
        <Tab
          key="appointments"
          aria-label="Citas"
          textValue="Citas"
          title={
            <div className="flex items-start justify-start w-24 gap-x-3">
              <p className="font-semibold text-start">Citas</p>
            </div>
          }
        >
          {appointments.appointments.map((appointment: any) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              user={user}
              services={services}
            />
          ))}
        </Tab>
        <Tab
          key="orders"
          aria-label="Ordenes"
          textValue="Ordenes"
          title={
            <div className="flex items-start justify-start w-24 gap-x-3">
              <p className="font-semibold text-start">Ordenes</p>
            </div>
          }
        >
          {orders.orders.map((order: any) => (
            <OrderCard key={order.id} order={order} user={user} />
          ))}
        </Tab>
        <Tab
          key="data"
          aria-label="Datos"
          textValue="Datos"
          title={
            <div className="flex items-start justify-start w-24 gap-x-3">
              <p className="font-semibold text-start">Datos</p>
            </div>
          }
        >
          <div className="px-5">
            <h2 className="w-full text-lg text-start text-primary">
              Datos del Usuario
            </h2>
            <Divider />
            <Spacer y={3} />
            <ul>
              <li className="text-default-400">Nombre: {user.name}</li>
              <li className="text-default-400">Apellido: {user.lastName}</li>
              <li className="text-default-400">
                Fecha de Nacimiento: {user.birthDate || "N/A"}
              </li>
              <li className="text-default-400">Email: {user.email}</li>
              <li className="text-default-400">Teléfono: {user.phone}</li>
              <li className="text-default-400">Puntos: {user.points}</li>
              <li className="text-default-400 capitalize">
                Roles:{" "}
                {user.roles
                  .map((role: string) => rolesMapping[role])
                  .join(", ")}
              </li>
              {/* Cantidad de citas */}
              <li className="text-default-400">
                Cantidad de citas: {appointments.total}
              </li>
            </ul>

            <Spacer y={6} />

            <h2 className="w-full text-lg text-start text-primary">
              Datos Medicos
            </h2>
            <Divider />
            <Spacer y={3} />
            <ul>
              {user.medicalInfo?.map((info: string) => (
                <li key={info} className="text-default-400">
                  {medicalInfoMapping[info]}
                </li>
              ))}
            </ul>

            <Spacer y={6} />

            <h2 className="w-full text-lg text-start text-primary">
              Salud Del Ojo
            </h2>
            <Divider />
            <Spacer y={3} />
            <ul>
              {user.eyesConditions?.map(
                (info: { name: string; description: string }) => (
                  <li key={info.name} className="text-default-400">
                    {info.name}:{" "}
                    <span className="capitalize">{info.description}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </Tab>
      </Tabs>
    </Card>
  );
}
