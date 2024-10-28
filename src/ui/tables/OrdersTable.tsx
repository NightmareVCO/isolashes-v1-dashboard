"use client";

import PackageIcon from "@icons/PackageIcon";
import ReceiptIcon from "@icons/ReceiptIcon";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
  User,
} from "@nextui-org/react";
import ProductsItemsModal from "@ui/modals/ProductsItemsModal";
import { ViewSellModal } from "@ui/modals/ViewSellModal";
import Pagination from "@ui/pagination/Pagination";
import Image from "next/image";
import React, { useState } from "react";

const statusColorMap: any = {
  true: "success",
  false: "warning",
};

const columns = [
  { name: "USUARIO", uid: "userName" },
  { name: "FECHA DE ORDEN", uid: "dateOrdered" },
  { name: "FECHA DE ENVÍO", uid: "dateDelivered" },
  { name: "FECHA DE ENTREGA", uid: "dateCompleted" },
  { name: "TOTAL", uid: "total" },
  { name: "TIPO DE COMPRA", uid: "inPlace" },
  { name: "ENTREGADO", uid: "delivered" },
  { name: "COMPLETADO", uid: "completed" },
  { name: "ITEMS", uid: "items" },
];

export function useOrdersTable() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedOrderForItems, setSelectedOrderForItems] = useState<any>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return {
    selectedOrder,
    setSelectedOrder,
    selectedReceipt,
    setSelectedReceipt,
    selectedOrderForItems,
    setSelectedOrderForItems,
    isOpen,
    onOpen,
    onOpenChange,
  };
}

type OrdersTableProperties = {
  orders: any;
  allOrdersPages: number;
  user: any;
};

export default function OrdersTable({
  orders,
  allOrdersPages,
}: OrdersTableProperties) {
  const {
    selectedOrder,
    setSelectedOrder,
    selectedReceipt,
    setSelectedReceipt,
    selectedOrderForItems,
    setSelectedOrderForItems,
  } = useOrdersTable();

  const renderCell = React.useCallback(
    (order: any, columnKey: any) => {
      const cellValue = order[columnKey];
      switch (columnKey) {
        case "userName": {
          return (
            <div className="flex items-start justify-start">
              <User
                avatarProps={{
                  radius: "sm",
                  src: "/userPlaceholder.webp",
                  ImgComponent: () => (
                    <Image
                      src={"/userPlaceholder.webp"}
                      alt={order.user.name ?? order.userName ?? "N/A"}
                      width={40}
                      height={40}
                    />
                  ),
                }}
                description={`${order.user.email ?? order.userEmail} - ${order.user.phone ?? order.userPhone ?? "N/A"}`}
                name={order.user.name ?? order.userName ?? "N/A"}
              >
                {order.user.name ?? order.userName ?? "N/A"}
              </User>
            </div>
          );
        }
        case "items": {
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Ver Productos">
                <button
                  onClick={() => {
                    setSelectedOrderForItems(order);
                  }}
                >
                  <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                    <PackageIcon />
                  </span>
                </button>
              </Tooltip>
              <Tooltip content="Ver Factura">
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setSelectedReceipt(order.receipt);
                  }}
                >
                  <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                    <ReceiptIcon />
                  </span>
                </button>
              </Tooltip>
            </div>
          );
        }
        case "total": {
          return <p className="text-sm">RD$ {cellValue}</p>;
        }
        case "status": {
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[cellValue]}
              size="sm"
              variant="flat"
            >
              {cellValue ? "Activo" : "Inactivo"}
            </Chip>
          );
        }
        case "delivered": {
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[cellValue]}
              size="sm"
              variant="flat"
            >
              {cellValue ? "Entregada" : "No Entregada"}
            </Chip>
          );
        }
        case "completed": {
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[cellValue]}
              size="sm"
              variant="flat"
            >
              {cellValue ? "Completada" : "No Completada"}
            </Chip>
          );
        }
        case "dateOrdered": {
          return (
            <p className="text-sm">
              {new Date(cellValue).toLocaleDateString()}
            </p>
          );
        }
        case "dateDelivered": {
          return (
            <p className="text-sm">
              {cellValue ? new Date(cellValue).toLocaleDateString() : "N/A"}
            </p>
          );
        }
        case "dateCompleted": {
          return (
            <p className="text-sm">
              {cellValue ? new Date(cellValue).toLocaleDateString() : "N/A"}
            </p>
          );
        }
        case "inPlace": {
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[cellValue]}
              size="sm"
              variant="flat"
            >
              {cellValue ? "En Sucursal" : "A Domicilio"}
            </Chip>
          );
        }
        default: {
          return cellValue;
        }
      }
    },
    [setSelectedOrder, setSelectedReceipt, setSelectedOrderForItems],
  );

  return (
    <>
      <div className="flex items-end justify-end">
        <ViewSellModal
          order={selectedOrder}
          setOrder={setSelectedOrder}
          receipt={selectedReceipt}
          setReceipt={setSelectedReceipt}
        />
        <ProductsItemsModal
          order={selectedOrderForItems}
          setOrder={setSelectedOrderForItems}
        />
      </div>
      <Table isHeaderSticky aria-label="Órdenes">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={orders}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center">
        <Pagination total={allOrdersPages} />
      </div>
    </>
  );
}
