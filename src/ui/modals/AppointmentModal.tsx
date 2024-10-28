import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export function useAppointmentModal({ appointment }: { appointment: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formData, setFormData] = useState({
    fullName: appointment?.fullName || "",
    phone: appointment?.phone || "",
    email: appointment?.email || "",
    date: appointment?.date || "",
    branch: appointment?.branch || "",
    hours: appointment?.hours || "",
    service: appointment?.service || "",
    status: appointment?.status || "",
    completed: appointment?.completed || false,
    paid: appointment?.paid || false,
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        fullName: appointment.fullName,
        phone: appointment.phone,
        email: appointment.email,
        date: appointment.date,
        branch: appointment.branch,
        hours: appointment.hours,
        service: appointment.service,
        status: appointment.status,
        completed: appointment.completed,
        paid: appointment.paid,
      });
    }
  }, [appointment]);

  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [createState, formActionCreate] = useFormState(
    // Replace with your createAppointment function
    () => {},
    undefined,
  );

  const [updateState, formActionUpdate] = useFormState(
    // Replace with your updateAppointment function
    () => {},
    undefined,
  );

  return {
    isOpen,
    onOpen,
    onOpenChange,
    formActionCreate,
    createState,
    updateState,
    formActionUpdate,
    handleChange,
    formData,
  };
}

type AppointmentModalProperties = {
  buttonText: string;
  title: string;
  branches: any;
  services: any;
  appointment?: any;
  setAppointment?: any;
  user?: any;
};

export default function AppointmentModal({
  buttonText,
  title,
  branches,
  services,
  appointment,
  setAppointment,
  user,
}: AppointmentModalProperties) {
  const {
    isOpen,
    onOpen,
    onOpenChange,
    formActionCreate,
    formActionUpdate,
    formData,
    handleChange,
  } = useAppointmentModal({ appointment });

  return (
    <>
      <Button color="primary" onPress={onOpen} className="text-white">
        {buttonText}
      </Button>
      <Modal
        isOpen={isOpen || appointment !== null}
        onOpenChange={() => {
          appointment == null ? onOpenChange() : "";
          setAppointment(null);
        }}
        isDismissable={false}
        size="5xl"
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-large">{title}</h3>
                <Divider className="mb-3" />
              </ModalHeader>
              {!appointment && (
                <form action={formActionCreate}>
                  <input
                    type="hidden"
                    className="sr-only"
                    name="id"
                    value={user.id}
                  />
                  <ModalBody className="grid w-full grid-cols-8 gap-4">
                    <Input
                      className="col-span-8"
                      label="Nombre Completo"
                      name="fullName"
                      type="text"
                      placeholder="Nombre completo aquí"
                      size="lg"
                      isRequired
                      isClearable
                    />
                    <Input
                      className="col-span-4"
                      label="Teléfono"
                      name="phone"
                      type="text"
                      placeholder="Teléfono aquí"
                      size="lg"
                      isRequired
                      isClearable
                    />
                    <Input
                      className="col-span-4"
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Email aquí"
                      size="lg"
                      isRequired
                      isClearable
                    />
                    <DatePicker
                      className="max-w-[284px] col-span-4"
                      label="Fecha"
                      name="date"
                      size="lg"
                      isRequired
                    />
                    <Input
                      className="col-span-4"
                      label="Horas"
                      name="hours"
                      type="text"
                      placeholder="Horas aquí"
                      size="lg"
                      isRequired
                      isClearable
                    />
                    <Select
                      className="col-span-4"
                      label="Sucursal"
                      name="branch"
                      placeholder="Sucursal aquí"
                      size="lg"
                      isRequired
                    >
                      {branches?.map((branch: any) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      className="col-span-4"
                      label="Servicio"
                      name="service"
                      placeholder="Servicio aquí"
                      size="lg"
                      isRequired
                    >
                      {services?.map((service: any) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      className="col-span-4"
                      label="Estatus"
                      name="status"
                      placeholder="Estatus aquí"
                      size="lg"
                      isRequired
                      onChange={handleChange}
                    >
                      <SelectItem key="pending" value="Pending">
                        Pendiente
                      </SelectItem>
                      <SelectItem key="confirmed" value="Confirmed">
                        Confirmada
                      </SelectItem>
                      <SelectItem key="canceled" value="Cancelled">
                        Cancelada
                      </SelectItem>
                    </Select>
                    <Checkbox
                      className="col-span-4 p-1 m-0 text-left text-white"
                      radius="lg"
                      size="lg"
                      name="completed"
                      color="primary"
                    >
                      Completada
                    </Checkbox>
                    <input
                      name="isCompleteValue"
                      value={String(formData.completed)}
                      className="sr-only"
                    />
                    <Checkbox
                      className="col-span-4 p-1 m-0 text-left text-white"
                      radius="lg"
                      size="lg"
                      name="paid"
                      color="primary"
                    >
                      Pagada
                    </Checkbox>
                    <input
                      name="isPaidValue"
                      value={String(formData.paid)}
                      className="sr-only"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      color="primary"
                      className="text-white"
                      type="submit"
                    >
                      Agregar
                    </Button>
                  </ModalFooter>
                </form>
              )}
              {appointment && (
                <form action={formActionUpdate}>
                  <input
                    type="hidden"
                    className="sr-only"
                    name="id"
                    value={user.id}
                  />
                  <input
                    type="hidden"
                    className="sr-only"
                    name="appointmentId"
                    value={appointment.id}
                  />
                  <ModalBody className="grid w-full grid-cols-8 gap-4">
                    <Input
                      className="col-span-8"
                      label="Nombre Completo"
                      name="fullName"
                      type="text"
                      placeholder="Nombre completo aquí"
                      size="lg"
                      isRequired
                      isClearable
                      defaultValue={appointment.fullName}
                    />
                    <Input
                      className="col-span-4"
                      label="Teléfono"
                      name="phone"
                      type="text"
                      placeholder="Teléfono aquí"
                      size="lg"
                      isRequired
                      isClearable
                      defaultValue={appointment.phone}
                    />
                    <Input
                      className="col-span-4"
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Email aquí"
                      size="lg"
                      isRequired
                      isClearable
                      defaultValue={appointment.email}
                    />
                    <Input
                      className="col-span-4"
                      label="Fecha"
                      name="date"
                      type="date"
                      size="lg"
                      isRequired
                      defaultValue={appointment.date}
                    />
                    <Input
                      className="col-span-4"
                      label="Horas"
                      name="hours"
                      type="text"
                      placeholder="Horas aquí"
                      size="lg"
                      isRequired
                      isClearable
                      defaultValue={appointment.hours}
                    />
                    <Select
                      className="col-span-4"
                      label="Sucursal"
                      name="branch"
                      placeholder="Sucursal aquí"
                      size="lg"
                      isRequired
                      defaultSelectedKeys={[appointment.branch.id]}
                    >
                      {branches?.map((branch: any) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      className="col-span-4"
                      label="Servicio"
                      name="service"
                      placeholder="Servicio aquí"
                      size="lg"
                      isRequired
                      defaultSelectedKeys={[appointment.service.id]}
                    >
                      {services?.map((service: any) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Checkbox
                      className="col-span-4 p-1 m-0 text-left text-white"
                      radius="lg"
                      size="lg"
                      name="status"
                      color="primary"
                      defaultSelected={appointment.status}
                    >
                      Activa
                    </Checkbox>
                    <Checkbox
                      className="col-span-4 p-1 m-0 text-left text-white"
                      radius="lg"
                      size="lg"
                      name="completed"
                      color="primary"
                      defaultSelected={appointment.completed}
                    >
                      Completada
                    </Checkbox>
                    <Checkbox
                      className="col-span-4 p-1 m-0 text-left text-white"
                      radius="lg"
                      size="lg"
                      name="paid"
                      color="primary"
                      defaultSelected={appointment.paid}
                    >
                      Pagada
                    </Checkbox>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      color="primary"
                      className="text-white"
                      type="submit"
                    >
                      Guardar Cambios
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
