"use client";

import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import ProductsItemsModal from "@ui/modals/ProductsItemsModal";
import { ViewSellModal } from "@ui/modals/ViewSellModal";
import { useState } from "react";

import CompleteProductModal from "../modals/completeProductModal";
import SendProductModal from "../modals/sendProductModal";

export const useOrderCard = () => {
  const [selectedOrderForItems, setOrderForItems] = useState<any>(null);
  const [selectedOrderForReceipt, setOrderForReceipt] = useState<any>(null);
  const [selectedOrderToSend, setOrderToSend] = useState<any>(null);
  const [selectedOrderToComplete, setOrderToComplete] = useState<any>(null);
  const [selectedReceipt, setReceipt] = useState<any>(null);

  return {
    selectedOrderForItems,
    setOrderForItems,
    selectedOrderForReceipt,
    setOrderForReceipt,
    selectedReceipt,
    setReceipt,
    selectedOrderToSend,
    setOrderToSend,
    selectedOrderToComplete,
    setOrderToComplete,
  };
};

export default function OrderCard({ order, user }: { order: any; user: any }) {
  const {
    selectedOrderForItems,
    setOrderForItems,
    selectedOrderForReceipt,
    setOrderForReceipt,
    selectedReceipt,
    setReceipt,
    selectedOrderToSend,
    setOrderToSend,
    selectedOrderToComplete,
    setOrderToComplete,
  } = useOrderCard();
  return (
    <>
      <Card
        key={order.id}
        shadow="none"
        className="p-4 h-fit border-y"
        radius="none"
        fullWidth
      >
        <CardBody className="flex flex-row flex-wrap items-center justify-center h-full p-0 lg:items-start lg:justify-start sm:flex-nowrap">
          <div className="px-4 py-5 flex-3">
            <h3 className="text-lg font-medium">Orden de {order.userName}</h3>
            <div className="flex flex-col gap-3 pt-2 text-default-400">
              <div className="flex items-center justify-start gap-x-6">
                <p>
                  Teléfono:{" "}
                  <span className="text-default-500">{order.userPhone}</span>
                </p>
                <p>
                  Email:{" "}
                  <span className="text-default-500">{order.userEmail}</span>
                </p>
              </div>

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

              <div className="flex items-center justify-start gap-x-6">
                <p>
                  Orden:{" "}
                  <span className="text-default-500">
                    {new Date(order.dateOrdered).toLocaleDateString("es", {
                      timeZone: "UTC",
                    })}
                  </span>
                </p>
                {order.dateDelivered && (
                  <p>
                    Entrega:{" "}
                    <span className="text-default-500">
                      {new Date(order.dateDelivered).toLocaleDateString("es", {
                        timeZone: "UTC",
                      })}
                    </span>
                  </p>
                )}
                {order.dateCompleted && (
                  <p>
                    Completado:{" "}
                    <span className="text-default-500">
                      {new Date(order.dateCompleted).toLocaleDateString("es", {
                        timeZone: "UTC",
                      })}
                    </span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-start gap-x-6">
                <p>Estado: </p>
                {order.completed ? (
                  <Chip color="success" variant="flat" size="md">
                    Completado
                  </Chip>
                ) : order.delivered ? (
                  <Chip color="primary" variant="flat" size="md">
                    Entregado
                  </Chip>
                ) : (
                  <Chip color="warning" variant="flat" size="md">
                    Pendiente
                  </Chip>
                )}
                <p>Tipo de Orden: </p>
                {order.inPlace ? (
                  <Chip color="success" variant="flat" size="md">
                    En Sucursal
                  </Chip>
                ) : (
                  <Chip color="success" variant="flat" size="md">
                    A Domicilio
                  </Chip>
                )}
              </div>
            </div>
          </div>
          <div className="px-4 py-5 flex items-center justify-center flex-1 h-full min-h-[144px]">
            <div className="flex flex-col gap-y-4">
              {!order.delivered && (
                <Button
                  color="primary"
                  className="text-white"
                  onPress={() => {
                    setOrderToSend(order);
                  }}
                >
                  Enviar
                </Button>
              )}

              {order.delivered && !order.completed && (
                <Button
                  color="success"
                  className="text-white"
                  onPress={() => {
                    setOrderToComplete(order);
                  }}
                >
                  Completar
                </Button>
              )}

              <Button
                color="success"
                className="text-white"
                onPress={() => {
                  setOrderForReceipt(order);
                  setReceipt(order.receipt);
                }}
              >
                Ver Factura
              </Button>

              <Button
                onPress={() => {
                  setOrderForItems(order);
                }}
                color="primary"
                className="text-white"
              >
                Ver Productos
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      <ProductsItemsModal
        order={selectedOrderForItems}
        setOrder={setOrderForItems}
      />
      <ViewSellModal
        order={selectedOrderForReceipt}
        setOrder={setOrderForReceipt}
        receipt={selectedReceipt}
        setReceipt={setReceipt}
      />
      <SendProductModal
        order={selectedOrderToSend}
        setOrder={setOrderToSend}
        user={user}
      />
      <CompleteProductModal
        order={selectedOrderToComplete}
        setOrder={setOrderToComplete}
        user={user}
      />
    </>
  );
}
