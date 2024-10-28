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
import { useFormState } from "react-dom";

import { sendOrder } from "@/lib/action/order.action";

export function useSendProductModal() {
  const [state, formAction] = useFormState(sendOrder, undefined);

  return {
    state,
    formAction,
  };
}

export default function SendProductModal({
  order,
  setOrder,
  user,
}: {
  order: any;
  setOrder: any;
  user: any;
}) {
  const { formAction } = useSendProductModal();

  return (
    <Modal
      isOpen={order}
      onOpenChange={() => setOrder(null)}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {`Enviar orden de ${order.user?.name || order.userName}`}
              <Divider />
              <Spacer y={3} />
            </ModalHeader>
            <ModalBody className="flex flex-col items-center justify-center gap-2">
              <div className="flex flex-col items-start justify-center h-full gap-y-4">
                {order.address && (
                  <div className="flex items-center justify-start gap-x-6">
                    <p>
                      Dirección:{" "}
                      <span className="text-default-500">
                        {order.address.country +
                          ", " +
                          order.address.state +
                          ", " +
                          order.address.city +
                          ", " +
                          order.address.street +
                          ", " +
                          order.address.number +
                          ", " +
                          order.address.zipCode}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <h3>¿Estás seguro de que deseas enviar esta orden?</h3>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <form action={formAction}>
                <input
                  type="hidden"
                  value={order.id}
                  className="sr-only"
                  name="orderId"
                />
                <input
                  type="hidden"
                  value={user.id}
                  className="sr-only "
                  name="id"
                />
                <Button color="primary" className="text-white" type="submit">
                  Enviar
                </Button>
              </form>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
