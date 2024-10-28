"use server";

import {
  fetchDeleteRequest,
  fetchPatchRequest,
  fetchPostRequest,
} from "@utils/fetchRequest";
import { revalidatePath } from "next/cache";

export const createService = async (previousState: any, formData: any) => {
  const { id, name, description, price, statusValue, serviceCategory } =
    Object.fromEntries(formData);

  const data = {
    name,
    description,
    price: +price,
    status: statusValue === "true",
    serviceCategory,
  };

  const url = `${process.env.SERVER}/services`;
  const headers = { "user-id": id };

  try {
    await fetchPostRequest({ url, data, headers });
    revalidatePath("/dashboard/servicios");
  } catch (error) {
    throw new Error(`Error al crear el servicio: ${error}`);
  }
};

export const updateService = async (previousState: any, formData: any) => {
  const {
    id,
    serviceId,
    name,
    description,
    price,
    statusValue,
    serviceCategory,
  } = Object.fromEntries(formData);

  const data = {
    name,
    description,
    price: +price,
    status: statusValue === "true",
    serviceCategory,
  };

  const url = `${process.env.SERVER}/services/${serviceId}`;
  const headers = { "user-id": id };

  try {
    await fetchPatchRequest({ url, data, headers });
    revalidatePath("/dashboard/servicios");
  } catch (error) {
    throw new Error(`Error al actualizar el servicio: ${error}`);
  }
};

export const deleteService = async (previousState: any, formData: any) => {
  const { id, serviceId } = Object.fromEntries(formData);
  const url = `${process.env.SERVER}/services/${serviceId}`;
  const headers = { "user-id": id };

  try {
    await fetchDeleteRequest({ url, headers });
    revalidatePath("/dashboard/servicios");
  } catch (error) {
    throw new Error(`Error al eliminar el servicio: ${error}`);
  }
};
