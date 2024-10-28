"use client";

import { EyeIcon } from "@icons/EyeIcon";
import OrderIcon from "@icons/OrderIcon";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { ViewSellModal } from "@ui/modals/ViewSellModal";
import { ViewSellModalAppointment } from "@ui/modals/ViewSellModalAppointment";
import Pagination from "@ui/pagination/Pagination";
import Image from "next/image";
import React, { useState } from "react";

const statusColorMap: any = {
  true: "success",
  false: "warning",
};

const columns = [
  { name: "USUARIO", uid: "userName" },
  { name: "EMPLEADO", uid: "employeeName" },
  { name: "SUCURSAL", uid: "branch" },
  { name: "TOTAL", uid: "total" },
  { name: "MÉTODO DE PAGO", uid: "paymentMethod" },
  { name: "FECHA", uid: "date" },
  { name: "TIPO DE FACTURA", uid: "inPlace" },
  { name: "ITEMS", uid: "items" },
];

export function useReceiptsTable() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [selectedServices, setSelectedServices] = useState<any>(null);

  return {
    selectedOrder,
    setSelectedOrder,
    selectedReceipt,
    setSelectedReceipt,
    selectedServices,
    setSelectedServices,
  };
}

type ReceiptsTableProperties = {
  receipts: any;
  allReceiptsPages: number;
  user: any;
};

export default function ReceiptsTable({
  receipts,
  allReceiptsPages,
}: ReceiptsTableProperties) {
  const {
    selectedOrder,
    setSelectedOrder,
    selectedReceipt,
    setSelectedReceipt,
    selectedServices,
    setSelectedServices,
  } = useReceiptsTable();

  const renderCell = React.useCallback(
    (receipt: any, columnKey: any) => {
      const cellValue = receipt[columnKey];
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
                      alt={receipt.user.name ?? receipt.userName ?? "N/A"}
                      width={40}
                      height={40}
                    />
                  ),
                }}
                description={`${receipt.user.email ?? receipt.userEmail} - ${receipt.user.phone ?? receipt.userPhone ?? "N/A"}`}
                name={receipt.user.name ?? receipt.userName ?? "N/A"}
              >
                {receipt.user.name ?? receipt.userName ?? "N/A"}
              </User>
            </div>
          );
        }
        case "employeeName": {
          return <p className="text-sm">{cellValue}</p>;
        }
        case "services": {
          return (
            <ul className="list-disc pl-4">
              {receipt.services.map((service: any) => (
                <li key={service.id}>{service.name}</li>
              ))}
            </ul>
          );
        }
        case "branch": {
          return (
            <p className="text-sm">{cellValue ? cellValue.name : "N/A"}</p>
          );
        }
        case "inPlace": {
          return (
            <Chip
              className="capitalize"
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue ? "En Sucursal" : "A Domicilio"}
            </Chip>
          );
        }
        case "total": {
          return <p className="text-sm">RD$ {cellValue}</p>;
        }
        case "paymentMethod": {
          return (
            <p className="text-sm">
              {cellValue === "tarjeta" ? "Tarjeta de Crédito" : "Efectivo"}
            </p>
          );
        }
        case "date": {
          return (
            <p className="text-sm">
              {new Date(cellValue).toLocaleDateString()}
            </p>
          );
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
        case "items": {
          return (
            <div className="relative flex items-center justify-center gap-2">
              {receipt.order && (
                <Tooltip content="Ver Orden">
                  <button
                    onClick={() => {
                      setSelectedOrder(receipt.order);
                      setSelectedReceipt(receipt);
                    }}
                  >
                    <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                      <OrderIcon />
                    </span>
                  </button>
                </Tooltip>
              )}
              {receipt.services.length > 0 && (
                <Tooltip content="Ver Servicios">
                  <button
                    onClick={() => {
                      setSelectedReceipt(receipt);
                      setSelectedServices(receipt?.services ?? []);
                    }}
                  >
                    <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                      <EyeIcon />
                    </span>
                  </button>
                </Tooltip>
              )}
            </div>
          );
        }
        default: {
          return cellValue;
        }
      }
    },
    [setSelectedOrder, setSelectedReceipt, setSelectedServices],
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
        <ViewSellModalAppointment
          receipt={selectedReceipt}
          services={selectedServices}
          setServices={setSelectedServices}
          setReceipt={setSelectedReceipt}
        />
      </div>
      <Table isHeaderSticky aria-label="Recibos">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={receipts}>
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
        <Pagination total={allReceiptsPages} />
      </div>
    </>
  );
}
