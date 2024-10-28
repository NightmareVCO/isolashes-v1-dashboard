"use client";

import { DeleteIcon } from "@icons/DeleteIcon";
import { EditIcon } from "@icons/EditIcon";
// import { EyeIcon } from "@icons/EyeIcon";
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
import React, { useState } from "react";

const statusColorMap: any = {
  true: "success",
  false: "warning",
};

import { deleteService } from "@action/service.action";
import ServiceModal from "@ui/modals/ServiceModal";
import Image from "next/image";
import { useFormState } from "react-dom";

const columns = [
  { name: "NOMBRE", uid: "name" },
  { name: "PRECIO", uid: "price" },
  { name: "CATEGORÍA", uid: "serviceCategory" },
  { name: "VISIBLE", uid: "status" },
  { name: "ACCIONES", uid: "actions" },
];

export function useServicesTable() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [deleteSelectedService, setDeleteSelectedService] = useState<any>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteStatus, formActionDelete] = useFormState(
    deleteService,
    undefined,
  );

  const handleSelectService = (service: any) => {
    setSelectedService(service);
  };

  const handleDeleteSelectedService = (service: any) => {
    setDeleteSelectedService(service);
  };

  return {
    selectedService,
    deleteStatus,
    deleteSelectedService,
    handleDeleteSelectedService,
    formActionDelete,
    setSelectedService,
    handleSelectService,
    isOpen,
    onOpen,
    onOpenChange,
  };
}

type ServicesTableProperties = {
  services: any;
  categories: any;
  user: any;
};

export default function ServicesTable({
  services,
  categories,
  user,
}: ServicesTableProperties) {
  const {
    selectedService,
    handleSelectService,
    deleteSelectedService,
    handleDeleteSelectedService,
    formActionDelete,
    setSelectedService,
    isOpen,
    onOpen,
    onOpenChange,
  } = useServicesTable();

  const renderCell = React.useCallback(
    (service: any, columnKey: any) => {
      const cellValue = service[columnKey];
      switch (columnKey) {
        case "name": {
          return (
            <div className="flex items-start justify-start">
              <User
                avatarProps={{
                  radius: "sm",
                  src:
                    (service.serviceCategory?.cover ||
                      service.serviceCategory?.cover2) ??
                    "/placeholder.webp",
                  ImgComponent: () => (
                    <Image
                      src={
                        (service.serviceCategory?.cover ||
                          service.serviceCategory?.cover2) ??
                        "/placeholder.webp"
                      }
                      alt={service.name}
                      width={40}
                      height={40}
                    />
                  ),
                }}
                description={
                  service.description.length > 100
                    ? service.description.slice(0, 100) + "..."
                    : service.description
                }
                name={cellValue}
              >
                {service.name}
              </User>
            </div>
          );
        }
        case "price": {
          return <p className="text-sm">RD$ {cellValue}</p>;
        }
        case "serviceCategory": {
          return (
            <p className="text-sm capitalize text-bold">
              {service.serviceCategory.name}
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
              {cellValue ? "Visible" : "Oculto"}
            </Chip>
          );
        }
        case "actions": {
          return (
            <div className="relative flex items-center justify-center gap-2">
              {/* <Tooltip content="Detalles">
                <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip> */}
              <Tooltip content="Editar Servicio">
                <button onClick={() => handleSelectService(service)}>
                  <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                    <EditIcon />
                  </span>
                </button>
              </Tooltip>
              <Tooltip color="danger" content="Borrar Servicio">
                <button
                  onClick={() => {
                    handleDeleteSelectedService(service);
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
    [handleDeleteSelectedService, handleSelectService, onOpen],
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
                {`Eliminar ${deleteSelectedService?.name}`}
                <Divider className="mb-3" />
              </ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between w-full h-full gap-3">
                  <div className="flex-2">
                    <Image
                      src={
                        (deleteSelectedService?.serviceCategory?.cover ||
                          deleteSelectedService?.serviceCategory?.cover2) ??
                        "/placeholder.webp"
                      }
                      alt={deleteSelectedService?.name}
                      width={150}
                      height={220}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center h-full flex-3 gap-y-4">
                    <p className="font-medium">{deleteSelectedService?.name}</p>
                    <p className="text-sm">
                      {deleteSelectedService?.description}
                    </p>
                    <p className="text-sm">
                      RD$ {deleteSelectedService?.price}
                    </p>
                  </div>
                </div>

                <h3>¿Estás seguro de que deseas eliminar este servicio?</h3>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <form action={formActionDelete}>
                  <input
                    type="hidden"
                    value={deleteSelectedService.id}
                    className="sr-only"
                    name="serviceId"
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
        <ServiceModal
          buttonText={selectedService ? "Editar Servicio" : "Crear Servicio"}
          title={
            selectedService
              ? `Editar ${selectedService?.name}`
              : "Crear Servicio"
          }
          categories={categories}
          service={selectedService}
          setService={setSelectedService}
          user={user}
        />
      </div>
      <Table isHeaderSticky aria-label="Servicios" className="overflow-y-auto">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={services}>
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
