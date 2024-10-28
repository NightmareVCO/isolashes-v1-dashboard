"use client";

import { uploadAppointmentImage } from "@action/appointment.action";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from "@nextui-org/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";

export type AppointmentCardModalProperties = {
  appointment: any;
  onOpen: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: { id: string };
};

export function useAppointmentCardModal() {
  const [file, setFile] = useState<File | null>(null);
  const fileUploadReference = useRef<HTMLInputElement>({} as HTMLInputElement);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };
  const handleClick = () => {
    fileUploadReference.current.click();
  };

  const [state, formAction] = useFormState(uploadAppointmentImage, undefined);

  return {
    file,
    fileUploadReference,
    handleFileChange,
    handleClick,
    state,
    formAction,
  };
}

export function AppointmentCardModal({
  appointment,
  isOpen,
  onOpenChange,
  user,
}: AppointmentCardModalProperties) {
  const {
    file,
    fileUploadReference,
    handleFileChange,
    handleClick,
    formAction,
  } = useAppointmentCardModal();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {`Subir resultado de ${appointment.fullName}`}
              <Divider />
              <Spacer y={3} />
            </ModalHeader>
            <form action={formAction}>
              <ModalBody className="flex flex-col items-center justify-center gap-2">
                <div className="flex flex-col items-center justify-center flex-1 w-full gap-y-3">
                  <input
                    type="file"
                    ref={fileUploadReference}
                    className="hidden sr-only"
                    onChange={handleFileChange}
                    accept="image"
                    name="appointmentImage"
                  />
                  <input
                    type="hidden"
                    name="appointmentId"
                    value={appointment.id}
                    sr-only
                  />
                  <input type="hidden" name="id" value={user.id} sr-only />
                  <Image
                    src={
                      appointment.image ??
                      (file === null
                        ? "/placeholder.webp"
                        : URL.createObjectURL(file))
                    }
                    alt="Producto"
                    width={250}
                    height={320}
                    className="rounded-lg"
                    unoptimized={
                      appointment.image ? false : file ? false : true
                    }
                  />
                  <Button
                    color="primary"
                    className="text-white"
                    onPress={handleClick}
                  >
                    Subir imagen
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" className="text-white" type="submit">
                  Agregar
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
