import {
  createServiceCategory,
  updateServiceCategory,
} from "@action/serviceCategory.action";
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

export function useServiceCategoryModal({
  serviceCategory,
}: {
  serviceCategory: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);

  const [createState, formActionCreate] = useFormState(
    createServiceCategory,
    undefined,
  );

  const [updateState, formActionUpdate] = useFormState(
    updateServiceCategory,
    undefined,
  );

  const [formData, setFormData] = useState({
    status: serviceCategory?.status,
  });

  useEffect(() => {
    setFormData({
      status: serviceCategory?.status,
    });
  }, [serviceCategory]);

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

type ServiceCategoryModalProperties = {
  buttonText: string;
  title: string;
  serviceCategory?: any;
  setServiceCategory?: any;
  user?: any;
};

export default function ServiceCategoryModal({
  buttonText,
  title,
  serviceCategory,
  setServiceCategory,
  user,
}: ServiceCategoryModalProperties) {
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
  } = useServiceCategoryModal({ serviceCategory });

  return (
    <>
      <Button color="primary" onPress={onOpen} className="text-white">
        {buttonText}
      </Button>
      <Modal
        isOpen={isOpen || serviceCategory !== null}
        onOpenChange={() => {
          serviceCategory == null ? onOpenChange() : "";
          setServiceCategory(null);
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
              {!serviceCategory && (
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
                        alt="Categoría de Servicio"
                        className="rounded-lg"
                        width={250}
                        height={320}
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
                        placeholder="Nombre de la categoría aquí"
                        size="lg"
                        isRequired
                        isClearable
                      />
                      <Textarea
                        className="col-span-8"
                        label="Descripción"
                        name="description"
                        type="text"
                        size="lg"
                        placeholder="Descripción de la categoría aquí"
                        isRequired
                      />
                      <Checkbox
                        className="col-span-8 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        name="status"
                        color="primary"
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
                      Agregar
                    </Button>
                  </ModalFooter>
                </form>
              )}
              {serviceCategory && (
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
                    name="categoryId"
                    value={serviceCategory.id}
                  />
                  <ModalBody className="flex flex-col w-full lg:flex-row gap-x-3">
                    <div className="flex flex-col items-center justify-center flex-1 w-full gap-y-3">
                      {/* <Image
                        src={serviceCategory.cover}
                        alt="Categoría de Servicio"
                        className="rounded-lg"
                        width={250}
                        height={320}
                      /> */}
                    </div>
                    <div className="grid w-full grid-cols-8 gap-4 flex-3">
                      <Input
                        className="col-span-8"
                        label="Nombre"
                        name="name"
                        type="text"
                        placeholder="Nombre de la categoría aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={serviceCategory.name}
                      />
                      <Textarea
                        className="col-span-8"
                        label="Descripción"
                        name="description"
                        type="text"
                        size="lg"
                        placeholder="Descripción de la categoría aquí"
                        isRequired
                        defaultValue={serviceCategory.description}
                      />
                      <Checkbox
                        className="col-span-8 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        name="status"
                        color="primary"
                        onChange={handleChange}
                        defaultSelected={serviceCategory.status}
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
