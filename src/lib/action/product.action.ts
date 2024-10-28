"use server";

import {
  fetchDeleteRequest,
  fetchPatchRequest,
  fetchPostRequest,
} from "@utils/fetchRequest";
import { auth, uploadFile } from "@utils/googleDrive";
import { revalidatePath } from "next/cache";

const ENDPOINT = "products";
const IAMGE_ENDPOINT = "product-image";

export const createProduct = async (previousState: any, formData: any) => {
  const {
    id,
    name,
    description,
    price,
    stock,
    minStock,
    isPromotionValue,
    promotionPrice,
    productCategory,
    productImage,
  } = Object.fromEntries(formData);

  const client = await auth();
  const imageUrl = await uploadFile(client, productImage);

  const data = {
    name,
    description,
    price: +price,
    stock: +stock,
    minStock: +minStock,
    productCategory,
  };

  const url = `${process.env.SERVER}/${ENDPOINT}`;
  const headers = { "user-id": id };

  try {
    const product = await fetchPostRequest({ url, data, headers });

    await fetchPostRequest({
      url: `${process.env.SERVER}/${IAMGE_ENDPOINT}`,
      data: { product: product.data.id, url: imageUrl },
      headers,
    });

    if (isPromotionValue === "true") {
      const promoData = {
        isPromotion: true,
        promotionPrice: +promotionPrice,
      };
      const url = `${process.env.SERVER}/${ENDPOINT}/${product.data.id}`;
      const headers = { "user-id": id };
      await fetchPatchRequest({ url, data: promoData, headers });
    }

    revalidatePath("/dashboard/productos");
    revalidatePath("/dashboard/vender");
  } catch (error) {
    throw new Error(`Error creando un producto: ${error}`);
  }
};

export const updateProduct = async (previousState: any, formData: any) => {
  const {
    id,
    productId,
    name,
    description,
    price,
    stock,
    minStock,
    statusValue,
    isPromotionValue,
    isNewValue,
    promotionPrice,
    productCategory,
  } = Object.fromEntries(formData);

  const data = {
    name,
    description,
    price: +price,
    stock: +stock,
    minStock: +minStock,
    productCategory,
    status: statusValue === "true" ? true : false,
    isNew: isNewValue === "true" ? true : false,
    isPromotion: isPromotionValue === "true" ? true : false,
    promotionPrice: +promotionPrice,
  };

  const url = `${process.env.SERVER}/${ENDPOINT}/${productId}`;
  const headers = { "user-id": id };

  try {
    await fetchPatchRequest({ url, data, headers });
    revalidatePath("/dashboard/productos");
    revalidatePath("/dashboard/vender");
  } catch (error) {
    throw new Error(`Error actualizando un producto: ${error}`);
  }
};

export const deleteProduct = async (previousState: any, formData: any) => {
  const { id, productId } = Object.fromEntries(formData);
  const url = `${process.env.SERVER}/${ENDPOINT}/${productId}`;
  const headers = { "user-id": id };

  try {
    await fetchDeleteRequest({ url, headers });
    revalidatePath("/dashboard/productos");
    revalidatePath("/dashboard/vender");
  } catch (error) {
    throw new Error(`Error eliminando un producto: ${error}`);
  }
};

export const addProductInventory = async (
  previousState: any,
  formData: any,
) => {
  const { id, productId } = Object.fromEntries(formData);
  const data = { id, quantity: 1 };

  const url = `${process.env.SERVER}/${ENDPOINT}/add-inventory/${productId}`;
  const headers = { "user-id": id };

  try {
    await fetchPatchRequest({ url, data, headers });
    revalidatePath("/dashboard/inventario");
    revalidatePath("/dashboard/vender");
  } catch (error) {
    throw new Error(`Error agregando inventario a un producto: ${error}`);
  }
};

export const removeProductInventory = async (
  previousState: any,
  formData: any,
) => {
  const { id, productId } = Object.fromEntries(formData);
  const data = { id, quantity: 1 };

  const url = `${process.env.SERVER}/${ENDPOINT}/remove-inventory/${productId}`;
  const headers = { "user-id": id };

  try {
    await fetchPatchRequest({ url, data, headers });
    revalidatePath("/dashboard/inventario");
    revalidatePath("/dashboard/vender");
  } catch (error) {
    throw new Error(`Error removiendo inventario a un producto: ${error}`);
  }
};
