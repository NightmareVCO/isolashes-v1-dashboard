"use server";
import {
  fetchDeleteRequest,
  fetchPatchRequest,
  fetchPostRequest,
} from "@utils/fetchRequest";
import { revalidatePath } from "next/cache";

export const deleteHour = async (previousState: any, formData: any) => {
  const { id, hourId } = Object.fromEntries(formData);

  const url = `${process.env.SERVER}/hours/${hourId}`;
  const headers = { "user-id": id };

  try {
    await fetchDeleteRequest({ url, headers });
    revalidatePath("/dashboard/horas");
  } catch (error) {
    throw new Error(`Error al eliminar la hora: ${error}`);
  }
};

export const createHour = async (previousState: any, formData: any) => {
  const { id, time, statusValue } = Object.fromEntries(formData);

  const data = {
    time,
    status: statusValue === "true",
  };

  const url = `${process.env.SERVER}/hours`;
  const headers = { "user-id": id };

  try {
    const response = await fetchPostRequest({ url, data, headers });
    console.log(response);
    revalidatePath("/dashboard/horas");
  } catch (error) {
    throw new Error(`Error al crear la hora: ${error}`);
  }
};

export const updateHour = async (previousState: any, formData: any) => {
  const { id, hourId, time, statusValue } = Object.fromEntries(formData);

  const data = {
    time,
    status: statusValue === "true",
  };

  const url = `${process.env.SERVER}/hours/${hourId}`;
  const headers = { "user-id": id };

  try {
    await fetchPatchRequest({ url, data, headers });
    revalidatePath("/dashboard/horas");
  } catch (error) {
    throw new Error(`Error al actualizar la hora: ${error}`);
  }
};
