"use client";

import { deleteServiceCategory } from "@action/serviceCategory.action";
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
  User,
} from "@nextui-org/react";
import ServiceCategoryModal from "@ui/modals/ServiceCateogoryModal";
import Image from "next/image";
import React, { useState } from "react";
import { useFormState } from "react-dom";

const statusColorMap: any = {
  true: "success",
  false: "warning",
};

const columns = [
  { name: "NOMBRE", uid: "name" },
  { name: "DESCRIPCIÓN", uid: "description" },
  { name: "VISIBLE", uid: "status" },
  { name: "ACCIONES", uid: "actions" },
];

export function useServiceCategoryTable() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [deleteSelectedCategory, setDeleteSelectedCategory] =
    useState<any>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteStatus, formActionDelete] = useFormState(
    deleteServiceCategory,
    undefined,
  );

  const handleSelectCategory = (category: any) => {
    setSelectedCategory(category);
  };

  const handleDeleteSelectedCategory = (category: any) => {
    setDeleteSelectedCategory(category);
  };

  return {
    selectedCategory,
    deleteStatus,
    deleteSelectedCategory,
    handleDeleteSelectedCategory,
    formActionDelete,
    setSelectedCategory,
    handleSelectCategory,
    isOpen,
    onOpen,
    onOpenChange,
  };
}

type ServiceCategoryTableProperties = {
  categories: any;
  user: any;
};

export default function ServiceCategoryTable({
  categories,
  user,
}: ServiceCategoryTableProperties) {
  const {
    selectedCategory,
    handleSelectCategory,
    deleteSelectedCategory,
    handleDeleteSelectedCategory,
    formActionDelete,
    setSelectedCategory,
    isOpen,
    onOpen,
    onOpenChange,
  } = useServiceCategoryTable();

  const renderCell = React.useCallback(
    (category: any, columnKey: any) => {
      const cellValue = category[columnKey];
      switch (columnKey) {
        case "name": {
          return (
            <div className="flex items-start justify-start">
              <User
                avatarProps={{
                  radius: "sm",
                  src:
                    (category.cover || category.cover2) ?? "/placeholder.webp",
                  ImgComponent: () => (
                    <Image
                      src={
                        (category.cover || category.cover2) ??
                        "/placeholder.webp"
                      }
                      alt={category.name}
                      width={40}
                      height={40}
                    />
                  ),
                }}
                name={cellValue}
              >
                {category.name}
              </User>
            </div>
          );
        }
        case "description": {
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
              {cellValue ? "Visible" : "Oculto"}
            </Chip>
          );
        }
        case "actions": {
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Editar Categoría">
                <button onClick={() => handleSelectCategory(category)}>
                  <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                    <EditIcon />
                  </span>
                </button>
              </Tooltip>
              <Tooltip color="danger" content="Borrar Categoría">
                <button
                  onClick={() => {
                    handleDeleteSelectedCategory(category);
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
    [handleDeleteSelectedCategory, handleSelectCategory, onOpen],
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
                {`Eliminar ${deleteSelectedCategory?.name}`}
                <Divider className="mb-3" />
              </ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between w-full h-full gap-3">
                  <div className="flex-2">
                    <Image
                      src={
                        (deleteSelectedCategory?.cover ||
                          deleteSelectedCategory?.cover2) ??
                        "/placeholder.webp"
                      }
                      alt={deleteSelectedCategory?.name}
                      width={150}
                      height={220}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center h-full flex-3 gap-y-4">
                    <p className="font-medium">
                      {deleteSelectedCategory?.name}
                    </p>
                    <p className="text-sm capitalize">
                      {deleteSelectedCategory?.description}
                    </p>
                  </div>
                </div>

                <h3>
                  ¿Estás seguro de que deseas eliminar esta categoría de
                  servicio?
                </h3>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <form action={formActionDelete}>
                  <input
                    type="hidden"
                    value={deleteSelectedCategory.id}
                    className="sr-only"
                    name="categoryId"
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
        <ServiceCategoryModal
          buttonText={selectedCategory ? "Editar Categoría" : "Crear Categoría"}
          title={
            selectedCategory
              ? `Editar ${selectedCategory?.name}`
              : "Crear Categoría"
          }
          serviceCategory={selectedCategory}
          setServiceCategory={setSelectedCategory}
          user={user}
        />
      </div>
      <Table isHeaderSticky aria-label="Categorías de Servicio">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={categories}>
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
