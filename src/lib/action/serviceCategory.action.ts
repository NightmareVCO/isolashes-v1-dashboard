"use server";

import {
  fetchDeleteRequest,
  fetchPatchRequest,
  fetchPostRequest,
} from "@utils/fetchRequest";
import { auth, uploadFile } from "@utils/googleDrive";
import { revalidatePath } from "next/cache";

const ENDPOINT = "service-category";

export const createServiceCategory = async (
  previousState: any,
  formData: any,
) => {
  const { id, name, description, statusValue, cover } =
    Object.fromEntries(formData);

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
    revalidatePath(`/dashboard/categoria-servicio`);
  } catch (error) {
    throw new Error(`Error creando una categoría de servicio: ${error}`);
  }
};

export const updateServiceCategory = async (
  previousState: any,
  formData: any,
) => {
  const { id, categoryId, name, description, statusValue, cover, cover2 } =
    Object.fromEntries(formData);

  const data = {
    name,
    description,
    status: statusValue === "true",
    cover,
    cover2,
  };

  const url = `${process.env.SERVER}/${ENDPOINT}/${categoryId}`;
  const headers = { "user-id": id };

  try {
    await fetchPatchRequest({ url, data, headers });
    revalidatePath(`/dashboard/categoria-servicio`);
  } catch (error) {
    throw new Error(`Error creando una categoría de servicio: ${error}`);
  }
};

export const deleteServiceCategory = async (
  previousState: any,
  formData: any,
) => {
  const { id, categoryId } = Object.fromEntries(formData);
  const url = `${process.env.SERVER}/${ENDPOINT}/${categoryId}`;
  const headers = { "user-id": id };

  try {
    await fetchDeleteRequest({ url, headers });
    revalidatePath(`/dashboard/categoria-servicio`);
  } catch (error) {
    throw new Error(`Error eliminando una categoría de servicio: ${error}`);
  }
};
