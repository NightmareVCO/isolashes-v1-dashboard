import { createProduct, updateProduct } from "@action/product.action";
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
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

export function useProductModal({ product }: { product: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [isPromo, setIsPromo] = useState(false);

  const [formData, setFormData] = useState({
    isNew: product?.isNew,
    isPromotion: product?.isPromotion,
    status: product?.status,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        isNew: product.isNew,
        isPromotion: product.isPromotion,
        status: product.status,
      });
    }
  }, [product]);

  const handleChange = (event: any) => {
    const { name, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? String(checked) : event.target.value,
    });
  };

  const [createState, formActionCreate] = useFormState(
    createProduct,
    undefined,
  );

  const [updateState, formActionUpdate] = useFormState(
    updateProduct,
    undefined,
  );

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

  useEffect(() => {
    if (product?.isPromotion) {
      setIsPromo(true);
    }
  }, [product?.isPromotion]);

  return {
    isOpen,
    onOpen,
    onOpenChange,
    file,
    handleClick,
    handleFileChange,
    fileUploadReference,
    isPromo,
    setIsPromo,
    formActionCreate,
    createState,
    updateState,
    formActionUpdate,
    handleChange,
    formData,
  };
}

type ProductModalProperties = {
  buttonText: string;
  title: string;
  categories: any;
  product?: any;
  setProduct?: any;
  user?: any;
};

export default function ProductModal({
  buttonText,
  title,
  categories,
  product,
  setProduct,
  user,
}: ProductModalProperties) {
  const {
    isOpen,
    onOpen,
    onOpenChange,
    file,
    handleClick,
    handleFileChange,
    fileUploadReference,
    isPromo,
    setIsPromo,
    formActionCreate,
    formActionUpdate,
    formData,
    handleChange,
  } = useProductModal({ product });

  return (
    <>
      <Button color="primary" onPress={onOpen} className="text-white">
        {buttonText}
      </Button>
      <Modal
        isOpen={isOpen || product !== null}
        onOpenChange={() => {
          product == null ? onOpenChange() : "";
          setProduct(null);
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
              {!product && (
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
                        name="productImage"
                      />
                      <Image
                        src={
                          file === null
                            ? "/placeholder.webp"
                            : URL.createObjectURL(file)
                        }
                        alt="Producto"
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
                    </div>
                    <div className="grid w-full grid-cols-8 gap-4 flex-3">
                      <Input
                        className="col-span-8"
                        label="Nombre"
                        name="name"
                        type="text"
                        placeholder="Nombre del producto aquí"
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
                        placeholder="Descripción del producto aquí"
                        isRequired
                      />
                      <Input
                        className="col-span-4"
                        label="Precio"
                        name="price"
                        type="number"
                        min={1}
                        placeholder="Precio del producto aquí"
                        size="lg"
                        isRequired
                        isClearable
                      />
                      <Select
                        className="col-span-4"
                        label="Categoría"
                        name="productCategory"
                        placeholder="Categoría del producto aquí"
                        size="lg"
                        isRequired
                      >
                        {categories?.map((category: any) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </Select>
                      <Input
                        className="col-span-4"
                        label="Inventario"
                        name="stock"
                        type="number"
                        min={1}
                        placeholder="Inventario del producto aquí"
                        size="lg"
                        isRequired
                        isClearable
                      />
                      <Input
                        className="col-span-4"
                        label="Mínimo"
                        name="minStock"
                        type="number"
                        min={1}
                        placeholder="Cantidad mínima del producto aquí"
                        size="lg"
                        isRequired
                        isClearable
                      />
                      <Checkbox
                        className="col-span-8 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        name="isNew"
                        color="primary"
                        onChange={handleChange}
                      >
                        Marcar como un producto nuevo
                      </Checkbox>
                      <input
                        name="isNewValue"
                        value={String(formData.isNew)}
                        className="sr-only"
                      />
                      <Checkbox
                        className="col-span-8 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        name="isPromotion"
                        color="primary"
                        isSelected={isPromo}
                        onChange={(event) => {
                          setIsPromo(!isPromo);
                          handleChange(event);
                        }}
                      >
                        Marcar como un producto en promoción
                      </Checkbox>
                      <input
                        name="isPromotionValue"
                        value={String(formData.isPromotion)}
                        className="sr-only"
                      />
                      <Input
                        className={isPromo ? "col-span-4" : "hidden"}
                        label="Precio de promoción"
                        type="number"
                        min={1}
                        placeholder="Precio del producto en promoción aquí"
                        size="lg"
                        isRequired={isPromo}
                        isClearable
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
              {product && (
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
                    name="productId"
                    value={product.id}
                  />
                  <ModalBody className="flex flex-col w-full lg:flex-row gap-x-3">
                    <div className="flex flex-col items-center justify-center flex-1 w-full gap-y-3">
                      <Image
                        src={product.productImage[0]?.url}
                        alt="Producto"
                        width={250}
                        height={320}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="grid w-full grid-cols-8 gap-4 flex-3">
                      <Input
                        className="col-span-8"
                        label="Nombre"
                        name="name"
                        type="text"
                        placeholder="Nombre del producto aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={product.name}
                      />
                      <Textarea
                        className="col-span-8"
                        label="Descripción"
                        name="description"
                        type="text"
                        size="lg"
                        placeholder="Descripción del producto aquí"
                        isRequired
                        defaultValue={product.description}
                      />
                      <Input
                        className="col-span-4"
                        label="Precio"
                        type="number"
                        name="price"
                        min={1}
                        placeholder="Precio del producto aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={product.price}
                      />
                      <Select
                        className="col-span-4"
                        label="Categoría"
                        name="productCategory"
                        placeholder="Categoría del producto aquí"
                        size="lg"
                        isRequired
                        defaultSelectedKeys={[product.productCategory.id]}
                      >
                        {categories?.map((category: any) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </Select>
                      <Input
                        className="col-span-4"
                        label="Inventario"
                        type="number"
                        name="stock"
                        min={1}
                        placeholder="Inventario del producto aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={product.stock}
                      />
                      <Input
                        className="col-span-4"
                        label="Mínimo"
                        name="minStock"
                        type="number"
                        min={1}
                        placeholder="Cantidad mínima del producto aquí"
                        size="lg"
                        isRequired
                        isClearable
                        defaultValue={product.minStock}
                      />

                      <Checkbox
                        className="col-span-4 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        color="primary"
                        name="isNew"
                        defaultSelected={product.isNew}
                        onChange={handleChange}
                      >
                        Marcar como un producto nuevo
                      </Checkbox>
                      <input
                        name="isNewValue"
                        value={String(formData.isNew)}
                        className="sr-only"
                      />
                      <Checkbox
                        className="col-span-4 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        name="status"
                        color="primary"
                        defaultSelected={product.status}
                        onChange={handleChange}
                      >
                        Mostrar en la página principal
                      </Checkbox>
                      <input
                        name="statusValue"
                        value={String(formData.status)}
                        className="sr-only"
                      />
                      <Checkbox
                        className="col-span-8 p-1 m-0 text-left text-white"
                        radius="lg"
                        size="lg"
                        name="isPromotion"
                        color="primary"
                        isSelected={isPromo}
                        onChange={(event) => {
                          setIsPromo(!isPromo);
                          handleChange(event);
                        }}
                      >
                        Marcar como un producto en promoción
                      </Checkbox>
                      <input
                        name="isPromotionValue"
                        value={String(formData.isPromotion)}
                        className="sr-only"
                      />
                      <Input
                        className={isPromo ? "col-span-4" : "hidden"}
                        label="Precio de promoción"
                        name="promotionPrice"
                        type="number"
                        min={1}
                        placeholder="Precio del producto en promoción aquí"
                        size="lg"
                        isRequired={isPromo}
                        isClearable
                        defaultValue={
                          product?.promotionPrice === 0
                            ? 1
                            : product?.promotionPrice ?? 1
                        }
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
