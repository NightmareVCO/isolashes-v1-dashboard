"use client";

import { DeleteIcon } from "@icons/DeleteIcon";
import { EditIcon } from "@icons/EditIcon";
import {
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
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
import Pagination from "@ui/pagination/Pagination";
import React, { useState } from "react";

const statusColorMap: any = {
  true: "success",
  false: "warning",
};

import { deleteProduct } from "@action/product.action";
import ProductModal from "@ui/modals/ProductModal";
import Image from "next/image";
import { useFormState } from "react-dom";

const columns = [
  { name: "NOMBRE", uid: "name" },
  { name: "PRECIO", uid: "price" },
  { name: "CATEGORÍA", uid: "productCategory" },
  { name: "CANTIDAD", uid: "stock" },
  { name: "MÍNIMO", uid: "minStock" },
  { name: "VISIBLE", uid: "status" },
  { name: "PROMOCIÓN", uid: "isPromotion" },
  { name: "ESTADO", uid: "isNew" },
  { name: "ACCIONES", uid: "actions" },
];

export function useProductsTable() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [deleteSelectedProduct, setDeleteSelectedProduct] = useState<any>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteStatus, formActionDelete] = useFormState(
    deleteProduct,
    undefined,
  );

  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
  };

  const handleDeleteSelectedProduct = (product: any) => {
    setDeleteSelectedProduct(product);
  };

  return {
    selectedProduct,
    deleteStatus,
    deleteSelectedProduct,
    handleDeleteSelectedProduct,
    formActionDelete,
    setSelectedProduct,
    handleSelectProduct,
    isOpen,
    onOpen,
    onOpenChange,
  };
}

type ProductsTableProperties = {
  products: any;
  allProductsPages: number;
  categories: any;
  user: any;
};

export default function ProductsTable({
  products,
  allProductsPages,
  categories,
  user,
}: ProductsTableProperties) {
  const {
    selectedProduct,
    handleSelectProduct,
    deleteSelectedProduct,
    handleDeleteSelectedProduct,
    formActionDelete,
    setSelectedProduct,
    isOpen,
    onOpen,
    onOpenChange,
  } = useProductsTable();

  const renderCell = React.useCallback(
    (product: any, columnKey: any) => {
      const cellValue = product[columnKey];
      switch (columnKey) {
        case "name": {
          return (
            <div className="flex items-start justify-start">
              <User
                avatarProps={{
                  radius: "sm",
                  src: product.productImage[0]?.url ?? "/placeholder.webp",
                  ImgComponent: () => (
                    <Image
                      src={product.productImage[0]?.url ?? "/placeholder.webp"}
                      alt={product.name}
                      width={40}
                      height={40}
                    />
                  ),
                }}
                description={
                  product.description.length > 40
                    ? product.description.slice(0, 40) + "..."
                    : product.description
                }
                name={cellValue}
              >
                {product.name}
              </User>
            </div>
          );
        }
        case "productCategory": {
          return (
            <p className="text-sm capitalize text-bold">
              {product.productCategory.name}
            </p>
          );
        }
        case "price": {
          return (
            <p
              className={`text-sm capitalize text-bold ${product.isPromotion && "text-red-600"}`}
            >
              RD$ {product.isPromotion ? product.promotionPrice : cellValue}
            </p>
          );
        }
        case "stock": {
          return (
            <p className="text-sm text-center capitalize text-bold">
              {cellValue}
            </p>
          );
        }
        case "minStock": {
          return (
            <p className="text-sm text-center capitalize text-bold">
              {cellValue}
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
              {cellValue ? "Visible" : "Oculto"}
            </Chip>
          );
        }
        case "isPromotion": {
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[cellValue]}
              size="sm"
              variant="flat"
            >
              {cellValue ? "Promoción" : "Normal"}
            </Chip>
          );
        }
        case "isNew": {
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[cellValue]}
              size="sm"
              variant="flat"
            >
              {cellValue ? "Nuevo" : "Normal"}
            </Chip>
          );
        }
        // case "status": {
        //   return (
        //     <Chip
        //       className="capitalize"
        //       color={statusColorMap[user.status]}
        //       size="sm"
        //       variant="flat"
        //     >
        //       {cellValue}
        //     </Chip>
        //   );
        // }
        case "actions": {
          return (
            <div className="relative flex items-center justify-center gap-2">
              {/* <Tooltip content="Detalles">
                <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip> */}
              <Tooltip content="Editar Producto">
                <button onClick={() => handleSelectProduct(product)}>
                  <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                    <EditIcon />
                  </span>
                </button>
              </Tooltip>
              <Tooltip color="danger" content="Borrar Producto">
                <button
                  onClick={() => {
                    handleDeleteSelectedProduct(product);
                    onOpen();
                  }}
                >
                  <span className="text-lg cursor-pointer text-danger active:opacity-50">
                    <DeleteIcon />
                  </span>
                </button>
              </Tooltip>
            </div>
          );
        }
        default: {
          return cellValue;
        }
      }
    },
    [handleDeleteSelectedProduct, handleSelectProduct, onOpen],
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Eliminar ${deleteSelectedProduct?.name}`}
                <Divider className="mb-3" />
              </ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between w-full h-full gap-3">
                  <div className="flex-2">
                    <Image
                      src={
                        deleteSelectedProduct?.productImage[0]?.url ??
                        "/placeholder.webp"
                      }
                      alt={deleteSelectedProduct?.name}
                      width={150}
                      height={220}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center h-full flex-3 gap-y-4">
                    <p className="font-medium">{deleteSelectedProduct?.name}</p>
                    <p className="text-sm">
                      {deleteSelectedProduct?.description}
                    </p>
                    <p className="text-sm">
                      RD$ {deleteSelectedProduct?.price}
                    </p>
                    <p className="text-sm">
                      {deleteSelectedProduct?.stock} unidades
                    </p>
                  </div>
                </div>

                <h3>¿Estás seguro de que deseas eliminar este producto?</h3>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <form action={formActionDelete}>
                  <input
                    type="hidden"
                    value={deleteSelectedProduct.id}
                    className="sr-only"
                    name="productId"
                  />
                  <input
                    type="hidden"
                    value={user.id}
                    className="sr-only "
                    name="id"
                  />
                  <Button color="primary" className="text-white" type="submit">
                    Eliminar
                  </Button>
                </form>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex items-end justify-end">
        <ProductModal
          buttonText={selectedProduct ? "Editar Producto" : "Crear Producto"}
          title={
            selectedProduct
              ? `Editar ${selectedProduct?.name}`
              : "Crear Producto"
          }
          categories={categories}
          product={selectedProduct}
          setProduct={setSelectedProduct}
          user={user}
        />
      </div>
      <Table isHeaderSticky aria-label="Productos">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={products}>
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
        <Pagination total={allProductsPages} />
      </div>
    </>
  );
}
