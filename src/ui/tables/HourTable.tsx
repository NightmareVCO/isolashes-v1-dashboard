"use client";

import { DeleteIcon } from "@icons/DeleteIcon";
import { EditIcon } from "@icons/EditIcon";
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
} from "@nextui-org/react";
import React, { useState } from "react";

const statusColorMap: any = {
  true: "success",
  false: "warning",
};

import { deleteHour } from "@action/hour.action";
import HourModal from "@ui/modals/HourModal";
import { useFormState } from "react-dom";

const columns = [
  { name: "HORA", uid: "time" },
  { name: "ESTADO", uid: "status" },
  { name: "ACCIONES", uid: "actions" },
];

export function useHoursTable() {
  const [selectedHour, setSelectedHour] = useState<any>(null);
  const [deleteSelectedHour, setDeleteSelectedHour] = useState<any>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteStatus, formActionDelete] = useFormState(deleteHour, undefined);

  const handleSelectHour = (hour: any) => {
    setSelectedHour(hour);
  };

  const handleDeleteSelectedHour = (hour: any) => {
    setDeleteSelectedHour(hour);
  };

  return {
    selectedHour,
    deleteStatus,
    deleteSelectedHour,
    handleDeleteSelectedHour,
    formActionDelete,
    setSelectedHour,
    handleSelectHour,
    isOpen,
    onOpen,
    onOpenChange,
  };
}

type HoursTableProperties = {
  hours: any;
  user: any;
};

export default function HoursTable({ hours, user }: HoursTableProperties) {
  const {
    selectedHour,
    handleSelectHour,
    deleteSelectedHour,
    handleDeleteSelectedHour,
    formActionDelete,
    setSelectedHour,
    isOpen,
    onOpen,
    onOpenChange,
  } = useHoursTable();

  const renderCell = React.useCallback(
    (hour: any, columnKey: any) => {
      const cellValue = hour[columnKey];
      switch (columnKey) {
        case "time": {
          return <p className="text-sm">{cellValue}</p>;
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
        case "actions": {
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Editar Hora">
                <button onClick={() => handleSelectHour(hour)}>
                  <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                    <EditIcon />
                  </span>
                </button>
              </Tooltip>
              <Tooltip color="danger" content="Borrar Hora">
                <button
                  onClick={() => {
                    handleDeleteSelectedHour(hour);
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
    [handleDeleteSelectedHour, handleSelectHour, onOpen],
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
                {`Eliminar ${deleteSelectedHour?.time}`}
                <Divider className="mb-3" />
              </ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center gap-2">
                <h3>¿Estás seguro de que deseas eliminar esta hora?</h3>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <form action={formActionDelete}>
                  <input
                    type="hidden"
                    value={deleteSelectedHour.id}
                    className="sr-only"
                    name="hourId"
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
        <HourModal
          buttonText={selectedHour ? "Editar Hora" : "Crear Hora"}
          title={selectedHour ? `Editar ${selectedHour?.time}` : "Crear Hora"}
          hour={selectedHour}
          setHour={setSelectedHour}
          user={user}
        />
      </div>
      <Table aria-label="Horas">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={hours}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
