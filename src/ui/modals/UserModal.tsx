import {
  register as createUser,
  updateProfile as updateUser,
} from "@action/auth.action";
import { getLocalTimeZone, today } from "@internationalized/date";
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

export function useUserModal({ user }: { user: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    isActive: user?.status,
  });

  useEffect(() => {
    setFormData({
      isActive: user?.status,
    });
  }, [user]);

  const handleChange = (event: any) => {
    const { name, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? String(checked) : event.target.value,
    });
  };

  const [createState, formActionCreate] = useFormState(createUser, undefined);
  const [updateState, formActionUpdate] = useFormState(updateUser, undefined);

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

type UserModalProperties = {
  buttonText: string;
  title: string;
  roles: any;
  user?: any;
  setUser?: any;
};

export default function UserModal({
  buttonText,
  title,
  roles,
  user,
  setUser,
}: UserModalProperties) {
  const {
    isOpen,
    onOpen,
    onOpenChange,
    formActionCreate,
    formActionUpdate,
    formData,
    handleChange,
  } = useUserModal({ user });

  return (
    <>
      <Button color="primary" onPress={onOpen} className="text-white">
        {buttonText}
      </Button>
      <Modal
        isOpen={isOpen || user !== null}
        onOpenChange={() => {
          user == null && onOpenChange();
          setUser(null);
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
              {!user && (
                <form action={formActionCreate}>
                  <input
                    type="hidden"
                    className="sr-only"
                    name="id"
                    value={user?.id}
                  />
                  <ModalBody className="flex flex-col w-full lg:flex-row gap-x-3">
                    <div className="grid w-full grid-cols-8 gap-4 flex-3">
                      <Input
                        className="col-span-4"
                        label="Nombre"
                        name="name"
                        type="text"
                        placeholder="Nombre del usuario aquí"
                        size="lg"
                        isRequired
                        isClearable
                      />
                      <Input
                        className="col-span-4"
                        label="Apellido"
                        name="lastName"
                        type="text"
                        placeholder="Apellido del usuario aquí"
                        size="lg"
                        isRequired
                        isClearable
                      />
                      <Input
                        className="col-span-4"
                        label="Correo"
                        name="email"
                        type="email"
                        placeholder="Correo del usuario aquí"
                        size="lg"
                        isRequired
                        isClearable
                      />
                      <Input
                        className="col-span-4"
                        label="Contraseña"
                        name="password"
                        type="password"
                        placeholder="Contraseña del usuario aquí"
                        size="lg"
                        isRequired
                      />
                      <Input
                        className="col-span-4"
                        label="Teléfono"
                        name="phone"
                        type="phone"
                        placeholder="Teléfono del usuario aquí"
                        size="lg"
                        isRequired
                        isClearable
                      />
                      <DatePicker
                        className="col-span-4"
                        showMonthAndYearPickers
                        aria-label="Fecha de nacimiento"
                        label="Fecha de nacimiento"
                        isRequired
                        size="lg"
                        name="birthDate"
                        maxValue={today(getLocalTimeZone())}
                      />
                      <Select
                        className="col-span-4"
                        label="Rol"
                        name="role"
                        placeholder="Rol del usuario aquí"
                        size="lg"
                        isRequired
                      >
                        {roles?.map((role: any) => (
                          <SelectItem key={role} value={role}>
                            {role === "ADMIN"
                              ? "Administrador"
                              : role === "EMPLOYEE"
                                ? "Empleado"
                                : role === "CUSTOMER"
                                  ? "Cliente"
                                  : "Desconocido"}
                          </SelectItem>
                        ))}
                      </Select>
                      {/* <Checkbox
                        className="col-span-8 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        name="isActive"
                        color="primary"
                        onChange={handleChange}
                      >
                        Activar usuario
                      </Checkbox> */}
                      <input
                        name="isActiveValue"
                        value={String(formData.isActive)}
                        className="sr-only"
                      />
                    </div>
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
              {user && (
                <form action={formActionUpdate}>
                  <input
                    type="hidden"
                    className="sr-only"
                    name="id"
                    value={user.id}
                  />
                  <ModalBody className="flex flex-col w-full lg:flex-row gap-x-3">
                    <div className="grid w-full grid-cols-8 gap-4 flex-3">
                      <Input
                        className="col-span-4"
                        label="Nombre"
                        name="name"
                        type="text"
                        placeholder="Nombre del usuario aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={user.name}
                      />
                      <Input
                        className="col-span-4"
                        label="Apellido"
                        name="lastName"
                        type="text"
                        placeholder="Apellido del usuario aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={user.lastName}
                      />
                      <Input
                        className="col-span-4"
                        label="Correo"
                        name="email"
                        type="email"
                        placeholder="Correo del usuario aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={user.email}
                      />
                      <Input
                        className="col-span-4"
                        label="Contraseña"
                        name="password"
                        type="password"
                        placeholder="Contraseña del usuario aquí"
                        size="lg"
                        isRequired
                      />
                      <Input
                        className="col-span-4"
                        label="Teléfono"
                        name="phone"
                        type="phone"
                        placeholder="Teléfono del usuario aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={user.phone}
                      />
                      {/* <DatePicker
                        className="col-span-4"
                        showMonthAndYearPickers
                        aria-label="Fecha de nacimiento"
                        label="Fecha de nacimiento"
                        isRequired
                        size="lg"
                        name="birthDate"
                        maxValue={today(getLocalTimeZone())}
                        defaultValue={user.birthDate}
                      /> */}
                      <Select
                        className="col-span-4"
                        label="Rol"
                        name="role"
                        placeholder="Rol del usuario aquí"
                        size="lg"
                        isRequired
                        defaultSelectedKeys={[
                          user.roles.includes("ADMIN")
                            ? "ADMIN"
                            : user.roles.includes("EMPLOYEE")
                              ? "EMPLOYEE"
                              : "CUSTOMER",
                        ]}
                      >
                        {roles?.map((role: any) => (
                          <SelectItem key={role} value={role}>
                            {role === "ADMIN"
                              ? "Administrador"
                              : role === "EMPLOYEE"
                                ? "Empleado"
                                : role === "CUSTOMER"
                                  ? "Cliente"
                                  : "Desconocido"}
                          </SelectItem>
                        ))}
                      </Select>
                      <Checkbox
                        className="col-span-8 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        name="isActive"
                        color="primary"
                        onChange={handleChange}
                        defaultSelected={user.status}
                      >
                        Activar usuario
                      </Checkbox>
                      <input
                        name="isActiveValue"
                        value={String(formData.isActive)}
                        className="sr-only"
                      />
                    </div>
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
                      Actualizar
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
