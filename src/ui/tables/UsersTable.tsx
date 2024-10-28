"use client";

import { DeleteIcon } from "@icons/DeleteIcon";
import { EditIcon } from "@icons/EditIcon";
import { EyeIcon } from "@icons/EyeIcon";
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

import { deleteUser } from "@action/auth.action";
import UserModal from "@ui/modals/UserModal";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";

const columns = [
  { name: "NOMBRE", uid: "name" },
  { name: "APELLIDO", uid: "lastName" },
  { name: "CORREO", uid: "email" },
  { name: "FECHA NACIM.", uid: "birthDate" },
  { name: "TELÉFONO", uid: "phone" },
  { name: "ROL", uid: "roles" },
  { name: "ESTADO", uid: "status" },
  { name: "ACCIONES", uid: "actions" },
];

export function useUsersTable() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [deleteSelectedUser, setDeleteSelectedUser] = useState<any>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteStatus, formActionDelete] = useFormState(deleteUser, undefined);

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
  };

  const handleDeleteSelectedUser = (user: any) => {
    setDeleteSelectedUser(user);
  };

  return {
    selectedUser,
    deleteStatus,
    deleteSelectedUser,
    handleDeleteSelectedUser,
    formActionDelete,
    setSelectedUser,
    handleSelectUser,
    isOpen,
    onOpen,
    onOpenChange,
  };
}

type UsersTableProperties = {
  users: any;
  allUsersPages: number;
  user: any;
};

export default function UsersTable({
  users,
  allUsersPages,
  user,
}: UsersTableProperties) {
  const {
    selectedUser,
    handleSelectUser,
    deleteSelectedUser,
    handleDeleteSelectedUser,
    formActionDelete,
    setSelectedUser,
    isOpen,
    onOpen,
    onOpenChange,
  } = useUsersTable();

  const renderCell = React.useCallback(
    (tableUser: any, columnKey: any) => {
      const cellValue = tableUser[columnKey];
      switch (columnKey) {
        case "name": {
          return (
            <div className="flex items-start justify-start">
              <User
                avatarProps={{
                  radius: "sm",
                  src: tableUser.avatarUrl ?? "/userPlaceholder.webp",
                  ImgComponent: () => (
                    <Image
                      src={tableUser?.avatarUrl ?? "/userPlaceholder.webp"}
                      alt={tableUser.name}
                      width={40}
                      height={40}
                    />
                  ),
                }}
                name={cellValue}
              >
                {tableUser.name}
              </User>
            </div>
          );
        }
        case "lastName": {
          return <p className="text-sm capitalize text-bold">{cellValue}</p>;
        }
        case "email": {
          return <p className="text-sm text-bold">{cellValue}</p>;
        }
        case "birthDate": {
          const formattedDate = cellValue
            ? new Date(cellValue).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "N/A";
          return (
            <p className="text-sm capitalize text-bold">{formattedDate}</p>
          );
        }
        case "phone": {
          return (
            <p className="text-sm text-center capitalize text-bold">
              {cellValue || "N/A"}
            </p>
          );
        }
        case "roles": {
          console.log(cellValue);
          return (
            <p className="text-sm capitalize text-bold">
              {cellValue.includes("ADMIN")
                ? "Administrador"
                : cellValue.includes("EMPLOYEE")
                  ? "Empleado"
                  : "Cliente"}
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
        case "actions": {
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Detalles">
                <Link
                  href={`/dashboard/usuarios/${tableUser.id}`}
                  passHref
                  replace
                >
                  <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                    <EyeIcon />
                  </span>
                </Link>
              </Tooltip>
              <Tooltip content="Editar Usuario">
                <button
                  onClick={() => handleSelectUser(tableUser)}
                  disabled={!user.roles.includes("ADMIN")}
                >
                  <span
                    className={
                      "text-lg cursor-pointer text-default-400 active:opacity-50" +
                      (user.roles.includes("ADMIN") ? "" : " opacity-50")
                    }
                  >
                    <EditIcon />
                  </span>
                </button>
              </Tooltip>
              <Tooltip color="danger" content="Borrar Usuario">
                <button
                  onClick={() => {
                    handleDeleteSelectedUser(tableUser);
                    onOpen();
                  }}
                  disabled={!user.roles.includes("ADMIN")}
                >
                  <span
                    className={
                      "text-lg cursor-pointer text-danger active:opacity-50" +
                      (user.roles.includes("ADMIN") ? "" : " opacity-50")
                    }
                  >
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
    [handleDeleteSelectedUser, handleSelectUser, onOpen, user.roles],
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
                {`Eliminar ${deleteSelectedUser?.name}`}
                <Divider className="mb-3" />
              </ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between w-full h-full gap-3">
                  <div className="flex-2">
                    <Image
                      src={
                        deleteSelectedUser?.avatarUrl ?? "/userPlaceholder.webp"
                      }
                      alt={deleteSelectedUser?.name}
                      width={150}
                      height={220}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center h-full flex-3 gap-y-4">
                    <p className="font-medium">{deleteSelectedUser?.name}</p>
                    <p className="text-sm">{deleteSelectedUser?.email}</p>
                    <p className="text-sm">{deleteSelectedUser?.phone}</p>
                  </div>
                </div>

                <h3>¿Estás seguro de que deseas eliminar este usuario?</h3>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <form action={formActionDelete}>
                  <input
                    type="hidden"
                    value={deleteSelectedUser.id}
                    className="sr-only"
                    name="userId"
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
        <UserModal
          buttonText={selectedUser ? "Editar Usuario" : "Crear Usuario"}
          title={
            selectedUser ? `Editar ${selectedUser?.name}` : "Crear Usuario"
          }
          user={selectedUser}
          setUser={setSelectedUser}
          roles={["ADMIN", "EMPLOYEE", "CUSTOMER"]}
        />
      </div>
      <Table isHeaderSticky aria-label="Usuarios">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
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
        <Pagination total={allUsersPages} />
      </div>
    </>
  );
}
