"use server";

import {
  fetchDeleteRequest,
  fetchPatchRequest,
  fetchPostRequest,
} from "@utils/fetchRequest";
import { auth, uploadFile } from "@utils/googleDrive";
import { revalidatePath } from "next/cache";

const ENDPOINT = "product-category";

export const createProductCategory = async (
  previousState: any,
  formData: any,
) => {
  const { id, name, description, statusValue, cover, cover2 } =
    Object.fromEntries(formData);

  console.log(cover2);

  const client = await auth();
  const imageUrl = await uploadFile(client, cover);

  const data = {
    name,
    description,
    status: statusValue === "true",
    cover: imageUrl,
  };

  const url = `${process.env.SERVER}/${ENDPOINT}`;
  const headers = { "user-id": id };

  try {
    await fetchPostRequest({ url, data, headers });
    revalidatePath("/dashboard/categoria-producto");
  } catch (error) {
    throw new Error(`Error creando una categoría de producto: ${error}`);
  }
};

export const updateProductCategory = async (
  previousState: any,
  formData: any,
) => {
  const { id, categoryId, name, description, statusValue, cover, cover2 } =
    Object.fromEntries(formData);
  console.log(cover2);

  const data = {
    name,
    description,
    status: statusValue === "true",
    cover,
  };

  const url = `${process.env.SERVER}/${ENDPOINT}/${categoryId}`;
  const headers = { "user-id": id };

  try {
    await fetchPatchRequest({ url, data, headers });
    revalidatePath("/dashboard/categoria-producto");
  } catch (error) {
    throw new Error(`Error actualizando una categoría de producto: ${error}`);
  }
};

export const deleteProductCategory = async (
  previousState: any,
  formData: any,
) => {
  const { id, categoryId } = Object.fromEntries(formData);
  const url = `${process.env.SERVER}/${ENDPOINT}/${categoryId}`;
  const headers = { "user-id": id };

  try {
    await fetchDeleteRequest({ url, headers });
    revalidatePath("/dashboard/categoria-producto");
  } catch (error) {
    throw new Error(`Error eliminando una categoría de producto: ${error}`);
  }
};
