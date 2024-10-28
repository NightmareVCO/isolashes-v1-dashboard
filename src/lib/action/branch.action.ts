"use server";

import {
  fetchDeleteRequest,
  fetchPatchRequest,
  fetchPostRequest,
} from "@utils/fetchRequest";
import { auth, uploadFile } from "@utils/googleDrive";
import { revalidatePath } from "next/cache";

const ENDPOINT = "branches";

export const createBranch = async (previousState: any, formData: any) => {
  const { id, name, address, phone, email, schedule, statusValue, cover } =
    Object.fromEntries(formData);

  const client = await auth();
  const imageUrl = await uploadFile(client, cover);

  const data = {
    name,
    address,
    phone,
    email,
    schedule,
    status: statusValue === "true",
    cover: imageUrl,
  };

  const url = `${process.env.SERVER}/${ENDPOINT}`;
  const headers = { "user-id": id };

  try {
    await fetchPostRequest({ url, data, headers });
    revalidatePath("/dashboard/sucursales");
  } catch (error) {
    throw new Error(`Error creando una sucursal: ${error}`);
  }
};

export const updateBranch = async (previousState: any, formData: any) => {
  const {
    id,
    branchId,
    name,
    address,
    phone,
    email,
    schedule,
    statusValue,
    cover,
  } = Object.fromEntries(formData);

  const client = await auth();
  const imageUrl = await uploadFile(client, cover);

  const data = {
    name,
    address,
    phone,
    email,
    schedule,
    status: statusValue === "true",
    cover: imageUrl,
  };

  const url = `${process.env.SERVER}/branches/${branchId}`;
  const headers = { "user-id": id };

  try {
    await fetchPatchRequest({ url, data, headers });
    revalidatePath("/dashboard/sucursales");
  } catch (error) {
    throw new Error(`Error actualizando una sucursal: ${error}`);
  }
};

export const deleteBranch = async (previousState: any, formData: any) => {
  const { id, branchId } = Object.fromEntries(formData);
  const url = `${process.env.SERVER}/branches/${branchId}`;
  const headers = { "user-id": id };

  try {
    await fetchDeleteRequest({ url, headers });
    revalidatePath("/dashboard/sucursales");
  } catch (error) {
    throw new Error(`Error eliminando una sucursal: ${error}`);
  }
};
