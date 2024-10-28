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
  User,
} from "@nextui-org/react";
import React, { useState } from "react";

const statusColorMap: any = {
  true: "success",
  false: "warning",
};

import { deleteBranch } from "@action/branch.action";
import BranchModal from "@ui/modals/BranchModal";
import Image from "next/image";
import { useFormState } from "react-dom";

const columns = [
  { name: "NOMBRE", uid: "name" },
  { name: "DIRECCIÓN", uid: "address" },
  { name: "TELÉFONO", uid: "phone" },
  { name: "EMAIL", uid: "email" },
  { name: "HORARIO", uid: "schedule" },
  { name: "VISIBLE", uid: "status" },
  { name: "ACCIONES", uid: "actions" },
];

export function useBranchesTable() {
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [deleteSelectedBranch, setDeleteSelectedBranch] = useState<any>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteStatus, formActionDelete] = useFormState(
    deleteBranch,
    undefined,
  );

  const handleSelectBranch = (branch: any) => {
    setSelectedBranch(branch);
  };

  const handleDeleteSelectedBranch = (branch: any) => {
    setDeleteSelectedBranch(branch);
  };

  return {
    selectedBranch,
    deleteStatus,
    deleteSelectedBranch,
    handleDeleteSelectedBranch,
    formActionDelete,
    setSelectedBranch,
    handleSelectBranch,
    isOpen,
    onOpen,
    onOpenChange,
  };
}

type BranchesTableProperties = {
  branches: any;
  user: any;
};

export default function BranchesTable({
  branches,
  user,
}: BranchesTableProperties) {
  const {
    selectedBranch,
    handleSelectBranch,
    deleteSelectedBranch,
    handleDeleteSelectedBranch,
    formActionDelete,
    setSelectedBranch,
    isOpen,
    onOpen,
    onOpenChange,
  } = useBranchesTable();

  const renderCell = React.useCallback(
    (branch: any, columnKey: any) => {
      const cellValue = branch[columnKey];
      switch (columnKey) {
        case "name": {
          return (
            <div className="flex items-start justify-start">
              <User
                avatarProps={{
                  radius: "sm",
                  src: branch.cover ?? "/placeholder.webp",
                  ImgComponent: () => (
                    <Image
                      src={branch?.cover ?? "/placeholder.webp"}
                      alt={branch.name}
                      width={40}
                      height={40}
                    />
                  ),
                }}
                name={cellValue}
              >
                {branch.name}
              </User>
            </div>
          );
        }
        case "address": {
          return <p className="text-sm capitalize text-bold">{cellValue}</p>;
        }
        case "phone": {
          return <p className="text-sm capitalize text-bold">{cellValue}</p>;
        }
        case "email": {
          return <p className="text-sm text-bold">{cellValue}</p>;
        }
        case "schedule": {
          return <p className="text-sm text-bold">{cellValue || "N/A"}</p>;
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
              <Tooltip content="Editar Sucursal">
                <button onClick={() => handleSelectBranch(branch)}>
                  <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                    <EditIcon />
                  </span>
                </button>
              </Tooltip>
              <Tooltip color="danger" content="Borrar Sucursal">
                <button
                  onClick={() => {
                    handleDeleteSelectedBranch(branch);
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
    [handleDeleteSelectedBranch, handleSelectBranch, onOpen],
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
                {`Eliminar ${deleteSelectedBranch?.name}`}
                <Divider className="mb-3" />
              </ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between w-full h-full gap-3">
                  <div className="flex-2">
                    <Image
                      src={deleteSelectedBranch?.cover}
                      alt={deleteSelectedBranch?.name}
                      width={150}
                      height={220}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center h-full flex-3 gap-y-4">
                    <p className="font-medium">{deleteSelectedBranch?.name}</p>
                    <p className="text-sm">{deleteSelectedBranch?.address}</p>
                    <p className="text-sm">{deleteSelectedBranch?.phone}</p>
                    <p className="text-sm">{deleteSelectedBranch?.email}</p>
                  </div>
                </div>

                <h3>¿Estás seguro de que deseas eliminar esta sucursal?</h3>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <form action={formActionDelete}>
                  <input
                    type="hidden"
                    value={deleteSelectedBranch.id}
                    className="sr-only"
                    name="branchId"
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
        <BranchModal
          buttonText={selectedBranch ? "Editar Sucursal" : "Crear Sucursal"}
          title={
            selectedBranch ? `Editar ${selectedBranch?.name}` : "Crear Sucursal"
          }
          branch={selectedBranch}
          setBranch={setSelectedBranch}
          user={user}
        />
      </div>
      <Table aria-label="Sucursales">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={branches}>
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
