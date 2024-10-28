import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import ProductItemCard from "../cards/ProductItemCard";

export default function ProductsItemsModal({
  order,
  setOrder,
}: {
  order: any;
  setOrder: any;
}) {
  return (
    <>
      <Modal
        isOpen={order}
        isDismissable={false}
        onOpenChange={() => setOrder(null)}
        isKeyboardDismissDisabled={true}
        className="max-h-[800px]"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <div className="overflow-y-auto max-h-[650px]">
              <ModalHeader className="flex flex-col">
                <h2 className="w-full text-lg text-start text-primary">
                  Ver Productos
                </h2>
                <Divider />
              </ModalHeader>
              <ModalBody>
                {order.products.map((order: any) => (
                  <ProductItemCard key={order.id} orderItem={order} />
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
