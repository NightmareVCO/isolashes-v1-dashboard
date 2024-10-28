"use client";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import IsolashesLogo from "@ui/icons/IsolashesLogo";

export function ViewSellModal({
  order,
  receipt,
  setOrder,
  setReceipt,
}: {
  order: any;
  receipt: any;
  setOrder: any;
  setReceipt: any;
}) {
  const formattedDate = receipt?.date
    ? new Date(receipt.date).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No disponible";

  const formattedTime = receipt?.date
    ? new Date(receipt.date).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  const formattedDateTime = receipt?.date
    ? `${formattedDate} - ${formattedTime}`
    : "No disponible";

  return (
    <>
      <Modal
        isOpen={order}
        onOpenChange={() => {
          setOrder(null);
          setReceipt(null);
        }}
        isDismissable={false}
        className="transition-all duration-300 ease-in-out max-h-[780px] overflow-hidden"
        size="2xl"
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                <h2 className="w-full text-lg text-start text-primary">
                  Ver Productos
                </h2>
                <Divider />
              </ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center w-full h-full">
                <IsolashesLogo className="h-auto mb-4 w-44" />
                <p className="text-default-700">
                  {`Teléfono: ${receipt?.branch?.phone ?? "Online"}`}
                </p>
                <p className="text-default-700">
                  {`Dirección: ${receipt?.branch?.address ?? "Online"}`}
                </p>
                <Divider />
                <div className="flex items-center justify-between w-full">
                  <p className="font-bold text-default-700">
                    Fecha de Transacción:
                  </p>
                  <p className="font-medium text-default-700">
                    {formattedDateTime}
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="font-bold text-default-700">
                    Empleado que atendió:
                  </p>
                  <p className="font-medium text-default-700">
                    {order.receipt?.employeeName ?? "Online"}
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="font-bold text-default-700">Estado de Venta:</p>
                  <p className="font-medium text-default-700">Pagado</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="font-bold text-default-700">Método de Pago:</p>
                  <p className="font-medium capitalize text-default-700">
                    {order.receipt?.paymentMethod === "tarjeta"
                      ? "Tarjeta de Crédito"
                      : "Efectivo"}
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="font-bold text-default-700">
                    Número de Transacción:
                  </p>
                  <p className="font-medium text-default-700">{10_000}</p>
                </div>
                {(order.user || order.userName) && (
                  <div className="flex items-center justify-between w-full">
                    <p className="font-bold text-default-700">Cliente:</p>
                    <p className="font-medium text-default-700">
                      {order.user
                        ? order.user.name + " " + order.user.lastName
                        : order.userName}
                    </p>
                  </div>
                )}
                <Divider />

                <div className="flex flex-col w-full gap-2 max-h-[190px] overflow-y-auto">
                  <div className="flex items-center justify-between w-full">
                    <p className="font-bold text-default-700 flex-2">
                      Productos
                    </p>
                    <p className="flex-1 font-bold text-default-700">
                      Cantidad
                    </p>
                    <p className="flex-1 font-bold text-right text-default-700">
                      Precio Unitario
                    </p>
                    <p className="flex-1 font-bold text-right text-default-700">
                      Valor
                    </p>
                  </div>

                  {order.products?.map((orderItem: any) => (
                    <div
                      key={orderItem.id}
                      className="flex items-center justify-between w-full"
                    >
                      <p className="text-default-700 flex-2">
                        {orderItem.product.name}
                      </p>
                      <p className="flex-1 text-center text-default-700">
                        {orderItem.quantity}
                      </p>
                      <p className="flex-1 text-right text-default-700">
                        {`RD$${orderItem.price}`}
                      </p>
                      <p className="flex-1 text-right text-default-700">
                        {`RD$${orderItem.price * orderItem.quantity}`}
                      </p>
                    </div>
                  ))}
                </div>

                <Divider />
                <div className="flex items-center justify-between w-full">
                  <p className="text-xl font-semibold text-default-700">
                    Monto Total:
                  </p>
                  <p className="text-xl font-semibold text-default-700">{`RD$${order.total}`}</p>
                </div>
              </ModalBody>
              <ModalFooter className="flex items-center justify-end">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
