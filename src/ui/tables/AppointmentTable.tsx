"use client";

import { DeleteIcon } from "@icons/DeleteIcon";
// import { EditIcon } from "@icons/EditIcon";
import {
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
  User,
} from "@nextui-org/react";
import Pagination from "@ui/pagination/Pagination";
import React, { useState } from "react";

const statusColorMap: any = {
  true: "success",
  false: "warning",
};

import { deleteAppointment } from "@action/appointment.action";
// import AppointmentModal from "@ui/modals/AppointmentModal";
import Image from "next/image";
import { useFormState } from "react-dom";

const columns = [
  { name: "NOMBRE", uid: "fullName" },
  { name: "SERVICIO", uid: "service" },
  // { name: "TICKET", uid: "ticket" },
  { name: "FECHA", uid: "date" },
  { name: "SUCURSAL", uid: "branch" },
  { name: "HORA", uid: "hours" },
  { name: "ESTADO", uid: "status" },
  { name: "COMPLETADO", uid: "completed" },
  { name: "PAGADO", uid: "paid" },
  { name: "ACCIONES", uid: "actions" },
];

export function useAppointmentsTable() {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [deleteSelectedAppointment, setDeleteSelectedAppointment] =
    useState<any>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteStatus, formActionDelete] = useFormState(
    deleteAppointment,
    undefined,
  );

  const handleSelectAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
  };

  const handleDeleteSelectedAppointment = (appointment: any) => {
    setDeleteSelectedAppointment(appointment);
  };

  return {
    selectedAppointment,
    deleteStatus,
    deleteSelectedAppointment,
    handleDeleteSelectedAppointment,
    formActionDelete,
    setSelectedAppointment,
    handleSelectAppointment,
    isOpen,
    onOpen,
    onOpenChange,
  };
}

type AppointmentsTableProperties = {
  appointments: any;
  allAppointmentsPages: number;
  branches: any;
  services: any;
  user: any;
};

export default function AppointmentsTable({
  appointments,
  allAppointmentsPages,
  // branches,
  // services,
  user,
}: AppointmentsTableProperties) {
  const {
    // selectedAppointment,
    // handleSelectAppointment,
    deleteSelectedAppointment,
    handleDeleteSelectedAppointment,
    formActionDelete,
    // setSelectedAppointment,
    isOpen,
    onOpen,
    onOpenChange,
  } = useAppointmentsTable();

  const renderCell = React.useCallback(
    (appointment: any, columnKey: any) => {
      const cellValue = appointment[columnKey];
      switch (columnKey) {
        case "fullName": {
          return (
            <div className="flex items-start justify-start">
              <User
                avatarProps={{
                  radius: "sm",
                  src: appointment.image ?? "/userPlaceholder.webp",
                  ImgComponent: () => (
                    <Image
                      src={appointment?.image ?? "/placeholder.webp"}
                      alt={appointment.service.name}
                      width={40}
                      height={40}
                    />
                  ),
                }}
                className="truncate"
                description={appointment.phone + " - " + appointment.email}
                name={cellValue}
              >
                {appointment.fullName}
              </User>
            </div>
          );
        }
        case "ticket": {
          return <p className="text-sm text-center text-bold">{cellValue}</p>;
        }
        case "date": {
          return (
            <p className="text-sm text-center text-bold">
              {new Date(cellValue).toLocaleDateString()}
            </p>
          );
        }
        case "branch": {
          return (
            <p className="text-sm capitalize text-bold">
              {appointment.branch.name}
            </p>
          );
        }
        case "hours": {
          return (
            <p className="text-sm capitalize text-bold">
              {appointment.hours.time}
            </p>
          );
        }
        case "service": {
          return (
            <p className="text-sm capitalize text-bold">
              {appointment.service.name}
            </p>
          );
        }
        case "status": {
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[cellValue]}
              size="sm"
              variant="flat"
            >
              {cellValue ? "Activo" : "Inactivo"}
            </Chip>
          );
        }
        case "completed": {
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[cellValue]}
              size="sm"
              variant="flat"
            >
              {cellValue ? "Completado" : "Pendiente"}
            </Chip>
          );
        }
        case "paid": {
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[cellValue]}
              size="sm"
              variant="flat"
            >
              {cellValue ? "Pagado" : "No Pagado"}
            </Chip>
          );
        }
        case "actions": {
          return (
            <div className="relative flex items-center justify-center gap-2">
              {/* <Tooltip content="Editar Cita">
                <button onClick={() => handleSelectAppointment(appointment)}>
                  <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                    <EditIcon />
                  </span>
                </button>
              </Tooltip> */}
              <Tooltip color="danger" content="Borrar Cita">
                <button
                  onClick={() => {
                    handleDeleteSelectedAppointment(appointment);
                    onOpen();
                  }}
                >
                  <span className="text-lg cursor-pointer text-danger active:opacity-50">
                    <DeleteIcon />
                  </span>
                </button>
              </Tooltip>
            </div>
          );
        }
        default: {
          return cellValue;
        }
      }
    },
    [handleDeleteSelectedAppointment, onOpen],
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Eliminar ${deleteSelectedAppointment?.fullName}`}
                <Divider className="mb-3" />
              </ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between w-full h-full gap-3">
                  <div className="flex-2">
                    <Image
                      src={
                        deleteSelectedAppointment?.image ?? "/placeholder.webp"
                      }
                      alt={deleteSelectedAppointment?.service}
                      width={150}
                      height={220}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center h-full flex-3 gap-y-4">
                    <p className="font-medium">
                      {deleteSelectedAppointment?.fullName}
                    </p>
                    <p className="text-sm">
                      {deleteSelectedAppointment?.service.name}
                    </p>
                    <p className="text-sm">
                      {deleteSelectedAppointment?.branch.name}
                    </p>
                    <p className="text-sm">
                      {new Date(
                        deleteSelectedAppointment?.date,
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      {deleteSelectedAppointment?.hours.time}
                    </p>
                  </div>
                </div>

                <h3>¿Estás seguro de que deseas eliminar esta cita?</h3>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <form action={formActionDelete}>
                  <input
                    type="hidden"
                    value={deleteSelectedAppointment.id}
                    className="sr-only"
                    name="appointmentId"
                  />
                  <input
                    type="hidden"
                    value={user.id}
                    className="sr-only "
                    name="id"
                  />
                  <Button color="primary" className="text-white" type="submit">
                    Eliminar
                  </Button>
                </form>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex items-end justify-end">
        {/* <AppointmentModal
          buttonText={selectedAppointment ? "Editar Cita" : "Crear Cita"}
          title={
            selectedAppointment
              ? `Editar ${selectedAppointment?.fullName}`
              : "Crear Cita"
          }
          branches={branches}
          services={services}
          appointment={selectedAppointment}
          setAppointment={setSelectedAppointment}
          user={user}
        /> */}
      </div>
      <Table isHeaderSticky aria-label="Citas">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={appointments}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center">
        <Pagination total={allAppointmentsPages} />
      </div>
    </>
  );
}
