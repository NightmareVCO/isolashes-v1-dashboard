import { createService, updateService } from "@action/service.action";
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
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

export function useServiceModal({ service }: { service: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);

  const [createState, formActionCreate] = useFormState(
    createService,
    undefined,
  );

  const [updateState, formActionUpdate] = useFormState(
    updateService,
    undefined,
  );

  const [formData, setFormData] = useState({
    status: service?.status,
  });

  useEffect(() => {
    setFormData({
      status: service?.status,
    });
  }, [service]);

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

type ServiceModalProperties = {
  buttonText: string;
  title: string;
  categories: any;
  service?: any;
  setService?: any;
  user?: any;
};

export default function ServiceModal({
  buttonText,
  title,
  categories,
  service,
  setService,
  user,
}: ServiceModalProperties) {
  const {
    isOpen,
    onOpen,
    onOpenChange,
    formActionCreate,
    formActionUpdate,
    formData,
    handleChange,
  } = useServiceModal({ service });

  return (
    <>
      <Button color="primary" onPress={onOpen} className="text-white">
        {buttonText}
      </Button>
      <Modal
        isOpen={isOpen || service !== null}
        onOpenChange={() => {
          service == null ? onOpenChange() : "";
          setService(null);
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
              {!service && (
                <form action={formActionCreate}>
                  <input
                    type="hidden"
                    className="sr-only"
                    name="id"
                    value={user.id}
                  />
                  <ModalBody className="flex flex-col w-full lg:flex-row gap-x-3">
                    {/* <div className="flex flex-col items-center justify-center flex-1 w-full gap-y-3">
                      <input
                        type="file"
                        ref={fileUploadReference}
                        className="hidden sr-only"
                        onChange={handleFileChange}
                        accept="image/webp"
                        name="serviceCover"
                      />
                      <Image
                        src={
                          file === null
                            ? "/placeholder.webp"
                            : URL.createObjectURL(file)
                        }
                        alt="Servicio"
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
                    </div> */}
                    <div className="grid w-full grid-cols-8 gap-4 flex-3">
                      <Input
                        className="col-span-8"
                        label="Nombre"
                        name="name"
                        type="text"
                        placeholder="Nombre del servicio aquí"
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
                        placeholder="Descripción del servicio aquí"
                        isRequired
                      />
                      <Input
                        className="col-span-4"
                        label="Precio"
                        name="price"
                        type="number"
                        min={1}
                        placeholder="Precio del servicio aquí"
                        size="lg"
                        isRequired
                        isClearable
                      />
                      <Select
                        className="col-span-4"
                        label="Categoría"
                        name="serviceCategory"
                        placeholder="Categoría del servicio aquí"
                        size="lg"
                        isRequired
                      >
                        {categories?.map((category: any) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </Select>
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
              {service && (
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
                    name="serviceId"
                    value={service.id}
                  />
                  <ModalBody className="flex flex-col w-full lg:flex-row gap-x-3">
                    {/* <div className="flex flex-col items-center justify-center flex-1 w-full gap-y-3">
                      <Image
                        src={
                          service.serviceCategory?.cover ||
                          service.serviceCategory?.cover2
                        }
                        alt="Servicio"
                        width={250}
                        height={320}
                        className="rounded-lg"
                      />
                    </div> */}
                    <div className="grid w-full grid-cols-8 gap-4 flex-3">
                      <Input
                        className="col-span-8"
                        label="Nombre"
                        name="name"
                        type="text"
                        placeholder="Nombre del servicio aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={service.name}
                      />
                      <Textarea
                        className="col-span-8"
                        label="Descripción"
                        name="description"
                        type="text"
                        size="lg"
                        placeholder="Descripción del servicio aquí"
                        isRequired
                        defaultValue={service.description}
                      />
                      <Input
                        className="col-span-4"
                        label="Precio"
                        type="number"
                        name="price"
                        min={1}
                        placeholder="Precio del servicio aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={service.price}
                      />
                      <Select
                        className="col-span-4"
                        label="Categoría"
                        name="serviceCategory"
                        placeholder="Categoría del servicio aquí"
                        size="lg"
                        isRequired
                        defaultSelectedKeys={[service.serviceCategory.id]}
                      >
                        {categories?.map((category: any) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </Select>
                      <Checkbox
                        className="col-span-8 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        name="status"
                        color="primary"
                        defaultSelected={service.status}
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
