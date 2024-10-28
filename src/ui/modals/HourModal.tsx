import { createHour, updateHour } from "@action/hour.action";
import {
  Button,
  Checkbox,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export function useHourModal({ hour }: { hour: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [createState, formActionCreate] = useFormState(createHour, undefined);

  const [updateState, formActionUpdate] = useFormState(updateHour, undefined);

  const [formData, setFormData] = useState({
    time: hour?.time,
    status: hour?.status,
  });

  useEffect(() => {
    setFormData({
      time: hour?.time,
      status: hour?.status,
    });
  }, [hour]);

  const handleChange = (event: any) => {
    const { name, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? String(checked) : event.target.value,
    });
  };

  return {
    isOpen,
    onOpen,
    onOpenChange,
    formActionCreate,
    createState,
    updateState,
    formActionUpdate,
    formData,
    handleChange,
  };
}

type HourModalProperties = {
  buttonText: string;
  title: string;
  hour?: any;
  setHour?: any;
  user?: any;
};

export default function HourModal({
  buttonText,
  title,
  hour,
  setHour,
  user,
}: HourModalProperties) {
  const {
    isOpen,
    onOpen,
    onOpenChange,
    formActionCreate,
    formActionUpdate,
    formData,
    handleChange,
  } = useHourModal({ hour });

  return (
    <>
      <Button color="primary" onPress={onOpen} className="text-white">
        {buttonText}
      </Button>
      <Modal
        isOpen={isOpen || hour !== null}
        onOpenChange={() => {
          hour == null ? onOpenChange() : "";
          setHour(null);
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
              {!hour && (
                <form action={formActionCreate}>
                  <input
                    type="hidden"
                    className="sr-only"
                    name="id"
                    value={user.id}
                  />
                  <ModalBody className="flex flex-col w-full lg:flex-row gap-x-3">
                    <div className="grid w-full grid-cols-8 gap-4 flex-3">
                      <Input
                        className="col-span-8"
                        label="Hora"
                        name="time"
                        placeholder="Ingresa la hora aquí"
                        size="lg"
                        isRequired
                        isClearable
                      />
                      <Checkbox
                        className="col-span-8 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        name="status"
                        color="primary"
                      >
                        Mostrar en la página principal
                      </Checkbox>
                      <input
                        name="statusValue"
                        value={String(formData.status)}
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
              {hour && (
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
                    name="hourId"
                    value={hour.id}
                  />
                  <ModalBody className="flex flex-col w-full lg:flex-row gap-x-3">
                    <div className="grid w-full grid-cols-8 gap-4 flex-3">
                      <Input
                        className="col-span-8"
                        label="Hora"
                        name="time"
                        placeholder="Ingresa la hora aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={hour.time}
                      />
                      <Checkbox
                        className="col-span-8 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        name="status"
                        color="primary"
                        defaultSelected={hour.status}
                        onChange={handleChange}
                      >
                        Mostrar en la página principal
                      </Checkbox>
                      <input
                        name="statusValue"
                        value={String(formData.status)}
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
