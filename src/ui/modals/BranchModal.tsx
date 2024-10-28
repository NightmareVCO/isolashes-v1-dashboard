import { createBranch, updateBranch } from "@action/branch.action";
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
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

export function useBranchModal({ branch }: { branch: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);

  const [createState, formActionCreate] = useFormState(createBranch, undefined);
  const [updateState, formActionUpdate] = useFormState(updateBranch, undefined);

  const [formData, setFormData] = useState({
    status: branch?.status,
  });

  useEffect(() => {
    setFormData({
      status: branch?.status,
    });
  }, [branch]);

  const handleChange = (event: any) => {
    const { name, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? String(checked) : event.target.value,
    });
  };

  const fileUploadReference = useRef<HTMLInputElement>({} as HTMLInputElement);

  const handleClick = () => {
    fileUploadReference.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  return {
    isOpen,
    onOpen,
    onOpenChange,
    file,
    handleClick,
    handleFileChange,
    fileUploadReference,
    formActionCreate,
    createState,
    updateState,
    formActionUpdate,
    formData,
    handleChange,
  };
}

type BranchModalProperties = {
  buttonText: string;
  title: string;
  branch?: any;
  setBranch?: any;
  user?: any;
};

export default function BranchModal({
  buttonText,
  title,
  branch,
  setBranch,
  user,
}: BranchModalProperties) {
  const {
    isOpen,
    onOpen,
    onOpenChange,
    file,
    handleClick,
    handleFileChange,
    fileUploadReference,
    formActionCreate,
    formActionUpdate,
    formData,
    handleChange,
  } = useBranchModal({ branch });

  return (
    <>
      <Button color="primary" onPress={onOpen} className="text-white">
        {buttonText}
      </Button>
      <Modal
        isOpen={isOpen || branch !== null}
        onOpenChange={() => {
          branch == null ? onOpenChange() : "";
          setBranch(null);
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
              {!branch && (
                <form action={formActionCreate}>
                  <input
                    type="hidden"
                    className="sr-only"
                    name="id"
                    value={user.id}
                  />
                  <ModalBody className="flex flex-col w-full lg:flex-row gap-x-3">
                    <div className="flex flex-col items-center justify-center flex-1 w-full gap-y-3">
                      <input
                        type="file"
                        ref={fileUploadReference}
                        className="hidden sr-only"
                        onChange={handleFileChange}
                        accept="image/webp"
                        name="cover"
                      />
                      <Image
                        src={
                          file === null
                            ? "/placeholder.webp"
                            : URL.createObjectURL(file)
                        }
                        alt="Sucursal"
                        width={250}
                        height={320}
                        className="rounded-lg"
                        unoptimized={file ? false : true}
                      />
                      <Button
                        color="primary"
                        className="text-white"
                        onPress={handleClick}
                      >
                        Subir imagen
                      </Button>
                    </div>
                    <div className="grid w-full grid-cols-8 gap-4 flex-3">
                      <Input
                        className="col-span-8"
                        label="Nombre"
                        name="name"
                        type="text"
                        placeholder="Nombre de la sucursal aquí"
                        size="lg"
                        isRequired
                        isClearable
                      />
                      <Textarea
                        className="col-span-8"
                        label="Dirección"
                        name="address"
                        type="text"
                        size="lg"
                        placeholder="Dirección de la sucursal aquí"
                        isRequired
                      />
                      <Input
                        className="col-span-4"
                        label="Teléfono"
                        name="phone"
                        type="text"
                        placeholder="Teléfono de la sucursal aquí"
                        size="lg"
                        isRequired
                        isClearable
                      />
                      <Input
                        className="col-span-4"
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Email de la sucursal aquí"
                        size="lg"
                        isRequired
                        isClearable
                      />
                      <Textarea
                        className="col-span-8"
                        label="Horario"
                        name="schedule"
                        type="text"
                        size="lg"
                        placeholder="Horario de la sucursal aquí"
                        isRequired
                      />
                      <Checkbox
                        className="col-span-8 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        name="status"
                        color="primary"
                        isRequired
                        onChange={handleChange}
                      >
                        Mostrar en la pagina principal
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
              {branch && (
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
                    name="branchId"
                    value={branch.id}
                  />
                  <ModalBody className="flex flex-col w-full lg:flex-row gap-x-3">
                    <div className="flex flex-col items-center justify-center flex-1 w-full gap-y-3">
                      <Image
                        src={branch.cover || "/placeholder.webp"}
                        alt="Sucursal"
                        width={250}
                        height={320}
                        className="rounded-lg"
                      />
                      <input
                        type="file"
                        ref={fileUploadReference}
                        className="hidden sr-only"
                        onChange={handleFileChange}
                        accept="image/webp"
                        name="cover"
                      />
                      <Button
                        color="primary"
                        className="text-white"
                        onPress={handleClick}
                      >
                        Subir imagen
                      </Button>
                    </div>
                    <div className="grid w-full grid-cols-8 gap-4 flex-3">
                      <Input
                        className="col-span-8"
                        label="Nombre"
                        name="name"
                        type="text"
                        placeholder="Nombre de la sucursal aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={branch.name}
                      />
                      <Textarea
                        className="col-span-8"
                        label="Dirección"
                        name="address"
                        type="text"
                        size="lg"
                        isRequired
                        placeholder="Dirección de la sucursal aquí"
                        defaultValue={branch.address}
                      />
                      <Input
                        className="col-span-4"
                        label="Teléfono"
                        name="phone"
                        type="text"
                        placeholder="Teléfono de la sucursal aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={branch.phone}
                      />
                      <Input
                        className="col-span-4"
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Email de la sucursal aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={branch.email}
                      />
                      <Textarea
                        className="col-span-8"
                        label="Horario"
                        name="schedule"
                        type="text"
                        size="lg"
                        isRequired
                        placeholder="Horario de la sucursal aquí"
                        defaultValue={branch.schedule}
                      />
                      <Checkbox
                        className="col-span-8 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        name="status"
                        color="primary"
                        defaultSelected={branch.status}
                        onChange={handleChange}
                      >
                        Mostrar en la pagina principal
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
